import { useState, useEffect, useRef } from "react";

const Process = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const fullText = "Your Path to Trading Success";

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
          }, 60);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      description: "Free consultation to understand your goals, experience level, and trading objectives.",
    },
    {
      number: "02",
      title: "Custom Strategy",
      description: "Personalized learning path designed specifically for your needs and market interests.",
    },
    {
      number: "03",
      title: "Live Training",
      description: "Hands-on education with real-time market analysis and interactive trading sessions.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      description: "Continuous mentorship, community access, and lifetime support for sustained success.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 bg-gradient-to-br from-[hsl(228,84%,5%)] to-[hsl(228,60%,8%)] border-b-4 border-primary relative overflow-hidden"
    >
      {/* Background Grid with Parallax */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: `translateY(${scrollY * 50}px)`,
        }}
      />
      
      {/* Parallax Gradient Orbs */}
      <div 
        className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        style={{
          transform: `translateY(${scrollY * 80}px)`,
          transition: 'transform 0.1s linear'
        }}
      />
      <div 
        className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        style={{
          transform: `translateY(${-scrollY * 100}px)`,
          transition: 'transform 0.1s linear'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 text-accent px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4">
            OUR PROCESS
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight min-h-[60px]">
            {typedText}<span className="animate-pulse">{typedText.length < fullText.length ? '|' : ''}</span>
          </h2>
          <p className="text-xl text-white/70">
            A proven 4-step methodology to transform you into a confident, profitable trader
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/10 p-8 rounded-xl hover:bg-white/10 hover:border-primary transition-all duration-300 hover:-translate-y-2"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: `all 0.6s ease-out ${index * 0.15}s`
              }}
            >
              {/* Step Number */}
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6 text-2xl font-black text-white group-hover:scale-110 transition-transform">
                {step.number}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-white mb-3">{step.title}</h3>
              <p className="text-white/70 leading-relaxed">{step.description}</p>

              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-primary/30" />
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          >
            Start Your Journey Today
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Process;
