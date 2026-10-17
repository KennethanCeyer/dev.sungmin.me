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
    tags: ["CLI", "macOS", "Go", "Automation", "Workstation"],
    en: {
      title: "coffee-bun",
      description:
        "A friendly, automated macOS MacBook setup and maintenance tool written in Go. Interactive tree TUI, concurrent goroutine streaming, and one-stop workstation configuration.",
      badge: "CLI: bun",
    },
    ko: {
      title: "coffee-bun",
      description:
        "Go 언어로 제작된 친절한 macOS 맥북 개발 환경 자동화 및 유지보수 도구. 대화형 인터랙티브 트리 TUI, 고루틴 동시성 실시간 스트리밍, 원스톱 맥 워크스테이션 구성을 제공합니다.",
      badge: "CLI: bun",
    },
    href: "/coffee-bun",
    command: "bun",
  },
];
