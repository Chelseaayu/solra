import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "Solra — You've always known. Let's find it together.",
  description:
    "Solra is a deep self-discovery platform. Have a real conversation about who you are, what drives you, and where you belong.",
  keywords: ["self-discovery", "life direction", "psychology", "chatbot", "career", "values"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
