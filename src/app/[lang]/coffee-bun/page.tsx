"use client";

import CodeBlock from "@/components/CodeBlock";
import CopyButton from "@/components/CopyButton";
import InteractiveGrid from "@/components/InteractiveGrid";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TerminalSimulator from "@/components/TerminalSimulator";
import { coffeeBunReadmeContent } from "@/data/coffeeBunReadme";
import styled from "@emotion/styled";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  RiAppleFill,
  RiArrowRightLine,
  RiCheckDoubleLine,
  RiCheckLine,
  RiCodeSSlashLine,
  RiCpuLine,
  RiCupLine,
  RiDownload2Line,
  RiExternalLinkLine,
  RiFileTextLine,
  RiFlashlightLine,
  RiGithubFill,
  RiHeartPulseLine,
  RiMacbookLine,
  RiRefreshLine,
  RiShieldCheckLine,
  RiTerminalBoxLine,
} from "react-icons/ri";

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  padding: 5rem 1.5rem 3.5rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 3.5rem 1rem 2rem;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Badge = styled.span<{ variant?: "go" | "mac" | "mit" | "accent" }>`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: ${({ theme, variant }) =>
    variant === "accent"
      ? "var(--accent-color, #00add8)"
      : variant === "go"
      ? "#00add820"
      : variant === "mac"
      ? "rgba(var(--pattern-rgb), 0.08)"
      : "rgba(var(--pattern-rgb), 0.06)"};
  color: ${({ variant }) =>
    variant === "accent"
      ? "#ffffff"
      : variant === "go"
      ? "#00add8"
      : "inherit"};
  border: 1px solid
    ${({ theme, variant }) =>
      variant === "go" ? "#00add840" : "var(--color-border-weak)"};
`;

const Title = styled.h1`
  font-size: 3.8rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;
  line-height: 1.15;
  background: var(--accent-gradient, linear-gradient(135deg, #00add8, #007d9c));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.35rem;
  font-weight: 500;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  max-width: 750px;
  margin: 0 auto 2.5rem;
  line-height: 1.7;
`;

const QuickInstallBox = styled.div`
  max-width: 720px;
  margin: 0 auto 2rem;
  background-color: var(--code-block-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }

  .cmd-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    overflow-x: auto;
    font-family: var(--font-roboto-mono), monospace;
    font-size: 0.88rem;
    color: ${({ theme }) => theme.text};

    .prompt-symbol {
      color: var(--accent-color, #00add8);
      font-weight: bold;
    }
    code {
      background: none;
      padding: 0;
      white-space: nowrap;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  background: var(--accent-gradient, #00add8);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.a`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 4.5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2.2rem;
    font-weight: 700;
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
    border: none;
    padding: 0;
  }

  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1.75rem;
  transition: transform 0.25s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent-color, ${({ theme }) => theme.text});
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    background: rgba(var(--pattern-rgb), 0.05);
    border: 1px solid var(--color-border-weak);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--accent-color, #00add8);
    margin-bottom: 1.25rem;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.92rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
    line-height: 1.6;
    margin: 0;
  }
`;

const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  margin-top: 2rem;
`;

