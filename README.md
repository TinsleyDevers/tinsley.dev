# tinsley.dev

My personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. A minimalist, Swiss-style design with smooth animations and live data integrations.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Minimalist Design** — Clean, monochrome aesthetic with intentional typography and spacing
- **Smooth Animations** — Framer Motion powered transitions and micro-interactions
- **Live Data** — Real-time Last.fm top tracks and GitHub commit activity
- **Responsive** — Optimized for all screen sizes
- **Scroll Progress** — Visual indicator showing page scroll position
- **Section Navigation** — Header highlights current section while scrolling
- **Project Showcases** — Interactive visual previews for each project

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
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

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_LASTFM_API_KEY=your_lastfm_api_key
NEXT_PUBLIC_LASTFM_USERNAME=your_lastfm_username
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
```

## 📁 Project Structure

```
app/
├── components/
│   ├── Header.tsx        # Navigation with section highlighting
│   ├── Hero.tsx          # Landing section with bio
│   ├── Projects.tsx      # Project showcase with visual previews
│   ├── Timeline.tsx      # Education & work experience
│   ├── Spotify.tsx       # Last.fm + GitHub activity feed
│   ├── About.tsx         # Bio and skills grid
│   ├── Footer.tsx        # Contact links
│   ├── ScrollProgress.tsx
│   └── BackToTop.tsx
├── projects/
│   └── [slug]/
│       └── page.tsx      # Dynamic project detail pages
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
