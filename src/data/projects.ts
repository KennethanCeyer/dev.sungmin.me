export interface ProjectItem {
  id: string;
  tags: string[];
  en: {
    title: string;
    description: string;
    badge: string;
  };
  ko: {
    title: string;
    description: string;
    badge: string;
  };
  href: string;
  command: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "coffee-bun",
    tags: ["CLI", "Go", "macOS", "Linux", "Windows"],
    en: {
      title: "coffee-bun",
      description:
        "Cross-platform workstation setup and maintenance CLI written in Go (macOS, Linux, Windows). Provides an interactive tree TUI, concurrent package installation, environment diagnostics, and repository updates.",
      badge: "CLI: bun",
    },
    ko: {
      title: "coffee-bun",
      description:
        "Go 기반 크로스 플랫폼(macOS, Linux, Windows) 개발 환경 구성 및 유지보수 CLI 도구. 인터랙티브 트리 TUI, 병렬 패키지 설치, 환경 상태 진단(doctor), 패키지 및 Git 저장소 업데이트를 지원합니다.",
      badge: "CLI: bun",
    },
    href: "/coffee-bun",
    command: "bun",
  },
];
