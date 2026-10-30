import { site, services } from './config.mjs';
import { guides } from './guides.mjs';

// Cache-busting suffix for CSS/JS (they are served with a long cache lifetime).
const v = Date.now().toString(36);

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const icons = {
  phone: '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
  leaf: '<path d="M17 8C8 10 5.9 16.2 3.8 21.3l1.9.7 1-2.3c.5.2 1 .3 1.3.3C19 20 22 3 22 3c-1 2-8 2.3-13 3.3S2 11.5 2 13.5s1.8 3.8 1.8 3.8C7 8 17 8 17 8z"/>',
  drain: '<path d="M7 2h4v9h6v4h-2v7h-4v-7H7V2zm2 2v9h4v7h0v-7h2v0H9V4z"/>',
  wrench: '<path d="M22.7 19 13.6 9.9c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>',
  drop: '<path d="M12 2s-7 7.6-7 12.5A7 7 0 0 0 12 21.5a7 7 0 0 0 7-7C19 9.6 12 2 12 2z"/>',
  bracket: '<path d="M3 4h18v4h-2V6H5v2H3V4zm2 6h14v3a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-3zm2 2v1a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-1H7z"/>',
  house: '<path d="M12 3 2 12h3v8h5v-6h4v6h5v-8h3L12 3z"/>',
  star: '<path d="M12 17.3 18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2 7.4 14l-1.6 7z"/>',
  check: '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>',
  menu: '<path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>',
  flood: '<path d="M2 15c1.7 0 2.2-1 4-1s2.3 1 4 1 2.2-1 4-1 2.3 1 4 1 2.2-1 4-1v2c-1.7 0-2.2 1-4 1s-2.3-1-4-1-2.2 1-4 1-2.3-1-4-1-2.2 1-4 1v-2zm0 4c1.7 0 2.2-1 4-1s2.3 1 4 1 2.2-1 4-1 2.3 1 4 1 2.2-1 4-1v2c-1.7 0-2.2 1-4 1s-2.3-1-4-1-2.2 1-4 1-2.3-1-4-1-2.2 1-4 1v-2zM12 2l8 7v3h-2v-2l-6-5.3L6 10v2H4V9l8-7z"/>',
  warn: '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
  snow: '<path d="M22 11h-4.17l3.24-3.24-1.41-1.42L15 11h-2V9l4.66-4.66-1.42-1.41L13 6.17V2h-2v4.17L7.76 2.93 6.34 4.34 11 9v2H9L4.34 6.34 2.93 7.76 6.17 11H2v2h4.17l-3.24 3.24 1.41 1.42L9 13h2v2l-4.66 4.66 1.42 1.41L11 17.83V22h2v-4.17l3.24 3.24 1.42-1.41L13 15v-2h2l4.66 4.66 1.41-1.42L17.83 13H22z"/>',
  shield: '<path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>',
  clock: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>',
  camera: '<path d="M9 3 7.17 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.17L15 3H9zm3 15a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>',
  whatsapp: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.88 9.88 0 0 1 9.88 9.89c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41z"/>',
  truck: '<path d="M20 8h-3V4H3a2 2 0 0 0-2 2v11h2a3 3 0 0 0 6 0h6a3 3 0 0 0 6 0h2v-5l-3-4zM6 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm13.5-9 1.96 2.5H17V9.5h2.5zM18 18.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>',
  shovel: '<path d="M20.7 3.3a1 1 0 0 0-1.4 0l-1.6 1.6-.7-.7-1.4 1.4.7.7-5.6 5.6-1.4-1.4L3 16.8a3 3 0 0 0 0 4.2 3 3 0 0 0 4.2 0l6.3-6.3-1.4-1.4 5.6-5.6.7.7 1.4-1.4-.7-.7 1.6-1.6a1 1 0 0 0 0-1.4z"/>',
  road: '<path d="M2 20 7.5 4h2L9 8h2V4h2v4h2l-.5-4h2L22 20h-8v-4h-4v4H2zm8.2-6h3.6l-.4-4h-2.8l-.4 4z"/>',
  building: '<path d="M3 21V3h12v4h6v14h-8v-4h-2v4H3zm2-2h4v-4h6v4h4V9h-6V5H5v14zm2-12h2v2H7V7zm4 0h2v2h-2V7zm-4 4h2v2H7v-2zm4 0h2v2h-2v-2zm6 0h2v2h-2v-2zm0 4h2v2h-2v-2z"/>',
  car: '<path d="M18.9 6c-.2-.6-.8-1-1.4-1H6.5c-.7 0-1.2.4-1.4 1L3 12v8a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h12v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-8l-2.1-6zM6.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 11l1.5-4.5h11L19 11H5z"/>',
  close: '<path d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/>',
};

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icons[name]}</svg>`;

const telLink = (cls, label, track = 'phone_click') =>
  `<a class="${cls}" href="tel:${site.phone.tel}" data-track="${track}">${label}</a>`;

const gtmHead = () =>
  site.gtmId
    ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');</script>`
    : '<script>window.dataLayer=window.dataLayer||[];</script>';

