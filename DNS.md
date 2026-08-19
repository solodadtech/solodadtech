# DNS process for solodadtech.com

DNS is managed **as code** in [`dns/dnsconfig.js`](dns/dnsconfig.js).
Push a change to `main` and the [Sync DNS action](.github/workflows/dns.yml)
applies it to Cloudflare automatically. Namecheap remains the domain registrar.

```
edit dns/dnsconfig.js  →  git push  →  GitHub Action  →  Cloudflare DNS  →  live
```

## One-time setup (~15 minutes, done by the account owner)

1. **Create a free Cloudflare account** at cloudflare.com and click **Add a domain**
   → enter `solodadtech.com` → choose the **Free** plan.
   Cloudflare will import the existing records; keep them (the repo config takes
   over as the source of truth afterward).
2. Cloudflare shows **two nameservers** (like `xxx.ns.cloudflare.com`).
   In the **Namecheap dashboard** → Domain List → solodadtech.com → **Nameservers**
   → select **Custom DNS** → paste those two nameservers → save.
3. In Cloudflare: **My Profile → API Tokens → Create Token → "Edit zone DNS"
   template** → scope it to zone `solodadtech.com` → create, and copy the token.
4. In GitHub: repo **solodadtech/solodadtech → Settings → Secrets and variables →
   Actions → New repository secret** → name `CLOUDFLARE_API_TOKEN`, paste the token.

After step 2 propagates, run the **Sync DNS** workflow once (Actions tab → Sync DNS
→ Run workflow) or push any change under `dns/` — from then on it's automatic.

## Day-to-day: adding a record

Edit `dns/dnsconfig.js`, commit, push. Examples:

```js
// New app on GitHub Pages at corkboard.solodadtech.com:
CNAME("corkboard", "solodadtech.github.io."),

// Point a subdomain at some other host:
A("api", "203.0.113.10"),
```

For a new GitHub Pages app repo, also add a `CNAME` file containing
`corkboard.solodadtech.com` to that repo and enable Pages on it.

## Notes

- **Email**: the domain has live Namecheap-hosted mail (MX on
  `jellyfish.systems`). Those records are carried in `dnsconfig.js` — do not
  remove them unless you're certain nothing uses `@solodadtech.com` email.
- **Proxy**: records default to "DNS only" (grey cloud), which is what GitHub
  Pages needs for its own HTTPS certificates.
- The website itself deploys separately — any push to `main` republishes the
  site via GitHub Pages. This pipeline only handles DNS records.
