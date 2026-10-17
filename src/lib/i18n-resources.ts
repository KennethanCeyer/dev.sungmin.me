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
        tagline: "Initial environment automated management tool for macOS",
        description:
          "Declaratively provision and synchronize your entire development environment—programming languages, toolchains, linters, shells, and applications—using a unified bundle.yml manifest or interactive CLI.",
        action_install: "Get Started",
        action_spec: "bundle.yml Spec",
        action_github: "GitHub",
        back_to_projects: "Projects",
        badge_status: "v0.0.1 (WIP)",
        badge_platform: "macOS",
        badge_cmd: "CLI: bun",
        badge_config: "Config: bundle.yml",
        features_title: "Core Capabilities",
        features_subtitle:
          "Automated, declarative environment synchronization powered by bundle.yml and the bun CLI.",
        f1_title: "Declarative bundle.yml",
        f1_desc:
          "Define languages, toolchains, linters, and applications in a portable YAML specification.",
        f2_title: "Interactive CLI Selection",
        f2_desc:
          "Run `bun` to interactively choose components from structured categories with ease.",
        f3_title: "Environment Freeze",
        f3_desc:
          "Snapshot installed packages, runtimes, and exact versions directly into bundle.yml via `bun freeze`.",
        f4_title: "Versioned Updates",
        f4_desc:
          "Update individual packages or the entire environment declared in your configuration via `bun update`.",
        f5_title: "Polyglot Language Support",
        f5_desc:
          "Built-in support for Go, Python, Java, Rust, Ruby, Node.js, C/C++, PHP, Haskell, and Clojure.",
        f6_title: "Full-Stack Toolchains & Apps",
        f6_desc:
          "Automate Oh My Zsh, Powerlevel themes, vimrc, iTerm2, VS Code, Docker, and developer browsers.",
        spec_title: "Declarative Manifest Preview (`bundle.yml`)",
        spec_subtitle:
          "Sample configuration showcasing how easily a complete Mac dev environment is declared.",
        tui_title: "CLI Workflow Preview (`bun`)",
        tui_subtitle:
          "Interactive terminal experience simulating declarative installation, selection, and freezing.",
        eco_title: "Supported Ecosystem & Roadmap",
        eco_subtitle:
          "Curated categories and tools supported in the v0.0.1 specification.",
        commands_title: "CLI Command Reference (`bun`)",
        commands_subtitle:
          "Standard command interface for environment management.",
        th_command: "Command",
        th_action: "Action",
        cmd_bun_desc:
          "Launch interactive terminal interface to select and configure packages",
        cmd_install_desc: "Install all packages declared in bundle.yml",
        cmd_pkg_desc:
          "Install a specific package or toolchain (e.g. `bun install golang`)",
        cmd_freeze_desc:
          "Snapshot currently installed environment and versions into bundle.yml",
        cmd_update_desc:
          "Update packages and shell themes to latest or specified versions",
        install_heading: "Installation & Getting Started",
        install_subheading:
          "Install via bootstrap script, Homebrew tap, or build from source.",
        install_method_curl: "One-Line Bootstrap",
        install_method_brew: "Homebrew Tap",
        install_method_source: "Build from Source",
        install_desc_curl: "Run the bootstrap script directly in your terminal:",
        install_desc_brew: "Install via KennethanCeyer Homebrew tap:",
        install_desc_source: "Clone and build from the official GitHub repository:",
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
        tagline: "macOS 초기 개발 환경 자동화 관리 도구",
        description:
          "단일 bundle.yml 매니페스트 파일과 대화형 CLI를 통해 프로그래밍 언어, 개발 툴체인, 린터, 쉘, 애플리케이션을 선언적으로 자동 구성하고 동기화합니다.",
        action_install: "설치 안내",
        action_spec: "bundle.yml 명세",
        action_github: "GitHub",
        back_to_projects: "프로젝트 목록",
        badge_status: "v0.0.1 (WIP)",
        badge_platform: "macOS",
        badge_cmd: "CLI: bun",
        badge_config: "Config: bundle.yml",
        features_title: "핵심 아키텍처",
        features_subtitle:
          "bundle.yml 선언적 매니페스트와 bun CLI를 기반으로 한 일관된 환경 자동화.",
        f1_title: "선언적 bundle.yml",
        f1_desc:
          "프로그래밍 언어, 툴체인, 린터, 앱을 단일 YAML 파일로 정의하여 이식성을 극대화합니다.",
        f2_title: "대화형 CLI 선택기",
        f2_desc:
          "`bun` 명령어로 카테고리별 필요한 개발 도구와 언어를 터미널에서 손쉽게 대화형으로 선택합니다.",
        f3_title: "환경 스냅샷 (Freeze)",
        f3_desc:
          "`bun freeze` 명령어로 현재 맥북에 설치된 도구와 버전을 bundle.yml 파일로 즉시 스냅샷합니다.",
        f4_title: "버전 관리 및 일괄 업데이트",
        f4_desc:
          "`bun update`를 통해 매니페스트에 선언된 특정 패키지나 전체 환경을 안전하게 최신화합니다.",
        f5_title: "다양한 개발 언어 지원",
        f5_desc:
          "Go, Python, Java, Rust, Ruby, Node.js, C/C++, PHP, Haskell 등 폭넓은 언어 런타임을 지원합니다.",
        f6_title: "툴체인, 쉘, 데스크톱 앱",
        f6_desc:
          "Oh My Zsh, Powerlevel 테마, vimrc, iTerm2부터 VS Code, Docker, Chrome까지 일괄 관리합니다.",
        spec_title: "선언적 매니페스트 명세 (`bundle.yml`)",
        spec_subtitle:
          "맥북 전체 개발 환경을 선언적으로 손쉽게 표현하는 bundle.yml 예시입니다.",
        tui_title: "CLI 워크플로우 미리보기 (`bun`)",
        tui_subtitle:
          "bundle.yml 설치, 대화형 선택, 환경 프리징 등 실제 CLI 실행 과정을 시뮬레이션해보세요.",
        eco_title: "지원 개발 생태계 및 로드맵",
        eco_subtitle:
          "v0.0.1 명세에 포함된 주요 카테고리별 지원 도구 목록입니다.",
        commands_title: "CLI 명령어 레퍼런스 (`bun`)",
        commands_subtitle:
          "환경 구성을 위한 표준 명령어 인터페이스입니다.",
        th_command: "명령어",
        th_action: "동작 설명",
        cmd_bun_desc:
          "대화형 터미널 인터페이스를 실행하여 패키지 선택 및 구성",
        cmd_install_desc: "bundle.yml 파일에 선언된 모든 도구 및 런타임 일괄 설치",
        cmd_pkg_desc:
          "특정 패키지 또는 언어 단독 설치 (예: `bun install golang`)",
        cmd_freeze_desc:
          "현재 설치된 환경 및 패키지 버전을 bundle.yml 파일로 스냅샷",
        cmd_update_desc:
          "지정된 패키지 및 쉘 테마를 최신 버전으로 일괄 업데이트",
        install_heading: "설치 및 시작하기",
        install_subheading:
          "부트스트랩 스크립트, Homebrew 탭, 또는 소스 코드를 통해 빌드할 수 있습니다.",
        install_method_curl: "원라인 부트스트랩 (추천)",
        install_method_brew: "Homebrew",
        install_method_source: "소스 빌드",
        install_desc_curl: "터미널에서 부트스트랩 스크립트를 직접 실행합니다:",
        install_desc_brew: "KennethanCeyer 공식 Homebrew 탭을 통해 설치합니다:",
        install_desc_source: "공식 GitHub 저장소를 복제한 뒤 직접 빌드합니다:",
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
