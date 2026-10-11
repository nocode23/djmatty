# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static single-page website for DJ MATTY (djmatty.cz) — a professional DJ based in Prague.  
No build step — plain HTML, CSS, and vanilla JS.

## Running locally

Open `index.html` directly in a browser, or use any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## File structure

```
index.html          # markup
css/
  style.css         # main styles (cache bust: ?v=N)
  fonts.css         # @font-face declarations
js/
  main.js           # all JavaScript (cache bust: ?v=N)
fonts/              # self-hosted woff2 (Anton, Barlow Condensed, Outfit)
images/             # locally hosted photos, logos, favicon, og-image
robots.txt
sitemap.xml
```

**Cache busting:** increment `?v=N` in `index.html` for `style.css` and `main.js` after any notable change.

## Architecture

- **Markup** — semantic sections with IDs in order: `#hero`, `#about`, `#reviews`, `#venues`, `#services`, `#gallery`, `#contact`
- **Styles** — CSS custom properties in `css/style.css` (`--red: #E31E24`, `--bg`, `--bg2`, `--bg3`, etc.)
- **Fonts** — self-hosted woff2 declared in `css/fonts.css`: Anton (hero), Barlow Condensed (headings), Outfit (body)

### Key design decisions

- **Loader** — SVG `<text>` with `stroke-dashoffset` animation draws "DJ MATTY" in red, then fades out after ~3.6s. Hero content animates in with `animation-delay` starting at 4s so it appears after the loader.
- **Reviews carousel** — infinite horizontal scroll via CSS `animation: scrollReviews` on a duplicated card set. Pauses on hover.
- **Scroll reveals** — `IntersectionObserver` toggles `.visible` on `.reveal` elements.
- **Parallax** — hero background `translateY` driven by `scroll` event listener (desktop only, `hover: hover` media query).
- **Lightbox** — CSS `display:flex` toggle on `#lightbox`, no library needed.
- **Contact form** — Web3Forms, access_key `ffcf9aa4-97c7-4f0f-bae8-62b28dacb083`, free tier 250 msg/month.
- **Date picker** — Flatpickr from CDN (jsdelivr.net), field `#fdate`, format `d.m.Y`, `minDate: 'today'`, locale `cs`.
- **Stats counter** — `.stat-number.counter[data-target]` elements; HTML holds final value as fallback; JS resets to `0` and counts up (2s easeOutCubic) on IntersectionObserver. Number and `+` in single element to avoid layout shift.
- **Gallery photo naming** — `images/gallery_<NN>_<akce>-<popis>.jpg`: lowercase ASCII, hyphens within parts, NN = two-digit order in the grid (07+ for newer photos), `.jpg` extension (e.g. `gallery_07_svatba-sklep.jpg`). Wide tiles (`.g-wide`, span 2 cols, 3:1) are used to keep the grid rows full.
- **Cache busting** — current versions: `style.css?v=33`, `main.js?v=14`.
- **Zip handoff to client** — user delivers the site to a non-technical party (for publishing to the real host) as a zip of the whole working tree, committed straight into the repo as `djmatty<N>.zip` (`djmatty.zip`, `djmatty2.zip`, `djmatty3.zip`, ...). When asked to "push the zip" / "udělat to samé jako předtím": `git add djmatty<N>.zip`, commit (message like "Add djmatty<N>.zip archive for download"), `git push origin main`, then hand back the raw download link `https://github.com/nocode23/djmatty/raw/main/djmatty<N>.zip`. Before trusting a zip the user hands you, verify its contents actually differ from the working tree (extract to a scratch dir, never over the project) rather than assuming it's newer.

## Brand

- Red: `#E31E24`
- Background: `#080808` (dark theme only)
- Fonts: Anton (hero), Barlow Condensed 700/800 (headings), Outfit (body)
