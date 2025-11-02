import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Sparkles, BookOpen, GraduationCap, TrendingUp, Users, Award, Target, Phone, Mail } from "lucide-react";

interface PageData {
  id: string;
  slug: string;
  meta: {
    title: string;
    page_title: string;
  };
  hero: {
    tagline: string;
    description: string;
    sub_description: string;
  };
  [key: string]: any; // For all other sections
}

interface ServicesData {
  pages: PageData[];
  common_info?: {
    contact?: {
      phones?: string[];
      email?: string;
    };
  };
}

const iconMap: Record<number, typeof BookOpen> = {
  0: BookOpen,
  1: GraduationCap,
  2: TrendingUp,
  3: Users,
  4: Award,
  5: Target,
};

const ServicesPage = () => {
  const [data, setData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [showAllStickyContent, setShowAllStickyContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData as ServicesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  const toggleExpand = (id: string) => {
    setExpandedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!data || !data.pages || data.pages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Error loading data</p>
      </div>
    );
  }

  // Prepare content for sticky scroll (first 4 items)
  const stickyContent = data.pages.slice(0, 4).map((page, index) => {
    const Icon = iconMap[index % Object.keys(iconMap).length] || BookOpen;
    return {
      title: page.meta.page_title,
      description: page.hero.description,
      content: (
        <div className="flex h-full w-full items-center justify-center text-white p-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
              <Icon className="w-12 h-12 text-white" />
            </div>
            <Badge className="bg-white/10 text-white border-white/30 mt-2">
              {page.meta.page_title.split(" ").slice(-2).join(" ")}
            </Badge>
          </div>
        </div>
      ),
    };
  });

  // Render all page details
  const renderPageDetails = (page: PageData) => {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Hero Section */}
        <div>
          <h3 className="text-2xl font-black text-white mb-3">{page.hero.tagline}</h3>
          <p className="text-white/90 mb-2">{page.hero.description}</p>
          <p className="text-white/80">{page.hero.sub_description}</p>
        </div>

        {/* Main Section */}
        {page.main_section && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.main_section.title}</h4>
            <p className="text-white/80 mb-4">{page.main_section.intro}</p>
            {page.main_section.benefits && (
              <ul className="space-y-2 ml-4">
                {page.main_section.benefits.map((benefit: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-white/90">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span><strong>{benefit.title}:</strong> {benefit.description}</span>
                  </li>
                ))}
              </ul>
            )}
            {page.main_section.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.main_section.conclusion}</p>
            )}
          </div>
        )}

        {/* Advanced Strategies */}
        {page.advanced_strategies && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.advanced_strategies.title}</h4>
            <p className="text-white/80 mb-4">{page.advanced_strategies.intro}</p>
            {page.advanced_strategies.strategies && (
              <ul className="space-y-2 ml-4">
                {page.advanced_strategies.strategies.map((strategy: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-white/90">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>{strategy}</span>
                  </li>
                ))}
              </ul>
            )}
            {page.advanced_strategies.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.advanced_strategies.conclusion}</p>
            )}
          </div>
        )}

        {/* Career Opportunities */}
        {page.career_opportunities && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.career_opportunities.title}</h4>
            <p className="text-white/80 mb-4">{page.career_opportunities.intro}</p>
            {page.career_opportunities.careers && (
              <div className="grid md:grid-cols-2 gap-4">
                {page.career_opportunities.careers.map((career: any, idx: number) => (
                  <div key={idx} className="border-l-2 border-white/30 pl-4">
                    <h5 className="text-lg font-semibold text-white mb-1">{career.title}</h5>
                    <p className="text-white/80">{career.description}</p>
                  </div>
                ))}
              </div>
            )}
            {page.career_opportunities.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.career_opportunities.conclusion}</p>
            )}
          </div>
        )}

        {/* Course Highlights */}
        {page.course_highlights && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.course_highlights.title}</h4>
            {page.course_highlights.modules && (
              <div className="grid md:grid-cols-2 gap-4">
                {page.course_highlights.modules.map((module: any, idx: number) => (
                  <Card key={idx} className="border-2 border-white/20 bg-white/5 p-4">
                    <h5 className="text-lg font-semibold text-white mb-2">{module.module}</h5>
                    <p className="text-white/80 text-sm mb-2"><strong>Learn:</strong> {module.what_you_learn}</p>
                    <p className="text-white/90 text-sm"><strong>Outcome:</strong> {module.outcome}</p>
                  </Card>
                ))}
              </div>
            )}
            {page.course_highlights.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.course_highlights.conclusion}</p>
            )}
          </div>
        )}

        {/* Why Choose Us */}
        {page.why_choose_us && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.why_choose_us.title}</h4>
            {page.why_choose_us.intro && (
              <p className="text-white/80 mb-4">{page.why_choose_us.intro}</p>
            )}
            {page.why_choose_us.reasons && (
              <div className="grid md:grid-cols-2 gap-4">
                {page.why_choose_us.reasons.map((reason: any, idx: number) => (
                  <div key={idx} className="border-l-2 border-white/30 pl-4">
                    <h5 className="text-lg font-semibold text-white mb-1">{reason.title}</h5>
                    <p className="text-white/80">{reason.description}</p>
                  </div>
                ))}
              </div>
            )}
            {page.why_choose_us.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.why_choose_us.conclusion}</p>
            )}
          </div>
        )}

        {/* Exclusive Benefits */}
        {page.exclusive_benefits && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.exclusive_benefits.title}</h4>
            <p className="text-white/80 mb-4">{page.exclusive_benefits.intro}</p>
            {page.exclusive_benefits.benefits && (
              <ul className="space-y-2 ml-4">
                {page.exclusive_benefits.benefits.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-white/90">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
            {page.exclusive_benefits.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.exclusive_benefits.conclusion}</p>
            )}
          </div>
        )}

        {/* Key Skills */}
        {page.key_skills && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.key_skills.title}</h4>
            <p className="text-white/80 mb-4">{page.key_skills.intro}</p>
            {page.key_skills.skills && (
              <ul className="space-y-2 ml-4">
                {page.key_skills.skills.map((skill: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-white/90">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            )}
            {page.key_skills.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.key_skills.conclusion}</p>
            )}
          </div>
        )}

        {/* Target Audience */}
        {page.target_audience && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.target_audience.title}</h4>
            <p className="text-white/80 mb-4">{page.target_audience.intro}</p>
            {page.target_audience.ideal_for && (
              <ul className="space-y-2 ml-4">
                {page.target_audience.ideal_for.map((audience: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-white/90">
                    <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span>{audience}</span>
                  </li>
                ))}
              </ul>
            )}
            {page.target_audience.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.target_audience.conclusion}</p>
            )}
          </div>
        )}

        {/* Learning Environment */}
        {page.learning_environment && (
          <div>
            <h4 className="text-xl font-bold text-white mb-3">{page.learning_environment.title}</h4>
            {page.learning_environment.facilities && (
              <div className="grid md:grid-cols-2 gap-4">
                {page.learning_environment.facilities.map((facility: any, idx: number) => (
                  <Card key={idx} className="border-2 border-white/20 bg-white/5 p-4">
                    <h5 className="text-lg font-semibold text-white mb-2">{facility.facility}</h5>
                    <p className="text-white/80 text-sm mb-2"><strong>Offers:</strong> {facility.what_it_offers}</p>
                    <p className="text-white/90 text-sm"><strong>Benefit:</strong> {facility.benefit}</p>
                  </Card>
                ))}
              </div>
            )}
            {page.learning_environment.conclusion && (
              <p className="text-white/80 mt-4 italic">{page.learning_environment.conclusion}</p>
            )}
          </div>
        )}

        {/* Other sections */}
        {Object.entries(page).map(([key, value]) => {
          if (['id', 'slug', 'meta', 'hero', 'main_section', 'advanced_strategies', 'career_opportunities', 
               'course_highlights', 'why_choose_us', 'exclusive_benefits', 'key_skills', 
               'target_audience', 'learning_environment'].includes(key)) {
            return null;
          }
          
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const section = value as any;
            if (section.title || section.intro) {
              return (
                <div key={key}>
                  {section.title && (
                    <h4 className="text-xl font-bold text-white mb-3">{section.title}</h4>
                  )}
                  {section.intro && (
                    <p className="text-white/80 mb-4">{section.intro}</p>
                  )}
                  {section.description && (
                    <p className="text-white/80 mb-4">{section.description}</p>
                  )}
                  {section.benefits_list && Array.isArray(section.benefits_list) && (
                    <ul className="space-y-2 ml-4">
                      {section.benefits_list.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-white/90">
                          <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.modules && Array.isArray(section.modules) && (
                    <ul className="space-y-2 ml-4">
                      {section.modules.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2 text-white/90">
                          <ChevronRight className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.conclusion && (
                    <p className="text-white/80 mt-4 italic">{section.conclusion}</p>
                  )}
                </div>
              );
            }
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div ref={pageRef} className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <Navigation />
      <div className="pt-20 relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6 animate-zoom-in">
                <Sparkles className="w-4 h-4 animate-wiggle" />
                OUR SERVICES
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight animate-text-reveal">
                What We Offer
              </h1>
              <p className="text-xl text-white/90 leading-relaxed animate-text-reveal" style={{ animationDelay: "0.2s" }}>
                Comprehensive stock market education from fundamental concepts to advanced technical analysis
              </p>
            </div>
          </div>
        </section>

        {/* Sticky Scroll Reveal Section - Desktop Only */}
        <section className="hidden lg:block py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <StickyScroll content={stickyContent} />
          </div>
        </section>

        {/* Mobile View - Simplified List */}
        <section className="lg:hidden py-16 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-4">
                Featured Services
              </h2>
              <p className="text-white/80">
                Tap on any service to learn more
              </p>
            </div>
            <div className="space-y-4">
              {(showAllStickyContent ? stickyContent : stickyContent.slice(0, 2)).map((item, index) => (
                <Card
                  key={index}
                  className="border-2 border-white/20 backdrop-blur-sm bg-white/5 p-6"
                >
                  <CardContent>
                    <h3 className="text-xl font-black text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {item.description.length > 150 
                        ? `${item.description.substring(0, 150)}...` 
                        : item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
              {!showAllStickyContent && stickyContent.length > 2 && (
                <Button
                  variant="outline"
                  className="w-full border-2 border-white/30 text-white hover:bg-white hover:text-black"
                  onClick={() => setShowAllStickyContent(true)}
                >
                  View More Services
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Scrollable Course List with Details */}
        <section className="py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
                All Our Services
              </h2>
              <p className="text-xl text-white/80">
                Explore comprehensive trading courses and training programs
              </p>
            </div>

            <div className="space-y-6">
              {data.pages.map((page, index) => {
                const Icon = iconMap[index % Object.keys(iconMap).length] || BookOpen;
                const isExpanded = expandedPages.has(page.id);

                return (
                  <Card
                    key={page.id}
                    className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-white/10"
                  >
                    <CardContent className="p-4 md:p-8">
                      <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                        {/* Icon */}
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 border-2 border-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-black text-white mb-2 md:mb-3">
                            {page.meta.page_title}
                          </h3>

                          {/* Tagline */}
                          <p className="text-white/90 mb-3 md:mb-4 font-semibold text-sm md:text-base">
                            {page.hero.tagline}
                          </p>

                          {/* Description - Truncated on mobile */}
                          <p className="text-white opacity-95 leading-relaxed mb-4 text-sm md:text-base">
                            {isExpanded || !isMobile 
                              ? page.hero.description 
                              : `${page.hero.description.substring(0, 120)}...`}
                          </p>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t-2 border-white/20">
                              <div className="space-y-4 md:space-y-6">
                                {renderPageDetails(page)}
                              </div>
                              <Button
                                variant="outline"
                                className="mt-4 md:mt-6 w-full md:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-black text-sm md:text-base"
                                onClick={() => toggleExpand(page.id)}
                              >
                                Show Less
                              </Button>
                            </div>
                          )}

                          {/* View Details Button */}
                          {!isExpanded && (
                            <Button
                              variant="outline"
                              className="w-full md:w-auto border-2 border-white/30 text-white hover:bg-white hover:text-black text-sm md:text-base"
                              onClick={() => toggleExpand(page.id)}
                            >
                              View Details
                              <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        {data.common_info?.contact && (
          <section className="py-16 px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-white/20 backdrop-blur-sm bg-white/5 p-8">
                <CardContent>
                  <h2 className="text-3xl lg:text-4xl font-black text-white mb-6 text-center">
                    Get In Touch
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {data.common_info.contact.phones && data.common_info.contact.phones.length > 0 && (
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border-2 border-white/20">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/30">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-1">
                            Phone
                          </h3>
                          {data.common_info.contact.phones.map((phone, idx) => (
                            <a
                              key={idx}
                              href={`tel:${phone}`}
                              className="block text-lg font-bold text-white hover:text-white/80 transition-colors"
                            >
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.common_info.contact.email && (
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border-2 border-white/20">
                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/30">
                          <Mail className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-1">
                            Email
                          </h3>
                          <a
                            href={`mailto:${data.common_info.contact.email}`}
                            className="block text-lg font-bold text-white hover:text-white/80 transition-colors break-all"
                          >
                            {data.common_info.contact.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="border-2 border-white/20 backdrop-blur-sm bg-white/5 p-12">
              <CardContent>
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  Ready to Start Your Trading Journey?
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Join our comprehensive courses and learn from experienced traders
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate("/courses")}
                    className="text-lg font-bold px-8 py-6 border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    View All Courses
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/#contact")}
                    className="text-lg font-bold px-8 py-6 border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
