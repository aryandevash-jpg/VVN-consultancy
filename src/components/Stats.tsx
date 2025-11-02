import { useEffect, useRef, useState } from "react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    return () => observer.disconnect();
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
    <section ref={sectionRef} className="bg-black py-16 border-b-2 border-white/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
