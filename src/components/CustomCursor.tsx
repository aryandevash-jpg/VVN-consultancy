import { useState, useEffect } from "react";

interface Splash {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [splashes, setSplashes] = useState<Splash[]>([]);

  useEffect(() => {
    let animationFrame: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let splashId = 0;

    const updateCursor = (e: MouseEvent) => {
      // Check if mouse is outside viewport
      if (
        e.clientX < 0 ||
        e.clientX > window.innerWidth ||
        e.clientY < 0 ||
        e.clientY > window.innerHeight
      ) {
        setIsVisible(false);
        return;
      }
      
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setPosition({ x: currentX, y: currentY });
      animationFrame = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      // Reset position to prevent sticking
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight / 2;
      currentX = targetX;
      currentY = targetY;
      setPosition({ x: targetX, y: targetY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleClick = (e: MouseEvent) => {
      // Create splash effect on click
      const newSplash: Splash = {
        id: splashId++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };
      
      setSplashes((prev) => [...prev, newSplash]);
      
      // Remove splash after animation completes
      setTimeout(() => {
        setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
      }, 800);
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animate();

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <>
      {/* Glowing light that follows cursor */}
      {isVisible && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "120px",
          }}
        >
          {/* Outer glow - large and soft */}
          <div className="absolute inset-0 w-full h-full rounded-full bg-white/25 blur-2xl"></div>
          {/* Medium glow */}
          <div className="absolute inset-0 w-3/4 h-3/4 rounded-full bg-white/20 blur-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          {/* Inner bright spot */}
          <div className="absolute inset-0 w-1/2 h-1/2 rounded-full bg-white/15 blur-lg left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}

      {/* Splash effects on click */}
      {splashes.map((splash) => (
        <div
          key={splash.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: `${splash.x}px`,
            top: `${splash.y}px`,
          }}
        >
          {/* Animated splash ripple - Outer circle */}
          <div 
            className="absolute w-16 h-16 rounded-full border-2 border-white/50 animate-splash"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-32px",
              marginTop: "-32px",
            }}
          ></div>
          {/* Animated splash ripple - Middle circle */}
          <div 
            className="absolute w-12 h-12 rounded-full border border-white/40 animate-splash"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-24px",
              marginTop: "-24px",
              animationDelay: "0.1s",
            }}
          ></div>
          {/* Animated splash ripple - Inner bright circle */}
          <div 
            className="absolute w-10 h-10 rounded-full bg-white/60 blur-sm animate-splash"
            style={{
              left: "50%",
              top: "50%",
              marginLeft: "-20px",
              marginTop: "-20px",
              animationDelay: "0.05s",
            }}
          ></div>
        </div>
      ))}
    </>
  );
};

export default CustomCursor;

