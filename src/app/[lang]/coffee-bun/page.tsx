"use client";

import CodeBlock from "@/components/CodeBlock";
import CopyButton from "@/components/CopyButton";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TerminalSimulator from "@/components/TerminalSimulator";
import { getCoffeeBunReadme } from "@/data/coffeeBunReadme";
import styled from "@emotion/styled";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
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
    font-size: 1.1rem;
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

const DocsCard = styled.div`
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 3rem 3.5rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.75rem 1.25rem;
  }
`;

export default function CoffeeBunPage() {
  const { t } = useTranslation();
  const params = useParams();
  const urlLang = typeof params?.lang === "string" ? params.lang : "en";
  const lang = urlLang.startsWith("ko") ? "ko" : "en";

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
      category: t("coffee_bun.packages_cat_shell", "Shell & Theme"),
      items: [
        {
          name: "Oh My Zsh",
          desc: t("coffee_bun.pkg_omz_desc", "Zsh community framework"),
        },
        {
          name: "Powerlevel10k",
          desc: t("coffee_bun.pkg_p10k_desc", "Fast, flexible prompt theme"),
        },
        {
          name: "zsh-autosuggestions",
          desc: t(
            "coffee_bun.pkg_autosuggest_desc",
            "Fish-style command autocompletion"
          ),
        },
        {
          name: "zsh-syntax-highlighting",
          desc: t(
            "coffee_bun.pkg_highlight_desc",
            "Realtime terminal syntax highlighting"
          ),
        },
      ],
    },
    {
      category: t("coffee_bun.packages_cat_runtimes", "Dev Runtimes"),
      items: [
        {
          name: "Go (Golang)",
          desc: t("coffee_bun.pkg_go_desc", "1.22+ runtime engine"),
        },
        {
          name: "Node.js",
          desc: t(
            "coffee_bun.pkg_node_desc",
            "LTS JavaScript runtime bundled with npm"
          ),
        },
        {
          name: "Python 3",
          desc: t(
            "coffee_bun.pkg_python_desc",
            "Python 3 interpreter bundled with pip"
          ),
        },
      ],
    },
    {
      category: t("coffee_bun.packages_cat_cli", "Modern CLI Tools"),
      items: [
        {
          name: "zoxide",
          desc: t("coffee_bun.pkg_zoxide_desc", "Frecency-based cd alternative"),
        },
        {
          name: "fzf",
          desc: t("coffee_bun.pkg_fzf_desc", "Fuzzy finder utility"),
        },
        {
          name: "ripgrep",
          desc: t(
            "coffee_bun.pkg_ripgrep_desc",
            "High-performance grep replacement"
          ),
        },
        {
          name: "eza",
          desc: t(
            "coffee_bun.pkg_eza_desc",
            "Modern ls replacement with colors"
          ),
        },
        {
          name: "htop",
          desc: t("coffee_bun.pkg_htop_desc", "Interactive process viewer"),
        },
        {
          name: "git",
          desc: t("coffee_bun.pkg_git_desc", "Version control engine"),
        },
      ],
    },
    {
      category: t("coffee_bun.packages_cat_apps", "Applications"),
      items: [
        {
          name: "Visual Studio Code",
          desc: t(
            "coffee_bun.pkg_vscode_desc",
            "Code editor with automated PATH linking"
          ),
        },
        {
          name: "Google Chrome",
          desc: t("coffee_bun.pkg_chrome_desc", "Web browser"),
        },
      ],
    },
  ];

  const commands = [
    {
      cmd: "bun",
      action: t(
        "coffee_bun.cmd_bun_desc",
        "Launch interactive terminal interface (TUI) with ≤ 5 presets"
      ),
    },
    {
      cmd: "bun check",
      action: t(
        "coffee_bun.cmd_check_desc",
        "Inspect system environment and report missing tools"
      ),
    },
    {
      cmd: "bun install all",
      action: t(
        "coffee_bun.cmd_install_desc",
        "Non-interactive batch provisioning for all missing packages"
      ),
    },
    {
      cmd: "bun doctor",
      action: t(
        "coffee_bun.cmd_doctor_desc",
        "Verify environment diagnostics, ~/.zshrc hooks, and CLI links"
      ),
    },
    {
      cmd: "bun update",
      action: t(
        "coffee_bun.cmd_update_desc",
        "Upgrade formulae, casks, and pull fresh Oh My Zsh themes"
      ),
    },
  ];

  const readmeContent = getCoffeeBunReadme(lang);

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
            <Badge>{t("coffee_bun.badge_go", "Go 1.22+")}</Badge>
            <Badge>{t("coffee_bun.badge_macos", "macOS")}</Badge>
            <Badge>{t("coffee_bun.badge_license", "MIT License")}</Badge>
            <Badge>{t("coffee_bun.badge_cmd", "Command: bun")}</Badge>
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
              <span>{t("coffee_bun.action_install", "Install")}</span>
            </PrimaryButton>
            <SecondaryButton
              href="https://github.com/KennethanCeyer/coffee-bun"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiGithubFill />
              <span>{t("coffee_bun.action_github", "GitHub")}</span>
              <RiExternalLinkLine style={{ opacity: 0.5 }} />
            </SecondaryButton>
            <SecondaryButton href="#docs">
              <RiFileTextLine />
              <span>{t("coffee_bun.action_docs", "Documentation")}</span>
            </SecondaryButton>
          </ButtonGroup>
        </HeroSection>

        {/* Terminal Simulator */}
        <Section id="tui">
          <SectionHeader>
            <h2>
              {t("coffee_bun.tui_preview_title", "Terminal Interface Preview")}
            </h2>
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
            <h2>{t("coffee_bun.install_heading", "Installation")}</h2>
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
              <CodeBlock rawCode="brew install KennethanCeyer/coffee-bun/bun">
                <pre style={{ margin: 0, padding: "0.85rem" }}>
                  <code>brew install KennethanCeyer/coffee-bun/bun</code>
                </pre>
              </CodeBlock>
            </InstallItem>

            <InstallItem>
              <h3>
                3. {t("coffee_bun.install_method_source", "Build from Source")}
              </h3>
              <p>{t("coffee_bun.install_desc_source")}</p>
              <CodeBlock
                rawCode={`git clone https://github.com/KennethanCeyer/coffee-bun.git\ncd coffee-bun\nmake install`}
              >
                <pre style={{ margin: 0, padding: "0.85rem" }}>
                  <code>{`git clone https://github.com/KennethanCeyer/coffee-bun.git\ncd coffee-bun\nmake install`}</code>
                </pre>
              </CodeBlock>
            </InstallItem>
          </InstallList>
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

        {/* Documentation Section */}
        <Section id="docs">
          <SectionHeader>
            <h2>{t("coffee_bun.docs_title", "Documentation")}</h2>
            <p>{t("coffee_bun.docs_subtitle")}</p>
          </SectionHeader>

          <DocsCard>
            <MarkdownRenderer content={readmeContent} />
          </DocsCard>
        </Section>
      </MainContainer>
    </PageWrapper>
  );
}
