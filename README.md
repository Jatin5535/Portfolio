# Jatin Agrawal — Portfolio

Personal portfolio built with Next.js 14, deployable to Vercel in one click.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Pure CSS (no Tailwind, no UI library)
- **Fonts**: DM Serif Display + DM Mono + Manrope (Google Fonts)
- **Animations**: CSS transitions + Intersection Observer

## Design
- Dark navy + gold editorial aesthetic
- Custom cursor with lag ring
- Scroll-triggered fade-up animations
- Noise texture overlay
- Responsive (mobile-first breakpoints at 900px)

## Deploy to Vercel

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
cd jatin-portfolio
npm install
vercel
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import from GitHub
3. Select the repo → Framework: Next.js → Deploy
4. Done. Auto-deploys on every push.

## Local Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Customization
- **Content**: Edit `app/page.tsx` — projects array, skills array, experience section
- **Colors**: Edit CSS variables in `app/globals.css` (`:root` block)
- **Fonts**: Change Google Fonts import at top of `globals.css`
- **Add GitHub link**: Add to `contact-links` in `page.tsx`

## Add a GitHub link
In `app/page.tsx`, find the `contact-links` div and add:
```tsx
<a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer" className="contact-link mono">
  ↗ GitHub
</a>
```
