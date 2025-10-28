import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "/WhatsApp Image 2025-10-27 at 16.40.01 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.04 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.04 (2).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.24.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.28 (2).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.46 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.46 (2).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.47 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.47.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.49 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.49.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.41.09 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.41.09.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.41.10.jpeg",
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isExpanded && !isLightboxOpen) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isExpanded, isLightboxOpen]);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      if (isLightboxOpen) {
        setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
      } else {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
      }
    } else {
      if (isLightboxOpen) {
        setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleSwipe("left");
    }
    if (distance < -50) {
      handleSwipe("right");
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getVisibleImages = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      const index = (currentIndex + i) % galleryImages.length;
      visible.push({ index, url: galleryImages[index] });
    }
    return visible;
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const getTransform = (position: number) => {
    const baseRotation = position * 12;
    const baseScale = 1 - position * 0.15;
    const baseTranslateX = position * 20;
    const baseTranslateZ = position * -50;
    return {
      rotate: baseRotation,
      scale: baseScale,
      translateX: baseTranslateX,
      translateZ: baseTranslateZ,
    };
  };

  return (
    <>
      <section
        id="gallery"
        className="relative py-24 bg-gradient-to-br from-[hsl(228,84%,5%)] to-[hsl(228,60%,8%)] overflow-hidden border-b-2 border-border"
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
              OUR GALLERY
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              Success Stories & Results
            </h2>
            <p className="text-xl text-white/70">
              See the tangible results from our expert trading strategies
            </p>
          </div>

          {/* 3D Carousel */}
          <div className="mb-8" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="relative h-[500px] perspective-1000 flex items-center justify-center">
              {getVisibleImages().map(({ index, url }, position) => {
                const { rotate, scale, translateX, translateZ } = getTransform(position);
                return (
                  <div
                    key={`${index}-${position}`}
                    className="absolute cursor-pointer transition-all duration-500"
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotate}deg)`,
                      opacity: position > 3 ? 0 : 1,
                      zIndex: 5 - position,
                    }}
                    onClick={() => openLightbox(index)}
                  >
                    <div className="w-80 h-96 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[0_20px_80px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105">
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                onClick={() => handleSwipe("right")}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                size="icon"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </Button>
              <Button
                onClick={() => handleSwipe("left")}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
                size="icon"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex justify-center gap-3 overflow-x-auto pb-4">
            {galleryImages.map((url, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? "border-primary scale-110 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                    : "border-white/20 hover:border-white/40 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-center mt-8">
            <Button
              onClick={() => setIsExpanded(true)}
              className="text-lg font-bold px-8 py-6 shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:shadow-[0_10px_60px_rgba(99,102,241,0.6)] transition-all"
            >
              View All Images
            </Button>
          </div>

          {/* Expanded Gallery View */}
          {isExpanded && (
            <div className="mt-16 animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((url, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-2 border-white/20 hover:border-primary cursor-pointer group transition-all duration-300 hover:scale-105"
                    onClick={() => openLightbox(index)}
                  >
                    <div className="aspect-square">
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button
                  onClick={() => setIsExpanded(false)}
                  variant="outline"
                  className="text-lg font-bold px-8 py-6 border-2 border-white/30 text-white hover:bg-white hover:text-[hsl(228,84%,5%)] transition-all"
                >
                  Show Less
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
            }}
            className="absolute left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
            }}
            className="absolute right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div
            className="max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightboxIndex]}
              alt={`Gallery ${lightboxIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;

