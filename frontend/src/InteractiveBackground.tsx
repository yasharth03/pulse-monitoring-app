import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        overflow: "hidden",
        // We moved the cool gradient here so it's always visible
        backgroundColor: "#0f0e17",
        backgroundImage: `
          radial-gradient(at 47% 33%, hsl(266.95, 62%, 15%) 0, transparent 59%), 
          radial-gradient(at 82% 65%, hsl(218.02, 39%, 11%) 0, transparent 55%)
        `,
      }}
    >
      {/* Orb 1: Purple */}
      <motion.div
        animate={{
          x: mousePosition.x * 0.05,
          y: mousePosition.y * 0.05,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "40vw",
          height: "40vw",
          backgroundColor: "rgba(116, 123, 255, 0.2)", // Slightly brighter
          filter: "blur(120px)",
          borderRadius: "50%",
        }}
      />

      {/* Orb 2: Pink */}
      <motion.div
        animate={{
          x: mousePosition.x * -0.03,
          y: mousePosition.y * -0.03,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 80 }}
        style={{
          position: "absolute",
          top: "50%",
          right: "10%",
          width: "35vw",
          height: "35vw",
          backgroundColor: "rgba(255, 0, 204, 0.15)", // Slightly brighter
          filter: "blur(140px)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}