"use client";

import CopyButton from "@/components/CopyButton";
import PagePreviewCard from "@/components/PagePreviewCard";
import TableOfContents, { Heading } from "@/components/TableOfContents";
import TerminalSimulator from "@/components/TerminalSimulator";
import styled from "@emotion/styled";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RiAppleFill,
  RiArrowLeftLine,
  RiBeerFill,
  RiCheckLine,
  RiCodeSSlashLine,
  RiSubtractLine,
  RiUbuntuFill,
  RiWindowsFill,
} from "react-icons/ri";

export const COFFEE_BUN_ASCII_LINES = [
  {
    icon: "      ▄▄██████▄▄         ",
    text: "▄▀▀▀ ▄▀▀▄ █▀▀▀ █▀▀▀ █▀▀▀ █▀▀▀",
  },
  {
    icon: "   ▄██▀▀▀▀▀▀▀▀▀▀██▄      ",
    text: "█    █  █ █▀▀  █▀▀  █▀▀  █▀▀ ",
  },
  {
    icon: "  ██▀ ▄▄██████▄▄ ▀██     ",
    text: "▀▄▄▄ ▀▄▄▀ ▀    ▀    ▀▄▄▄ ▀▄▄▄",
  },
  {
    icon: " ██▀ ██▀▀▀▀▀▀▀▀██ ▀██    ",
    text: "█▀▀▄ █  █ █▄ █",
  },
  {
    icon: "▄██▄▄████████████▄▄██▄   ",
    text: "█▀▀▄ █  █ █ ▀█",
  },
  {
    icon: " ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀    ",
    text: "▀▀▀   ▀▀  ▀  ▀",
  },
];

export const COFFEE_BUN_ASCII = COFFEE_BUN_ASCII_LINES.map(
  (l) => `${l.icon}${l.text}`
).join("\n");

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

const TocWrapper = styled.div`
  position: fixed;
  top: 120px;
  right: 2em;
  width: 220px;
  z-index: 10;

  @media (max-width: 1700px) {
    display: none;
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
  gap: 0.35rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  opacity: 0.85;
`;

const AsciiLogoPre = styled.pre`
  display: inline-block;
  margin: 0 auto 1.5rem;
  padding: 1.15rem 1.5rem;
  font-family: var(--font-roboto-mono), monospace;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  font-size: 0.85rem;
  line-height: 1.18;
  letter-spacing: 0;
  text-align: left;
  white-space: pre;
  font-weight: 700;
  color: #EDE0D4;
  background-color: #0B0A09;
  border: 1px solid rgba(166, 123, 91, 0.35);
  border-radius: 8px;
  overflow-x: auto;
  max-width: 100%;
  user-select: none;

  .bun-icon {
    color: #C68B59;
  }

  .bun-text {
    color: #EDE0D4;
  }

  @media (max-width: 768px) {
    font-size: 0.56rem;
    padding: 0.85rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.6rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  margin: 0 0 0.75rem;
  line-height: 1.15;
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  max-width: 720px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.98rem;
  }
`;

const OsTabSwitchRow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.38rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: var(--color-background);
`;

const OsTabBtn = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.95rem;
  font-weight: ${({ isActive }) => (isActive ? 600 : 500)};
  padding: 0.62rem 1.35rem;
  border-radius: 7px;
  cursor: pointer;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.text : "transparent"};
  color: ${({ isActive, theme }) => (isActive ? theme.body : theme.text)};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.75)};
  transition: all 0.15s ease;

  .os-icon {
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .os-icon-group {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.52rem 1rem;

    .os-icon {
      font-size: 1.08rem;
    }
  }
`;

/* Full-width One-Line Install Command Banner (Theme-aware monotone) */
const FullWidthInstallBanner = styled.div`
  width: 100%;
  margin: 0 auto 2.25rem;
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  gap: 1rem;
  box-sizing: border-box;
  text-align: left;
  transition: border-color 0.2s ease, background-color 0.25s ease;

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
      background: var(--color-border);
      border-radius: 2px;
    }
  }

  .prompt-symbol {
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
    font-family: var(--font-roboto-mono), monospace;
    font-weight: 700;
    user-select: none;
    font-size: 0.92rem;
  }

  .command-text {
    font-family: var(--font-roboto-mono), monospace;
    color: var(--code-block-fg);
    background: transparent;
    padding: 0;
    font-size: 0.88rem;
    white-space: nowrap;
    line-height: 1.5;
  }

  .copy-btn-wrapper {
    flex-shrink: 0;
  }
`;

const PreviewCardWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
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
  margin-bottom: 1.75rem;
  text-align: left;

  h2 {
    font-size: 1.65rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;
    h2 {
      font-size: 1.4rem;
    }
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.text};
  }

  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.55rem;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.88rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin: 0;
  }
`;

/* Merged-Row Matrix Table */
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.88rem;

    &.matrix-table {
      table-layout: fixed;
      min-width: 820px;
    }

    th,
    td {
      padding: 0.75rem 1.1rem;
      border-bottom: 1px solid ${({ theme }) => theme.border};
      vertical-align: middle;
    }

    th {
      font-weight: 600;
      color: ${({ theme }) => theme.text};
      background-color: var(--color-background);
      font-size: 0.8rem;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }

    td {
      color: ${({ theme }) => theme.text};
      line-height: 1.5;
    }

    tr:last-child td {
      border-bottom: none;
    }

    tbody tr:hover td:not(.section-cell) {
      background-color: var(--color-border-weak);
    }

    td.section-cell {
      font-weight: 600;
      background-color: var(--color-background);
      border-right: 1px solid ${({ theme }) => theme.border};
      vertical-align: top;
      padding-top: 0.95rem;
      white-space: nowrap;
    }

    td.pkg-cell {
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    td.target-cell {
      font-family: var(--font-roboto-mono), monospace;
      font-size: 0.8rem;
      opacity: 0.65;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    th.check-col,
    td.check-cell {
      text-align: center;
      width: 10.5%;
      padding-left: 0.35rem;
      padding-right: 0.35rem;
      border-left: 1px solid var(--color-border-weak);
    }
  }
`;

const CheckIconWrapper = styled.span<{ active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.text};
  opacity: ${({ active }) => (active ? 0.95 : 0.25)};
`;

const InstallSectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InstallBox = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: transparent;

  .box-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 0.4rem;
  }

  h3 {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.05rem;
    font-weight: 600;
    margin: 0;
    color: ${({ theme }) => theme.text};
    border: none;
    padding: 0;

    .os-title-icon {
      font-size: 1.18rem;
      flex-shrink: 0;
      opacity: 0.9;
    }
  }

  .os-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-family: var(--font-roboto-mono), monospace;
    font-size: 0.78rem;
    padding: 0.22rem 0.65rem;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }

  p {
    font-size: 0.88rem;
    color: ${({ theme }) => theme.text};
    opacity: 0.7;
    margin: 0 0 0.9rem;
    line-height: 1.55;
  }
`;

interface MatrixToolItem {
  name: string;
  target: string;
  install: boolean;
  config: boolean;
  doctor: boolean;
  update: boolean;
}

interface MatrixSectionGroup {
  section: string;
  items: MatrixToolItem[];
}

const renderInlineCode = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      return <code key={idx}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

