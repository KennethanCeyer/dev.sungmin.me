"use client";

import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import {
  RiPauseLine,
  RiPlayLine,
  RiRestartLine,
  RiTerminalBoxLine,
} from "react-icons/ri";

// Exact Soft Coffee Pastel Palette from coffee-bun/internal/ui/styles.go
const PALETTE = {
  bg: "#0B0A09",
  headerBg: "#141210",
  tabBarBg: "#100E0C",
  controlBarBg: "#0E0C0A",
  primary: "#A67B5B", // Warm Café au Lait / Mocha Pastel
  secondary: "#D4A373", // Soft Caramel / Latte Pastel (CategoryHeaderStyle)
  success: "#84A98C", // Soft Matcha / Sage Pastel Green (BadgeSuccess)
  warning: "#E9C46A", // Warm Honey / Biscuit Pastel (BadgeMissing)
  danger: "#E07A5F", // Soft Terracotta / Rose Pastel (BadgeError)
  muted: "#9C8F84", // Warm Taupe / Coffee Gray (MutedStyle)
  highlight: "#E6CCB2", // Soft Vanilla / Oat Milk Cream (SelectedStyle)
  normal: "#EDE0D4", // NormalStyle & LogoTextStyle
  logoBun: "#C68B59", // LogoBunStyle
  titleFg: "#F5EBE0", // TitleStyle Foreground
  titleBg: "#4A3525", // TitleStyle Background
  btnNormalFg: "#D6CCC2",
  btnNormalBg: "#2C221E",
  btnFocusedFg: "#FFF8F0",
  btnFocusedBg: "#A67B5B",
  btnSuccessFg: "#FFF8F0",
  btnSuccessBg: "#6B9080",
  logStream: "#8A7968",
};

// Exact Braille spinner frames from coffee-bun/internal/ui/tui.go
const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

const ASCII_BUN_LINES = [
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

const TerminalWrapper = styled.div`
  width: 100%;
  margin: 1.5rem 0 2.5rem;
  font-family: var(--font-roboto-mono), monospace;
  text-align: left;
`;

const TerminalFrame = styled.div`
  background-color: ${PALETTE.bg};
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
`;

const TerminalHeader = styled.div`
  background-color: ${PALETTE.headerBg};
  padding: 0.65rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const WindowButtons = styled.div`
  display: flex;
  gap: 7px;
  span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    display: inline-block;
  }
  .close {
    background-color: #ff5f56;
  }
  .minimize {
    background-color: #ffbd2e;
  }
  .maximize {
    background-color: #27c93f;
  }
`;

const TerminalTitle = styled.div`
  color: ${PALETTE.normal};
  opacity: 0.8;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  letter-spacing: 0.02em;
`;

const SubcommandBar = styled.div`
  display: flex;
  background-color: ${PALETTE.tabBarBg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
  padding: 0 0.5rem;
`;

const SubcommandTab = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  padding: 0.7rem 1rem;
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.8rem;
  color: ${({ isActive }) => (isActive ? PALETTE.highlight : PALETTE.muted)};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? PALETTE.primary : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.15s ease;

  &:hover {
    color: ${PALETTE.normal};
    background-color: rgba(255, 255, 255, 0.03);
  }

  .badge {
    font-size: 0.68rem;
    padding: 0.1rem 0.38rem;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.06);
    color: ${PALETTE.muted};
  }
`;

const PlayerControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.25rem;
  background-color: ${PALETTE.controlBarBg};
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  color: ${PALETTE.muted};
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ControlBtn = styled.button`
  background: ${PALETTE.btnNormalBg};
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: ${PALETTE.btnNormalFg};
  padding: 0.22rem 0.65rem;
  border-radius: 4px;
  font-size: 0.74rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${PALETTE.primary};
    color: ${PALETTE.normal};
  }
`;

const PlaybackStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.74rem;
  color: ${PALETTE.muted};

  .rec-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${PALETTE.success};
    display: inline-block;
  }
  .spin-char {
    color: ${PALETTE.highlight};
    font-weight: 700;
    display: inline-block;
    min-width: 3ch;
    text-align: center;
  }
`;

const SpinnerGlyph = styled.span`
  display: inline-block;
  width: 1ch;
  text-align: center;
`;

const TerminalScreen = styled.div`
  padding: 1.35rem 1.5rem;
  background-color: ${PALETTE.bg};
  color: ${PALETTE.normal};
  font-family: var(--font-roboto-mono), monospace;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  font-size: 0.82rem;
  line-height: 1.45;
  min-height: 450px;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.74rem;
    min-height: 390px;
  }
`;

const AsciiHeaderBlock = styled.pre`
  margin: 0 0 0.5rem;
  font-family: var(--font-roboto-mono), monospace;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0, "calt" 0;
  font-size: 0.78rem;
  line-height: 1.18;
  letter-spacing: 0;
  white-space: pre;
  font-weight: 700;
  user-select: none;

  .bun-icon {
    color: ${PALETTE.logoBun};
  }
  .bun-text {
    color: ${PALETTE.normal};
  }
`;

const PromptLine = styled.div`
  color: ${PALETTE.normal};
  margin-bottom: 0.75rem;
  white-space: pre;

  .prompt-char {
    color: ${PALETTE.secondary};
    font-weight: 700;
  }
  .cmd {
    color: ${PALETTE.normal};
    font-weight: 600;
  }
`;

const DividerLine = styled.div`
  color: ${PALETTE.muted};
  white-space: pre;
  margin: 0.25rem 0;
  overflow: hidden;
`;

const StatusSummaryLine = styled.div`
  white-space: pre;
  color: ${PALETTE.normal};
  margin-bottom: 0.15rem;

  .ready {
    color: ${PALETTE.success};
    font-weight: 700;
  }
  .missing {
    color: ${PALETTE.warning};
    font-weight: 700;
  }
  .selected {
    color: ${PALETTE.highlight};
    font-weight: 700;
  }
  .error {
    color: ${PALETTE.danger};
    font-weight: 700;
  }
