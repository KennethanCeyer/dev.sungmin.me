# dev.sungmin.me

Developer Portal & Open-Source Project Showcase for **Sungmin Han ([@KennethanCeyer](https://github.com/KennethanCeyer))**.

This repository hosts:
- **dev.sungmin.me**: Central gallery for developer infrastructure, open-source projects, and engineering tools.
- **coffee-bun.dev.sungmin.me** (`/coffee-bun`): Documentation and setup guide for **coffee-bun** (Automated macOS MacBook Setup & Maintenance Tool, command: `bun`).

---

## Design System

Strictly aligned with [sungmin.me](https://github.com/KennethanCeyer/sungmin.me) and [blog.sungmin.me](https://github.com/KennethanCeyer/blog.sungmin.me):
- **Framework**: [Next.js](https://nextjs.org) (App Router) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [@emotion/react](https://emotion.sh) & [@emotion/styled](https://emotion.sh)
- **Palette**: Pure monotone (black, white, muted grays) without vibrant accent colors or emojis
- **Typography**: Pretendard, Plus Jakarta Sans, Roboto Mono
- **Visuals**: Geometric generative canvas thumbnails and subtle particle grid background
- **Code & Markdown**: ReactMarkdown, remark-gfm, syntax highlighting, and copy utilities
- **i18n**: Bilingual support (English & 한국어)

---

## Getting Started

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
To view the `coffee-bun` showcase, open [http://localhost:3000/coffee-bun](http://localhost:3000/coffee-bun).

---

## Project Structure

```
dev.sungmin.me/
├── public/                 # Static assets, favicons, manifests
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── coffee-bun/ # coffee-bun showcase page (CLI: bun)
│   │   │   ├── bundle/     # Legacy redirect to coffee-bun
│   │   │   ├── layout.tsx  # Root layout with emotion registry
│   │   │   └── page.tsx    # Main developer projects gallery
│   │   └── page.tsx        # Locale redirect
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
│   ├── data/               # Project gallery items & documentation
│   ├── lib/                # Pattern generator & i18n
│   ├── styles/             # Global styles and theme tokens
│   └── proxy.ts            # Subdomain & locale routing
└── next.config.mjs         # Next.js configuration
```

---

## License

MIT © [Sungmin Han](https://sungmin.me)
