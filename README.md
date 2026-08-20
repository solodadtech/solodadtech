# solodadtech.com

Static website for [solodadtech.com](https://solodadtech.com), hosted on GitHub Pages.

## How it works

- Plain HTML styled with Tailwind CSS (via CDN), no build step.
- Logo assets live in `assets/` (`logo-light.png` for light mode, `logo-dark.png` for dark mode).
- Pushing to `main` automatically redeploys the live site (GitHub Pages).
- `CNAME` file tells GitHub Pages to serve the site at the custom domain.
- DNS is managed **as code** — see [DNS.md](DNS.md). Records live in
  [`dns/dnsconfig.js`](dns/dnsconfig.js) and are applied to Cloudflare
  automatically by the [Sync DNS action](.github/workflows/dns.yml).
  Namecheap remains the domain registrar.

## Editing the site

1. Edit `index.html` (styling is Tailwind CSS utility classes, via CDN).
2. Commit and push:

```bash
git add -A && git commit -m "feat: update site" && git push
```

The live site updates within a minute or two.

## Adding a subdomain for a new app

One line in [`dns/dnsconfig.js`](dns/dnsconfig.js) + push. See [DNS.md](DNS.md).
