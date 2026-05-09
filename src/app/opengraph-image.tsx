import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Darell Rangga - Fullstack Developer Indonesia | Portfolio";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9f7f2", // Creamy paper background
        position: "relative",
        padding: "40px",
        border: "20px solid #1a1c1c", // Thick ink border
      }}
    >
      {/* Newspaper Grain/Texture simulation */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #1a1c1c",
          padding: "60px 80px",
          width: "100%",
          height: "100%",
        }}
      >
        {/* Editorial Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            borderBottom: "1px solid rgba(26, 28, 28, 0.2)",
            paddingBottom: "10px",
            marginBottom: "40px",
            fontSize: 20,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#1a1c1c",
          }}
        >
          <span>Vol. 2025</span>
          <span>Editorial Edition</span>
          <span>No. 07</span>
        </div>

        <h1
          style={{
            fontSize: 140,
            fontWeight: 900,
            color: "#1a1c1c",
            margin: 0,
            letterSpacing: "-0.05em",
            textAlign: "center",
            lineHeight: 0.8,
            textTransform: "uppercase",
            borderBottom: "8px solid #1a1c1c",
            paddingBottom: "20px",
            marginBottom: "30px",
          }}
        >
          DARELL RANGGA
        </h1>

        <div
          style={{
            fontSize: 32,
            color: "#1a1c1c",
            marginTop: 10,
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            fontStyle: "italic",
          }}
        >
          Fullstack Developer & Digital Craftsman
        </div>

        {/* Footer Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "60px",
            fontSize: 18,
            color: "rgba(26, 28, 28, 0.5)",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.5em",
          }}
        >
          Available for Global Dispatch • Based in Indonesia
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
