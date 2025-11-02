import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

// Gallery items with images and captions
const galleryItems = [
  {
    id: 1,
    image: "/WhatsApp Image 2025-10-27 at 16.40.46 (2).jpeg",
    title: "Trading Success Stories",
    caption: "Real profits from real traders who learned with us",
    gradient: "from-white/5 via-white/10 to-white/5",
  },
  {
    id: 2,
    image: "/WhatsApp Image 2025-10-27 at 16.40.47 (1).jpeg",
    title: "Expert Strategies",
    caption: "Master the markets with proven techniques and insights",
    gradient: "from-white/8 via-white/12 to-white/8",
  },
  {
    id: 3,
    image: "/WhatsApp Image 2025-10-27 at 16.40.49.jpeg",
    title: "Consistent Results",
    caption: "Building sustainable trading success, one trade at a time",
    gradient: "from-white/10 via-white/15 to-white/10",
  },
  {
    id: 4,
    image: "/WhatsApp Image 2025-10-27 at 16.41.09 (1).jpeg",
    title: "Professional Growth",
    caption: "Transform from beginner to confident market expert",
    gradient: "from-white/12 via-white/18 to-white/12",
  },
  {
    id: 5,
    image: "/WhatsApp Image 2025-10-27 at 16.40.26 (1).jpeg",
    title: "Join Our Community",
    caption: "Be part of a network of successful traders",
    gradient: "from-white/15 via-white/20 to-white/15",
  },
];

/**
 * ScrollGallery Component
 * 
 * A cinematic, scroll-based gallery that creates smooth scene transitions
 * as the user scrolls. Each scene takes full viewport height with parallax
 * effects, fade animations, and depth-based motion.
 * 
 * Key Features:
 * - Full viewport height scenes
 * - Scroll-based animations using Framer Motion's useScroll() and useTransform()
 * - Parallax and depth effects
 * - Smooth spring-based easing
 * - Scroll progress indicator
 * - Background gradient transitions
 * - Mobile responsive with lazy loading
 */
const ScrollGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  // Get scroll progress for the entire container
  // This tracks how far through the gallery we've scrolled (0 to 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring-based progress for natural movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Update window height on resize
  useEffect(() => {
    const updateHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Calculate scroll progress for scroll indicator
  const indicatorProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Pre-calculate dot progress transforms for each scene
  const dotProgresses = galleryItems.map((_, index) =>
    useTransform(
      scrollYProgress,
      [index / galleryItems.length, (index + 1) / galleryItems.length],
      [0.3, 1],
      { clamp: true }
    )
  );

  return (
    <section
      id="scroll-gallery"
      className="relative overflow-hidden"
    >
      {/* Scroll Progress Indicator - Fixed on the side */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block">
        <div className="relative w-1 h-64 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white rounded-full transition-colors"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          />
        </div>
        {/* Progress indicator dots */}
        <div className="absolute -right-4 top-0 h-64 flex flex-col justify-between py-2">
          {galleryItems.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-white/30"
              style={{
                scale: dotProgresses[index],
                opacity: dotProgresses[index],
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Progress Bar (Mobile-friendly) */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-50 md:hidden"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "left",
        }}
      />

      {/* Main Gallery Container */}
      <div ref={containerRef} className="relative">
        {galleryItems.map((item, index) => {
          // Calculate the scroll range for this scene
          // Each scene takes up 1/5th of the total scroll distance
          const sceneStart = index / galleryItems.length;
          const sceneEnd = (index + 1) / galleryItems.length;

          // Get progress within this specific scene (0 to 1)
          const sceneProgress = useTransform(
            scrollYProgress,
            [sceneStart, sceneEnd],
            [0, 1],
            { clamp: false }
          );

          // Opacity: Fade in as scene enters, fade out as it exits
          const opacity = useTransform(
            scrollYProgress,
            [sceneStart - 0.2, sceneStart + 0.2, sceneEnd - 0.2, sceneEnd],
            [0, 1, 1, 0],
            { clamp: false }
          );

          // Scale: Start small, scale up to 1, then scale down slightly as it exits
          const scale = useTransform(
            scrollYProgress,
            [sceneStart, sceneStart + 0.3, sceneEnd - 0.2, sceneEnd],
            [0.8, 1, 1, 0.9],
            { clamp: false }
          );

          // Parallax Y: Image moves slower than scroll for depth effect
          const parallaxY = useTransform(
            scrollYProgress,
            [sceneStart, sceneEnd],
            ["0%", "-20%"]
          );

          // Background gradient opacity based on scroll
          const bgOpacity = useTransform(
            scrollYProgress,
            [sceneStart, sceneStart + 0.3, sceneEnd - 0.2, sceneEnd],
            [0, 0.3, 0.3, 0]
          );

          // Text animations - slide in from different directions
          const titleY = useTransform(
            scrollYProgress,
            [sceneStart, sceneStart + 0.3],
            [50, 0],
            { clamp: false }
          );
          const captionY = useTransform(
            scrollYProgress,
            [sceneStart + 0.1, sceneStart + 0.4],
            [30, 0],
            { clamp: false }
          );

          // Text opacity with delay
          const titleOpacity = useTransform(
            scrollYProgress,
            [sceneStart, sceneStart + 0.25, sceneEnd - 0.1, sceneEnd],
            [0, 1, 1, 0]
          );
          const captionOpacity = useTransform(
            scrollYProgress,
            [sceneStart + 0.15, sceneStart + 0.35, sceneEnd - 0.1, sceneEnd],
            [0, 1, 1, 0]
          );

          return (
            <Scene
              key={item.id}
              item={item}
              index={index}
              opacity={opacity}
              scale={scale}
              parallaxY={parallaxY}
              bgOpacity={bgOpacity}
              titleY={titleY}
              captionY={captionY}
              titleOpacity={titleOpacity}
              captionOpacity={captionOpacity}
              sceneProgress={sceneProgress}
              windowHeight={windowHeight}
            />
          );
        })}
      </div>

      {/* Scroll Hint at the beginning */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
        }}
      >
        <span className="text-white/70 text-sm uppercase tracking-wider">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/**
 * Individual Scene Component
 * 
 * Each scene represents one gallery item with:
 * - Full viewport height
 * - Parallax image effect
 * - Animated text (title and caption)
 * - Background gradient overlay
 * - Smooth fade and scale transitions
 */
interface SceneProps {
  item: typeof galleryItems[0];
  index: number;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  parallaxY: MotionValue<string>;
  bgOpacity: MotionValue<number>;
  titleY: MotionValue<number>;
  captionY: MotionValue<number>;
  titleOpacity: MotionValue<number>;
  captionOpacity: MotionValue<number>;
  sceneProgress: MotionValue<number>;
  windowHeight: number;
}

const Scene = ({
  item,
  index,
  opacity,
  scale,
  parallaxY,
  bgOpacity,
  titleY,
  captionY,
  titleOpacity,
  captionOpacity,
  sceneProgress,
  windowHeight,
}: SceneProps) => {
  // Staggered animation delay for icon
  const iconDelay = useTransform(sceneProgress, [0.2, 0.5], [0, 1]);

  return (
    <motion.div
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        opacity,
      }}
    >
      {/* Background Gradient Overlay - Transitions as you scroll */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} pointer-events-none`}
        style={{
          opacity: bgOpacity,
        }}
      />

      {/* Animated Background Orbs */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: useTransform(sceneProgress, [0, 0.5, 1], [0.4, 0.6, 0.4]),
        }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/12 rounded-full blur-3xl"
          style={{
            x: useTransform(sceneProgress, [0, 1], [-100, 100]),
            y: useTransform(sceneProgress, [0, 1], [-50, 50]),
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/12 rounded-full blur-3xl"
          style={{
            x: useTransform(sceneProgress, [0, 1], [100, -100]),
            y: useTransform(sceneProgress, [0, 1], [50, -50]),
          }}
        />
      </motion.div>

      {/* Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale,
          y: parallaxY,
        }}
      >
        <div className="relative w-full h-full">
          <img
            src={item.image}
            alt={item.title}
            loading={index < 2 ? "eager" : "lazy"}
            className="w-full h-full object-cover"
            style={{
              filter: "brightness(0.7) contrast(1.1)",
            }}
          />
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Subtle vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30" />
        </div>
      </motion.div>

      {/* Content Container - Centered text with animations */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Icon/Sparkle - Animated entrance */}
        <motion.div
          style={{
            opacity: iconDelay,
            scale: useTransform(iconDelay, [0, 1], [0.5, 1]),
            rotate: useTransform(sceneProgress, [0, 1], [0, 360]),
          }}
          className="mb-6 flex justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Title - Slides up and fades in */}
        <motion.h2
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
        >
          {item.title}
        </motion.h2>

        {/* Caption - Slides up with slight delay */}
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed"
          style={{
            y: captionY,
            opacity: captionOpacity,
          }}
        >
          {item.caption}
        </motion.p>

        {/* Scene Number Indicator */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          style={{
            opacity: useTransform(sceneProgress, [0.3, 0.7], [0, 1]),
          }}
        >
          <span className="text-white/50 text-sm font-bold">
            {index + 1}
          </span>
          <div className="w-12 h-px bg-white/30" />
          <span className="text-white/50 text-sm">
            {galleryItems.length}
          </span>
        </motion.div>
      </div>

      {/* Ambient particles for extra depth */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full blur-sm"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              opacity: useTransform(
                sceneProgress,
                [0, 0.5, 1],
                [0, 0.6, 0]
              ),
              scale: useTransform(
                sceneProgress,
                [0, 0.5, 1],
                [0.5, 1, 0.5]
              ),
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ScrollGallery;

