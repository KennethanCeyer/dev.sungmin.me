export const resources = {
  en: {
    translation: {
      nav: {
        dev_home: "Dev Portal",
        bundle: "bundle",
        github: "GitHub",
        blog: "Blog",
        profile: "sungmin.me",
      },
      hero: {
        badge: "Developer Tools & Open Source",
        title: "Building Tools for Developers",
        subtitle:
          "High-performance CLI tools, developer infrastructure, and open-source ecosystems designed with elegance and zero friction.",
        explore_bundle: "Explore bundle",
        all_projects: "Browse Projects",
        quick_install: "Quick Install",
      },
      bundle: {
        title: "bundle",
        tagline: "Automated macOS MacBook Setup & Maintenance Tool",
        description:
          "Zero to fully configured dev environment in one shot. Installs Oh My Zsh, Powerlevel10k, Dev Runtimes (Go, Node, Python), Modern CLI utilities (zoxide, fzf, eza, ripgrep), and Essential Apps with automatic symlinks.",
        features_title: "Why bundle?",
        features_subtitle:
          "Setting up a fresh Mac shouldn't take hours of manual brew installs and broken PATH configurations.",
        f1_title: "One-Shot Automated Setup",
        f1_desc:
          "Scans system state and installs all missing components with minimal friction and automated verification.",
        f2_title: "High Concurrency",
        f2_desc:
          "Written in Go. Goroutines & channels fetch, clone, and build packages concurrently for maximum setup speed.",
        f3_title: "Curated UX (≤ 5 Choices)",
        f3_desc:
          "No overwhelming 30-checkbox menus. Carefully curated high-level categories with smart one-click presets.",
        f4_title: "Shell Perfection",
        f4_desc:
          "Oh My Zsh, Powerlevel10k, autosuggestions, and syntax highlighting wired cleanly in ~/.zshrc with automated backups.",
        f5_title: "Dev Runtimes",
        f5_desc:
          "Pre-configured Go, Node.js (with npm), and Python 3 (with pip) ready for immediate development work.",
        f6_title: "Modern CLI Suite",
        f6_desc:
          "Equipped with next-gen replacements: zoxide (smart cd), eza (modern ls), ripgrep (fast grep), fzf, and htop.",
        f7_title: "Apps & Auto-CLI Symlink",
        f7_desc:
          "Installs Visual Studio Code and Google Chrome, and automatically symlinks the `code` CLI directly to your PATH.",
        f8_title: "Doctor & Maintenance",
        f8_desc:
          "Built-in diagnostics via `bundle doctor` and one-stop ecosystem upgrades via `bundle update`.",
        install_heading: "Get Started in Seconds",
        install_method_curl: "One-Line Install",
        install_method_brew: "Homebrew",
        install_method_source: "Build from Source",
        install_desc_curl: "Run the bootstrap installer directly in your terminal:",
        install_desc_brew: "Install via KennethanCeyer Homebrew tap:",
        install_desc_source: "Clone and compile with Go 1.22+:",
        tui_preview_title: "Interactive Terminal Preview",
        tui_preview_subtitle: "Clean, responsive, and minimalist terminal interface.",
        packages_title: "What's Included",
        packages_subtitle: "Essential tools curated for modern software engineering.",
        commands_title: "Command Reference",
        commands_subtitle: "Simple, predictable CLI commands for every maintenance stage.",
        docs_title: "Complete Documentation",
        docs_subtitle: "Explore the full architecture, CLI commands, and Go implementation.",
      },
      hub: {
        projects_title: "Featured Engineering Projects",
        projects_subtitle: "Open-source tools and frameworks created by Sungmin Han.",
        principles_title: "Engineering Principles",
        p1_title: "Zero Friction",
        p1_desc: "Developer tools must eliminate repetitive setup steps and boilerplate with intelligent automation.",
        p2_title: "Concurrency First",
        p2_desc: "Leveraging Go goroutines and parallel pipelines to make setup and tasks blazingly fast.",
        p3_title: "Resilient & Idempotent",
        p3_desc: "Safe operations with automatic backups, state checks, and non-destructive configurations.",
        p4_title: "Thoughtful Minimalism",
        p4_desc: "Curating the best 5 tools instead of dumping 50 unvetted options.",
      },
      socials: {
        github: "https://github.com/kennethanceyer",
        linkedin: "https://www.linkedin.com/in/sungmin-han-768419133/",
        x: "https://x.com/kenneth_han",
        youtube: "https://youtube.com/@kenneth-han",
      },
      footer: {
        copyright: "Sungmin Han. All rights reserved.",
        built_with: "Crafted with Next.js, TypeScript & Emotion.",
      },
    },
  },
  ko: {
    translation: {
      nav: {
        dev_home: "개발 포털",
        bundle: "bundle",
        github: "깃허브",
        blog: "블로그",
        profile: "sungmin.me",
      },
      hero: {
        badge: "개발자 도구 & 오픈소스 생태계",
        title: "개발자를 위한 도구를 만듭니다",
        subtitle:
          "반복적인 수작업을 없애고 엔지니어링 생산성을 극대화하는 고성능 CLI 및 개발자 인프라 도구들을 제공합니다.",
        explore_bundle: "bundle 살펴보기",
        all_projects: "프로젝트 둘러보기",
        quick_install: "원클릭 설치",
      },
      bundle: {
        title: "bundle",
        tagline: "Go 언어로 제작된 macOS 맥북 자동 셋업 & 유지보수 도구",
        description:
          "새 맥북 세팅부터 개발 환경 동기화까지 한 번에. Oh My Zsh, Powerlevel10k, 런타임(Go, Node, Python), 모던 CLI 도구(zoxide, fzf, eza, ripgrep), 필수 앱 및 `code` CLI 심링크까지 완전 자동 구성합니다.",
        features_title: "왜 bundle 인가요?",
        features_subtitle:
          "새 맥북을 맞이할 때마다 수십 개의 brew 설치와 꼬여버린 PATH 설정으로 몇 시간씩 낭비하지 마세요.",
        f1_title: "원샷 자동 셋업",
        f1_desc:
          "시스템 상태를 자동 검사하고 누락된 컴포넌트만을 스마트하게 감지하여 원클릭으로 설치 및 연결합니다.",
        f2_title: "고성능 병렬 동행성",
        f2_desc:
          "Go 언어의 고루틴(Goroutine)과 채널을 기반으로 독립적인 패키지 다운로드와 빌드를 동시에 수행합니다.",
        f3_title: "피로도 없는 큐레이션 (최대 5가지 선택지)",
        f3_desc:
          "수십 개의 체크박스 대신, 가장 정제된 5개 이하의 직관적 프리셋으로 고민할 필요 없이 환경을 완성합니다.",
        f4_title: "완벽한 쉘 환경",
        f4_desc:
          "Oh My Zsh, Powerlevel10k, 자동완성, 문법 하이라이팅을 세팅하며 ~/.zshrc 백업을 자동으로 생성합니다.",
        f5_title: "개발 런타임 탑재",
        f5_desc:
          "Go, Node.js(+ npm), Python 3(+ pip) 등 개발에 필수적인 언어 런타임을 즉시 개발 가능한 상태로 준비합니다.",
        f6_title: "모던 CLI 파워 툴킷",
        f6_desc:
          "차세대 생산성 도구인 zoxide(스마트 cd), eza(모던 ls), ripgrep(초고속 검색), fzf, htop을 한 번에 세팅합니다.",
        f7_title: "앱 설치 & CLI 심링크 자동화",
        f7_desc:
          "VS Code와 Google Chrome을 설치하고, 터미널에서 즉시 쓸 수 있도록 `code` 명령어를 PATH에 자동 연결합니다.",
        f8_title: "시스템 닥터 & 통합 업데이터",
        f8_desc:
          "`bundle doctor`로 환경 설정 무결성을 검증하고, `bundle update`로 툴과 테마를 최신 상태로 유지합니다.",
        install_heading: "단 1초 만에 시작하기",
        install_method_curl: "원라인 설치 (추천)",
        install_method_brew: "Homebrew",
        install_method_source: "소스 빌드",
        install_desc_curl: "터미널에 아래 한 줄 명령어를 붙여넣어 즉시 실행하세요:",
        install_desc_brew: "KennethanCeyer 공식 Homebrew 탭을 통해 설치:",
        install_desc_source: "Go 1.22+ 환경에서 소스 코드를 직접 빌드:",
        tui_preview_title: "인터랙티브 터미널 미리보기",
        tui_preview_subtitle: "직관적이고 미려한 터미널 인터페이스를 웹에서 먼저 경험해보세요.",
        packages_title: "포함된 도구 및 런타임",
        packages_subtitle: "현업 개발자에게 꼭 필요한 정예 도구들만 엄선했습니다.",
        commands_title: "CLI 명령어 가이드",
        commands_subtitle: "직관적인 CLI 명령어로 모든 셋업과 유지보수를 간결하게 실행합니다.",
        docs_title: "전체 문서 및 아키텍처",
        docs_subtitle: "프로젝트 상세 README와 아키텍처 다이어그램을 확인하세요.",
      },
      hub: {
        projects_title: "주요 엔지니어링 프로젝트",
        projects_subtitle: "한성민(KennethanCeyer)이 만들고 기여한 오픈소스 프로젝트들입니다.",
        principles_title: "엔지니어링 철학",
        p1_title: "제로 프릭션 (Zero Friction)",
        p1_desc: "개발 도구는 사람이 하던 반복 세팅과 환경 오류를 완전 자동화하여 마찰을 0으로 만들어야 합니다.",
        p2_title: "동시성 우선 (Concurrency First)",
        p2_desc: "Go의 동시성 모델을 활용하여 독립적인 작업들을 병렬 처리함으로써 극상의 속도를 달성합니다.",
        p3_title: "안전성과 멱등성 (Resilient & Idempotent)",
        p3_desc: "설정 파일 변경 전 자동 타임스탬프 백업을 수행하며 여러 번 실행해도 일관된 결과를 보장합니다.",
        p4_title: "정제된 미니멀리즘 (Thoughtful Minimalism)",
        p4_desc: "검증되지 않은 50가지 도구를 늘어놓는 대신, 실제로 가장 유용한 소수의 정예 도구를 제공합니다.",
      },
      socials: {
        github: "https://github.com/kennethanceyer",
        linkedin: "https://www.linkedin.com/in/sungmin-han-768419133/",
        x: "https://x.com/kenneth_han",
        youtube: "https://youtube.com/@kenneth-han",
      },
      footer: {
        copyright: "Sungmin Han. All rights reserved.",
        built_with: "Next.js, TypeScript, Emotion으로 제작되었습니다.",
      },
    },
  },
};
