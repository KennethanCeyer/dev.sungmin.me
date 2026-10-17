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
          "Open-source tools, CLI utilities, and developer infrastructure crafted with zero-friction automation.",
      },
      coffee_bun: {
        title: "coffee-bun",
        cmd: "bun",
        tagline:
          "Bootstrap and maintain your complete macOS MacBook workstation in 30 seconds.",
        description:
          "Unifies every essential developer tool, compiler, shell configuration, and desktop app into a single, concurrent Go automation workflow.",
        action_install: "Installation Guide",
        action_demo: "Watch Recording",
        action_github: "GitHub Repository",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS (Apple Silicon & Intel)",
        badge_lang: "Go 1.22+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        tui_title: "Terminal Session Recording (`bun` & Subcommands)",
        tui_subtitle:
          "Watch authentic black background terminal playback demonstrating the 5 core subcommands in action.",
        outcomes_title: "What You Get (3 Core Outcomes)",
        outcomes_subtitle:
          "Skip half a day of manual setup and build on a pristine, production-ready workstation.",
        outcome1_title: "4 Hours → 30 Seconds",
        outcome1_desc:
          "Automate Homebrew, Nerd Fonts, iTerm2 themes, Vim runtime, VS Code CLI linking, and language compilers concurrently in under 30 seconds.",
        outcome2_title: "Zero Configuration Errors",
        outcome2_desc:
          "Pre-verified configurations eliminate broken PATHs, missing iTerm2 font plists, and unlinked macOS JVM directories.",
        outcome3_title: "Continuous Maintenance",
        outcome3_desc:
          "Not just for day one. Use `bun doctor` for ongoing environment health checks and `bun update` for one-stop upgrades of packages and git repos.",
        inventory_title: "Supported Workstation Stack Inventory",
        inventory_subtitle:
          "Complete breakdown of every tool installed and what coffee-bun configures automatically.",
        th_domain: "Domain",
        th_packages: "Installed Tools & Packages",
        th_automation: "What bun Automates",
        commands_title: "CLI Command Reference (`bun`)",
        commands_subtitle:
          "Standard commands for workstation initialization, diagnostics, and routine maintenance.",
        th_command: "Command",
        th_action: "Action & Behavior",
        cmd_bun_desc:
          "Launch interactive Tree TUI with foldable categories and focusable action bar",
        cmd_check_desc:
          "Inspect installed packages and report current versions vs missing tools",
        cmd_install_all_desc:
          "Non-interactive parallel installation of all missing tools and configurations",
        cmd_doctor_desc:
          "Validate environment integrity, PATH, ~/.zshrc hooks, and VS Code CLI symlink",
        cmd_update_desc:
          "One-stop concurrent upgrade of Homebrew packages, casks, and git repos (OMZ, p10k, vimrc)",
        install_heading: "Installation & Getting Started",
        install_subheading:
          "Bootstrap your workstation via a single curl command, Homebrew tap, or build from source.",
        install_method_curl: "One-Line Bootstrap (Recommended)",
        install_method_brew: "Homebrew",
        install_method_source: "Build from Source",
        install_desc_curl:
          "Run the automated bootstrap installer directly in your terminal (verifies macOS, installs bun to ~/.local/bin):",
        install_desc_brew:
          "Install via KennethanCeyer Homebrew tap:",
        install_desc_source:
          "Clone the repository and build directly using the Go compiler and Makefile:",
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
        badge: "개발자 인프라 & 오픈소스 생태계",
        title: "Developer Hub",
        subtitle:
          "반복 작업을 없애고 개발 생산성을 극대화하는 오픈소스 도구와 CLI 인프라를 제공합니다.",
      },
      coffee_bun: {
        title: "coffee-bun",
        cmd: "bun",
        tagline:
          "맥북 개발 환경 설정 & 유지보수를 30초 만에 끝내는 원스톱 CLI 자동화 도구",
        description:
          "새 맥북에 필요한 모든 필수 개발 도구, 컴파일러, 쉘 테마, 데스크톱 앱을 단 한 줄의 명령어로 30초 안에 완전 자동 구축합니다.",
        action_install: "설치 안내",
        action_demo: "터미널 레코딩 보기",
        action_github: "GitHub 저장소",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS (Apple Silicon & Intel)",
        badge_lang: "Go 1.22+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        tui_title: "터미널 실행 레코딩 (`bun` & Subcommands)",
        tui_subtitle:
          "실제 터미널과 동일한 블랙 배경 및 컬러 하이라이트로 5가지 핵심 명령어를 시청해보세요.",
        outcomes_title: "이걸 쓰면 무엇을 얻을 수 있나요? (3가지 핵심 가치)",
        outcomes_subtitle:
          "반복적인 수동 작업과 환경 설정 오류를 완전히 제거하고 신속하게 개발을 시작하세요.",
        outcome1_title: "4시간 수동 작업을 30초로 단축",
        outcome1_desc:
          "Homebrew, 폰트, 테마, Vim 런타임, VS Code CLI, 복수 언어 런타임을 고루틴 병렬 처리로 30초 만에 일괄 구축합니다.",
        outcome2_title: "오류 없는 검증된 환경 설정",
        outcome2_desc:
          "복잡한 PATH 꼬임, iTerm2 폰트/컬러 프리셋 미적용, macOS JVM 심링크 미인식 문제를 사전 검증된 스택으로 원천 방지합니다.",
        outcome3_title: "지속 가능한 워크스테이션 관리",
        outcome3_desc:
          "새 맥북 세팅뿐만 아니라 `bun doctor`로 환경 무결성 진단, `bun update`로 패키지와 Git 저장소를 원스톱 업그레이드합니다.",
        inventory_title: "지원하는 맥북 워크스테이션 패키지 인벤토리",
        inventory_subtitle:
          "맥북 개발에 필요한 7개 도메인의 모든 필수 컴포넌트를 지원하며 자동 구성합니다.",
        th_domain: "도메인",
        th_packages: "설치 대상 도구 및 패키지",
        th_automation: "coffee-bun 자동 구성 내용",
        commands_title: "CLI 명령어 가이드 (`bun`)",
        commands_subtitle:
          "맥북 세팅, 상태 진단, 일상적 유지보수를 위한 CLI 명령어 인터페이스입니다.",
        th_command: "명령어",
        th_action: "동작 설명",
        cmd_bun_desc:
          "접이식 카테고리와 포커스 액션 바를 갖춘 대화형 트리 터미널 UI 실행",
        cmd_check_desc:
          "현재 시스템에 설치된 도구 및 버전 점검 리포트 출력",
        cmd_install_all_desc:
          "누락된 모든 도구, 쉘 테마, 에디터 런타임 비대화형 병렬 자동 설치",
        cmd_doctor_desc:
          "환경 무결성, PATH, ~/.zshrc 훅, VS Code CLI 심링크 상태 정밀 진단",
        cmd_update_desc:
          "Homebrew 패키지, Cask, Git 저장소(OMZ, p10k, vimrc) 일괄 통합 업그레이드",
        install_heading: "설치 및 시작하기",
        install_subheading:
          "원라인 부트스트랩 스크립트, Homebrew, 또는 소스 코드를 통해 간편하게 설치할 수 있습니다.",
        install_method_curl: "원라인 부트스트랩 (추천)",
        install_method_brew: "Homebrew",
        install_method_source: "소스 빌드",
        install_desc_curl:
          "터미널에서 원라인 부트스트랩 스크립트를 직접 실행합니다 (macOS 점검 후 bun을 ~/.local/bin에 자동 설치):",
        install_desc_brew:
          "KennethanCeyer 공식 Homebrew 탭을 통해 설치합니다:",
        install_desc_source:
          "저장소를 복제한 뒤 Go 컴파일러와 Makefile을 통해 직접 빌드합니다:",
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
