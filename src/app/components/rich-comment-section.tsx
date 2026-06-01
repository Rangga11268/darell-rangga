"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/app/providers/language-provider";
import { 
  ChatCircleDots, 
  Quotes, 
  GithubLogo, 
  GoogleLogo, 
  SignOut, 
  PaperPlaneTilt, 
  Trash, 
  PencilSimple, 
  TextB, 
  TextItalic, 
  Code, 
  Link as LinkIcon, 
  ListBullets 
} from "@phosphor-icons/react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
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

interface RichCommentSectionProps {
  projectId: string;
}

export function RichCommentSection({ projectId }: RichCommentSectionProps) {
  const { language } = useLanguage();
  const [comments, setComments] = useState<DBComment[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [profile, setProfile] = useState<{ display_name: string; avatar_url: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Action states
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);

  // Textarea references for formatting toolbar
  const mainTextareaRef = useRef<HTMLTextAreaElement>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const editTextareaRef = useRef<HTMLTextAreaElement>(null);

  // 1. Fetch Session & Auth Changes
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

  // 2. Fetch Comments
  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?project_id=${encodeURIComponent(projectId)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error("Failed to fetch comments", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [projectId]);

  // 3. Login/Logout Handler
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 4. CRUD operations
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          content: newComment,
          project_id: projectId,
        }),
      });

      if (res.ok) {
        setNewComment("");
        fetchComments();
      } else {
        const err = await res.json();
        alert(err.error || "Gagal mengirim komentar");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (!replyContent.trim() || !session) return;

    setIsSubmittingReply(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          content: replyContent,
          project_id: projectId,
          parent_id: parentId,
        }),
      });

      if (res.ok) {
        setReplyContent("");
        setReplyingToId(null);
        fetchComments();
      } else {
        const err = await res.json();
        alert(err.error || "Gagal memposting balasan");
      }
    } catch (err) {
      console.error(err);
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

  const handleDeleteComment = async (commentId: string) => {
    if (!session) return;
    const confirmDelete = window.confirm(
      language === "id" 
        ? "Apakah Anda yakin ingin menghapus komentar ini?" 
        : "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/comments?id=${encodeURIComponent(commentId)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (res.ok) {
        fetchComments();
      } else {
        const err = await res.json();
        alert(err.error || "Gagal menghapus komentar");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Formatting Helper Toolbar
  const applyFormat = (
    textareaRef: React.RefObject<HTMLTextAreaElement | null>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    prefix: string,
    suffix: string = ""
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const formatted = prefix + selected + suffix;
    const newValue = text.substring(0, start) + formatted + text.substring(end);

    setValue(newValue);

    // Refocus and select
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // 6. Safe Text Parser (Markdown to JSX)
  const parseRichText = (text: string) => {
    if (!text) return null;

    // Split text into lines to process block structures
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Check blockquote
      if (line.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-4 border-primary/20 pl-3 italic my-2 text-on-surface-variant font-serif">
            {parseInlineMarkdown(line.substring(2))}
          </blockquote>
        );
      }
      // Check bullets
      if (line.startsWith("- ")) {
        return (
          <ul key={idx} className="list-disc pl-5 my-1 text-xs">
            <li>{parseInlineMarkdown(line.substring(2))}</li>
          </ul>
        );
      }
      // Standard line
      return (
        <p key={idx} className="my-1.5 leading-relaxed">
          {parseInlineMarkdown(line)}
        </p>
      );
    });
  };

  const parseInlineMarkdown = (text: string) => {
    // Basic regex parsers for bold, italic, inline code, and links
    const boldRegex = /\*\*(.*?)\*\*/g;
    const italicRegex = /\*(.*?)\*/g;
    const codeRegex = /`(.*?)`/g;
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;

    let parts: (string | React.ReactNode)[] = [text];

    // Helper to replace matching patterns
    const runReplace = (
      regex: RegExp,
      renderFn: (match: string, p1: string, p2?: string) => React.ReactNode
    ) => {
      const nextParts: (string | React.ReactNode)[] = [];
      parts.forEach((part) => {
        if (typeof part !== "string") {
          nextParts.push(part);
          return;
        }

        let lastIndex = 0;
        part.replace(regex, (match: string, p1: string, p2?: string, index?: number) => {
          const idx = index || 0;
          if (idx > lastIndex) {
            nextParts.push(part.substring(lastIndex, idx));
          }
          nextParts.push(renderFn(match, p1, p2));
          lastIndex = idx + match.length;
          return match;
        });

        if (lastIndex < part.length) {
          nextParts.push(part.substring(lastIndex));
        }
      });
      parts = nextParts;
    };

    // Parse links: [Google](https://google.com)
    runReplace(linkRegex, (_, text, url) => (
      <a href={url} target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary-foreground hover:bg-primary transition-all font-mono font-bold text-[11px] px-1">
        {text}
      </a>
    ));

    // Parse bold: **text**
    runReplace(boldRegex, (_, text) => <strong className="font-extrabold text-primary font-serif">{text}</strong>);

    // Parse italic: *text*
    runReplace(italicRegex, (_, text) => <em className="italic">{text}</em>);

    // Parse inline code: `code`
    runReplace(codeRegex, (_, text) => (
      <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-[10px] border border-primary/20">
        {text}
      </code>
    ));

    return <>{parts}</>;
  };

  const renderToolbar = (
    textareaRef: React.RefObject<HTMLTextAreaElement | null>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => (
    <div className="flex items-center gap-1.5 p-1.5 bg-paper border-b border-primary border-dashed select-none">
      <button
        type="button"
        title="Bold (**text**)"
        onClick={() => applyFormat(textareaRef, setValue, "**", "**")}
        className="p-1 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer rounded"
      >
        <TextB size={14} weight="bold" />
      </button>
      <button
        type="button"
        title="Italic (*text*)"
        onClick={() => applyFormat(textareaRef, setValue, "*", "*")}
        className="p-1 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer rounded"
      >
        <TextItalic size={14} />
      </button>
      <button
        type="button"
        title="Link ([title](url))"
        onClick={() => applyFormat(textareaRef, setValue, "[", "](url)")}
        className="p-1 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer rounded"
      >
        <LinkIcon size={14} />
      </button>
      <button
        type="button"
        title="Code (`code`)"
        onClick={() => applyFormat(textareaRef, setValue, "`", "`")}
        className="p-1 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer rounded"
      >
        <Code size={14} />
      </button>
      <button
        type="button"
        title="List (- item)"
        onClick={() => applyFormat(textareaRef, setValue, "- ")}
        className="p-1 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer rounded"
      >
        <ListBullets size={14} />
      </button>
      <button
        type="button"
        title="Quote (> text)"
        onClick={() => applyFormat(textareaRef, setValue, "> ")}
        className="p-1 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer rounded font-serif font-black text-xs px-1.5 leading-none"
      >
        &quot;
      </button>
    </div>
  );

  return (
    <div className="mt-12 border-t-2 border-primary pt-10">
      <div className="flex items-center gap-2.5 mb-6">
        <ChatCircleDots size={20} weight="fill" className="text-primary" />
        <h3 className="label-caps text-xs font-black uppercase tracking-wider">
          {language === "id" ? "DISKUSI PROYEK" : "PROJECT DISCUSSION BOARD"} ({comments.length})
        </h3>
      </div>

      {/* Input Form Komentar */}
      <div className="border border-primary p-4 bg-primary/5 mb-8 rounded shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
        {!session ? (
          <div>
            <span className="font-bold uppercase block mb-3 text-[10px] tracking-wider opacity-60">
              {language === "id" ? "LOGIN UNTUK BERKOMENTAR" : "LOGIN TO COMMENT"}
            </span>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleLogin("google")}
                className="flex-1 flex items-center justify-center gap-2 border border-primary px-4 py-2 text-[10px] font-black uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
              >
                <GoogleLogo size={14} /> Google
              </button>
              <button
                onClick={() => handleLogin("github")}
                className="flex-1 flex items-center justify-center gap-2 border border-primary px-4 py-2 text-[10px] font-black uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
              >
                <GithubLogo size={14} /> GitHub
              </button>
            </div>
            {authError && <p className="text-red-500 text-[10px] mt-2 italic">{authError}</p>}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-primary/20 pb-2">
              <div className="flex items-center gap-2">
                <UserAvatar src={profile?.avatar_url} name={profile?.display_name || "User"} size="sm" />
                <span className="font-bold text-[10px] uppercase">{profile?.display_name || "User"}</span>
              </div>
              <button onClick={handleLogout} title="Logout" className="text-primary hover:text-red-500 transition-colors cursor-pointer">
                <SignOut size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmitComment} className="flex flex-col border border-primary bg-background">
              {renderToolbar(mainTextareaRef, setNewComment)}
              <textarea
                ref={mainTextareaRef}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={language === "id" ? "Ketik komentar Anda disini (mendukung format Markdown)..." : "Type your comment here (Markdown supported)..."}
                rows={3}
                required
                className="w-full p-2.5 bg-transparent text-xs focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="self-end border-t border-l border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary px-4 py-1.5 text-[9px] font-black uppercase transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "..." : (language === "id" ? "KIRIM" : "SUBMIT")}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* List Komentar */}
      {isLoading ? (
        <div className="flex flex-col gap-6 animate-pulse">
          {[1, 2, 3].map((n) => (
            <div key={n} className="border-t hairline-t border-primary/10 pt-4 flex flex-col gap-2.5">
              <div className="h-4 w-3/4 bg-primary/10 rounded"></div>
              <div className="h-3.5 w-1/2 bg-primary/5 rounded"></div>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 shrink-0"></div>
                <div className="h-3 w-24 bg-primary/10 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="p-8 border border-dashed border-primary/20 bg-primary/2 text-center text-xs italic text-on-surface-variant font-serif">
          {language === "id" ? "Belum ada diskusi untuk proyek ini. Kirimkan tanggapan Anda pertama kali!" : "No discussions yet for this project. Be the first to start!"}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {comments.map((comment) => {
            const isOwner = session && session.user.id === comment.user_id;

            return (
              <div key={comment.id} className="border-t hairline-t border-primary/20 pt-4 flex flex-col relative group">
                <Quotes size={24} className="absolute top-1 right-0 opacity-5 text-primary" weight="fill" />

                {/* Edit Form / Render Content */}
                {editingCommentId === comment.id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, comment.id)} className="flex flex-col border border-primary bg-background mb-3">
                    {renderToolbar(editTextareaRef, setEditContent)}
                    <textarea
                      ref={editTextareaRef}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={2}
                      required
                      className="w-full p-2.5 bg-transparent text-xs focus:outline-none font-sans"
                    />
                    <div className="flex justify-end border-t border-primary">
                      <button
                        type="button"
                        onClick={() => setEditingCommentId(null)}
                        className="border-r border-primary hover:bg-primary/10 px-3 py-1.5 text-[9px] font-black uppercase cursor-pointer"
                      >
                        {language === "id" ? "BATAL" : "CANCEL"}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingEdit}
                        className="bg-primary text-primary-foreground hover:bg-background hover:text-primary px-3 py-1.5 text-[9px] font-black uppercase transition-all cursor-pointer"
                      >
                        {isSubmittingEdit ? "..." : (language === "id" ? "SIMPAN" : "SAVE")}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-xs md:text-sm text-on-surface font-sans pr-4 mb-2">
                    {parseRichText(comment.content)}
                  </div>
                )}

                {/* Footer and Info */}
                <div className="flex items-center justify-between text-[10px] mt-auto">
                  <div className="flex items-center gap-2">
                    <UserAvatar src={comment.user_avatar} name={comment.user_name} size="sm" />
                    <div>
                      <span className="font-bold uppercase tracking-wider">{comment.user_name}</span>
                      <span className="opacity-50 mx-1.5">•</span>
                      <span className="opacity-50">
                        {new Date(comment.created_at).toLocaleDateString(
                          language === "id" ? "id-ID" : "en-US",
                          { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2">
                    {session && (
                      <button
                        onClick={() => {
                          setReplyingToId(replyingToId === comment.id ? null : comment.id);
                          setReplyContent("");
                        }}
                        className="hover:underline font-bold uppercase text-[9px] tracking-wider cursor-pointer"
                      >
                        {replyingToId === comment.id ? (language === "id" ? "BATAL" : "CANCEL") : (language === "id" ? "BALAS" : "REPLY")}
                      </button>
                    )}

                    {isOwner && (
                      <>
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
                      </>
                    )}
                  </div>
                </div>

                {/* Form Reply */}
                {replyingToId === comment.id && (
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="flex flex-col border border-primary bg-background mt-3 ml-6">
                    {renderToolbar(replyTextareaRef, setReplyContent)}
                    <textarea
                      ref={replyTextareaRef}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder={language === "id" ? "Ketik balasan Anda..." : "Type your reply..."}
                      rows={2}
                      required
                      className="w-full p-2 bg-transparent text-xs focus:outline-none font-sans"
                    />
                    <button
                      type="submit"
                      disabled={isSubmittingReply}
                      className="self-end border-t border-l border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary px-3 py-1 text-[9px] font-black uppercase transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmittingReply ? "..." : (language === "id" ? "KIRIM BALASAN" : "SUBMIT REPLY")}
                    </button>
                  </form>
                )}

                {/* Sub replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="pl-6 border-l border-primary/10 mt-3 flex flex-col gap-3">
                    {comment.replies.map((reply) => {
                      const isReplyOwner = session && session.user.id === reply.user_id;

                      return (
                        <div key={reply.id} className="border-t hairline-t border-primary/5 pt-3 flex flex-col group/reply">
                          {editingCommentId === reply.id ? (
                            <form onSubmit={(e) => handleEditSubmit(e, reply.id)} className="flex flex-col border border-primary bg-background mb-2">
                              {renderToolbar(editTextareaRef, setEditContent)}
                              <textarea
                                ref={editTextareaRef}
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                rows={2}
                                required
                                className="w-full p-2.5 bg-transparent text-xs focus:outline-none font-sans"
                              />
                              <div className="flex justify-end border-t border-primary">
                                <button
                                  type="button"
                                  onClick={() => setEditingCommentId(null)}
                                  className="border-r border-primary hover:bg-primary/10 px-3 py-1.5 text-[9px] font-black uppercase cursor-pointer"
                                >
                                  {language === "id" ? "BATAL" : "CANCEL"}
                                </button>
                                <button
                                  type="submit"
                                  disabled={isSubmittingEdit}
                                  className="bg-primary text-primary-foreground hover:bg-background hover:text-primary px-3 py-1.5 text-[9px] font-black uppercase transition-all cursor-pointer"
                                >
                                  {isSubmittingEdit ? "..." : (language === "id" ? "SIMPAN" : "SAVE")}
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div className="text-xs text-on-surface-variant font-sans mb-1.5">
                              {parseRichText(reply.content)}
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[9px]">
                            <div className="flex items-center gap-1.5">
                              <UserAvatar src={reply.user_avatar} name={reply.user_name} size="sm" />
                              <div>
                                <span className="font-bold uppercase tracking-wider">{reply.user_name}</span>
                                <span className="opacity-50 mx-1">•</span>
                                <span className="opacity-50">
                                  {new Date(reply.created_at).toLocaleDateString(
                                    language === "id" ? "id-ID" : "en-US",
                                    { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
                                  )}
                                </span>
                              </div>
                            </div>

                            {isReplyOwner && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    setEditingCommentId(reply.id);
                                    setEditContent(reply.content);
                                  }}
                                  title={language === "id" ? "Edit" : "Edit reply"}
                                  className="p-0.5 hover:text-primary transition-all cursor-pointer"
                                >
                                  <PencilSimple size={10} />
                                </button>
                                <button
                                  onClick={() => handleDeleteComment(reply.id)}
                                  title={language === "id" ? "Hapus" : "Delete reply"}
                                  className="p-0.5 hover:text-red-500 transition-all cursor-pointer"
                                >
                                  <Trash size={10} />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
