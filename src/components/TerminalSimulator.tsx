"use client";

import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RiCheckLine,
  RiPauseLine,
  RiPlayLine,
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
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  overflow: hidden;
  transition: background-color 0.25s ease, border-color 0.25s ease;
`;

const TerminalHeader = styled.div`
  background-color: var(--color-background);
  padding: 0.65rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border-weak);
`;

const WindowButtons = styled.div`
  display: flex;
  gap: 6px;
  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    background-color: var(--color-border);
  }
`;

const TerminalTitle = styled.div`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  letter-spacing: 0.02em;
`;

const SubcommandBar = styled.div`
  display: flex;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border-weak);
  overflow-x: auto;
  padding: 0 0.5rem;
`;

const SubcommandTab = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  padding: 0.75rem 1rem;
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.text};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  border-bottom: 2px solid
    ${({ isActive, theme }) => (isActive ? theme.text : "transparent")};
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.45rem;
  transition: all 0.15s ease;

  &:hover {
    opacity: 1;
    background-color: var(--color-border-weak);
  }

  .badge {
    font-size: 0.7rem;
    padding: 0.1rem 0.38rem;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.border};
    background-color: var(--code-block-bg);
    color: ${({ theme }) => theme.text};
    opacity: 0.75;
  }
`;

const PlayerControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.25rem;
  background-color: var(--color-background);
  border-bottom: 1px dashed var(--color-border-weak);
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.85;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ControlBtn = styled.button`
  background: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
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
    background: var(--color-border-weak);
    border-color: ${({ theme }) => theme.text};
  }
`;

const PlaybackStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  opacity: 0.75;

  .rec-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.text};
    display: inline-block;
  }
`;

const TerminalScreen = styled.div`
  padding: 1.5rem 1.75rem;
  background-color: var(--code-block-bg);
  color: var(--code-block-fg);
  font-size: 0.85rem;
  line-height: 1.55;
  min-height: 400px;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1.15rem;
    font-size: 0.78rem;
    min-height: 360px;
  }
`;

const PromptLine = styled.div`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .host {
    opacity: 0.65;
  }
  .path {
    opacity: 0.5;
  }
  .cmd {
    font-weight: 600;
  }
`;

const LineText = styled.div<{ tone?: "strong" | "muted" | "normal" }>`
  font-family: var(--font-roboto-mono), monospace;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.text};
  font-weight: ${({ tone }) => (tone === "strong" ? 600 : 400)};
  opacity: ${({ tone }) =>
    tone === "strong" ? 1 : tone === "muted" ? 0.55 : 0.85};
`;

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const TreeHeader = styled.div`
  margin-bottom: 0.9rem;
  .ascii-banner {
    margin: 0 0 0.75rem;
    font-family: var(--font-roboto-mono), monospace;
    font-variant-ligatures: none;
    font-feature-settings: "liga" 0, "calt" 0;
    font-size: 0.72rem;
    line-height: 1.18;
    letter-spacing: 0;
    color: ${({ theme }) => theme.text};
    opacity: 0.9;
    white-space: pre;
    overflow-x: auto;
  }
  .brand {
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
  .subtext {
    font-size: 0.78rem;
    opacity: 0.65;
    margin-top: 0.2rem;
  }
`;

const CategoryRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--color-border-weak);
  }

  .toggle-icon {
    opacity: 0.7;
    font-family: monospace;
    width: 22px;
    display: inline-block;
  }

  .cat-name {
    flex: 1;
  }

  .cat-badge {
    font-size: 0.72rem;
    font-weight: 400;
    opacity: 0.65;
    border: 1px solid ${({ theme }) => theme.border};
    padding: 0.1rem 0.4rem;
    border-radius: 3px;
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-left: 1.8rem;
  margin-bottom: 0.5rem;
`;

const ItemRow = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.82rem;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--color-border-weak);
  }

  .item-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .checkbox {
    font-family: monospace;
    opacity: ${({ isSelected }) => (isSelected ? 1 : 0.6)};
    font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
  }

  .item-name {
    color: ${({ theme }) => theme.text};
    font-weight: 500;
  }

  .item-right {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 0.75rem;
  }

  .item-version {
    opacity: 0.65;
  }

  .item-status {
    padding: 0.1rem 0.45rem;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.border};
    font-size: 0.7rem;

    &.installed {
      opacity: 0.85;
      color: ${({ theme }) => theme.text};
    }

    &.missing {
      opacity: 0.55;
      border-style: dashed;
    }
  }
