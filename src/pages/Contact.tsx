import { useState, useEffect, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Youtube, ArrowDown } from "lucide-react";

interface ContactUsData {
  page_meta: {
    title: string;
    url: string;
    page_name: string;
  };
  hero_section: {
    title: string;
    subtitle: string;
  };
  contact_information: {
    address: {
      icon: string;
      title: string;
      details: string;
      google_maps_url: string;
      animation: {
        type: string;
        duration: number;
      };
    };
    phone: {
      icon: string;
      title: string;
      numbers: string[];
      display: string;
      animation: {
        type: string;
        duration: number;
      };
    };
    email: {
      icon: string;
      title: string;
      address: string;
      animation: {
        type: string;
        duration: number;
      };
    };
  };
  social_media: {
    title: string;
    platforms: Array<{
      name: string;
      icon: string;
      url: string;
      color: string;
      animation: {
        type: string;
        duration: number;
      };
    }>;
    arrow_icon: {
      icon: string;
      animation: {
        type: string;
        duration: number;
      };
    };
  };
  google_maps: {
    embed_url: string;
    dimensions: {
      width: string;
      height: string;
    };
    settings: {
      border: number;
      allowfullscreen: boolean;
      loading: string;
      referrerpolicy: string;
    };
    landmark: string;
    animation: {
      type: string;
      duration: number;
    };
  };
  sticky_sidebar?: {
    position: string;
    location: string;
    top: string;
    visibility: string;
    actions: Array<{
      id: number;
      type: string;
      icon: string;
      color: string;
      font_size: string;
      action: string;
    }>;
  };
  inline_funnel?: {
    visibility: string;
    layout: string;
    buttons: Array<{
      type: string;
      icon: string;
      label: string;
      color: string;
      action: string;
    }>;
  };
  mobile_footer_nav?: {
    visibility: string;
    position: string;
    buttons: Array<{
      type: string;
      icon: string;
      action: string;
      class: string;
    }>;
  };
}

