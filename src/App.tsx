import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import GalleryPage from "./pages/Gallery";
import About from "./pages/About";
import Courses from "./pages/Courses";
import ServicesPage from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";

const queryClient = new QueryClient();

const App = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        {/* Global Background Layer - black background */}
        <div className="fixed inset-0 bg-black -z-50" />
        
        {/* Shooting Stars and Stars Background - Replaces tile background */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: -2,
          }}
        >
          <StarsBackground 
            starDensity={0.01}
            allStarsTwinkle={true}
            twinkleProbability={0.8}
            minTwinkleSpeed={0.5}
            maxTwinkleSpeed={1}
          />
          <ShootingStars
            minSpeed={0.1}
            maxSpeed={0.2}
            minDelay={800}
            maxDelay={2000}
            starColor="violet"
            trailColor="violet"
            starWidth={80}
            starHeight={3}
          />
        </div>
        
        {/* Global Parallax Gradient Orbs */}
        <div 
          className="fixed top-20 right-0 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.8}px)`,
            transition: 'transform 0.1s linear',
            zIndex: -1,
          }}
        />
        <div 
          className="fixed bottom-20 left-0 w-96 h-96 bg-white/3 rounded-full blur-3xl pointer-events-none"
          style={{
            transform: `translateY(${-scrollY * 1}px)`,
            transition: 'transform 0.1s linear',
            zIndex: -1,
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
