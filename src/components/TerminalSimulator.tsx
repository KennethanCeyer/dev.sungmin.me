"use client";

import styled from "@emotion/styled";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiPlayLine, RiRestartLine, RiTerminalBoxLine } from "react-icons/ri";

const TerminalFrame = styled.div`
  background-color: var(--code-block-bg);
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 10px;
  overflow: hidden;
  font-family: var(--font-roboto-mono), monospace;
  width: 100%;
  margin: 1.5rem auto 0;
  text-align: left;
`;

const TerminalTitleBar = styled.div`
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
  gap: 0.4rem;
`;

const TerminalBody = styled.div`
  padding: 1.75rem;
  color: var(--code-block-fg);
  font-size: 0.88rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
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
  padding: 0.75rem 1rem;
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
    font-size: 0.88rem;
    gap: 0.5rem;
  }

  .pointer {
    margin-right: 0.4rem;
    font-weight: 700;
  }

  .badge {
    font-size: 0.72rem;
    padding: 0.15rem 0.45rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.border};
    opacity: 0.85;
    white-space: nowrap;
  }

  .desc {
    font-size: 0.78rem;
    opacity: 0.65;
    margin-top: 0.3rem;
    padding-left: 1.1rem;
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
  opacity: 0.75;
  font-size: 0.8rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const ResetButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.4rem 0.85rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.border};
  }
`;

