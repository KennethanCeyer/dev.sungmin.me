"use client";

import { CSSProperties, useState } from "react";
import { RiCheckLine, RiFileCopyLine } from "react-icons/ri";

interface CopyButtonProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  label?: string;
}

const baseButtonStyle: CSSProperties = {
  padding: "0.35rem 0.65rem",
  borderRadius: "6px",
  border: "1px solid var(--color-border-weak)",
  backgroundColor: "var(--code-block-bg)",
  color: "var(--color-text)",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  fontSize: "0.82rem",
  fontFamily: "var(--font-roboto-mono), monospace",
  justifyContent: "center",
  transition: "all 0.2s ease",
};

export default function CopyButton({
  text,
  className = "",
  style,
  label,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const dynamicStyle: CSSProperties = {
    ...baseButtonStyle,
    transform: isHovered ? "translateY(-1px)" : "none",
    backgroundColor: isHovered
      ? "rgba(var(--pattern-rgb), 0.1)"
      : "var(--code-block-bg)",
    opacity: copied ? 1 : 0.85,
    borderColor: copied ? "var(--color-text)" : "var(--color-border-weak)",
    color: "var(--color-text)",
    ...style,
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      style={dynamicStyle}
      aria-label="Copy to clipboard"
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {copied ? (
        <>
          <RiCheckLine style={{ width: 15, height: 15 }} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <RiFileCopyLine style={{ width: 15, height: 15 }} />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
