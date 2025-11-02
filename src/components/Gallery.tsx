import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";
import { useMagnetic } from "@/hooks/useScrollAnimation";

const galleryImages = [
  "/WhatsApp Image 2025-10-27 at 16.40.46 (2).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.47 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.47.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.49 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.49.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.41.09 (1).jpeg",
  "/WhatsApp Image 2025-10-27 at 16.41.09.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.41.10.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.52.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.48.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.26.jpeg",
  "/WhatsApp Image 2025-10-27 at 16.40.26 (1).jpeg",
];

// Varying heights for masonry effect
const getImageHeight = (index: number) => {
  const heights = [400, 350, 450, 380, 320, 410, 360, 440, 370, 390, 340, 420];
  return heights[index % heights.length];
};

// Animated floating particles
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full blur-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${10 + Math.random() * 15}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Individual Gallery Item Component
interface GalleryItemProps {
  url: string;
  index: number;
  onOpen: () => void;
  isVisible: boolean;
}

const GalleryItem = ({ url, index, onOpen, isVisible }: GalleryItemProps) => {
  const { ref, position } = useMagnetic<HTMLDivElement>(0.15);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({
      x: (x - rect.width / 2) / 20,
      y: (y - rect.height / 2) / 20,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const height = getImageHeight(index);
  const delay = index * 0.1;

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translateY(0) scale(1)'
          : 'translateY(50px) scale(0.9)',
        transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
      }}
    >
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onOpen}
        className="relative overflow-hidden border-2 border-white/20 hover:border-white/60 backdrop-blur-sm bg-white/5 cursor-pointer transition-all duration-500 hover:shadow-[0_25px_80px_rgba(255,255,255,0.2)]"
        style={{
          height: `${height}px`,
          transform: `translate(${position.x}px, ${position.y}px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white via-white/80 to-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
        
        {/* Glowing overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </div>

        {/* Image container */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={url}
            alt={`Gallery ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        </div>

        {/* Floating icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Maximize2 className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Image number badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <span className="text-white text-sm font-bold">#{index + 1}</span>
        </div>

        {/* Sparkle effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
          <Sparkles className="w-12 h-12 text-white animate-wiggle" style={{ animationDelay: '0.1s' }} />
        </div>
      </Card>
    </div>
  );
};

const Gallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const index = parseInt(target.dataset.index || '0');
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const items = sectionRef.current?.querySelectorAll('[data-index]');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleLightboxNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setLightboxIndex((prev) => (prev + 1) % galleryImages.length);
    } else {
      setLightboxIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowLeft') handleLightboxNavigation('prev');
      if (e.key === 'ArrowRight') handleLightboxNavigation('next');
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      <section
        id="gallery"
        ref={sectionRef}
        className="relative py-24 bg-black overflow-hidden border-b-2 border-white/20"
      >
        {/* Background Effects */}
        <FloatingParticles />
        
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-white/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'glow-rotate 20s linear infinite',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-white/10 border-2 border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider mb-4 animate-zoom-in">
              <Sparkles className="w-4 h-4 animate-wiggle" />
              OUR GALLERY
            </div>
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight animate-text-reveal">
              Success Stories & Results
            </h2>
            <p className="text-xl text-white opacity-95 animate-text-reveal" style={{ animationDelay: '0.2s' }}>
              See the tangible results from our expert trading strategies
            </p>
          </div>

          {/* Masonry Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {galleryImages.map((url, index) => (
              <div key={index} data-index={index}>
                <GalleryItem
                  url={url}
                  index={index}
                  onOpen={() => openLightbox(index)}
                  isVisible={visibleItems.has(index)}
                />
              </div>
            ))}
          </div>

          {/* Stats Footer */}
          <div className="text-center mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {[
                { number: galleryImages.length, label: "Gallery Items" },
                { number: "100%", label: "Real Results" },
                { number: "24/7", label: "Accessible" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="animate-zoom-in"
                  style={{
                    animationDelay: `${0.3 + index * 0.1}s`,
                    opacity: visibleItems.size > 0 ? 1 : 0,
                  }}
                >
                  <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                  <div className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 hover:border-white/60 flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:rotate-90"
          >
            <X className="w-6 h-6 text-white group-hover:scale-110" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNavigation('prev');
            }}
            className="absolute left-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 hover:border-white/60 flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:-translate-x-2"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-125" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLightboxNavigation('next');
            }}
            className="absolute right-6 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white/30 hover:border-white/60 flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:translate-x-2"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-125" />
          </button>

          {/* Image Container */}
          <div
            className="max-w-6xl max-h-[90vh] w-full relative animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-white/30 shadow-[0_30px_100px_rgba(255,255,255,0.2)]">
              <img
                src={galleryImages[lightboxIndex]}
                alt={`Gallery ${lightboxIndex + 1}`}
                className="w-full h-full object-contain max-h-[90vh]"
                style={{ animation: 'fadeIn 0.5s ease-in-out' }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Image Counter & Info */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-black/70 backdrop-blur-md rounded-full border-2 border-white/30 flex items-center gap-4">
            <span className="text-white font-bold text-lg">{lightboxIndex + 1}</span>
            <div className="w-px h-6 bg-white/30" />
            <span className="text-white/70 text-sm">{galleryImages.length}</span>
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-4xl px-4">
            {galleryImages.map((url, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(index);
                }}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === lightboxIndex
                    ? "border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    : "border-white/20 hover:border-white/40 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
