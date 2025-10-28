import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        setScrollY(scrollProgress);
        setIsVisible(rect.top < window.innerHeight * 0.8 && rect.bottom > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Full-Time Trader",
      initials: "RK",
      text: "VVN Consultancy completely transformed my trading approach. Within 6 months, I went from struggling with losses to consistent profitability. The risk management strategies alone were worth the investment.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Options Specialist",
      initials: "PS",
      text: "The options trading course is incredibly comprehensive. I learned advanced strategies that I had never seen before. The live sessions and real-time market analysis are invaluable.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Intraday Trader",
      initials: "AP",
      text: "Best trading education I've received. The instructors are knowledgeable, patient, and genuinely care about student success. My win rate has improved dramatically thanks to their systematic approach.",
      rating: 5,
    },
    {
      name: "Sneha Reddy",
      role: "Portfolio Manager",
      initials: "SR",
      text: "The portfolio strategy course helped me build a diversified investment approach. I now have confidence in my long-term wealth planning and understand how to balance risk and reward effectively.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Technical Analyst",
      initials: "VS",
      text: "The technical analysis training is second to none. I learned chart patterns and indicators that actually work. The support community is also fantastic for continuous learning.",
      rating: 5,
    },
    {
      name: "Meera Iyer",
      role: "Swing Trader",
      initials: "MI",
      text: "VVN helped me develop the trading psychology needed for success. I no longer make emotional decisions and stick to my plan. This has made all the difference in my trading performance.",
      rating: 5,
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-24 bg-gradient-to-b from-[hsl(228,84%,5%)] to-[hsl(228,60%,8%)] border-b-2 border-primary/30 relative overflow-hidden"
    >
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        style={{
          transform: `translateY(${scrollY * 120}px)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        style={{
          transform: `translateY(${-scrollY * 80}px)`,
          transition: 'transform 0.1s linear'
        }}
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4">
            SUCCESS STORIES
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Real Results from Real Traders
          </h2>
          <p className="text-xl text-white/70">
            Join hundreds of successful traders who transformed their financial future with us
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="p-8 border-2 border-primary/20 hover:border-primary/60 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(99,102,241,0.3)] hover:bg-white/10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                transition: `all 0.6s ease-out ${index * 0.1}s`
              }}
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-white leading-relaxed mb-8">{testimonial.text}</p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-black text-white">{testimonial.name}</h4>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
