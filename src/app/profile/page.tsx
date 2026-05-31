"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { FloatingNavbar } from "@/app/components/floating-navbar";
import { IdentificationCard, ShieldCheck, ArrowLeft, FloppyDisk, CircleNotch } from "@phosphor-icons/react";
import Link from "next/link";
import { UserAvatar } from "@/app/components/user-avatar";

export default function ProfilePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/");
        return;
      }
      setSession(session);
      loadProfile(session.user.id, session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/");
        return;
      }
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Muat data profil kustom dari tabel 'profiles' Supabase
  const loadProfile = async (userId: string, currentSession: Session) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") { // PGRST116 adalah error "no rows returned"
        throw error;
      }

      if (data) {
        setDisplayName(data.display_name || "");
        setAvatarUrl(data.avatar_url || "");
      } else {
        // Fallback ke data bawaan OAuth
        const meta = currentSession.user.user_metadata || {};
        setDisplayName(meta.full_name || meta.name || "");
        setAvatarUrl(meta.avatar_url || meta.picture || "");
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  // Simpan/Update profil
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: session.user.id,
        display_name: displayName.trim(),
        avatar_url: avatarUrl.trim(),
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setMessage("Record successfully updated in archives!");
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      setError(errMsg || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-primary">
        <CircleNotch size={40} className="animate-spin mb-4" />
        <span className="label-caps text-xs tracking-widest">LOADING ARCHIVAL REGISTRY...</span>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <FloatingNavbar />

      {/* Header */}
      <header className="border-b-rule-thick border-primary py-12 text-center bg-paper relative z-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Link href="/" className="flex items-center gap-1.5 px-3 py-1 border hairline border-primary/20 hover:border-primary label-caps text-[10px] transition-all bg-background">
              <ArrowLeft size={10} weight="bold" /> RETURN HOME
            </Link>
            <span className="label-caps text-xs tracking-[0.2em] font-bold opacity-60">MEMBERSHIP DESK</span>
          </div>
          <h1 className="headline-lg text-4xl md:text-6xl font-serif mt-2 font-black leading-none uppercase">
            Archival Registry File
          </h1>
          <p className="editor-note italic text-base md:text-lg max-w-xl mx-auto mt-4 opacity-75 font-serif">
            &quot;Edit and customize your credentials for comments and project feedback logs.&quot;
          </p>
        </div>
      </header>

      {/* Content Form */}
      <main className="max-w-xl mx-auto px-4 mt-16 relative z-10">
        <form onSubmit={handleSave} className="border-rule-thick border-primary p-6 md:p-8 bg-paper shadow-[12px_12px_0px_rgba(0,0,0,0.2)] flex flex-col gap-6">
          <div className="flex items-center gap-2 border-b border-primary/20 pb-3">
            <IdentificationCard size={20} />
            <span className="label-caps text-xs font-bold opacity-60">IDENTIFICATION TELEMETRY</span>
          </div>

          {/* User Info Read-only */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-primary/5 p-4 border hairline border-primary/20">
            <div>
              <span className="block opacity-50 uppercase text-[9px] label-caps">Registry ID</span>
              <span className="font-bold truncate block">{session.user.id.substring(0, 18)}...</span>
            </div>
            <div>
              <span className="block opacity-50 uppercase text-[9px] label-caps">Auth Provider</span>
              <span className="font-bold uppercase block">{session.user.app_metadata.provider || "Unknown"}</span>
            </div>
            <div className="col-span-2 border-t hairline-t border-primary/10 pt-2">
              <span className="block opacity-50 uppercase text-[9px] label-caps">Email Contact</span>
              <span className="font-bold block">{session.user.email}</span>
            </div>
          </div>

          {/* Avatar Preview */}
          <div className="flex items-center gap-4 border-b border-primary/10 pb-6">
            <UserAvatar 
              src={avatarUrl} 
              name={displayName || "User"} 
              size="lg" 
            />
            <div>
              <span className="label-caps text-[9px] opacity-40 block">AVATAR VISUAL</span>
              <span className="text-xs italic text-on-surface-variant font-serif">
                Preview of your archival stamp
              </span>
            </div>
          </div>

          {/* Input Display Name */}
          <div className="flex flex-col gap-2">
            <label className="label-caps text-[10px] font-bold opacity-60">Display Name / Pseudonym</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-3 border border-primary bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono uppercase"
              placeholder="YOUR NAME"
            />
          </div>

          {/* Input Avatar URL */}
          <div className="flex flex-col gap-2">
            <label className="label-caps text-[10px] font-bold opacity-60">Custom Avatar Image URL</label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full p-3 border border-primary bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              placeholder="https://example.com/your-image.png"
            />
            <p className="text-[10px] text-on-surface-variant italic font-serif">
              Leave blank to fallback to your OAuth provider photo
            </p>
          </div>

          {/* Messages */}
          {message && (
            <div className="border border-green-500 bg-green-500/5 text-green-700 dark:text-green-400 p-3 text-xs font-mono uppercase flex items-center gap-2">
              <ShieldCheck size={16} /> {message}
            </div>
          )}
          {error && (
            <div className="border border-red-500 bg-red-500/5 text-red-700 dark:text-red-400 p-3 text-xs font-mono uppercase">
              {error}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 border border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary py-4 text-xs font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <CircleNotch size={16} className="animate-spin" />
                Updating Records...
              </>
            ) : (
              <>
                <FloppyDisk size={16} weight="bold" />
                Commit Updates
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
