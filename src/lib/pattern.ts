export const generatePattern = (theme: "light" | "dark", seed: string) => {
  const color =
    theme === "light" ? "rgba(16, 18, 22, 0.12)" : "rgba(255, 255, 255, 0.12)";

  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const index = Math.abs(hash);

  const patterns = [
    `radial-gradient(${color} 1.5px, transparent 1.5px)`,
    `linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%), linear-gradient(45deg, ${color} 25%, transparent 25%, transparent 75%, ${color} 75%)`,
    `linear-gradient(45deg, transparent 48%, ${color} 48%, ${color} 52%, transparent 52%), linear-gradient(-45deg, transparent 48%, ${color} 48%, ${color} 52%, transparent 52%)`,
    `repeating-linear-gradient(45deg, ${color}, ${color} 1px, transparent 1px, transparent 6px)`,
    `repeating-conic-gradient(${color} 0% 25%, transparent 0% 50%)`,
    `linear-gradient(0deg, ${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
    `repeating-linear-gradient(0deg, ${color}, ${color} 1px, transparent 1px, transparent 12px), repeating-linear-gradient(90deg, ${color}, ${color} 1px, transparent 1px, transparent 12px)`,
    `linear-gradient(135deg, ${color} 25%, transparent 25%), linear-gradient(225deg, ${color} 25%, transparent 25%)`,
    `linear-gradient(45deg, ${color} 25%, transparent 25%), linear-gradient(-45deg, ${color} 25%, transparent 25%)`,
    `repeating-linear-gradient(135deg, ${color}, ${color} 8px, transparent 8px, transparent 16px)`,
    `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
  ];

  return patterns[index % patterns.length];
};
