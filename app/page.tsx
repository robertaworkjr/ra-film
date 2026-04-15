import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Showreel from "@/components/Showreel";
import FilmCell from "@/components/FilmCell";
import AIArtwork from "@/components/AIArtwork";
import DroneReel from "@/components/DroneReel";
import BlenderWork from "@/components/BlenderWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Showreel />
      <FilmCell />
      <AIArtwork />
      <DroneReel />
      <BlenderWork />
      <Contact />
      <Footer />
    </main>
  );
}
