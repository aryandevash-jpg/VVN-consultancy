import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-[hsl(228,84%,8%)]/95 to-[hsl(228,60%,12%)]/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(99,102,241,0.2)] border-b-2 border-primary/30"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="text-2xl lg:text-3xl font-black tracking-tight text-white">
              VVN <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]">Consultancy</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] font-semibold transition-all duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] font-semibold transition-all duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] font-semibold transition-all duration-300"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] font-semibold transition-all duration-300"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] font-semibold transition-all duration-300"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-white/80 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] font-semibold transition-all duration-300"
            >
              Gallery
            </button>
          </div>

          <div className="hidden md:block">
            <Button
              size="lg"
              className="font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              Book Strategy Session
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[hsl(228,84%,8%)]/95 to-[hsl(228,60%,12%)]/95 backdrop-blur-xl border-t-2 border-primary/30">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("process")}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Process
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Results
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Team
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Gallery
            </button>
            <Button
              size="lg"
              className="w-full font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-[0_8px_32px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              Book Strategy Session
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
