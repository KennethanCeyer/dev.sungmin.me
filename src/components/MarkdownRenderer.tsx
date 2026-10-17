"use client";

import { useTheme as useThemeContext } from "@/contexts/ThemeContext";
import styled from "@emotion/styled";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

const MarkdownContainer = styled.div`
  line-height: 1.75;
  color: ${({ theme }) => theme.text};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.text};
    letter-spacing: -0.02em;
  }

  h1 {
    font-size: var(--md-heading-1-size);
    border-bottom: 1px solid ${({ theme }) => theme.border};
    padding-bottom: 0.5rem;
  }
  h2 {
    font-size: var(--md-heading-2-size);
    border-bottom: 1px solid ${({ theme }) => theme.border};
    padding-bottom: 0.4rem;
  }
  h3 {
    font-size: var(--md-heading-3-size);
  }
  h4 {
    font-size: var(--md-heading-4-size);
  }

  p {
    margin: 1.1rem 0;
    line-height: 1.7;
    opacity: 0.9;
  }

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }

  a {
    color: ${({ theme }) => theme.text};
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: opacity 0.2s ease;
    &:hover {
      opacity: 0.7;
    }
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.text};
    padding: 0.6rem 1.2rem;
    margin: 1.5rem 0;
    background-color: var(--color-background);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    opacity: 0.85;

    p {
      margin: 0.4rem 0;
    }
  }

  ul,
  ol {
    padding-left: 1.5rem;
    margin: 1rem 0;
    li {
      margin-bottom: 0.4rem;
      line-height: 1.65;
    }
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.border};
    margin: 2.5rem 0;
  }

  .table-wrapper {
    width: 100%;
    overflow-x: auto;
    margin: 1.5rem 0;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }

  th {
    background-color: var(--color-background);
    font-weight: 600;
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  td {
    padding: 0.7rem 1rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: var(--color-background);
  }
`;

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const codeString = String(children).replace(/\n$/, "");

      if (!inline && (match || codeString.includes("\n"))) {
        return (
          <CodeBlock
            rawCode={codeString}
            title={language ? language.toUpperCase() : undefined}
          >
            <SyntaxHighlighter
              style={isDark ? vscDarkPlus : vs}
              language={language || "bash"}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "transparent",
                fontSize: "0.88rem",
              }}
              {...props}
            >
              {codeString}
            </SyntaxHighlighter>
          </CodeBlock>
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    table({ children }) {
      return (
        <div className="table-wrapper">
          <table>{children}</table>
        </div>
      );
    },
    a({ href, children, ...props }) {
      const isExternal = href?.startsWith("http");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <MarkdownContainer className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </MarkdownContainer>
  );
}
