import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solra — You've always known. Let's find it together.",
  description:
    "Solra is a deep self-discovery platform. Have a real conversation about who you are, what drives you, and where you belong — no generic tests, just honest reflection.",
  keywords: ["self-discovery", "life direction", "psychology", "chatbot", "career", "values"],
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
