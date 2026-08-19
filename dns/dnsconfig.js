// DNS for solodadtech.com — managed as code with DNSControl.
// Edit this file, push to main, and the "Sync DNS" GitHub Action applies it.
// This file is the source of truth: records NOT listed here get removed.
// Docs: https://docs.dnscontrol.org

var REG_NONE = NewRegistrar("none"); // Namecheap stays the registrar; we only manage records
var DSP_CLOUDFLARE = NewDnsProvider("cloudflare");

// cPanel DKIM public key (single logical string; providers chunk it as needed)
var DKIM_KEY = "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnVheJUnA6jsqnZqoFhjndf6WvBQua/wu6m0IcuK1wSJcuHxV+9wTGd3BTodW1drmV5agZ3Np2gJNhbhyz5p0jL5X6CDcD9FVGm14WrPXtWOiZsKu4ebS9SM8nt7jICzO5Yl1TRdzQeBrpmsV01f0A+hsoQySQeDiwpw1FUdXsguFzlo73JAyZmbjuEzAhrS64sX1LIjQZY43QVh/QOZGEj/MDJyHyfjpfDk+WTvy8AM6K7oO6RwFOBE6Xh73G60h+GIOHMFtwQLDpNcmWRTm7zV9qipIn9oFQQSZVuOXXetmUvnmeXXGgdjXvm3e2hmBlVvZt+8uyNUyjKX4kXR4ZwIDAQAB;";

var CPANEL_HOST = "198.54.115.23"; // Namecheap shared hosting box (mail + cPanel services)

D("solodadtech.com", REG_NONE, DnsProvider(DSP_CLOUDFLARE),

  // ── Website: GitHub Pages (repo: solodadtech/solodadtech) ─────────────
  // DNS only (grey cloud) so GitHub can issue its own HTTPS certificate.
  A("@", "185.199.108.153"),
  A("@", "185.199.109.153"),
  A("@", "185.199.110.153"),
  A("@", "185.199.111.153"),
  CNAME("www", "solodadtech.github.io."),

  // ── Future apps: add one line per subdomain, e.g. ─────────────────────
  // CNAME("corkboard", "solodadtech.github.io."),   // + CNAME file in that repo

  // ── Email: Namecheap cPanel mail (do not remove while email is in use) ─
  MX("@", 5, "mx1-hosting.jellyfish.systems."),
  MX("@", 10, "mx2-hosting.jellyfish.systems."),
  MX("@", 20, "mx3-hosting.jellyfish.systems."),
  TXT("@", "v=spf1 +a +mx +ip4:198.54.114.23 +ip4:198.54.116.23 include:spf.web-hosting.com ~all"),
  TXT("_dmarc", "v=DMARC1; p=none;"),
  TXT("default._domainkey", DKIM_KEY),
  A("mail", CPANEL_HOST),
  A("webmail", CPANEL_HOST),
  SRV("_autodiscover._tcp", 0, 0, 443, "cpanelemaildiscovery.cpanel.net."),
  A("autoconfig", CPANEL_HOST),
  A("autodiscover", CPANEL_HOST),

  // ── cPanel services (hosting control panel, FTP, calendars/contacts) ──
  A("cpanel", CPANEL_HOST),
  A("whm", CPANEL_HOST),
  A("ftp", CPANEL_HOST),
  A("webdisk", CPANEL_HOST),
  A("cpcalendars", CPANEL_HOST),
  A("cpcontacts", CPANEL_HOST),
  SRV("_caldavs._tcp", 0, 0, 2080, "solodadtech.com."),
  SRV("_caldav._tcp", 0, 0, 2079, "solodadtech.com."),
  SRV("_carddavs._tcp", 0, 0, 2080, "solodadtech.com."),
  SRV("_carddav._tcp", 0, 0, 2079, "solodadtech.com."),
  TXT("_caldavs._tcp", "path=/"),
  TXT("_caldav._tcp", "path=/"),
  TXT("_carddavs._tcp", "path=/"),
  TXT("_carddav._tcp", "path=/")
);
