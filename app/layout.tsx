import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ular Tangga Mania — Game Klasik dengan Pengalaman Modern",
  description:
    "Mainkan Ular Tangga Mania: super power, event acak, dan arena yang selalu berubah. Single player vs bot atau multiplayer lokal hingga 10 pemain.",
  keywords: ["ular tangga", "snake and ladder", "game browser", "board game"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF7A2E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
