import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
          ? "bg-black/95 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.1)] border-b-2 border-white/20"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl lg:text-3xl font-black tracking-tight text-white">
              VVN <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Consultancy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {location.pathname === "/" ? (
              <button
                onClick={() => scrollToSection("home")}
                className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 relative group hover:scale-110"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </button>
            ) : (
              <Link
                to="/"
                className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 relative group hover:scale-110"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </Link>
            )}
            {location.pathname === "/" ? (
              <>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 relative group hover:scale-110"
                >
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection("process")}
                  className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 relative group hover:scale-110"
                >
                  Process
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 relative group hover:scale-110"
                >
                  Results
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/#services"
                  className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300"
                >
                  Services
                </Link>
                <Link
                  to="/#process"
                  className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300"
                >
                  Process
                </Link>
                <Link
                  to="/#testimonials"
                  className="text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300"
                >
                  Results
                </Link>
              </>
            )}
            <Link
              to="/about"
              className={`text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 ${location.pathname === "/about" ? "text-white" : ""}`}
            >
              About Us
            </Link>
            <Link
              to="/gallery"
              className={`text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 ${location.pathname === "/gallery" ? "text-white" : ""}`}
            >
              Gallery
            </Link>
            <Link
              to="/courses"
              className={`text-white/95 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-semibold transition-all duration-300 relative group hover:scale-110 ${location.pathname === "/courses" ? "text-white" : ""}`}
            >
              Courses
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
          </div>

          <div className="hidden md:block">
            <Button
              size="lg"
              className="font-bold bg-gradient-to-r from-white to-white/80 text-black shadow-lg hover:shadow-[0_8px_32px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              onClick={() => {
                if (location.pathname === "/") {
                  scrollToSection("contact");
                } else {
                  window.location.href = "/#contact";
                }
              }}
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
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t-2 border-white/20">
          <div className="px-6 py-4 space-y-4">
            {location.pathname === "/" ? (
              <button
                onClick={() => {
                  scrollToSection("home");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
              >
                Home
              </button>
            ) : (
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
              >
                Home
              </Link>
            )}
            {location.pathname === "/" ? (
              <>
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
              </>
            ) : (
              <>
                <Link
                  to="/#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="/#process"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
                >
                  Process
                </Link>
                <Link
                  to="/#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
                >
                  Results
                </Link>
              </>
            )}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Gallery
            </Link>
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left text-white/80 hover:text-white font-semibold py-2 transition-colors"
            >
              Courses
            </Link>
            <Button
              size="lg"
              className="w-full font-bold bg-gradient-to-r from-white to-white/80 text-black shadow-lg hover:shadow-[0_8px_32px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              onClick={() => {
                if (location.pathname === "/") {
                  scrollToSection("contact");
                } else {
                  window.location.href = "/#contact";
                }
                setMobileMenuOpen(false);
              }}
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
