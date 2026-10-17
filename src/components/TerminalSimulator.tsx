"use client";

import styled from "@emotion/styled";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RiCheckLine,
  RiFolderLine,
  RiPlayLine,
  RiPulseLine,
  RiRefreshLine,
  RiRestartLine,
  RiTerminalBoxLine,
} from "react-icons/ri";

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

const CommandTabs = styled.div`
  display: flex;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border-weak);
  overflow-x: auto;
`;

const CommandTab = styled.button<{ isActive: boolean }>`
  background: transparent;
  border: none;
  padding: 0.65rem 1.15rem;
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
  gap: 0.4rem;
  transition: all 0.15s ease;

  &:hover {
    opacity: 1;
    background-color: var(--color-border-weak);
  }
`;

const TerminalBody = styled.div`
  padding: 1.5rem 1.75rem;
  color: var(--code-block-fg);
  font-size: 0.85rem;
  line-height: 1.5;
  min-height: 380px;

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 0.8rem;
  }
`;

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const TreeHeader = styled.div`
  margin-bottom: 0.9rem;
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
    width: 20px;
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
      opacity: 0.5;
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
`;

const StreamLog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-family: var(--font-roboto-mono), monospace;
`;

const StreamLine = styled.div<{ isDone?: boolean; isHighlight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;

  .line-main {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    color: ${({ isDone, isHighlight, theme }) =>
      isHighlight ? theme.text : isDone ? theme.text : "inherit"};
    font-weight: ${({ isHighlight }) => (isHighlight ? 600 : 400)};
  }

  .line-stream {
    font-size: 0.75rem;
    opacity: 0.45;
    padding-left: 1.25rem;
  }
`;

