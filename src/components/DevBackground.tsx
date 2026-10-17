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

    const parent = canvas.parentElement || canvas;
    const isDark = themeName === "dark";
    const baseRgb = isDark ? "255, 255, 255" : "0, 0, 0";

    const mouse = {
      targetX: -1000,
      targetY: -1000,
      currentX: -1000,
      currentY: -1000,
      active: false,
    };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId: number;
    let isPaused = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || 400;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
        mouse.targetX = x;
        mouse.targetY = y;
        mouse.active = true;
        if (mouse.currentX < -500) {
          mouse.currentX = x;
          mouse.currentY = y;
        }
      } else {
        mouse.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    const onVisibility = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animId);
      } else {
        isPaused = false;
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const cellSize = 36;
    const majorInterval = 4;
    const spotlightRadius = 180;

    const render = () => {
      if (isPaused) return;

      if (mouse.active) {
        mouse.currentX += (mouse.targetX - mouse.currentX) * 0.1;
        mouse.currentY += (mouse.targetY - mouse.currentY) * 0.1;
      } else {
        mouse.currentX += (-1000 - mouse.currentX) * 0.05;
        mouse.currentY += (-1000 - mouse.currentY) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);

      const mx = mouse.currentX;
      const my = mouse.currentY;

      // Soft ambient spotlight glow
      if (mx > -200 && mx < width + 200) {
        const radial = ctx.createRadialGradient(
          mx,
          my,
          0,
          mx,
          my,
          spotlightRadius
        );
        radial.addColorStop(0, `rgba(${baseRgb}, ${isDark ? 0.035 : 0.025})`);
        radial.addColorStop(1, `rgba(${baseRgb}, 0)`);
        ctx.fillStyle = radial;
        ctx.fillRect(0, 0, width, height);
      }

      const cols = Math.ceil(width / cellSize) + 1;
      const rows = Math.ceil(height / cellSize) + 1;

      // Draw vertical lines
      for (let c = 0; c <= cols; c++) {
        const x = Math.floor(c * cellSize) + 0.5;
        const isMajor = c % majorInterval === 0;

        const baseAlpha = isMajor
          ? isDark
            ? 0.045
            : 0.04
          : isDark
          ? 0.02
          : 0.018;

        const distToMouse = Math.abs(x - mx);
        let highlight = 0;
        if (distToMouse < spotlightRadius) {
          highlight =
            (1 - distToMouse / spotlightRadius) * (isMajor ? 0.1 : 0.06);
        }

        ctx.strokeStyle = `rgba(${baseRgb}, ${baseAlpha + highlight})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let r = 0; r <= rows; r++) {
        const y = Math.floor(r * cellSize) + 0.5;
        const isMajor = r % majorInterval === 0;

        const baseAlpha = isMajor
          ? isDark
            ? 0.045
            : 0.04
          : isDark
          ? 0.02
          : 0.018;

        const distToMouse = Math.abs(y - my);
        let highlight = 0;
        if (distToMouse < spotlightRadius) {
          highlight =
            (1 - distToMouse / spotlightRadius) * (isMajor ? 0.1 : 0.06);
        }

        ctx.strokeStyle = `rgba(${baseRgb}, ${baseAlpha + highlight})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw precision micro-crosshairs at major intersections
      const tickSize = 3;
      for (let c = 0; c <= cols; c += majorInterval) {
        const x = Math.floor(c * cellSize) + 0.5;
        for (let r = 0; r <= rows; r += majorInterval) {
          const y = Math.floor(r * cellSize) + 0.5;

          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let tickAlpha = isDark ? 0.07 : 0.06;
          if (dist < spotlightRadius) {
            const proximity = 1 - dist / spotlightRadius;
            tickAlpha += proximity * 0.2;
          }

          ctx.strokeStyle = `rgba(${baseRgb}, ${tickAlpha})`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(x - tickSize, y);
          ctx.lineTo(x + tickSize, y);
          ctx.moveTo(x, y - tickSize);
          ctx.lineTo(x, y + tickSize);
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(animId);
    };
  }, [themeName]);

  return <Canvas ref={canvasRef} />;
};

export default DevBackground;