`;

const ActionBar = styled.div`
  margin-top: 1.25rem;
  padding-top: 0.85rem;
  border-top: 1px dashed var(--color-border-weak);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const TUIButton = styled.button<{ primary?: boolean }>`
  font-family: var(--font-roboto-mono), monospace;
  font-size: 0.78rem;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all 0.15s ease;

  ${({ primary, theme }) =>
    primary
      ? `
    background-color: ${theme.text};
    color: ${theme.body};
    border: 1px solid ${theme.text};
    font-weight: 600;
    &:hover {
      opacity: 0.85;
    }
  `
      : `
    background-color: transparent;
    color: ${theme.text};
    border: 1px solid ${theme.border};
    opacity: 0.8;
    &:hover {
      opacity: 1;
      background-color: var(--color-border-weak);
    }
  `}
`;

const TUIHelpBar = styled.div`
  font-size: 0.72rem;
  opacity: 0.55;
  margin-top: 0.5rem;
`;

type SubcommandType = "bun" | "install" | "check" | "doctor" | "update";

interface AnimationFrame {
  text: string;
  tone?: "strong" | "muted" | "normal";
}

export default function TerminalSimulator() {
  const { i18n } = useTranslation();
  const isKo = i18n.language.startsWith("ko");

  const [activeSubcommand, setActiveSubcommand] =
    useState<SubcommandType>("bun");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(1);

  // Interactive Tree TUI state
  const [foldedCategories, setFoldedCategories] = useState<
    Record<string, boolean>
  >({
    shell: false,
    editor: false,
    lang: false,
    cloud: true,
    tools: true,
  });

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    "iTerm2 Font Config": true,
    "Ultimate Vim Runtime": true,
    "Java (OpenJDK)": true,
    "Azure CLI (az)": true,
  });

  const toggleFold = (catKey: string) => {
    setFoldedCategories((prev) => ({
      ...prev,
      [catKey]: !prev[catKey],
    }));
  };

  const toggleItem = (itemKey: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const selectAllMissing = () => {
    setSelectedItems({
      "iTerm2 Font Config": true,
      "Ultimate Vim Runtime": true,
      "Java (OpenJDK)": true,
      "Azure CLI (az)": true,
    });
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  const scriptMap: Record<
    Exclude<SubcommandType, "bun">,
    { cmd: string; frames: AnimationFrame[] }
  > = {
    install: {
      cmd: "bun install all",
      frames: [
        {
          text: "[coffee-bun] Initializing concurrent workstation provisioning...",
          tone: "strong",
        },
        {
          text: "[coffee-bun] Platform: macOS darwin/arm64 | Goroutines: 8 workers\n",
          tone: "muted",
        },
        {
          text: "[brew] Installing openjdk (Java 21)...",
          tone: "normal",
        },
        {
          text: "  ↳ Downloading bottle: 184MB / 184MB [====================] 100%",
          tone: "muted",
        },
        {
          text: "[git]  Cloning amix/vimrc (Ultimate Vim Runtime)...",
          tone: "normal",
        },
        {
          text: "  ↳ Receiving objects: 100% (1420/1420), 1.2 MiB | 5.4 MiB/s, done.",
          tone: "muted",
        },
        {
          text: "[font] Downloading MesloLGS NF fonts (Regular, Bold, Italic)...",
          tone: "normal",
        },
        {
          text: "  ↳ ~/Library/Fonts/MesloLGS-NF-Regular.ttf verified.\n",
          tone: "muted",
        },
        {
          text: "✓ [font] MesloLGS NF font suite successfully installed",
          tone: "normal",
        },
        {
          text: "✓ [iterm2] Default profile configured: MesloLGS-NF-Regular 16pt + Brogrammer",
          tone: "normal",
        },
        {
          text: "✓ [editor] Ultimate Vim Runtime configured in ~/.vim_runtime",
          tone: "normal",
        },
        {
          text: "✓ [brew] OpenJDK 21 symlinked: /Library/Java/JavaVirtualMachines/openjdk.jdk",
          tone: "normal",
        },
        {
          text: "✓ [cli] VS Code CLI linked: /usr/local/bin/code",
          tone: "normal",
        },
        {
          text: "✓ [app] Google Chrome installed & set as default system browser",
          tone: "normal",
        },
        {
          text: "✓ [shell] Verified ~/.zshrc hooks and Powerlevel10k prompt\n",
          tone: "normal",
        },
        {
          text: "------------------------------------------------------------------------",
          tone: "muted",
        },
        {
          text: isKo
            ? "[done] 워크스테이션 구축 완료 (28.4s) — 모든 18개 패키지 및 설정 검증됨"
            : "[done] Workstation setup complete in 28.4s — All 18 packages verified",
          tone: "strong",
        },
      ],
    },
    check: {
      cmd: "bun check",
      frames: [
        {
          text: "CATEGORY     PACKAGE                 VERSION         STATUS",
          tone: "strong",
        },
        {
          text: "------------------------------------------------------------------------",
          tone: "muted",
        },
        {
          text: "[shell]      iTerm2                  3.7.6           ✓ installed",
          tone: "normal",
        },
        {
          text: "[shell]      MesloLGS NF Font        4 font files    ✓ installed",
          tone: "normal",
        },
        {
          text: "[shell]      iTerm2 Font Plist       16pt Regular    - missing",
          tone: "muted",
        },
        {
          text: "[shell]      Brogrammer Theme        Custom Preset   ✓ installed",
          tone: "normal",
        },
        {
          text: "[shell]      Oh My Zsh               master/964ddf7  ✓ installed",
          tone: "normal",
        },
        {
          text: "[shell]      Powerlevel10k           v1.20.0         ✓ installed",
          tone: "normal",
        },
        {
          text: "[editor]     Ultimate Vim Runtime    amix/vimrc      - missing",
          tone: "muted",
        },
        {
          text: "[editor]     Visual Studio Code      1.142.0         ✓ installed",
          tone: "normal",
        },
        {
          text: "[editor]     VS Code CLI (code)      /usr/local/bin  ✓ installed",
          tone: "normal",
        },
        {
          text: "[lang]       Go                      go1.27.2        ✓ installed",
          tone: "normal",
        },
        {
          text: "[lang]       Python 3                Python 3.15.0   ✓ installed",
          tone: "normal",
        },
        {
          text: "[lang]       Java (OpenJDK)          openjdk-21      - missing",
          tone: "muted",
        },
        {
          text: "[lang]       Node.js                 v26.12.0        ✓ installed",
          tone: "normal",
        },
        {
          text: "[cloud]      AWS CLI                 v2.22.1         ✓ installed",
          tone: "normal",
        },
        {
          text: "[cloud]      Google Cloud SDK        506.0.0         ✓ installed",
          tone: "normal",
        },
        {
          text: "[tools]      zoxide, fzf, rg, bat    latest          ✓ all active\n",
          tone: "normal",
        },
        {
          text: "------------------------------------------------------------------------",
          tone: "muted",
        },
        {
          text: "Summary: 15 installed, 3 missing. Run 'bun' or 'bun install all' to resolve.",
          tone: "strong",
        },
      ],
    },
    doctor: {
      cmd: "bun doctor",
      frames: [
        {
          text: "[coffee-bun] Running workstation health diagnostics...\n",
          tone: "strong",
        },
        {
          text: "[1/7] Operating System: macOS 15.0 Sequoia (darwin/arm64)          [ PASS ]",
          tone: "normal",
        },
        {
          text: "[2/7] Homebrew: /opt/homebrew/bin/brew (v4.4.1)                   [ PASS ]",
          tone: "normal",
        },
        {
          text: "[3/7] Shell Framework: /bin/zsh with Oh My Zsh active             [ PASS ]",
          tone: "normal",
        },
        {
          text: "[4/7] Prompt Theme: Powerlevel10k configured in ~/.zshrc          [ PASS ]",
          tone: "normal",
        },
        {
          text: "[5/7] Terminal Font: MesloLGS NF detected in ~/Library/Fonts       [ PASS ]",
          tone: "normal",
        },
        {
          text: "[6/7] Editor CLI: /usr/local/bin/code symlinked to PATH           [ PASS ]",
          tone: "normal",
        },
        {
          text: "[7/7] Modern CLI Suite: zoxide, rg, fzf, bat, eza in PATH         [ PASS ]\n",
          tone: "normal",
        },
        {
          text: "------------------------------------------------------------------------",
          tone: "muted",
        },
        {
          text: isKo
            ? "✓ 환경 진단 통과: 7/7 진단 항목이 모두 정상입니다."
            : "✓ Doctor Verdict: All 7/7 diagnostics verified. Zero conflicts found.",
          tone: "strong",
        },
      ],
    },
    update: {
      cmd: "bun update",
      frames: [
        {
          text: "[coffee-bun] Starting concurrent update of all packages and repositories...\n",
          tone: "strong",
        },
        {
          text: "==> [brew] Updating Homebrew formulae and casks...",
          tone: "normal",
        },
        {
          text: "    ↳ Already up-to-date.",
          tone: "muted",
        },
        {
          text: "==> [git]  Pulling latest commits for Oh My Zsh (master)...",
          tone: "normal",
        },
        {
          text: "    ↳ Current branch master is up to date.",
          tone: "muted",
        },
        {
          text: "==> [git]  Pulling latest commits for Powerlevel10k...",
          tone: "normal",
        },
        {
          text: "    ↳ Fast-forwarding: d05a1b0..e84a2f1 (2 commits)",
          tone: "muted",
        },
        {
          text: "==> [git]  Updating zsh-autosuggestions & zsh-syntax-highlighting...",
          tone: "normal",
        },
        {
          text: "    ↳ Verified latest git tags.",
          tone: "muted",
        },
        {
          text: "==> [git]  Syncing Ultimate Vim Runtime (amix/vimrc)...",
          tone: "normal",
        },
        {
          text: "    ↳ Already up-to-date.\n",
          tone: "muted",
        },
        {
          text: "------------------------------------------------------------------------",
          tone: "muted",
        },
        {
          text: isKo
            ? "✓ 모든 14개 패키지, Formulae, Cask 및 Git 저장소가 최신 상태입니다."
            : "✓ All 14 packages, formulae, casks, and git repos successfully up-to-date.",
          tone: "strong",
        },
      ],
    },
  };

  const handleSelectSubcommand = (sub: SubcommandType) => {
    setActiveSubcommand(sub);
    if (sub !== "bun") {
      setCurrentFrameIndex(0);
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    setCurrentFrameIndex(0);
    setIsPlaying(true);
  };

  const activeScript =
    activeSubcommand !== "bun" ? scriptMap[activeSubcommand] : null;

  useEffect(() => {
    if (activeSubcommand === "bun" || !isPlaying || !activeScript) return;

    if (currentFrameIndex >= activeScript.frames.length) {
      setIsPlaying(false);
      return;
    }

    const delay = Math.max(60, Math.floor(140 / speed));
    const timer = setTimeout(() => {
      setCurrentFrameIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [activeSubcommand, isPlaying, currentFrameIndex, activeScript, speed]);

  const displayedFrames = activeScript
    ? activeScript.frames.slice(0, currentFrameIndex)
    : [];

  return (
    <TerminalWrapper>
      <TerminalFrame>
        <TerminalHeader>
          <WindowButtons>
            <span />
            <span />
            <span />
          </WindowButtons>
          <TerminalTitle>
            <RiTerminalBoxLine />
            coffee-bun ~ macOS MacBook Setup &amp; Maintenance (CLI: bun)
          </TerminalTitle>
          <div style={{ width: 40 }} />
        </TerminalHeader>

        <SubcommandBar>
          <SubcommandTab
            isActive={activeSubcommand === "bun"}
            onClick={() => handleSelectSubcommand("bun")}
          >
            <span>1. bun</span>
            <span className="badge">
              {isKo ? "대화형 트리" : "Interactive Tree"}
            </span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "install"}
            onClick={() => handleSelectSubcommand("install")}
          >
            <span>2. bun install all</span>
            <span className="badge">
              {isKo ? "병렬 설치" : "Live Stream"}
            </span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "check"}
            onClick={() => handleSelectSubcommand("check")}
          >
            <span>3. bun check</span>
            <span className="badge">{isKo ? "버전 점검" : "Inspection"}</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "doctor"}
            onClick={() => handleSelectSubcommand("doctor")}
          >
            <span>4. bun doctor</span>
            <span className="badge">{isKo ? "환경 진단" : "Diagnostics"}</span>
          </SubcommandTab>
          <SubcommandTab
            isActive={activeSubcommand === "update"}
            onClick={() => handleSelectSubcommand("update")}
          >
            <span>5. bun update</span>
            <span className="badge">{isKo ? "통합 업데이트" : "Upgrader"}</span>
          </SubcommandTab>
        </SubcommandBar>

        {activeSubcommand !== "bun" && (
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
                    ? "터미널 세션 시뮬레이션 중..."
                    : "Simulating terminal session..."
                  : isKo
                  ? "출력 완료"
                  : "Output Complete"}
              </span>
            </PlaybackStatus>
          </PlayerControlBar>
        )}

        <TerminalScreen>
          {activeSubcommand === "bun" ? (
            <TreeContainer>
              <TreeHeader>
                <pre className="ascii-banner">{`      ▄▄██████▄▄         ▄▀▀▀ ▄▀▀▄ █▀▀▀ █▀▀▀ █▀▀▀ █▀▀▀
   ▄██▀▀▀▀▀▀▀▀▀▀██▄      █    █  █ █▀▀  █▀▀  █▀▀  █▀▀ 
  ██▀ ▄▄██████▄▄ ▀██     ▀▄▄▄ ▀▄▄▀ ▀    ▀    ▀▄▄▄ ▀▄▄▄
 ██▀ ██▀▀▀▀▀▀▀▀██ ▀██    █▀▀▄ █  █ █▄ █
▄██▄▄████████████▄▄██▄   █▀▀▄ █  █ █ ▀█
 ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀    ▀▀▀   ▀▀  ▀  ▀`}</pre>
                <div className="brand">
                  coffee-bun (bun) - macOS Setup &amp; Environment Manager
                </div>
                <div className="subtext">
                  {isKo
                    ? "카테고리를 클릭해 접거나 펼치고, 누락된 패키지를 선택한 뒤 하단 버튼으로 설치를 실행해보세요."
                    : "Fold/Unfold groups, toggle missing packages, and run installation from the action bar below."}
                </div>
              </TreeHeader>

              {/* [shell] Terminal & Shell */}
              <CategoryRow onClick={() => toggleFold("shell")}>
                <span className="toggle-icon">
                  {foldedCategories.shell ? "[+]" : "[-]"}
                </span>
                <span className="cat-name">
                  [shell] Terminal &amp; Shell (iTerm2, Fonts, OMZ, p10k)
                </span>
                <span className="cat-badge">6/8 installed</span>
              </CategoryRow>

              {!foldedCategories.shell && (
                <ItemList>
                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">iTerm2</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">3.7.6</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">MesloLGS NF Font</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">~/Library/Fonts</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>

                  <ItemRow
                    isSelected={!!selectedItems["iTerm2 Font Config"]}
                    onClick={() => toggleItem("iTerm2 Font Config")}
                  >
                    <div className="item-left">
                      <span className="checkbox">
                        {selectedItems["iTerm2 Font Config"] ? "[+]" : "[ ]"}
                      </span>
                      <span className="item-name">iTerm2 Font Config</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">MesloLGS-NF-Regular 16</span>
                      <span className="item-status missing">missing</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Brogrammer Theme</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">iTerm2 Profile</span>
                      <span className="item-status installed">Preset Ready</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Oh My Zsh</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">master (964ddf7)</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Powerlevel10k</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">v1.20.0</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>
                </ItemList>
              )}

              {/* [editor] Editors & Vim Runtime */}
              <CategoryRow onClick={() => toggleFold("editor")}>
                <span className="toggle-icon">
                  {foldedCategories.editor ? "[+]" : "[-]"}
                </span>
                <span className="cat-name">
                  [editor] Editors &amp; Vim Runtime (amix/vimrc, VS Code)
                </span>
                <span className="cat-badge">2/3 installed</span>
              </CategoryRow>

              {!foldedCategories.editor && (
                <ItemList>
                  <ItemRow
                    isSelected={!!selectedItems["Ultimate Vim Runtime"]}
                    onClick={() => toggleItem("Ultimate Vim Runtime")}
                  >
                    <div className="item-left">
                      <span className="checkbox">
                        {selectedItems["Ultimate Vim Runtime"] ? "[+]" : "[ ]"}
                      </span>
                      <span className="item-name">Ultimate Vim Runtime</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">amix/vimrc</span>
                      <span className="item-status missing">missing</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Visual Studio Code</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">1.142.0</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">VS Code CLI (code)</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">/usr/local/bin/code</span>
                      <span className="item-status installed">Symlinked</span>
                    </div>
                  </ItemRow>
                </ItemList>
              )}

              {/* [lang] Compilers & Languages */}
              <CategoryRow onClick={() => toggleFold("lang")}>
                <span className="toggle-icon">
                  {foldedCategories.lang ? "[+]" : "[-]"}
                </span>
                <span className="cat-name">
                  [lang] Compilers &amp; Languages (Go, Python, Java, Node)
                </span>
                <span className="cat-badge">4/5 installed</span>
              </CategoryRow>

              {!foldedCategories.lang && (
                <ItemList>
                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Go</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">go1.27.2</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Python 3</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">Python 3.15.0 (pip)</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>

                  <ItemRow
                    isSelected={!!selectedItems["Java (OpenJDK)"]}
                    onClick={() => toggleItem("Java (OpenJDK)")}
                  >
                    <div className="item-left">
                      <span className="checkbox">
                        {selectedItems["Java (OpenJDK)"] ? "[+]" : "[ ]"}
                      </span>
                      <span className="item-name">Java (OpenJDK)</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">openjdk-21</span>
                      <span className="item-status missing">missing</span>
                    </div>
                  </ItemRow>

                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Node.js</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">v26.12.0 (npm)</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>
                </ItemList>
              )}

              {/* [cloud] & [tools] Folded summaries */}
              <CategoryRow onClick={() => toggleFold("cloud")}>
                <span className="toggle-icon">
                  {foldedCategories.cloud ? "[+]" : "[-]"}
                </span>
                <span className="cat-name">
                  [cloud] Cloud &amp; DevOps CLIs (AWS, Google Cloud SDK, Azure)
                </span>
                <span className="cat-badge">2/3 installed</span>
              </CategoryRow>

              {!foldedCategories.cloud && (
                <ItemList>
                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">AWS CLI</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">2.22.1</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>
                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">Google Cloud SDK (gcloud)</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">506.0.0</span>
                      <span className="item-status installed">Installed</span>
                    </div>
                  </ItemRow>
                  <ItemRow
                    isSelected={!!selectedItems["Azure CLI (az)"]}
                    onClick={() => toggleItem("Azure CLI (az)")}
                  >
                    <div className="item-left">
                      <span className="checkbox">
                        {selectedItems["Azure CLI (az)"] ? "[+]" : "[ ]"}
                      </span>
                      <span className="item-name">Azure CLI (az)</span>
                    </div>
                    <div className="item-right">
                      <span className="item-version">2.67.0</span>
                      <span className="item-status missing">missing</span>
                    </div>
                  </ItemRow>
                </ItemList>
              )}

              <CategoryRow onClick={() => toggleFold("tools")}>
                <span className="toggle-icon">
                  {foldedCategories.tools ? "[+]" : "[-]"}
                </span>
                <span className="cat-name">
                  [tools] Modern CLI Suite (zoxide, htop, fzf, ripgrep, eza, bat)
                </span>
                <span className="cat-badge">8/8 installed</span>
              </CategoryRow>

              {!foldedCategories.tools && (
                <ItemList>
                  <ItemRow isSelected={false} onClick={() => {}}>
                    <div className="item-left">
                      <span className="checkbox">[x]</span>
                      <span className="item-name">
                        zoxide, ripgrep, fzf, bat, eza, htop, tree, jq
                      </span>
                    </div>
                    <div className="item-right">
                      <span className="item-status installed">All Active</span>
                    </div>
                  </ItemRow>
                </ItemList>
              )}

              <ActionBar>
                <ActionButtons>
                  <TUIButton onClick={() => handleSelectSubcommand("check")}>
                    &lt; {isKo ? "상태 점검" : "Check Status"}
                  </TUIButton>
                  <TUIButton onClick={selectAllMissing}>
                    <RiCheckLine />
                    {isKo ? "누락 항목 선택 (m)" : "Select Missing (m)"}
                  </TUIButton>
                </ActionButtons>

                <ActionButtons>
                  <TUIButton
                    primary
                    onClick={() => handleSelectSubcommand("install")}
                  >
                    <RiPlayLine />
                    Start Install ({selectedCount}) &gt;
                  </TUIButton>
                </ActionButtons>
              </ActionBar>

              <TUIHelpBar>
                {isKo
                  ? "[Tab/←/→] 버튼 포커스 | [Enter] 실행 | [Space] 항목 토글 | [m] 누락 선택 | [q] 종료"
                  : "[Tab/←/→] Buttons | [Enter] Run | [Space] Toggle | [m] Missing | [q] Quit"}
              </TUIHelpBar>
            </TreeContainer>
          ) : (
            <>
              <PromptLine>
                <span className="host">macbook-pro</span>
                <span className="path">~</span>
                <span className="cmd">$ {activeScript?.cmd}</span>
              </PromptLine>

              {displayedFrames.map((frame, idx) => (
                <LineText key={idx} tone={frame.tone}>
                  {frame.text}
                </LineText>
              ))}
            </>
          )}
        </TerminalScreen>
      </TerminalFrame>
    </TerminalWrapper>
  );
}
