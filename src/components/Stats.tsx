import { useEffect, useRef, useState } from "react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  const stats = [
    { number: 500, suffix: "+", label: "Successful Traders" },
    { number: 95, suffix: "%", label: "Success Rate" },
    { number: 100, suffix: "+", label: "Markets Covered" },
    { number: 20, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section ref={sectionRef} className="relative py-16 border-b-2 border-white/20 overflow-hidden">
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-card border-2 border-white/20 rounded-xl hover:border-white hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:-translate-y-2 hover:scale-105 transition-all duration-300 group relative overflow-hidden animate-zoom-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(30px)',
              }}
            >
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="text-5xl lg:text-6xl font-black text-white mb-2 tracking-tight relative z-10">
                {isVisible && (
                  <span className="inline-block animate-bounce-in" style={{ animationDelay: `${index * 0.2 + 0.3}s` }}>
                    <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-white/80 uppercase tracking-wider group-hover:text-white transition-colors relative z-10">
                {stat.label}
              </div>
              
              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/50 rounded-xl transition-all duration-500 animate-pulse-glow" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
