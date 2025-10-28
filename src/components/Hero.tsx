import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatedBackground } from "./AnimatedBackground";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const fullText = "Unlock Success in the Stock Market with VVN Consultancy";
  
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
      className="relative min-h-screen bg-gradient-to-br from-[hsl(228,84%,5%)] to-[hsl(228,60%,8%)] overflow-hidden flex items-center pt-20"
    >
      {/* Animated Particle Background */}
      <AnimatedBackground />
      
      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      {/* Gradient Orbs with Parallax */}
      <div 
        className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float"
        style={{
          transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{
          transform: `translate(${-mousePosition.x * 1.5}px, ${-mousePosition.y * 1.5}px)`,
          transition: 'transform 0.3s ease-out',
          animationDelay: '1s'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 text-accent px-4 py-2 rounded-full text-sm font-bold tracking-wider">
              <Award className="w-4 h-4" />
              STRATEGY | EXECUTION | GROWTH
            </div>

            <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight min-h-[180px] lg:min-h-[240px]">
              {typedText.split(" ").map((word, i) => {
                if (word === "VVN") {
                  return (
                    <span key={i} className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {word}{" "}
                    </span>
                  );
                }
                return <span key={i}>{word} </span>;
              })}
              {/* <span className="animate-pulse">|</span> */}
            </h1>

            <p className="text-xl text-white/70 leading-relaxed max-w-xl">
              Transform your trading with expert strategies, advanced analytics,
              and proven methodologies that deliver consistent results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg font-bold px-8 py-6 bg-gradient-to-r from-primary to-accent text-white shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:shadow-[0_10px_60px_rgba(99,102,241,0.6)] hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                Book Strategy Session
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg font-bold px-8 py-6 border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-[hsl(228,84%,5%)] hover:scale-105 transition-all duration-300"
                onClick={() => scrollToSection("services")}
              >
                Explore Services
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-black text-white">500+</div>
                  <div className="text-sm text-white/60">Students</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-accent" />
                <div>
                  <div className="text-2xl font-black text-white">95%</div>
                  <div className="text-sm text-white/60">Success Rate</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-[hsl(145,80%,42%)]" />
                <div>
                  <div className="text-2xl font-black text-white">20+</div>
                  <div className="text-sm text-white/60">Years Exp</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Chart Card with Glassmorphism */}
          <div 
            className="animate-fade-in-right"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${-mousePosition.y * 0.5}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="backdrop-blur-lg bg-white/95 border-4 border-primary/20 rounded-2xl p-8 shadow-2xl hover:shadow-[0_20px_80px_rgba(99,102,241,0.4)] transition-all duration-300 hover:border-primary/40">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-sm font-bold text-muted-foreground mb-1">
                    Student Success Rate
                  </div>
                  <div className="text-4xl font-black text-foreground">95.4%</div>
                  <div className="text-[hsl(145,80%,42%)] font-bold text-sm mt-1">
                    ↑ +18.2% this year
                  </div>
                </div>
              </div>

              {/* Chart Visualization */}
              <div className="relative h-64">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 200"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(217, 91%, 51%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(189, 100%, 50%)" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Chart Line */}
                  <path
                    d="M0,180 L50,160 L100,140 L150,100 L200,80 L250,60 L300,40 L350,20 L400,10"
                    stroke="hsl(217, 91%, 51%)"
                    strokeWidth="3"
                    fill="none"
                    className="animate-[dash_2s_ease-out_forwards]"
                    style={{
                      strokeDasharray: "1000",
                      strokeDashoffset: "1000",
                      animation: "dash 2s ease-out forwards",
                    }}
                  />
                  
                  {/* Fill Area */}
                  <path
                    d="M0,180 L50,160 L100,140 L150,100 L200,80 L250,60 L300,40 L350,20 L400,10 L400,200 L0,200 Z"
                    fill="url(#chartGradient)"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t-2">
                <div>
                  <div className="text-2xl font-black text-primary">500+</div>
                  <div className="text-xs text-muted-foreground font-semibold">Graduates</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-accent">100+</div>
                  <div className="text-xs text-muted-foreground font-semibold">Markets</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[hsl(145,80%,42%)]">24/7</div>
                  <div className="text-xs text-muted-foreground font-semibold">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
