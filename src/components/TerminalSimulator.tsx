"use client";

import styled from "@emotion/styled";
import React, { useState } from "react";
import { RiPlayLine, RiTerminalBoxLine } from "react-icons/ri";

const TerminalFrame = styled.div`
  background-color: #0c0e14;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  font-family: var(--font-roboto-mono), monospace;
  max-width: 820px;
  margin: 2rem auto;
  text-align: left;
`;

const TerminalTitleBar = styled.div`
  background-color: #161922;
  padding: 0.65rem 1rem;
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
    &:nth-of-type(1) {
      background-color: #ff5f56;
    }
    &:nth-of-type(2) {
      background-color: #ffbd2e;
    }
    &:nth-of-type(3) {
      background-color: #27c93f;
    }
  }
`;

const TerminalTitle = styled.div`
  color: #8b949e;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const TerminalBody = styled.div`
  padding: 1.5rem;
  color: #e6edf3;
  font-size: 0.88rem;
  line-height: 1.5;
`;

const MenuHeader = styled.div`
  margin-bottom: 1.2rem;
  .brand {
    color: #29d0f5;
    font-weight: 700;
  }
  .subtitle {
    color: #8b949e;
    font-size: 0.82rem;
    margin-top: 0.25rem;
  }
`;

const PresetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const PresetItem = styled.div<{ isSelected: boolean }>`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: ${({ isSelected }) =>
    isSelected ? "rgba(41, 208, 245, 0.12)" : "rgba(255, 255, 255, 0.02)"};
  border: 1px solid
    ${({ isSelected }) =>
      isSelected ? "#29d0f5" : "rgba(255, 255, 255, 0.06)"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(41, 208, 245, 0.08);
    border-color: rgba(41, 208, 245, 0.5);
  }

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    color: ${({ isSelected }) => (isSelected ? "#ffffff" : "#c9d1d9")};
  }

  .pointer {
    color: #29d0f5;
    margin-right: 0.5rem;
  }

  .desc {
    color: #8b949e;
    font-size: 0.8rem;
    margin-top: 0.35rem;
    padding-left: 1.2rem;
  }

  .badge {
    font-size: 0.75rem;
    padding: 0.1rem 0.45rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    color: #8b949e;

    &.ready {
      background: rgba(39, 201, 63, 0.15);
      color: #27c93f;
    }
    &.missing {
      background: rgba(255, 189, 46, 0.15);
      color: #ffbd2e;
    }
  }
`;

const TerminalFooter = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #8b949e;
  font-size: 0.78rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
`;

