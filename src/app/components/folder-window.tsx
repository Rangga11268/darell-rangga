"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Folder,
  FileText,
  CaretRight,
  House,
  MagnifyingGlass,
  SquaresFour,
  List,
  HardDrive,
  FilePdf,
  FileCode,
  Image as ImageIcon,
  ArrowLeft,
} from "@phosphor-icons/react";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChildren = folder.children?.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getFileIcon = (name: string) => {
    const ext = name.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf": return FilePdf;
      case "tsx":
      case "ts":
      case "js":
      case "jsx":
      case "html":
      case "css": return FileCode;
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "webp": return ImageIcon;
      default: return FileText;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 40 }}
      drag
      dragMomentum={false}
      className="fixed z-[90] flex flex-col bg-paper border-rule-thick border-primary shadow-[12px_12px_0px_#1a1c1c] w-full max-w-[90vw] md:w-[700px] h-[550px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
    >
      {/* Title Bar - News Archive Style */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground border-b border-primary">
        <div className="flex items-center gap-3">
          <div className="bg-paper text-primary px-2 py-0.5 text-[10px] label-caps font-bold">ARCHIVE</div>
          <span className="headline-sm text-sm tracking-widest uppercase truncate max-w-[200px]">
            {folder.name}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-[9px] label-caps opacity-60">
            <span>VOL. 2025</span>
            <span className="w-1 h-1 bg-paper rounded-full"></span>
            <span>REF: {folder.id.slice(0, 8).toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-paper hover:text-primary transition-colors border border-transparent hover:border-primary"
          >
            <X size={20} weight="bold" />
          </button>
        </div>
      </div>

      {/* Toolbar - Classified Style */}
      <div className="flex items-center gap-3 px-4 py-2 border-b hairline-b border-primary bg-primary/5">
        <button
          onClick={onClose}
          className="flex items-center gap-1 px-2 py-1 border hairline border-primary/20 hover:border-primary label-caps text-[10px] transition-all"
        >
          <ArrowLeft size={12} weight="bold" />
          BACK
        </button>

        <div className="flex-1 flex items-center gap-1.5 overflow-hidden">
          <House size={14} weight="bold" className="flex-shrink-0" />
          <CaretRight size={10} weight="bold" className="opacity-30 flex-shrink-0" />
          <span className="label-caps text-[10px] truncate opacity-60">ROOT / {folder.name.toLowerCase()}</span>
        </div>

        <div className="relative">
          <MagnifyingGlass size={14} className="absolute left-2 top-1/2 -translate-y-1/2 opacity-40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="SEARCH RECORDS..."
            className="bg-transparent border hairline border-primary/20 focus:border-primary px-8 py-1.5 text-[10px] label-caps outline-none w-32 md:w-48 transition-all"
          />
        </div>

        <div className="flex gap-1 border-l hairline-l border-primary/20 pl-3">
          <button 
            onClick={() => setViewMode("grid")} 
            className={`p-1 transition-all ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "opacity-40 hover:opacity-100 hover:bg-primary/10"}`}
            title="GRID VIEW"
          >
            <SquaresFour size={16} weight="bold" />
          </button>
          <button 
            onClick={() => setViewMode("list")} 
            className={`p-1 transition-all ${viewMode === "list" ? "bg-primary text-primary-foreground" : "opacity-40 hover:opacity-100 hover:bg-primary/10"}`}
            title="ARCHIVE LIST"
          >
            <List size={16} weight="bold" />
          </button>
        </div>
      </div>

      {/* Microfilm Metadata Header */}
      <div className="px-6 py-2 bg-primary/5 border-b hairline-b border-primary/20 flex justify-between items-center overflow-hidden">
        <div className="flex gap-4 label-caps text-[8px] md:text-[9px] font-bold tracking-tighter opacity-60">
          <span>REEL_ID: {folder.id.slice(0, 4).toUpperCase()}_00{folder.children?.length}</span>
          <span className="hidden sm:inline">INDEX_TYPE: CLASSIFIED_RECORDS</span>
          <span>LOCATION: SECURE_VAULT_A1</span>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/20 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-primary/20 animate-pulse delay-150"></div>
        </div>
      </div>

      {/* Main Content - Newsprint Grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-paper custom-scrollbar">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filteredChildren?.map((item) => {
              const ItemIcon = item.type === "folder" ? Folder : getFileIcon(item.name);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.type === "folder") onOpenSubfolder(item.id);
                    else if (item.content) window.open(item.content, "_blank");
                  }}
                  className="group flex flex-col items-center gap-3 p-4 border hairline border-transparent hover:border-primary hover:bg-primary/5 transition-all text-center"
                >
                  <div className="w-12 h-12 flex items-center justify-center border-rule-thin border-primary/20 group-hover:border-primary group-hover:bg-paper transition-all relative">
                    <ItemIcon size={28} weight={item.type === "folder" ? "fill" : "bold"} className="group-hover:scale-110 transition-transform" />
                    {item.type === "folder" && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary"></div>
                    )}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-tight leading-none truncate w-full">
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="border border-primary">
            {/* List Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-primary text-primary-foreground label-caps text-[10px] font-bold border-b border-primary sticky top-0 z-10">
              <div className="col-span-6 flex items-center gap-2">
                <CaretRight size={10} weight="bold" className="rotate-90" />
                RECORD NAME
              </div>
              <div className="col-span-2 hidden md:block">DATE</div>
              <div className="col-span-2 hidden md:block">CATEGORY</div>
              <div className="col-span-2 text-right">SIZE</div>
            </div>

            {filteredChildren?.map((item) => {
              const ItemIcon = item.type === "folder" ? Folder : getFileIcon(item.name);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.type === "folder") onOpenSubfolder(item.id);
                    else if (item.content) window.open(item.content, "_blank");
                  }}
                  className="w-full grid grid-cols-12 gap-2 items-center px-4 py-3 border-b hairline-b border-primary hover:bg-primary hover:text-primary-foreground transition-all group text-left"
                >
                  <div className="col-span-6 flex items-center gap-4">
                    <div className="w-6 h-6 flex items-center justify-center border hairline border-primary/20 group-hover:border-paper/40 group-hover:bg-paper/10">
                      <ItemIcon size={12} weight="bold" />
                    </div>
                    <span className="text-[11px] font-bold uppercase truncate">{item.name}</span>
                  </div>
                  <div className="col-span-2 hidden md:block label-caps text-[9px] opacity-60 group-hover:opacity-100">
                    {item.date || "2025.01.01"}
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="label-caps text-[8px] px-1.5 py-0.5 border hairline border-primary/20 group-hover:border-paper/40 font-bold">
                      {item.category || item.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="col-span-2 text-right label-caps text-[9px] font-bold tabular-nums opacity-60 group-hover:opacity-100">
                    {item.size || "0.0 KB"}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {filteredChildren?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-20 py-20">
            <MagnifyingGlass size={48} weight="thin" />
            <p className="label-caps mt-4">No Records Found</p>
          </div>
        )}
      </div>

      {/* Footer - Index Stats */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-primary bg-primary/5">
        <div className="flex items-center gap-4 text-[9px] label-caps font-bold">
          <span className="flex items-center gap-1.5">
            <HardDrive size={12} weight="bold" />
            TOTAL: {folder.children?.length || 0} ITEMS
          </span>
          <span className="flex items-center gap-1.5 border-l hairline-l border-primary/20 pl-4">
            STATUS: SECURE_ARCHIVE
          </span>
        </div>
        <span className="text-[9px] font-mono opacity-40">SYSTEM_INDEX_V.2.5</span>
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
