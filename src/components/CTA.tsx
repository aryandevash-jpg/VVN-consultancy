import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const CTA = () => {
  const [typedText, setTypedText] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const fullText = "Ready to Transform Your Trading Career?";

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        setScrollY(scrollProgress);
        
        if (rect.top < window.innerHeight * 0.8 && !isVisible) {
          setIsVisible(true);
          let currentIndex = 0;
          const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
              setTypedText(fullText.slice(0, currentIndex));
              currentIndex++;
            } else {
              clearInterval(typingInterval);
            }
          }, 50);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);
  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-gradient-to-br from-[hsl(228,84%,5%)] via-[hsl(228,60%,8%)] to-[hsl(228,84%,5%)] border-b-4 border-primary relative overflow-hidden"
    >
      {/* Background Effects with Parallax */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{
          transform: `translateY(${scrollY * 60}px)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"
        style={{
          transform: `translateY(${-scrollY * 80}px)`,
          transition: 'transform 0.1s linear'
        }}
      />

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "grid-move 20s linear infinite",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 border-2 border-primary rounded-full mb-8 animate-float">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight min-h-[140px] lg:min-h-[180px]">
          {typedText}<span className="animate-pulse">{typedText.length < fullText.length ? '|' : ''}</span>
        </h2>

        {/* Description */}
        <p className="text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join 500+ successful traders who have achieved consistent profitability with our
          expert-led training programs.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out 0.5s'
          }}
        >
          <Button
            size="lg"
            className="text-lg font-bold px-10 py-7 bg-gradient-to-r from-primary to-accent text-white shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:shadow-[0_10px_60px_rgba(99,102,241,0.6)] transition-all hover:-translate-y-1 hover:scale-105"
          >
            Book Your Free Strategy Session
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg font-bold px-10 py-7 border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-[hsl(228,84%,5%)] transition-all hover:-translate-y-1 hover:scale-105"
          >
            View Course Catalog
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t-2 border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-black text-white mb-1">100%</div>
              <div className="text-sm text-white/60 font-semibold">Money-Back Guarantee</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">24/7</div>
              <div className="text-sm text-white/60 font-semibold">Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">Live</div>
              <div className="text-sm text-white/60 font-semibold">Trading Sessions</div>
            </div>
            <div>
              <div className="text-3xl font-black text-white mb-1">Lifetime</div>
              <div className="text-sm text-white/60 font-semibold">Course Access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
