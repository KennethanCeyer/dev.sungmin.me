export interface ProjectItem {
  id: string;
  tags: string[];
  en: {
    title: string;
    description: string;
    badge?: string;
  };
  ko: {
    title: string;
    description: string;
    badge?: string;
  };
  href: string;
  command?: string;
  isExternal?: boolean;
  featured?: boolean;
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
    featured: true,
  },
  {
    id: "grida",
    tags: ["Engine", "Canvas", "TypeScript", "Open Source"],
    en: {
      title: "Grida",
      description:
        "Open-source canvas engine, design-to-code compiler, and graphics framework. Bridging design and engineering for modern interfaces.",
      badge: "Open Source",
    },
    ko: {
      title: "Grida",
      description:
        "오픈소스 캔버스 엔진 및 디자인-투-코드 컴파일러. 디자이너와 엔지니어 간의 간극을 줄이는 차세대 인터페이스 프레임워크입니다.",
      badge: "Open Source",
    },
    href: "https://github.com/gridaco",
    isExternal: true,
    featured: true,
  },
  {
    id: "golang-ecosystem",
    tags: ["Go", "Infrastructure", "Cloud", "Architecture"],
    en: {
      title: "Go Infrastructure & Libraries",
      description:
        "Production-grade distributed system utilities, concurrency primitives, and cloud-native libraries maintained by GDG Golang Korea Lead.",
      badge: "Go 1.22+",
    },
    ko: {
      title: "Go 인프라 & 라이브러리",
      description:
        "GDG Golang Korea Lead가 개발 및 관리하는 프로덕션 레벨 분산 시스템 유틸리티 및 클라우드 네이티브 라이브러리 생태계.",
      badge: "Go 1.22+",
    },
    href: "https://sungmin.me",
    isExternal: true,
  },
  {
    id: "mlops-platform",
    tags: ["MLOps", "AI", "Cloud", "Python"],
    en: {
      title: "MLOps Architecture & Toolkits",
      description:
        "Scalable machine learning operations pipelines, Vertex AI workflows, and TPU acceleration patterns as Google Developer Expert.",
      badge: "AI / Cloud",
    },
    ko: {
      title: "MLOps 아키텍처 & 툴킷",
      description:
        "Google Developer Expert로서 연구하고 공유하는 확장 가능한 머신러닝 운영 파이프라인 및 TPU 가속 아키텍처 패턴.",
      badge: "AI / Cloud",
    },
    href: "https://blog.sungmin.me",
    isExternal: true,
  },
];
