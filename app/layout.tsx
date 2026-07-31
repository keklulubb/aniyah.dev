import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aniyah Bohnen — personal website",
  description: "Welcome to Aniyah Bohnen's personal website.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