const gtmBody = () =>
  site.gtmId
    ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${site.gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`
    : '';

const header = () => `
<header class="site-header">
  <div class="container header-inner">
    <a class="logo" href="/" aria-label="${esc(site.brand)} home">
      <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="8.5" r="6.5" fill="#f6efe2"/><path d="M19.5 6.5l3 2.5M24 3.5v4M28.5 6.5l-3 2.5M20 11l3-1.5M28 11l-3-1.5" stroke="#d9cdb8" stroke-width="1.3" stroke-linecap="round"/><path d="M7 34C7 20.5 14.5 13 24 13s17 7.5 17 21z" fill="#e8772e"/><path d="M13 33c0-9 3-15.5 7.5-19M19 33c0-9 1.5-15 4-19.8M29 33c0-9-1.5-15-4-19.8M35 33c0-9-3-15.5-7.5-19" stroke="#c45a1d" stroke-width="1.4" fill="none" stroke-linecap="round"/><g stroke="#f6efe2" stroke-width="1.7" stroke-linecap="round"><path d="M24 19.5v10M19.7 22l8.6 5M19.7 27l8.6-5"/></g><rect x="5" y="31.5" width="38" height="11" rx="5" fill="#1c2b55"/><g stroke="#f6efe2" stroke-width="1.6" stroke-linecap="round" opacity=".85"><path d="M10 34.5v5M14.5 34.5v5M19 34.5v5M23.5 34.5v5M28 34.5v5M32.5 34.5v5M37 34.5v5"/></g></svg>
      <span class="logo-text"><span class="logo-name">Snow Force</span><span class="logo-sub">Toronto · Residential</span></span>
    </a>
    ${telLink('header-phone', `${icon('phone')}<span>${site.phone.display}</span>`)}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open menu">${icon('menu')}</button>
  </div>
  <nav id="site-menu" class="site-menu" hidden aria-label="Main menu">
    <div class="menu-panel">
      <button class="menu-close" type="button" aria-label="Close menu">${icon('close')}</button>
      <p class="menu-heading">What we clear</p>
      <ul>
        ${services.map((s) => `<li><a href="/#${s.id}">${esc(s.title)}</a></li>`).join('')}
      </ul>
      <p class="menu-heading">Winter tips</p>
      <ul>
        ${guides.map((g) => `<li><a href="/guides/${g.slug}/">${esc(g.short)}</a></li>`).join('')}
        <li><a href="/guides/">All winter tips</a></li>
      </ul>
      <p class="menu-heading">About us</p>
      <ul>
        <li><a href="/#work">Recent jobs</a></li>
        <li><a href="/#faq">Common questions</a></li>
      </ul>
      <p class="menu-heading">Our partners</p>
      <ul>
        <li><a href="${site.lightsUrl}" target="_blank" rel="noopener" data-track="lights_click">Year-round LED roof lights ↗</a></li>
        <li><a href="${site.guttersUrl}" target="_blank" rel="noopener" data-track="gutters_click">Gutter cleaning &amp; guards ↗</a></li>
      </ul>
      <a class="btn btn-primary btn-block" href="/#quote" data-track="quote_click">Ask for a price</a>
      ${telLink('btn btn-outline btn-block', `${icon('phone')} ${site.phone.display}`)}
    </div>
  </nav>
</header>`;

const footer = () => `
<footer class="site-footer">
  <div class="container footer-grid">
    <div>
      <p class="footer-brand">${esc(site.brand)}</p>
      <p>A residential snow crew for ${esc(site.area)}: buried cars, driveways, plow ridges, steps and roofs.</p>
    </div>
    <div>
      <p class="footer-heading">Reach the crew</p>
      <p>${telLink('', site.phone.display)}<br><a href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener">WhatsApp</a><br>${esc(site.hours)}</p>
    </div>
    <div>
      <p class="footer-heading">Winter tips</p>
      <p>${guides.map((g) => `<a href="/guides/${g.slug}/">${esc(g.short)}</a>`).join('<br>')}</p>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© ${new Date().getFullYear()} ${esc(site.brand)}</span>
    <a href="/privacy/">Privacy</a>
  </div>
</footer>
<div class="sticky-cta" role="region" aria-label="Contact us">
  ${telLink('sticky-call', `${icon('phone')}<span><span class="call-word">Call </span>${site.phone.display}</span>`)}
  <a class="sticky-quote" href="/#quote" data-track="quote_click">Ask for a price</a>
</div>
<a class="fab-call fab-whatsapp" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" data-track="whatsapp_click">${icon('whatsapp')}<span class="sr-only">Chat with us on WhatsApp</span></a>
<a class="fab-lights" href="/lights/" data-track="lights_click"><svg viewBox="0 0 48 34" aria-hidden="true"><path class="wire" d="M2 8Q24 30 46 8"/><g transform="rotate(-25 7.3 12.6)"><rect x="5.699999999999999" y="11.6" width="3.2" height="3" rx=".6" fill="#8a94b0"/><ellipse class="b b1" cx="7.3" cy="18.6" rx="3.4" ry="4.8"/></g><g transform="rotate(-12 15.6 17.4)"><rect x="14.0" y="16.4" width="3.2" height="3" rx=".6" fill="#8a94b0"/><ellipse class="b b2" cx="15.6" cy="23.4" rx="3.4" ry="4.8"/></g><g transform="rotate(0 24 19)"><rect x="22.4" y="18" width="3.2" height="3" rx=".6" fill="#8a94b0"/><ellipse class="b b3" cx="24" cy="25" rx="3.4" ry="4.8"/></g><g transform="rotate(12 32.4 17.4)"><rect x="30.799999999999997" y="16.4" width="3.2" height="3" rx=".6" fill="#8a94b0"/><ellipse class="b b4" cx="32.4" cy="23.4" rx="3.4" ry="4.8"/></g><g transform="rotate(25 40.7 12.6)"><rect x="39.1" y="11.6" width="3.2" height="3" rx=".6" fill="#8a94b0"/><ellipse class="b b5" cx="40.7" cy="18.6" rx="3.4" ry="4.8"/></g></svg><span class="sr-only">Our crew also installs roof lights</span></a>`;

const orgSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  description: 'Residential snow removal in Toronto: car dig-out, driveway clearing, walkways and salting',
  name: site.brand,
  url: site.url,
  telephone: site.phone.tel,
  areaServed: { '@type': 'City', name: 'Toronto' },
});

export function page({ path, title, description, body, schema = [], noindex = false }) {
  const canonical = site.url + path;
  const ld = [orgSchema(), ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('');
  return `<!doctype html>
<html lang="en-CA">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/og-knit.jpg">
<meta name="theme-color" content="#14213f">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap">
<link rel="stylesheet" href="/assets/css/main.css?v=${v}">
${gtmHead()}
${ld}
</head>
<body>
${gtmBody()}
<a class="skip-link" href="#main">Skip to content</a>
${header()}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js?v=${v}" defer></script>
</body>
</html>
`;
}