const Contact = () => {
  const [data, setData] = useState<ContactUsData | null>(null);
  const [loading, setLoading] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData.contact_us as ContactUsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      "fa-map-marker-alt": MapPin,
      "fa-phone": Phone,
      "fa-envelope": Mail,
      "fa-message": MessageCircle,
      "fa-facebook-f": Facebook,
      "fa-x": Twitter,
      "fa-instagram": Instagram,
      "fa-youtube": Youtube,
      "fa-arrow-turn-down": ArrowDown,
      "fa-whatsapp": MessageCircle,
    };
    return iconMap[iconName] || MapPin;
  };

  const handleAction = (action: string) => {
    if (action === "GetCall(1)") {
      // Phone call
      window.location.href = `tel:${data?.contact_information.phone.numbers[0]?.replace(/\D/g, '')}`;
    } else if (action === "GetCall(2)") {
      // WhatsApp
      const phone = data?.contact_information.phone.numbers[0]?.replace(/\D/g, '') || '';
      window.open(`https://wa.me/${phone}`, '_blank');
    } else if (action === "GetCall(3)") {
      // Email
      window.location.href = `mailto:${data?.contact_information.email.address}`;
    } else if (action === "GetCall(4)") {
      // Enquiry form - scroll to contact section
      const element = document.getElementById("contact-form");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Error loading data</p>
      </div>
    );
  }

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
                <MessageCircle className="w-4 h-4 animate-wiggle" />
                CONTACT US
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight animate-text-reveal">
                {data.hero_section.title}
              </h1>
              <p className="text-xl text-white/90 leading-relaxed animate-text-reveal" style={{ animationDelay: "0.2s" }}>
                {data.hero_section.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Map */}
        <section className="py-16 px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Information Cards */}
              <div className="lg:col-span-1 space-y-6">
                {/* Address */}
                <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-white/10 border-2 border-white rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {(() => {
                          const Icon = getIcon(data.contact_information.address.icon);
                          return <Icon className="w-6 h-6 text-white" />;
                        })()}
                      </div>
                      <CardTitle className="text-xl font-black text-white">{data.contact_information.address.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/90 leading-relaxed mb-4">{data.contact_information.address.details}</p>
                    <Button
                      variant="outline"
                      className="border-2 border-white/30 text-white hover:bg-white hover:text-black"
                      onClick={() => window.open(data.contact_information.address.google_maps_url, '_blank')}
                    >
                      View on Map
                    </Button>
                  </CardContent>
                </Card>

                {/* Phone */}
                <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-white/10 border-2 border-white rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {(() => {
                          const Icon = getIcon(data.contact_information.phone.icon);
                          return <Icon className="w-6 h-6 text-white" />;
                        })()}
                      </div>
                      <CardTitle className="text-xl font-black text-white">{data.contact_information.phone.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {data.contact_information.phone.numbers.map((number, idx) => (
                        <a
                          key={idx}
                          href={`tel:${number.replace(/\D/g, '')}`}
                          className="block text-lg font-bold text-white hover:text-white/80 transition-colors"
                        >
                          {number}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(255,255,255,0.1)] hover:bg-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-white/10 border-2 border-white rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        {(() => {
                          const Icon = getIcon(data.contact_information.email.icon);
                          return <Icon className="w-6 h-6 text-white" />;
                        })()}
                      </div>
                      <CardTitle className="text-xl font-black text-white">{data.contact_information.email.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={`mailto:${data.contact_information.email.address}`}
                      className="block text-lg font-bold text-white hover:text-white/80 transition-colors break-all"
                    >
                      {data.contact_information.email.address}
                    </a>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card className="group border-2 border-white/20 backdrop-blur-sm bg-white/5 hover:border-white/60 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl font-black text-white mb-4">{data.social_media.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.social_media.platforms.map((platform, idx) => {
                        const Icon = getIcon(platform.icon);
                        return (
                          <a
                            key={idx}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                            style={{ borderLeftColor: platform.color, borderLeftWidth: '4px' }}
                          >
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${platform.color}20` }}
                            >
                              <Icon className="w-5 h-5" style={{ color: platform.color }} />
                            </div>
                            <span className="text-white/90 font-semibold group-hover:text-white">{platform.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Google Maps */}
              <div className="lg:col-span-2">
                <Card className="border-2 border-white/20 backdrop-blur-sm bg-white/5 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-black text-white">Location</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <iframe
                      src={data.google_maps.embed_url}
                      width={data.google_maps.dimensions.width}
                      height={data.google_maps.dimensions.height}
                      style={{ border: data.google_maps.settings.border }}
                      allowFullScreen={data.google_maps.settings.allowfullscreen}
                      loading={data.google_maps.settings.loading as any}
                      referrerPolicy={data.google_maps.settings.referrerpolicy as any}
                      className="w-full rounded-b-lg"
                      title={`Location - ${data.google_maps.landmark}`}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Sidebar Actions - Desktop Only */}
        {data.sticky_sidebar && data.sticky_sidebar.visibility === "desktop_only" && (
          <div className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
            {data.sticky_sidebar.actions.map((action) => {
              const Icon = getIcon(action.icon);
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.action)}
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 border-2 border-white/30"
                  style={{
                    backgroundColor: action.color,
                    fontSize: action.font_size,
                  }}
                  title={action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                >
                  <Icon className="w-6 h-6 text-white" />
                </button>
              );
            })}
          </div>
        )}

        {/* Inline Funnel - Desktop Only */}
        {data.inline_funnel && data.inline_funnel.visibility === "desktop_only" && (
          <section className="hidden lg:block py-8 px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-white/20 backdrop-blur-sm bg-white/5 p-6">
                <CardContent>
                  <div className="flex flex-wrap justify-center gap-4">
                    {data.inline_funnel.buttons.map((button, idx) => {
                      const Icon = getIcon(button.icon.replace('fab ', '').replace('fa ', ''));
                      return (
                        <Button
                          key={idx}
                          onClick={() => handleAction(button.action)}
                          className="flex items-center gap-2 px-6 py-3 font-bold border-2 border-white/30 text-white hover:scale-105 transition-all duration-300"
                          style={{ backgroundColor: `${button.color}20`, borderColor: button.color }}
                        >
                          <Icon className="w-5 h-5" style={{ color: button.color }} />
                          {button.label}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Mobile Footer Nav */}
        {data.mobile_footer_nav && data.mobile_footer_nav.visibility === "mobile_only" && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t-2 border-white/20">
            <div className="flex justify-around items-center py-3">
              {data.mobile_footer_nav.buttons.map((button, idx) => {
                const Icon = getIcon(button.icon.replace('fab ', '').replace('fa ', ''));
                const colorMap: Record<string, string> = {
                  whatsapp: "#43d854",
                  email: "#d9534f",
                  call: "#2c80d3",
                  enquiry: "#f0ad4e",
                };
                return (
                  <button
                    key={idx}
                    onClick={() => handleAction(button.action)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-all"
                    title={button.type.charAt(0).toUpperCase() + button.type.slice(1)}
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${colorMap[button.type] || '#fff'}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: colorMap[button.type] || '#fff' }} />
                    </div>
                    <span className="text-xs text-white/80 font-semibold capitalize">{button.type}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Form Section */}
        <section id="contact-form" className="py-16 px-6 lg:px-8 relative z-10 pb-24 lg:pb-16">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-white/20 backdrop-blur-sm bg-white/5 p-8">
              <CardHeader>
                <CardTitle className="text-3xl font-black text-white mb-2 text-center">
                  Send Us a Message
                </CardTitle>
                <p className="text-white/80 text-center">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-white mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-4 py-3 bg-white/5 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-white mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        className="w-full px-4 py-3 bg-white/5 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                        placeholder="Your Phone Number"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-white mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                      placeholder="Your Email Address"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-white mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors resize-none"
                      placeholder="Your Message"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full font-bold bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;



