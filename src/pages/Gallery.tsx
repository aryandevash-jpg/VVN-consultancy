import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const GalleryPage = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <div className="pt-20 relative z-10">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default GalleryPage;

