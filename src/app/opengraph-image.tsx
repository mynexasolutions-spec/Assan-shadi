import { ImageResponse } from "next/og";

export const alt =
  "Asaan Shaadi — Simple, Dignified, Guardian-Verified Nikah in Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#252525",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 6,
              background: "#9a6a4f",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              display: "flex",
              color: "#9a6a4f",
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Muslim Matrimony
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#FAF7F2",
              fontSize: 116,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Asaan Shaadi
          </div>
          <div
            style={{
              display: "flex",
              color: "#e5c384",
              fontSize: 40,
              marginTop: 18,
            }}
          >
            Simple, Dignified, Guardian-Verified Nikah
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", color: "#FAF7F2", fontSize: 30 }}>
            Bengaluru, Karnataka
          </div>
          <div style={{ display: "flex", color: "#9a6a4f", fontSize: 30 }}>
            asaanshaadi.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
