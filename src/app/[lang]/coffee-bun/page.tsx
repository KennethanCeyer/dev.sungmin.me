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
  RiArrowLeftLine,
  RiDownload2Line,
  RiExternalLinkLine,
  RiFileTextLine,
  RiGithubFill,
} from "react-icons/ri";

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const BackNav = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 0;
  position: relative;
  z-index: 2;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const HeroSection = styled.section`
  position: relative;
  padding: 3rem 1.5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem 1.5rem;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
`;

const Badge = styled.span`
  font-size: 0.78rem;
  font-weight: 500;
  font-family: var(--font-roboto-mono), monospace;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 0.75rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  max-width: 720px;
  margin: 0 auto 1.25rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;
  max-width: 700px;
  margin: 0 auto 2.25rem;
  line-height: 1.65;
`;

const QuickInstallBox = styled.div`
  max-width: 680px;
  margin: 0 auto 2rem;
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }

  .cmd-wrapper {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    overflow-x: auto;
    font-family: var(--font-roboto-mono), monospace;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.text};

    .prompt-symbol {
      opacity: 0.5;
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
  gap: 0.85rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  padding: 0.65rem 1.35rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const SecondaryButton = styled.a`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.65rem 1.35rem;
  border-radius: 6px;
  font-weight: 400;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.text};
  }
`;

const Section = styled.section`
  padding: 3.5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    letter-spacing: -0.02em;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.98rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    max-width: 550px;
    margin: 0 auto;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.5rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }

  .feature-num {
    font-size: 0.75rem;
    font-family: var(--font-roboto-mono), monospace;
    opacity: 0.5;
    margin-bottom: 0.65rem;
  }

  h3 {
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0 0 0.4rem;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.88rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    line-height: 1.55;
    margin: 0;
  }
`;

const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1.5rem;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.88rem;
  }

  th {
    padding: 0.75rem 1rem;
    text-align: left;
    background-color: ${({ theme }) => theme.background};
    font-weight: 600;
  }

  td {
    padding: 0.75rem 1rem;
    border-top: 1px solid ${({ theme }) => theme.border};
  }
`;