export default function CoffeeBunDetailPage() {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const { t, i18n } = useTranslation();
  const isKo = i18n.language.startsWith("ko") || lang === "ko";
  const [heroOsTab, setHeroOsTab] = useState<"unix" | "windows">("unix");

  const repoUrl = "https://github.com/KennethanCeyer/bundle";
  const unixInstallCmd =
    "curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/coffee-bun/main/install.sh | bash";
  const winInstallCmd =
    "irm https://raw.githubusercontent.com/KennethanCeyer/coffee-bun/main/install.ps1 | iex";
  const brewInstallCmd = "brew install KennethanCeyer/coffee-bun/coffee-bun";
  const sourceInstallCmd =
    "git clone https://github.com/KennethanCeyer/coffee-bun.git && cd coffee-bun && make install";

  const activeHeroCmd = heroOsTab === "unix" ? unixInstallCmd : winInstallCmd;
  const activeHeroPrompt = heroOsTab === "unix" ? "$" : "PS>";

  const tocHeadings: Heading[] = useMemo(
    () => [
      {
        level: 2,
        text: t("coffee_bun.tui_title", "CLI & TUI Simulation"),
        slug: "demo-heading",
      },
      {
        level: 2,
        text: t(
          "coffee_bun.inventory_title",
          "Supported Packages & Feature Matrix"
        ),
        slug: "inventory-heading",
      },
      {
        level: 2,
        text: t("coffee_bun.features_title", "Architecture & Implementation"),
        slug: "features-heading",
      },
      {
        level: 2,
        text: t("coffee_bun.commands_title", "CLI Command Reference"),
        slug: "commands-heading",
      },
      {
        level: 2,
        text: t("coffee_bun.install_heading", "Installation"),
        slug: "install-heading",
      },
      {
        level: 3,
        text: "macOS (Bootstrap)",
        slug: "install-macos-script",
      },
      {
        level: 3,
        text: "macOS (Homebrew)",
        slug: "install-macos-brew",
      },
      {
        level: 3,
        text: "Linux (apt / dnf / apk)",
        slug: "install-linux-script",
      },
      {
        level: 3,
        text: "Windows (PowerShell)",
        slug: "install-windows-ps",
      },
      {
        level: 3,
        text: isKo ? "소스 빌드" : "Build from Source",
        slug: "install-source",
      },
    ],
    [t, isKo]
  );

  const features = [
    {
      title: t("coffee_bun.f1_title", "Foldable Tree TUI"),
      desc: t("coffee_bun.f1_desc"),
    },
    {
      title: t("coffee_bun.f2_title", "Concurrent Workers & Stream"),
      desc: t("coffee_bun.f2_desc"),
    },
    {
      title: t("coffee_bun.f3_title", "Prerequisite & Sudo Polling"),
      desc: t("coffee_bun.f3_desc"),
    },
    {
      title: t("coffee_bun.f4_title", "Diagnostics (`bun doctor`)"),
      desc: t("coffee_bun.f4_desc"),
    },
    {
      title: t("coffee_bun.f5_title", "Package Sync (`bun update`)"),
      desc: t("coffee_bun.f5_desc"),
    },
    {
      title: t("coffee_bun.f6_title", "Headless CLI Execution"),
      desc: t("coffee_bun.f6_desc"),
    },
  ];

  const matrixGroups: MatrixSectionGroup[] = [
    {
      section: isKo ? "시스템 & 툴체인" : "System & Toolchains",
      items: [
        {
          name: "Xcode Command Line Tools",
          target: "xcode-select --install (macOS)",
          install: true,
          config: true,
          doctor: true,
          update: false,
        },
        {
          name: "Homebrew",
          target: "brew (macOS / Linuxbrew)",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Git",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
      ],
    },
    {
      section: isKo ? "터미널 & 쉘" : "Terminal & Shell",
      items: [
        {
          name: "iTerm2",
          target: "brew --cask (macOS)",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "MesloLGS NF Font",
          target: "User Fonts (macOS / Linux / Win)",
          install: true,
          config: true,
          doctor: true,
          update: false,
        },
        {
          name: "Brogrammer Theme",
          target: "iTerm2 Plist Preset (macOS)",
          install: true,
          config: true,
          doctor: true,
          update: false,
        },
        {
          name: "Oh My Zsh",
          target: "~/.oh-my-zsh (macOS / Linux)",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Powerlevel10k",
          target: "custom/themes/powerlevel10k (git)",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "zsh-autosuggestions",
          target: "custom/plugins (git)",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "zsh-syntax-highlighting",
          target: "custom/plugins (git)",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
      ],
    },
    {
      section: isKo ? "에디터 & Vim" : "Editors & Vim",
      items: [
        {
          name: "Ultimate Vim Runtime",
          target: "~/.vim_runtime (amix/vimrc)",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Visual Studio Code",
          target: "brew --cask / apt / winget / choco",
          install: true,
          config: false,
          doctor: true,
          update: true,
        },
        {
          name: "VS Code CLI (code)",
          target: "PATH symlink (macOS / Linux / Win)",
          install: true,
          config: true,
          doctor: true,
          update: false,
        },
      ],
    },
    {
      section: isKo ? "컴파일러 & 언어" : "Languages & Compilers",
      items: [
        {
          name: "Go",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Python 3 (pip)",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Java (OpenJDK 21)",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "GCC / Clang",
          target: "brew / build-essential / mingw",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Node.js (npm)",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
      ],
    },
    {
      section: isKo ? "클라우드 CLI" : "Cloud CLIs",
      items: [
        {
          name: "AWS CLI v2",
          target: "brew / apt / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Google Cloud SDK (gcloud)",
          target: "brew --cask / apt / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "Azure CLI (az)",
          target: "brew / apt / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
      ],
    },
    {
      section: isKo ? "모던 CLI 유틸리티" : "Modern CLI Utilities",
      items: [
        {
          name: "zoxide",
          target: "brew / apt / winget + shell init",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "fzf",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "ripgrep (rg)",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "bat",
          target: "brew / apt (batcat) / winget",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "eza",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
        {
          name: "htop",
          target: "brew / apt / dnf / apk",
          install: true,
          config: false,
          doctor: true,
          update: true,
        },
        {
          name: "jq",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: false,
          doctor: true,
          update: true,
        },
        {
          name: "tree",
          target: "brew / apt / dnf / winget / choco",
          install: true,
          config: false,
          doctor: true,
          update: true,
        },
      ],
    },
    {
      section: isKo ? "데스크톱 앱" : "Desktop Apps",
      items: [
        {
          name: "Google Chrome",
          target: "brew --cask / winget / choco",
          install: true,
          config: true,
          doctor: true,
          update: true,
        },
      ],
    },
  ];

  const commands = [
    {
      cmd: "bun",
      action: t(
        "coffee_bun.cmd_bun_desc",
        "Launch the interactive Tree TUI to select and install packages by category"
      ),
    },
    {
      cmd: "bun check",
      action: t(
        "coffee_bun.cmd_check_desc",
        "List all managed packages with their detected version and installation status"
      ),
    },
    {
      cmd: "bun install all",
      action: t(
        "coffee_bun.cmd_install_all_desc",
        "Install and configure all missing packages non-interactively"
      ),
    },
    {
      cmd: "bun doctor",
      action: t(
        "coffee_bun.cmd_doctor_desc",
        "Verify PATH entries, native package managers, shell hooks, font files, and binary symlinks"
      ),
    },
    {
      cmd: "bun update",
      action: t(
        "coffee_bun.cmd_update_desc",
        "Upgrade installed packages and pull latest commits for managed Git repositories"
      ),
    },
  ];

  const renderCheckCell = (supported: boolean) => (
    <td className="check-cell">
      <CheckIconWrapper
        active={supported}
        aria-label={supported ? "Supported" : "Not applicable"}
      >
        {supported ? <RiCheckLine /> : <RiSubtractLine />}
      </CheckIconWrapper>
    </td>
  );

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
            <Badge>
              <RiAppleFill />
              <RiUbuntuFill />
              <RiWindowsFill />
              {t("coffee_bun.badge_platform", "macOS · Linux · Windows")}
            </Badge>
            <Badge>{t("coffee_bun.badge_lang", "Go 1.24+")}</Badge>
            <Badge>{t("coffee_bun.badge_cmd", "CLI: bun")}</Badge>
            <Badge>{t("coffee_bun.badge_license", "MIT License")}</Badge>
          </BadgeRow>

          <AsciiLogoPre aria-label="Coffee Bun ASCII Logo">
            {COFFEE_BUN_ASCII_LINES.map((line, idx) => (
              <div key={idx}>
                <span className="bun-icon">{line.icon}</span>
                <span className="bun-text">{line.text}</span>
              </div>
            ))}
          </AsciiLogoPre>

          <Title>{t("coffee_bun.title", "coffee-bun")}</Title>
          <Tagline>
            {t(
              "coffee_bun.tagline",
              "Cross-platform workstation setup and maintenance CLI written in Go (macOS, Linux, Windows)."
            )}
          </Tagline>

          {/* OS Tab Switcher for Quick One-Line Install */}
          <OsTabSwitchRow>
            <OsTabBtn
              type="button"
              isActive={heroOsTab === "unix"}
              onClick={() => setHeroOsTab("unix")}
            >
              <span className="os-icon-group">
                <RiAppleFill className="os-icon" />
                <RiUbuntuFill className="os-icon" />
              </span>
              <span>{t("coffee_bun.install_tab_unix", "macOS / Linux")}</span>
            </OsTabBtn>
            <OsTabBtn
              type="button"
              isActive={heroOsTab === "windows"}
              onClick={() => setHeroOsTab("windows")}
            >
              <RiWindowsFill className="os-icon" />
              <span>
                {t("coffee_bun.install_tab_win", "Windows (PowerShell)")}
              </span>
            </OsTabBtn>
          </OsTabSwitchRow>

          {/* Full-width One-Line Install Command Box */}
          <FullWidthInstallBanner>
            <div className="command-wrapper">
              <span className="prompt-symbol">{activeHeroPrompt}</span>
              <code className="command-text">{activeHeroCmd}</code>
            </div>
            <div className="copy-btn-wrapper">
              <CopyButton
                text={activeHeroCmd}
                label={isKo ? "복사" : "Copy"}
              />
            </div>
          </FullWidthInstallBanner>

          <PreviewCardWrapper>
            <PagePreviewCard
              data={{
                title: "KennethanCeyer/bundle (coffee-bun)",
                description:
                  "Automated cross-platform workstation setup and maintenance CLI written in Go (macOS, Linux, Windows).",
                url: repoUrl,
                image: "https://avatars.githubusercontent.com/u/7090315?v=4",
                type: "github",
              }}
            />
          </PreviewCardWrapper>
        </HeroSection>

        {/* Interactive CLI & Subcommand Simulation Section */}
        <Section id="demo">
          <SectionHeader>
            <h2 id="demo-heading">
              {renderInlineCode(
                t("coffee_bun.tui_title", "CLI & TUI Simulation")
              )}
            </h2>
          </SectionHeader>

          <TerminalSimulator />
        </Section>

        {/* Supported Packages & Feature Matrix (Merged Rows + Remix Icon Checks) */}
        <Section id="inventory">
          <SectionHeader>
            <h2 id="inventory-heading">
              {t(
                "coffee_bun.inventory_title",
                "Supported Packages & Feature Matrix"
              )}
            </h2>
          </SectionHeader>

          <TableWrapper>
            <table className="matrix-table">
              <colgroup>
                <col style={{ width: "16%" }} />
                <col style={{ width: "21%" }} />
                <col style={{ width: "21%" }} />
                <col style={{ width: "10.5%" }} />
                <col style={{ width: "10.5%" }} />
                <col style={{ width: "10.5%" }} />
                <col style={{ width: "10.5%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>{t("coffee_bun.th_section", "Section")}</th>
                  <th>{t("coffee_bun.th_package", "Package / Tool")}</th>
                  <th>{t("coffee_bun.th_target", "Source / Target")}</th>
                  <th className="check-col">
                    {t("coffee_bun.th_install", "Install")}
                  </th>
                  <th className="check-col">
                    {t("coffee_bun.th_config", "Config / PATH")}
                  </th>
                  <th className="check-col">
                    {t("coffee_bun.th_doctor", "Check / Doctor")}
                  </th>
                  <th className="check-col">
                    {t("coffee_bun.th_update", "Update")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {matrixGroups.map((group) =>
                  group.items.map((item, itemIdx) => (
                    <tr key={`${group.section}-${item.name}`}>
                      {itemIdx === 0 && (
                        <td
                          className="section-cell"
                          rowSpan={group.items.length}
                        >
                          {group.section}
                        </td>
                      )}
                      <td className="pkg-cell">{item.name}</td>
                      <td className="target-cell">{item.target}</td>
                      {renderCheckCell(item.install)}
                      {renderCheckCell(item.config)}
                      {renderCheckCell(item.doctor)}
                      {renderCheckCell(item.update)}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableWrapper>
        </Section>

        {/* Architecture & Implementation */}
        <Section id="features">
          <SectionHeader>
            <h2 id="features-heading">
              {t("coffee_bun.features_title", "Architecture & Implementation")}
            </h2>
          </SectionHeader>

          <FeaturesGrid>
            {features.map((feat, idx) => (
              <FeatureCard key={idx}>
                <h3>{renderInlineCode(feat.title)}</h3>
                <p>{renderInlineCode(feat.desc)}</p>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Section>

        {/* CLI Command Reference Table */}
        <Section id="commands">
          <SectionHeader>
            <h2 id="commands-heading">
              {t("coffee_bun.commands_title", "CLI Command Reference")}
            </h2>
          </SectionHeader>

          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "26%" }}>
                    {t("coffee_bun.th_command", "Command")}
                  </th>
                  <th>{t("coffee_bun.th_action", "Description")}</th>
                </tr>
              </thead>
              <tbody>
                {commands.map((cmd) => (
                  <tr key={cmd.cmd}>
                    <td style={{ fontFamily: "var(--font-roboto-mono)" }}>
                      <code>{cmd.cmd}</code>
                    </td>
                    <td>{renderInlineCode(cmd.action)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </Section>

        {/* Granular Multi-Platform Installation Guide */}
        <Section id="install">
          <SectionHeader>
            <h2 id="install-heading">
              {t("coffee_bun.install_heading", "Installation")}
            </h2>
          </SectionHeader>

          <InstallSectionBlock>
            {/* 1. macOS Bootstrap */}
            <InstallBox>
              <div className="box-header">
                <h3 id="install-macos-script">
                  <RiAppleFill className="os-title-icon" />
                  <span>
                    {t(
                      "coffee_bun.install_method_macos_script",
                      "1. macOS — Bootstrap Script"
                    )}
                  </span>
                </h3>
                <span className="os-badge">
                  <RiAppleFill /> macOS (zsh / bash)
                </span>
              </div>
              <p>
                {renderInlineCode(t("coffee_bun.install_desc_macos_script"))}
              </p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">$</span>
                  <code className="command-text">{unixInstallCmd}</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton
                    text={unixInstallCmd}
                    label={isKo ? "복사" : "Copy"}
                  />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>

            {/* 2. macOS Homebrew */}
            <InstallBox>
              <div className="box-header">
                <h3 id="install-macos-brew">
                  <RiBeerFill className="os-title-icon" />
                  <span>
                    {t(
                      "coffee_bun.install_method_brew",
                      "2. macOS — Homebrew Tap"
                    )}
                  </span>
                </h3>
                <span className="os-badge">
                  <RiAppleFill /> <RiUbuntuFill /> Homebrew / Linuxbrew
                </span>
              </div>
              <p>{renderInlineCode(t("coffee_bun.install_desc_brew"))}</p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">$</span>
                  <code className="command-text">{brewInstallCmd}</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton
                    text={brewInstallCmd}
                    label={isKo ? "복사" : "Copy"}
                  />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>

            {/* 3. Linux Bootstrap */}
            <InstallBox>
              <div className="box-header">
                <h3 id="install-linux-script">
                  <RiUbuntuFill className="os-title-icon" />
                  <span>
                    {t(
                      "coffee_bun.install_method_linux_script",
                      "3. Linux — Bootstrap Script (apt / dnf / apk)"
                    )}
                  </span>
                </h3>
                <span className="os-badge">
                  <RiUbuntuFill /> Ubuntu · Debian · Fedora · Alpine
                </span>
              </div>
              <p>
                {renderInlineCode(t("coffee_bun.install_desc_linux_script"))}
              </p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">$</span>
                  <code className="command-text">{unixInstallCmd}</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton
                    text={unixInstallCmd}
                    label={isKo ? "복사" : "Copy"}
                  />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>

            {/* 4. Windows PowerShell */}
            <InstallBox>
              <div className="box-header">
                <h3 id="install-windows-ps">
                  <RiWindowsFill className="os-title-icon" />
                  <span>
                    {t(
                      "coffee_bun.install_method_windows_ps",
                      "4. Windows — PowerShell Bootstrap (winget / choco)"
                    )}
                  </span>
                </h3>
                <span className="os-badge">
                  <RiWindowsFill /> Windows 10/11 (PowerShell)
                </span>
              </div>
              <p>
                {renderInlineCode(t("coffee_bun.install_desc_windows_ps"))}
              </p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">PS&gt;</span>
                  <code className="command-text">{winInstallCmd}</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton
                    text={winInstallCmd}
                    label={isKo ? "복사" : "Copy"}
                  />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>

            {/* 5. Build from Source */}
            <InstallBox>
              <div className="box-header">
                <h3 id="install-source">
                  <RiCodeSSlashLine className="os-title-icon" />
                  <span>
                    {t(
                      "coffee_bun.install_method_source",
                      "5. Build from Source (All Platforms)"
                    )}
                  </span>
                </h3>
                <span className="os-badge">
                  <RiCodeSSlashLine /> Go 1.24+ &amp; Make
                </span>
              </div>
              <p>{renderInlineCode(t("coffee_bun.install_desc_source"))}</p>
              <FullWidthInstallBanner style={{ margin: 0 }}>
                <div className="command-wrapper">
                  <span className="prompt-symbol">$</span>
                  <code className="command-text">{sourceInstallCmd}</code>
                </div>
                <div className="copy-btn-wrapper">
                  <CopyButton
                    text={sourceInstallCmd}
                    label={isKo ? "복사" : "Copy"}
                  />
                </div>
              </FullWidthInstallBanner>
            </InstallBox>
          </InstallSectionBlock>
        </Section>

        <div id="post-footer-container" />
      </MainContainer>

      <TocWrapper>
        <TableOfContents headings={tocHeadings} />
      </TocWrapper>
    </PageWrapper>
  );
}
