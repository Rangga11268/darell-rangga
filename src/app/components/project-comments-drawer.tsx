"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/providers/language-provider";
import { ChatCircleDots, Quotes, GithubLogo, GoogleLogo, SignOut, PaperPlaneTilt, X } from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";

interface DBComment {
  id: string;
  user_name: string;
  user_avatar: string;
  content: string;
  parent_id: string | null;
  created_at: string;
  replies?: DBComment[];
}

interface ProjectCommentsDrawerProps {
  projectId: string | null;
  projectName: string;
  onClose: () => void;
}

export function ProjectCommentsDrawer({
  projectId,
  projectName,
  onClose,
}: ProjectCommentsDrawerProps) {
  const { language } = useLanguage();
  const [comments, setComments] = useState<DBComment[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ display_name: string; avatar_url: string } | null>(null);
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

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

  // 2. Fetch Komentar dari API Next.js berdasarkan project_id
  const fetchComments = async () => {
    if (!projectId) return;
    try {
      const res = await fetch(`/api/comments?project_id=${encodeURIComponent(projectId)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchComments();
    }
  }, [projectId]);

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (projectId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [projectId]);

  // 3. Login Handler
  const handleLogin = async (provider: "google" | "github") => {
    setAuthError(null);
    try {
      sessionStorage.setItem("just_logged_in", "1");
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.href,
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
    if (!newComment.trim() || !session || !projectId) return;

    setIsSubmitting(true);
    try {
      const token = session.access_token;
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
          project_id: projectId,
        }),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments(); // Refresh list komentar
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Gagal mengirim komentar");
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
    if (!replyContent.trim() || !session || !projectId) return;

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
          project_id: projectId,
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

  return (
    <AnimatePresence>
      {projectId && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black pointer-events-auto"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] bg-paper border-l border-primary shadow-2xl p-6 overflow-y-auto flex flex-col pointer-events-auto"
          >
            {/* Header Laci */}
            <div className="flex items-center justify-between border-b-2 border-primary pb-4 mb-6">
              <div className="flex items-center gap-2">
                <ChatCircleDots size={20} weight="fill" className="text-primary" />
                <span className="label-caps text-xs font-bold opacity-60">
                  {language === "id" ? "Diskusi Redaksi" : "Editorial Board"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border border-primary hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nama Proyek */}
            <div className="mb-6">
              <span className="label-caps text-[9px] opacity-40 block mb-1">PROJECT DISPATCH</span>
              <h3 className="headline-sm uppercase text-primary leading-tight font-serif">
                {projectName}
              </h3>
            </div>

            {/* Form & Auth Section */}
            <div className="border border-primary p-4 bg-primary/5 mb-6">
              {!session ? (
                <div>
                  <span className="font-bold uppercase block mb-3 text-[10px] tracking-wider opacity-60">
                    {language === "id" ? "MASUK UNTUK BERDISKUSI" : "SIGN IN TO JOIN DISCUSSION"}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLogin("google")}
                      className="flex-1 flex items-center justify-center gap-2 border border-primary px-3 py-2 text-xs font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                    >
                      <GoogleLogo size={14} /> Google
                    </button>
                    <button
                      onClick={() => handleLogin("github")}
                      className="flex-1 flex items-center justify-center gap-2 border border-primary px-3 py-2 text-xs font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                    >
                      <GithubLogo size={14} /> GitHub
                    </button>
                  </div>
                  {authError && (
                    <p className="text-red-500 text-[10px] mt-2 italic">{authError}</p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-primary/10">
                    <div className="flex items-center gap-2">
                      <UserAvatar 
                        src={profile?.avatar_url} 
                        name={profile?.display_name || "User"} 
                        size="sm" 
                      />
                      <Link 
                        href="/profile" 
                        onClick={onClose}
                        className="font-bold text-xs uppercase truncate max-w-[150px] hover:underline"
                      >
                        {profile?.display_name || "User"}
                      </Link>
                    </div>
                    <button
                      onClick={handleLogout}
                      title="Logout"
                      className="text-primary hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <SignOut size={14} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={
                        language === "id"
                          ? "Ketik opini atau pertanyaan tentang proyek..."
                          : "Type your comment or questions on the project..."
                      }
                      rows={3}
                      required
                      className="w-full p-2 border border-primary bg-background text-xs focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 border border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary px-4 py-2 text-xs font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <PaperPlaneTilt size={14} />
                      {isSubmitting
                        ? (language === "id" ? "MENGIRIM..." : "SENDING...")
                        : (language === "id" ? "KIRIM KOMENTAR" : "POST COMMENT")}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* List Komentar */}
            <div className="flex-1 flex flex-col gap-6 custom-scrollbar pr-2 overflow-y-auto">
              <span className="label-caps text-[10px] opacity-40 border-b border-primary/20 pb-1">
                {language === "id" ? "CATATAN PUBLIK" : "PUBLIC LOGS"} ({comments.length})
              </span>
              
              {comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-primary/20 bg-primary/2 my-auto">
                  <p className="editor-note text-on-surface-variant italic text-xs">
                    {language === "id"
                      ? "Belum ada diskusi untuk proyek ini. Mulai obrolan pertama!"
                      : "No discussions for this project yet. Start the first talk!"}
                  </p>
                </div>
            ) : (
              <div className="flex flex-col gap-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b-2 border-primary/20 pb-6 relative">
                    <Quotes
                      size={24}
                      className="absolute top-0 right-0 opacity-10 text-primary"
                      weight="fill"
                    />
                    
                    {/* Main Comment Content */}
                    <p className="body-md italic mb-3 leading-relaxed font-serif text-on-surface text-sm whitespace-pre-wrap">
                      &quot;{comment.content}&quot;
                    </p>
                    
                    {/* Author & Actions Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <UserAvatar 
                          src={comment.user_avatar} 
                          name={comment.user_name} 
                          size="sm" 
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-[10px] uppercase flex items-center">
                            {comment.user_name}
                            {comment.user_name.toUpperCase() === "DARELL RANGGA" && (
                              <span className="ml-1.5 px-1 py-0.2 text-[6px] font-black uppercase bg-primary text-primary-foreground tracking-wider leading-none">
                                ARCHIVIST
                              </span>
                            )}
                          </span>
                          <span className="text-[8px] opacity-50 label-caps font-mono">
                            {new Date(comment.created_at).toLocaleDateString(
                              language === "id" ? "id-ID" : "en-US",
                              { year: "numeric", month: "short", day: "numeric" }
                            )}
                          </span>
                        </div>
                      </div>
                      
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
                          className="border border-primary px-2.5 py-0.5 text-[8px] font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                        >
                          {replyingToId === comment.id 
                            ? (language === "id" ? "BATAL" : "CANCEL") 
                            : (language === "id" ? "BALAS" : "REPLY")}
                        </button>
                      )}
                    </div>

                    {/* Inline Reply Form */}
                    {replyingToId === comment.id && (
                      <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="flex flex-col gap-2 mt-3 pl-6 border-l hairline-l border-primary/25">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={
                            language === "id"
                              ? "Tulis balasan..."
                              : "Type your reply..."
                          }
                          rows={2}
                          required
                          className="w-full p-2 border border-primary bg-background text-[11px] focus:outline-none focus:ring-1 focus:ring-primary font-sans"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingReply}
                          className="self-start border border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary px-2.5 py-1 text-[8px] font-bold uppercase transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isSubmittingReply 
                            ? (language === "id" ? "MENGIRIM..." : "SENDING...") 
                            : (language === "id" ? "BALAS" : "REPLY")}
                        </button>
                      </form>
                    )}

                    {/* Nested Replies List */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="pl-6 border-l-2 border-primary/10 mt-3 flex flex-col gap-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="border-t hairline-t border-primary/10 pt-3 flex flex-col">
                            <p className="body-sm italic mb-2 leading-relaxed font-serif text-on-surface/90 text-[11px] whitespace-pre-wrap">
                              &quot;{reply.content}&quot;
                            </p>
                            <div className="flex items-center gap-2">
                              <UserAvatar 
                                src={reply.user_avatar} 
                                name={reply.user_name} 
                                size="sm" 
                              />
                              <div className="flex flex-col">
                                <span className="block font-bold text-[9px] uppercase flex items-center">
                                  {reply.user_name}
                                  {reply.user_name.toUpperCase() === "DARELL RANGGA" && (
                                    <span className="ml-1.5 px-1 py-0.2 text-[6px] font-black uppercase bg-primary text-primary-foreground tracking-wider leading-none">
                                      ARCHIVIST
                                    </span>
                                  )}
                                </span>
                                <span className="block text-[8px] opacity-50 font-mono">
                                  {new Date(reply.created_at).toLocaleDateString(
                                    language === "id" ? "id-ID" : "en-US",
                                    { year: "numeric", month: "short", day: "numeric" }
                                  )}
                                </span>
                              </div>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
