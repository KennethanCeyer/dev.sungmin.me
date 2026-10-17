import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const readProjectFile = (relPath) =>
  fs.readFileSync(path.join(rootDir, relPath), "utf8");

describe("Terminal Simulator, Soft Coffee Pastel Palette, GitHub Preview Card & Equal-Width Support Matrix", () => {
  it("TerminalSimulator.tsx uses dark terminal background and the full Soft Coffee Pastel palette from coffee-bun", () => {
    const content = readProjectFile("src/components/TerminalSimulator.tsx");

    // Dark terminal background + Soft Coffee Pastel Lipgloss palette from styles.go
    assert.match(content, /bg:\s*"#0B0A09"/);
    assert.match(content, /primary:\s*"#A67B5B"/);
    assert.match(content, /secondary:\s*"#D4A373"/);
    assert.match(content, /success:\s*"#84A98C"/);
    assert.match(content, /warning:\s*"#E9C46A"/);
    assert.match(content, /danger:\s*"#E07A5F"/);
    assert.match(content, /muted:\s*"#9C8F84"/);
    assert.match(content, /highlight:\s*"#E6CCB2"/);
    assert.match(content, /logoBun:\s*"#C68B59"/);
    assert.match(content, /normal:\s*"#EDE0D4"/);
  });

  it("TerminalSimulator.tsx outputs 100% English CLI results, Braille spinner loading animations, and Play -> Replay transition", () => {
    const content = readProjectFile("src/components/TerminalSimulator.tsx");

    // Must not contain any Korean characters inside the terminal simulator
    assert.equal(
      /[가-힣]/.test(content),
      false,
      "TerminalSimulator.tsx should be 100% English like the real Go CLI"
    );

    // Must include Braille spinner frames from coffee-bun/internal/ui/tui.go
    assert.match(content, /SPINNER_FRAMES\s*=\s*\["⠋",\s*"⠙",\s*"⠹"/);
    assert.match(content, /Checking environment and installed tools\.\.\./);
    assert.match(content, /Please wait while components are verified\.\.\./);
    assert.match(content, /TUI_INSTALL_STEPS/);
    assert.match(content, /isSubcommandCompleted\s*\?\s*\(/);

    // Must match real CLI outputs from /Users/pignose/bundle/internal/cli/*.go
    assert.match(content, /Status:/);
    assert.match(content, /selected to install/);
    assert.match(content, /Installing 4 missing package\(s\)\.\.\./);
    assert.match(content, /\[System & Toolchains\]/);
    assert.match(content, /coffee-bun doctor - Diagnostic Report/);
    assert.match(content, /Checking for updates and running maintenance\.\.\./);
  });

  it("coffee-bun/page.tsx renders 2-tone ASCII logo (#C68B59 & #EDE0D4), PagePreviewCard without redundant #demo button, and equal-width check columns", () => {
    const content = readProjectFile("src/app/[lang]/coffee-bun/page.tsx");

    // FullWidthInstallBanner must use var(--code-block-bg) and var(--code-block-fg)
    assert.match(content, /background-color:\s*var\(--code-block-bg\)/);
    assert.match(content, /color:\s*var\(--code-block-fg\)/);

    // Coffee Bun 2-tone ASCII Art Logo (#C68B59 warm cinnamon brown + #EDE0D4 cream latte foam)
    assert.match(content, /COFFEE_BUN_ASCII_LINES/);
    assert.match(content, /\.bun-icon\s*\{\s*color:\s*#C68B59;/);
    assert.match(content, /\.bun-text\s*\{\s*color:\s*#EDE0D4;/);

    // Hero section should use PagePreviewCard for GitHub and NOT have a redundant href="#demo" button
    assert.match(content, /<PagePreviewCard/);
    assert.equal(
      content.includes('href="#demo"'),
      false,
      "Hero section should not have a redundant Interactive TUI (#demo) button"
    );

    // Merged-row matrix table with rowSpan, RiCheckLine, table-layout: fixed, and 4 identical col widths
    assert.match(content, /table-layout:\s*fixed/);
    assert.match(content, /rowSpan=\{group\.items\.length\}/);
    assert.match(content, /className="section-cell"/);
    assert.match(content, /className="check-cell"/);
    assert.match(content, /<RiCheckLine\s*\/>/);

    const equalCols = content.match(/<col style=\{\{ width: "10\.5%" \}\} \/>/g) || [];
    assert.equal(
      equalCols.length,
      4,
      `Expected 4 identical 10.5% check columns in colgroup, found ${equalCols.length}`
    );
  });

  it("PagePreviewCard.tsx matches blog.sungmin.me preview card structure", () => {
    const content = readProjectFile("src/components/PagePreviewCard.tsx");
    assert.match(content, /PagePreviewContainer/);
    assert.match(content, /className="url-container"/);
    assert.match(content, /className="url-icon"/);
    assert.match(content, /className="url-text"/);
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

  it("i18n-resources.ts uses 'GitHub' in both EN and KO GNB and avoids marketing hyperbole", () => {
    const content = readProjectFile("src/lib/i18n-resources.ts");

    assert.equal(
      content.includes('github: "깃허브"'),
      false,
      'Korean GNB should use "GitHub" instead of "깃허브"'
    );
    const githubNavMatches = content.match(/github:\s*"GitHub"/g) || [];
    assert.equal(
      githubNavMatches.length,
      2,
      'Both EN and KO nav.github should be "GitHub"'
    );

    const forbiddenMarketingPhrases = [
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
        `i18n-resources.ts should not contain marketing phrase: ${phrase}`
      );
    }

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
