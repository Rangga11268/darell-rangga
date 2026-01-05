"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Folder,
  FileText,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { useFileSystem, FileNode } from "@/app/providers/file-system-provider";

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
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed inset-x-4 top-20 bottom-32 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] md:h-[400px] z-[60] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-white/80 uppercase tracking-tighter">
            {folder.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-white/10 rounded transition-colors text-white/40">
            <Minimize2 className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-white/10 rounded transition-colors text-white/40">
            <Maximize2 className="w-3 h-3" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500/20 hover:text-red-500 rounded transition-colors text-white/40"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-4 py-2 bg-black/20 border-b border-white/5 flex items-center gap-2 text-[10px] text-white/40">
        <span>root</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-primary/80">
          {folder.name.toLowerCase().replace(/\s+/g, "-")}
        </span>
      </div>

      {/* Content Grid */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
          {folder.children?.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.type === "folder") {
                  onOpenSubfolder(item.id);
                } else if (item.content) {
                  window.open(item.content, "_blank");
                }
              }}
              className="group flex flex-col items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all outline-none"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.type === "folder" ? (
                  <Folder className="w-10 h-10 text-primary group-hover:scale-110 transition-transform relative z-10" />
                ) : (
                  <FileText className="w-10 h-10 text-blue-400 group-hover:scale-110 transition-transform relative z-10" />
                )}
              </div>
              <span className="text-[10px] md:text-xs text-white/60 group-hover:text-white text-center font-medium truncate w-full">
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 border-top border-white/10 bg-white/5 flex items-center justify-between text-[8px] text-white/30 uppercase tracking-widest">
        <span>{folder.children?.length || 0} objects found</span>
        <span>Secure Access: Level 4</span>
      </div>
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
