import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMX AI Marketing Tool",
  description: "AI-powered digital marketing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}