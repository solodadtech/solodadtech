# solodadtech.com

Static website for [solodadtech.com](https://solodadtech.com), hosted on GitHub Pages.

## How it works

- Plain HTML styled with Tailwind CSS (via CDN), no build step.
- Logo assets live in `assets/` (`logo-light.png` for light mode, `logo-dark.png` for dark mode).
- Pushing to `main` automatically redeploys the live site (GitHub Pages).
- `CNAME` file tells GitHub Pages to serve the site at the custom domain.
- DNS is managed at Namecheap and points to GitHub Pages.

## Editing the site

1. Edit `index.html` / `styles.css`.
2. Commit and push:

```bash
git add -A && git commit -m "feat: update site" && git push
```

The live site updates within a minute or two.

## DNS records (Namecheap → Advanced DNS)

| Type  | Host | Value                 |
|-------|------|-----------------------|
| A     | @    | 185.199.108.153       |
| A     | @    | 185.199.109.153       |
| A     | @    | 185.199.110.153       |
| A     | @    | 185.199.111.153       |
| CNAME | www  | solodadtech.github.io |