const RunButton = styled.button`
  background-color: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.body};
  padding: 0.4rem 0.95rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function TerminalSimulator() {
  const { t, i18n } = useTranslation();
  const isKo = i18n.language.startsWith("ko");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const presets = [
    {
      id: "quick",
      title: isKo
        ? "1. 퀵 셋업 (누락된 필수 항목 전체)"
        : "1. Quick Setup (All Missing Essentials)",
      badge: isKo ? "3개 항목 대기" : "3 pending",
      desc: isKo
        ? "고루틴 병렬 처리로 누락된 개발 도구를 원샷으로 스캔하고 설치합니다."
        : "Scan and install missing tools in one shot via parallel workers.",
      steps: isKo
        ? [
            "> bun install --all",
            "[info] macOS 환경 스캔 중 (darwin/arm64)...",
            "[worker-1] Oh My Zsh 및 Powerlevel10k 테마 다운로드...",
            "[worker-2] Homebrew 패키지 설치: zoxide, fzf, ripgrep, eza...",
            "[worker-3] code CLI 심링크 연결 -> /usr/local/bin/code...",
            "[ok] ~/.zshrc 백업 생성 완료 (~/.zshrc.bun.bak)",
            "[done] 3.8초 만에 전체 셋업이 완료되었습니다.",
          ]
        : [
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
      title: isKo ? "2. 쉘 환경 & CLI 도구" : "2. Shell & CLI Tools",
      badge: isKo ? "1개 항목 대기" : "1 pending",
      desc: isKo
        ? "Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git 설정"
        : "Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git",
      steps: isKo
        ? [
            "> bun install shell",
            "[ok] zsh 5.9 감지됨",
            "[worker] zsh-autosuggestions 및 syntax-highlighting 플러그인 업데이트...",
            "[done] 쉘 개발 환경 구성이 완료되었습니다.",
          ]
        : [
            "> bun install shell",
            "[ok] zsh 5.9 detected",
            "[worker] Updating zsh-autosuggestions and syntax-highlighting...",
            "[done] Shell environment configured.",
          ],
    },
    {
      id: "runtimes",
      title: isKo ? "3. 개발 런타임 환경" : "3. Dev Runtimes",
      badge: isKo ? "준비 완료" : "Ready",
      desc: isKo
        ? "Go 1.22+, Node.js(npm 포함), Python 3(pip 포함) 준비"
        : "Go 1.22+, Node.js (with npm), Python 3 (with pip)",
      steps: isKo
        ? [
            "> bun check runtimes",
            "[ok] go version go1.22+ darwin/arm64",
            "[ok] node v20+ / npm 10+",
            "[ok] python 3.11+ / pip",
            "[done] 모든 컴파일러 및 런타임이 정상 작동합니다.",
          ]
        : [
            "> bun check runtimes",
            "[ok] go version go1.22+ darwin/arm64",
            "[ok] node v20+ / npm 10+",
            "[ok] python 3.11+ / pip",
            "[done] All compilers and runtimes verified.",
          ],
    },
    {
      id: "apps",
      title: isKo ? "4. 필수 앱 & CLI 심링크" : "4. Applications & CLI Links",
      badge: isKo ? "준비 완료" : "Ready",
      desc: isKo
        ? "VS Code (+ code 명령어 심링크 자동 연결) 및 Chrome 브라우저"
        : "Visual Studio Code (+ code symlink) and Google Chrome",
      steps: isKo
        ? [
            "> bun check apps",
            "[ok] Visual Studio Code 설치 확인 (/Applications/Visual Studio Code.app)",
            "[ok] CLI 심링크 연결 확인: which code -> ~/.local/bin/code",
            "[ok] Google Chrome 설치 확인 (/Applications/Google Chrome.app)",
            "[done] 필수 애플리케이션 및 CLI 링크 검증 완료.",
          ]
        : [
            "> bun check apps",
            "[ok] Visual Studio Code (/Applications/Visual Studio Code.app)",
            "[ok] CLI symlink: which code -> ~/.local/bin/code",
            "[ok] Google Chrome (/Applications/Google Chrome.app)",
            "[done] Applications verified.",
          ],
    },
    {
      id: "doctor",
      title: isKo ? "5. 환경 무결성 진단" : "5. Diagnostic Check",
      badge: isKo ? "검증 완료" : "Passed",
      desc: isKo
        ? "PATH 환경변수, Homebrew 권한, 쉘 설정 무결성 검증"
        : "Audit PATH, Homebrew permissions, shell configurations",
      steps: isKo
        ? [
            "> bun doctor",
            "[ok] 운영체제: macOS darwin/arm64",
            "[ok] Homebrew: 정상 설치 및 PATH 등록 확인",
            "[ok] 쉘 훅: ~/.zshrc 파일에 zoxide 및 테마 훅 등록 확인",
            "[done] 진단 결과: 정상 (발견된 오류 0개).",
          ]
        : [
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
          setTimeout(() => setSimulating(false), 500);
        }
      }, (idx + 1) * 380);
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
          <span>{isKo ? "bun — 터미널 인터페이스" : "bun — terminal interface"}</span>
        </TerminalTitle>
        <div style={{ width: 36 }} />
      </TerminalTitleBar>

      <TerminalBody>
        <MenuHeader>
          <div className="brand">
            {isKo
              ? "coffee-bun • macOS 맥북 자동 셋업 및 유지보수 도구"
              : "coffee-bun • macOS Setup & Maintenance"}
          </div>
          <div className="subtitle">
            {isKo
              ? "엄선된 프리셋 선택 (실행 명령어: bun)"
              : "Curated preset selection (command: bun)"}
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
              minHeight: 220,
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
                  opacity: msg.startsWith(">") ? 1 : 0.85,
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
                {isKo
                  ? "... 백그라운드 고루틴 병렬 처리 실행 중"
                  : "... executing goroutines in background"}
              </div>
            )}
          </div>
        )}

        <TerminalFooter>
          <div>
            {isKo
              ? "프리셋을 클릭하여 단계별 실행 절차를 시뮬레이션할 수 있습니다."
              : "Click presets to inspect automated steps."}
          </div>
          <ActionButtons>
            {progress.length > 0 && !simulating && (
              <ResetButton onClick={() => setProgress([])}>
                <RiRestartLine />
                <span>{isKo ? "초기화" : "Reset"}</span>
              </ResetButton>
            )}
            <RunButton onClick={runSimulation} disabled={simulating}>
              <RiPlayLine />
              <span>
                {simulating
                  ? isKo
                    ? "실행 중..."
                    : "Running..."
                  : isKo
                  ? "실행 시뮬레이션"
                  : "Run Simulation"}
              </span>
            </RunButton>
          </ActionButtons>
        </TerminalFooter>
      </TerminalBody>
    </TerminalFrame>
  );
}
