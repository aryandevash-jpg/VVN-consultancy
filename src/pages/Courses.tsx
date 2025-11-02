import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Clock, Globe, Users, TrendingUp, CheckCircle2, BookOpen, Target } from "lucide-react";

interface DetailedCourse {
  id: number;
  title: string;
  duration: string;
  language: string;
  pricing: {
    original: number;
    discounted: number;
    discount_percentage: number;
    currency: string;
  };
  short_description: string;
  features: string[];
  modules: Array<{
    name: string;
    description?: string;
    topics?: string[];
    strategies?: string[];
    benefits?: string[];
  }>;
  learning_outcomes: string[];
  delivery_method: string;
  target_audience: string;
}

const Courses = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [courses, setCourses] = useState<DetailedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch course data from JSON file
    const loadCourses = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setCourses(data.detailedCourses || []);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <Navigation />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-6">
                <BookOpen className="w-4 h-4" />
                OUR COURSES
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                Comprehensive Trading Courses
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Master the art of trading with our expert-led programs designed to transform you into a confident, profitable trader
              </p>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section ref={sectionRef} className="py-12 px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <p className="text-white text-xl">Loading courses...</p>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white text-xl">No courses available at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course, index) => (
                <Card
                  key={course.id}
                  className="group relative overflow-hidden border-2 border-white/20 hover:border-white/60 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] hover:bg-white/10"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible 
                      ? 'translateY(0) scale(1)' 
                      : 'translateY(50px) scale(0.95)',
                    transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
                  }}
                  onMouseEnter={() => setSelectedCourse(course.id)}
                  onMouseLeave={() => setSelectedCourse(null)}
                >
                  {/* Animated glow background */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-lg transition-all duration-500 blur-xl" />
                  
                  {/* Top Border Animation */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white to-white/80 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                  <CardHeader className="relative z-10">
                    {/* Discount Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-white text-black font-bold px-3 py-1">
                        {course.pricing.discount_percentage}% OFF
                      </Badge>
                      <Badge variant="outline" className="border-white/30 text-white">
                        {course.id}
                      </Badge>
                    </div>

                    <CardTitle className="text-2xl font-black text-white mb-3 group-hover:text-white transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-white/80 text-base leading-relaxed">
                      {course.short_description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="relative z-10 space-y-4">
                    {/* Course Info */}
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 text-white/90">
                        <Clock className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <Globe className="w-4 h-4 text-white" />
                        <span className="text-sm font-semibold">{course.language}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="py-4 border-t border-white/20">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-3xl font-black text-white">
                          {formatPrice(course.pricing.discounted, course.pricing.currency)}
                        </span>
                        <span className="text-lg text-white/60 line-through">
                          {formatPrice(course.pricing.original, course.pricing.currency)}
                        </span>
                      </div>
                      <p className="text-sm text-white/70">Save {formatPrice(course.pricing.original - course.pricing.discounted, course.pricing.currency)}</p>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                        Course Features
                      </h4>
                      <ul className="space-y-2">
                        {course.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                            <CheckCircle2 className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  <CardFooter className="relative z-10 flex flex-col gap-3">
                    <Button
                      className="w-full font-bold bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300"
                      onClick={() => scrollToSection("contact")}
                    >
                      Enroll Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full font-semibold border-2 border-white/30 backdrop-blur-sm bg-white/10 text-white hover:bg-white hover:text-black transition-all duration-300"
                      onClick={() => {
                        const element = document.getElementById(`course-details-${course.id}`);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Detailed Course Information */}
        {!loading && courses.length > 0 && (
          <section className="py-16 px-6 lg:px-8 relative z-10 bg-black/50">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-12 text-center">
                Course Details
              </h2>
              
              <div className="space-y-8">
                {courses.map((course, index) => (
                <Card
                  key={course.id}
                  id={`course-details-${course.id}`}
                  className="border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/40 transition-all duration-300"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease-out ${index * 0.15 + 0.3}s`,
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-black text-lg">
                        {course.id}
                      </div>
                      <div>
                        <CardTitle className="text-3xl font-black text-white mb-2">
                          {course.title}
                        </CardTitle>
                        <div className="flex gap-3">
                          <Badge className="bg-white/10 text-white border-white/30">
                            <Clock className="w-3 h-3 mr-1" />
                            {course.duration}
                          </Badge>
                          <Badge className="bg-white/10 text-white border-white/30">
                            <Globe className="w-3 h-3 mr-1" />
                            {course.language}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-white/90 text-lg leading-relaxed">
                      {course.short_description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Modules */}
                    <div>
                      <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Course Modules
                      </h3>
                      <Accordion type="single" collapsible className="space-y-3">
                        {course.modules.map((module, moduleIdx) => (
                          <AccordionItem
                            key={moduleIdx}
                            value={`module-${course.id}-${moduleIdx}`}
                            className="border-2 border-white/20 rounded-lg px-4 bg-white/5"
                          >
                            <AccordionTrigger className="text-white font-bold hover:text-white/90">
                              {module.name}
                            </AccordionTrigger>
                            <AccordionContent className="text-white/90 space-y-3">
                              {module.description && (
                                <p className="text-white/80 mb-3">{module.description}</p>
                              )}
                              {module.topics && (
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Topics Covered:</h4>
                                  <ul className="space-y-2 ml-4">
                                    {module.topics.map((topic, topicIdx) => (
                                      <li key={topicIdx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                                        <span>{topic}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {module.strategies && (
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Strategies:</h4>
                                  <ul className="space-y-2 ml-4">
                                    {module.strategies.map((strategy, stratIdx) => (
                                      <li key={stratIdx} className="flex items-start gap-2">
                                        <TrendingUp className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                                        <span>{strategy}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {module.benefits && (
                                <div>
                                  <h4 className="font-semibold text-white mb-2">Benefits:</h4>
                                  <ul className="space-y-2 ml-4">
                                    {module.benefits.map((benefit, benefitIdx) => (
                                      <li key={benefitIdx} className="flex items-start gap-2">
                                        <Target className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                                        <span>{benefit}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>

                    {/* Learning Outcomes */}
                    <div className="pt-4 border-t border-white/20">
                      <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Learning Outcomes
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.learning_outcomes.map((outcome, outcomeIdx) => (
                          <div
                            key={outcomeIdx}
                            className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10"
                          >
                            <CheckCircle2 className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                            <span className="text-white/90">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/20">
                      <div>
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Target Audience
                        </h4>
                        <p className="text-white/80">{course.target_audience}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Delivery Method
                        </h4>
                        <p className="text-white/80">{course.delivery_method}</p>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      size="lg"
                      className="w-full font-bold bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300"
                      onClick={() => scrollToSection("contact")}
                    >
                      Enroll Now - {formatPrice(course.pricing.discounted, course.pricing.currency)}
                    </Button>
                  </CardFooter>
                </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Courses;

