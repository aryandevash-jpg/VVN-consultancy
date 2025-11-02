import { BarChart3, TrendingUp, Target, Shield, Brain, PieChart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

const Services = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverTransforms, setHoverTransforms] = useState<Record<number, { rotateX: number; rotateY: number }>>({});

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
      title: "Stock Market Fundamentals",
      description:
        "Understanding how the stock market works is essential for any investor. We cover fundamental topics such as stock exchanges, market indices, trading accounts, and the differences between investing and trading.",
    },
    {
      icon: TrendingUp,
      title: "Technical Analysis",
      description:
        "Learn how to read charts, analyze price patterns, and use indicators like Moving Averages, RSI, and MACD. Technical analysis helps traders make data-driven decisions and identify potential market trends.",
    },
    {
      icon: Target,
      title: "Fundamental Analysis",
      description:
        "We provide detailed information on evaluating a company's financial health, analyzing balance sheets, and understanding key financial ratios to select the best stocks for long-term growth.",
    },
    {
      icon: Shield,
      title: "Intraday & Swing Trading",
      description:
        "For those interested in short-term trading, we share techniques to capitalize on daily price movements and medium-term trends. Learn how to manage risks and maximize profits effectively.",
    },
    {
      icon: Brain,
      title: "Futures & Options (Derivatives)",
      description:
        "We break down the complexities of futures and options trading, helping traders understand hedging strategies, leverage, and risk management in the derivatives market.",
    },
    {
      icon: PieChart,
      title: "Trading Psychology & Risk Management",
      description:
        "Controlling emotions and managing risks are crucial aspects of successful trading. We offer insights into how professional traders handle losses, maintain discipline, and stay consistent in their strategies.",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-24 border-b-2 border-white/10 relative overflow-hidden"
    >
      
      {/* Parallax Gradient Orbs */}
      <div 
        className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border-2 border-white/15 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4">
            OUR SERVICES
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            What We Offer
          </h2>
          <p className="text-xl text-white/70">
            Comprehensive stock market education from fundamental concepts to advanced technical analysis
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-8 border-2 border-white/10 hover:border-white/30 backdrop-blur-sm bg-white/3 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.05)] hover:bg-white/5 cursor-default select-none"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? (hoverTransforms[index] 
                      ? `translateY(-8px) rotateX(${hoverTransforms[index].rotateX}deg) rotateY(${hoverTransforms[index].rotateY}deg)`
                      : 'translateY(0) rotateX(0) rotateY(0)')
                  : 'translateY(50px) rotateX(15deg)',
                transition: hoverTransforms[index] 
                  ? 'transform 0.1s ease-out' 
                  : `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
                transformStyle: 'preserve-3d',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                touchAction: 'pan-y', // Allow vertical scrolling but prevent other touch gestures
              }}
              onMouseMove={(e) => {
                // Only apply 3D effect on desktop (non-touch devices)
                if (window.innerWidth >= 768 && isVisible) {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  
                  setHoverTransforms(prev => ({
                    ...prev,
                    [index]: { rotateX, rotateY }
                  }));
                }
              }}
              onMouseLeave={() => {
                setHoverTransforms(prev => {
                  const newTransforms = { ...prev };
                  delete newTransforms[index];
                  return newTransforms;
                });
              }}
              onClick={(e) => {
                // Explicitly prevent any navigation - cards are not clickable
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Glowing hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="w-16 h-16 bg-white/5 border-2 border-white/40 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-white mb-3 group-hover:text-white/90 transition-colors">{service.title}</h3>
              <p className="text-white opacity-95 leading-relaxed mb-4 group-hover:opacity-100 transition-opacity">{service.description}</p>

              {/* Learn More - Decorative only, no link */}
              <div className="flex items-center gap-2 text-white/70 font-bold transition-all pointer-events-none">
                Learn More
                <span className="text-xl inline-block">→</span>
              </div>
              
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/10 group-hover:to-white/5 transition-all duration-500 -z-10" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
