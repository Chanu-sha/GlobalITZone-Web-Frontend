import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Hero() {
   const navigate = useNavigate();
  // Particle effect
  useEffect(() => {
    const createParticles = () => {
      const container = document.querySelector(".hero-container");
      if (!container) return;

      // Clear existing particles
      container.querySelectorAll(".particle").forEach((p) => p.remove());

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        Object.assign(particle.style, {
          position: "absolute",
          width: "4px",
          height: "4px",
          background: "rgba(255,255,255,0.6)",
          borderRadius: "50%",
          left: Math.random() * 100 + "%",
          animation: `particle-float ${Math.random() * 20 + 10}s linear ${Math.random() * 20}s infinite`,
          zIndex: 3,
        });
        container.appendChild(particle);
      }
    };

    createParticles();
    window.addEventListener("resize", createParticles);
    return () => window.removeEventListener("resize", createParticles);
  }, []);

  return (
    <div
      className="hero-container relative flex items-center justify-center text-center overflow-hidden"
      style={{
        minHeight: "100vh",
        paddingTop: "80px", 
        background:
          "linear-gradient(to bottom right, #1f2937, #4b5563, #000000)",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(1px)",
          zIndex: 2,
        }}
      />

      {/* Animated Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div
        className="hero-content relative z-10 max-w-5xl mx-auto p-4  "
        style={{ animation: "float 6s ease-in-out infinite" }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Title */}
        <motion.h1
          className="font-extrabold leading-tight mt-10  mb-6"
          style={{
            fontSize: "clamp(2.5rem,5vw,4.5rem)",
            color: "#fff",
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to <span className="italic" style={{ color: "#f87171" }}>Global IT Zone</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mb-12"
          style={{
            fontSize: "clamp(1.125rem,2.5vw,1.5rem)",
            color: "#e9ecef",
            maxWidth: "42rem",
            lineHeight: "1.6",
            opacity: 0.9,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
          Transform your digital presence with cutting-edge IT solutions, expert
          computer repairs & innovative technology services that drive growth.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <motion.button
            className="btn-primary"
            style={{
              position: "relative",
              padding: "1rem 2.5rem",
              fontSize: "1.125rem",
              fontWeight: 600,
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              background: "#fff",
              color: "#667eea",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              boxShadow:
                "0 4px 15px rgba(255,255,255,0.3),0 0 0 0 rgba(255,255,255,0.5)",
              overflow: "hidden",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate('/products');
            }}
          >
            Get Started
          </motion.button>

          <motion.button
            className="btn-secondary"
            style={{
              position: "relative",
              padding: "1rem 2.5rem",
              fontSize: "1.125rem",
              fontWeight: 600,
              borderRadius: "0.75rem",
              cursor: "pointer",
              background: "transparent",
              color: "#fff",
              border: "2px solid #fff",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              navigate('/services');
            }}
          >
            View Services
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {["24/7 Support", "Expert Team", "Fast Delivery"].map(
            (feature, index) => (
              <motion.div
                key={feature}
                className="text-center text-sm font-semibold"
                style={{ color: "#ffd93d" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
              >
                {feature}
              </motion.div>
            )
          )}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#fff",
          opacity: 0.7,
          animation: "bounce 2s infinite",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce {
          0%,20%,50%,80%,100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
        @keyframes particle-float {
          0% { transform: translateY(100vh) translateX(0); opacity:0; }
          10%,90% { opacity:1; }
          100% { transform: translateY(-100vh) translateX(100px); opacity:0; }
        }
      `}</style>
    </div>
  );
}

export default Hero;
