"use client";

import CodeBlock from "@/components/CodeBlock";
import CopyButton from "@/components/CopyButton";
import TerminalSimulator from "@/components/TerminalSimulator";
import styled from "@emotion/styled";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  RiArrowLeftLine,
  RiCodeSSlashLine,
  RiDownload2Line,
  RiExternalLinkLine,
  RiGithubFill,
} from "react-icons/ri";

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const BackNav = styled.div`
  padding: 2.25rem 0 1rem;
  position: relative;
  z-index: 2;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const HeroSection = styled.section`
  position: relative;
  padding: 3.5rem 0 4rem;
  text-align: center;
  z-index: 1;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 2.5rem 0 3rem;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Badge = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  font-family: var(--font-roboto-mono), monospace;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  opacity: 0.85;
`;

const Title = styled.h1`
  font-size: 3.8rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 2.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  max-width: 800px;
  margin: 0 auto 1.25rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.75;
  max-width: 780px;
  margin: 0 auto 2.5rem;
  line-height: 1.65;
`;

const QuickInstallBox = styled.div`
  max-width: 780px;
  margin: 0 auto 2.25rem;
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.85rem 1.25rem;
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
    font-size: 0.88rem;
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
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const SecondaryButton = styled.a`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.background};
    border-color: ${({ theme }) => theme.text};
  }
`;

const Section = styled.section`
  padding: 4.5rem 0;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 1;

  &:last-of-type {
    border-bottom: none;
    padding-bottom: 6rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 0.6rem;
    letter-spacing: -0.02em;
    border: none;
    padding: 0;
  }

  p {
    font-size: 1.05rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.75rem;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }

  .feature-num {
    font-size: 0.75rem;
    font-family: var(--font-roboto-mono), monospace;
    opacity: 0.5;
    margin-bottom: 0.75rem;
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

const SpecCard = styled.div`
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  width: 100%;

  .spec-header {
    background-color: var(--color-background);
    padding: 0.75rem 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-border-weak);
    font-family: var(--font-roboto-mono), monospace;
    font-size: 0.82rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }

  pre {
    margin: 0;
    padding: 1.5rem;
    font-family: var(--font-roboto-mono), monospace;
    font-size: 0.88rem;
    line-height: 1.6;
    color: var(--code-block-fg);
    overflow-x: auto;
  }
`;

const EcosystemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const EcosystemCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.75rem;

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    border: none;
    padding: 0;
  }

  .eco-desc {
    font-size: 0.88rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin-bottom: 1.2rem;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .eco-tag {
    font-size: 0.75rem;
    font-family: var(--font-roboto-mono), monospace;
    background-color: ${({ theme }) => theme.body};
    border: 1px solid ${({ theme }) => theme.border};
    padding: 0.25rem 0.55rem;
    border-radius: 4px;
    color: ${({ theme }) => theme.text};
    opacity: 0.85;
  }
`;

const InstallList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const InstallItem = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 1.75rem 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem 1.5rem;
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
    margin: 0 0 1rem;
    line-height: 1.6;
  }
`;

const TableContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  width: 100%;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.92rem;
  }

  th {
    padding: 1rem 1.25rem;
    text-align: left;
    background-color: ${({ theme }) => theme.body};
    font-weight: 600;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }

  td {
    padding: 1rem 1.25rem;
    border-top: 1px solid ${({ theme }) => theme.border};
    line-height: 1.6;
  }
`;

