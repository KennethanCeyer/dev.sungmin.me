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
    tags: ["CLI", "macOS", "Automation", "bundle.yml"],
    en: {
      title: "coffee-bun",
      description:
        "Initial environment automated management tool for macOS. Declaratively manage languages, toolchains, shells, and applications via bundle.yml and the bun CLI.",
      badge: "CLI: bun",
    },
    ko: {
      title: "coffee-bun",
      description:
        "macOS 초기 개발 환경 자동화 관리 도구. bundle.yml 선언적 매니페스트와 bun CLI를 통해 프로그래밍 언어, 툴체인, 쉘, 애플리케이션을 일괄 구성합니다.",
      badge: "CLI: bun",
    },
    href: "/coffee-bun",
    command: "bun",
  },
];
