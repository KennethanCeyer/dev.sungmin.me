export const coffeeBunReadmeEn = `# coffee-bun

[![Go Version](https://img.shields.io/badge/Go-1.22+-black?style=flat&logo=go)](https://golang.org)
[![Platform](https://img.shields.io/badge/Platform-macOS-black?style=flat&logo=apple)](https://apple.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

> Automated macOS MacBook Setup & Maintenance Tool written in Go.  
> CLI Command: \`bun\`  
> Set up Oh My Zsh, Powerlevel10k, Dev Runtimes (Go, Node, Python), Modern CLI tools (zoxide, htop, fzf, ripgrep, eza), and Essential Apps (VS Code + CLI, Chrome) in one shot.

---

## Why coffee-bun?

Setting up a fresh MacBook or keeping a development laptop in sync usually involves dozens of manual \`brew install\`, \`git clone\`, \`.zshrc\` edits, and CLI path symlink fixes.

**coffee-bun** automates the entire process:
- **One-Shot Automated Setup**: Scans and installs missing components with minimal friction.
- **High Concurrency**: Goroutines and channels download and build components in parallel.
- **Thoughtful UX (≤ 5 Choices)**: No tedious 20+ item checkbox lists. Up to 5 curated, high-level choices with smart one-click presets.
- **Shell Perfection**: Installs Oh My Zsh, Powerlevel10k, zsh-autosuggestions, zsh-syntax-highlighting, and connects them in \`.zshrc\` with automated backups.
- **Dev Runtimes**: Go, Node.js (with npm), and Python 3 (with pip).
- **Modern CLI Suite**: \`zoxide\`, \`htop\`, \`fzf\`, \`ripgrep\`, \`eza\`, and \`git\`.
- **Apps & CLI Fix**: Installs Google Chrome and Visual Studio Code, and automatically symlinks the \`code\` CLI to your PATH.
- **System Diagnostics**: Built-in \`bun doctor\` checks environment health and configuration integrity.
- **One-Stop Upgrader**: \`bun update\` keeps your Homebrew formulae, casks, and git themes fresh.

---

## Included Components

| Category | Component | Description & Integration |
| :--- | :--- | :--- |
| **Shell & Theme** | [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) | Delightful community zsh framework |
| | [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Ultra-fast, flexible zsh prompt theme |
| | [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) | Fish-shell style command autocomplete suggestions |
| | [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) | Command syntax highlighting directly on the CLI |
| **Dev Runtimes** | [Go](https://go.dev/) | Open source programming language for fast, reliable apps |
| | [Node.js](https://nodejs.org/) | JavaScript runtime engine bundled with npm |
| | [Python 3](https://python.org/) | Python interpreter bundled with pip |
| **Modern CLI Tools**| [zoxide](https://github.com/ajeetdsouza/zoxide) | Smarter \`cd\` command with directory frecency |
| | [htop](https://htop.dev/) | Interactive process viewer and resource monitor |
| | [fzf](https://github.com/junegunn/fzf) | Blazing fast command-line fuzzy finder |
| | [ripgrep](https://github.com/BurntSushi/ripgrep) | Ultra-fast search tool (\`rg\`) |
| | [eza](https://github.com/eza-community/eza) | Modern, colorful replacement for \`ls\` |
| | [git](https://git-scm.com/) | Distributed version control |
| **Apps & Editors** | [Visual Studio Code](https://code.visualstudio.com/) | Code editor + automated \`code\` CLI linking |
| | [Google Chrome](https://www.google.com/chrome/) | Fast, secure modern web browser |

---

## Quick Start

### 1. One-Line Install (Recommended)

Run the bootstrap installer directly in your terminal:

\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/coffee-bun/master/install.sh | bash
\`\`\`

The script verifies macOS, ensures Homebrew and Go are available, builds \`bun\`, and symlinks it into \`~/.local/bin/bun\`.

---

### 2. Install via Homebrew

\`\`\`bash
brew install KennethanCeyer/coffee-bun/bun
\`\`\`

---

### 3. Build from Source

\`\`\`bash
git clone https://github.com/KennethanCeyer/coffee-bun.git
cd coffee-bun
make install
\`\`\`

---

## Usage & CLI Commands (Command: \`bun\`)

### Interactive Mode (TUI)

Simply run \`bun\` in your terminal:

\`\`\`bash
bun
\`\`\`

You will be greeted with an interactive terminal interface designed with at most 5 curated options:

\`\`\`text
 coffee-bun • macOS MacBook Setup & Maintenance 

  Choose a preset to run (Max 5 curated choices, one-click install)

  > 1. Quick Setup (All Missing Essentials) [3 missing items]
    Scan and install all missing recommended tools in one shot

    2. Shell & CLI Power Tools [1 missing]
    Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git

    3. Dev Runtimes & Languages [Ready]
    Go, Node.js (+ npm), Python 3 (+ pip)

    4. Apps & Editors [Ready]
    Visual Studio Code (+ code CLI link) & Google Chrome

    5. Check Status & Updates
    Inspect installed tools and upgrade outdated packages & themes

  ─────────────────────────────────────────────────────────────
  [↑/↓] Navigate  •  [Enter] Select & Run  •  [q] Quit
\`\`\`

---

### System Inspection (\`bun check\`)

Check what is installed, their current versions, and what is missing across all categories:

\`\`\`bash
bun check
\`\`\`

---

### Non-Interactive Installation (\`bun install\`)

Ideal for dotfiles, bootstrap scripts, or automated provisioning:

\`\`\`bash
# Install all missing essentials
bun install all

# Install specific category
bun install shell
bun install runtimes
bun install apps

# Install specific packages by name
bun install zoxide htop go
\`\`\`

---

### Update & Maintenance (\`bun update\`)

Upgrade Homebrew packages and pull the latest changes for Oh My Zsh, Powerlevel10k, and installed plugins:

\`\`\`bash
bun update
\`\`\`

---

### System Doctor (\`bun doctor\`)

Verify configuration files (\`~/.zshrc\`), PATH settings, and whether the \`code\` CLI is linked:

\`\`\`bash
bun doctor
\`\`\`

---

## License

This project is licensed under the [MIT License](https://github.com/KennethanCeyer/coffee-bun/blob/master/LICENSE).
`;

