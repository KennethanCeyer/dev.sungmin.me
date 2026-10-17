"use client";

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
  RiPlayCircleLine,
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
  padding: 2.5rem 0 3.5rem;
  text-align: center;
  z-index: 1;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 1.75rem 0 2.5rem;
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
  font-size: 3.6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 1rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  opacity: 0.9;
  max-width: 820px;
  margin: 0 auto 1rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const Description = styled.p`
  font-size: 0.98rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.65;
  max-width: 760px;
  margin: 0 auto 2.25rem;
  line-height: 1.65;

  @media (max-width: 768px) {
    font-size: 0.92rem;
  }
`;

/* Full-width One-Line Install Command Banner */
const FullWidthInstallBanner = styled.div`
  width: 100%;
  margin: 0 auto 2.25rem;
  background-color: #06090e;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  gap: 1rem;
  box-sizing: border-box;
  text-align: left;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0.85rem 1rem;
    gap: 0.75rem;
  }

  .command-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    overflow-x: auto;
    min-width: 0;
    flex: 1;

    &::-webkit-scrollbar {
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 2px;
    }
  }

  .prompt-symbol {
    color: #58a6ff;
    font-family: var(--font-roboto-mono), monospace;
    font-weight: 700;
    user-select: none;
    font-size: 0.92rem;
  }

  .command-text {
    font-family: var(--font-roboto-mono), monospace;
    color: #f0f6fc;
    font-size: 0.88rem;
    white-space: nowrap;
    line-height: 1.5;
  }

  .copy-btn-wrapper {
    flex-shrink: 0;
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
  margin-bottom: 2.5rem;
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
    max-width: 720px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.75rem;
    h2 {
      font-size: 1.65rem;
    }
    p {
      font-size: 0.92rem;
    }
  }
`;

/* 3-Column Outcomes Grid */
const OutcomesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const OutcomeCard = styled.div`
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }

  .metric-badge {
    font-size: 0.78rem;
    font-family: var(--font-roboto-mono), monospace;
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.75rem;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
    line-height: 1.35;
  }

  p {
    font-size: 0.92rem;
    line-height: 1.7;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin: 0;
  }
`;

/* Full-width Inventory Table */
const TableWrapper = styled.div`
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
      padding: 1.1rem 1.35rem;
      border-bottom: 1px solid ${({ theme }) => theme.border};
      vertical-align: top;
    }

    th {
      font-weight: 600;
      color: ${({ theme }) => theme.text};
      background-color: var(--color-background);
      font-size: 0.84rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    td {
      color: ${({ theme }) => theme.text};
      opacity: 0.85;
      line-height: 1.6;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background-color: var(--color-border-weak);
    }
  }

  .badge-tag {
    font-family: var(--font-roboto-mono), monospace;
    font-size: 0.78rem;
    display: inline-block;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    margin: 0.2rem 0.25rem 0.2rem 0;
    background-color: var(--color-background);
  }
`;

const InstallSectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

