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
          "macOS development environment setup and maintenance CLI written in Go.",
        description:
          "Installs and configures system toolchains, shell frameworks, editors, language runtimes, and CLI utilities via Homebrew and Git.",
        action_install: "Installation",
        action_demo: "Interactive TUI",
        action_github: "GitHub Repository",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS (Apple Silicon & Intel)",
        badge_lang: "Go 1.22+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        tui_title: "CLI & TUI Simulation (`bun`)",
        tui_subtitle:
          "Interactive tree view (`bun`) and output previews for `install`, `check`, `doctor`, and `update` subcommands.",
        features_title: "Architecture & Implementation",
        features_subtitle:
          "Technical overview of how coffee-bun manages package installation and configuration state.",
        f1_title: "Foldable Tree TUI",
        f1_desc:
          "Groups packages by category with collapsible nodes (`[-]`/`[+]`), multi-select toggles, and keyboard navigation between the tree view and action bar.",
        f2_title: "Goroutine Worker Pool & Stdout Pipe",
        f2_desc:
          "Executes independent Homebrew installs, font downloads, and Git clones concurrently, piping the latest stdout line under each running task.",
        f3_title: "Prerequisite & Sudo Polling",
        f3_desc:
          "Detects steps requiring manual elevation (`xcode-select`, OpenJDK JVM symlink), displays the required command, and polls every 2–3s to resume execution automatically.",
        f4_title: "Environment Diagnostics (`bun doctor`)",
        f4_desc:
          "Checks macOS architecture, Homebrew PATH entries, `.zshrc` plugin hooks, installed font files, and the `/usr/local/bin/code` symlink.",
        f5_title: "Repository & Package Sync (`bun update`)",
        f5_desc:
          "Runs `brew update`/`upgrade` alongside `git pull --ff-only` across Oh My Zsh, Powerlevel10k, Zsh plugins, and `~/.vim_runtime`.",
        f6_title: "Non-Interactive CLI Execution",
        f6_desc:
          "Supports headless provisioning via `bun install all` or category-scoped targets (`terminal`, `languages`, `cli`) for scripts and dotfiles.",
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
          "Verify PATH entries, shell configuration hooks, font files, and binary symlinks",
        cmd_update_desc:
          "Upgrade Homebrew formulae/casks and pull latest commits for managed Git repositories",
        install_heading: "Installation",
        install_subheading:
          "Install the `bun` binary via the shell script, Homebrew tap, or Go source build.",
        install_method_curl: "Shell Script",
        install_method_brew: "Homebrew",
        install_method_source: "Build from Source",
        install_desc_curl:
          "Download and install the prebuilt binary to `~/.local/bin`:",
        install_desc_brew: "Install via the Homebrew tap:",
        install_desc_source:
          "Clone the repository and build with Go and Make:",
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
        github: "깃허브",
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
        tagline: "Go 기반 macOS 개발 환경 구성 및 유지보수 CLI.",
        description:
          "Homebrew와 Git을 통해 시스템 툴체인, 쉘 프레임워크, 에디터, 언어 런타임 및 CLI 유틸리티를 설치하고 설정합니다.",
        action_install: "설치 방법",
        action_demo: "인터랙티브 TUI",
        action_github: "GitHub 저장소",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS (Apple Silicon & Intel)",
        badge_lang: "Go 1.22+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        tui_title: "CLI & TUI 시뮬레이션 (`bun`)",
        tui_subtitle:
          "대화형 트리 UI(`bun`) 및 `install`, `check`, `doctor`, `update` 서브커맨드 실행 화면입니다.",
        features_title: "아키텍처 및 동작 구조",
        features_subtitle:
          "패키지 병렬 설치, 설정 파일 주입, 상태 진단을 처리하는 내부 구현 구조입니다.",
        f1_title: "접이식 트리 TUI",
        f1_desc:
          "카테고리별 폴딩(`[-]`/`[+]`), 다중 선택 토글, 트리 영역과 하단 액션 버튼 간 포커스 이동을 지원합니다.",
        f2_title: "Goroutine 병렬 실행 및 Stdout 파이프",
        f2_desc:
          "의존성이 없는 Homebrew 설치, 폰트 다운로드, Git 클론 작업을 고루틴으로 병렬 처리하며 각 항목 하단에 실시간 표준출력을 표시합니다.",
        f3_title: "사전 요구사항 및 권한 폴링",
        f3_desc:
          "관리자 권한이나 시스템 트리거(`xcode-select`, OpenJDK 심링크 등)가 필요한 경우 명령어를 안내하고 2~3초 주기로 상태를 확인해 설치를 자동 재개합니다.",
        f4_title: "환경 상태 진단 (`bun doctor`)",
        f4_desc:
          "macOS 아키텍처, Homebrew PATH, `.zshrc` 테마 및 플러그인 구문, 폰트 파일 경로, `/usr/local/bin/code` 심링크 유효성을 검사합니다.",
        f5_title: "패키지 및 Git 저장소 업데이트 (`bun update`)",
        f5_desc:
          "`brew update`/`upgrade`와 함께 Oh My Zsh, Powerlevel10k, Zsh 플러그인, `~/.vim_runtime` 저장소의 최신 커밋을 동기화합니다.",
        f6_title: "비대화형 CLI 실행",
        f6_desc:
          "`bun install all` 또는 도메인 지정 명령(`terminal`, `languages`, `cli`)으로 스크립트 및 닷파일 환경에서 비대화형 실행을 지원합니다.",
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
          "관리 대상 패키지의 설치 여부 및 현재 버전 조회",
        cmd_install_all_desc:
          "누락된 모든 패키지 및 설정을 비대화형으로 일괄 설치",
        cmd_doctor_desc:
          "PATH 환경변수, `.zshrc` 훅, 폰트 설치 경로, 바이너리 심링크 무결성 검사",
        cmd_update_desc:
          "Homebrew 패키지/Cask 및 관리 대상 Git 저장소(OMZ, p10k, vimrc) 일괄 업데이트",
        install_heading: "설치 방법",
        install_subheading:
          "쉘 스크립트, Homebrew 탭, 또는 소스 빌드를 통해 `bun` 바이너리를 설치합니다.",
        install_method_curl: "쉘 스크립트",
        install_method_brew: "Homebrew",
        install_method_source: "소스 빌드",
        install_desc_curl:
          "사전 빌드된 바이너리를 `~/.local/bin` 경로에 다운로드 및 설치합니다:",
        install_desc_brew: "Homebrew 탭을 통해 설치합니다:",
        install_desc_source:
          "저장소를 클론한 뒤 Go 컴파일러와 Makefile로 빌드합니다:",
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
