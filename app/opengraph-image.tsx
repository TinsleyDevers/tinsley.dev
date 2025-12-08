import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Tinsley Devers - Product Manager & Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#ffffff",
          padding: "80px",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "linear-gradient(to right, #171717, #737373, #e5e5e5)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "#737373",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Product Manager & Developer
          </div>

          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#171717",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            Tinsley
          </div>
          <div
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#171717",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              marginTop: "-20px",
            }}
          >
            Devers
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#737373",
              marginTop: "16px",
              maxWidth: "700px",
              lineHeight: 1.4,
            }}
          >
            Building at the intersection of technology and user experience.
          </div>
        </div>

        {/* Bottom right - URL */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            fontSize: "24px",
            fontWeight: 600,
            color: "#171717",
          }}
        >
          tinsley.dev
        </div>

        {/* Location badge */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "20px",
            color: "#737373",
          }}
        >
          <span>📍</span>
          <span>NYC</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
