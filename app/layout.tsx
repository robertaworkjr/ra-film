import type { Metadata } from "next";
import "./globals.css";
import VoiceAgent from "@/components/VoiceAgent";

export const metadata: Metadata = {
  title: "RA-Film",
  description: "Cinematic storytelling. Every frame matters.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <VoiceAgent />
      </body>
    </html>
  );
}
