import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <Navigation />
      <div className="pt-20">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;

