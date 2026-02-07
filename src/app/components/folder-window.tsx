"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Folder,
  FileText,
  CaretRight,
  ArrowsOut,
  ArrowsIn,
  House,
  MagnifyingGlass,
  SquaresFour,
  List,
  Lock,
  HardDrive,
  FilePdf,
  FileCode,
  Image as ImageIcon,
  ArrowLeft,
} from "@phosphor-icons/react";
import { useFileSystem, FileNode } from "@/app/providers/file-system-provider";
import { cn } from "@/lib/utils";

export function FolderWindow() {
  const { openFolders, closeFolder, rootFolders, openFolder } = useFileSystem();

  return (
    <AnimatePresence>
      {openFolders.map((folderId) => {
        const folder = findFolderById(rootFolders, folderId);
        if (!folder) return null;

        return (
          <Window
            key={folderId}
            folder={folder}
            onClose={() => closeFolder(folderId)}
            onOpenSubfolder={(id) => openFolder(id)}
          />
        );
      })}
    </AnimatePresence>
  );
}

function Window({
  folder,
  onClose,
  onOpenSubfolder,
}: {
  folder: FileNode;
  onClose: () => void;
  onOpenSubfolder: (id: string) => void;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMaximized, setIsMaximized] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChildren = folder.children?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get appropriate icon for file type
  const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return FilePdf;
      case "tsx":
      case "ts":
      case "js":
      case "jsx":
      case "html":
      case "css":
        return FileCode;
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "webp":
        return ImageIcon;
      default:
        return FileText;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={{
        top: -200,
        left: -400,
        right: 400,
        bottom: 200,
      }}
      dragElastic={0.1}
      className={`fixed z-[60] flex flex-col overflow-hidden shadow-2xl ${!isMaximized && "cursor-grab active:cursor-grabbing"} ${
        isMaximized
          ? "inset-4"
          : "inset-x-4 top-24 bottom-36 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:w-[700px] md:h-[500px]"
      }`}
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-primary/40 via-blue-500/20 to-purple-500/30 animate-gradient-shift">
        <div className="h-full w-full rounded-2xl bg-white/90 dark:bg-black/95 backdrop-blur-2xl" />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full rounded-2xl overflow-hidden text-foreground">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/5 bg-muted/20">
          {/* Traffic Lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="group w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center"
            >
              <X
                className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
                weight="bold"
              />
            </button>
            <button
              onClick={() => setIsMaximized(false)}
              className="group w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center"
            >
              <ArrowsIn
                className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity"
                weight="bold"
              />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="group w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center"
            >
              <ArrowsOut
                className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
                weight="bold"
              />
            </button>

            {/* Spacer */}
            <div className="w-4" />

            {/* Back Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all text-xs"
              title="Go Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" weight="bold" />
              <span className="hidden md:inline">Back</span>
            </button>
          </div>

          {/* Title */}
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-primary" weight="duotone" />
            <span className="text-sm font-semibold text-foreground/90">
              {folder.name}
            </span>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-foreground/5 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <SquaresFour className="w-3.5 h-3.5" weight="duotone" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-background shadow-sm text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-3.5 h-3.5" weight="duotone" />
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-red-500/10 rounded-lg transition-all text-muted-foreground hover:text-red-500"
            title="Close"
          >
            <X className="w-4 h-4" weight="bold" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-4 py-2.5 border-b border-foreground/5 bg-black/5 dark:bg-black/20">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs">
            <button className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-all">
              <House className="w-3.5 h-3.5" weight="duotone" />
              <span>root</span>
            </button>
            <CaretRight
              className="w-3 h-3 text-muted-foreground/50"
              weight="bold"
            />
            <span className="px-2 py-1 rounded-md bg-primary/10 text-primary font-medium">
              {folder.name.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative">
            <MagnifyingGlass
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground"
              weight="duotone"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-40 bg-background/50 border border-border rounded-lg py-1.5 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Content Grid/List */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide bg-muted/5">
          {viewMode === "grid" ? (
            <motion.div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {filteredChildren?.map((item) => {
                const ItemIcon =
                  item.type === "folder" ? Folder : getFileIcon(item.name);
                return (
                  <motion.button
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    onClick={() => {
                      if (item.type === "folder") {
                        onOpenSubfolder(item.id);
                      } else if (item.content) {
                        window.open(item.content, "_blank");
                      }
                    }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-foreground/5 transition-all outline-none"
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <div
                        className={`absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                          item.type === "folder"
                            ? "bg-primary/30"
                            : "bg-blue-500/30"
                        }`}
                      />
                      {/* Icon */}
                      <div
                        className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center transition-transform ${
                          item.type === "folder"
                            ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20"
                            : "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20"
                        }`}
                      >
                        <ItemIcon
                          className={`w-7 h-7 ${
                            item.type === "folder"
                              ? "text-primary dark:text-primary"
                              : "text-blue-500 dark:text-blue-400"
                          }`}
                          weight="duotone"
                        />
                      </div>
                    </div>
                    <span className="text-[11px] text-muted-foreground group-hover:text-foreground text-center font-medium truncate w-full leading-tight">
                      {item.name}
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <div className="space-y-1">
              {filteredChildren?.map((item) => {
                const ItemIcon =
                  item.type === "folder" ? Folder : getFileIcon(item.name);
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => {
                      if (item.type === "folder") {
                        onOpenSubfolder(item.id);
                      } else if (item.content) {
                        window.open(item.content, "_blank");
                      }
                    }}
                    className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-foreground/5 transition-all outline-none text-left"
                  >
                    <ItemIcon
                      className={`w-5 h-5 ${
                        item.type === "folder"
                          ? "text-primary"
                          : "text-blue-500 dark:text-blue-400"
                      }`}
                      weight="duotone"
                    />
                    <span className="flex-1 text-sm text-foreground/80 group-hover:text-foreground truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {item.type}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          )}

          {filteredChildren?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <MagnifyingGlass className="w-10 h-10 mb-2" weight="duotone" />
              <span className="text-sm">No items found</span>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-foreground/5 bg-muted/20">
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3 h-3" weight="duotone" />
              {folder.children?.length || 0} items
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3 h-3" weight="duotone" />
              Secure Access
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">
            v2.5.0
          </span>
        </div>
      </div>

      {/* Custom CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
      `}</style>
    </motion.div>
  );
}

function findFolderById(nodes: FileNode[], id: string): FileNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findFolderById(node.children, id);
      if (found) return found;
    }
  }
  return null;
}
