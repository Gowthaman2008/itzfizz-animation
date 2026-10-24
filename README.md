# Itzfizz — Scroll-Driven Hero Animation

A top-view car drives along a road as you scroll, leaving a green trail while the headline
(**WELCOME ITZFIZZ**) reveals letter by letter and four statistics count up. Built with
React, Vite, GSAP + ScrollTrigger and Tailwind CSS.

## How it works
One pinned `ScrollTrigger` drives a single master timeline (`src/hooks/useScrollAnimation.js`).
Car position, trail scale, letter reveals, stat reveals and counters are all children of that
timeline, so they stay in sync and reverse automatically when scrolling up. Letters and stats
are scheduled by the car's measured x-position. Only `transform` and `opacity` are animated.
`prefers-reduced-motion` shows the final state without pinning.

## Install, run, build
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # output in dist/
npm run preview    # serve the production build locally
```

## Deploy to GitHub Pages
The Vite `base` is `./`, so the build works under `https://<user>.github.io/<repo>/` with no edits.
1. Push this project to a GitHub repo (branch `main`).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Push to `main`; `.github/workflows/deploy.yml` builds and publishes `dist/`.

Vercel / Netlify: import the repo, build command `npm run build`, output directory `dist`.

## Replace the car image
Drop a transparent top-view PNG facing **right** into `public/images/` (e.g. `car.png`) and change
`CAR_SRC` in `src/components/Car.jsx` to `images/car.png`. The lane is sized from `--car-w` and
assumes a 5:2 image (`--car-h` in `src/index.css`); change `--car-h` if your image differs.

## Customize
- `ANIMATION_CONFIG` in `src/hooks/useScrollAnimation.js`: scroll length (desktop/mobile), scrub
  smoothing, edge padding, stat/count durations.
- `src/index.css`: `--car-w`, road height, road/trail colors.
- `src/components/Statistics.jsx`: numbers and labels. `Headline.jsx`: the headline words.