export default function CoffeeBunPage() {
  const { t } = useTranslation();
  const params = useParams();
  const urlLang = typeof params?.lang === "string" ? params.lang : "en";
  const lang = urlLang.startsWith("ko") ? "ko" : "en";
  const isKo = lang === "ko";

  const installCmd =
    "curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/bundle/master/install.sh | bash";

  const sampleBundleYaml = `# bundle.yml - macOS Development Environment Specification
platform: macos
version: "0.0.1"

# 1. Programming Languages & Runtimes
languages:
  - golang
  - python:
      package_manager: pip
  - node:
      package_manager: npm
  - rust:
      package_manager: cargo

# 2. Shell & Terminal Preferences
shell:
  framework: oh-my-zsh
  theme: powerlevel10k

terminal:
  emulator: iterm2
  vim: vimrc

# 3. Toolchains & CLI Utilities
toolchains:
  - git
  - zoxide
  - fzf
  - htop
  - ripgrep
  - eza
  - cloc

# 4. Linters & Build Engines
devtools:
  linters: [eslint, flake8]
  build_tools: [gradle, webpack]

# 5. Developer Applications & Casks
applications:
  - visual-studio-code
  - docker
  - google-chrome`;

  const features = [
    {
      num: "01",
      title: t("coffee_bun.f1_title", "Declarative bundle.yml"),
      desc: t("coffee_bun.f1_desc"),
    },
    {
      num: "02",
      title: t("coffee_bun.f2_title", "Interactive CLI Selection"),
      desc: t("coffee_bun.f2_desc"),
    },
    {
      num: "03",
      title: t("coffee_bun.f3_title", "Environment Freeze"),
      desc: t("coffee_bun.f3_desc"),
    },
    {
      num: "04",
      title: t("coffee_bun.f4_title", "Versioned Updates"),
      desc: t("coffee_bun.f4_desc"),
    },
    {
      num: "05",
      title: t("coffee_bun.f5_title", "Polyglot Language Support"),
      desc: t("coffee_bun.f5_desc"),
    },
    {
      num: "06",
      title: t("coffee_bun.f6_title", "Full-Stack Toolchains & Apps"),
      desc: t("coffee_bun.f6_desc"),
    },
  ];

  const ecosystemCategories = [
    {
      title: isKo ? "프로그래밍 언어 & 런타임" : "Programming Languages & Runtimes",
      desc: isKo
        ? "다양한 개발 환경을 위한 언어 엔진 및 패키지 매니저"
        : "Language runtimes with package manager integrations",
      tags: [
        "Golang",
        "Python (PIP/Conda)",
        "Node.js (npm)",
        "Rust (Cargo)",
        "Java (JDK)",
        "Scala",
        "Kotlin",
        "Ruby (gem/bundler)",
        "C / C++ (gcc/gdb)",
        "C# .NET Core",
        "PHP",
        "Haskell",
        "Clojure",
      ],
    },
    {
      title: isKo ? "쉘, Vim & 터미널 환경" : "Shell, Vim & Terminal Environment",
      desc: isKo
        ? "생산성을 극대화하는 프롬프트 및 테마 세팅"
        : "Productive prompt, theme, and terminal configurations",
      tags: [
        "Oh My ZSH",
        "Powerlevel 9k / 10k",
        "vimrc + themes",
        "iTerm2",
        "brogrammer theme",
      ],
    },
    {
      title: isKo ? "개발 툴체인 & CLI 유틸리티" : "Developer Toolchains & CLI Utilities",
      desc: isKo
        ? "신속한 파일 탐색 및 시스템 모니터링 필수 도구"
        : "High-speed navigation, search, and system monitoring",
      tags: [
        "git",
        "zoxide",
        "fzf",
        "ripgrep",
        "eza",
        "htop",
        "cloc",
        "asciinema",
        "curl / wget",
        "ssh",
      ],
    },
    {
      title: isKo ? "린터 & 빌드 도구" : "Linters & Build Engines",
      desc: isKo
        ? "코드 품질 관리 및 빌드 파이프라인"
        : "Code quality linters and build automation tools",
      tags: [
        "ESLint",
        "TSLint",
        "Pylint",
        "Flake8",
        "Scalastyle",
        "Gradle",
        "Webpack",
        "Grunt",
        "Rollup",
        "Composer",
      ],
    },
    {
      title: isKo ? "웹 & 백엔드 프레임워크" : "Frameworks Ecosystem",
      desc: isKo
        ? "주요 웹 프레임워크 및 개발 스택 연동"
        : "Standard frameworks for rapid project bootstrapping",
      tags: [
        "Gin (Go)",
        "Django / Flask",
        "Spring / Spring Boot",
        "Rails",
        "Express",
        "Laravel",
        ".NET MVC",
        "Rocket (Rust)",
      ],
    },
    {
      title: isKo ? "IDE, 개발 앱 & 브라우저" : "IDEs, Developer Apps & Browsers",
      desc: isKo
        ? "공식 GUI 도구 및 개발 전용 데스크톱 애플리케이션"
        : "Desktop applications and development browsers",
      tags: [
        "Visual Studio Code",
        "Sublime Text",
        "Docker Desktop",
        "Google Chrome",
        "Mozilla Firefox",
        "Insomnia",
        "VirtualBox",
        "KeyCastr",
      ],
    },
  ];

  const commands = [
    {
      cmd: "bun",
      action: t(
        "coffee_bun.cmd_bun_desc",
        "Launch interactive terminal interface to select and configure packages"
      ),
    },
    {
      cmd: "bun install",
      action: t(
        "coffee_bun.cmd_install_desc",
        "Install all packages declared in bundle.yml"
      ),
    },
    {
      cmd: "bun install <package>",
      action: t(
        "coffee_bun.cmd_pkg_desc",
        "Install a specific package or toolchain (e.g. `bun install golang`)"
      ),
    },
    {
      cmd: "bun freeze",
      action: t(
        "coffee_bun.cmd_freeze_desc",
        "Snapshot currently installed environment and versions into bundle.yml"
      ),
    },
    {
      cmd: "bun update",
      action: t(
        "coffee_bun.cmd_update_desc",
        "Update packages and shell themes to latest or specified versions"
      ),
    },
  ];

  return (
    <PageWrapper>
      <MainContainer>
        <BackNav>
          <Link href={`/${lang}`}>
            <RiArrowLeftLine />
            <span>{t("coffee_bun.back_to_projects", "Projects")}</span>
          </Link>
        </BackNav>

        {/* Hero Section */}
        <HeroSection>
          <BadgeRow>
            <Badge>{t("coffee_bun.badge_status", "v0.0.1 (WIP)")}</Badge>
            <Badge>{t("coffee_bun.badge_platform", "macOS")}</Badge>
            <Badge>{t("coffee_bun.badge_cmd", "CLI: bun")}</Badge>
            <Badge>{t("coffee_bun.badge_config", "Config: bundle.yml")}</Badge>
          </BadgeRow>

          <Title>{t("coffee_bun.title", "coffee-bun")}</Title>
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
              <span>{t("coffee_bun.action_install", "Get Started")}</span>
            </PrimaryButton>
            <SecondaryButton
              href="https://github.com/KennethanCeyer/bundle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiGithubFill />
              <span>{t("coffee_bun.action_github", "GitHub")}</span>
              <RiExternalLinkLine style={{ opacity: 0.5 }} />
            </SecondaryButton>
            <SecondaryButton href="#spec">
              <RiCodeSSlashLine />
              <span>{t("coffee_bun.action_spec", "bundle.yml Spec")}</span>
            </SecondaryButton>
          </ButtonGroup>
        </HeroSection>

        {/* Terminal Simulator */}
        <Section id="tui">
          <SectionHeader>
            <h2>{t("coffee_bun.tui_title", "CLI Workflow Preview (`bun`)")}</h2>
            <p>{t("coffee_bun.tui_subtitle")}</p>
          </SectionHeader>
          <TerminalSimulator />
        </Section>

        {/* Core Capabilities */}
        <Section id="features">
          <SectionHeader>
            <h2>{t("coffee_bun.features_title", "Core Capabilities")}</h2>
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

        {/* Declarative Manifest Preview (bundle.yml) */}
        <Section id="spec">
          <SectionHeader>
            <h2>{t("coffee_bun.spec_title", "Declarative Manifest Preview (`bundle.yml`)")}</h2>
            <p>{t("coffee_bun.spec_subtitle")}</p>
          </SectionHeader>

          <SpecCard>
            <div className="spec-header">
              <span>bundle.yml</span>
              <span>YAML Manifest</span>
            </div>
            <pre>
              <code>{sampleBundleYaml}</code>
            </pre>
          </SpecCard>
        </Section>

        {/* Supported Ecosystem & Roadmap */}
        <Section id="ecosystem">
          <SectionHeader>
            <h2>{t("coffee_bun.eco_title", "Supported Ecosystem & Roadmap")}</h2>
            <p>{t("coffee_bun.eco_subtitle")}</p>
          </SectionHeader>

          <EcosystemGrid>
            {ecosystemCategories.map((cat, idx) => (
              <EcosystemCard key={idx}>
                <h3>{cat.title}</h3>
                <div className="eco-desc">{cat.desc}</div>
                <div className="tag-container">
                  {cat.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="eco-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </EcosystemCard>
            ))}
          </EcosystemGrid>
        </Section>

        {/* CLI Command Reference (bun) */}
        <Section id="commands">
          <SectionHeader>
            <h2>
              {t("coffee_bun.commands_title", "CLI Command Reference (`bun`)")}
            </h2>
            <p>{t("coffee_bun.commands_subtitle")}</p>
          </SectionHeader>

          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "32%" }}>
                    {t("coffee_bun.th_command", "Command")}
                  </th>
                  <th>{t("coffee_bun.th_action", "Action")}</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((cmd) => (
                  <tr key={cmd.cmd}>
                    <td style={{ fontFamily: "var(--font-roboto-mono)" }}>
                      <code>{cmd.cmd}</code>
                    </td>
                    <td>{cmd.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </Section>

        {/* Installation & Getting Started */}
        <Section id="install">
          <SectionHeader>
            <h2>{t("coffee_bun.install_heading", "Installation & Getting Started")}</h2>
            <p>{t("coffee_bun.install_subheading")}</p>
          </SectionHeader>

          <InstallList>
            <InstallItem>
              <h3>
                1. {t("coffee_bun.install_method_curl", "One-Line Bootstrap")}
              </h3>
              <p>{t("coffee_bun.install_desc_curl")}</p>
              <CodeBlock rawCode={installCmd}>
                <pre style={{ margin: 0, padding: "0.85rem" }}>
                  <code>{installCmd}</code>
                </pre>
              </CodeBlock>
            </InstallItem>

            <InstallItem>
              <h3>2. {t("coffee_bun.install_method_brew", "Homebrew Tap")}</h3>
              <p>{t("coffee_bun.install_desc_brew")}</p>
              <CodeBlock rawCode="brew install KennethanCeyer/bundle/bun">
                <pre style={{ margin: 0, padding: "0.85rem" }}>
                  <code>brew install KennethanCeyer/bundle/bun</code>
                </pre>
              </CodeBlock>
            </InstallItem>

            <InstallItem>
              <h3>
                3. {t("coffee_bun.install_method_source", "Build from Source")}
              </h3>
              <p>{t("coffee_bun.install_desc_source")}</p>
              <CodeBlock
                rawCode={`git clone https://github.com/KennethanCeyer/bundle.git\ncd bundle\nmake install`}
              >
                <pre style={{ margin: 0, padding: "0.85rem" }}>
                  <code>{`git clone https://github.com/KennethanCeyer/bundle.git\ncd bundle\nmake install`}</code>
                </pre>
              </CodeBlock>
            </InstallItem>
          </InstallList>
        </Section>
      </MainContainer>
    </PageWrapper>
  );
}
