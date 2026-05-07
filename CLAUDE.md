# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static single-page website for DJ MATTY (djmatty.cz) — a professional DJ based in Prague.  
Single file: `index.html` (HTML + embedded CSS + vanilla JS, no build step).

## Running locally

Open `index.html` directly in a browser, or use any static server:

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

Everything lives in `index.html`:

- **Styles** — embedded `<style>` block with CSS custom properties (`--red: #E31E24`, `--bg`, etc.)
- **Markup** — semantic sections with IDs: `#hero`, `#about`, `#services`, `#reviews`, `#gallery`, `#venues`, `#contact`
- **Scripts** — inline `<script>` at bottom; no external JS libraries

### Key design decisions

- **Loader** — SVG `<text>` with `stroke-dashoffset` animation draws "DJ MATTY" in red, then fades out after ~3.6s. Hero content animates in with `animation-delay` starting at 4s so it appears after the loader.
- **Reviews carousel** — infinite horizontal scroll via CSS `animation: scrollReviews` on a duplicated card set. Pauses on hover.
- **Scroll reveals** — `IntersectionObserver` toggles `.visible` on `.reveal` elements.
- **Parallax** — hero background `translateY` driven by `scroll` event listener.
- **Lightbox** — CSS `display:flex` toggle on `#lightbox`, no library needed.

## Content source

All photos served directly from `djmatty.cz/wp-content/uploads/2026/03/`. If the source site changes or goes down, images will break — download and host locally if needed.

## Brand

- Red: `#E31E24`
- Fonts: Bebas Neue (headings), Outfit (body) — loaded from Google Fonts
- Dark theme only: `#080808` background
