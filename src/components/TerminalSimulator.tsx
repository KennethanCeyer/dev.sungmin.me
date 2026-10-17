"use client";

import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RiCheckLine,
  RiFolderLine,
  RiPauseLine,
  RiPlayLine,
  RiPulseLine,
  RiRefreshLine,
  RiRestartLine,
  RiTerminalBoxLine,
} from "react-icons/ri";

const TerminalWrapper = styled.div`
  width: 100%;
  margin: 1.5rem 0 2.5rem;
  font-family: var(--font-roboto-mono), monospace;
  text-align: left;
`;

const TerminalFrame = styled.div`
  background-color: #05070a;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
`;

const TerminalHeader = styled.div`
  background-color: #0c1017;
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
  color: #c9d1d9;
  opacity: 0.85;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  letter-spacing: 0.02em;
`;

const SubcommandBar = styled.div`
  display: flex;
  background-color: #080c12;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
  padding: 0 0.5rem;
`;

const SubcommandTab = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.8rem;
  color: ${({ isActive }) => (isActive ? "#58a6ff" : "#8b949e")};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? "#58a6ff" : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.15s ease;

  &:hover {
    color: #f0f6fc;
    background-color: rgba(255, 255, 255, 0.03);
  }

  .badge {
    font-size: 0.7rem;
    padding: 0.1rem 0.35rem;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.06);
    color: #8b949e;
  }
`;

const PlayerControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.25rem;
  background-color: #06090e;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  color: #8b949e;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ControlBtn = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #f0f6fc;
  padding: 0.25rem 0.65rem;
  border-radius: 4px;
  font-size: 0.74rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.25);
  }
`;

const PlaybackStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.74rem;

  .rec-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #3fb950;
    display: inline-block;
    box-shadow: 0 0 6px rgba(63, 185, 80, 0.6);
  }
`;

const TerminalScreen = styled.div`
  padding: 1.5rem 1.75rem;
  background-color: #05070a;
  color: #f0f6fc;
  font-size: 0.86rem;
  line-height: 1.6;
  min-height: 420px;
  overflow-x: auto;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.78rem;
    min-height: 380px;
  }
`;

const PromptLine = styled.div`
  color: #f0f6fc;
  margin-bottom: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .host {
    color: #58a6ff;
  }
  .path {
    color: #d29922;
  }
  .cmd {
    color: #f0f6fc;
    font-weight: 600;
  }
`;

// Syntax colored lines
const LineText = styled.div<{ colorType?: string }>`
  font-family: var(--font-roboto-mono), monospace;
  ${({ colorType }) => {
    switch (colorType) {
      case "cyan":
        return "color: #58a6ff;";
      case "green":
        return "color: #3fb950;";
      case "yellow":
        return "color: #d29922;";
      case "dim":
        return "color: #8b949e;";
      case "purple":
        return "color: #bc8cff;";
      case "white":
        return "color: #f0f6fc; font-weight: 600;";
      case "highlight":
        return "color: #58a6ff; font-weight: 600;";
      default:
        return "color: #c9d1d9;";
    }
  }}
