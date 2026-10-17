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
  RiCheckLine,
  RiDownload2Line,
  RiExternalLinkLine,
  RiGithubFill,
  RiTerminalBoxLine,
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
  padding: 3rem 0 3.5rem;
  text-align: center;
  z-index: 1;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 2rem 0 2.5rem;
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
    font-size: 2.5rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  opacity: 0.85;
  max-width: 760px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const Description = styled.p`
  font-size: 0.98rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.65;
  max-width: 720px;
  margin: 0 auto 2.25rem;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 0.92rem;
  }
`;

const StoryCard = styled.div`
  max-width: 860px;
  margin: 0 auto 2.5rem;
  padding: 1.75rem 2rem;
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  .story-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
    margin-bottom: 0.75rem;
  }

  .story-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 0 0 0.85rem;
    line-height: 1.4;
  }

  .story-body {
    font-size: 0.92rem;
    line-height: 1.75;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    strong {
      color: ${({ theme }) => theme.text};
      font-weight: 600;
    }
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled.a<{ primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.6rem;
  border-radius: 6px;
  font-size: 0.92rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;

  ${({ primary, theme }) =>
    primary
      ? `
    background-color: ${theme.text};
    color: ${theme.body};
    border: 1px solid ${theme.text};
    &:hover {
      opacity: 0.88;
    }
  `
      : `
    background-color: transparent;
    color: ${theme.text};
    border: 1px solid ${theme.border};
    &:hover {
      background-color: ${theme.border};
    }
  `}
`;

const Section = styled.section`
  padding: 4.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  &:last-of-type {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: 2.75rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 0.65rem;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.65;
    margin: 0 auto;
    max-width: 680px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    h2 {
      font-size: 1.65rem;
    }
    p {
      font-size: 0.92rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 1.75rem;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 0.65rem;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
    line-height: 1.35;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin: 0;
  }
`;

const StackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StackCard = styled.div`
  padding: 1.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
  }

  .stack-desc {
    font-size: 0.88rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin-bottom: 1.25rem;
    line-height: 1.55;
  }

  .tag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  .stack-tag {
    font-size: 0.75rem;
    font-family: var(--font-roboto-mono), monospace;
    padding: 0.2rem 0.55rem;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
    opacity: 0.85;
    background-color: var(--color-background);
  }
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9rem;

    th,
    td {
      padding: 1rem 1.25rem;
      border-bottom: 1px solid ${({ theme }) => theme.border};
    }

    th {
      font-weight: 600;
      color: ${({ theme }) => theme.text};
      background-color: var(--color-background);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    td {
      color: ${({ theme }) => theme.text};
      opacity: 0.85;
      line-height: 1.55;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background-color: var(--color-border-weak);
    }
  }
`;

const InstallList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const InstallItem = styled.div`
  padding: 1.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;

  h3 {
    font-size: 1.15rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin: 0 0 1rem;
    line-height: 1.6;
  }
`;

