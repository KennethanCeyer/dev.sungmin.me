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
  line-height: 1.55;

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
    opacity: 0.65;
    font-size: 0.82rem;
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
    font-size: 0.8rem;
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
  const { i18n } = useTranslation();
  const isKo = i18n.language.startsWith("ko");

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);

  const presets = [
    {
      id: "install",
      title: isKo
        ? "1. bun install (bundle.yml 기반 일괄 설치)"
        : "1. bun install (Provision via bundle.yml)",
      badge: "bundle.yml",
      desc: isKo
        ? "bundle.yml 매니페스트에 선언된 언어, 툴체인, 앱을 자동 감지하여 설치합니다."
        : "Read bundle.yml manifest and provision all declared languages, tools, and apps.",
      steps: isKo
        ? [
            "> bun install",
            "[coffee-bun] 매니페스트 로드: bundle.yml",
            "[coffee-bun] 운영체제: macOS (darwin/arm64)",
            "[coffee-bun] 프로그래밍 언어 설치: Golang, Node.js (npm), Python 3 (pip)...",
            "[coffee-bun] 툴체인 환경 구성: git, htop, zoxide, fzf, ripgrep...",
            "[coffee-bun] 쉘 환경 설정: Oh My Zsh 및 Powerlevel10k 테마 적용...",
            "[coffee-bun] 애플리케이션 설치: Visual Studio Code, Docker, Google Chrome...",
            "[coffee-bun] ✨ bundle.yml 파일에 선언된 모든 환경이 정상적으로 동기화되었습니다.",
          ]
        : [
            "> bun install",
            "[coffee-bun] Loading manifest: bundle.yml",
            "[coffee-bun] Platform: macOS (darwin/arm64)",
            "[coffee-bun] Installing languages: Golang, Node.js (npm), Python 3 (pip)...",
            "[coffee-bun] Provisioning toolchains: git, htop, zoxide, fzf, ripgrep...",
            "[coffee-bun] Configuring shell: Oh My Zsh (Powerlevel10k theme)...",
            "[coffee-bun] Installing applications: Visual Studio Code, Docker, Google Chrome...",
            "[coffee-bun] ✨ Environment successfully synchronized from bundle.yml.",
          ],
    },
    {
      id: "select",
      title: isKo
        ? "2. bun (대화형 컴포넌트 다중 선택)"
        : "2. bun (Interactive Package Selector)",
      badge: "Interactive",
      desc: isKo
        ? "터미널에서 언어, 린터, 쉘, 데스크톱 앱을 대화형 체크박스로 선택하여 구성합니다."
        : "Select languages, linters, shells, and casks interactively from the terminal.",
      steps: isKo
        ? [
            "> bun",
            "? 설치할 개발 환경 컴포넌트를 선택하세요 (스페이스바로 다중 선택):",
            "  [x] 프로그래밍 언어: Golang, Node.js, Python 3, Rust",
            "  [x] 쉘 & 터미널: Oh My Zsh, Powerlevel 테마, iTerm2",
            "  [x] 개발 툴체인: git, zoxide, fzf, htop, ripgrep",
            "  [ ] 코드 린터: ESLint, Flake8, Pylint",
            "  [x] 데스크톱 애플리케이션: VS Code, Docker Desktop",
            "[coffee-bun] 선택된 항목을 기반으로 bundle.yml 생성 중...",
            "[coffee-bun] ✨ 12개 컴포넌트 설치 및 환경 설정 완료.",
          ]
        : [
            "> bun",
            "? Select development components to install (Multi-choice):",
            "  [x] Programming Languages: Golang, Node.js, Python 3, Rust",
            "  [x] Shell & Terminal: Oh My Zsh, Powerlevel theme, iTerm2",
            "  [x] Developer Toolchains: git, zoxide, fzf, htop, ripgrep",
            "  [ ] Linters & Formatters: ESLint, Flake8, Pylint",
            "  [x] Desktop Applications: VS Code, Docker Desktop",
            "[coffee-bun] Generating declarative bundle.yml...",
            "[coffee-bun] ✨ 12 components successfully installed and configured.",
          ],
    },
    {
      id: "freeze",
      title: isKo
        ? "3. bun freeze (현재 Mac 환경 스냅샷 저장)"
        : "3. bun freeze (Snapshot Active Environment)",
      badge: "Freeze",
      desc: isKo
        ? "현재 맥북에 설치된 도구와 버전을 검사하여 bundle.yml 파일로 내보냅니다."
        : "Inspect installed tools and serialize active setup into a portable bundle.yml.",
      steps: isKo
        ? [
            "> bun freeze",
            "[coffee-bun] 현재 시스템 환경 및 설치된 패키지 검사 중...",
            "[coffee-bun] 감지된 항목:",
            "  - languages: [go@1.22, node@20, python@3.11]",
            "  - toolchains: [git, htop, zoxide, fzf, ripgrep]",
            "  - applications: [visual-studio-code, docker, google-chrome]",
            "[coffee-bun] bundle.yml 파일 생성 완료.",
            "[coffee-bun] ✨ 현재 맥북 환경이 bundle.yml 파일에 저장되었습니다.",
          ]
        : [
            "> bun freeze",
            "[coffee-bun] Inspecting installed tools and environment versions...",
            "[coffee-bun] Discovered active packages:",
            "  - languages: [go@1.22, node@20, python@3.11]",
            "  - toolchains: [git, htop, zoxide, fzf, ripgrep]",
            "  - applications: [visual-studio-code, docker, google-chrome]",
            "[coffee-bun] Serializing active setup to bundle.yml...",
            "[coffee-bun] ✨ Environment state frozen to bundle.yml successfully.",
          ],
    },
    {
      id: "update",
      title: isKo
        ? "4. bun update (선언된 패키지 최신화)"
        : "4. bun update (Update Declared Packages)",
      badge: "Update",
      desc: isKo
        ? "bundle.yml에 명시된 툴체인 및 Zsh 플러그인/테마를 일괄 업데이트합니다."
        : "Upgrade toolchains, casks, and git themes declared in bundle.yml.",
      steps: isKo
        ? [
            "> bun update",
            "[coffee-bun] bundle.yml 종속성 최신 버전 확인 중...",
            "[coffee-bun] 업데이트 항목: fzf (0.50 -> 0.52), zoxide (0.9 -> 0.9.4)...",
            "[coffee-bun] Oh My Zsh 및 Powerlevel 테마 최신 변경 사항 풀(pull)...",
            "[coffee-bun] ✨ 모든 패키지가 지정된 최신 버전으로 업데이트되었습니다.",
          ]
        : [
            "> bun update",
            "[coffee-bun] Checking manifest dependencies in bundle.yml...",
            "[coffee-bun] Updating formulae: fzf (0.50 -> 0.52), zoxide (0.9 -> 0.9.4)...",
            "[coffee-bun] Pulling latest Oh My Zsh plugins and Powerlevel theme...",
            "[coffee-bun] ✨ All components updated to specified versions.",
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
          <span>{isKo ? "bun — CLI 워크플로우 시뮬레이터" : "bun — CLI Workflow Simulator"}</span>
        </TerminalTitle>
        <div style={{ width: 36 }} />
      </TerminalTitleBar>

      <TerminalBody>
        <MenuHeader>
          <div className="brand">
            {isKo
              ? "coffee-bun • macOS 초기 개발 환경 자동화 관리 도구"
              : "coffee-bun • macOS Initial Environment Automated Management Tool"}
          </div>
          <div className="subtitle">
            {isKo
              ? "bundle.yml 선언적 매니페스트 및 CLI 명령어 시뮬레이션"
              : "bundle.yml declarative manifest and CLI execution simulator"}
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
                    : msg.startsWith("[coffee-bun]")
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
                  ? "... CLI 프로세스 실행 중"
                  : "... executing CLI process"}
              </div>
            )}
          </div>
        )}

        <TerminalFooter>
          <div>
            {isKo
              ? "프리셋을 선택한 후 실행 버튼을 눌러 실제 bun 동작을 시뮬레이션해보세요."
              : "Select a preset and click Run to simulate real bun execution."}
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
