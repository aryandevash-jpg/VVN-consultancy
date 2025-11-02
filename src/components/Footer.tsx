import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLFooterElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="bg-black text-white py-16 border-t-2 border-white/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-black mb-4">
              VVN <span className="text-primary">Consultancy</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              VVN CONSULTANCY is pleased to introduce itself as a leading independent STOCK MARKET (TRADING) INSTITUTE. We started our journey in the year 2022 in the heart of Chhattisgarh, in Raipur.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { id: "home", label: "Home" },
                { id: "services", label: "Services" },
                { id: "process", label: "Process" },
                { id: "testimonials", label: "Testimonials" },
              ].map((item, index) => (
                <li 
                  key={item.id}
                  className="animate-slide-in-blur"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${index * 0.1 + 0.2}s`
                  }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-white/80 hover:text-white font-semibold transition-all duration-300 relative group hover:translate-x-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-black mb-4">Services</h3>
            <ul className="space-y-3">
              {[
                "Stock Market Fundamentals",
                "Technical Analysis",
                "Fundamental Analysis",
                "Intraday & Swing Trading",
                "Futures & Options",
                "Trading Psychology",
              ].map((service, index) => (
                <li 
                  key={index}
                  className="text-white/80 font-semibold hover:text-white transition-colors cursor-default animate-fade-in"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                    transition: `all 0.4s ease-out ${index * 0.08 + 0.3}s`
                  }}
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-black mb-4">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="font-semibold">Raipur, Chhattisgarh</li>
              <li className="font-semibold">India</li>
              <li className="font-semibold">Established: 2022</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-white/20 text-center">
          <p className="text-muted-foreground font-semibold">
            © {new Date().getFullYear()} VVN CONSULTANCY. All rights reserved. | Leading Independent Stock Market (Trading) Institute | Raipur, Chhattisgarh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
