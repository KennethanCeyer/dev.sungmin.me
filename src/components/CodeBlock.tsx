"use client";

import { CSSProperties, ReactNode, useState } from "react";
import { RiFileCodeLine } from "react-icons/ri";
import CopyButton from "./CopyButton";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
  rawCode: string;
  title?: string;
}

const containerStyle: CSSProperties = {
  position: "relative",
  borderRadius: "10px",
  border: "1px solid var(--color-border-weak)",
  overflow: "hidden",
  margin: "1.2rem 0",
  backgroundColor: "var(--code-block-bg)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
  padding: "0.45rem 0.85rem",
  borderBottom: "1px solid var(--color-border-weak)",
  backgroundColor: "var(--code-block-bg)",
};

const titleWrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  minWidth: 0,
  color: "var(--color-text)",
  fontFamily: "var(--font-roboto-mono), monospace",
  fontWeight: 400,
  opacity: 0.8,
};

const titleTextStyle: CSSProperties = {
  fontSize: "0.82rem",
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const codeBodyStyle: CSSProperties = {
  position: "relative",
  backgroundColor: "var(--code-block-bg)",
};

const codeContentStyle: CSSProperties = {
  fontFamily: "var(--font-roboto-mono), monospace",
  fontSize: "0.9rem",
  lineHeight: 1.6,
};

const floatingButtonStyle = (visible: boolean): CSSProperties => ({
  opacity: visible ? 1 : 0,
  transition: "opacity 0.2s ease",
  pointerEvents: visible ? "auto" : "none",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "0.5rem",
  right: "0.5rem",
  zIndex: 2,
});

export default function CodeBlock({
  children,
  className = "",
  rawCode,
  title,
}: CodeBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const combinedClassName = ["code-block", className]
    .filter(Boolean)
    .join(" ")
    .trim() || undefined;

  return (
    <div
      className={combinedClassName}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      style={containerStyle}
    >
      {title && (
        <div style={headerStyle}>
          <div style={titleWrapperStyle}>
            <RiFileCodeLine
              style={{
                width: 16,
                height: 16,
                marginRight: 6,
                opacity: 0.65,
                color: "var(--color-text)",
              }}
              aria-hidden="true"
            />
            <span style={titleTextStyle}>{title}</span>
          </div>
          <CopyButton text={rawCode} />
        </div>
      )}

      <div style={codeBodyStyle}>
        {!title && (
          <div style={floatingButtonStyle(isHovered)}>
            <CopyButton text={rawCode} />
          </div>
        )}
        <div style={codeContentStyle}>{children}</div>
      </div>
    </div>
  );
}
