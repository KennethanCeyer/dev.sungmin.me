import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const readProjectFile = (relPath) =>
  fs.readFileSync(path.join(rootDir, relPath), "utf8");

describe("Main Shell, ASCII Logo, Support Matrix & Theme Integrity", () => {
  it("TerminalSimulator.tsx uses theme-aware CSS variables instead of hardcoded black backgrounds", () => {
    const content = readProjectFile("src/components/TerminalSimulator.tsx");

    // Must use theme-aware CSS variables
    assert.match(content, /background-color:\s*var\(--code-block-bg\)/);
    assert.match(content, /background-color:\s*var\(--color-background\)/);
    assert.match(content, /color:\s*var\(--code-block-fg\)/);

    // Must NOT contain hardcoded pitch-black terminal backgrounds
    const forbiddenBlackHexes = ["#05070a", "#0c1017", "#080c12", "#06090e"];
    for (const hex of forbiddenBlackHexes) {
      assert.equal(
        content.toLowerCase().includes(hex),
        false,
        `TerminalSimulator.tsx should not contain hardcoded black background ${hex}`
      );
    }

    // Must NOT contain hardcoded colored traffic light or ANSI rainbow hexes
    const forbiddenColorHexes = [
      "#ff5f56",
      "#ffbd2e",
      "#27c93f",
      "#58a6ff",
      "#3fb950",
      "#d29922",
      "#bc8cff",
    ];
    for (const hex of forbiddenColorHexes) {
      assert.equal(
        content.toLowerCase().includes(hex),
        false,
        `TerminalSimulator.tsx should not contain non-monotone color ${hex}`
      );
    }
  });

  it("TerminalSimulator.tsx includes interactive Tree TUI, ASCII art banner, and all 5 subcommands", () => {
    const content = readProjectFile("src/components/TerminalSimulator.tsx");

    // ASCII art banner present
    assert.match(content, /▄▄██████▄▄\s+▄▀▀▀ ▄▀▀▄ █▀▀▀/);

    // Interactive Tree TUI handlers and components
    assert.match(content, /toggleFold/);
    assert.match(content, /toggleItem/);
    assert.match(content, /selectAllMissing/);
    assert.match(content, /TreeContainer/);
    assert.match(content, /CategoryRow/);
    assert.match(content, /ItemRow/);

    // All 5 subcommands present
    assert.match(content, /1\. bun/);
    assert.match(content, /2\. bun install all/);
    assert.match(content, /3\. bun check/);
    assert.match(content, /4\. bun doctor/);
    assert.match(content, /5\. bun update/);
  });

  it("coffee-bun/page.tsx renders ASCII logo and merged-row (rowSpan) matrix table with RiCheckLine", () => {
    const content = readProjectFile("src/app/[lang]/coffee-bun/page.tsx");

    // FullWidthInstallBanner must use var(--code-block-bg) and var(--code-block-fg)
    assert.match(content, /background-color:\s*var\(--code-block-bg\)/);
    assert.match(content, /color:\s*var\(--code-block-fg\)/);

    // No hardcoded black background or colorful prompt hexes
    for (const hex of ["#06090e", "#05070a", "#58a6ff", "#f0f6fc"]) {
      assert.equal(
        content.toLowerCase().includes(hex),
        false,
        `coffee-bun/page.tsx should not contain hardcoded hex ${hex}`
      );
    }

    // Coffee Bun ASCII Art Logo must be present
    assert.match(content, /COFFEE_BUN_ASCII/);
    assert.match(content, /▄▄██████▄▄\s+▄▀▀▀ ▄▀▀▄ █▀▀▀/);

    // Merged-row matrix table with rowSpan and RiCheckLine must be present
    assert.match(content, /rowSpan=\{group\.items\.length\}/);
    assert.match(content, /className="section-cell"/);
    assert.match(content, /className="check-cell"/);
    assert.match(content, /<RiCheckLine\s*\/>/);
  });

  it("loads RobotoMonoVariable.woff2 with block elements and adjustFontFallback: false so ASCII art never squishes", () => {
    const layoutContent = readProjectFile("src/app/[lang]/layout.tsx");
    assert.match(layoutContent, /RobotoMonoVariable\.woff2/);
    assert.match(layoutContent, /adjustFontFallback:\s*false/);
    assert.equal(
      fs.existsSync(path.join(rootDir, "src/fonts/RobotoMonoVariable.woff2")),
      true,
      "src/fonts/RobotoMonoVariable.woff2 must exist"
    );

    const coffeeBunPage = readProjectFile("src/app/[lang]/coffee-bun/page.tsx");
    assert.match(
      coffeeBunPage,
      /font-family:\s*var\(--font-roboto-mono\),\s*monospace/
    );
  });

  it("ThemeContext.tsx toggles data-theme on documentElement without polluting body inline style", () => {
    const content = readProjectFile("src/contexts/ThemeContext.tsx");

    assert.match(
      content,
      /document\.documentElement\.setAttribute\("data-theme",\s*newTheme\)/
    );
    assert.equal(
      content.includes("document.body.style.setProperty"),
      false,
      "ThemeContext.tsx should not inject inline --color-body on document.body"
    );
  });

  it("i18n-resources.ts has matching EN/KO keys and avoids marketing hyperbole", () => {
    const content = readProjectFile("src/lib/i18n-resources.ts");

    const forbiddenMarketingPhrases = [
      "black background",
      "블랙 배경",
      "4 Hours → 30 Seconds",
      "Zero Configuration Errors",
      "zero-friction",
      "30초 만에",
      "생산성을 극대화",
    ];
    for (const phrase of forbiddenMarketingPhrases) {
      assert.equal(
        content.includes(phrase),
        false,
        `i18n-resources.ts should not contain marketing/stale phrase: ${phrase}`
      );
    }

    // Required localization keys in both EN and KO sections
    const requiredKeys = [
      "tui_title",
      "tui_subtitle",
      "features_title",
      "f1_title",
      "f6_title",
      "inventory_title",
      "th_section",
      "th_package",
      "th_target",
      "th_install",
      "th_config",
      "th_doctor",
      "th_update",
      "commands_title",
      "install_heading",
    ];

    for (const key of requiredKeys) {
      const matches = content.match(new RegExp(`\\b${key}:`, "g")) || [];
      assert.equal(
        matches.length,
        2,
        `Expected key '${key}' to exist in both EN and KO resources (found ${matches.length})`
      );
    }
  });
});