const DocsCard = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2.5rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export default function CoffeeBunPage() {
  const { t } = useTranslation();
  const installCmd =
    "curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/coffee-bun/master/install.sh | bash";

  const features = [
    {
      icon: <RiFlashlightLine />,
      title: t("coffee_bun.f1_title", "One-Shot Automated Setup"),
      desc: t(
        "coffee_bun.f1_desc",
        "Scans system state and installs all missing components with minimal friction and automated verification."
      ),
    },
    {
      icon: <RiCpuLine />,
      title: t("coffee_bun.f2_title", "High Concurrency"),
      desc: t(
        "coffee_bun.f2_desc",
        "Written in Go. Goroutines & channels fetch, clone, and build packages concurrently for maximum setup speed."
      ),
    },
    {
      icon: <RiCheckDoubleLine />,
      title: t("coffee_bun.f3_title", "Curated UX (≤ 5 Choices)"),
      desc: t(
        "coffee_bun.f3_desc",
        "No overwhelming 30-checkbox menus. Carefully curated high-level categories with smart one-click presets."
      ),
    },
    {
      icon: <RiTerminalBoxLine />,
      title: t("coffee_bun.f4_title", "Shell Perfection"),
      desc: t(
        "coffee_bun.f4_desc",
        "Oh My Zsh, Powerlevel10k, autosuggestions, and syntax highlighting wired cleanly in ~/.zshrc with automated backups."
      ),
    },
    {
      icon: <RiCodeSSlashLine />,
      title: t("coffee_bun.f5_title", "Dev Runtimes"),
      desc: t(
        "coffee_bun.f5_desc",
        "Pre-configured Go, Node.js (with npm), and Python 3 (with pip) ready for immediate development work."
      ),
    },
    {
      icon: <RiMacbookLine />,
      title: t("coffee_bun.f6_title", "Modern CLI Suite"),
      desc: t(
        "coffee_bun.f6_desc",
        "Equipped with next-gen replacements: zoxide (smart cd), eza (modern ls), ripgrep (fast grep), fzf, and htop."
      ),
    },
    {
      icon: <RiShieldCheckLine />,
      title: t("coffee_bun.f7_title", "Apps & Auto-CLI Symlink"),
      desc: t(
        "coffee_bun.f7_desc",
        "Installs Visual Studio Code and Google Chrome, and automatically symlinks the `code` CLI directly to your PATH."
      ),
    },
    {
      icon: <RiHeartPulseLine />,
      title: t("coffee_bun.f8_title", "Doctor & Maintenance"),
      desc: t(
        "coffee_bun.f8_desc",
        "Built-in diagnostics via `bun doctor` and one-stop ecosystem upgrades via `bun update`."
      ),
    },
  ];

  const packages = [
    {
      category: "Shell & Theme",
      items: [
        { name: "Oh My Zsh", desc: "Delightful community zsh framework" },
        { name: "Powerlevel10k", desc: "Ultra-fast, flexible prompt theme" },
        {
          name: "zsh-autosuggestions",
          desc: "Fish-style command autocomplete suggestions",
        },
        {
          name: "zsh-syntax-highlighting",
          desc: "Command syntax highlighting on the terminal",
        },
      ],
    },
    {
      category: "Dev Runtimes",
      items: [
        { name: "Go (Golang)", desc: "1.22+ compiler and runtime engine" },
        { name: "Node.js", desc: "Latest LTS JavaScript runtime bundled with npm" },
        { name: "Python 3", desc: "Python 3 interpreter bundled with pip" },
      ],
    },
    {
      category: "Modern CLI Tools",
      items: [
        { name: "zoxide", desc: "Smarter cd command with directory frecency" },
        { name: "fzf", desc: "Blazing fast command-line fuzzy finder" },
        { name: "ripgrep", desc: "Ultra-fast search utility (`rg`)" },
        { name: "eza", desc: "Modern, colorful replacement for ls" },
        { name: "htop", desc: "Interactive process viewer and resource monitor" },
        { name: "git", desc: "Distributed version control system" },
      ],
    },
    {
      category: "Essential Apps",
      items: [
        {
          name: "Visual Studio Code",
          desc: "Modern code editor + automated `code` CLI symlinking",
        },
        { name: "Google Chrome", desc: "Fast and reliable web browser" },
      ],
    },
  ];

  return (
    <PageWrapper>
      <InteractiveGrid />

      {/* Hero Section */}
      <HeroSection>
        <BadgeRow>
          <Badge variant="go">Go 1.22+</Badge>
          <Badge variant="mac">
            <RiAppleFill /> macOS Ready
          </Badge>
          <Badge variant="mit">MIT License</Badge>
          <Badge variant="accent">☕ CLI Command: bun</Badge>
        </BadgeRow>

        <Title>☕ coffee-bun</Title>
        <Subtitle>{t("coffee_bun.tagline")}</Subtitle>
        <Description>{t("coffee_bun.description")}</Description>

        <QuickInstallBox>
          <div className="cmd-wrapper">
            <span className="prompt-symbol">$</span>
            <code>{installCmd}</code>
          </div>
          <CopyButton text={installCmd} label="Copy Script" />
        </QuickInstallBox>

        <ButtonGroup>
          <PrimaryButton href="#install">
            <RiDownload2Line />
            <span>{t("hero.quick_install", "Quick Install")}</span>
          </PrimaryButton>
          <SecondaryButton
            href="https://github.com/KennethanCeyer/coffee-bun"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiGithubFill />
            <span>GitHub Repository</span>
            <RiExternalLinkLine style={{ opacity: 0.6 }} />
          </SecondaryButton>
          <SecondaryButton href="#docs">
            <RiFileTextLine />
            <span>Full Documentation</span>
          </SecondaryButton>
        </ButtonGroup>
      </HeroSection>

      {/* Interactive Terminal Simulator */}
      <Section id="tui">
        <SectionHeader>
          <h2>{t("coffee_bun.tui_preview_title", "Interactive Terminal Preview")}</h2>
          <p>
            {t(
              "coffee_bun.tui_preview_subtitle",
              "Clean, responsive, and minimalist terminal interface."
            )}
          </p>
        </SectionHeader>
        <TerminalSimulator />
      </Section>

      {/* Core Features */}
      <Section id="features">
        <SectionHeader>
          <h2>{t("coffee_bun.features_title", "Why coffee-bun?")}</h2>
          <p>{t("coffee_bun.features_subtitle")}</p>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feat, idx) => (
            <FeatureCard key={idx}>
              <div className="icon-wrapper">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>

      {/* Packages Included */}
      <Section id="packages">
        <SectionHeader>
          <h2>{t("coffee_bun.packages_title", "What's Included")}</h2>
          <p>
            {t(
              "coffee_bun.packages_subtitle",
              "Essential tools curated for modern software engineering."
            )}
          </p>
        </SectionHeader>

        <FeaturesGrid>
          {packages.map((group, i) => (
            <FeatureCard key={i} style={{ borderTop: "3px solid var(--accent-color)" }}>
              <h3 style={{ marginBottom: "1rem", color: "var(--accent-color)" }}>
                {group.category}
              </h3>
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                {group.items.map((it, j) => (
                  <li key={j} style={{ marginBottom: "0.6rem" }}>
                    <strong>{it.name}</strong>
                    <div style={{ fontSize: "0.82rem", opacity: 0.7 }}>
                      {it.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>

      {/* Installation Methods */}
      <Section id="install">
        <SectionHeader>
          <h2>{t("coffee_bun.install_heading", "Get Started in Seconds")}</h2>
          <p>Run the single bootstrap script or install with your favorite workflow.</p>
        </SectionHeader>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              1. {t("coffee_bun.install_method_curl", "One-Line Install (Recommended)")}
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.92rem", marginBottom: "0.75rem" }}>
              {t("coffee_bun.install_desc_curl")}
            </p>
            <CodeBlock rawCode={installCmd}>
              <pre style={{ margin: 0, padding: "1rem" }}>
                <code>{installCmd}</code>
              </pre>
            </CodeBlock>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              2. {t("coffee_bun.install_method_brew", "Install via Homebrew")}
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.92rem", marginBottom: "0.75rem" }}>
              {t("coffee_bun.install_desc_brew")}
            </p>
            <CodeBlock rawCode="brew install KennethanCeyer/coffee-bun/bun">
              <pre style={{ margin: 0, padding: "1rem" }}>
                <code>brew install KennethanCeyer/coffee-bun/bun</code>
              </pre>
            </CodeBlock>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              3. {t("coffee_bun.install_method_source", "Build from Source")}
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.92rem", marginBottom: "0.75rem" }}>
              {t("coffee_bun.install_desc_source")}
            </p>
            <CodeBlock
              rawCode={`git clone https://github.com/KennethanCeyer/coffee-bun.git\ncd coffee-bun\nmake install`}
            >
              <pre style={{ margin: 0, padding: "1rem" }}>
                <code>{`git clone https://github.com/KennethanCeyer/coffee-bun.git\ncd coffee-bun\nmake install`}</code>
              </pre>
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* CLI Commands Reference (Command: bun) */}
      <Section id="commands">
        <SectionHeader>
          <h2>{t("coffee_bun.commands_title", "CLI Command Reference (`bun`)")}</h2>
          <p>{t("coffee_bun.commands_subtitle")}</p>
        </SectionHeader>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <TableContainer>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--color-background)" }}>
                  <th style={{ padding: "0.85rem 1.2rem", textAlign: "left" }}>CLI Command</th>
                  <th style={{ padding: "0.85rem 1.2rem", textAlign: "left" }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)", fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun</code>
                  </td>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)" }}>
                    Launch interactive terminal UI (TUI) with ≤ 5 curated choices
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)", fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun check</code>
                  </td>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)" }}>
                    Inspect system environment, versions, and identify missing packages
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)", fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun install all</code>
                  </td>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)" }}>
                    Non-interactive batch setup for all missing components
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)", fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun doctor</code>
                  </td>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)" }}>
                    Run environment diagnostics, check ~/.zshrc hooks & VS Code CLI path
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)", fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun update</code>
                  </td>
                  <td style={{ padding: "0.85rem 1.2rem", borderTop: "1px solid var(--color-border)" }}>
                    Upgrade Homebrew packages, casks, and pull fresh Oh My Zsh themes
                  </td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </div>
      </Section>

      {/* Documentation Section */}
      <Section id="docs">
        <SectionHeader>
          <h2>{t("coffee_bun.docs_title", "Complete Documentation")}</h2>
          <p>{t("coffee_bun.docs_subtitle")}</p>
        </SectionHeader>

        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <DocsCard>
            <MarkdownRenderer content={coffeeBunReadmeContent} />
          </DocsCard>
        </div>
      </Section>
    </PageWrapper>
  );
}
