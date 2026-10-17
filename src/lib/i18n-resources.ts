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
          "A friendly, automated macOS MacBook setup and maintenance tool written in Go",
        description:
          "Takes every essential developer tool, compiler, shell configuration, and desktop app, and bundles them into an automated, concurrent setup workflow.",
        story_badge: "The Story Behind the Name",
        story_title: "Coffee and a warm bun while your Mac sets up",
        story_p1:
          "Every developer knows the mixed feelings of opening a brand-new MacBook: the hardware is gorgeous, but the setup ahead is daunting. Hunting down Nerd Fonts, tuning terminal schemes, symlinking the VS Code CLI, installing multiple language toolchains, configuring .zshrc, and fixing PATH issues can eat up half a day.",
        story_p2:
          "The command name bun comes directly from bundle—taking every essential tool, runtime, and shell configuration and bundling them together into a single automated step.",
        story_p3:
          "So why coffee-bun? Setting up your workstation shouldn't feel like troubleshooting a broken build. It should be a moment where you step away from the keyboard, brew a fresh cup of hot coffee, grab a warm coffee bun, and relax. While you take your break, coffee-bun handles the heavy lifting in the background.",
        action_install: "Installation",
        action_github: "GitHub Repository",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS (Apple Silicon & Intel)",
        badge_lang: "Go 1.22+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        features_title: "Core Architecture & Capabilities",
        features_subtitle:
          "Engineered in Go for concurrency, safety, and zero-friction developer experience.",
        f1_title: "Interactive Tree UI & Focusable Action Bar",
        f1_desc:
          "Organize packages into foldable categories (`[-]`/`[+]`). Cycle focus between the tree and action buttons (`[< Exit]`, `[Start Install]`) with Tab/Arrow keys without cryptic terminal traps.",
        f2_title: "Goroutine Concurrency & Live Stream",
        f2_desc:
          "Independent git clones, font downloads, and Homebrew formulae execute concurrently. A faint gray live stream dynamically shows the latest stdout line underneath each running task.",
        f3_title: "Sudo & Prerequisite Blocker Watcher",
        f3_desc:
          "When root permissions or system triggers (`xcode-select`, OpenJDK JVM symlink) are needed, coffee-bun displays copyable snippets and polls every 2-3s to resume automatically without restarting bun.",
        f4_title: "System Diagnostics (`bun doctor`)",
        f4_desc:
          "Thoroughly validates macOS version, Homebrew PATH, .zshrc theme, zoxide shell hooks, and VS Code CLI symlink integrity.",
        f5_title: "One-Stop Upgrader (`bun update`)",
        f5_desc:
          "Simultaneously upgrades Homebrew formulae and casks while pulling the latest git commits for Oh My Zsh, Powerlevel10k, zsh plugins, and the Ultimate Vim Runtime.",
        f6_title: "Automated Non-Interactive Provisioning",
        f6_desc:
          "`bun install all` or domain-specific flags (`bun install terminal`, `languages`, `cli`) allow headless provisioning inside dotfiles and setup automation scripts.",
        tui_title: "Interactive CLI Simulation (`bun`)",
        tui_subtitle:
          "Try out the authentic interactive tree navigation, live installation stream, doctor diagnostics, and one-stop updater.",
        eco_title: "Complete macOS Developer Workstation Stack",
        eco_subtitle:
          "Every essential toolchain, runtime, and shell configuration bundled and verified out of the box.",
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
          "Go 언어로 구현된 친절한 macOS 맥북 개발 환경 자동화 및 유지보수 도구",
        description:
          "새 맥북에 필요한 모든 필수 개발 도구, 컴파일러, 쉘 테마, 데스크톱 앱을 하나의 동시성 자동화 흐름으로 번들링하여 완벽하게 구성합니다.",
        story_badge: "이름에 담긴 이야기",
        story_title: "커피 한 잔과 따뜻한 번의 여유 — 맥북 세팅은 bun에게",
        story_p1:
          "새 맥북을 개봉했을 때의 설렘도 잠시, 개발자라면 누구나 몇 시간씩 걸리는 번거로운 터미널 환경 설정과 씨름해 본 경험이 있습니다. Homebrew 설치부터 Nerd 폰트 탐색, 터미널 컬러 프리셋, VS Code CLI 심링크 연결, 복수의 프로그래밍 언어 런타임과 .zshrc 환경 변수 트러블슈팅까지 끝없는 작업이 이어집니다.",
        story_p2:
          "bun이라는 명령어는 'bundle'에서 유래했습니다. 맥북 개발에 필요한 모든 필수 툴체인, 언어 런타임, 쉘 구성을 하나의 일괄 자동화 과정으로 번들링(묶음 처리)합니다.",
        story_p3:
          "왜 coffee-bun일까요? 개발 환경을 구축하는 과정이 스트레스 가득한 디버깅이 되어서는 안 됩니다. 키보드에서 잠시 손을 떼고, 따뜻한 커피 한 잔과 갓 구운 커피번을 즐기며 여유를 누려보세요. 당신이 티타임을 즐기는 동안, coffee-bun이 백그라운드에서 모든 환경 세팅을 완벽히 마쳐놓습니다.",
        action_install: "설치 안내",
        action_github: "GitHub 저장소",
        back_to_projects: "Developer Hub",
        badge_platform: "macOS (Apple Silicon & Intel)",
        badge_lang: "Go 1.22+",
        badge_cmd: "CLI: bun",
        badge_license: "MIT License",
        features_title: "핵심 아키텍처 및 엔지니어링 역량",
        features_subtitle:
          "반복 없는 안전하고 신속한 맥 워크스테이션 구축을 위해 Go 언어로 최적화되었습니다.",
        f1_title: "대화형 트리 UI & 포커스 액션 바",
        f1_desc:
          "패키지를 카테고리별로 접고 펼칠 수 있는 접이식 트리(`[-]`/`[+]`)를 제공합니다. Tab/화살표 키로 트리와 하단 버튼(`[< Exit]`, `[Start Install]`) 간 포커스를 매끄럽게 전환하며 터미널 트랩 없이 직관적으로 조작할 수 있습니다.",
        f2_title: "고루틴 동시성 & 실시간 표준출력 스트림",
        f2_desc:
          "독립된 Git 클론, 폰트 다운로드, Homebrew 설치가 고루틴을 통해 백그라운드에서 병렬로 실행됩니다. 각 실행 항목 바로 아래에 흐린 회색으로 실시간 stdout 한 줄 스트림이 표시되어 진행 상황을 투명하게 확인합니다.",
        f3_title: "Sudo & 사전 요구조건 블로커 와처",
        f3_desc:
          "관리자 권한이나 시스템 트리거(`xcode-select`, OpenJDK JVM 심링크 등)가 필요한 경우, 복사 가능한 터미널 명령어를 안내하고 백그라운드에서 2-3초 간격으로 폴링하여 문제가 해결되는 즉시 재실행 없이 자동으로 설치를 재개합니다.",
        f4_title: "시스템 정밀 진단 (`bun doctor`)",
        f4_desc:
          "macOS 환경, Homebrew PATH, .zshrc 테마, zoxide 쉘 통합, VS Code CLI (`code`) 심링크 연결 상태를 꼼꼼하게 점검하여 환경 무결성을 검증합니다.",
        f5_title: "원스톱 통합 업그레이더 (`bun update`)",
        f5_desc:
          "Homebrew 패키지와 Cask를 최신화함과 동시에 Oh My Zsh, Powerlevel10k, 플러그인, Ultimate Vim Runtime의 최신 Git 커밋을 일괄 동기화합니다.",
        f6_title: "비대화형 완전 자동화 (`bun install all`)",
        f6_desc:
          "`bun install all` 또는 도메인별 명령(`bun install terminal`, `languages`, `cli`)을 통해 닷파일 스크립트나 새 머신 프로비저닝 시 사용자 입력 없이 원샷으로 환경을 완성합니다.",
        tui_title: "대화형 CLI 시뮬레이션 (`bun`)",
        tui_subtitle:
          "실제 터미널과 동일한 접이식 트리 인터페이스, 병렬 설치 실시간 스트리밍, 닥터 진단, 통합 업데이트를 직접 체험해보세요.",
        eco_title: "제공되는 맥북 워크스테이션 패키지 구성",
        eco_subtitle:
          "개발에 필수적인 터미널, 에디터, 컴파일러, 클라우드 CLI, 모던 툴이 완벽하게 세팅됩니다.",
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
