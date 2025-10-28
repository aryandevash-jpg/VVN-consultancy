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
    <section ref={sectionRef} className="bg-background py-16 border-b-2 border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-card border-2 border-border rounded-xl hover:border-primary hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl lg:text-6xl font-black text-primary mb-2 tracking-tight">
                {isVisible && <AnimatedNumber target={stat.number} suffix={stat.suffix} />}
              </div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