export default function CoffeeBunDetailPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const { t, i18n } = useTranslation();
  const isKo = i18n.language.startsWith("ko") || lang === "ko";

  const repoUrl = "https://github.com/KennethanCeyer/bundle";
  const installCmd =
    "curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/bundle/main/install.sh | bash";

  const features = [
    {
      title: t(
        "coffee_bun.f1_title",
        "Interactive Tree UI & Focusable Action Bar"
      ),
      desc: t(
        "coffee_bun.f1_desc",
        "Organize packages into foldable categories. Cycle focus between the tree and action buttons with Tab/Arrow keys without terminal traps."
      ),
    },
    {
      title: t(
        "coffee_bun.f2_title",
        "Goroutine Concurrency & Live Stream Output"
      ),
      desc: t(
        "coffee_bun.f2_desc",
        "Independent git clones, font downloads, and Homebrew formulae execute concurrently with real-time faint gray stdout streaming."
      ),
    },
    {
      title: t(
        "coffee_bun.f3_title",
        "Sudo & Prerequisite Blocker Watcher"
      ),
      desc: t(
        "coffee_bun.f3_desc",
        "Displays copyable snippets for root permissions and polls every 2-3s in background to resume automatically without restarting bun."
      ),
    },
    {
      title: t("coffee_bun.f4_title", "System Diagnostics (`bun doctor`)"),
      desc: t(
        "coffee_bun.f4_desc",
        "Thoroughly validates macOS version, Homebrew PATH, .zshrc theme, zoxide shell hooks, and VS Code CLI symlink integrity."
      ),
    },
    {
      title: t("coffee_bun.f5_title", "One-Stop Upgrader (`bun update`)"),
      desc: t(
        "coffee_bun.f5_desc",
        "Simultaneously upgrades Homebrew formulae and casks while pulling latest commits for Oh My Zsh, Powerlevel10k, and Vim runtime."
      ),
    },
    {
      title: t(
        "coffee_bun.f6_title",
        "Automated Non-Interactive Provisioning"
      ),
      desc: t(
        "coffee_bun.f6_desc",
        "bun install all or domain flags allow headless provisioning inside dotfiles and setup automation scripts."
      ),
    },
  ];

  const workstationCategories = [
    {
      title: isKo
        ? "터미널 & 쉘 (Terminal & Shell)"
        : "Terminal & Shell Ecosystem",
      desc: isKo
        ? "iTerm2 터미널 에뮬레이터, MesloLGS NF 아이콘 폰트, 고대비 Brogrammer 컬러 테마, Oh My Zsh 프레임워크 및 Powerlevel10k 테마, 자동완성/구문강조 플러그인을 자동으로 구성합니다."
        : "Automates iTerm2, MesloLGS NF font installation (~/Library/Fonts), Brogrammer plist configuration, Oh My Zsh, Powerlevel10k, and autosuggestion plugins.",
      tags: [
        "iTerm2",
        "MesloLGS NF Font",
        "Brogrammer Theme",
        "Oh My Zsh",
        "Powerlevel10k",
        "zsh-autosuggestions",
        "zsh-syntax-highlighting",
      ],
    },
    {
      title: isKo
        ? "에디터 & 런타임 (Editors & Vim)"
        : "Editors & Vim Runtime",
      desc: isKo
        ? "궁극의 Vim 설정(amix/vimrc), Visual Studio Code 에디터 설치, 그리고 터미널 어디서든 즉시 열 수 있도록 code CLI 명령어를 /usr/local/bin에 자동 심링크 연결합니다."
        : "Ultimate Vim Runtime (amix/vimrc), Visual Studio Code, and automatic symlinking of the code CLI into PATH (/usr/local/bin/code).",
      tags: [
        "Ultimate Vim Runtime",
        "amix/vimrc",
        "Visual Studio Code",
        "VS Code CLI (code)",
        "PATH Auto-Linking",
      ],
    },
    {
      title: isKo
        ? "컴파일러 & 언어 (Compilers & Languages)"
        : "Compilers & Language Runtimes",
      desc: isKo
        ? "Go 언어 런타임, Python 3 및 pip, macOS JVM 환경 연동이 완료된 OpenJDK (Java), GCC/Clang 컴파일러, Node.js 및 npm을 일괄 설치합니다."
        : "Go 1.22+, Python 3 with pip, Java OpenJDK with macOS JVM linking (/Library/Java), GCC/Clang tools, and Node.js with npm.",
      tags: [
        "Go (Golang)",
        "Python 3 (pip)",
        "Java (OpenJDK)",
        "GCC / Clang",
        "Node.js (npm)",
      ],
    },
    {
      title: isKo
        ? "클라우드 & 데브옵스 (Cloud & DevOps CLIs)"
        : "Cloud & DevOps CLIs",
      desc: isKo
        ? "클라우드 인프라 관리를 위한 AWS CLI, Google Cloud SDK (gcloud), Azure CLI (az)를 누락 없이 표준 설정으로 설치합니다."
        : "Unified command-line interfaces for major clouds: AWS CLI, Google Cloud SDK (gcloud), and Azure CLI (az).",
      tags: [
        "AWS CLI",
        "Google Cloud SDK (gcloud)",
        "Azure CLI (az)",
      ],
    },
    {
      title: isKo
        ? "모던 CLI 스위트 (Modern CLI Tools)"
        : "Modern Rust & CLI Suite",
      desc: isKo
        ? "스마트한 디렉토리 이동 zoxide, 초고속 검색 ripgrep, 대화형 퍼지 파인더 fzf, 현대적 파일 목록 eza, syntax highlighter bat, htop, tree, jq를 즉시 세팅합니다."
        : "Productivity CLI utilities: zoxide (smart cd), ripgrep (rg), fzf (fuzzy finder), eza (modern ls), bat (syntax cat), htop, tree, and jq.",
      tags: [
        "zoxide",
        "ripgrep (rg)",
        "fzf",
        "eza",
        "bat",
        "htop",
        "tree",
        "jq",
      ],
    },
    {
      title: isKo
        ? "필수 앱 & 시스템 설정 (Apps & Settings)"
        : "Essential Desktop Apps & Settings",
      desc: isKo
        ? "Google Chrome 브라우저 설치 및 macOS 기본 웹 브라우저 자동 지정, 필수 개발자 데스크톱 앱을 원스톱으로 구성합니다."
        : "Installs Google Chrome and automatically configures it as the default system browser on macOS.",
      tags: [
        "Google Chrome",
        "Default Browser Automation",
        "Visual Studio Code",
      ],
    },
  ];

  const commands = [
    {
      cmd: "bun",
      action: t(
        "coffee_bun.cmd_bun_desc",
        "Launch interactive Tree TUI with foldable categories and focusable action bar"
      ),
    },
    {
      cmd: "bun check",
      action: t(
        "coffee_bun.cmd_check_desc",
        "Inspect installed packages and report current versions vs missing tools"
      ),
    },
    {
      cmd: "bun install all",
      action: t(
        "coffee_bun.cmd_install_all_desc",
        "Non-interactive parallel installation of all missing tools and configurations"
      ),
    },
    {
      cmd: "bun doctor",
      action: t(
        "coffee_bun.cmd_doctor_desc",
        "Validate environment integrity, PATH, ~/.zshrc hooks, and VS Code CLI symlink"
      ),
    },
    {
      cmd: "bun update",
      action: t(
        "coffee_bun.cmd_update_desc",
        "One-stop concurrent upgrade of Homebrew packages, casks, and git repos (OMZ, p10k, vimrc)"
      ),
    },
  ];

  return (
    <PageWrapper>
      <MainContainer>
        <BackNav>
          <Link href={`/${lang}`}>
            <RiArrowLeftLine />
            {t("coffee_bun.back_to_projects", "Developer Hub")}
          </Link>
        </BackNav>

        {/* Hero Section */}
        <HeroSection>
          <BadgeRow>
            <Badge>{t("coffee_bun.badge_platform", "macOS")}</Badge>
            <Badge>{t("coffee_bun.badge_lang", "Go 1.22+")}</Badge>
            <Badge>{t("coffee_bun.badge_cmd", "CLI: bun")}</Badge>
            <Badge>{t("coffee_bun.badge_license", "MIT License")}</Badge>
          </BadgeRow>

          <Title>{t("coffee_bun.title", "coffee-bun")}</Title>
          <Tagline>
            {t(
              "coffee_bun.tagline",
              "A friendly, automated macOS MacBook setup and maintenance tool written in Go"
            )}
          </Tagline>
          <Description>
            {t(
              "coffee_bun.description",
              "Takes every essential developer tool, compiler, shell configuration, and desktop app, and bundles them into an automated setup workflow."
            )}
          </Description>

          {/* The Story Behind the Name */}
          <StoryCard>
            <div className="story-header">
              <RiTerminalBoxLine />
              <span>{t("coffee_bun.story_badge", "The Story Behind the Name")}</span>
            </div>
            <h3 className="story-title">
              {t(
                "coffee_bun.story_title",
                "Coffee and a warm bun while your Mac sets up"
              )}
            </h3>
            <div className="story-body">
              <p>{t("coffee_bun.story_p1")}</p>
              <p>
                <strong>{t("coffee_bun.story_p2")}</strong>
              </p>
              <p>{t("coffee_bun.story_p3")}</p>
            </div>
          </StoryCard>

          <ActionRow>
            <ActionBtn primary href="#install">
              <RiDownload2Line />
              {t("coffee_bun.action_install", "Installation")}
            </ActionBtn>
            <ActionBtn
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiGithubFill />
              {t("coffee_bun.action_github", "GitHub Repository")}
              <RiExternalLinkLine size={13} style={{ opacity: 0.6 }} />
            </ActionBtn>
          </ActionRow>
        </HeroSection>

        {/* Interactive CLI Simulator */}
        <Section id="simulator">
          <SectionHeader>
            <h2>{t("coffee_bun.tui_title", "Interactive CLI Simulation (`bun`)")}</h2>
            <p>{t("coffee_bun.tui_subtitle")}</p>
          </SectionHeader>
          <TerminalSimulator />
        </Section>

        {/* Core Architecture Capabilities */}
        <Section id="features">
          <SectionHeader>
            <h2>
              {t("coffee_bun.features_title", "Core Architecture & Capabilities")}
            </h2>
            <p>{t("coffee_bun.features_subtitle")}</p>
          </SectionHeader>

          <Grid>
            {features.map((feat, idx) => (
              <FeatureCard key={idx}>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </FeatureCard>
            ))}
          </Grid>
        </Section>

        {/* Complete Workstation Stack Grid */}
        <Section id="stack">
          <SectionHeader>
            <h2>
              {t(
                "coffee_bun.eco_title",
                "Complete macOS Developer Workstation Stack"
              )}
            </h2>
            <p>{t("coffee_bun.eco_subtitle")}</p>
          </SectionHeader>

          <StackGrid>
            {workstationCategories.map((cat, idx) => (
              <StackCard key={idx}>
                <h3>{cat.title}</h3>
                <div className="stack-desc">{cat.desc}</div>
                <div className="tag-container">
                  {cat.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="stack-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </StackCard>
            ))}
          </StackGrid>
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
                  <th style={{ width: "30%" }}>
                    {t("coffee_bun.th_command", "Command")}
                  </th>
                  <th>{t("coffee_bun.th_action", "Action & Behavior")}</th>
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
                1. {t("coffee_bun.install_method_curl", "One-Line Bootstrap (Recommended)")}
              </h3>
              <p>{t("coffee_bun.install_desc_curl")}</p>
              <CodeBlock rawCode={installCmd}>
                <pre style={{ margin: 0, padding: "0.85rem" }}>
                  <code>{installCmd}</code>
                </pre>
              </CodeBlock>
            </InstallItem>

            <InstallItem>
              <h3>2. {t("coffee_bun.install_method_brew", "Homebrew")}</h3>
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
