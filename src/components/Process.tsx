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
      title: "Choose Course",
      description: "Select the right course for your trading goals",
    },
    {
      number: "02",
      title: "Learn from Experts",
      description: "Gain insights from seasoned traders",
    },
    {
      number: "03",
      title: "Practice Trading",
      description: "Practice with live market simulations",
    },
    {
      number: "04",
      title: "Build Strategy",
      description: "Create a personalized trading plan",
    },
    {
      number: "05",
      title: "Start Trading",
      description: "Apply skills and make informed decisions",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 border-b-4 border-white/30 relative overflow-hidden"
    >
      
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
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4">
            OUR PROCESS
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight min-h-[60px]">
            {typedText}<span className="animate-pulse">{typedText.length < fullText.length ? '|' : ''}</span>
          </h2>
          <p className="text-xl text-white/70">
            Journey to Success - Streamlined Process to transform you into a confident, profitable trader
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm border-2 border-white/10 p-8 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? 'translateY(0) rotate(0deg) scale(1)' 
                  : 'translateY(50px) rotate(-5deg) scale(0.9)',
                transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`
              }}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all duration-500 blur-xl" />
              
              {/* Step Number */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 text-2xl font-black text-black group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 relative z-10 animate-bounce-in" style={{ animationDelay: `${index * 0.15 + 0.2}s` }}>
                <span className="group-hover:animate-wiggle inline-block">{step.number}</span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-white mb-3 group-hover:scale-105 transition-transform relative z-10">{step.title}</h3>
              <p className="text-white opacity-95 leading-relaxed group-hover:opacity-100 transition-opacity relative z-10">{step.description}</p>

              {/* Animated Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-0.5 bg-white/30 group-hover:bg-white group-hover:w-8 transition-all duration-300" />
              )}
              
              {/* Progress indicator */}
              <div 
                className="absolute bottom-0 left-0 h-1 bg-white/30 group-hover:bg-white transition-all duration-500"
                style={{
                  width: isVisible ? `${((index + 1) / steps.length) * 100}%` : '0%',
                  transitionDelay: `${index * 0.15 + 0.3}s`
                }}
              />
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
            className="inline-flex items-center gap-3 bg-white hover:bg-white/90 text-black px-8 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-1 hover:scale-105"
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