const DocsCard = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2.25rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export default function CoffeeBunPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("ko") ? "ko" : "en";
  const installCmd =
    "curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/coffee-bun/master/install.sh | bash";

  const features = [
    {
      num: "01",
      title: t("coffee_bun.f1_title", "One-Shot Automation"),
      desc: t("coffee_bun.f1_desc"),
    },
    {
      num: "02",
      title: t("coffee_bun.f2_title", "Concurrent Execution"),
      desc: t("coffee_bun.f2_desc"),
    },
    {
      num: "03",
      title: t("coffee_bun.f3_title", "Curated UX (≤ 5 Choices)"),
      desc: t("coffee_bun.f3_desc"),
    },
    {
      num: "04",
      title: t("coffee_bun.f4_title", "Shell Configuration"),
      desc: t("coffee_bun.f4_desc"),
    },
    {
      num: "05",
      title: t("coffee_bun.f5_title", "Dev Runtimes"),
      desc: t("coffee_bun.f5_desc"),
    },
    {
      num: "06",
      title: t("coffee_bun.f6_title", "Modern CLI Suite"),
      desc: t("coffee_bun.f6_desc"),
    },
    {
      num: "07",
      title: t("coffee_bun.f7_title", "Apps & CLI Link"),
      desc: t("coffee_bun.f7_desc"),
    },
    {
      num: "08",
      title: t("coffee_bun.f8_title", "Diagnostic & Updater"),
      desc: t("coffee_bun.f8_desc"),
    },
  ];

  const packages = [
    {
      category: "Shell & Theme",
      items: [
        { name: "Oh My Zsh", desc: "Zsh community framework" },
        { name: "Powerlevel10k", desc: "Fast, flexible prompt theme" },
        { name: "zsh-autosuggestions", desc: "Fish-style command autocompletion" },
        { name: "zsh-syntax-highlighting", desc: "Realtime terminal syntax highlighting" },
      ],
    },
    {
      category: "Dev Runtimes",
      items: [
        { name: "Go (Golang)", desc: "1.22+ runtime engine" },
        { name: "Node.js", desc: "LTS JavaScript runtime bundled with npm" },
        { name: "Python 3", desc: "Python 3 interpreter bundled with pip" },
      ],
    },
    {
      category: "Modern CLI Tools",
      items: [
        { name: "zoxide", desc: "Frecency-based cd alternative" },
        { name: "fzf", desc: "Fuzzy finder utility" },
        { name: "ripgrep", desc: "High-performance grep replacement" },
        { name: "eza", desc: "Modern ls replacement with colors" },
        { name: "htop", desc: "Interactive process viewer" },
        { name: "git", desc: "Version control engine" },
      ],
    },
    {
      category: "Applications",
      items: [
        { name: "Visual Studio Code", desc: "Code editor with automated PATH linking" },
        { name: "Google Chrome", desc: "Web browser" },
      ],
    },
  ];

  return (
    <PageWrapper>
      <InteractiveGrid />

      <BackNav>
        <Link href={`/${lang}`}>
          <RiArrowLeftLine />
          <span>Projects</span>
        </Link>
      </BackNav>

      {/* Hero Section */}
      <HeroSection>
        <BadgeRow>
          <Badge>Go 1.22+</Badge>
          <Badge>macOS</Badge>
          <Badge>MIT License</Badge>
          <Badge>Command: bun</Badge>
        </BadgeRow>

        <Title>coffee-bun</Title>
        <Subtitle>{t("coffee_bun.tagline")}</Subtitle>
        <Description>{t("coffee_bun.description")}</Description>

        <QuickInstallBox>
          <div className="cmd-wrapper">
            <span className="prompt-symbol">$</span>
            <code>{installCmd}</code>
          </div>
          <CopyButton text={installCmd} label="Copy" />
        </QuickInstallBox>

        <ButtonGroup>
          <PrimaryButton href="#install">
            <RiDownload2Line />
            <span>Install</span>
          </PrimaryButton>
          <SecondaryButton
            href="https://github.com/KennethanCeyer/coffee-bun"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiGithubFill />
            <span>GitHub</span>
            <RiExternalLinkLine style={{ opacity: 0.5 }} />
          </SecondaryButton>
          <SecondaryButton href="#docs">
            <RiFileTextLine />
            <span>Documentation</span>
          </SecondaryButton>
        </ButtonGroup>
      </HeroSection>

      {/* Terminal Simulator */}
      <Section id="tui">
        <SectionHeader>
          <h2>{t("coffee_bun.tui_preview_title", "Terminal Interface Preview")}</h2>
          <p>{t("coffee_bun.tui_preview_subtitle")}</p>
        </SectionHeader>
        <TerminalSimulator />
      </Section>

      {/* Core Features */}
      <Section id="features">
        <SectionHeader>
          <h2>{t("coffee_bun.features_title", "Key Capabilities")}</h2>
          <p>{t("coffee_bun.features_subtitle")}</p>
        </SectionHeader>

        <FeaturesGrid>
          {features.map((feat, idx) => (
            <FeatureCard key={idx}>
              <div className="feature-num">{feat.num}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Section>

      {/* Components Included */}
      <Section id="packages">
        <SectionHeader>
          <h2>{t("coffee_bun.packages_title", "Included Components")}</h2>
          <p>{t("coffee_bun.packages_subtitle")}</p>
        </SectionHeader>

        <FeaturesGrid>
          {packages.map((group, i) => (
            <FeatureCard key={i}>
              <div className="feature-num">{`CAT-0${i + 1}`}</div>
              <h3 style={{ marginBottom: "0.85rem" }}>{group.category}</h3>
              <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                {group.items.map((it, j) => (
                  <li key={j} style={{ marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 500 }}>{it.name}</span>
                    <div style={{ fontSize: "0.8rem", opacity: 0.65 }}>
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
          <h2>{t("coffee_bun.install_heading", "Installation")}</h2>
          <p>Execute via single-command bootstrap or compile from source.</p>
        </SectionHeader>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>
              1. {t("coffee_bun.install_method_curl", "One-Line Bootstrap")}
            </h3>
            <p style={{ opacity: 0.7, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              {t("coffee_bun.install_desc_curl")}
            </p>
            <CodeBlock rawCode={installCmd}>
              <pre style={{ margin: 0, padding: "0.85rem" }}>
                <code>{installCmd}</code>
              </pre>
            </CodeBlock>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>
              2. {t("coffee_bun.install_method_brew", "Homebrew Tap")}
            </h3>
            <p style={{ opacity: 0.7, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              {t("coffee_bun.install_desc_brew")}
            </p>
            <CodeBlock rawCode="brew install KennethanCeyer/coffee-bun/bun">
              <pre style={{ margin: 0, padding: "0.85rem" }}>
                <code>brew install KennethanCeyer/coffee-bun/bun</code>
              </pre>
            </CodeBlock>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>
              3. {t("coffee_bun.install_method_source", "Build from Source")}
            </h3>
            <p style={{ opacity: 0.7, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              {t("coffee_bun.install_desc_source")}
            </p>
            <CodeBlock
              rawCode={`git clone https://github.com/KennethanCeyer/coffee-bun.git\ncd coffee-bun\nmake install`}
            >
              <pre style={{ margin: 0, padding: "0.85rem" }}>
                <code>{`git clone https://github.com/KennethanCeyer/coffee-bun.git\ncd coffee-bun\nmake install`}</code>
              </pre>
            </CodeBlock>
          </div>
        </div>
      </Section>

      {/* CLI Command Reference (bun) */}
      <Section id="commands">
        <SectionHeader>
          <h2>{t("coffee_bun.commands_title", "CLI Command Reference (`bun`)")}</h2>
          <p>{t("coffee_bun.commands_subtitle")}</p>
        </SectionHeader>

        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "35%" }}>Command</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun</code>
                  </td>
                  <td>Launch interactive terminal interface (TUI) with ≤ 5 presets</td>
                </tr>
                <tr>
                  <td style={{ fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun check</code>
                  </td>
                  <td>Inspect system environment and report missing tools</td>
                </tr>
                <tr>
                  <td style={{ fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun install all</code>
                  </td>
                  <td>Non-interactive batch provisioning for all missing packages</td>
                </tr>
                <tr>
                  <td style={{ fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun doctor</code>
                  </td>
                  <td>Verify environment diagnostics, ~/.zshrc hooks, and CLI links</td>
                </tr>
                <tr>
                  <td style={{ fontFamily: "var(--font-roboto-mono)" }}>
                    <code>bun update</code>
                  </td>
                  <td>Upgrade formulae, casks, and pull fresh Oh My Zsh themes</td>
                </tr>
              </tbody>
            </table>
          </TableContainer>
        </div>
      </Section>

      {/* Documentation Section */}
      <Section id="docs">
        <SectionHeader>
          <h2>{t("coffee_bun.docs_title", "Documentation")}</h2>
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
