import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <div
          style={{
            fontSize: 144,
            fontWeight: 900,
            fontFamily: "sans-serif",
            color: "#ffffff",
            lineHeight: 1,
            marginTop: "-6px",
          }}
        >
          e
        </div>
      </div>
    ),
    { ...size },
  );
}
