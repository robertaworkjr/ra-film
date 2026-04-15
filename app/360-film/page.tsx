import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ImmersiveHero from "@/components/360film/ImmersiveHero";
import PanoViewer from "@/components/360film/PanoViewer";
import ProcessSection from "@/components/360film/ProcessSection";
import ExhibitionGallery from "@/components/360film/ExhibitionGallery";
import ImmersiveExperiences from "@/components/360film/ImmersiveExperiences";
import FilmCTA from "@/components/360film/FilmCTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "360° Film — RA-Film",
  description: "Immersive 360° filmmaking. Spatial storytelling that surrounds the viewer in every direction.",
};

export default function Film360Page() {
  return (
    <main>
      <Navbar />
      <ImmersiveHero />
      <PanoViewer />
      <ProcessSection />
      <ExhibitionGallery />
      <ImmersiveExperiences />
      <FilmCTA />
      <Footer />
    </main>
  );
}
