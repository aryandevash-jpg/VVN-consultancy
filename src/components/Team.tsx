import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  designation: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const Team = () => {
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

  const teamMembers: TeamMember[] = [
    {
      name: "Vinod Kumar Baghel",
      designation: "Director & Founder",
      image: "/vinod-sir.jpeg",
    },
    {
      name: "Soniya Kurre",
      designation: "HR",
      image: "/soniya-kurre.jpeg",
    },
    {
      name: "Vikas Kumar Tandey",
      designation: "Management",
      image: "/vikas.jpeg",
    },
    {
      name: "Ashish Narang",
      designation: "NISM Certified Technical Analyst",
      image: "/ashishn.jpeg",
    },
    {
      name: "Chandraprakash",
      designation: "Instructor",
      image: "/chandraprakash.jpeg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="team"
      className="py-24 border-b-2 border-white/20 relative overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4">
            OUR TEAM
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Meet the Founding Members
          </h2>
          <p className="text-xl text-white opacity-95">
            Expert professionals dedicated to your trading success
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-8 border-2 border-white/20 hover:border-white/60 backdrop-blur-sm bg-white/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:rotate-1"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? 'translateY(0) scale(1) rotate(0deg)' 
                  : 'translateY(50px) scale(0.95) rotate(-3deg)',
                transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.12}s`
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                card.style.transform = `translateY(-12px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top glow bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Image container with glow effect */}
              <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-white/30 group-hover:border-white/70 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] animate-bounce-in" style={{ animationDelay: `${index * 0.15 + 0.3}s` }}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Member Info */}
              <div className="text-center space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-white group-hover:text-white transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-white/90 font-semibold group-hover:text-white transition-colors">
                  {member.designation}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center hover:bg-white hover:border-white transition-all hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover:text-black" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center hover:bg-white hover:border-white transition-all hover:scale-110"
                  >
                    <Mail className="w-5 h-5 text-white group-hover:text-black" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