`;

const GroupHeaderLine = styled.div<{ isCursor?: boolean }>`
  white-space: pre;
  cursor: pointer;
  user-select: none;
  padding: 0.08rem 0;
  color: ${({ isCursor }) => (isCursor ? PALETTE.highlight : PALETTE.secondary)};
  font-weight: 700;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }

  .badge-ready {
    color: ${PALETTE.success};
    font-weight: 700;
  }
  .badge-missing {
    color: ${PALETTE.warning};
    font-weight: 700;
  }
  .sel-empty {
    color: ${PALETTE.muted};
    font-weight: 400;
  }
  .sel-some {
    color: ${PALETTE.highlight};
    font-weight: 700;
  }
  .sel-all {
    color: ${PALETTE.success};
    font-weight: 700;
  }
`;

const PackageItemLine = styled.div`
  white-space: pre;
  cursor: pointer;
  user-select: none;
  padding: 0.06rem 0;
  color: ${PALETTE.normal};

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }

  .chk-installed-sel {
    color: ${PALETTE.success};
    font-weight: 700;
  }
  .chk-installed {
    color: ${PALETTE.muted};
  }
  .chk-missing-sel {
    color: ${PALETTE.highlight};
    font-weight: 700;
  }
  .chk-missing {
    color: ${PALETTE.muted};
  }
  .ver-ok {
    color: ${PALETTE.success};
    font-weight: 700;
  }
  .ver-missing {
    color: ${PALETTE.warning};
    font-weight: 700;
  }
  .desc {
    color: ${PALETTE.muted};
  }
`;

const TUIButtonsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.35rem;
  padding: 0 0.5rem;
  white-space: pre;
`;

const TUIExitBtn = styled.button`
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.8rem;
  color: ${PALETTE.btnNormalFg};
  background-color: ${PALETTE.btnNormalBg};
  border: none;
  padding: 0.15rem 0.6rem;
  cursor: pointer;

  &:hover {
    background-color: ${PALETTE.btnFocusedBg};
    color: ${PALETTE.btnFocusedFg};
  }
`;

const TUIStartBtn = styled.button`
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${PALETTE.btnSuccessFg};
  background-color: ${PALETTE.btnSuccessBg};
  border: none;
  padding: 0.15rem 0.6rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const TUIHintRow = styled.div`
  color: ${PALETTE.muted};
  white-space: pre;
  margin-top: 0.35rem;
  font-size: 0.78rem;
