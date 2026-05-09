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
  date?: string;
  category?: string;
  size?: string;
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
        date: "2025-05-10",
        category: "DOCUMENT",
        size: "1.2 MB",
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
            date: "2024-12-20",
            category: "CERTIFICATE",
            size: "850 KB",
          },
        ],
      },
      {
        id: "projects-folder",
        name: "Projects Archive",
        type: "folder",
        path: "/system-files/projects",
        children: [
          {
            id: "proj-tujago",
            name: "TUJAGO - Bus Operations.pdf",
            type: "file",
            path: "/pdf/tujago.pdf",
            content: "https://github.com/Rangga11268/TunggalJayaTransport",
            date: "2025-01-15",
            category: "WEB_APP",
            size: "4.5 MB",
          },
          {
            id: "proj-srb",
            name: "SRB MOTOR V3 - Dealership.pdf",
            type: "file",
            path: "/pdf/srb-motor.pdf",
            content: "https://github.com/Rangga11268/SrbMotorV2",
            date: "2025-02-20",
            category: "ENTERPRISE",
            size: "3.8 MB",
          },
          {
            id: "proj-satya",
            name: "SATYA HUB - Education.pdf",
            type: "file",
            path: "/pdf/siakad.pdf",
            content: "#",
            date: "2026-03-05",
            category: "EDUTECH",
            size: "5.1 MB",
          },
          {
            id: "proj-aussierain",
            name: "AUSSIERAIN - AI Weather.pdf",
            type: "file",
            path: "/pdf/aussie-rain.pdf",
            content: "https://github.com/Rangga11268/ProjectFDA",
            date: "2024-11-10",
            category: "AI_ML",
            size: "2.4 MB",
          },
          {
            id: "proj-phd",
            name: "PHD TRANS - Premium Bus.pdf",
            type: "file",
            path: "/pdf/phd-trans.pdf",
            content: "https://github.com/Rangga11268/phd-trans",
            date: "2025-04-12",
            category: "PWA",
            size: "1.9 MB",
          },
          {
            id: "proj-navara",
            name: "NAVARA TRANS - Tourism.pdf",
            type: "file",
            path: "/pdf/navara.pdf",
            content: "https://github.com/Rangga11268/navara-trans",
            date: "2025-03-01",
            category: "BUSINESS",
            size: "1.5 MB",
          },
          {
            id: "proj-janguleee",
            name: "JANGULEEE TRANS - Bento.pdf",
            type: "file",
            path: "/pdf/janguleee.pdf",
            content: "https://github.com/Rangga11268/janguleee-trans",
            date: "2025-02-05",
            category: "UI_UX",
            size: "2.1 MB",
          },
          {
            id: "proj-apapesan",
            name: "APAPESAN - Messenger.pdf",
            type: "file",
            path: "/pdf/apapesan.pdf",
            content: "https://github.com/Rangga11268/ApaPesan-Laravel-project",
            date: "2024-08-15",
            category: "SECURITY",
            size: "3.2 MB",
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
