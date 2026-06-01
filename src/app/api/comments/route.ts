import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

// GET /api/comments - Ambil daftar komentar (bisa filter berdasarkan project_id)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("project_id");

    let query = supabase.from("comments").select("*");

    if (projectId) {
      query = query.eq("project_id", projectId);
    } else {
      query = query.is("project_id", null);
    }

    // Ambil berurutan tertua dahulu agar balasan tersusun secara kronologis
    const { data: comments, error } = await query.order("created_at", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    interface DbComment {
      id: string;
      user_id: string;
      user_name: string;
      user_avatar: string;
      content: string;
      parent_id: string | null;
      created_at: string;
      replies?: DbComment[];
    }

    const typedComments = (comments || []) as unknown as DbComment[];

    // Merge custom profiles secara dinamis
    if (typedComments.length > 0) {
      const userIds = Array.from(new Set(typedComments.map((c) => c.user_id).filter(Boolean)));
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from("profiles")
          .select("id, display_name, avatar_url")
          .in("id", userIds);

        if (profiles) {
          const profileMap = new Map(profiles.map(p => [p.id, p]));
          typedComments.forEach((c) => {
            const prof = profileMap.get(c.user_id);
            if (prof) {
              if (prof.display_name) c.user_name = prof.display_name;
              if (prof.avatar_url) c.user_avatar = prof.avatar_url;
            }
          });
        }
      }
    }

    // Konstruksi pohon balasan komentar (max 1 level)
    const mainComments: DbComment[] = [];
    const repliesMap = new Map<string, DbComment[]>();

    typedComments.forEach((c) => {
      if (!c.parent_id) {
        c.replies = [];
        mainComments.push(c);
      } else {
        if (!repliesMap.has(c.parent_id)) {
          repliesMap.set(c.parent_id, []);
        }
        repliesMap.get(c.parent_id)!.push(c);
      }
    });

    mainComments.forEach((c) => {
      c.replies = repliesMap.get(c.id) || [];
    });

    // Balik urutan komentar utama agar yang terbaru berada di atas
    mainComments.reverse();

    return NextResponse.json(mainComments);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/comments - Kirim komentar baru
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Buat client Supabase khusus untuk request ini menggunakan token JWT user
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const supabaseUserClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // Ambil user dari Supabase menggunakan token JWT
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content, project_id, parent_id } = body;

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { error: "Comment content cannot be empty" },
        { status: 400 }
      );
    }

    // Cari profil kustom di database menggunakan client terautentikasi
    const { data: customProfile } = await supabaseUserClient
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("id", user.id)
      .single();

    // Fallback ke metadata OAuth jika profil kustom tidak ada
    const userMetadata = user.user_metadata || {};
    const userName = customProfile?.display_name || userMetadata.full_name || userMetadata.name || userMetadata.user_name || "Anonymous";
    const userAvatar = customProfile?.avatar_url || userMetadata.avatar_url || userMetadata.picture || "";

    // Simpan ke database menggunakan client terautentikasi (memenuhi kebijakan RLS)
    const { data, error: dbError } = await supabaseUserClient
      .from("comments")
      .insert([
        {
          user_id: user.id,
          user_name: userName,
          user_avatar: userAvatar,
          content: content.trim(),
          project_id: project_id || null, // project_id opsional
          parent_id: parent_id || null, // parent_id opsional
        },
      ])
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/comments - Edit komentar
export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const supabaseUserClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    await supabaseUserClient.auth.setSession({
      access_token: token,
      refresh_token: "",
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { commentId, content } = body;

    if (!commentId || !content || content.trim() === "") {
      return NextResponse.json({ error: "Comment ID and content are required" }, { status: 400 });
    }

    const { data, error: dbError } = await supabaseUserClient
      .from("comments")
      .update({ content: content.trim() })
      .eq("id", commentId)
      .eq("user_id", user.id)
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/comments - Hapus komentar
export async function DELETE(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header" },
        { status: 401 }
      );
    }
    const token = authHeader.split(" ")[1];
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
    const supabaseUserClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    // Establish authenticated session context in the client SDK explicitly
    await supabaseUserClient.auth.setSession({
      access_token: token,
      refresh_token: "",
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("id");

    if (!commentId) {
      return NextResponse.json({ error: "Comment ID is required" }, { status: 400 });
    }

    // First, try hard deletion
    await supabaseUserClient
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("user_id", user.id);

    // Verify if the comment was actually deleted
    const { data: checkData } = await supabase
      .from("comments")
      .select("id, user_id")
      .eq("id", commentId)
      .maybeSingle();

    if (checkData) {
      console.warn("Hard delete did not remove the comment. Falling back to soft update...");
      
      // Check if user is the owner of the comment
      if (checkData.user_id !== user.id) {
        return NextResponse.json({ error: "Anda tidak memiliki akses untuk menghapus komentar ini" }, { status: 403 });
      }

      // Fallback: update the content to a deleted placeholder without calling .single()
      const { data: updateData, error: updateError } = await supabaseUserClient
        .from("comments")
        .update({ content: "[Komentar dihapus]" })
        .eq("id", commentId)
        .eq("user_id", user.id)
        .select();

      console.log("Soft update fallback execution results:", {
        commentId,
        userId: user.id,
        updateData,
        updateError: updateError ? updateError.message : null
      });

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      if (!updateData || updateData.length === 0) {
        return NextResponse.json({ 
          error: `Gagal memperbarui status komentar. Silakan periksa izin edit komentar Anda.` 
        }, { status: 400 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
