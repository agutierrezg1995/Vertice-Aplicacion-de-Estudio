import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vértice | Tu mapa de estudio",
  description: "Convierte tus materias en sesiones de estudio claras y accionables.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
