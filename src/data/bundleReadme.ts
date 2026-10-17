export const bundleReadmeContent = `# ⚡ bundle

[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=flat&logo=go)](https://golang.org)
[![Platform](https://img.shields.io/badge/Platform-macOS-black?style=flat&logo=apple)](https://apple.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Automated macOS MacBook Setup & Maintenance Tool** written in Go.  
> Set up Oh My Zsh, Powerlevel10k, Dev Runtimes (Go, Node, Python), Modern CLI tools (zoxide, htop, fzf, ripgrep, eza), and Essential Apps (VS Code + CLI, Chrome) in one shot.

---

## 🌟 Why bundle?

Setting up a fresh MacBook or keeping a development laptop in sync usually involves dozens of manual \`brew install\`, \`git clone\`, \`.zshrc\` edits, and CLI path symlink fixes.

**bundle** automates the entire process:
- 🚀 **One-Shot Automated Setup**: Scans and installs missing components with minimal friction.
- ⚡ **High Concurrency**: Goroutines and channels download and build components in parallel (independent git clones and packages run simultaneously).
- 🎯 **Thoughtful UX (≤ 5 Choices)**: No tedious 20+ item checkbox lists. Up to 5 curated, high-level choices with smart one-click presets.
- 🐚 **Shell Perfection**: Installs Oh My Zsh, Powerlevel10k, zsh-autosuggestions, zsh-syntax-highlighting, and connects them in \`.zshrc\` with automated backups.
- 💻 **Dev Runtimes**: Go, Node.js (with npm), and Python 3 (with pip).
- 🛠️ **Modern CLI Suite**: \`zoxide\`, \`htop\`, \`fzf\`, \`ripgrep\`, \`eza\`, and \`git\`.
- 🖥️ **Apps & CLI Fix**: Installs Google Chrome and Visual Studio Code, and **automatically symlinks the \`code\` CLI** to your PATH.
- 🩺 **System Diagnostics**: Built-in \`bundle doctor\` checks environment health and configuration integrity.
- 🔄 **One-Stop Upgrader**: \`bundle update\` keeps your Homebrew formulae, casks, and git themes fresh.

---

## 📦 What's Included

| Category | Component | Description & Integration |
| :--- | :--- | :--- |
| **Shell & Theme** | [Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) | Delightful community zsh framework |
| | [Powerlevel10k](https://github.com/romkatv/powerlevel10k) | Ultra-fast, flexible zsh prompt theme |
| | [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) | Fish-shell style command autocomplete suggestions |
| | [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) | Command syntax highlighting directly on the CLI |
| **Dev Runtimes** | [Go](https://go.dev/) | Open source programming language for fast, reliable apps |
| | [Node.js](https://nodejs.org/) | JavaScript runtime engine bundled with npm |
| | [Python 3](https://python.org/) | Python interpreter bundled with pip |
| **Modern CLI Tools**| [zoxide](https://github.com/ajeetdsouza/zoxide) | Smarter \`cd\` command with directory frecency |
| | [htop](https://htop.dev/) | Interactive process viewer and resource monitor |
| | [fzf](https://github.com/junegunn/fzf) | Blazing fast command-line fuzzy finder |
| | [ripgrep](https://github.com/BurntSushi/ripgrep) | Ultra-fast search tool (\`rg\`) |
| | [eza](https://github.com/eza-community/eza) | Modern, colorful replacement for \`ls\` |
| | [git](https://git-scm.com/) | Distributed version control |
| **Apps & Editors** | [Visual Studio Code](https://code.visualstudio.com/) | Code editor + **automated \`code\` CLI linking** |
| | [Google Chrome](https://www.google.com/chrome/) | Fast, secure modern web browser |

---

## 🚀 Quick Start

### 1. One-Line Install (Recommended)

Run the bootstrap installer directly in your terminal:

\`\`\`bash
curl -fsSL https://raw.githubusercontent.com/KennethanCeyer/bundle/master/install.sh | bash
\`\`\`

The script verifies macOS, ensures Homebrew and Go are available, builds \`bundle\`, and symlinks it into \`~/.local/bin/bundle\`.

---

### 2. Install via Homebrew

\`\`\`bash
brew install KennethanCeyer/bundle/bundle
\`\`\`

---

### 3. Build from Source

\`\`\`bash
git clone https://github.com/KennethanCeyer/bundle.git
cd bundle
make install
\`\`\`

---

## 💻 Usage & CLI Commands

### 🎮 Interactive Mode (TUI)

Simply run \`bundle\` in your terminal:

\`\`\`bash
bundle
\`\`\`

You will be greeted with an interactive terminal interface designed with **at most 5 curated options**:

\`\`\`text
 ⚡ bundle • macOS MacBook Setup & Maintenance 

  Choose a preset to run (Max 5 curated choices, one-click install)

  ▸ 🚀 Quick Setup (All Missing Essentials) [3 missing items]
    Scan and install all missing recommended tools in one shot

    🐚 Shell & CLI Power Tools [1 missing]
    Oh My Zsh, Powerlevel10k, zoxide, fzf, htop, ripgrep, eza, git

    💻 Dev Runtimes & Languages [✓ Ready]
    Go, Node.js (+ npm), Python 3 (+ pip)

    🖥️  Apps & Editors [✓ Ready]
    Visual Studio Code (+ \`code\` CLI link) & Google Chrome

    🔄 Check Status & Updates
    Inspect installed tools and upgrade outdated packages & themes

  ─────────────────────────────────────────────────────────────
  [↑/↓] Navigate  •  [Enter] Select & Run  •  [q] Quit
\`\`\`

---

### 🔍 System Inspection (\`bundle check\`)

Check what is installed, their current versions, and what is missing across all categories:

\`\`\`bash
bundle check
\`\`\`

---

### ⚡ Non-Interactive Installation (\`bundle install\`)

Ideal for dotfiles, bootstrap scripts, or automated provisioning:

\`\`\`bash
# Install all missing essentials
bundle install all

# Install specific category
bundle install shell
bundle install runtimes
bundle install apps

# Install specific packages by name
bundle install zoxide htop go
\`\`\`

---

### 🔄 Update & Maintenance (\`bundle update\`)

Upgrade Homebrew packages and pull the latest changes for Oh My Zsh, Powerlevel10k, and installed plugins:

\`\`\`bash
bundle update
\`\`\`

---

### 🩺 System Doctor (\`bundle doctor\`)

Verify configuration files (\`~/.zshrc\`), PATH settings, and whether the \`code\` CLI is linked:

\`\`\`bash
bundle doctor
\`\`\`

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/KennethanCeyer/bundle/blob/master/LICENSE).
`;
