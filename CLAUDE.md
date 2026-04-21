# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `hugo server` — local dev server with live reload (serves at http://localhost:1313)
- `hugo` — build site to `public/`
- `bash add-slides.sh` — import new images from `input/<subfolder>/` into the gallery

Hugo extended v0.152.2 is required (used in CI).

## Architecture

Single-page Hugo site for ceramics artist Lieve De Schutter (artware.be). No theme — everything is custom. Multilingual (NL default, EN).

### Key files

- `layouts/index.html` — only template; sticky navbar, hero, about strip, process carousel, three gallery carousels (witteklei/grijzeklei/zwarteklei), footer, cookie banner
- `assets/css/style.css` — all styles (CSS variables, Bootstrap overrides, carousels, cookie banner)
- `assets/js/main.js` — PhotoSwipe v5 init for all galleries, navbar collapse/scroll fix, GA + cookie consent logic
- `hugo.toml` — multilingual config (nl/en), `gaID` param, image cache, taxonomies disabled
- `i18n/nl.yaml` / `i18n/en.yaml` — all translatable strings
- `add-slides.sh` — batch import script (see below)

### Assets

- `assets/images/gallery/witteklei/slide*.jpg` — white clay gallery
- `assets/images/gallery/grijzeklei/slide*.jpg` — grey clay gallery
- `assets/images/gallery/zwarteklei/slide*.jpg` — black clay gallery
- `assets/images/gallery/process/slide*.jpg` — process carousel
- `assets/images/hero.jpg` — hero section image
- `assets/images/logo.png` / `assets/images/logo-white.png` — navbar / footer logos

All assets go through the Hugo asset pipeline (`resources.Get`, `resources.Match`, fingerprint for cache busting).

### Adding new slides

1. Place images in `input/<subfolder>/` (e.g. `input/witteklei/`)
2. Run `bash add-slides.sh` — it renames files to `slide%04d.jpg`, applies a watermark, and skips already-imported images using a per-subfolder SHA256 hash file (`assets/images/gallery/<subfolder>/.imported_hashes`)
3. Commit the new slides and updated hash file

### Deployment

Automatic via GitHub Actions (`.github/workflows/hugo.yaml`) on push to `main` — builds with `hugo --gc --minify` and deploys to GitHub Pages.
