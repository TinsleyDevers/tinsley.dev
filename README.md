# tinsley.dev

My personal portfolio website built with Next.js 16, TypeScript, and Tailwind CSS. A minimalist, Swiss-style design with smooth animations and live data integrations.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Minimalist Design** — Clean, monochrome aesthetic with intentional typography and spacing
- **Smooth Animations** — Framer Motion powered transitions and micro-interactions
- **Live Data** — Last.fm top tracks and GitHub commit activity, fetched server-side and refreshed every 30 minutes
- **Responsive** — Optimized for all screen sizes
- **Scroll Progress** — Visual indicator showing page scroll position
- **Section Navigation** — Header highlights current section while scrolling
- **Project Showcases** — Interactive visual previews for each project

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Font:** Geist Sans & Geist Mono

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tinsleydevers/tinsley.dev.git

# Navigate to the project
cd tinsley.dev

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Environment Variables

Create a `.env.local` file in the root directory. These are read server-side only, so the Last.fm API key never ships to the browser:

```env
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_USERNAME=your_lastfm_username
GITHUB_USERNAME=your_github_username
# Optional: raises the GitHub API rate limit
GITHUB_TOKEN=your_github_token
```

## 📁 Project Structure

```
app/
├── components/
│   ├── Header.tsx        # Navigation with section highlighting
│   ├── Hero.tsx          # Landing section with bio
│   ├── Projects.tsx      # Project showcase with visual previews
│   ├── Timeline.tsx      # Education & work experience
│   ├── LiveActivity.tsx  # Last.fm + GitHub activity feed (presentational)
│   ├── About.tsx         # Bio and skills grid
│   ├── Footer.tsx        # Contact links
│   ├── MotionProvider.tsx # LazyMotion + reduced-motion config
│   └── BackToTop.tsx
├── lib/
│   ├── activity.ts       # Server-side Last.fm + GitHub fetchers
│   └── projects.ts       # Project data (single source of truth)
├── projects/
│   └── [slug]/
│       ├── page.tsx      # Static project detail pages + per-page metadata
│       └── ProjectDetail.tsx
├── globals.css
├── layout.tsx
├── page.tsx
└── not-found.tsx
```

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎨 Design System

**Colors (Monochrome)**

- Background: `#ffffff`
- Text: `#171717`
- Muted: `#737373`
- Border: `#e5e5e5`

**Typography**

- Font: Geist Sans
- Mono: Geist Mono

## 📄 License

MIT License — feel free to use this as inspiration for your own portfolio!

## 🔗 Links

- **Live Site:** [tinsley.dev](https://tinsley.dev)
- **LinkedIn:** [Tinsley Devers](https://www.linkedin.com/in/tinsley-devers-40820a1b9/)
- **GitHub:** [@tinsleydevers](https://github.com/tinsleydevers)

---

Built with ☕ by Tinsley Devers
