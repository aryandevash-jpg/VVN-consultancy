import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Target, Lightbulb, Shield, Award, User, TrendingUp, BarChart, CheckCircle2, Sparkles } from "lucide-react";
import Team from "@/components/Team";

interface AboutData {
  company: {
    name: string;
    legal_type: string;
    founder: string;
    founded_year: number;
    location: {
      city: string;
      state: string;
      description: string;
    };
    sebi_registration: {
      number: string;
      type: string;
    };
    type: string;
  };
  about: {
    overview: string;
    services_description: string;
    supported_platforms: string[];
    unique_selling_points: string[];
  };
  vision_mission_values: {
    vision: { title: string; statement: string };
    mission: { title: string; statement: string };
    values: { title: string; statement: string; core_values: string[] };
  };
  key_details: {
    table_title: string;
    details: Array<{ attribute: string; value: string }>;
  };
  founder_message: {
    title: string;
    name: string;
    greeting: string;
    full_message: string[];
    key_points: string[];
    philosophy: {
      belief: string;
      approach: string;
      promise: string;
    };
  };
  educational_content: {
    comparison: {
      title: string;
      sections: Array<{
        type: string;
        title: string;
        description: string;
        characteristics: string[];
      }>;
      conclusion: string;
      decision_factors: string[];
    };
  };
}

