import { BarChart3, TrendingUp, Target, Shield, Brain, PieChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

const Services = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        setScrollY(scrollProgress);
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const services = [
    {
      icon: BarChart3,
      title: "Technical Analysis",
      description:
        "Master chart patterns, indicators, and price action strategies with comprehensive training from industry experts.",
    },
    {
      icon: TrendingUp,
      title: "Options Trading",
      description:
        "Advanced derivatives training covering options strategies, hedging techniques, and risk management.",
    },
    {
      icon: Target,
      title: "Intraday Strategies",
      description:
        "Learn profitable day trading systems with real-time market analysis and live trading sessions.",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description:
        "Protect your capital with proven risk management frameworks and position sizing strategies.",
    },
    {
      icon: Brain,
      title: "Trading Psychology",
      description:
        "Develop mental resilience and emotional control essential for consistent trading success.",
    },
    {
      icon: PieChart,
      title: "Portfolio Strategy",
      description:
        "Build diversified portfolios with strategic asset allocation and long-term wealth planning.",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-24 bg-gradient-to-b from-[hsl(228,60%,8%)] to-[hsl(228,84%,5%)] border-b-2 border-primary/30 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        style={{
          transform: `translateY(${scrollY * 100}px)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        style={{
          transform: `translateY(${-scrollY * 150}px)`,
          transition: 'transform 0.1s linear'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4">
            OUR SERVICES
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Comprehensive Trading Solutions
          </h2>
          <p className="text-xl text-white/70">
            Expert training and consultancy designed to accelerate your trading success
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-8 border-2 border-primary/20 hover:border-primary/60 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.3)] hover:bg-white/10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.6s ease-out ${index * 0.1}s`
              }}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Glowing hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="w-16 h-16 bg-primary/10 border-2 border-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300">
                <service.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-white mb-3">{service.title}</h3>
              <p className="text-white/70 leading-relaxed mb-4">{service.description}</p>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                Learn More
                <span className="text-xl">→</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
