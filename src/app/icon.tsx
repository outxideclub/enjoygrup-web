import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "40px",
        }}
      >
        <div
          style={{
            fontSize: 156,
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