export default function TerminalSimulator() {
  const { i18n } = useTranslation();
  const isKo = i18n.language.startsWith("ko");

  const [activeTab, setActiveTab] = useState<
    "tui" | "install" | "doctor" | "update"
  >("tui");

  // State for interactive tree TUI
  const [foldedCategories, setFoldedCategories] = useState<Record<string, boolean>>({
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
          coffee-bun ~ macOS MacBook Setup & Maintenance (CLI: bun)
        </TerminalTitle>
        <div style={{ width: 40 }} />
      </TerminalTitleBar>

      <CommandTabs>
        <CommandTab
          isActive={activeTab === "tui"}
          onClick={() => setActiveTab("tui")}
        >
          <span>bun</span>
          <small style={{ opacity: 0.65 }}>
            {isKo ? "(대화형 트리 TUI)" : "(Interactive Tree)"}
          </small>
        </CommandTab>
        <CommandTab
          isActive={activeTab === "install"}
          onClick={() => setActiveTab("install")}
        >
          <span>bun install all</span>
          <small style={{ opacity: 0.65 }}>
            {isKo ? "(실시간 스트림)" : "(Live Stream)"}
          </small>
        </CommandTab>
        <CommandTab
          isActive={activeTab === "doctor"}
          onClick={() => setActiveTab("doctor")}
        >
          <span>bun doctor</span>
          <small style={{ opacity: 0.65 }}>
            {isKo ? "(환경 진단)" : "(Diagnostics)"}
          </small>
        </CommandTab>
        <CommandTab
          isActive={activeTab === "update"}
          onClick={() => setActiveTab("update")}
        >
          <span>bun update</span>
          <small style={{ opacity: 0.65 }}>
            {isKo ? "(원스톱 최신화)" : "(One-Stop Upgrader)"}
          </small>
        </CommandTab>
      </CommandTabs>

      <TerminalBody>
        {activeTab === "tui" && (
          <TreeContainer>
            <TreeHeader>
              <div className="brand">
                coffee-bun (bun) - macOS Setup & Environment Manager
              </div>
              <div className="subtext">
                {isKo
                  ? "카테고리를 클릭하여 접거나 펼치고, 항목을 선택한 뒤 하단 버튼으로 설치를 시작할 수 있습니다."
                  : "Fold/Unfold groups, toggle components, and navigate action buttons below."}
              </div>
            </TreeHeader>

            {/* [shell] Terminal & Shell */}
            <CategoryRow onClick={() => toggleFold("shell")}>
              <span className="toggle-icon">
                {foldedCategories.shell ? "[+]" : "[-]"}
              </span>
              <span className="cat-name">
                [shell] Terminal & Shell (iTerm2, Fonts, OMZ, p10k)
              </span>
              <span className="cat-badge">6/8 installed</span>
            </CategoryRow>

            {!foldedCategories.shell && (
              <ItemList>
                <ItemRow
                  isSelected={false}
                  onClick={() => {}}
                >
                  <div className="item-left">
                    <span className="checkbox">[x]</span>
                    <span className="item-name">iTerm2</span>
                  </div>
                  <div className="item-right">
                    <span className="item-version">3.7.6</span>
                    <span className="item-status installed">Installed</span>
                  </div>
                </ItemRow>

                <ItemRow
                  isSelected={false}
                  onClick={() => {}}
                >
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

                <ItemRow
                  isSelected={false}
                  onClick={() => {}}
                >
                  <div className="item-left">
                    <span className="checkbox">[x]</span>
                    <span className="item-name">Brogrammer Theme</span>
                  </div>
                  <div className="item-right">
                    <span className="item-version">iTerm2 Profile</span>
                    <span className="item-status installed">Preset Ready</span>
                  </div>
                </ItemRow>

                <ItemRow
                  isSelected={false}
                  onClick={() => {}}
                >
                  <div className="item-left">
                    <span className="checkbox">[x]</span>
                    <span className="item-name">Oh My Zsh</span>
                  </div>
                  <div className="item-right">
                    <span className="item-version">master (964ddf7)</span>
                    <span className="item-status installed">Installed</span>
                  </div>
                </ItemRow>

                <ItemRow
                  isSelected={false}
                  onClick={() => {}}
                >
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
                [editor] Editors & Vim Runtime (amix/vimrc, VS Code)
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

                <ItemRow
                  isSelected={false}
                  onClick={() => {}}
                >
                  <div className="item-left">
                    <span className="checkbox">[x]</span>
                    <span className="item-name">Visual Studio Code</span>
                  </div>
                  <div className="item-right">
                    <span className="item-version">1.142.0</span>
                    <span className="item-status installed">Installed</span>
                  </div>
                </ItemRow>

                <ItemRow
                  isSelected={false}
                  onClick={() => {}}
                >
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
                [lang] Compilers & Languages (Go, Python, Java, Node)
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
                [cloud] Cloud & DevOps CLIs (AWS, Google Cloud SDK, Azure)
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
                    <span className="item-name">zoxide, ripgrep, fzf, bat, eza, htop, tree, jq</span>
                  </div>
                  <div className="item-right">
                    <span className="item-status installed">All Active</span>
                  </div>
                </ItemRow>
              </ItemList>
            )}

            <ActionBar>
              <ActionButtons>
                <TUIButton onClick={() => setActiveTab("install")}>
                  &lt; Exit
                </TUIButton>
                <TUIButton onClick={selectAllMissing}>
                  Select Missing ({selectedCount})
                </TUIButton>
              </ActionButtons>

              <ActionButtons>
                <TUIButton
                  primary
                  onClick={() => setActiveTab("install")}
                >
                  <RiPlayLine />
                  Start Install ({selectedCount}) &gt;
                </TUIButton>
              </ActionButtons>
            </ActionBar>

            <TUIHelpBar style={{ marginTop: "0.5rem" }}>
              {isKo
                ? "[Tab/←/→] 버튼 포커스 | [Enter] 실행 | [Space] 항목 토글 | [m] 누락 선택 | [q] 종료"
                : "[Tab/←/→] Buttons | [Enter] Run | [Space] Toggle | [m] Missing | [q] Quit"}
            </TUIHelpBar>
          </TreeContainer>
        )}

        {activeTab === "install" && (
          <StreamLog>
            <StreamLine isHighlight>
              <div className="line-main">
                <span>&gt; bun install all</span>
              </div>
            </StreamLine>
            <StreamLine>
              <div className="line-main">
                <span>[coffee-bun] macOS MacBook Setup & Maintenance Orchestrator</span>
              </div>
              <div className="line-stream">
                platform: darwin/arm64 | Go runtime concurrency: 8 goroutines
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>[brew] Installing OpenJDK (Java 21)...</span>
              </div>
              <div className="line-stream">
                ↳ symlinking /Library/Java/JavaVirtualMachines/openjdk.jdk
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>[git] Cloning amix/vimrc (Ultimate Vim Runtime)...</span>
              </div>
              <div className="line-stream">
                ↳ Receiving objects: 100% (1420/1420), 1.2 MiB | 5.4 MiB/s, done.
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>[font] Installing MesloLGS NF fonts into ~/Library/Fonts...</span>
              </div>
              <div className="line-stream">
                ↳ Verified 4 font files: Regular, Bold, Italic, Bold-Italic.
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>[iterm2] Configuring Brogrammer theme & font plist...</span>
              </div>
              <div className="line-stream">
                ↳ Default profile font updated to MesloLGS-NF-Regular 16.
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>[cli] Linking Visual Studio Code command-line tool...</span>
              </div>
              <div className="line-stream">
                ↳ Symlink created: /usr/local/bin/code -&gt; /Applications/Visual Studio Code.app/...
              </div>
            </StreamLine>
            <StreamLine isHighlight style={{ marginTop: "0.8rem" }}>
              <div className="line-main">
                <span>
                  ✨ {isKo ? "설치가 완료되었습니다. 따뜻한 커피번과 함께 개발을 시작하세요!" : "Workstation setup complete. Enjoy your coffee and happy hacking!"}
                </span>
              </div>
              <div className="line-stream">
                Total elapsed: 24.2s | All 18 packages and configurations healthy.
              </div>
            </StreamLine>
          </StreamLog>
        )}

        {activeTab === "doctor" && (
          <StreamLog>
            <StreamLine isHighlight>
              <div className="line-main">
                <span>&gt; bun doctor</span>
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>macOS System: darwin/arm64 (macOS 15.0 Sequoia)</span>
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>Homebrew: /opt/homebrew/bin/brew (v4.4.1)</span>
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>Shell & Framework: /bin/zsh with Oh My Zsh active</span>
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>Prompt Theme: Powerlevel10k configured in ~/.zshrc</span>
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>Font: MesloLGS-NF-Regular detected in ~/Library/Fonts</span>
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>VS Code CLI: /usr/local/bin/code executable</span>
              </div>
            </StreamLine>
            <StreamLine isDone>
              <div className="line-main">
                <RiCheckLine />
                <span>Modern CLI Suite: zoxide, rg, fzf, bat, eza linked in PATH</span>
              </div>
            </StreamLine>
            <StreamLine isHighlight style={{ marginTop: "0.8rem" }}>
              <div className="line-main">
                <span>
                  ✨ {isKo ? "환경 진단 통과: 7/7 진단 항목이 모두 정상입니다." : "System health check passed: 7/7 diagnostics verified."}
                </span>
              </div>
            </StreamLine>
          </StreamLog>
        )}

        {activeTab === "update" && (
          <StreamLog>
            <StreamLine isHighlight>
              <div className="line-main">
                <span>&gt; bun update</span>
              </div>
            </StreamLine>
            <StreamLine>
              <div className="line-main">
                <span>==&gt; Updating Homebrew formulas and casks...</span>
              </div>
              <div className="line-stream">↳ Already up-to-date.</div>
            </StreamLine>
            <StreamLine>
              <div className="line-main">
                <span>==&gt; Pulling latest commits for Oh My Zsh (master)...</span>
              </div>
              <div className="line-stream">↳ Current branch master is up to date.</div>
            </StreamLine>
            <StreamLine>
              <div className="line-main">
                <span>==&gt; Pulling latest commits for Powerlevel10k (master)...</span>
              </div>
              <div className="line-stream">↳ Fast-forwarded 3 commits (d05a1b0).</div>
            </StreamLine>
            <StreamLine>
              <div className="line-main">
                <span>==&gt; Updating zsh-autosuggestions &amp; zsh-syntax-highlighting...</span>
              </div>
              <div className="line-stream">↳ All plugins verified.</div>
            </StreamLine>
            <StreamLine>
              <div className="line-main">
                <span>==&gt; Syncing Ultimate Vim Runtime (amix/vimrc)...</span>
              </div>
              <div className="line-stream">↳ Already up-to-date.</div>
            </StreamLine>
            <StreamLine isHighlight style={{ marginTop: "0.8rem" }}>
              <div className="line-main">
                <span>
                  ✨ {isKo ? "모든 도구 및 저장소가 최신 상태로 동기화되었습니다." : "All packages and repositories successfully updated."}
                </span>
              </div>
            </StreamLine>
          </StreamLog>
        )}
      </TerminalBody>
    </TerminalFrame>
  );
}
