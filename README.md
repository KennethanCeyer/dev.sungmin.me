# dev.sungmin.me

Official Developer Hub & Project Showcase Portal for **Sungmin Han ([@KennethanCeyer](https://github.com/KennethanCeyer))**.

This repository hosts:
- **`dev.sungmin.me`**: Central portal for developer infrastructure, open-source projects, and engineering tools.
- **`bundle.dev.sungmin.me`** (`/bundle`): Official landing and one-page documentation website for [**⚡ bundle**](https://github.com/KennethanCeyer/bundle) (Automated macOS MacBook Setup & Maintenance Tool).

---

## 🎨 Design System

Shared and aligned with [sungmin.me](https://github.com/KennethanCeyer/sungmin.me) and [blog.sungmin.me](https://github.com/KennethanCeyer/blog.sungmin.me):
- **Framework**: [Next.js](https://nextjs.org) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [@emotion/react](https://emotion.sh) & [@emotion/styled](https://emotion.sh)
- **Theme**: Instant, flicker-free Light & Dark mode support with CSS custom properties
- **Interactive Background**: Pointer-reactive particle grid canvas (`InteractiveGrid`)
- **Markdown & Code**: GitHub-flavored markdown rendering (`react-markdown` + `remark-gfm` + syntax highlighting + one-click copy)
- **Interactive TUI**: Live browser simulator for `bundle`'s ≤ 5 choice terminal UI
- **i18n**: Bilingual support (English & 한국어) with seamless language switching

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (tested with Node 20 / 22 / 26)
- npm or pnpm

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/KennethanCeyer/dev.sungmin.me.git
cd dev.sungmin.me

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.
To preview the `bundle` showcase directly, open [http://localhost:3000/bundle](http://localhost:3000/bundle).

---

## 🏗️ Project Architecture

```
dev.sungmin.me/
├── public/                 # Favicons, manifests, and static assets
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── bundle/     # bundle.dev.sungmin.me showcase page
│   │   │   ├── layout.tsx  # Typography, emotion registry & root layout
│   │   │   └── page.tsx    # dev.sungmin.me intro hub page
│   │   └── page.tsx        # Locale redirect
│   ├── assets/             # Logos and graphical assets
│   ├── components/         # Design system components
│   │   ├── CodeBlock.tsx
│   │   ├── CopyButton.tsx
│   │   ├── Footer.tsx
│   │   ├── GNB.tsx
│   │   ├── Header.tsx
│   │   ├── InteractiveGrid.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Providers.tsx
│   │   ├── TerminalSimulator.tsx
│   │   └── ThemeSwitcher.tsx
│   ├── contexts/           # ThemeContext (light/dark state)
│   ├── data/               # Project data & bundle documentation
│   ├── fonts/              # PretendardVariable font
│   ├── lib/                # Emotion cache & i18n initialization
│   ├── styles/             # Global styles and theme tokens
│   └── middleware.ts       # Subdomain & locale routing
└── next.config.mjs         # Next.js configuration & optimizations
```

---

## 📄 License

MIT © [Sungmin Han](https://sungmin.me)
