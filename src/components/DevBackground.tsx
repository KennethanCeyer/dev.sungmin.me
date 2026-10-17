"use client";

import { useTheme } from "@/contexts/ThemeContext";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const DevBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme: themeName } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = { x: -1000, y: -1000 };
    const symbols = [
      "0x",
      "::",
      "//",
      "+",
      "fn",
      "{}",
      "->",
      "01",
      "&",
      "~",
      "[]",
    ];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const isDark = themeName === "dark";
    const baseColor = isDark ? "255, 255, 255" : "16, 18, 22";
    const cellWidth = 60;
    const cellHeight = 40;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let frame = 0;
    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      ctx.font = '10px "Roboto Mono", monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.ceil(canvas.width / cellWidth) + 1;
      const rows = Math.ceil(canvas.height / cellHeight) + 1;

      // Draw subtle crosshair grid & reactive code tokens
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * cellWidth;
          const y = r * cellHeight;

          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;

            // Subtle reactive crosshair line
            ctx.strokeStyle = `rgba(${baseColor}, ${proximity * 0.18})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - 5, y);
            ctx.lineTo(x + 5, y);
            ctx.moveTo(x, y - 5);
            ctx.lineTo(x, y + 5);
            ctx.stroke();

            // When close to cursor, show subtle code glyph
            if (dist < maxDist * 0.65) {
              const symIndex = Math.abs((c * 17 + r * 31 + Math.floor(frame / 60)) % symbols.length);
              ctx.fillStyle = `rgba(${baseColor}, ${proximity * 0.4})`;
              ctx.fillText(symbols[symIndex], x, y - 10);
            }
          } else {
            // Static faint grid dot
            ctx.fillStyle = `rgba(${baseColor}, 0.04)`;
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1);
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeName]);

  return <Canvas ref={canvasRef} />;
};

export default DevBackground;
