import "./globals.css";
import type { Metadata } from "next";
import RootThemeInitializer from "@/components/theme/RootThemeInitializer";

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
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <RootThemeInitializer />
        {children}
      </body>
    </html>
  );
}