`;

type SubcommandType = "bun" | "install" | "check" | "doctor" | "update";

interface AnimationFrame {
  text: string;
  colorType?: "cyan" | "green" | "yellow" | "dim" | "purple" | "white" | "highlight";
}

export default function TerminalSimulator() {
  const { i18n } = useTranslation();
  const isKo = i18n.language.startsWith("ko");

  const [activeSubcommand, setActiveSubcommand] = useState<SubcommandType>("bun");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);

  // Script definitions for the 5 recorded subcommands
  const scriptMap: Record<SubcommandType, { cmd: string; frames: AnimationFrame[] }> = {
    bun: {
      cmd: "bun",
      frames: [
        { text: "coffee-bun (bun) - macOS Setup & Environment Manager", colorType: "cyan" },
        { text: "Fold/Unfold groups, select targets, and navigate action buttons below\n", colorType: "dim" },
        { text: "> [-] [shell] Terminal & Shell (iTerm2, Fonts, OMZ, p10k) (6/8 installed) [All]", colorType: "cyan" },
        { text: "    [x] iTerm2                   3.7.6            - Terminal emulator for macOS", colorType: "green" },
        { text: "    [x] MesloLGS NF Font         Installed        - Nerd Font with icons (~/Library/Fonts)", colorType: "green" },
        { text: "    [+] iTerm2 Font Config       missing          - Configure iTerm2 default font plist", colorType: "yellow" },
        { text: "    [x] Brogrammer Theme         Preset Ready     - High-contrast aesthetic iTerm2 preset", colorType: "green" },
        { text: "    [x] Oh My Zsh                964ddf7          - Community zsh framework (~/.oh-my-zsh)", colorType: "green" },
        { text: "    [x] Powerlevel10k            d05a1b0          - Fast, aesthetic zsh prompt theme", colorType: "green" },
        { text: "    [x] Zsh Autosuggestions      v0.7.1           - Fish-like command autocompletion", colorType: "green" },
        { text: "    [x] Zsh Syntax Highlighting  0.8.0            - Real-time syntax highlighting\n", colorType: "green" },
        { text: "  [-] [editor] Editors & Vim Runtime (2/3 installed) [1 sel]", colorType: "cyan" },
        { text: "    [+] Ultimate Vim Runtime     missing          - amix/vimrc awesome configuration", colorType: "yellow" },
        { text: "    [x] Visual Studio Code       1.142.0          - Modern GUI code editor", colorType: "green" },
        { text: "    [x] VS Code CLI (`code`)     1.142.0          - Symlink code binary to /usr/local/bin\n", colorType: "green" },
        { text: "  [-] [lang] Compilers & Languages (4/5 installed) [1 sel]", colorType: "cyan" },
        { text: "    [x] Go                       go1.27.2         - High-performance systems language", colorType: "green" },
        { text: "    [x] Python 3                 Python 3.15.0    - Python runtime bundled with pip", colorType: "green" },
        { text: "    [+] Java (OpenJDK)           missing          - OpenJDK 21 with macOS JVM symlink", colorType: "yellow" },
        { text: "    [x] GCC / Clang              clang-21.0.0     - Apple developer command-line tools", colorType: "green" },
        { text: "    [x] Node.js                  v26.12.0         - JavaScript runtime bundled with npm\n", colorType: "green" },
        { text: "  [+] [cloud] Cloud & DevOps CLIs (AWS, gcloud, az) (2/3 installed) [Folded]", colorType: "dim" },
        { text: "  [+] [tools] Modern CLI Suite (zoxide, htop, fzf, rg, eza, bat) (8/8 installed) [Folded]\n", colorType: "dim" },
        { text: "------------------------------------------------------------------------", colorType: "dim" },
        { text: "[ < Exit ]                                    [ Start Install (3) > ]", colorType: "white" },
        { text: "[Tab/←/→] Buttons | [Enter] Run | [Space] Toggle | [m] Missing | [q] Quit", colorType: "purple" },
      ],
    },
    install: {
      cmd: "bun install all",
      frames: [
        { text: "[coffee-bun] Initializing concurrent workstation provisioning...", colorType: "cyan" },
        { text: "[coffee-bun] Platform: macOS darwin/arm64 | Goroutines: 8 workers\n", colorType: "dim" },
        { text: "⠋ [brew] Installing openjdk (Java 21)...", colorType: "yellow" },
        { text: "  ↳ Downloading bottle: 184MB / 184MB [====================] 100%", colorType: "dim" },
        { text: "⠙ [git]  Cloning amix/vimrc (Ultimate Vim Runtime)...", colorType: "yellow" },
        { text: "  ↳ Receiving objects: 100% (1420/1420), 1.2 MiB | 5.4 MiB/s, done.", colorType: "dim" },
        { text: "⠸ [font] Downloading MesloLGS NF fonts (Regular, Bold, Italic)...", colorType: "yellow" },
        { text: "  ↳ ~/Library/Fonts/MesloLGS-NF-Regular.ttf verified.\n", colorType: "dim" },
        { text: "✔ [font] MesloLGS NF font suite successfully installed", colorType: "green" },
        { text: "✔ [iterm2] Default profile configured: MesloLGS-NF-Regular 16pt + Brogrammer", colorType: "green" },
        { text: "✔ [editor] Ultimate Vim Runtime configured in ~/.vim_runtime", colorType: "green" },
        { text: "✔ [brew] OpenJDK 21 symlinked: /Library/Java/JavaVirtualMachines/openjdk.jdk", colorType: "green" },
        { text: "✔ [cli] VS Code CLI linked: /usr/local/bin/code", colorType: "green" },
        { text: "✔ [app] Google Chrome installed & set as default system browser", colorType: "green" },
        { text: "✔ [shell] Verified ~/.zshrc hooks and Powerlevel10k prompt\n", colorType: "green" },
        { text: "========================================================================", colorType: "dim" },
        { text: "✨ [coffee-bun] Workstation setup complete in 28.4s!", colorType: "white" },
        { text: "☕ All 18 packages and tools verified. Time for coffee and happy hacking!", colorType: "cyan" },
        { text: "========================================================================", colorType: "dim" },
      ],
    },
    check: {
      cmd: "bun check",
      frames: [
        { text: "CATEGORY     PACKAGE                 VERSION         STATUS", colorType: "white" },
        { text: "------------------------------------------------------------------------", colorType: "dim" },
        { text: "[shell]      iTerm2                  3.7.6           ✔ installed", colorType: "green" },
        { text: "[shell]      MesloLGS NF Font        4 font files    ✔ installed", colorType: "green" },
        { text: "[shell]      iTerm2 Font Plist       16pt Regular    ✖ missing", colorType: "yellow" },
        { text: "[shell]      Brogrammer Theme        Custom Preset   ✔ installed", colorType: "green" },
        { text: "[shell]      Oh My Zsh               master/964ddf7  ✔ installed", colorType: "green" },
        { text: "[shell]      Powerlevel10k           v1.20.0         ✔ installed", colorType: "green" },
        { text: "[editor]     Ultimate Vim Runtime    amix/vimrc      ✖ missing", colorType: "yellow" },
        { text: "[editor]     Visual Studio Code      1.142.0         ✔ installed", colorType: "green" },
        { text: "[editor]     VS Code CLI (code)      /usr/local/bin  ✔ installed", colorType: "green" },
        { text: "[lang]       Go                      go1.27.2        ✔ installed", colorType: "green" },
        { text: "[lang]       Python 3                Python 3.15.0   ✔ installed", colorType: "green" },
        { text: "[lang]       Java (OpenJDK)          openjdk-21      ✖ missing", colorType: "yellow" },
        { text: "[lang]       Node.js                 v26.12.0        ✔ installed", colorType: "green" },
        { text: "[cloud]      AWS CLI                 v2.22.1         ✔ installed", colorType: "green" },
        { text: "[cloud]      Google Cloud SDK        506.0.0         ✔ installed", colorType: "green" },
        { text: "[tools]      zoxide, fzf, rg, bat    latest          ✔ all active\n", colorType: "green" },
        { text: "------------------------------------------------------------------------", colorType: "dim" },
        { text: "Summary: 15 installed, 3 missing. Run 'bun' or 'bun install all' to resolve.", colorType: "cyan" },
      ],
    },
    doctor: {
      cmd: "bun doctor",
      frames: [
        { text: "[coffee-bun] Running workstation health diagnostics...\n", colorType: "cyan" },
        { text: "[1/7] Operating System: macOS 15.0 Sequoia (darwin/arm64)          [ PASS ]", colorType: "green" },
        { text: "[2/7] Homebrew: /opt/homebrew/bin/brew (v4.4.1)                   [ PASS ]", colorType: "green" },
        { text: "[3/7] Shell Framework: /bin/zsh with Oh My Zsh active             [ PASS ]", colorType: "green" },
        { text: "[4/7] Prompt Theme: Powerlevel10k configured in ~/.zshrc          [ PASS ]", colorType: "green" },
        { text: "[5/7] Terminal Font: MesloLGS NF detected in ~/Library/Fonts       [ PASS ]", colorType: "green" },
        { text: "[6/7] Editor CLI: /usr/local/bin/code symlinked to PATH           [ PASS ]", colorType: "green" },
        { text: "[7/7] Modern CLI Suite: zoxide, rg, fzf, bat, eza in PATH         [ PASS ]\n", colorType: "green" },
        { text: "------------------------------------------------------------------------", colorType: "dim" },
        { text: "✔ Doctor Verdict: All 7/7 diagnostics verified. Zero conflicts found.", colorType: "white" },
        { text: "✨ Environment is completely healthy and ready for development.", colorType: "cyan" },
      ],
    },
    update: {
      cmd: "bun update",
      frames: [
        { text: "[coffee-bun] Starting concurrent update of all packages and repositories...\n", colorType: "cyan" },
        { text: "==> [brew] Updating Homebrew formulae and casks...", colorType: "yellow" },
        { text: "    ↳ Already up-to-date.", colorType: "dim" },
        { text: "==> [git]  Pulling latest commits for Oh My Zsh (master)...", colorType: "yellow" },
        { text: "    ↳ Current branch master is up to date.", colorType: "dim" },
        { text: "==> [git]  Pulling latest commits for Powerlevel10k...", colorType: "yellow" },
        { text: "    ↳ Fast-forwarding: d05a1b0..e84a2f1 (2 commits)", colorType: "dim" },
        { text: "==> [git]  Updating zsh-autosuggestions & zsh-syntax-highlighting...", colorType: "yellow" },
        { text: "    ↳ Verified latest git tags.", colorType: "dim" },
        { text: "==> [git]  Syncing Ultimate Vim Runtime (amix/vimrc)...", colorType: "yellow" },
        { text: "    ↳ Already up-to-date.\n", colorType: "dim" },
        { text: "------------------------------------------------------------------------", colorType: "dim" },
        { text: "✨ All 14 packages, formulae, casks, and git repos successfully up-to-date.", colorType: "white" },
      ],
    },
  };

  const activeScript = scriptMap[activeSubcommand];

  // Reset or switch tabs
  const handleSelectSubcommand = (sub: SubcommandType) => {
    setActiveSubcommand(sub);
    setCurrentFrameIndex(0);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    setCurrentFrameIndex(0);
    setIsPlaying(true);
  };

  // Animation playback timer
  useEffect(() => {
    if (!isPlaying) return;

    if (currentFrameIndex >= activeScript.frames.length) {
      setIsPlaying(false);
      return;
    }

    const delay = Math.max(70, Math.floor(160 / speed));
    const timer = setTimeout(() => {
      setCurrentFrameIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentFrameIndex, activeScript.frames.length, speed]);

  const displayedFrames = activeScript.frames.slice(0, currentFrameIndex);

  return (
    <TerminalWrapper>
      <TerminalFrame>
        {/* Title Bar with Traffic Lights */}
        <TerminalHeader>
          <WindowButtons>
            <span className="close" />
            <span className="minimize" />
            <span className="maximize" />
          </WindowButtons>
          <TerminalTitle>
            <RiTerminalBoxLine />
            kenneth@macbook-pro: ~ (coffee-bun)
          </TerminalTitle>
          <div style={{ width: 40 }} />
        </TerminalHeader>

        {/* Subcommand Navigation Tabs */}
        <SubcommandBar>
          <SubcommandTab
            isActive={activeSubcommand === "bun"}
            onClick={() => handleSelectSubcommand("bun")}
          >
            <span>1. bun</span>
            <span className="badge">Interactive Tree</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "install"}
            onClick={() => handleSelectSubcommand("install")}
          >
            <span>2. bun install all</span>
            <span className="badge">Live Stream</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "check"}
            onClick={() => handleSelectSubcommand("check")}
          >
            <span>3. bun check</span>
            <span className="badge">Inspection</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "doctor"}
            onClick={() => handleSelectSubcommand("doctor")}
          >
            <span>4. bun doctor</span>
            <span className="badge">Diagnostics</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "update"}
            onClick={() => handleSelectSubcommand("update")}
          >
            <span>5. bun update</span>
            <span className="badge">Upgrader</span>
          </SubcommandTab>
        </SubcommandBar>

        {/* Player Controls Bar */}
        <PlayerControlBar>
          <PlayerControls>
            <ControlBtn onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                <>
                  <RiPauseLine />
                  {isKo ? "일시정지" : "Pause"}
                </>
              ) : (
                <>
                  <RiPlayLine />
                  {isKo ? "재생" : "Play"}
                </>
              )}
            </ControlBtn>
            <ControlBtn onClick={handleRestart}>
              <RiRestartLine />
              {isKo ? "다시보기" : "Replay"}
            </ControlBtn>
            <ControlBtn
              onClick={() => setSpeed((prev) => (prev === 1 ? 2 : 1))}
              style={{ minWidth: 46 }}
            >
              {speed}x
            </ControlBtn>
          </PlayerControls>

          <PlaybackStatus>
            <span className="rec-dot" />
            <span>
              {isPlaying
                ? isKo
                  ? "터미널 세션 레코딩 재생 중..."
                  : "Playing terminal session..."
                : isKo
                ? "재생 완료"
                : "Playback Complete"}
            </span>
          </PlaybackStatus>
        </PlayerControlBar>

        {/* Pure Black Terminal Screen */}
        <TerminalScreen>
          <PromptLine>
            <span className="host">macbook-pro</span>
            <span className="path">~</span>
            <span className="cmd">$ {activeScript.cmd}</span>
          </PromptLine>

          {displayedFrames.map((frame, idx) => (
            <LineText key={idx} colorType={frame.colorType}>
              {frame.text}
            </LineText>
          ))}
        </TerminalScreen>
      </TerminalFrame>
    </TerminalWrapper>
  );
}