const About = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    vision: useRef<HTMLDivElement>(null),
    keyDetails: useRef<HTMLDivElement>(null),
    founder: useRef<HTMLDivElement>(null),
    comparison: useRef<HTMLDivElement>(null),
    usp: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData as AboutData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => new Set(prev).add(key));
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Error loading data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6 animate-zoom-in">
                <Building2 className="w-4 h-4 animate-wiggle" />
                ABOUT US
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight animate-text-reveal">
                About VVN Consultancy
              </h1>
              <p className="text-xl text-white/90 leading-relaxed animate-text-reveal" style={{ animationDelay: "0.2s" }}>
                {data.about.overview}
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section ref={sectionRefs.overview} className="py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-white/10"
              style={{
                opacity: visibleSections.has('overview') ? 1 : 0,
                transform: visibleSections.has('overview') 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(50px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl font-black text-white mb-4 flex items-center gap-3 group-hover:scale-105 transition-transform">
                  <Building2 className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                  Company Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="animate-zoom-in" style={{ animationDelay: "0.1s", opacity: visibleSections.has('overview') ? 1 : 0 }}>
                      <h3 className="text-lg font-bold text-white mb-2">Legal Type</h3>
                      <p className="text-white/80">{data.company.legal_type}</p>
                    </div>
                    <div className="animate-zoom-in" style={{ animationDelay: "0.2s", opacity: visibleSections.has('overview') ? 1 : 0 }}>
                      <h3 className="text-lg font-bold text-white mb-2">Founder</h3>
                      <p className="text-white/80">{data.company.founder}</p>
                    </div>
                    <div className="animate-zoom-in" style={{ animationDelay: "0.3s", opacity: visibleSections.has('overview') ? 1 : 0 }}>
                      <h3 className="text-lg font-bold text-white mb-2">Founded</h3>
                      <p className="text-white/80">{data.company.founded_year}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="animate-zoom-in" style={{ animationDelay: "0.4s", opacity: visibleSections.has('overview') ? 1 : 0 }}>
                      <h3 className="text-lg font-bold text-white mb-2">Location</h3>
                      <p className="text-white/80">{data.company.location.city}, {data.company.location.state}</p>
                      <p className="text-white/60 text-sm">{data.company.location.description}</p>
                    </div>
                    <div className="animate-zoom-in" style={{ animationDelay: "0.5s", opacity: visibleSections.has('overview') ? 1 : 0 }}>
                      <h3 className="text-lg font-bold text-white mb-2">SEBI Registration</h3>
                      <p className="text-white/80">{data.company.sebi_registration.number}</p>
                      <Badge className="bg-white/10 text-white border-white/30 mt-2 hover:bg-white/20 transition-colors">
                        {data.company.sebi_registration.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/20 animate-fade-in" style={{ animationDelay: "0.6s", opacity: visibleSections.has('overview') ? 1 : 0 }}>
                  <h3 className="text-lg font-bold text-white mb-3">Services Description</h3>
                  <p className="text-white/80 leading-relaxed">{data.about.services_description}</p>
                </div>
                <div className="pt-4 border-t border-white/20 animate-fade-in" style={{ animationDelay: "0.7s", opacity: visibleSections.has('overview') ? 1 : 0 }}>
                  <h3 className="text-lg font-bold text-white mb-4">Supported Platforms</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.about.supported_platforms.map((platform, index) => (
                      <Badge
                        key={index}
                        className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-default animate-zoom-in"
                        style={{ 
                          animationDelay: `${0.8 + index * 0.1}s`,
                          opacity: visibleSections.has('overview') ? 1 : 0
                        }}
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Vision, Mission & Values */}
        <section ref={sectionRefs.vision} className="py-16 px-6 lg:px-8 relative z-10 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <h2 
              className="text-4xl lg:text-5xl font-black text-white mb-12 text-center animate-text-reveal"
              style={{
                opacity: visibleSections.has('vision') ? 1 : 0,
                transform: visibleSections.has('vision') ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              Vision, Mission & Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Vision */}
              <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:rotate-1"
                style={{
                  opacity: visibleSections.has('vision') ? 1 : 0,
                  transform: visibleSections.has('vision') 
                    ? 'translateY(0) scale(1) rotate(0deg)' 
                    : 'translateY(50px) scale(0.95) rotate(-2deg)',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
                }}
              >
                {/* Animated glow background */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
                <CardHeader className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Target className="w-8 h-8 text-white group-hover:animate-wiggle" />
                  </div>
                  <CardTitle className="text-2xl font-black text-white group-hover:scale-105 transition-transform">
                    {data.vision_mission_values.vision.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors">{data.vision_mission_values.vision.statement}</p>
                </CardContent>
              </Card>

              {/* Mission */}
              <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:rotate-1"
                style={{
                  opacity: visibleSections.has('vision') ? 1 : 0,
                  transform: visibleSections.has('vision') 
                    ? 'translateY(0) scale(1) rotate(0deg)' 
                    : 'translateY(50px) scale(0.95) rotate(-2deg)',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s',
                }}
              >
                {/* Animated glow background */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
                <CardHeader className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Lightbulb className="w-8 h-8 text-white group-hover:animate-wiggle" />
                  </div>
                  <CardTitle className="text-2xl font-black text-white group-hover:scale-105 transition-transform">
                    {data.vision_mission_values.mission.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-white/80 leading-relaxed group-hover:text-white/90 transition-colors">{data.vision_mission_values.mission.statement}</p>
                </CardContent>
              </Card>

              {/* Values */}
              <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:rotate-1"
                style={{
                  opacity: visibleSections.has('vision') ? 1 : 0,
                  transform: visibleSections.has('vision') 
                    ? 'translateY(0) scale(1) rotate(0deg)' 
                    : 'translateY(50px) scale(0.95) rotate(-2deg)',
                  transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s',
                }}
              >
                {/* Animated glow background */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
                <CardHeader className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    <Shield className="w-8 h-8 text-white group-hover:animate-wiggle" />
                  </div>
                  <CardTitle className="text-2xl font-black text-white group-hover:scale-105 transition-transform">
                    {data.vision_mission_values.values.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <p className="text-white/80 leading-relaxed text-sm mb-4 group-hover:text-white/90 transition-colors">{data.vision_mission_values.values.statement}</p>
                  <div className="flex flex-wrap gap-2">
                    {data.vision_mission_values.values.core_values.map((value, index) => (
                      <Badge 
                        key={index} 
                        className="bg-white/10 text-white border-white/30 text-xs hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-default animate-zoom-in"
                        style={{ 
                          animationDelay: `${0.4 + index * 0.05}s`,
                          opacity: visibleSections.has('vision') ? 1 : 0
                        }}
                      >
                        {value}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Details Table */}
        <section ref={sectionRefs.keyDetails} className="py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10"
              style={{
                opacity: visibleSections.has('keyDetails') ? 1 : 0,
                transform: visibleSections.has('keyDetails') 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(50px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
              <CardHeader>
                <CardTitle className="text-3xl font-black text-white mb-4 flex items-center gap-3">
                  <Award className="w-8 h-8" />
                  {data.key_details.table_title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/20 hover:bg-white/5">
                      <TableHead className="text-white font-bold">Attribute</TableHead>
                      <TableHead className="text-white font-bold">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.key_details.details.map((detail, index) => (
                      <TableRow 
                        key={index} 
                        className="border-white/20 hover:bg-white/10 transition-colors animate-slide-in-blur relative z-10"
                        style={{
                          animationDelay: `${0.1 + index * 0.1}s`,
                          opacity: visibleSections.has('keyDetails') ? 1 : 0,
                          transform: visibleSections.has('keyDetails') ? 'translateX(0)' : 'translateX(-20px)',
                        }}
                      >
                        <TableCell className="text-white/90 font-semibold group-hover:text-white transition-colors">{detail.attribute}</TableCell>
                        <TableCell className="text-white/80 group-hover:text-white/90 transition-colors">{detail.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Founder Message */}
        <section ref={sectionRefs.founder} className="py-16 px-6 lg:px-8 relative z-10 bg-black/50">
          <div className="max-w-5xl mx-auto">
            <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10"
              style={{
                opacity: visibleSections.has('founder') ? 1 : 0,
                transform: visibleSections.has('founder') 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(50px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <User className="w-10 h-10 text-black group-hover:animate-wiggle" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-black text-white group-hover:scale-105 transition-transform">
                      {data.founder_message.name}
                    </CardTitle>
                    <p className="text-white/80 text-lg mt-1 group-hover:text-white transition-colors">{data.founder_message.title}</p>
                  </div>
                </div>
                <CardDescription className="text-white/90 text-xl leading-relaxed group-hover:text-white transition-colors">
                  {data.founder_message.greeting}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-4">
                  {data.founder_message.full_message.map((paragraph, index) => (
                    <p 
                      key={index} 
                      className="text-white/80 leading-relaxed text-lg animate-text-reveal group-hover:text-white/90 transition-colors"
                      style={{
                        animationDelay: `${0.1 + index * 0.2}s`,
                        opacity: visibleSections.has('founder') ? 1 : 0,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/20 animate-fade-in" style={{ animationDelay: "0.7s", opacity: visibleSections.has('founder') ? 1 : 0 }}>
                  <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:animate-wiggle" />
                    Key Points
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {data.founder_message.key_points.map((point, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 animate-zoom-in"
                        style={{
                          animationDelay: `${0.8 + index * 0.1}s`,
                          opacity: visibleSections.has('founder') ? 1 : 0,
                        }}
                      >
                        <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                        <span className="text-white/90">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/20 animate-fade-in" style={{ animationDelay: "1.2s", opacity: visibleSections.has('founder') ? 1 : 0 }}>
                  <h3 className="text-xl font-black text-white mb-4">Philosophy</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Belief:", value: data.founder_message.philosophy.belief },
                      { label: "Approach:", value: data.founder_message.philosophy.approach },
                      { label: "Promise:", value: data.founder_message.philosophy.promise },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 animate-zoom-in"
                        style={{
                          animationDelay: `${1.3 + index * 0.1}s`,
                          opacity: visibleSections.has('founder') ? 1 : 0,
                        }}
                      >
                        <p className="text-white/90 font-semibold mb-1">{item.label}</p>
                        <p className="text-white/80">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trading vs Investment Comparison */}
        <section ref={sectionRefs.comparison} className="py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 
              className="text-4xl lg:text-5xl font-black text-white mb-12 text-center animate-text-reveal"
              style={{
                opacity: visibleSections.has('comparison') ? 1 : 0,
                transform: visibleSections.has('comparison') ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {data.educational_content.comparison.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {data.educational_content.comparison.sections.map((section, index) => (
                <Card
                  key={index}
                  className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10 hover:rotate-1"
                  style={{
                    opacity: visibleSections.has('comparison') ? 1 : 0,
                    transform: visibleSections.has('comparison') 
                      ? 'translateY(0) scale(1) rotate(0deg)' 
                      : 'translateY(50px) scale(0.95) rotate(-2deg)',
                    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.2}s`,
                  }}
                >
                  {/* Animated glow background */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
                  {/* Top Border Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      {section.type === "Trading" ? (
                        <TrendingUp className="w-8 h-8 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                      ) : (
                        <BarChart className="w-8 h-8 text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                      )}
                      <CardTitle className="text-2xl font-black text-white group-hover:scale-105 transition-transform">
                        {section.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-white/80 text-lg leading-relaxed group-hover:text-white/90 transition-colors">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <h4 className="text-lg font-bold text-white mb-3">Characteristics:</h4>
                    <ul className="space-y-2">
                      {section.characteristics.map((char, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-start gap-2 text-white/90 animate-zoom-in group-hover:text-white transition-colors"
                          style={{
                            animationDelay: `${0.2 + idx * 0.05}s`,
                            opacity: visibleSections.has('comparison') ? 1 : 0,
                          }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10"
              style={{
                opacity: visibleSections.has('comparison') ? 1 : 0,
                transform: visibleSections.has('comparison') 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(50px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s',
              }}
            >
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-black text-white group-hover:scale-105 transition-transform">Conclusion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <p className="text-white/80 leading-relaxed text-lg group-hover:text-white/90 transition-colors">{data.educational_content.comparison.conclusion}</p>
                <div className="animate-fade-in" style={{ animationDelay: "0.6s", opacity: visibleSections.has('comparison') ? 1 : 0 }}>
                  <h4 className="text-lg font-bold text-white mb-3">Decision Factors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.educational_content.comparison.decision_factors.map((factor, index) => (
                      <Badge 
                        key={index} 
                        className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-default animate-zoom-in"
                        style={{
                          animationDelay: `${0.7 + index * 0.1}s`,
                          opacity: visibleSections.has('comparison') ? 1 : 0,
                        }}
                      >
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Unique Selling Points */}
        <section ref={sectionRefs.usp} className="py-16 px-6 lg:px-8 relative z-10 bg-black/50">
          <div className="max-w-5xl mx-auto">
            <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10"
              style={{
                opacity: visibleSections.has('usp') ? 1 : 0,
                transform: visibleSections.has('usp') 
                  ? 'translateY(0) scale(1)' 
                  : 'translateY(50px) scale(0.95)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {/* Top Border Animation */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl font-black text-white mb-4 flex items-center gap-3 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-8 h-8 group-hover:animate-wiggle" />
                  Why Choose Us
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid md:grid-cols-2 gap-4">
                  {data.about.unique_selling_points.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 animate-zoom-in cursor-default"
                      style={{
                        animationDelay: `${0.1 + index * 0.1}s`,
                        opacity: visibleSections.has('usp') ? 1 : 0,
                      }}
                    >
                      <CheckCircle2 className="w-6 h-6 text-white mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-lg group-hover:text-white transition-colors">{point}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6 lg:px-8 relative z-10">
          <Team />
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
