"use client";

import styled from "@emotion/styled";
import React, { useState } from "react";
import { RiPlayLine, RiTerminalBoxLine } from "react-icons/ri";

const TerminalFrame = styled.div`
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  overflow: hidden;
  font-family: var(--font-roboto-mono), monospace;
  max-width: 820px;
  margin: 2rem auto;
  text-align: left;
`;

const TerminalTitleBar = styled.div`
  background-color: var(--color-background);
  padding: 0.6rem 1rem;
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
  gap: 0.4rem;
`;

const TerminalBody = styled.div`
  padding: 1.5rem;
  color: var(--code-block-fg);
  font-size: 0.88rem;
  line-height: 1.5;
`;

const MenuHeader = styled.div`
  margin-bottom: 1.2rem;
  .brand {
    color: ${({ theme }) => theme.text};
    font-weight: 600;
  }
  .subtitle {
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
    font-size: 0.8rem;
    margin-top: 0.2rem;
  }
`;

const PresetList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const PresetItem = styled.div<{ isSelected: boolean }>`
  padding: 0.7rem 0.9rem;
  border-radius: 6px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.border : "transparent"};
  border: 1px solid
    ${({ isSelected, theme }) =>
      isSelected ? theme.text : "transparent"};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
    font-size: 0.86rem;
  }

  .pointer {
    margin-right: 0.4rem;
    font-weight: 600;
  }

  .desc {
    color: ${({ theme }) => theme.text};
    opacity: 0.65;
    font-size: 0.78rem;
    margin-top: 0.25rem;
    padding-left: 1rem;
  }

  .badge {
    font-size: 0.72rem;
    padding: 0.1rem 0.45rem;
    border-radius: 3px;
    border: 1px solid var(--color-border-weak);
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }
`;

const TerminalFooter = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-border-weak);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.78rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
`;

const RunButton = styled.button`
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  padding: 0.35rem 0.85rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export default function TerminalSimulator() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const presets = [
    {
      id: "quick",
      title: "1. Quick Setup (All Missing Essentials)",
      badge: "3 pending",
      desc: "Scan and install missing tools in one shot via parallel workers.",
      steps: [
        "> bun install --all",
        "[info] Scanning macOS environment (darwin/arm64)...",
        "[worker-1] Fetching Oh My Zsh and Powerlevel10k theme...",
        "[worker-2] Installing formula: zoxide, fzf, ripgrep, eza...",
        "[worker-3] Linking code CLI -> /usr/local/bin/code...",
        "[ok] Backup created at ~/.zshrc.bun.bak",
        "[done] Setup completed successfully in 3.8s.",
      ],
    },
    {
      id: "shell",
      title: "2. Shell & CLI Tools",
      badge: "1 pending",
      desc: "Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git",
      steps: [
        "> bun install shell",
        "[ok] zsh 5.9 detected",
        "[worker] Updating zsh-autosuggestions and syntax-highlighting...",
        "[done] Shell environment configured.",
      ],
    },
    {
      id: "runtimes",
      title: "3. Dev Runtimes",
      badge: "Ready",
      desc: "Go 1.22+, Node.js (with npm), Python 3 (with pip)",
      steps: [
        "> bun check runtimes",
        "[ok] go version go1.22+ darwin/arm64",
        "[ok] node v20+ / npm 10+",
        "[ok] python 3.11+ / pip",
        "[done] All compilers and runtimes verified.",
      ],
    },
    {
      id: "apps",
      title: "4. Applications & CLI Links",
      badge: "Ready",
      desc: "Visual Studio Code (+ code symlink) and Google Chrome",
      steps: [
        "> bun check apps",
        "[ok] Visual Studio Code (/Applications/Visual Studio Code.app)",
        "[ok] CLI symlink: which code -> ~/.local/bin/code",
        "[ok] Google Chrome (/Applications/Google Chrome.app)",
        "[done] Applications verified.",
      ],
    },
    {
      id: "doctor",
      title: "5. Diagnostic Check",
      badge: "Diagnostic",
      desc: "Environment inspection, configuration verification, and upgrades",
      steps: [
        "> bun doctor",
        "[ok] OS: macOS darwin/arm64",
        "[ok] Homebrew: Installed and in PATH",
        "[ok] Shell hooks: zoxide init registered in ~/.zshrc",
        "[done] Diagnostic report: Clean (0 errors).",
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
          setTimeout(() => setSimulating(false), 600);
        }
      }, (idx + 1) * 400);
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
          <span>bun — terminal interface</span>
        </TerminalTitle>
        <div style={{ width: 36 }} />
      </TerminalTitleBar>

      <TerminalBody>
        <MenuHeader>
          <div className="brand">coffee-bun • macOS Setup & Maintenance</div>
          <div className="subtitle">
            Curated preset selection (command: <code>bun</code>)
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
                      <span className="pointer">{isSelected ? ">" : " "}</span>
                      <span>{item.title}</span>
                    </div>
                    <span className="badge">{item.badge}</span>
                  </div>
                  <div className="desc">{item.desc}</div>
                </PresetItem>
              );
            })}
          </PresetList>
        ) : (
          <div
            style={{
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
            }}
          >
            {progress.map((msg, i) => (
              <div
                key={i}
                style={{
                  color: msg.startsWith(">")
                    ? "var(--color-text)"
                    : msg.startsWith("[ok]") || msg.startsWith("[done]")
                    ? "var(--color-text)"
                    : "inherit",
                  opacity: msg.startsWith(">") ? 1 : 0.8,
                  fontSize: "0.85rem",
                  paddingLeft: "0.4rem",
                }}
              >
                {msg}
              </div>
            ))}
            {simulating && (
              <div
                style={{
                  opacity: 0.5,
                  fontSize: "0.8rem",
                  marginTop: "0.4rem",
                  paddingLeft: "0.4rem",
                }}
              >
                ... executing goroutines in background
              </div>
            )}
          </div>
        )}

        <TerminalFooter>
          <div>Select preset with cursor • Run simulation</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {progress.length > 0 && !simulating && (
              <button
                onClick={() => setProgress([])}
                style={{
                  background: "transparent",
                  color: "inherit",
                  border: "1px solid var(--color-border)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.78rem",
                }}
              >
                Reset
              </button>
            )}
            <RunButton onClick={runSimulation} disabled={simulating}>
              <RiPlayLine />
              <span>{simulating ? "Running..." : "Run"}</span>
            </RunButton>
          </div>
        </TerminalFooter>
      </TerminalBody>
    </TerminalFrame>
  );
}