export const coffeeBunReadmeKo = `# coffee-bun

[![Go Version](https://img.shields.io/badge/Go-1.22+-black?style=flat&logo=go)](https://golang.org)
[![Platform](https://img.shields.io/badge/Platform-macOS-black?style=flat&logo=apple)](https://apple.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

> Go 언어로 개발된 macOS 맥북 환경 자동 셋업 및 유지보수 도구  
> CLI 실행 명령어: \`bun\`  
> Oh My Zsh, Powerlevel10k, 개발 런타임(Go, Node, Python), 모던 CLI 도구(zoxide, fzf, ripgrep, eza, htop), 필수 애플리케이션(VS Code + code CLI 심링크, Chrome)을 한 번에 세팅합니다.

---

## 왜 coffee-bun인가요?

새 맥북을 세팅하거나 개발 환경 동기화를 유지할 때 수많은 \`brew install\`, \`git clone\`, \`.zshrc\` 편집, 그리고 CLI PATH 심링크 설정 작업을 일일이 손으로 수행해야 했습니다.

**coffee-bun**은 이 모든 과정을 자동화합니다:
- **원샷 자동 구성**: 현재 시스템 상태를 스캔하여 누락된 필수 도구만을 지능적으로 감지하고 설치합니다.
- **고성능 병렬 처리**: Go 언어의 고루틴(Goroutines)과 채널을 활용하여 패키지 다운로드 및 빌드를 동시에 실행합니다.
- **정제된 UX (최대 5개 선택지)**: 수십 개의 체크박스 목록 대신 5개 이하의 직관적인 프리셋을 제공하여 설정 시간을 단축합니다.
- **완벽한 쉘 환경 구축**: Oh My Zsh, Powerlevel10k, zsh-autosuggestions, zsh-syntax-highlighting을 설치하고 기존 \`.zshrc\`를 자동 백업한 후 설정합니다.
- **핵심 개발 런타임**: Go 1.22+, Node.js(npm 포함), Python 3(pip 포함)을 기본 제공합니다.
- **모던 CLI 툴킷 탑재**: \`zoxide\`, \`htop\`, \`fzf\`, \`ripgrep\`, \`eza\`, \`git\`을 한 번에 구성합니다.
- **애플리케이션 및 CLI 자동 연결**: VS Code와 Chrome을 설치하고 터미널에서 즉시 \`code\` 명령어를 실행할 수 있도록 심링크를 연결합니다.
- **환경 무결성 점검**: 내장된 \`bun doctor\` 명령어로 설정 파일과 PATH 상태를 즉시 진단합니다.
- **통합 업데이트 관리**: \`bun update\` 명령어로 Homebrew 패키지, 캐스크, Zsh 테마를 한 번에 최신 상태로 유지합니다.

---

## 포함된 컴포넌트 목록

| 분류 | 컴포넌트 | 설명 및 연동 방식 |
| :--- | :--- | :--- |
| **쉘 환경 & 테마** | [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) | 널리 사용되는 Zsh 커뮤니티 프레임워크 |
| | [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | 빠른 반응 속도와 유연한 커스터마이징을 지원하는 프롬프트 테마 |
| | [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) | Fish 쉘 스타일의 명령어 히스토리 자동완성 제안 플러그인 |
| | [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) | 터미널 입력 명령어를 실시간으로 구문 강조 |
| **개발 런타임** | [Go](https://go.dev/) | 빠르고 안정적인 시스템 개발을 위한 오픈소스 언어 |
| | [Node.js](https://nodejs.org/) | npm이 번들된 LTS 자바스크립트 런타임 |
| | [Python 3](https://python.org/) | pip 패키지 매니저가 번들된 파이썬 3 인터프리터 |
| **모던 CLI 도구** | [zoxide](https://github.com/ajeetdsouza/zoxide) | 방문 빈도 기반 스마트 디렉터리 이동 도구 (cd 대체) |
| | [htop](https://htop.dev/) | 대화형 프로세스 모니터 및 시스템 리소스 뷰어 |
| | [fzf](https://github.com/junegunn/fzf) | 초고속 커맨드라인 대화형 퍼지 검색 도구 |
| | [ripgrep](https://github.com/BurntSushi/ripgrep) | Rust 기반 초고속 코드 및 텍스트 검색 도구 (grep 대체) |
| | [eza](https://github.com/eza-community/eza) | 색상 및 파일 메타데이터 지원 모던 파일 목록 도구 (ls 대체) |
| | [git](https://git-scm.com/) | 분산 버전 관리 시스템 |
| **필수 애플리케이션** | [Visual Studio Code](https://code.visualstudio.com/) | 코드 에디터 및 \`code\` CLI 터미널 경로 자동 연결 |
| | [Google Chrome](https://www.google.com/chrome/) | 최신 웹 브라우저 |

---

## 빠른 시작 및 설치

### 1. 원라인 부트스트랩 (추천)

터미널에 아래 한 줄 명령어를 입력하여 실행합니다:

\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/coffee-bun/master/install.sh | bash
\`\`\`

스크립트가 macOS 환경과 Homebrew, Go 여부를 점검한 뒤 \`bun\` 바이너리를 빌드하여 \`~/.local/bin/bun\` 경로에 자동 연결합니다.

---

### 2. Homebrew 탭을 통한 설치

\`\`\`bash
brew install KennethanCeyer/coffee-bun/bun
\`\`\`

---

### 3. 소스 코드에서 빌드

\`\`\`bash
git clone https://github.com/KennethanCeyer/coffee-bun.git
cd coffee-bun
make install
\`\`\`

---

## 사용법 및 CLI 명령어 가이드 (명령어: \`bun\`)

### 대화형 터미널 인터페이스 (TUI)

터미널에 \`bun\`을 입력합니다:

\`\`\`bash
bun
\`\`\`

최대 5개의 직관적인 선택지로 정제된 터미널 대화형 인터페이스가 실행됩니다:

\`\`\`text
 coffee-bun • macOS 맥북 자동 셋업 및 유지보수 도구 

  실행할 프리셋을 선택하세요 (최대 5개 선택지, 원클릭 설치)

  > 1. 퀵 셋업 (누락된 필수 항목 전체) [3개 누락]
    시스템을 스캔하여 누락된 권장 개발 도구를 원샷으로 설치합니다.

    2. 쉘 환경 & CLI 도구 [1개 누락]
    Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git

    3. 개발 런타임 환경 [준비 완료]
    Go 1.22+, Node.js (+ npm), Python 3 (+ pip)

    4. 필수 앱 & CLI 심링크 [준비 완료]
    Visual Studio Code (+ code CLI 링크) 및 Google Chrome

    5. 환경 점검 및 일괄 업데이트
    설치된 도구를 확인하고 오래된 패키지와 테마를 업데이트합니다.

  ─────────────────────────────────────────────────────────────
  [↑/↓] 탐색  •  [Enter] 선택 및 실행  •  [q] 종료
\`\`\`

---

### 시스템 환경 진단 (\`bun check\`)

설치된 항목과 현재 버전, 누락된 패키지 현황을 카테고리별로 진단합니다:

\`\`\`bash
bun check
\`\`\`

---

### 비대화형 일괄 설치 (\`bun install\`)

도트파일(dotfiles)이나 자동 배포 스크립트에 적합합니다:

\`\`\`bash
# 누락된 필수 도구 전체 설치
bun install all

# 특정 카테고리만 설치
bun install shell
bun install runtimes
bun install apps

# 패키지명을 직접 지정하여 설치
bun install zoxide htop go
\`\`\`

---

### 패키지 및 테마 업데이트 (\`bun update\`)

Homebrew 수식과 캐스크를 최신 버전으로 업그레이드하고, Oh My Zsh 및 플러그인의 최신 변경 사항을 풀(pull)합니다:

\`\`\`bash
bun update
\`\`\`

---

### 환경 무결성 진단 (\`bun doctor\`)

설정 파일(\`~/.zshrc\`), PATH 환경변수 상태, 그리고 \`code\` CLI 심링크 무결성을 종합 검증합니다:

\`\`\`bash
bun doctor
\`\`\`

---

## 라이선스

이 프로젝트는 [MIT 라이선스](https://github.com/KennethanCeyer/coffee-bun/blob/master/LICENSE)를 따릅니다.
`;

export const coffeeBunReadmeContent = coffeeBunReadmeEn;
export const bundleReadmeContent = coffeeBunReadmeEn;

export function getCoffeeBunReadme(lang: string): string {
  return lang === "ko" ? coffeeBunReadmeKo : coffeeBunReadmeEn;
}
