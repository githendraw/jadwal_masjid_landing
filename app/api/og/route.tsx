import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  const title = "Waktu Sholat - Jadwal Sholat Digital untuk TV Masjid";
  const description = "Tampilkan jadwal sholat akurat di TV masjid dengan mudah.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A192F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: "radial-gradient(ellipse_at_top_right, rgba(16, 185, 129, 0.15) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <h1
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 32,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          {description}
        </p>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