const RunButton = styled.button`
  background: var(--accent-gradient, #00add8);
  color: #ffffff;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

export default function TerminalSimulator() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const presets = [
    {
      id: "quick",
      icon: "🚀",
      title: "Quick Setup (All Missing Essentials)",
      badge: "3 missing items",
      badgeType: "missing",
      desc: "Scan and install all missing recommended tools in one shot with parallel workers.",
      steps: [
        "🔍 [bun] Scanning macOS system environment...",
        "⚡ Spawning 3 concurrent goroutine workers...",
        "🐚 [Worker 1] Cloning Oh My Zsh & Powerlevel10k theme (simultaneous)...",
        "🍺 [Worker 2] Brew installing zoxide, fzf, ripgrep, eza...",
        "🖥️ [Worker 3] Linking /usr/local/bin/code -> VS Code CLI...",
        "📄 Generating ~/.zshrc.bun.bak backup and configuring prompt...",
        "✨ All tasks completed successfully in 4.2s!",
      ],
    },
    {
      id: "shell",
      icon: "🐚",
      title: "Shell & CLI Power Tools",
      badge: "1 missing",
      badgeType: "missing",
      desc: "Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git",
      steps: [
        "🐚 Checking zsh version: 5.9 (x86_64/arm64)",
        "✓ Oh My Zsh framework verified",
        "⬇️ Updating zsh-autosuggestions & syntax-highlighting plugins...",
        "✨ Shell environment optimized!",
      ],
    },
    {
      id: "runtimes",
      icon: "💻",
      title: "Dev Runtimes & Languages",
      badge: "✓ Ready",
      badgeType: "ready",
      desc: "Go (1.22+), Node.js (with npm), Python 3 (with pip)",
      steps: [
        "✓ Go installed (go1.22+)",
        "✓ Node.js installed (v20+ with npm)",
        "✓ Python 3 installed (with pip)",
        "✨ All runtime compilers and package managers verified!",
      ],
    },
    {
      id: "apps",
      icon: "🖥️",
      title: "Apps & Editors",
      badge: "✓ Ready",
      badgeType: "ready",
      desc: "Visual Studio Code (+ `code` CLI link) & Google Chrome",
      steps: [
        "✓ Google Chrome verified in /Applications",
        "✓ Visual Studio Code verified",
        "🔗 Testing symlink: `which code` -> ~/.local/bin/code (OK)",
        "✨ Applications ready!",
      ],
    },
    {
      id: "updates",
      icon: "🔄",
      title: "Check Status & Updates",
      badge: "Diagnostic",
      badgeType: "ready",
      desc: "Inspect installed tools and upgrade outdated packages & themes (`bun check` / `bun doctor`)",
      steps: [
        "🩺 bun doctor running...",
        "✓ OS: macOS darwin/arm64",
        "✓ Homebrew: Health OK",
        "✓ Shell hook: zoxide init zsh registered in ~/.zshrc",
        "✨ System diagnostic score: 100/100 Healthy!",
      ],
    },
  ];

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setProgress([]);

    const steps = presets[selectedIndex].steps;
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setProgress((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setTimeout(() => setSimulating(false), 800);
        }
      }, (idx + 1) * 450);
    });
  };

  return (
    <TerminalFrame>
      <TerminalTitleBar>
        <WindowButtons>
          <span />
          <span />
          <span />
        </WindowButtons>
        <TerminalTitle>
          <RiTerminalBoxLine />
          <span>bun — terminal preview (TUI)</span>
        </TerminalTitle>
        <div style={{ width: 40 }} />
      </TerminalTitleBar>

      <TerminalBody>
        <MenuHeader>
          <div className="brand">☕ coffee-bun • macOS MacBook Setup & Maintenance</div>
          <div className="subtitle">
            Choose a preset to run with <code>bun</code> (Max 5 curated choices, one-click install)
          </div>
        </MenuHeader>

        {!simulating && progress.length === 0 ? (
          <PresetList>
            {presets.map((item, index) => {
              const isSelected = selectedIndex === index;
              return (
                <PresetItem
                  key={item.id}
                  isSelected={isSelected}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="title-row">
                    <div>
                      <span className="pointer">{isSelected ? "▸" : " "}</span>
                      <span>
                        {item.icon} {item.title}
                      </span>
                    </div>
                    <span className={`badge ${item.badgeType}`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="desc">{item.desc}</div>
                </PresetItem>
              );
            })}
          </PresetList>
        ) : (
          <div
            style={{
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div style={{ color: "#29d0f5", fontWeight: 600, marginBottom: "0.5rem" }}>
              ⚡ Running: bun ({presets[selectedIndex].title})...
            </div>
            {progress.map((msg, i) => (
              <div
                key={i}
                style={{
                  color: msg.startsWith("✨")
                    ? "#27c93f"
                    : msg.startsWith("✓")
                    ? "#58a6ff"
                    : "#c9d1d9",
                  fontSize: "0.85rem",
                  paddingLeft: "0.5rem",
                }}
              >
                {msg}
              </div>
            ))}
            {simulating && (
              <div style={{ color: "#8b949e", fontSize: "0.8rem", marginTop: "0.5rem" }}>
                ⏳ Processing with Go routines in background...
              </div>
            )}
          </div>
        )}

        <TerminalFooter>
          <div>[↑/↓] Navigate • [Click] Select • [Run] Simulate <code>bun</code></div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {progress.length > 0 && !simulating && (
              <button
                onClick={() => setProgress([])}
                style={{
                  background: "transparent",
                  color: "#8b949e",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Reset TUI
              </button>
            )}
            <RunButton onClick={runSimulation} disabled={simulating}>
              <RiPlayLine />
              <span>{simulating ? "Executing..." : "Simulate Run"}</span>
            </RunButton>
          </div>
        </TerminalFooter>
      </TerminalBody>
    </TerminalFrame>
  );
}
