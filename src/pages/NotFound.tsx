import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const NotFound = () => {
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div ref={pageRef} className="flex min-h-screen items-center justify-center relative overflow-hidden">
      <div className="text-center relative z-10">
        <h1 className="mb-4 text-6xl font-black text-white">404</h1>
        <p className="mb-8 text-xl text-white opacity-95">Oops! Page not found</p>
        <a href="/" className="inline-block text-white border-2 border-white/30 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition-all duration-300">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