const InstallBox = styled.div`
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
    "curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/coffee-bun/master/install.sh | bash";

  const outcomes = [
    {
      num: "01",
      title: t("coffee_bun.outcome1_title", "4 Hours → 30 Seconds"),
      desc: t(
        "coffee_bun.outcome1_desc",
        "Automate Homebrew, Nerd Fonts, iTerm2 themes, Vim runtime, VS Code CLI linking, and language compilers concurrently in under 30 seconds."
      ),
    },
    {
      num: "02",
      title: t("coffee_bun.outcome2_title", "Zero Configuration Errors"),
      desc: t(
        "coffee_bun.outcome2_desc",
        "Pre-verified configurations eliminate broken PATHs, missing iTerm2 font plists, and unlinked macOS JVM directories."
      ),
    },
    {
      num: "03",
      title: t("coffee_bun.outcome3_title", "Continuous Maintenance"),
      desc: t(
        "coffee_bun.outcome3_desc",
        "Not just for day one. Use bun doctor for ongoing environment health checks and bun update for one-stop upgrades of packages and git repos."
      ),
    },
  ];

  const inventory = [
    {
      domain: isKo ? "시스템 & 툴체인" : "System & Toolchains",
      packages: ["Xcode Command Line Tools", "Homebrew", "Git"],
      automation: isKo
        ? "Xcode CLT 비대화형 라이선스 승인, Homebrew 자동 설치, arm64 / Intel 쉘 환경변수(PATH) 자동 연동"
        : "Xcode CLT unattended bootstrap, Homebrew installer, and shellenv PATH configuration for Apple Silicon / Intel",
    },
    {
      domain: isKo ? "터미널 & 쉘" : "Terminal & Shell",
      packages: [
        "iTerm2",
        "MesloLGS NF Font",
        "Brogrammer Theme",
        "Oh My Zsh",
        "Powerlevel10k",
        "zsh-autosuggestions",
        "zsh-syntax-highlighting",
      ],
      automation: isKo
        ? "~/Library/Fonts에 MesloLGS NF 4종 설치, iTerm2 Plist에 16pt 폰트 및 고대비 Brogrammer 컬러 프리셋 주입, ~/.zshrc 프레임워크 및 플러그인 로드"
        : "Installs 4 MesloLGS NF font files to ~/Library/Fonts, injects 16pt font & Brogrammer preset to iTerm2 plist, and configures ~/.zshrc",
    },
    {
      domain: isKo ? "에디터 & 런타임" : "Editors & Vim Runtime",
      packages: [
        "Ultimate Vim Runtime (amix/vimrc)",
        "Visual Studio Code",
        "VS Code CLI (code)",
      ],
      automation: isKo
        ? "Awesome vimrc 설정 클론 및 플러그인 동기화, VS Code 설치 후 /usr/local/bin/code 실행 파일 심링크 자동 연결"
        : "Clones and syncs amix/vimrc, installs VS Code, and automatically symlinks /usr/local/bin/code into PATH",
    },
    {
      domain: isKo ? "컴파일러 & 언어" : "Compilers & Languages",
      packages: [
        "Go (Golang 1.22+)",
        "Python 3 (pip)",
        "Java (OpenJDK 21)",
        "GCC / Clang",
        "Node.js (npm)",
      ],
      automation: isKo
        ? "OpenJDK를 /Library/Java/JavaVirtualMachines에 심링크하여 macOS JVM 인식 완결, pip 및 npm 환경 동기화"
        : "Symlinks OpenJDK to /Library/Java/JavaVirtualMachines for macOS JVM compatibility, bootstraps pip & npm",
    },
    {
      domain: isKo ? "클라우드 & 데브옵스" : "Cloud & DevOps CLIs",
      packages: [
        "AWS CLI v2",
        "Google Cloud SDK (gcloud)",
        "Azure CLI (az)",
      ],
      automation: isKo
        ? "글로벌 3대 클라우드 공식 CLI 도구군 일괄 설치 및 터미널 자동완성/PATH 표준 구성"
        : "Installs official CLI suites for AWS, Google Cloud, and Azure with shell completions and PATH registration",
    },
    {
      domain: isKo ? "모던 CLI 스위트" : "Modern CLI Suite",
      packages: [
        "zoxide",
        "htop",
        "fzf",
        "ripgrep (rg)",
        "eza",
        "tree",
        "jq",
        "bat",
      ],
      automation: isKo
        ? "Rust 기반 초고속 터미널 유틸리티 일괄 설치 및 스마트 cd(zoxide), 퍼지 파인더(fzf) 단축키 연동"
        : "Installs high-performance modern CLI utilities and configures shell keybindings for zoxide jumping and fzf fuzzy searching",
    },
    {
      domain: isKo ? "데스크톱 앱 & 설정" : "Desktop Apps & Settings",
      packages: ["Google Chrome", "Default Browser Automation"],
      automation: isKo
        ? "Google Chrome 브라우저 설치 및 macOS 기본 웹 브라우저로 자동 설정"
        : "Installs Google Chrome and automatically designates Chrome as the default system browser on macOS",
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
              "Bootstrap and maintain your complete macOS MacBook workstation in 30 seconds."
            )}
          </Tagline>
          <Description>
            {t(
              "coffee_bun.description",
              "Unifies every essential developer tool, compiler, shell configuration, and desktop app into a single, concurrent Go automation workflow."
            )}
          </Description>

          {/* Full-width One-Line Install Command Box */}
          <FullWidthInstallBanner>
            <div className="command-wrapper">
              <span className="prompt-symbol">$</span>
              <code className="command-text">{installCmd}</code>
            </div>
            <div className="copy-btn-wrapper">
              <CopyButton text={installCmd} label={isKo ? "복사" : "Copy"} />
            </div>
          </FullWidthInstallBanner>

          <ActionRow>
            <ActionBtn primary href="#demo">
              <RiPlayCircleLine />
              {t("coffee_bun.action_demo", "Watch Recording")}
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

        {/* Animated Terminal Recording Section */}
        <Section id="demo">
          <SectionHeader>
            <h2>
              {t(
                "coffee_bun.tui_title",
                "Terminal Session Recording (`bun` & Subcommands)"
              )}
            </h2>
            <p>{t("coffee_bun.tui_subtitle")}</p>
          </SectionHeader>

          <TerminalSimulator />
        </Section>

        {/* What You Get: 3 Core Outcomes */}
        <Section id="outcomes">
          <SectionHeader>
            <h2>
              {t(
                "coffee_bun.outcomes_title",
                "What You Get (3 Core Outcomes)"
              )}
            </h2>
            <p>{t("coffee_bun.outcomes_subtitle")}</p>
          </SectionHeader>

          <OutcomesGrid>
            {outcomes.map((item, idx) => (
              <OutcomeCard key={idx}>
                <div className="metric-badge">OUTCOME {item.num}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </OutcomeCard>
            ))}
          </OutcomesGrid>
        </Section>

        {/* Supported Workstation Stack Inventory Matrix */}
        <Section id="inventory">
          <SectionHeader>
            <h2>
              {t(
                "coffee_bun.inventory_title",
                "Supported Workstation Stack Inventory"
              )}
            </h2>
            <p>{t("coffee_bun.inventory_subtitle")}</p>
          </SectionHeader>

          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "22%" }}>
                    {t("coffee_bun.th_domain", "Domain")}
                  </th>
                  <th style={{ width: "38%" }}>
                    {t("coffee_bun.th_packages", "Installed Tools & Packages")}
                  </th>
                  <th>
                    {t("coffee_bun.th_automation", "What bun Automates")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{row.domain}</td>
                    <td>
                      {row.packages.map((pkg, pIdx) => (
                        <span key={pIdx} className="badge-tag">
                          {pkg}
                        </span>
                      ))}
                    </td>
                    <td>{row.automation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </Section>

        {/* Standard CLI Command Reference Table */}
        <Section id="commands">
          <SectionHeader>
            <h2>
              {t("coffee_bun.commands_title", "CLI Command Reference (`bun`)")}
            </h2>
            <p>{t("coffee_bun.commands_subtitle")}</p>
          </SectionHeader>

          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "28%" }}>
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
          </TableWrapper>
        </Section>

        {/* Installation & Getting Started */}
        <Section id="install">
          <SectionHeader>
            <h2>{t("coffee_bun.install_heading", "Installation & Getting Started")}</h2>
            <p>{t("coffee_bun.install_subheading")}</p>
          </SectionHeader>

          <InstallSectionBlock>
            <InstallBox>
              <h3>
                1. {t("coffee_bun.install_method_curl", "One-Line Bootstrap (Recommended)")}
              </h3>
              <p>{t("coffee_bun.install_desc_curl")}</p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">$</span>
                  <code className="command-text">{installCmd}</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton text={installCmd} label={isKo ? "복사" : "Copy"} />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>

            <InstallBox>
              <h3>2. {t("coffee_bun.install_method_brew", "Homebrew")}</h3>
              <p>{t("coffee_bun.install_desc_brew")}</p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">$</span>
                  <code className="command-text">brew install KennethanCeyer/bundle/bun</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton
                    text="brew install KennethanCeyer/bundle/bun"
                    label={isKo ? "복사" : "Copy"}
                  />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>

            <InstallBox>
              <h3>
                3. {t("coffee_bun.install_method_source", "Build from Source")}
              </h3>
              <p>{t("coffee_bun.install_desc_source")}</p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">$</span>
                  <code className="command-text">git clone https://github.com/KennethanCeyer/bundle.git &amp;&amp; cd bundle &amp;&amp; make install</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton
                    text="git clone https://github.com/KennethanCeyer/bundle.git && cd bundle && make install"
                    label={isKo ? "복사" : "Copy"}
                  />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>
          </InstallSectionBlock>
        </Section>
      </MainContainer>
    </PageWrapper>
  );
}
