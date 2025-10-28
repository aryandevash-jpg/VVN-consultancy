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
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
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
      className="py-24 bg-gradient-to-b from-[hsl(228,60%,8%)] to-[hsl(228,84%,5%)] border-b-2 border-primary/30 relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4">
            OUR TEAM
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Meet the Founding Members
          </h2>
          <p className="text-xl text-white/70">
            Expert professionals dedicated to your trading success
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden p-8 border-2 border-primary/20 hover:border-primary/60 backdrop-blur-sm bg-white/5 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(99,102,241,0.4)] hover:bg-white/10"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                transition: `all 0.8s ease-out ${index * 0.15}s`
              }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Top glow bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Image container with glow effect */}
              <div className="relative mx-auto w-48 h-48 mb-6 overflow-hidden rounded-full border-4 border-primary/30 group-hover:border-primary/70 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Member Info */}
              <div className="text-center space-y-3 relative z-10">
                <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-primary/80 font-semibold group-hover:text-primary transition-colors">
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
                    className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all hover:scale-110"
                  >
                    <Linkedin className="w-5 h-5 text-primary group-hover:text-white" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center hover:bg-primary hover:border-primary transition-all hover:scale-110"
                  >
                    <Mail className="w-5 h-5 text-primary group-hover:text-white" />
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

