import { ImageResponse } from "next/og";

// La marca del header es «Kenny Medina.» — el nombre y un punto verde. A 32px
// el nombre no se lee, así que el favicon se queda con las dos piezas que sí
// sobreviven al tamaño: la K y el punto.
export const size = { width: 32, height: 32 };
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
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontSize: 22,
          fontWeight: 600,
          borderRadius: 6,
        }}
      >
        K
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: 999,
            backgroundColor: "#54d48b",
            marginLeft: 1,
            marginTop: 8,
          }}
        />
      </div>
    ),
    size,
  );
}
