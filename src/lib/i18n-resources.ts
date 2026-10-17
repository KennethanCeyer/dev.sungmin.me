export const resources = {
  en: {
    translation: {
      nav: {
        dev_home: "Developer Hub",
        projects: "Projects",
        github: "GitHub",
      },
      hero: {
        badge: "Developer Infrastructure & Open Source",
        title: "Developer Hub",
        subtitle:
          "Open-source CLI utilities and developer tools maintained by Sungmin Han.",
      },
      coffee_bun: {
        title: "coffee-bun",
        cmd: "bun",
        tagline:
          "Cross-platform workstation setup and maintenance CLI written in Go (macOS, Linux, Windows).",
        description:
          "Installs and configures system toolchains, shell frameworks, editors, language runtimes, and CLI utilities across macOS, Linux, and Windows.",
        action_install: "Installation",
        action_demo: "Interactive TUI",
        action_github: "GitHub Repository",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS · Linux · Windows",
        badge_lang: "Go 1.24+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        tui_title: "CLI & TUI Simulation",
        tui_subtitle:
          "Interactive tree view (`bun`) and output previews for `install`, `check`, `doctor`, and `update` subcommands.",
        features_title: "Architecture & Implementation",
        features_subtitle:
          "Technical overview of how coffee-bun manages package installation and configuration state.",
        f1_title: "Foldable Tree TUI",
        f1_desc:
          "Groups packages by category with collapsible nodes (`[-]`/`[+]`), multi-select toggles, and Vim-style navigation (`j`/`k`, `g`/`G`, `h`/`l`, `?`).",
        f2_title: "Concurrent Workers & Stream",
        f2_desc:
          "Executes independent package installs (`brew`, `apt-get`, `dnf`, `winget`, `choco`), font downloads, and Git clones concurrently with live stdout streaming.",
        f3_title: "Prerequisite & Sudo Polling",
        f3_desc:
          "Detects steps requiring manual elevation (`xcode-select`, sudo commands, JVM symlinks), displays the exact command, and polls every 2s to resume automatically.",
        f4_title: "Diagnostics (`bun doctor`)",
        f4_desc:
          "Checks OS architecture, native package managers (`brew`, `apt`, `winget`), `.zshrc` plugin hooks, installed font files, and the `code` CLI symlink.",
        f5_title: "Package Sync (`bun update`)",
        f5_desc:
          "Upgrades system packages alongside `git pull --ff-only` across Oh My Zsh, Powerlevel10k, Zsh plugins, and `~/.vim_runtime`.",
        f6_title: "Headless CLI Execution",
        f6_desc:
          "Supports headless provisioning via `bun install all`, category targets (`terminal`, `languages`, `cli`), and declarative `bun.yaml` profiles.",
        inventory_title: "Supported Packages & Feature Matrix",
        inventory_subtitle:
          "Support matrix across installation, configuration/PATH setup, health checks, and automated updates.",
        th_section: "Section",
        th_package: "Package / Tool",
        th_target: "Source / Target",
        th_install: "Install",
        th_config: "Config / PATH",
        th_doctor: "Check / Doctor",
        th_update: "Update",
        commands_title: "CLI Command Reference",
        commands_subtitle:
          "Available subcommands for installation, status inspection, diagnostics, and updates.",
        th_command: "Command",
        th_action: "Description",
        cmd_bun_desc:
          "Launch the interactive Tree TUI to select and install packages by category",
        cmd_check_desc:
          "List all managed packages with their detected version and installation status",
        cmd_install_all_desc:
          "Install and configure all missing packages non-interactively",
        cmd_doctor_desc:
          "Verify PATH entries, native package managers, shell hooks, font files, and binary symlinks",
        cmd_update_desc:
          "Upgrade installed packages and pull latest commits for managed Git repositories",
        install_heading: "Installation",
        install_subheading:
          "Install the `bun` binary on macOS, Linux, or Windows.",
        install_tab_unix: "macOS / Linux",
        install_tab_win: "Windows (PowerShell)",
        install_method_macos_script: "1. macOS — Bootstrap Script",
        install_desc_macos_script:
          "Checks for Go/Homebrew, builds `bun` (and aliases `coffee-bun`), and installs to `~/.local/bin`:",
        install_method_brew: "2. macOS — Homebrew Tap",
        install_desc_brew:
          "Install directly via the Homebrew formula tap on macOS or Linuxbrew:",
        install_method_linux_script: "3. Linux — Bootstrap Script (apt / dnf / apk)",
        install_desc_linux_script:
          "Automatically provisions `go` and `git` via `apt-get`, `dnf`, or `apk` if missing, then builds and links `~/.local/bin/bun`:",
        install_method_windows_ps: "4. Windows — PowerShell Bootstrap (winget / choco)",
        install_desc_windows_ps:
          "Provisions Go via `winget` if missing, compiles `bun.exe` and `coffee-bun.exe` into `%USERPROFILE%\\.local\\bin`, and registers User `PATH`:",
        install_method_source: "5. Build from Source (All Platforms)",
        install_desc_source:
          "Clone the repository and build with Go 1.24+ and Make:",
      },
      hub: {
        projects_title: "Projects",
        projects_subtitle: "Developer tools and open-source software.",
        all: "All",
        explore: "Explore",
      },
      footer: {
        copyright: "Sungmin Han. All rights reserved.",
      },
    },
  },
  ko: {
    translation: {
      nav: {
        dev_home: "Developer Hub",
        projects: "프로젝트",
        github: "GitHub",
      },
      hero: {
        badge: "Developer Infrastructure & Open Source",
        title: "Developer Hub",
        subtitle:
          "오픈소스 CLI 유틸리티 및 개발 도구를 정리한 아카이브입니다.",
      },
      coffee_bun: {
        title: "coffee-bun",
        cmd: "bun",
        tagline:
          "Go 기반 크로스 플랫폼(macOS · Linux · Windows) 개발 환경 구성 및 유지보수 CLI.",
        description:
          "macOS, Linux, Windows 환경에서 시스템 툴체인, 쉘 프레임워크, 에디터, 언어 런타임 및 CLI 유틸리티를 설치하고 설정합니다.",
        action_install: "설치 방법",
        action_demo: "인터랙티브 TUI",
        action_github: "GitHub 저장소",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS · Linux · Windows",
        badge_lang: "Go 1.24+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        tui_title: "CLI & TUI 시뮬레이션",
        tui_subtitle:
          "대화형 트리 UI(`bun`) 및 `install`, `check`, `doctor`, `update` 서브커맨드 실행 화면입니다.",
        features_title: "아키텍처 및 동작 구조",
        features_subtitle:
          "패키지 병렬 설치, 설정 파일 주입, 상태 진단을 처리하는 내부 구현 구조입니다.",
        f1_title: "접이식 트리 TUI",
        f1_desc:
          "카테고리별 폴딩(`[-]`/`[+]`), 다중 선택 토글, Vim 스타일 키보드 내비게이션(`j`/`k`, `g`/`G`, `h`/`l`, `?`)을 지원합니다.",
        f2_title: "병렬 실행 및 Stdout 파이프",
        f2_desc:
          "OS별 패키지 매니저(`brew`, `apt-get`, `dnf`, `winget`, `choco`) 설치, 폰트 다운로드, Git 클론을 고루틴으로 병렬 처리하며 실시간 표준출력을 스트리밍합니다.",
        f3_title: "사전 요구사항 및 권한 폴링",
        f3_desc:
          "관리자 권한이나 시스템 트리거(`xcode-select`, sudo 명령, JVM 심링크 등)가 필요한 경우 명령어를 안내하고 2초 주기로 상태를 확인해 설치를 자동 재개합니다.",
        f4_title: "환경 상태 진단 (`bun doctor`)",
        f4_desc:
          "OS 아키텍처, 패키지 매니저(`brew`, `apt`, `winget`), `.zshrc` 테마 및 플러그인 구문, 폰트 경로, `code` CLI 심링크 유효성을 검사합니다.",
        f5_title: "패키지 동기화 (`bun update`)",
        f5_desc:
          "시스템 패키지 매니저 업그레이드와 함께 Oh My Zsh, Powerlevel10k, Zsh 플러그인, `~/.vim_runtime` 저장소의 최신 커밋을 동기화합니다.",
        f6_title: "비대화형 CLI 실행",
        f6_desc:
          "`bun install all`, 도메인 지정 명령(`terminal`, `languages`, `cli`), 선언형 `bun.yaml` 설정 파일로 비대화형 프로비저닝을 지원합니다.",
        inventory_title: "지원 패키지 및 기능 매트릭스",
        inventory_subtitle:
          "섹션별 지원 도구 목록과 자동 설치, 설정/PATH 구성, 상태 진단, 업데이트 지원 여부입니다.",
        th_section: "분류",
        th_package: "도구 / 패키지",
        th_target: "설치 소스 및 경로",
        th_install: "설치",
        th_config: "설정 / PATH",
        th_doctor: "점검 / 진단",
        th_update: "업데이트",
        commands_title: "CLI 명령어 레퍼런스",
        commands_subtitle:
          "설치, 상태 조회, 환경 진단, 업데이트에 사용하는 기본 서브커맨드입니다.",
        th_command: "명령어",
        th_action: "설명",
        cmd_bun_desc:
          "카테고리별 패키지 선택 및 설치를 위한 대화형 트리 TUI 실행",
        cmd_check_desc:
          "현재 OS에서 관리 대상 패키지의 설치 여부 및 버전 조회",
        cmd_install_all_desc:
          "누락된 모든 패키지 및 설정을 비대화형으로 일괄 설치",
        cmd_doctor_desc:
          "OS별 패키지 매니저, PATH 환경변수, `.zshrc` 훅, 폰트 경로, `code` 심링크 무결성 검사",
        cmd_update_desc:
          "설치된 시스템 패키지 및 관리 대상 Git 저장소(OMZ, p10k, vimrc) 일괄 업데이트",
        install_heading: "설치 가이드",
        install_subheading:
          "macOS, Linux, Windows 환경별 부트스트랩 스크립트, 패키지 매니저, 또는 소스 빌드로 `bun`을 설치합니다.",
        install_tab_unix: "macOS / Linux",
        install_tab_win: "Windows (PowerShell)",
        install_method_macos_script: "1. macOS — 원라인 부트스트랩 스크립트",
        install_desc_macos_script:
          "Go 및 Homebrew 설치 여부를 확인한 뒤 `bun`과 `coffee-bun` 심링크를 `~/.local/bin` 경로에 빌드 및 설치합니다:",
        install_method_brew: "2. macOS — Homebrew Tap",
        install_desc_brew:
          "macOS Homebrew 또는 Linuxbrew 탭을 통해 바이너리를 직접 설치합니다:",
        install_method_linux_script: "3. Linux — 부트스트랩 스크립트 (apt / dnf / apk)",
        install_desc_linux_script:
          "Ubuntu/Debian(`apt-get`), Fedora/RHEL(`dnf`), Alpine(`apk`) 환경에서 Go와 Git을 자동 준비하고 `~/.local/bin/bun`을 설치합니다:",
        install_method_windows_ps: "4. Windows — PowerShell 부트스트랩 (winget / choco)",
        install_desc_windows_ps:
          "`winget`을 통해 Go 환경을 확인하고 `%USERPROFILE%\\.local\\bin` 경로에 `bun.exe` 및 `coffee-bun.exe`를 빌드한 뒤 사용자 `PATH`에 자동 등록합니다:",
        install_method_source: "5. 소스 코드 빌드 (전체 OS 공통)",
        install_desc_source:
          "저장소를 클론한 뒤 Go 1.24+ 컴파일러와 Makefile로 직접 빌드합니다:",
      },
      hub: {
        projects_title: "프로젝트",
        projects_subtitle: "개발자 도구 및 오픈소스 소프트웨어.",
        all: "전체",
        explore: "둘러보기",
      },
      footer: {
        copyright: "Sungmin Han. All rights reserved.",
      },
    },
  },
};
