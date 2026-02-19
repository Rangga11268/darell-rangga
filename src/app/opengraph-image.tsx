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
        backgroundColor: "#050505", // Dark background
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #202020 2%, transparent 0%), radial-gradient(circle at 75px 75px, #202020 2%, transparent 0%)",
        backgroundSize: "100px 100px",
        position: "relative",
      }}
    >
      {/* Glow Effects */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background: "linear-gradient(to right, #4f46e5, #ec4899)",
          filter: "blur(100px)",
          opacity: 0.2,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "40%",
          height: "40%",
          borderRadius: "50%",
          background: "linear-gradient(to right, #3b82f6, #10b981)",
          filter: "blur(100px)",
          opacity: 0.2,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "32px",
          padding: "60px 100px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 24px",
            borderRadius: "99px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 10px #22c55e",
            }}
          />
          <span
            style={{
              color: "#e5e5e5",
              fontSize: 16,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            Available for Work
          </span>
        </div>

        <h1
          style={{
            fontSize: 96,
            fontWeight: 800,
            background: "linear-gradient(to bottom right, #fff, #a3a3a3)",
            backgroundClip: "text",
            color: "transparent",
            margin: 0,
            letterSpacing: "-0.05em",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          DARELL
          <br />
          RANGGA
        </h1>

        <p
          style={{
            fontSize: 24,
            color: "#a3a3a3",
            marginTop: 32,
            fontFamily: "monospace",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Fullstack Developer
        </p>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
