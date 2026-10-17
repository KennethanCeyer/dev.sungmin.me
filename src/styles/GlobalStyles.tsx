"use client";

import { css, Global, Theme } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={(theme: Theme) => css`
      @page {
        size: auto;
        margin: 2cm;
      }
      ::-moz-selection {
        color: var(--color-body);
        background-color: var(--color-text);
      }
      ::selection {
        color: var(--color-body);
        background-color: var(--color-text);
      }

      html {
        box-sizing: border-box;
        scroll-behavior: smooth;
      }
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }

      /* Light mode base */
      :root {
        --color-text: #101216;
        --color-body: #ffffff;
        --color-background: #fafafa;
        --color-border: #eaeaea;
        --color-border-weak: #00000014;
        --color-primary: #101216;
        --code-block-bg: #f6f8fa;
        --code-block-fg: #24292e;
        --invert-if-dark: none;
        --color-inline-bg: #f5f5f5;
        --color-inline-text: #101216;
        --pattern-rgb: 16, 18, 22;

        /* Markdown heading scale */
        --md-heading-1-size: 2.2rem;
        --md-heading-2-size: 1.8rem;
        --md-heading-3-size: 1.45rem;
        --md-heading-4-size: 1.25rem;
        --md-heading-5-size: 1.1rem;
        --md-heading-6-size: 0.95rem;
        --md-heading-1-top: 2rem;
        --md-heading-2-top: 1.75rem;
        --md-heading-3-top: 1.5rem;
        --md-heading-4-top: 1.25rem;
        --md-heading-5-top: 1.1rem;
        --md-heading-6-top: 1rem;
        --md-heading-bottom: 0.35em;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --color-text: #ffffff;
          --color-body: #000000;
          --color-background: #111111;
          --color-border: #333333;
          --color-border-weak: #ffffff14;
          --color-primary: #ffffff;
          --code-block-bg: #0f0f0f;
          --code-block-fg: #f8f8f2;
          --invert-if-dark: invert(1);
          --color-inline-bg: #ffffff14;
          --color-inline-text: #ffffff;
          --pattern-rgb: 255, 255, 255;
        }
      }

      html[data-theme="light"] {
        --color-text: #101216;
        --color-body: #ffffff;
        --color-background: #fafafa;
        --color-border: #eaeaea;
        --color-border-weak: #00000014;
        --color-primary: #101216;
        --code-block-bg: #f6f8fa;
        --code-block-fg: #24292e;
        --invert-if-dark: none;
        --color-inline-bg: #f5f5f5;
        --color-inline-text: #101216;
        --pattern-rgb: 16, 18, 22;
      }

      html[data-theme="dark"] {
        --color-text: #ffffff;
        --color-body: #000000;
        --color-background: #111111;
        --color-border: #333333;
        --color-border-weak: #ffffff14;
        --color-primary: #ffffff;
        --code-block-bg: #0f0f0f;
        --code-block-fg: #f8f8f2;
        --invert-if-dark: invert(1);
        --color-inline-bg: #ffffff14;
        --color-inline-text: #ffffff;
        --pattern-rgb: 255, 255, 255;
      }

      body {
        position: relative;
        height: 100%;
        min-height: 100vh;
        padding: 0;
        margin: 0;
        font-weight: 400;
        font-size: 16px;
        font-family: var(--font-plus-jakarta-sans), var(--font-pretendard),
          -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
          "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background-color: var(--color-body);
        color: var(--color-text);
        transition: background-color 0.25s ease, color 0.25s ease;
      }

      select,
      input,
      button,
      textarea {
        border: 0;
        outline: 0;
        font: inherit;
        font-family: inherit;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      p {
        line-height: 1.65rem;
        margin-top: 1.2rem;
        margin-bottom: 0;
      }

      ul,
      ol {
        margin-top: 1.2rem;
        margin-bottom: 1.2rem;
        padding-left: 1.2em;
        li {
          line-height: 1.6;
          margin-bottom: 0.4rem;
        }
      }

      code:not(pre code) {
        background-color: var(--color-inline-bg);
        padding: 0.2em 0.45em;
        border-radius: 4px;
        font-size: 0.9em;
        font-family: var(--font-roboto-mono), monospace;
        color: var(--color-inline-text);
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--color-text);
        opacity: 0.5;
      }
    `}
  />
);

export default GlobalStyles;
