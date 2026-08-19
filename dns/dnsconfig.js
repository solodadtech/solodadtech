// DNS for solodadtech.com — managed as code with DNSControl.
// Edit this file, push to main, and the "Sync DNS" GitHub Action applies it.
// Docs: https://docs.dnscontrol.org

var REG_NONE = NewRegistrar("none"); // Namecheap stays the registrar; we only manage records
var DSP_CLOUDFLARE = NewDnsProvider("cloudflare");

D("solodadtech.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),

  // ── Website: GitHub Pages (repo: solodadtech/solodadtech) ─────────────
  A("@", "185.199.108.153"),
  A("@", "185.199.109.153"),
  A("@", "185.199.110.153"),
  A("@", "185.199.111.153"),
  CNAME("www", "solodadtech.github.io."),

  // ── Future apps: add one line per subdomain, e.g. ─────────────────────
  // CNAME("corkboard", "solodadtech.github.io."),   // + CNAME file in that repo

  // ── Email: Namecheap-hosted mail, carried over from the old zone ──────
  // (Remove this block only if you're sure nothing uses @solodadtech.com email.)
  MX("@", 5, "mx1-hosting.jellyfish.systems."),
  MX("@", 10, "mx2-hosting.jellyfish.systems."),
  MX("@", 20, "mx3-hosting.jellyfish.systems."),
  TXT("@", "v=spf1 +a +mx +ip4:198.54.114.23 +ip4:198.54.116.23 include:spf.web-hosting.com ~all"),
  A("mail", "198.54.115.23"),
  A("webmail", "198.54.115.23")
);
