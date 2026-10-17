export const resources = {
  en: {
    translation: {
      nav: {
        dev_home: "Dev Portal",
        projects: "Projects",
        principles: "Principles",
        github: "GitHub",
        blog: "Blog",
        profile: "sungmin.me",
      },
      hero: {
        badge: "Developer Infrastructure & Open Source",
        title: "Developer Hub",
        subtitle:
          "Open-source tools, CLI utilities, and developer infrastructure crafted with zero-friction automation.",
        view_projects: "Explore Projects",
        explore_bun: "View coffee-bun",
      },
      coffee_bun: {
        title: "coffee-bun",
        cmd: "bun",
        tagline: "Automated macOS Setup & Maintenance Tool",
        description:
          "One-shot setup and environment synchronization for macOS. Written in Go. Provisions Oh My Zsh, Powerlevel10k, dev runtimes (Go, Node, Python), modern CLI utilities, and essential apps with automated verification.",
        features_title: "Key Capabilities",
        features_subtitle:
          "Eliminates repetitive manual homebrew scripts and broken environment configurations.",
        f1_title: "One-Shot Automation",
        f1_desc:
          "Scans system status and installs all missing components with automated verification.",
        f2_title: "Concurrent Execution",
        f2_desc:
          "Written in Go. Goroutines and channels run downloads and builds in parallel.",
        f3_title: "Curated UX (≤ 5 Choices)",
        f3_desc:
          "Replaces endless checkbox lists with up to 5 focused presets for rapid setup.",
        f4_title: "Shell Configuration",
        f4_desc:
          "Configures Oh My Zsh, Powerlevel10k, and plugins in ~/.zshrc with automated backups.",
        f5_title: "Dev Runtimes",
        f5_desc:
          "Provisions Go 1.22+, Node.js (with npm), and Python 3 (with pip) ready to build.",
        f6_title: "Modern CLI Suite",
        f6_desc:
          "Equips your shell with zoxide, eza, ripgrep, fzf, and htop for high-speed navigation.",
        f7_title: "Apps & CLI Link",
        f7_desc:
          "Installs Visual Studio Code and Google Chrome, linking the `code` CLI to your PATH.",
        f8_title: "Diagnostic & Updater",
        f8_desc:
          "Runs health checks via `bun doctor` and updates formulae and themes via `bun update`.",
        install_heading: "Installation",
        install_method_curl: "One-Line Bootstrap",
        install_method_brew: "Homebrew Tap",
        install_method_source: "Build from Source",
        install_desc_curl: "Run the bootstrap script directly in your terminal:",
        install_desc_brew: "Install via KennethanCeyer Homebrew tap:",
        install_desc_source: "Build from repository using Go 1.22+:",
        tui_preview_title: "Terminal Interface Preview",
        tui_preview_subtitle: "Minimalist, responsive terminal workflow via the `bun` command.",
        packages_title: "Included Components",
        packages_subtitle: "Curated tools and runtimes included in the default distribution.",
        commands_title: "CLI Command Reference (`bun`)",
        commands_subtitle: "Standardized command set for installation, inspection, and maintenance.",
        docs_title: "Documentation",
        docs_subtitle: "Complete repository README and technical specifications.",
      },
      hub: {
        projects_title: "Projects & Tools",
        projects_subtitle: "Production-grade tools, engines, and libraries for engineers.",
        all: "All",
        filter_cli: "CLI",
        filter_engine: "Engine",
        filter_go: "Go",
        filter_mlops: "MLOps",
        principles_title: "Engineering Principles",
        p1_title: "Zero Friction",
        p1_desc: "Eliminates repetitive setup steps and boilerplate through intelligent automation.",
        p2_title: "Concurrency First",
        p2_desc: "Leverages parallel pipelines and Go goroutines for maximum throughput.",
        p3_title: "Resilient & Idempotent",
        p3_desc: "Safe operations with automatic backups, state checks, and non-destructive execution.",
        p4_title: "Minimalist Curation",
        p4_desc: "Focuses on the most effective tools rather than overwhelming with unvetted choices.",
      },
      footer: {
        copyright: "Sungmin Han. All rights reserved.",
        built_with: "Aligned with sungmin.me design system.",
      },
    },
  },
  ko: {
    translation: {
      nav: {
        dev_home: "개발 포털",
        projects: "프로젝트",
        principles: "원칙",
        github: "깃허브",
        blog: "블로그",
        profile: "sungmin.me",
      },
      hero: {
        badge: "개발자 인프라 & 오픈소스 생태계",
        title: "Developer Hub",
        subtitle:
          "반복 작업을 없애고 개발 생산성을 극대화하는 오픈소스 도구와 CLI 인프라를 제공합니다.",
        view_projects: "프로젝트 둘러보기",
        explore_bun: "coffee-bun 보기",
      },
      coffee_bun: {
        title: "coffee-bun",
        cmd: "bun",
        tagline: "macOS 맥북 자동 셋업 및 유지보수 도구",
        description:
          "Go 언어로 제작된 macOS 환경 자동 구성 도구. `bun` 명령어를 통해 Oh My Zsh, Powerlevel10k, 런타임(Go, Node, Python), 모던 CLI(zoxide, fzf, eza, ripgrep), 필수 앱 및 `code` CLI 심링크를 원샷으로 세팅합니다.",
        features_title: "주요 특징",
        features_subtitle:
          "새 맥북 세팅 시 발생하는 수작업 brew 설치와 환경설정 오류를 완전히 자동화합니다.",
        f1_title: "원샷 자동 구성",
        f1_desc:
          "시스템 상태를 자동 검사하고 누락된 컴포넌트만을 스마트하게 감지하여 설치 및 연결합니다.",
        f2_title: "동시성 병렬 처리",
        f2_desc:
          "Go 언어의 고루틴(Goroutine)과 채널을 기반으로 독립적인 패키지 다운로드와 빌드를 동시에 수행합니다.",
        f3_title: "정제된 UX (최대 5개 선택지)",
        f3_desc:
          "복잡한 체크박스 대신 5개 이하의 직관적인 프리셋으로 고민 없이 환경을 구축합니다.",
        f4_title: "쉘 환경 최적화",
        f4_desc:
          "Oh My Zsh, Powerlevel10k, 플러그인을 설정하며 ~/.zshrc 백업을 자동으로 생성합니다.",
        f5_title: "개발 런타임 탑재",
        f5_desc:
          "Go 1.22+, Node.js(+ npm), Python 3(+ pip) 등 개발 런타임을 즉시 사용 가능하도록 준비합니다.",
        f6_title: "모던 CLI 툴킷",
        f6_desc:
          "zoxide, eza, ripgrep, fzf, htop 등 생산성을 높이는 모던 CLI 도구를 한 번에 구성합니다.",
        f7_title: "앱 설치 & CLI 심링크",
        f7_desc:
          "VS Code와 Google Chrome을 설치하고 터미널에서 즉시 사용할 수 있도록 `code` CLI를 PATH에 자동 연결합니다.",
        f8_title: "환경 진단 & 통합 업데이트",
        f8_desc:
          "`bun doctor`로 환경 설정 무결성을 검증하고, `bun update`로 패키지와 테마를 최신으로 유지합니다.",
        install_heading: "설치 안내",
        install_method_curl: "원라인 부트스트랩 (추천)",
        install_method_brew: "Homebrew",
        install_method_source: "소스 빌드",
        install_desc_curl: "터미널에 아래 한 줄 명령어를 입력하여 실행합니다:",
        install_desc_brew: "KennethanCeyer 공식 Homebrew 탭을 통해 설치:",
        install_desc_source: "Go 1.22+ 환경에서 소스 코드를 직접 빌드:",
        tui_preview_title: "터미널 인터페이스 미리보기",
        tui_preview_subtitle: "`bun` 명령어로 실행되는 직관적인 터미널 인터페이스를 웹에서 경험해보세요.",
        packages_title: "포함된 컴포넌트",
        packages_subtitle: "현업 개발 환경에 꼭 필요한 핵심 도구들로 구성되었습니다.",
        commands_title: "CLI 명령어 가이드 (`bun`)",
        commands_subtitle: "설치, 점검, 업데이트를 위한 표준 CLI 명령어 세트입니다.",
        docs_title: "문서 및 아키텍처",
        docs_subtitle: "프로젝트 공식 README와 기술 명세를 확인하세요.",
      },
      hub: {
        projects_title: "프로젝트 & 도구 갤러리",
        projects_subtitle: "개발자의 생산성과 효율을 높이기 위해 만든 오픈소스 프로젝트들입니다.",
        all: "전체",
        filter_cli: "CLI",
        filter_engine: "엔진",
        filter_go: "Go",
        filter_mlops: "MLOps",
        principles_title: "엔지니어링 원칙",
        p1_title: "Zero Friction",
        p1_desc: "반복적인 세팅과 불필요한 설정 과정을 자동화하여 마찰을 최소화합니다.",
        p2_title: "Concurrency First",
        p2_desc: "Go의 동시성 모델을 활용한 병렬 파이프라인으로 최고의 처리 속도를 달성합니다.",
        p3_title: "Resilient & Idempotent",
        p3_desc: "자동 백업과 상태 검증을 통해 여러 번 실행해도 안전하고 일관된 결과를 보장합니다.",
        p4_title: "Minimalist Curation",
        p4_desc: "많은 도구를 나열하기보다 실제로 가장 가치 있는 정예 도구를 엄선합니다.",
      },
      footer: {
        copyright: "Sungmin Han. All rights reserved.",
        built_with: "sungmin.me 디자인 시스템 기반으로 제작되었습니다.",
      },
    },
  },
};
