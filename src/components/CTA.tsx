import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
      className="py-24 border-b-4 border-white/30 relative overflow-hidden"
    >
      {/* Background Grid with Parallax */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: `translateY(${scrollY * 50}px)`,
        }}
      />
      
      {/* Parallax Gradient Orbs */}
      <div 
        className="absolute top-20 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        style={{
          transform: `translateY(${scrollY * 80}px)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute bottom-20 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        style={{
          transform: `translateY(${-scrollY * 100}px)`,
          transition: 'transform 0.1s linear'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 border-2 border-white rounded-full mb-8 animate-float">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight min-h-[140px] lg:min-h-[180px]">
          {typedText}<span className="animate-pulse">{typedText.length < fullText.length ? '|' : ''}</span>
        </h2>

        {/* Description */}
        <p className="text-xl lg:text-2xl text-white mb-12 max-w-2xl mx-auto leading-relaxed opacity-95">
          Join 3,200+ traders who have achieved financial independence through proven swing trading methodologies and expert-led training programs.
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
            className="text-lg font-bold px-10 py-7 bg-gradient-to-r from-white to-white/80 text-black shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:shadow-[0_10px_60px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-1 hover:scale-105"
          >
            Book Your Free Strategy Session
          </Button>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="text-lg font-bold px-10 py-7 border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-black transition-all hover:-translate-y-1 hover:scale-105"
            >
              View Courses
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t-2 border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100%", label: "Assistance Available" },
              { number: "24/7", label: "Support Available" },
              { number: "Live", label: "Trading Sessions" },
              { number: "Lifetime", label: "Course Access" },
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center group hover:scale-110 transition-transform duration-300 cursor-default animate-zoom-in"
                style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
              >
                <div className="text-3xl font-black text-white mb-1 group-hover:animate-wiggle inline-block">{item.number}</div>
                <div className="text-sm text-white/90 font-semibold group-hover:text-white transition-colors">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
