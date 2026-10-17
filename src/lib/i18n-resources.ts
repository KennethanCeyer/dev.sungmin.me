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
        tagline: "Automated macOS Setup & Maintenance Tool",
        description:
          "One-shot setup and environment synchronization for macOS. Written in Go. Provisions Oh My Zsh, Powerlevel10k, dev runtimes (Go, Node, Python), modern CLI utilities, and essential apps with automated verification.",
        action_install: "Install",
        action_docs: "Documentation",
        action_github: "GitHub",
        back_to_projects: "Projects",
        badge_go: "Go 1.22+",
        badge_macos: "macOS",
        badge_license: "MIT License",
        badge_cmd: "Command: bun",
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
        install_subheading:
          "Execute via single-command bootstrap or compile from source.",
        install_method_curl: "One-Line Bootstrap",
        install_method_brew: "Homebrew Tap",
        install_method_source: "Build from Source",
        install_desc_curl: "Run the bootstrap script directly in your terminal:",
        install_desc_brew: "Install via KennethanCeyer Homebrew tap:",
        install_desc_source: "Build from repository using Go 1.22+:",
        tui_preview_title: "Terminal Interface Preview",
        tui_preview_subtitle:
          "Minimalist, responsive terminal workflow via the `bun` command.",
        packages_title: "Included Components",
        packages_subtitle:
          "Curated tools and runtimes included in the default distribution.",
        commands_title: "CLI Command Reference (`bun`)",
        commands_subtitle:
          "Standardized command set for installation, inspection, and maintenance.",
        th_command: "Command",
        th_action: "Action",
        cmd_bun_desc:
          "Launch interactive terminal interface (TUI) with ≤ 5 presets",
        cmd_check_desc: "Inspect system environment and report missing tools",
        cmd_install_desc:
          "Non-interactive batch provisioning for all missing packages",
        cmd_doctor_desc:
          "Verify environment diagnostics, ~/.zshrc hooks, and CLI links",
        cmd_update_desc:
          "Upgrade formulae, casks, and pull fresh Oh My Zsh themes",
        docs_title: "Documentation",
        docs_subtitle:
          "Complete repository README and technical specifications.",
        packages_cat_shell: "Shell & Theme",
        packages_cat_runtimes: "Dev Runtimes",
        packages_cat_cli: "Modern CLI Tools",
        packages_cat_apps: "Applications",
        pkg_omz_desc: "Zsh community framework",
        pkg_p10k_desc: "Fast, flexible prompt theme",
        pkg_autosuggest_desc: "Fish-style command autocompletion",
        pkg_highlight_desc: "Realtime terminal syntax highlighting",
        pkg_go_desc: "1.22+ runtime engine",
        pkg_node_desc: "LTS JavaScript runtime bundled with npm",
        pkg_python_desc: "Python 3 interpreter bundled with pip",
        pkg_zoxide_desc: "Frecency-based cd alternative",
        pkg_fzf_desc: "Fuzzy finder utility",
        pkg_ripgrep_desc: "High-performance grep replacement",
        pkg_eza_desc: "Modern ls replacement with colors",
        pkg_htop_desc: "Interactive process viewer",
        pkg_git_desc: "Version control engine",
        pkg_vscode_desc: "Code editor with automated PATH linking",
        pkg_chrome_desc: "Web browser",
        sim_header_title: "Interactive TUI Preview (macOS)",
        sim_header_subtitle:
          "Select a preset or click Run to simulate bun execution",
        sim_run_btn: "Run Simulation",
        sim_running_btn: "Executing...",
        sim_footer_tip:
          "Keyboard navigation: Click presets to inspect automated steps.",
        sim_preset1_title: "1. Quick Setup (All Missing Essentials)",
        sim_preset1_badge: "3 pending",
        sim_preset1_desc:
          "Scan and install missing tools in one shot via parallel workers.",
        sim_preset2_title: "2. Shell & CLI Tools",
        sim_preset2_badge: "1 pending",
        sim_preset2_desc:
          "Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git",
        sim_preset3_title: "3. Dev Runtimes",
        sim_preset3_badge: "Ready",
        sim_preset3_desc:
          "Go 1.22+, Node.js (with npm), Python 3 (with pip)",
        sim_preset4_title: "4. Applications & CLI Links",
        sim_preset4_badge: "Ready",
        sim_preset4_desc:
          "Visual Studio Code (+ code symlink) and Google Chrome",
        sim_preset5_title: "5. Diagnostic Check",
        sim_preset5_badge: "Passed",
        sim_preset5_desc:
          "Audit PATH, Homebrew permissions, shell configurations",
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
        tagline: "macOS 맥북 자동 셋업 및 유지보수 도구",
        description:
          "Go 언어로 제작된 macOS 환경 자동 구성 도구. `bun` 명령어를 통해 Oh My Zsh, Powerlevel10k, 런타임(Go, Node, Python), 모던 CLI(zoxide, fzf, eza, ripgrep), 필수 앱 및 `code` CLI 심링크를 원샷으로 세팅합니다.",
        action_install: "설치 안내",
        action_docs: "기술 문서",
        action_github: "GitHub",
        back_to_projects: "프로젝트 목록",
        badge_go: "Go 1.22+",
        badge_macos: "macOS",
        badge_license: "MIT 라이선스",
        badge_cmd: "CLI 명령어: bun",
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
        install_subheading:
          "원라인 부트스트랩 명령어로 즉시 설치하거나 소스 코드를 통해 빌드할 수 있습니다.",
        install_method_curl: "원라인 부트스트랩 (추천)",
        install_method_brew: "Homebrew",
        install_method_source: "소스 빌드",
        install_desc_curl: "터미널에 아래 한 줄 명령어를 입력하여 실행합니다:",
        install_desc_brew: "KennethanCeyer 공식 Homebrew 탭을 통해 설치:",
        install_desc_source: "Go 1.22+ 환경에서 소스 코드를 직접 빌드:",
        tui_preview_title: "터미널 인터페이스 미리보기",
        tui_preview_subtitle:
          "`bun` 명령어로 실행되는 직관적인 터미널 인터페이스를 웹에서 경험해보세요.",
        packages_title: "포함된 컴포넌트",
        packages_subtitle:
          "현업 개발 환경에 꼭 필요한 핵심 도구들로 구성되었습니다.",
        commands_title: "CLI 명령어 가이드 (`bun`)",
        commands_subtitle:
          "설치, 점검, 업데이트를 위한 표준 CLI 명령어 세트입니다.",
        th_command: "명령어",
        th_action: "동작 설명",
        cmd_bun_desc:
          "최대 5개의 직관적인 프리셋으로 터미널 대화형 인터페이스(TUI) 실행",
        cmd_check_desc: "시스템 환경을 진단하고 누락된 개발 도구 목록 리포트",
        cmd_install_desc:
          "누락된 모든 패키지를 백그라운드 병렬 처리로 원샷 자동 설치",
        cmd_doctor_desc:
          "환경 무결성 점검, ~/.zshrc 훅 및 CLI 심링크 상태 검증",
        cmd_update_desc:
          "Homebrew 패키지 및 최신 Oh My Zsh 테마 일괄 업데이트",
        docs_title: "문서 및 아키텍처",
        docs_subtitle: "프로젝트 공식 README와 기술 명세를 확인하세요.",
        packages_cat_shell: "쉘 환경 & 테마",
        packages_cat_runtimes: "개발 런타임",
        packages_cat_cli: "모던 CLI 도구",
        packages_cat_apps: "필수 애플리케이션",
        pkg_omz_desc: "가장 널리 쓰이는 Zsh 커뮤니티 프레임워크",
        pkg_p10k_desc: "초고속 반응 속도의 유연한 Zsh 프롬프트 테마",
        pkg_autosuggest_desc: "Fish 쉘 스타일의 명령어 자동완성 제안",
        pkg_highlight_desc: "터미널 명령어 실시간 구문 강조",
        pkg_go_desc: "Go 1.22+ 컴파일러 & 런타임",
        pkg_node_desc: "LTS 자바스크립트 런타임 (npm 포함)",
        pkg_python_desc: "파이썬 3 인터프리터 (pip 포함)",
        pkg_zoxide_desc: "방문 빈도 기반 스마트 디렉터리 이동 (cd 대체)",
        pkg_fzf_desc: "초고속 커맨드라인 퍼지 파인더",
        pkg_ripgrep_desc: "초고속 텍스트 검색 도구 (grep 대체)",
        pkg_eza_desc: "색상 및 아이콘 지원 모던 파일 목록 (ls 대체)",
        pkg_htop_desc: "대화형 시스템 프로세스 및 리소스 모니터",
        pkg_git_desc: "분산 버전 관리 엔진",
        pkg_vscode_desc: "코드 에디터 & 터미널 code CLI 심링크 자동 연결",
        pkg_chrome_desc: "모던 웹 브라우저",
        sim_header_title: "대화형 TUI 터미널 미리보기 (macOS)",
        sim_header_subtitle:
          "프리셋을 선택하거나 실행 버튼을 눌러 bun 동작을 시뮬레이션해보세요",
        sim_run_btn: "실행 시뮬레이션",
        sim_running_btn: "실행 중...",
        sim_footer_tip:
          "프리셋을 클릭하여 단계별 자동화 실행 절차를 확인할 수 있습니다.",
        sim_preset1_title: "1. 퀵 셋업 (누락된 필수 항목 전체)",
        sim_preset1_badge: "3개 항목 대기",
        sim_preset1_desc:
          "고루틴 병렬 처리로 누락된 개발 도구를 원샷으로 스캔하고 설치합니다.",
        sim_preset2_title: "2. 쉘 환경 & CLI 도구",
        sim_preset2_badge: "1개 항목 대기",
        sim_preset2_desc:
          "Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git 설정",
        sim_preset3_title: "3. 개발 런타임 환경",
        sim_preset3_badge: "준비 완료",
        sim_preset3_desc:
          "Go 1.22+, Node.js(npm 포함), Python 3(pip 포함) 준비",
        sim_preset4_title: "4. 필수 앱 & CLI 심링크",
        sim_preset4_badge: "준비 완료",
        sim_preset4_desc:
          "VS Code (+ code 명령어 심링크 자동 연결) 및 Chrome 브라우저",
        sim_preset5_title: "5. 환경 무결성 진단",
        sim_preset5_badge: "검증 완료",
        sim_preset5_desc:
          "PATH 환경변수, Homebrew 권한, 쉘 설정 무결성 검증",
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