`;

interface TUIItemSpec {
  id: string;
  name: string;
  installed: boolean;
  version: string;
  desc: string;
}

interface TUIGroupSpec {
  key: string;
  icon: string;
  title: string;
  items: TUIItemSpec[];
}

// Exact package groups from /Users/pignose/bundle/internal/packages/
const TUI_GROUPS: TUIGroupSpec[] = [
  {
    key: "system",
    icon: "[sys]",
    title: "System & Toolchains (Xcode Tools, Brew, Git)",
    items: [
      {
        id: "xcode-select",
        name: "Xcode Command Line Tools",
        installed: true,
        version: "2409",
        desc: "Core compilers, make, headers, and git toolchain",
      },
      {
        id: "brew",
        name: "Homebrew",
        installed: true,
        version: "4.4.1",
        desc: "The missing package manager for macOS",
      },
      {
        id: "git",
        name: "Git",
        installed: true,
        version: "2.47.0",
        desc: "Fast distributed version control system",
      },
    ],
  },
  {
    key: "terminal",
    icon: "[shell]",
    title: "Terminal & Shell (iTerm2, Fonts, OMZ, p10k)",
    items: [
      {
        id: "iterm2",
        name: "iTerm2",
        installed: true,
        version: "3.5.10",
        desc: "Terminal emulator for macOS with rich customization",
      },
      {
        id: "meslo-font",
        name: "MesloLGS NF Font",
        installed: true,
        version: "installed",
        desc: "Nerd Font with icons for Powerlevel10k prompt",
      },
      {
        id: "iterm2-font-config",
        name: "iTerm2 Font Config",
        installed: false,
        version: "missing",
        desc: "Configure iTerm2 default profile to use MesloLGS NF",
      },
      {
        id: "brogrammer-theme",
        name: "Brogrammer Theme",
        installed: true,
        version: "installed",
        desc: "Brogrammer high-contrast aesthetic color theme",
      },
      {
        id: "oh-my-zsh",
        name: "Oh My Zsh",
        installed: true,
        version: "master",
        desc: "Community-driven framework for managing zsh config",
      },
      {
        id: "powerlevel10k",
        name: "Powerlevel10k",
        installed: true,
        version: "v1.20.0",
        desc: "Fast, flexible, and visually stunning theme for Zsh",
      },
      {
        id: "zsh-autosuggestions",
        name: "Zsh Autosuggestions",
        installed: true,
        version: "v0.7.1",
        desc: "Fish-like fast autosuggestions for zsh",
      },
      {
        id: "zsh-syntax-highlighting",
        name: "Zsh Syntax Highlighting",
        installed: true,
        version: "0.8.0",
        desc: "Fish shell-like syntax highlighting for zsh",
      },
    ],
  },
  {
    key: "cloud",
    icon: "[cloud]",
    title: "Cloud & DevOps CLIs (AWS, Google Cloud, Azure)",
    items: [
      {
        id: "aws",
        name: "AWS CLI",
        installed: true,
        version: "2.22.1",
        desc: "Unified tool to manage your AWS cloud services",
      },
      {
        id: "gcloud",
        name: "Google Cloud SDK",
        installed: true,
        version: "506.0.0",
        desc: "Google Cloud CLI (gcloud) tools and libraries",
      },
      {
        id: "azure",
        name: "Azure CLI",
        installed: false,
        version: "missing",
        desc: "Microsoft Azure command-line tools (az)",
      },
    ],
  },
  {
    key: "editors",
    icon: "[editor]",
    title: "Editors & Vim Runtime",
    items: [
      {
        id: "vim-runtime",
        name: "Ultimate Vim Runtime",
        installed: false,
        version: "missing",
        desc: "The Ultimate Vim configuration (amix/vimrc)",
      },
      {
        id: "vscode",
        name: "Visual Studio Code",
        installed: true,
        version: "1.96.2",
        desc: "Code editor redefined for building modern apps",
      },
      {
        id: "code-cli",
        name: "VS Code CLI (`code`)",
        installed: true,
        version: "installed",
        desc: "Symlink `code` binary into PATH for terminal access",
      },
    ],
  },
  {
    key: "languages",
    icon: "[lang]",
    title: "Compilers & Languages (Go, Python, Java, GCC, Node)",
    items: [
      {
        id: "go",
        name: "Go",
        installed: true,
        version: "go1.23.4",
        desc: "Open source programming language for fast software",
      },
      {
        id: "python",
        name: "Python 3",
        installed: true,
        version: "3.13.1",
        desc: "Python interpreter bundled with pip",
      },
      {
        id: "java",
        name: "Java (OpenJDK)",
        installed: false,
        version: "missing",
        desc: "Java Development Kit open source reference",
      },
      {
        id: "gcc",
        name: "GCC / Clang",
        installed: true,
        version: "16.0.0",
        desc: "GNU Compiler Collection & Apple developer tools",
      },
      {
        id: "node",
        name: "Node.js",
        installed: true,
        version: "v22.12.0",
        desc: "JavaScript runtime built on Chrome's V8 engine",
      },
    ],
  },
  {
    key: "cli",
    icon: "[cli]",
    title: "Modern CLI Power Utilities",
    items: [
      {
        id: "zoxide",
        name: "Zoxide",
        installed: true,
        version: "0.9.6",
        desc: "A smarter cd command that learns your habits",
      },
      {
        id: "htop",
        name: "Htop",
        installed: true,
        version: "3.3.0",
        desc: "Interactive real-time process viewer",
      },
      {
        id: "fzf",
        name: "Fzf",
        installed: true,
        version: "0.57.0",
        desc: "General-purpose command-line fuzzy finder",
      },
      {
        id: "ripgrep",
        name: "Ripgrep",
        installed: true,
        version: "14.1.1",
        desc: "Ultra-fast line-oriented search tool (rg)",
      },
      {
        id: "eza",
        name: "Eza",
        installed: true,
        version: "0.20.14",
        desc: "Modern replacement for ls with git status",
      },
      {
        id: "tree",
        name: "Tree",
        installed: true,
        version: "2.2.1",
        desc: "Recursive directory listing program",
      },
      {
        id: "jq",
        name: "Jq",
        installed: true,
        version: "1.7.1",
        desc: "Lightweight command-line JSON processor",
      },
      {
        id: "bat",
        name: "Bat",
        installed: true,
        version: "0.24.0",
        desc: "A cat clone with syntax highlighting",
      },
    ],
  },
  {
    key: "apps",
    icon: "[app]",
    title: "Essential macOS Apps & Settings",
    items: [
      {
        id: "chrome",
        name: "Google Chrome",
        installed: true,
        version: "131.0",
        desc: "Fast, reliable web browser for modern web dev",
      },
      {
        id: "chrome-default",
        name: "Set Chrome as Default",
        installed: true,
        version: "installed",
        desc: "Configure Google Chrome as default web browser",
      },
    ],
  },
];

type SubcommandType = "bun" | "install" | "check" | "doctor" | "update";
type TUIStateType = "scanning" | "tree" | "installing" | "complete";

interface StyledSpan {
  text: string;
  color?: string;
  bg?: string;
  bold?: boolean;
  isSpinner?: boolean;
}

type FrameLine = StyledSpan[];

interface InstallTaskStep {
  id: string;
  name: string;
  status: "pending" | "installing" | "ok";
  message: string;
  logLine?: string;
}

// Multi-step concurrent installation timeline matching renderInstallingView() in views.go
const TUI_INSTALL_STEPS: InstallTaskStep[][] = [
  [
    {
      id: "iterm2-font-config",
      name: "iTerm2 Font Config",
      status: "installing",
      message: "Configuring iTerm2 default profile to use MesloLGS NF...",
      logLine: "Updating ~/Library/Preferences/com.googlecode.iterm2.plist",
    },
    {
      id: "vim-runtime",
      name: "Ultimate Vim Runtime",
      status: "installing",
      message: "Cloning https://github.com/amix/vimrc.git...",
      logLine: "Cloning into '/Users/dev/.vim_runtime'... (38%)",
    },
    {
      id: "azure",
      name: "Azure CLI",
      status: "installing",
      message: "Installing formula via Homebrew...",
      logLine: "==> Downloading https://ghcr.io/v2/homebrew/core/azure-cli/manifests/2.67.0",
    },
    {
      id: "java",
      name: "Java (OpenJDK)",
      status: "pending",
      message: "Queued for installation",
    },
  ],
  [
    {
      id: "iterm2-font-config",
      name: "iTerm2 Font Config",
      status: "ok",
      message: "Configured MesloLGS-NF-Regular 14 in iTerm2 plist",
    },
    {
      id: "vim-runtime",
      name: "Ultimate Vim Runtime",
      status: "installing",
      message: "Running install_awesome_vimrc.sh...",
      logLine: "Installed the Ultimate Vim configuration successfully!",
    },
    {
      id: "azure",
      name: "Azure CLI",
      status: "installing",
      message: "Installing formula via Homebrew...",
      logLine: "==> Pouring azure-cli--2.67.0.arm64_sequoia.bottle.tar.gz",
    },
    {
      id: "java",
      name: "Java (OpenJDK)",
      status: "installing",
      message: "Installing formula via Homebrew...",
      logLine: "==> Downloading https://ghcr.io/v2/homebrew/core/openjdk/blobs/sha256:9f8e...",
    },
  ],
  [
    {
      id: "iterm2-font-config",
      name: "iTerm2 Font Config",
      status: "ok",
      message: "Configured MesloLGS-NF-Regular 14 in iTerm2 plist",
    },
    {
      id: "vim-runtime",
      name: "Ultimate Vim Runtime",
      status: "ok",
      message: "Installed Ultimate Vim Runtime in ~/.vim_runtime",
    },
    {
      id: "azure",
      name: "Azure CLI",
      status: "ok",
      message: "Installed successfully via Homebrew",
    },
    {
      id: "java",
      name: "Java (OpenJDK)",
      status: "installing",
      message: "Installing formula via Homebrew...",
      logLine: "==> Pouring openjdk--21.0.5.arm64_sequoia.bottle.tar.gz",
    },
  ],
  [
    {
      id: "iterm2-font-config",
      name: "iTerm2 Font Config",
      status: "ok",
      message: "Configured MesloLGS-NF-Regular 14 in iTerm2 plist",
    },
    {
      id: "vim-runtime",
      name: "Ultimate Vim Runtime",
      status: "ok",
      message: "Installed Ultimate Vim Runtime in ~/.vim_runtime",
    },
    {
      id: "azure",
      name: "Azure CLI",
      status: "ok",
      message: "Installed successfully via Homebrew",
    },
    {
      id: "java",
      name: "Java (OpenJDK)",
      status: "ok",
      message: "Installed successfully via Homebrew",
    },
  ],
];

function renderAsciiHeader() {
  return (
    <AsciiHeaderBlock>
      {ASCII_BUN_LINES.map((line, idx) => (
        <div key={idx}>
          {"  "}
          <span className="bun-icon">{line.icon}</span>
          <span className="bun-text">{line.text}</span>
        </div>
      ))}
    </AsciiHeaderBlock>
  );
}

export default function TerminalSimulator() {
  const [activeSubcommand, setActiveSubcommand] =
    useState<SubcommandType>("bun");
  const [tuiState, setTuiState] = useState<TUIStateType>("scanning");
  const [tuiInstallStep, setTuiInstallStep] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);
  const [spinnerIdx, setSpinnerIdx] = useState<number>(0);

  const [foldedGroups, setFoldedGroups] = useState<Record<string, boolean>>({
    system: true,
    terminal: false,
    cloud: true,
    editors: false,
    languages: false,
    cli: true,
    apps: true,
  });

  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({
    "iterm2-font-config": true,
    azure: true,
    "vim-runtime": true,
    java: true,
  });

  // 120ms Braille spinner ticker matching tickCmd() in coffee-bun/internal/ui/tui.go
  useEffect(() => {
    const interval = setInterval(() => {
      setSpinnerIdx((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // TUI state machine transitions (scanning -> tree, installing -> complete)
  useEffect(() => {
    if (activeSubcommand !== "bun" || !isPlaying) return;

    if (tuiState === "scanning") {
      const delay = Math.max(400, Math.floor(950 / speed));
      const timer = setTimeout(() => {
        setTuiState("tree");
      }, delay);
      return () => clearTimeout(timer);
    }

    if (tuiState === "installing") {
      const delay = Math.max(350, Math.floor(850 / speed));
      const timer = setTimeout(() => {
        if (tuiInstallStep < TUI_INSTALL_STEPS.length - 1) {
          setTuiInstallStep((prev) => prev + 1);
        } else {
          setTuiState("complete");
          setIsPlaying(false);
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [activeSubcommand, tuiState, tuiInstallStep, isPlaying, speed]);

  const toggleGroupFold = (groupKey: string) => {
    setFoldedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const toggleItemSelect = (id: string) => {
    setSelectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allItems = TUI_GROUPS.flatMap((g) => g.items);
  const totalReady = allItems.filter((i) => i.installed).length;
  const totalMissing = allItems.filter((i) => !i.installed).length;
  const totalSelected = allItems.filter((i) => selectedIds[i.id]).length;

  // Exact CLI command output scripts matching /Users/pignose/bundle/internal/cli/*.go
  const scriptMap: Record<
    Exclude<SubcommandType, "bun">,
    { cmd: string; hasScanPhase?: boolean; frames: FrameLine[] }
  > = {
    install: {
      cmd: "bun install all",
      frames: [
        [{ text: "  Installing 4 missing package(s)...\n", color: PALETTE.normal }],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "iTerm2 Font Config", color: PALETTE.normal, bold: true },
          {
            text: ": Configuring iTerm2 default profile to use MesloLGS NF...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Azure CLI", color: PALETTE.normal, bold: true },
          {
            text: ": Installing formula via Homebrew...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Ultimate Vim Runtime", color: PALETTE.normal, bold: true },
          {
            text: ": Cloning https://github.com/amix/vimrc.git into ~/.vim_runtime...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Java (OpenJDK)", color: PALETTE.normal, bold: true },
          {
            text: ": Installing formula via Homebrew...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "iTerm2 Font Config", color: PALETTE.normal, bold: true },
          {
            text: ": Configured MesloLGS-NF-Regular 14 in iTerm2 plist",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Ultimate Vim Runtime", color: PALETTE.normal, bold: true },
          {
            text: ": Installed Ultimate Vim Runtime in ~/.vim_runtime",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Azure CLI", color: PALETTE.normal, bold: true },
          {
            text: ": Installed successfully via Homebrew",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Java (OpenJDK)", color: PALETTE.normal, bold: true },
          {
            text: ": Installed successfully via Homebrew",
            color: PALETTE.normal,
          },
        ],
        [
          {
            text: "\n  [OK] Installation finished successfully!",
            color: PALETTE.success,
            bold: true,
          },
        ],
      ],
    },
    check: {
      cmd: "bun check",
      hasScanPhase: true,
      frames: [
        [{ text: "  [System & Toolchains]", color: PALETTE.secondary, bold: true }],
        [{ text: "  " + "-".repeat(68), color: PALETTE.muted }],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Xcode Command Line Tools   ", color: PALETTE.normal },
          { text: "(2409)", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Homebrew                   ", color: PALETTE.normal },
          { text: "(4.4.1)", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Git                        ", color: PALETTE.normal },
          { text: "(2.47.0)\n", color: PALETTE.muted },
        ],
        [{ text: "  [Terminal & Shell]", color: PALETTE.secondary, bold: true }],
        [{ text: "  " + "-".repeat(68), color: PALETTE.muted }],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "iTerm2                     ", color: PALETTE.normal },
          { text: "(3.5.10)", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "MesloLGS NF Font           ", color: PALETTE.normal },
          { text: "(ready)", color: PALETTE.muted },
        ],
        [
          { text: "  [MISSING]  ", color: PALETTE.warning, bold: true },
          { text: "iTerm2 Font Config         ", color: PALETTE.normal },
          { text: "- not installed", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Brogrammer Theme           ", color: PALETTE.normal },
          { text: "(ready)", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Oh My Zsh                  ", color: PALETTE.normal },
          { text: "(master)", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Powerlevel10k              ", color: PALETTE.normal },
          { text: "(v1.20.0)\n", color: PALETTE.muted },
        ],
        [{ text: "  [Editors & Vim Runtime]", color: PALETTE.secondary, bold: true }],
        [{ text: "  " + "-".repeat(68), color: PALETTE.muted }],
        [
          { text: "  [MISSING]  ", color: PALETTE.warning, bold: true },
          { text: "Ultimate Vim Runtime       ", color: PALETTE.normal },
          { text: "- not installed", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Visual Studio Code         ", color: PALETTE.normal },
          { text: "(1.96.2)", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "VS Code CLI (`code`)       ", color: PALETTE.normal },
          { text: "(ready)\n", color: PALETTE.muted },
        ],
        [{ text: "  [Compilers & Runtimes]", color: PALETTE.secondary, bold: true }],
        [{ text: "  " + "-".repeat(68), color: PALETTE.muted }],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Go                         ", color: PALETTE.normal },
          { text: "(go1.23.4)", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Python 3                   ", color: PALETTE.normal },
          { text: "(3.13.1)", color: PALETTE.muted },
        ],
        [
          { text: "  [MISSING]  ", color: PALETTE.warning, bold: true },
          { text: "Java (OpenJDK)             ", color: PALETTE.normal },
          { text: "- not installed", color: PALETTE.muted },
        ],
        [
          { text: "  [OK]       ", color: PALETTE.success, bold: true },
          { text: "Node.js                    ", color: PALETTE.normal },
          { text: "(v22.12.0)\n", color: PALETTE.muted },
        ],
        [
          { text: "  Summary: ", color: PALETTE.normal },
          { text: "25", color: PALETTE.success, bold: true },
          { text: " installed, ", color: PALETTE.normal },
          { text: "4", color: PALETTE.warning, bold: true },
          { text: " missing (Total: 29)", color: PALETTE.normal },
        ],
      ],
    },
    doctor: {
      cmd: "bun doctor",
      frames: [
        [
          { text: "  ", color: PALETTE.normal },
          {
            text: " coffee-bun doctor - Diagnostic Report ",
            color: PALETTE.titleFg,
            bg: PALETTE.titleBg,
            bold: true,
          },
          { text: "\n", color: PALETTE.normal },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "OS: darwin (arm64)", color: PALETTE.normal },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Homebrew: Installed and in PATH", color: PALETTE.normal },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Git: Installed and accessible in PATH", color: PALETTE.normal },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          {
            text: "VS Code CLI (`code`): Configured and accessible",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          {
            text: "Powerlevel10k: Active theme configured in ~/.zshrc",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          {
            text: "Zoxide: Shell hook configured in ~/.zshrc",
            color: PALETTE.normal,
          },
        ],
      ],
    },
    update: {
      cmd: "bun update",
      frames: [
        [
          {
            text: "  Checking for updates and running maintenance...\n",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Homebrew", color: PALETTE.normal, bold: true },
          {
            text: ": Updating Homebrew package index...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Oh My Zsh", color: PALETTE.normal, bold: true },
          {
            text: ": Pulling latest changes for Oh My Zsh...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Powerlevel10k", color: PALETTE.normal, bold: true },
          {
            text: ": Pulling latest changes for Powerlevel10k...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Zsh Autosuggestions", color: PALETTE.normal, bold: true },
          {
            text: ": Pulling latest changes for Zsh Autosuggestions...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Zsh Syntax Highlighting", color: PALETTE.normal, bold: true },
          {
            text: ": Pulling latest changes for Zsh Syntax Highlighting...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Oh My Zsh", color: PALETTE.normal, bold: true },
          {
            text: ": Oh My Zsh is already up to date",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Powerlevel10k", color: PALETTE.normal, bold: true },
          {
            text: ": Powerlevel10k is already up to date",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Zsh Autosuggestions", color: PALETTE.normal, bold: true },
          {
            text: ": Zsh Autosuggestions is already up to date",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Zsh Syntax Highlighting", color: PALETTE.normal, bold: true },
          {
            text: ": Zsh Syntax Highlighting is already up to date",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  ", color: PALETTE.normal },
          { text: "[..]", color: PALETTE.warning, bold: true, isSpinner: true },
          { text: " ", color: PALETTE.normal },
          { text: "Homebrew Packages", color: PALETTE.normal, bold: true },
          {
            text: ": Upgrading outdated formulae and casks...",
            color: PALETTE.normal,
          },
        ],
        [
          { text: "  [OK] ", color: PALETTE.success, bold: true },
          { text: "Homebrew Packages", color: PALETTE.normal, bold: true },
          {
            text: ": All Homebrew packages and casks upgraded to latest version",
            color: PALETTE.normal,
          },
        ],
        [
          {
            text: "\n  [OK] Update process completed!",
            color: PALETTE.success,
            bold: true,
          },
        ],
      ],
    },
  };

  const handleSelectSubcommand = (sub: SubcommandType) => {
    setActiveSubcommand(sub);
    if (sub === "bun") {
      setTuiState("scanning");
      setTuiInstallStep(0);
      setIsPlaying(true);
    } else {
      setCurrentFrameIndex(0);
      setIsPlaying(true);
    }
  };

  const handleStartTuiInstall = () => {
    setTuiInstallStep(0);
    setTuiState("installing");
    setIsPlaying(true);
  };

  const handlePrimaryPlayAction = () => {
    if (activeSubcommand === "bun") {
      if (tuiState === "complete") {
        setTuiInstallStep(0);
        setTuiState("scanning");
        setIsPlaying(true);
      } else if (tuiState === "tree") {
        handleStartTuiInstall();
      } else {
        setIsPlaying((prev) => !prev);
      }
      return;
    }

    const script = scriptMap[activeSubcommand];
    const isFinished = currentFrameIndex >= script.frames.length;
    if (isFinished) {
      setCurrentFrameIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleRestart = () => {
    if (activeSubcommand === "bun") {
      setTuiInstallStep(0);
      setTuiState("scanning");
      setIsPlaying(true);
    } else {
      setCurrentFrameIndex(0);
      setIsPlaying(true);
    }
  };

  const activeScript =
    activeSubcommand !== "bun" ? scriptMap[activeSubcommand] : null;

  useEffect(() => {
    if (activeSubcommand === "bun" || !isPlaying || !activeScript) return;

    if (currentFrameIndex >= activeScript.frames.length) {
      setIsPlaying(false);
      return;
    }

    const delay =
      currentFrameIndex === 0 && activeScript.hasScanPhase
        ? Math.max(350, Math.floor(650 / speed))
        : Math.max(80, Math.floor(210 / speed));

    const timer = setTimeout(() => {
      setCurrentFrameIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [activeSubcommand, isPlaying, currentFrameIndex, activeScript, speed]);

  const displayedFrames = activeScript
    ? activeScript.frames.slice(0, currentFrameIndex)
    : [];

  const isSubcommandCompleted =
    activeSubcommand === "bun"
      ? tuiState === "complete"
      : !!activeScript && currentFrameIndex >= activeScript.frames.length;

  const isAnimationActive =
    activeSubcommand === "bun"
      ? isPlaying && (tuiState === "scanning" || tuiState === "installing")
      : isPlaying && !isSubcommandCompleted;

  const currentSpinnerChar = SPINNER_FRAMES[spinnerIdx];
  const currentInstallList =
    TUI_INSTALL_STEPS[
      Math.min(tuiInstallStep, TUI_INSTALL_STEPS.length - 1)
    ];
  const completedInStep = currentInstallList.filter(
    (t) => t.status === "ok"
  ).length;
  const activeInStep = currentInstallList.filter(
    (t) => t.status === "installing"
  ).length;
  const queuedInStep = currentInstallList.filter(
    (t) => t.status === "pending"
  ).length;

  return (
    <TerminalWrapper>
      <TerminalFrame>
        <TerminalHeader>
          <WindowButtons>
            <span className="close" />
            <span className="minimize" />
            <span className="maximize" />
          </WindowButtons>
          <TerminalTitle>
            <RiTerminalBoxLine />
            bun — coffee-bun (zsh)
          </TerminalTitle>
          <div style={{ width: 42 }} />
        </TerminalHeader>

        <SubcommandBar>
          <SubcommandTab
            isActive={activeSubcommand === "bun"}
            onClick={() => handleSelectSubcommand("bun")}
          >
            <span>1. bun</span>
            <span className="badge">Interactive TUI</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "install"}
            onClick={() => handleSelectSubcommand("install")}
          >
            <span>2. bun install all</span>
            <span className="badge">Install</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "check"}
            onClick={() => handleSelectSubcommand("check")}
          >
            <span>3. bun check</span>
            <span className="badge">Status</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "doctor"}
            onClick={() => handleSelectSubcommand("doctor")}
          >
            <span>4. bun doctor</span>
            <span className="badge">Doctor</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "update"}
            onClick={() => handleSelectSubcommand("update")}
          >
            <span>5. bun update</span>
            <span className="badge">Update</span>
          </SubcommandTab>
        </SubcommandBar>

        <PlayerControlBar>
          <PlayerControls>
            <ControlBtn onClick={handlePrimaryPlayAction}>
              {isSubcommandCompleted ? (
                <>
                  <RiRestartLine />
                  Replay
                </>
              ) : isAnimationActive ? (
                <>
                  <RiPauseLine />
                  Pause
                </>
              ) : (
                <>
                  <RiPlayLine />
                  Play
                </>
              )}
            </ControlBtn>
            {!isSubcommandCompleted && (
              <ControlBtn onClick={handleRestart}>
                <RiRestartLine />
                Reset
              </ControlBtn>
            )}
            <ControlBtn
              onClick={() => setSpeed((prev) => (prev === 1 ? 2 : 1))}
              style={{ minWidth: 46 }}
            >
              {speed}x
            </ControlBtn>
          </PlayerControls>

          <PlaybackStatus>
            {isAnimationActive ? (
              <span className="spin-char">
                [<SpinnerGlyph>{currentSpinnerChar}</SpinnerGlyph>]
              </span>
            ) : (
              <span className="rec-dot" />
            )}
            <span>
              {activeSubcommand === "bun"
                ? tuiState === "scanning"
                  ? "Scanning: $ bun"
                  : tuiState === "installing"
                    ? "Installing: $ bun (Goroutine Workers)"
                    : tuiState === "complete"
                      ? "Completed: $ bun"
                      : "Interactive: $ bun (Click Start Install or Play)"
                : isSubcommandCompleted
                  ? `Completed: $ ${activeScript?.cmd}`
                  : isPlaying
                    ? `Running: $ ${activeScript?.cmd}`
                    : `Paused: $ ${activeScript?.cmd}`}
            </span>
          </PlaybackStatus>
        </PlayerControlBar>

        <TerminalScreen>
          {activeSubcommand === "bun" ? (
            tuiState === "scanning" ? (
              <div>
                {renderAsciiHeader()}
                <div style={{ whiteSpace: "pre", marginTop: "0.75rem" }}>
                  {"  "}
                  <span style={{ color: PALETTE.highlight, fontWeight: 700 }}>
                    [<SpinnerGlyph>{currentSpinnerChar}</SpinnerGlyph>]
                  </span>{" "}
                  <span style={{ color: PALETTE.normal }}>
                    Checking environment and installed tools...
                  </span>
                </div>
                <div
                  style={{
                    whiteSpace: "pre",
                    marginTop: "0.75rem",
                    color: PALETTE.muted,
                  }}
                >
                  {"  Please wait while components are verified..."}
                </div>
              </div>
            ) : tuiState === "installing" ? (
              <div>
                <div style={{ whiteSpace: "pre", marginBottom: "0.25rem" }}>
                  {" "}
                  <span style={{ color: PALETTE.highlight, fontWeight: 700 }}>
                    [<SpinnerGlyph>{currentSpinnerChar}</SpinnerGlyph>]
                  </span>
                  {"  "}
                  <span style={{ color: PALETTE.normal, fontWeight: 700 }}>
                    Coffee Bun
                  </span>
                </div>

                <DividerLine>{"-".repeat(78)}</DividerLine>

                <div style={{ minHeight: "310px", padding: "0.25rem 0" }}>
                  {currentInstallList.map((item) => {
                    const paddedName = item.name.padEnd(22, " ");
                    return (
                      <React.Fragment key={item.id}>
                        <div style={{ whiteSpace: "pre", padding: "0.1rem 0" }}>
                          {"   "}
                          {item.status === "installing" ? (
                            <>
                              <span
                                style={{
                                  color: PALETTE.highlight,
                                  fontWeight: 700,
                                }}
                              >
                                [<SpinnerGlyph>{currentSpinnerChar}</SpinnerGlyph>]
                              </span>{" "}
                              <span
                                style={{
                                  color: PALETTE.normal,
                                  fontWeight: 700,
                                }}
                              >
                                {paddedName}
                              </span>
                              {": "}
                              <span style={{ color: PALETTE.normal }}>
                                {item.message}
                              </span>
                            </>
                          ) : item.status === "ok" ? (
                            <>
                              <span
                                style={{
                                  color: PALETTE.success,
                                  fontWeight: 700,
                                }}
                              >
                                [OK]
                              </span>{" "}
                              <span style={{ color: PALETTE.normal }}>
                                {paddedName}
                              </span>
                              {": "}
                              <span style={{ color: PALETTE.muted }}>
                                {item.message}
                              </span>
                            </>
                          ) : (
                            <>
                              <span style={{ color: PALETTE.muted }}>[..]</span>{" "}
                              <span style={{ color: PALETTE.muted }}>
                                {paddedName}
                              </span>
                              {": "}
                              <span style={{ color: PALETTE.muted }}>
                                {item.message}
                              </span>
                            </>
                          )}
                        </div>
                        {item.status === "installing" && item.logLine && (
                          <div
                            style={{
                              whiteSpace: "pre",
                              padding: "0.05rem 0 0.2rem",
                            }}
                          >
                            {"       "}
                            <span style={{ color: PALETTE.muted }}>&gt;</span>{" "}
                            <span style={{ color: PALETTE.logStream }}>
                              {item.logLine}
                            </span>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <DividerLine>{"-".repeat(78)}</DividerLine>

                <StatusSummaryLine>
                  {"  Progress: "}
                  <span className="ready">{completedInStep}</span>
                  {" completed, "}
                  <span className="selected">{activeInStep}</span>
                  {" active, "}
                  <span style={{ color: PALETTE.muted }}>{queuedInStep}</span>
                  {` queued (Total: ${currentInstallList.length})  `}
                  <span style={{ color: PALETTE.muted }}>
                    [j/k/g/G] Scroll
                  </span>
                </StatusSummaryLine>
              </div>
            ) : tuiState === "complete" ? (
              <div>
                {renderAsciiHeader()}

                <StatusSummaryLine>
                  {"  Completed: "}
                  <span className="ready">{currentInstallList.length}</span>
                  {" succeeded, "}
                  <span className="error">0</span>
                  {` failed (Total: ${currentInstallList.length})`}
                </StatusSummaryLine>

                <DividerLine>{"-".repeat(78)}</DividerLine>

                <div style={{ minHeight: "230px", padding: "0.25rem 0" }}>
                  {TUI_INSTALL_STEPS[TUI_INSTALL_STEPS.length - 1].map(
                    (item) => (
                      <div
                        key={item.id}
                        style={{ whiteSpace: "pre", padding: "0.1rem 0" }}
                      >
                        {"   "}
                        <span
                          style={{ color: PALETTE.success, fontWeight: 700 }}
                        >
                          [OK]
                        </span>{" "}
                        <span style={{ color: PALETTE.normal }}>
                          {item.name.padEnd(22, " ")}
                        </span>
                        {": "}
                        <span style={{ color: PALETTE.normal }}>
                          {item.message}
                        </span>
                      </div>
                    )
                  )}
                </div>

                <DividerLine>{"-".repeat(78)}</DividerLine>

                <TUIButtonsRow>
                  <TUIExitBtn onClick={() => setTuiState("tree")}>
                    {"  < Back to Selection  "}
                  </TUIExitBtn>
                  <TUIStartBtn onClick={() => handleSelectSubcommand("check")}>
                    {"[ Done / Exit > ]"}
                  </TUIStartBtn>
                </TUIButtonsRow>

                <TUIHintRow>
                  {
                    "  [Tab/←/→] Buttons | [j/k/g/G] Scroll | [Enter] Execute | [q] Quit"
                  }
                </TUIHintRow>
              </div>
            ) : (
              <div>
                {renderAsciiHeader()}

                <StatusSummaryLine>
                  {"  Status: "}
                  <span className="ready">{totalReady}</span>
                  {" ready, "}
                  <span className="missing">{totalMissing}</span>
                  {" missing | "}
                  <span className="selected">{totalSelected}</span>
                  {" selected to install"}
                </StatusSummaryLine>

                <DividerLine>{"-".repeat(78)}</DividerLine>

                {TUI_GROUPS.map((group, gIdx) => {
                  const isFolded = !!foldedGroups[group.key];
                  const totalInGroup = group.items.length;
                  const readyInGroup = group.items.filter(
                    (i) => i.installed
                  ).length;
                  const missingInGroup = totalInGroup - readyInGroup;
                  const selectedInGroup = group.items.filter(
                    (i) => selectedIds[i.id]
                  ).length;
                  const isFirstCursor = gIdx === 1;

                  return (
                    <React.Fragment key={group.key}>
                      <GroupHeaderLine
                        isCursor={isFirstCursor}
                        onClick={() => toggleGroupFold(group.key)}
                      >
                        {isFirstCursor ? "> " : "  "}
                        {isFolded ? "[+]" : "[-]"} {group.icon} {group.title}{" "}
                        {missingInGroup === 0 ? (
                          <span className="badge-ready">
                            ({readyInGroup}/{totalInGroup} ready)
                          </span>
                        ) : (
                          <span className="badge-missing">
                            ({readyInGroup}/{totalInGroup} ready,{" "}
                            {missingInGroup} missing)
                          </span>
                        )}{" "}
                        {selectedInGroup === totalInGroup &&
                        totalInGroup > 0 ? (
                          <span className="sel-all">[All]</span>
                        ) : selectedInGroup > 0 ? (
                          <span className="sel-some">
                            [{selectedInGroup} sel]
                          </span>
                        ) : (
                          <span className="sel-empty">[ ]</span>
                        )}
                      </GroupHeaderLine>

                      {!isFolded &&
                        group.items.map((item) => {
                          const isSel = !!selectedIds[item.id];
                          const paddedName = item.name.padEnd(25, " ");
                          const paddedVer = (
                            item.installed ? item.version : "missing"
                          ).padEnd(13, " ");

                          return (
                            <PackageItemLine
                              key={item.id}
                              onClick={() => toggleItemSelect(item.id)}
                            >
                              {"      "}
                              {item.installed ? (
                                isSel ? (
                                  <span className="chk-installed-sel">[x]</span>
                                ) : (
                                  <span className="chk-installed">[x]</span>
                                )
                              ) : isSel ? (
                                <span className="chk-missing-sel">[+]</span>
                              ) : (
                                <span className="chk-missing">[ ]</span>
                              )}{" "}
                              <span>{paddedName}</span>{" "}
                              {item.installed ? (
                                <span className="ver-ok">{paddedVer}</span>
                              ) : (
                                <span className="ver-missing">{paddedVer}</span>
                              )}{" "}
                              <span className="desc">- {item.desc}</span>
                            </PackageItemLine>
                          );
                        })}
                    </React.Fragment>
                  );
                })}

                <DividerLine>{"-".repeat(78)}</DividerLine>

                <TUIButtonsRow>
                  <TUIExitBtn onClick={() => handleSelectSubcommand("check")}>
                    {"  < Exit  "}
                  </TUIExitBtn>
                  <TUIStartBtn onClick={handleStartTuiInstall}>
                    {`[ Start Install (${totalSelected}) > ]`}
                  </TUIStartBtn>
                </TUIButtonsRow>

                <TUIHintRow>
                  {
                    "  [j/k/g/G] Move | [Space] Toggle | [a/m] All/Missing | [r] Rescan | [q] Quit"
                  }
                </TUIHintRow>
              </div>
            )
          ) : (
            <div>
              <PromptLine>
                <span className="prompt-char">$ </span>
                <span className="cmd">{activeScript?.cmd}</span>
              </PromptLine>

              {activeSubcommand === "check" && currentFrameIndex === 0 ? (
                <div style={{ whiteSpace: "pre", marginTop: "0.5rem" }}>
                  {"  "}
                  <span style={{ color: PALETTE.highlight, fontWeight: 700 }}>
                    [<SpinnerGlyph>{currentSpinnerChar}</SpinnerGlyph>]
                  </span>{" "}
                  <span style={{ color: PALETTE.normal }}>
                    Scanning macOS developer environment...
                  </span>
                </div>
              ) : (
                <>
                  {renderAsciiHeader()}

                  {displayedFrames.map((line, lineIdx) => (
                    <div key={lineIdx} style={{ whiteSpace: "pre-wrap" }}>
                      {line.map((span, sIdx) => {
                        const isLiveSpinner =
                          span.isSpinner && !isSubcommandCompleted;
                        return (
                          <span
                            key={sIdx}
                            style={{
                              color: span.color || PALETTE.normal,
                              backgroundColor: span.bg || "transparent",
                              fontWeight: span.bold ? 700 : 400,
                            }}
                          >
                            {isLiveSpinner ? (
                              <>
                                [<SpinnerGlyph>{currentSpinnerChar}</SpinnerGlyph>]
                              </>
                            ) : (
                              span.text
                            )}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </TerminalScreen>
      </TerminalFrame>
    </TerminalWrapper>
  );
}
