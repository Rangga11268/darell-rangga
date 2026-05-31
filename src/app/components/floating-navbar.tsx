"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  User,
  Code,
  Envelope,
  Moon,
  Sun,
  X,
  Translate,
  List,
  FilePdf,
  SealCheck,
  CaretLeft,
} from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/app/providers/language-provider";
import { useCustomization } from "@/app/providers/customization-provider";
import { cn } from "@/lib/utils";
import { useFileSystem } from "@/app/providers/file-system-provider";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { GoogleLogo, GithubLogo, SignOut } from "@phosphor-icons/react";
import { UserAvatar } from "./user-avatar";

export function FloatingNavbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { t, language, toggleLanguage } = useLanguage();
  const { isPlaygroundOpen, setIsPlaygroundOpen } = useCustomization();
  const { openFolder } = useFileSystem();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<{ display_name: string; avatar_url: string } | null>(null);

  useEffect(() => {
    const checkJustLoggedIn = () => {
      const justLoggedIn = sessionStorage.getItem("just_logged_in");
      if (justLoggedIn) {
        sessionStorage.removeItem("just_logged_in");
        alert(language === "id" ? "Pendaftaran berhasil! Selamat datang di Kearsipan." : "Log entry recorded! Welcome to the Archival Registry.");
      }
    };

    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkJustLoggedIn();
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkJustLoggedIn();
    });

    return () => subscription.unsubscribe();
  }, [language]);

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

  const handleLogin = async (provider: "google" | "github") => {
    try {
      sessionStorage.setItem("just_logged_in", "1");
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.href,
        },
      });
    } catch (err) {
      sessionStorage.removeItem("just_logged_in");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!mounted) return null;

  const isHome = pathname === "/";

  const primaryItems = [
    { name: t.nav.home, href: isHome ? "#home" : "/#home", icon: House, isExternal: false },
    { name: t.nav.about, href: isHome ? "#about" : "/#about", icon: User, isExternal: false },
    { name: t.nav.projects, href: "/projects", icon: Code, isExternal: true },
    { name: t.nav.contact, href: isHome ? "#contact" : "/#contact", icon: Envelope, isExternal: false },
  ];

  return (
    <>
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[80]"
            />
            
            {/* Right Side Editorial Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[90] bg-paper border-l-rule-thick border-primary shadow-[-10px_0_30px_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="flex-1 p-8 overflow-y-auto">
                {/* Panel Header */}
                <div className="flex justify-between items-start mb-12">
                  <div className="space-y-1">
                    <span className="label-caps text-[9px] font-bold opacity-40">ARCHIVE INDEX</span>
                    <h2 className="headline-md text-3xl font-serif">Digital Archivist</h2>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/20"
                  >
                    <X size={24} weight="bold" />
                  </button>
                </div>

                {/* Section: Main Navigation (Editions) */}
                <div className="space-y-6 mb-12">
                  <div className="border-b hairline-b border-primary/20 pb-2 flex justify-between items-end">
                    <span className="label-caps text-[10px] font-bold">THE EDITIONS</span>
                    <span className="text-[9px] italic opacity-40">Select Section</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {primaryItems.map((item) => (
                      item.href.startsWith("#") ? (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-center justify-between p-4 border hairline border-primary/10 hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <item.icon size={20} weight="bold" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="headline-sm text-lg uppercase tracking-tight group-hover:translate-x-1 transition-transform">{item.name}</span>
                          </div>
                          <span className="text-[10px] opacity-0 group-hover:opacity-40 transition-opacity font-serif italic">Go to page →</span>
                        </a>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="group flex items-center justify-between p-4 border hairline border-primary/10 hover:border-primary hover:bg-primary/5 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <item.icon size={20} weight="bold" className="opacity-40 group-hover:opacity-100 transition-opacity" />
                            <span className="headline-sm text-lg uppercase tracking-tight group-hover:translate-x-1 transition-transform">{item.name}</span>
                          </div>
                          <span className="text-[10px] opacity-0 group-hover:opacity-40 transition-opacity font-serif italic">Go to page →</span>
                        </Link>
                      )
                    ))}
                  </div>
                </div>

                {/* Section: Special Supplements */}
                <div className="space-y-6 mb-12">
                  <div className="border-b hairline-b border-primary/20 pb-2 flex justify-between items-end">
                    <span className="label-caps text-[10px] font-bold">SUPPLEMENTS</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => { openFolder("certificates-folder"); setIsMenuOpen(false); }}
                      className="flex items-center justify-between p-3 border hairline border-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <SealCheck size={16} className="opacity-40" />
                        <span className="label-caps text-[10px] font-bold">{t.nav.certificates}</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => { 
                        const cvPath = language === "id" 
                          ? "/pdf/DarellRangga_CV_IND.pdf" 
                          : "/pdf/DarellRangga_CV_ENG.pdf";
                        window.open(cvPath, "_blank");
                        setIsMenuOpen(false); 
                      }}
                      className="flex items-center justify-between p-3 border hairline border-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <FilePdf size={16} className="opacity-40" />
                        <span className="label-caps text-[10px] font-bold">{t.nav.curriculumVitae}</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => { setIsPlaygroundOpen(!isPlaygroundOpen); setIsMenuOpen(false); }}
                      className="flex items-center justify-between p-3 border hairline border-primary/5 hover:border-primary/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full", isPlaygroundOpen ? "bg-primary animate-pulse" : "bg-primary/20")} />
                        <span className="label-caps text-[10px] font-bold">THE ARCHIVIST (AI)</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Section: Archival Registry (Authentication) */}
                <div className="space-y-6 mb-12">
                  <div className="border-b hairline-b border-primary/20 pb-2 flex justify-between items-end">
                    <span className="label-caps text-[10px] font-bold">ARCHIVAL REGISTRY</span>
                  </div>
                  {!session ? (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleLogin("google")}
                        className="flex items-center justify-center gap-2 border border-primary p-3 text-[10px] font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                      >
                        <GoogleLogo size={14} /> Google Login
                      </button>
                      <button
                        onClick={() => handleLogin("github")}
                        className="flex items-center justify-center gap-2 border border-primary p-3 text-[10px] font-bold uppercase bg-background hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                      >
                        <GithubLogo size={14} /> GitHub Login
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between border border-primary p-3 bg-primary/5">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <UserAvatar 
                          src={profile?.avatar_url} 
                          name={profile?.display_name || "User"} 
                          size="md" 
                        />
                        <div className="flex flex-col overflow-hidden">
                          <Link
                            href="/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="font-bold text-[10px] uppercase truncate max-w-[180px] hover:underline"
                          >
                            {profile?.display_name || "User"}
                          </Link>
                          <span className="text-[8px] opacity-50 truncate max-w-[180px]">
                            {session.user.email}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="p-2 border border-primary hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                        title="Logout"
                      >
                        <SignOut size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Settings Quick Bar */}
                <div className="grid grid-cols-2 gap-4">
                   <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center justify-center gap-2 p-3 border hairline border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                    <span className="label-caps text-[9px] font-bold">CONTRAST</span>
                  </button>
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center justify-center gap-2 p-3 border hairline border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <Translate size={14} />
                    <span className="label-caps text-[9px] font-bold">{language === "id" ? "BAHASA" : "LANGUAGE"}</span>
                  </button>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="p-8 border-t hairline-t border-primary/10 bg-primary/5">
                <div className="flex flex-col gap-2">
                  <span className="label-caps text-[8px] font-bold opacity-30">ARCHIVE DISPATCH</span>
                  <p className="text-[11px] font-serif italic opacity-60 leading-relaxed">
                    &quot;{t.footer.quote}&quot;
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Vertical Editorial Tab (The Trigger) */}
      <div className="fixed top-1/2 -translate-y-1/2 right-0 z-[85]">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ x: -2 }}
          className={cn(
            "flex items-center gap-4 bg-primary text-primary-foreground shadow-[-4px_0_20px_rgba(0,0,0,0.2)] group transition-all h-[140px] md:h-[180px] w-8 md:w-12 relative",
            isMenuOpen && "opacity-0 pointer-events-none"
          )}
        >
          {/* Vertical Text Label */}
          <div 
            className="flex items-center gap-4 md:gap-6 rotate-180 absolute inset-0 justify-center"
            style={{ writingMode: "vertical-rl" }}
          >
            <div className="flex items-center gap-2">
               <CaretLeft size={12} weight="bold" className="md:w-3.5 md:h-3.5 group-hover:-translate-y-1 transition-transform" />
               <span className="label-caps text-[9px] md:text-[11px] font-black tracking-[0.3em] uppercase">THE INDEX</span>
            </div>
          </div>
          
          {/* Decorative Edge Detail (Archive Stamp) */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none flex flex-col items-center">
             <span className="text-[6px] md:text-[7px] font-bold leading-none">EDITION</span>
             <span className="text-[6px] md:text-[7px] font-bold leading-none">2025</span>
          </div>
        </motion.button>
      </div>

      {/* Floating Language Toggle (Outside) */}
      <div className="fixed bottom-24 left-4 md:bottom-32 md:left-8 z-50">
        <motion.button
          onClick={toggleLanguage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 md:w-14 md:h-14 bg-paper border-rule-thick border-primary flex items-center justify-center shadow-[3px_3px_0px_#1a1c1c] md:shadow-[4px_4px_0px_#1a1c1c] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group overflow-hidden"
        >
          <div className="flex flex-col items-center">
            <Translate size={16} weight="bold" className="md:w-5 md:h-5" />
            <span className="text-[6px] md:text-[7px] font-bold mt-0.5">{language === "id" ? "IND" : "ENG"}</span>
          </div>
          {/* Tooltip */}
          <div className="absolute -top-10 left-0 bg-primary text-primary-foreground px-2 py-1 label-caps text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
             Switch Language
          </div>
        </motion.button>
      </div>
    </>
  );
}
