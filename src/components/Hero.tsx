import { TrendingUp, Award, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatedBackground } from "./AnimatedBackground";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Best Stock Market Institute & Courses in Raipur";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-black overflow-hidden flex items-center pt-20"
    >
      {/* Animated Particle Background */}
      <AnimatedBackground />
      

      {/* Parallax Gradient Orbs */}
      <div 
        className="absolute top-20 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-20 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        style={{
          transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider">
              <Award className="w-4 h-4" />
              LEADING INDEPENDENT TRADING INSTITUTE
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight min-h-[180px] lg:min-h-[240px]">
              {typedText.split(" ").map((word, i) => {
                if (word === "VVN") {
                  return (
                    <span 
                      key={i} 
                      className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto] inline-block"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {word}{" "}
                    </span>
                  );
                }
                return (
                  <span 
                    key={i}
                    className="animate-text-reveal inline-block"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </h1>

            <p className="text-xl text-white leading-relaxed max-w-xl opacity-95 animate-text-reveal" style={{ animationDelay: "0.4s" }}>
              Best Stock Market Institute & Courses in Raipur. Leading Independent Stock Market (Trading) Institute established in 2022 in the heart of Chhattisgarh.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("contact")}
                className="text-lg font-bold px-8 py-6 bg-gradient-to-r from-white to-white/80 text-black shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_60px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300"
              >
                Book Strategy Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("services")}
                className="text-lg font-bold px-8 py-6 border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
              >
                Explore Services
              </Button>
            </div>

            {/* Founder Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div 
                className="flex items-center gap-3 animate-zoom-in hover:scale-110 transition-transform duration-300 cursor-default"
                style={{ animationDelay: "0.6s" }}
              >
                <Award className="w-8 h-8 text-white animate-wiggle" />
                <div>
                  <div className="text-2xl font-black text-white">12+</div>
                  <div className="text-sm text-white/90">Years Experience</div>
                </div>
              </div>
              <div 
                className="flex items-center gap-3 animate-zoom-in hover:scale-110 transition-transform duration-300 cursor-default"
                style={{ animationDelay: "0.7s" }}
              >
                <Users className="w-8 h-8 text-white animate-wiggle" style={{ animationDelay: "0.2s" }} />
                <div>
                  <div className="text-2xl font-black text-white">3,200+</div>
                  <div className="text-sm text-white/90">Traders Mentored</div>
                </div>
              </div>
              <div 
                className="flex items-center gap-3 animate-zoom-in hover:scale-110 transition-transform duration-300 cursor-default"
                style={{ animationDelay: "0.8s" }}
              >
                <TrendingUp className="w-8 h-8 text-white animate-wiggle" style={{ animationDelay: "0.4s" }} />
                <div>
                  <div className="text-2xl font-black text-white">89%</div>
                  <div className="text-sm text-white/90">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Founder Card with Glassmorphism */}
          <div 
            className="animate-fade-in-right"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="relative backdrop-blur-lg bg-white/95 border-4 border-white/20 rounded-2xl shadow-2xl hover:shadow-[0_20px_80px_rgba(255,255,255,0.2)] transition-all duration-300 hover:border-white/40 overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none z-10"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none z-10"></div>

              {/* Founder Full-Length Image */}
              <div className="relative w-full max-h-fit overflow-hidden">
                <img
                  src="/founder.jpg"
                  alt="Vinod Baghel - Founder & CEO"
                  className="w-full h-full object-cover object-center"
                />
                {/* Gradient Overlay at bottom */}
                {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/95 via-white/70 to-transparent"></div> */}
              </div>

              {/* Content Section */}
              <div className="p-8 pb-8 relative z-20">

                 <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white/10 text-black px-4 py-1.5 rounded-full text-sm font-bold">
                    <Award className="w-4 h-4" />
                    Founder & Expert Trader
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
