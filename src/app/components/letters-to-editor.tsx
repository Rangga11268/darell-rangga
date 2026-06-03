"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/providers/language-provider";
import { ChatCircleDots, Quotes, GithubLogo, GoogleLogo, SignOut, PaperPlaneTilt, Trash, PencilSimple } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";
import { UserAvatar } from "./user-avatar";

interface DBComment {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  replies?: DBComment[];
}

export function LettersToEditor() {
  const { language } = useLanguage();
  const [comments, setComments] = useState<DBComment[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ display_name: string; avatar_url: string } | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);



  // Butterfly Easter Egg States & Logic
  interface ButterflyInstance {
    id: number;
    left: number;
    size: number;
    delay: number;
    duration: number;
  }
  const [butterflies, setButterflies] = useState<ButterflyInstance[]>([]);



  // Auto-spawn slow butterflies
  useEffect(() => {
    const interval = setInterval(() => {
      const newB = {
        id: Date.now() + Math.random(),
        left: Math.random() * 90 + 5,
        size: Math.random() * 12 + 10,
        delay: 0,
        duration: Math.random() * 4 + 6,
      };
      setButterflies((prev) => [...prev, newB]);

      setTimeout(() => {
        setButterflies((prev) => prev.filter((b) => b.id !== newB.id));
      }, 10000);
    }, 7000);

    return () => clearInterval(interval);
  }, []);



  // 1. Dapatkan Session & Listen Perubahan Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch custom profile data
  useEffect(() => {
    if (!session) {
      setProfile(null);
      return;
    }
    const loadUserProfile = async () => {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("id", session.user.id)
          .single();
        
        if (data) {
          setProfile({
            display_name: data.display_name || "",
            avatar_url: data.avatar_url || "",
          });
        } else {
          setProfile({
            display_name: session.user.user_metadata.full_name || session.user.user_metadata.name || "User",
            avatar_url: session.user.user_metadata.avatar_url || session.user.user_metadata.picture || "",
          });
        }
      } catch (err) {
        console.error("Error loading user profile", err);
        setProfile({
          display_name: session.user.user_metadata.full_name || session.user.user_metadata.name || "User",
          avatar_url: session.user.user_metadata.avatar_url || session.user.user_metadata.picture || "",
        });
      }
    };
    loadUserProfile();
  }, [session]);

  // Auto-scroll to guestbook after successful login redirect
  useEffect(() => {
    if (session) {
      const justLoggedIn = sessionStorage.getItem("just_logged_in");
      if (justLoggedIn) {
        sessionStorage.removeItem("just_logged_in");
        setTimeout(() => {
          document.getElementById("letters")?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, [session]);

  // 2. Fetch Komentar dari API Next.js
  const fetchComments = async () => {
    try {
      const res = await fetch("/api/comments");
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 3. Login Handler
  const handleLogin = async (provider: "google" | "github") => {
    setAuthError(null);
    try {
      sessionStorage.setItem("just_logged_in", "1");
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err) {
      sessionStorage.removeItem("just_logged_in");
      const message = err instanceof Error ? err.message : "Failed to login";
      setAuthError(message);
    }
  };

  // 4. Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 5. Submit Komentar Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setIsSubmitting(true);
    try {
      const token = session.access_token;
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        setNewComment("");
        setShowForm(false);
        fetchComments(); // Refresh list komentar
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Gagal memposting komentar");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem saat mengirim komentar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Submit Balasan Handler
  const handleReplySubmit = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyContent.trim() || !session) return;

    setIsSubmittingReply(true);
    try {
      const token = session.access_token;
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          content: replyContent, 
          parent_id: parentId 
        }),
      });

      if (res.ok) {
        setReplyContent("");
        setReplyingToId(null);
        fetchComments(); // Refresh list komentar
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Gagal memposting balasan");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem saat mengirim balasan.");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!editContent.trim() || !session) return;

    setIsSubmittingEdit(true);
    try {
      const res = await fetch("/api/comments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          commentId,
          content: editContent,
        }),
      });

      if (res.ok) {
        setEditingCommentId(null);
        setEditContent("");
        fetchComments();
      } else {
        const err = await res.json();
        alert(err.error || "Gagal mengedit komentar");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    if (!session) return;
    setDeleteConfirmId(commentId);
  };

  const confirmDeleteAction = async () => {
    if (!deleteConfirmId || !session) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/comments?id=${encodeURIComponent(deleteConfirmId)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (res.ok) {
        fetchComments();
        setDeleteConfirmId(null);
      } else {
        const err = await res.json();
        alert(err.error || "Gagal menghapus komentar");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section id="letters" className="bg-paper border-b-rule-thick border-primary py-16">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Kolom 1: Header & Form Login/Publish */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
                <ChatCircleDots size={24} weight="fill" />
              </div>
              <h2 className="headline-md uppercase leading-tight">
                {language === "id" ? "Surat Untuk Redaksi" : "Letters To The Editor"}
              </h2>
            </div>
            
            <p className="editor-note text-on-surface-variant mb-6 leading-relaxed">
              {language === "id"
                ? "Pendapat Anda penting bagi kearsipan kami. Kirimkan surat atau masukan untuk pengembangan edisi mendatang."
                : "Your opinion matters to our archive. Send us your letters or feedback for future editions."}
            </p>

            {/* Auth / Form Section */}
            <div className="border hairline border-primary p-5 bg-primary/5">
              {!session ? (
                <div>
                  <span className="font-bold uppercase block mb-3 text-[11px] tracking-wider opacity-60">
                    {language === "id" ? "LOGIN UNTUK MENULIS SURAT" : "LOGIN TO WRITE LETTER"}
                  </span>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleLogin("google")}
                      className="flex items-center justify-center gap-2 border border-primary px-4 py-2 text-xs font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                    >
                      <GoogleLogo size={16} /> Google
                    </button>
                    <button
                      onClick={() => handleLogin("github")}
                      className="flex items-center justify-center gap-2 border border-primary px-4 py-2 text-xs font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                    >
                      <GithubLogo size={16} /> GitHub
                    </button>
                  </div>
                  {authError && (
                    <p className="text-red-500 text-xs mt-2 italic">{authError}</p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-primary/20 pb-2">
                    <div className="flex items-center gap-2">
                      <UserAvatar 
                        src={profile?.avatar_url} 
                        name={profile?.display_name || "User"} 
                        size="sm" 
                      />
                      <Link href="/profile" className="font-bold text-xs uppercase truncate max-w-[150px] hover:underline">
                        {profile?.display_name || "User"}
                      </Link>
                    </div>
                    <button
                      onClick={handleLogout}
                      title="Logout"
                      className="text-primary hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <SignOut size={16} />
                    </button>
                  </div>

                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full text-center border border-primary px-4 py-2 text-xs font-bold uppercase bg-primary text-primary-foreground hover:bg-background hover:text-primary transition-all cursor-pointer"
                    >
                      {language === "id" ? "TULIS SURAT BARU" : "WRITE NEW LETTER"}
                    </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={
                          language === "id"
                            ? "Ketik tanggapan Anda di sini..."
                            : "Type your response here..."
                        }
                        rows={4}
                        required
                        className="w-full p-2 border border-primary bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 flex items-center justify-center gap-2 border border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary px-3 py-1.5 text-xs font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                        >
                          <PaperPlaneTilt size={14} />
                          {isSubmitting
                            ? (language === "id" ? "KIRIM..." : "SENDING...")
                            : (language === "id" ? "TERBITKAN" : "PUBLISH")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="border border-primary bg-background hover:bg-primary hover:text-primary-foreground px-3 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer"
                        >
                          {language === "id" ? "BATAL" : "CANCEL"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Kolom 2: Daftar Surat (Komentar dari DB) */}
          <div className="md:w-2/3">
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-primary/20 bg-primary/2">
                <p className="editor-note text-on-surface-variant italic">
                  {language === "id"
                    ? "Belum ada surat yang terbit. Jadilah yang pertama mengirimkan tanggapan!"
                    : "No letters published yet. Be the first to send your feedback!"}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-10">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex flex-col border-t-2 border-primary pt-6 relative"
                  >
                    <Quotes
                      size={32}
                      className="absolute top-2 right-0 opacity-10 text-primary"
                      weight="fill"
                    />
                    
                     {/* Main Comment Content / Edit Form */}
                    {editingCommentId === comment.id ? (
                      <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className="flex flex-col gap-2 mb-4 w-full">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={3}
                          className="w-full p-2 border border-primary bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                          required
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCommentId(null);
                              setEditContent("");
                            }}
                            className="px-3 py-1 border border-primary bg-background hover:bg-primary/5 text-[9px] font-bold uppercase transition-all cursor-pointer"
                          >
                            {language === "id" ? "BATAL" : "CANCEL"}
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmittingEdit}
                            className="px-3 py-1 bg-primary text-primary-foreground border border-primary hover:bg-background hover:text-primary text-[9px] font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                          >
                            {isSubmittingEdit ? "..." : (language === "id" ? "SIMPAN" : "SAVE")}
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="body-md italic mb-4 leading-relaxed font-serif text-on-surface whitespace-pre-wrap">
                        &quot;{comment.content}&quot;
                      </p>
                    )}
                    
                    {/* Author & Actions Bar */}
                    <div className="flex items-center justify-between mb-4 mt-auto">
                      <div className="flex items-center gap-2">
                        <UserAvatar 
                          src={comment.user_avatar} 
                          name={comment.user_name} 
                          size="sm" 
                        />
                        <div>
                          <span className="block font-bold text-xs uppercase flex items-center">
                            {comment.user_name}
                            {comment.user_name.toUpperCase() === "DARELL RANGGA" && (
                              <span className="ml-1.5 px-1 py-0.2 text-[7px] font-black uppercase bg-primary text-primary-foreground tracking-wider leading-none">
                                ARCHIVIST
                              </span>
                            )}
                          </span>
                          <span className="block text-[9px] label-caps opacity-50">
                            {new Date(comment.created_at).toLocaleDateString(
                              language === "id" ? "id-ID" : "en-US",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {/* Reply Trigger (hanya jika sudah login) */}
                        {session && (
                          <button
                            onClick={() => {
                              if (replyingToId === comment.id) {
                                setReplyingToId(null);
                              } else {
                                setReplyingToId(comment.id);
                                setReplyContent("");
                              }
                            }}
                            className="border border-primary px-3 py-1 text-[9px] font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                          >
                            {replyingToId === comment.id 
                              ? (language === "id" ? "BATAL" : "CANCEL") 
                              : (language === "id" ? "BALAS" : "REPLY")}
                          </button>
                        )}

                        {/* Edit & Delete Actions for Owners */}
                        {session && comment.user_id === session.user.id && (
                          <div className="flex items-center gap-1.5 border-l border-primary/20 pl-2">
                            <button
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setEditContent(comment.content);
                              }}
                              title={language === "id" ? "Edit" : "Edit comment"}
                              className="p-1 hover:text-primary transition-all cursor-pointer"
                            >
                              <PencilSimple size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              title={language === "id" ? "Hapus" : "Delete comment"}
                              className="p-1 hover:text-red-500 transition-all cursor-pointer"
                            >
                              <Trash size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Inline Reply Form */}
                    {replyingToId === comment.id && (
                      <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="flex flex-col gap-2 mt-2 mb-4 pl-8 border-l hairline-l border-primary/25">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={
                            language === "id"
                              ? "Tulis balasan Anda..."
                              : "Type your reply..."
                          }
                          rows={2}
                          required
                          className="w-full p-2 border border-primary bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingReply}
                          className="w-full sm:w-auto self-start border border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary px-3 py-1.5 text-[9px] font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isSubmittingReply 
                            ? (language === "id" ? "MENGIRIM..." : "SENDING...") 
                            : (language === "id" ? "KIRIM BALASAN" : "SUBMIT REPLY")}
                        </button>
                      </form>
                    )}

                    {/* Replies List */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="pl-8 border-l-2 border-primary/10 mt-2 flex flex-col gap-4">
                        {comment.replies.map((reply) => (
                           <div key={reply.id} className="border-t hairline-t border-primary/10 pt-4 flex flex-col">
                            {editingCommentId === reply.id ? (
                              <form onSubmit={(e) => handleEditSubmit(e, reply.id)} className="flex flex-col gap-2 mb-3 w-full">
                                <textarea
                                  value={editContent}
                                  onChange={(e) => setEditContent(e.target.value)}
                                  rows={2}
                                  className="w-full p-2 border border-primary bg-background text-[11px] focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                                  required
                                />
                                <div className="flex gap-2 justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingCommentId(null);
                                      setEditContent("");
                                    }}
                                    className="px-2 py-0.5 border border-primary bg-background hover:bg-primary/5 text-[8px] font-bold uppercase transition-all cursor-pointer"
                                  >
                                    {language === "id" ? "BATAL" : "CANCEL"}
                                  </button>
                                  <button
                                    type="submit"
                                    disabled={isSubmittingEdit}
                                    className="px-2 py-0.5 bg-primary text-primary-foreground border border-primary hover:bg-background hover:text-primary text-[8px] font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                                  >
                                    {isSubmittingEdit ? "..." : (language === "id" ? "SIMPAN" : "SAVE")}
                                  </button>
                                </div>
                              </form>
                            ) : (
                              <p className="body-sm italic mb-3 leading-relaxed font-serif text-on-surface/90 text-[11px] whitespace-pre-wrap">
                                &quot;{reply.content}&quot;
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <UserAvatar 
                                  src={reply.user_avatar} 
                                  name={reply.user_name} 
                                  size="sm" 
                                />
                                <div>
                                  <span className="block font-bold text-[10px] uppercase flex items-center">
                                    {reply.user_name}
                                    {reply.user_name.toUpperCase() === "DARELL RANGGA" && (
                                      <span className="ml-1.5 px-1 py-0.2 text-[7px] font-black uppercase bg-primary text-primary-foreground tracking-wider leading-none">
                                        ARCHIVIST
                                      </span>
                                    )}
                                  </span>
                                  <span className="block text-[8px] label-caps opacity-50 font-mono">
                                    {new Date(reply.created_at).toLocaleDateString(
                                      language === "id" ? "id-ID" : "en-US",
                                      { year: "numeric", month: "short", day: "numeric" }
                                    )}
                                  </span>
                                </div>
                              </div>

                              {/* Reply Owner actions */}
                              {session && reply.user_id === session.user.id && (
                                <div className="flex items-center gap-1.5 pl-2">
                                  <button
                                    onClick={() => {
                                      setEditingCommentId(reply.id);
                                      setEditContent(reply.content);
                                    }}
                                    title={language === "id" ? "Edit" : "Edit reply"}
                                    className="p-1 hover:text-primary transition-all cursor-pointer"
                                  >
                                    <PencilSimple size={10} />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteComment(reply.id)}
                                    title={language === "id" ? "Hapus" : "Delete reply"}
                                    className="p-1 hover:text-red-500 transition-all cursor-pointer"
                                  >
                                    <Trash size={10} />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>




      {/* Butterfly Easter Egg Particles */}
      {butterflies.map((b) => (
        <div
          key={b.id}
          className="butterfly-container pointer-events-none"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="butterfly-wings w-full h-full fill-green-500 dark:fill-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]"
          >
            <path d="M12 10C11.5 5 6 2 2 6c0 0-1 4 3 6c2 1 4 .5 5-2c0 2.5 1.5 3 2 4c.5-1 2-1.5 2-4c1 2.5 3 3 5 2c4-2 3-6 3-6c-4-4-9.5-1-10 4z" />
          </svg>
        </div>
      ))}

      {/* Custom Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-paper border-rule-thick border-primary p-6 max-w-sm w-full shadow-[8px_8px_0px_rgba(0,0,0,0.15)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.05)] rounded-[8px] animate-in fade-in zoom-in-95 duration-200">
            <h3 className="headline-sm text-lg uppercase font-black leading-tight tracking-tighter mb-3">
              {language === "id" ? "KONFIRMASI PENGHAPUSAN" : "CONFIRM DELETION"}
            </h3>
            <p className="body-md text-xs font-serif italic mb-6 opacity-80 leading-relaxed">
              {language === "id"
                ? "Apakah Anda yakin ingin menghapus surat ini? Tindakan ini tidak dapat dibatalkan."
                : "Are you sure you want to delete this letter? This action cannot be undone."}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="px-4 py-2 border border-primary text-[10px] font-bold uppercase tracking-wider hover:bg-primary/5 transition-all rounded-[4px] disabled:opacity-50"
              >
                {language === "id" ? "BATAL" : "CANCEL"}
              </button>
              <button
                onClick={confirmDeleteAction}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white border border-red-700 text-[10px] font-bold uppercase tracking-wider hover:bg-red-700 transition-all rounded-[4px] disabled:opacity-50"
              >
                {isDeleting ? (language === "id" ? "PROSES..." : "DELETING...") : (language === "id" ? "HAPUS" : "DELETE")}
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUp {
          0% {
            transform: translateY(110vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes wingFlap {
          0%, 100% {
            transform: scaleX(1);
          }
          50% {
            transform: scaleX(0.2);
          }
        }
        .butterfly-container {
          position: fixed;
          bottom: -50px;
          z-index: 9999;
          animation: floatUp linear forwards;
        }
        .butterfly-wings {
          animation: wingFlap 0.15s infinite ease-in-out;
          transform-origin: center;
        }
      ` }} />
    </section>
  );
}
