"use client";

import React, { createContext, useContext, useState } from "react";

export type FileType = "file" | "folder";

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  path: string;
  content?: string; // For files: URL or content
  children?: FileNode[]; // For folders
}

interface FileSystemContextType {
  openFolders: string[]; // List of folder IDs that are currently open
  openFolder: (id: string) => void;
  closeFolder: (id: string) => void;
  rootFolders: FileNode[];
}

const initialFileSystem: FileNode[] = [
  {
    id: "system-files",
    name: "System Files",
    type: "folder",
    path: "/system-files",
    children: [
      {
        id: "cv-id",
        name: "CV IND.pdf",
        type: "file",
        path: "/img/saya/CV IND.pdf",
        content: "/img/saya/CV IND.pdf",
      },
      {
        id: "certificates-folder",
        name: "Certificates",
        type: "folder",
        path: "/system-files/certificates",
        children: [
          {
            id: "cert-1",
            name: "DARELL RANGGA PUTRA RACHMAN.pdf",
            type: "file",
            path: "/pdf/DARELL RANGGA PUTRA RACHMAN.pdf",
            content: "/pdf/DARELL RANGGA PUTRA RACHMAN.pdf",
          },
        ],
      },
    ],
  },
];

const FileSystemContext = createContext<FileSystemContextType>({
  openFolders: [],
  openFolder: () => {},
  closeFolder: () => {},
  rootFolders: initialFileSystem,
});

export const useFileSystem = () => useContext(FileSystemContext);

export function FileSystemProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const openFolder = (id: string) => {
    if (!openFolders.includes(id)) {
      setOpenFolders((prev) => [...prev, id]);
    }
  };

  const closeFolder = (id: string) => {
    setOpenFolders((prev) => prev.filter((fid) => fid !== id));
  };

  return (
    <FileSystemContext.Provider
      value={{
        openFolders,
        openFolder,
        closeFolder,
        rootFolders: initialFileSystem,
      }}
    >
      {children}
    </FileSystemContext.Provider>
  );
}
