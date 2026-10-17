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
    tags: ["CLI", "macOS", "Go", "Automation"],
    en: {
      title: "coffee-bun",
      description:
        "Automated macOS setup and maintenance tool written in Go. One-shot configuration of shell, runtimes, and developer apps with high concurrency.",
      badge: "Command: bun",
    },
    ko: {
      title: "coffee-bun",
      description:
        "Go 언어로 작성된 macOS 맥북 자동 셋업 및 유지보수 도구. 고루틴 기반 병렬 처리로 쉘, 런타임, 필수 앱을 한 번에 구성합니다.",
      badge: "Command: bun",
    },
    href: "/coffee-bun",
    command: "bun",
  },
];
