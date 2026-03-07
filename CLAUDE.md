# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `hugo server` — local dev server with live reload (serves at http://localhost:1313)
- `hugo` — build site to `public/`

Hugo extended v0.152.2 is required (used in CI).

## Architecture

This is a minimal single-page Hugo site for a ceramics artist (artware.be). There is no theme — everything is custom.

- `layouts/index.html` — the only template; renders a fullscreen slideshow with a centered logo overlay
- `static/css/style.css` — all styles; `.slide.active` sets opacity to 0.5 for background effect
- `static/js/main.js` — dynamically injects slide `<div>`s (currently loops 1–55), then cycles through them every 3 seconds
- `static/images/slide{N}.jpg` — slideshow images; numbered sequentially
- `hugo.toml` — minimal config (baseURL, language, logo param)

**Adding new slides:** add `slide{N}.jpg` to `static/images/` and update the loop upper bound in `static/js/main.js` (line 4).

Deployment is automatic via GitHub Actions (`.github/workflows/hugo.yaml`) on push to `main` — builds with `hugo --gc --minify` and deploys to GitHub Pages.
