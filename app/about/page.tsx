import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AboutHero from "@/components/about/AboutHero";
import AiTechnology from "@/components/about/AiTechnology";
import VideoShowcase from "@/components/about/VideoShowcase";
import AboutFooterCTA from "@/components/about/AboutFooterCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — RA-Film",
  description: "Art, Technology & AI for Film. The RA-Film approach to cinematic storytelling.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <AiTechnology />
      <VideoShowcase />
      <AboutFooterCTA />
      <Footer />
    </main>
  );
}
