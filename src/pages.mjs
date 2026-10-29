import { site, services, cities, partners, gallery } from './config.mjs';
import { guides } from './guides.mjs';
import { page, esc, icon } from './layout.mjs';

const pic = (name, alt, { eager = false, cls = '' } = {}) =>
  `<picture><source type="image/webp" srcset="/assets/img/work/${name}.webp"><img class="${cls}" src="/assets/img/work/${name}.jpg" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;

const moreSection = () => `
<section id="more" class="section more-section" aria-labelledby="more-title">
  <div class="container">
    <p class="kicker center reveal">You may be interested</p>
    <div class="more-grid">
      <a class="more-card reveal" href="${site.lightsUrl}" target="_blank" rel="noopener" data-track="lights_click">
        <div class="more-photo">${pic('lights-holiday-mix', 'House outlined with permanent multicolour holiday lights')}</div>
        <div class="more-copy">
          <span class="more-brand">Our partners · Holiday lights</span>
          <h2 id="more-title">Permanent holiday lights, <span class="lights-text">no ladders ever again</span></h2>
          <p>Slim LED tracks hidden under your roofline. Christmas, Halloween or warm white every night, all from your phone.</p>
          <span class="btn btn-lights">See permanent lights <span aria-hidden="true">→</span></span>
        </div>
      </a>
      <a class="more-card more-gutters reveal" href="${site.guttersUrl}" target="_blank" rel="noopener" data-track="gutters_click">
        <div class="more-photo">${pic('winter-icicles', 'Icicles hanging from a clogged gutter under heavy snow')}</div>
        <div class="more-copy">
          <span class="more-brand">Our partners · Gutter cleaning</span>
          <h2>Icicles on the gutters? <span class="grad-text">That's a clog.</span></h2>
          <p>Gutter cleaning, repair and LeafGuard installation so meltwater drains away instead of freezing into ice dams.</p>
          <span class="btn btn-ice">See gutter cleaning <span aria-hidden="true">→</span></span>
        </div>
      </a>
    </div>
  </div>
</section>`;

const serviceOptions = [
  'Car dig-out', 'Driveway clearing', 'Sidewalks, walkways & steps', 'Flat roof, deck or balcony',
  'Roof snow / ice dam removal', 'Salting & ice removal', 'Windrow at the end of the driveway', 'Other / not sure',
];

const propertyOptions = ['1–2 car driveway', '3–4 car driveway', '5+ car / long driveway', 'Townhouse / walkway only', 'Just my car'];

const leadForm = () => `
<section id="quote" class="quote-section" aria-labelledby="quote-title">
  <div class="container">
    <form class="lead-form" action="/api/lead" method="post" novalidate>
      <div class="form-head">
        <h2 id="quote-title">Your snow removal quote in 60 seconds</h2>
        <p>Tell us what's buried, and we'll call you right back with a price.</p>
      </div>
      <div class="form-grid">
        <label>Name<input name="name" autocomplete="name" required maxlength="80" placeholder="Your name"></label>
        <label>Phone<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="30" placeholder="(416) 000-0000"></label>
        <label class="span-2">Address<input name="address" autocomplete="street-address" maxlength="160" placeholder="123 Queen St W"></label>
        <label>City
          <select name="city" required>
            <option value="">Select city</option>
            ${cities.map((c) => `<option>${c}</option>`).join('')}
            <option>Other GTA</option>
          </select>
        </label>
        <label>Property
          <select name="property">
            <option value="">Select size</option>
            ${propertyOptions.map((s) => `<option>${s}</option>`).join('')}
          </select>
        </label>
        <label class="span-2">Service
          <select name="service" required>
            <option value="">Choose a service</option>
            ${serviceOptions.map((s) => `<option>${s}</option>`).join('')}
          </select>
        </label>
        <label><span>Email <span class="opt">(optional)</span></span><input name="email" type="email" autocomplete="email" maxlength="120" placeholder="you@email.com"></label>
        <label><span>Details <span class="opt">(optional)</span></span><input name="message" maxlength="1500" placeholder="Corner lot, steep driveway, best time to call…"></label>
      </div>
      <input class="hp" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign">
      <input type="hidden" name="utm_term"><input type="hidden" name="gclid"><input type="hidden" name="page">
      <button class="btn btn-call btn-lg btn-block" type="submit">Get my free quote</button>
      <p class="form-status" role="status" aria-live="polite"></p>
      <p class="form-alt"><a href="tel:${site.phone.tel}" data-track="phone_click"><span class="call-word">Call </span>${site.phone.display}</a></p>
    </form>
    <div class="trust-strip reveal">
      <div class="trust-main">
        <strong>1 call</strong>
        <span>and your snow is gone, anywhere in <b>Toronto &amp; the GTA</b></span>
      </div>
      <ul class="trust-list">
        <li>${icon('shield')} Fully insured crews</li>
        <li>${icon('check')} Free estimates</li>
        <li>${icon('clock')} Same-day clearing</li>
        <li>${icon('camera')} Photos of every job</li>
      </ul>
    </div>
  </div>
</section>`;

const partnerItem = (p) =>
  p.logo
    ? `<li><img src="${p.logo}" alt="${esc(p.name)}" height="36" loading="lazy"></li>`
    : `<li class="wm wm-${p.style}">${esc(p.name)}</li>`;

const marquee = () => `
<section class="partners" aria-label="Trusted by and working with">
  <p class="partners-title">Trusted on and working with</p>
  <div class="marquee">
    <ul class="marquee-track">${partners.map(partnerItem).join('')}</ul>
    <ul class="marquee-track" aria-hidden="true">${partners.map(partnerItem).join('')}</ul>
  </div>
</section>`;

const faqs = [
  ['How much does snow removal cost in Toronto?', 'It depends on how much snow there is and what needs clearing: driveway, walkways, steps or roof. Send the form with your address or call, and we will give you a price before we start.'],
  ['How fast can you come?', 'Usually within an hour of your call. During a big storm everyone calls at once, so the sooner you reach us, the sooner we can fit you in.'],
  ['Can you dig out my car?', 'Yes. We brush the snow off, dig out the wheels, chip away the ice around the car and clear a path to the street. Great after the plow has buried your street parking.'],
  ['Do you clear the windrow left by the city plow?', 'Yes. The ridge of heavy, packed snow at the end of your driveway can be cleared on the same visit, just mention it when you call.'],
  ['Do you clear flat roofs, decks and balconies?', 'Yes. We shovel snow off flat roofs, garage roofs, rooftop decks and balconies by hand, leaving a thin layer so the membrane is not damaged.'],
  ['Do you remove ice dams and icicles?', 'Yes. We rake snow off sloped roofs, knock down dangerous icicles and open channels through ice dams so the water can drain.'],
  ['Is your salt safe for pets and interlock?', 'We use rock salt by default and pet-friendly, concrete-safe ice melt on request. Just tell us when you call.'],
  ['Which areas do you serve?', `All of Toronto and the GTA: ${cities.slice(0, 13).join(', ')} and more.`],
];

// Lumpy snowdrift edge, like a wool blanket of snow.
const drift = [52, 38, 58, 30, 46, 62, 34, 50, 40, 56, 28, 48];
const driftPath = `M0 120V${drift[0]}${drift.map((h, i) => `Q${i * 120 + 60} ${h - 34} ${(i + 1) * 120} ${drift[(i + 1) % drift.length]}`).join('')}V120z`;
const wave = (cls, fill) =>
  `<svg class="wave ${cls}" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path fill="${fill}" d="${driftPath}"/></svg>`;

const pains = [
  ['warn', 'Slips and lawsuits', 'An icy walkway is the most common winter injury. If someone falls on your property, you may be held responsible.'],
  ['clock', 'Late for work', 'The city plow buries the end of your driveway in heavy, packed snow at 5 am. You are digging out instead of driving.'],
  ['house', 'Ice dams & roof leaks', 'Snow left on the roof melts and refreezes at the eaves. Water backs up under the shingles and into your ceiling.'],
  ['shovel', 'Back injuries', 'Wet Toronto snow can weigh more than 20 kg per shovelful. Every winter, emergency rooms fill up with shovelling injuries.'],
];

// Animated snowfall layer (pure CSS, see .snow in main.css).
const snowfall = () => `<div class="snow" aria-hidden="true">${'<i></i>'.repeat(36)}</div>`;

const home = () => {
  const body = `
<section class="hero">
  ${snowfall()}
  <div class="container hero-inner">
    <div class="hero-banner reveal"><picture><source srcset="/assets/img/hero-knit.webp" type="image/webp"><img src="/assets/img/hero-knit.jpg" alt="Toronto Residential Snow Force: knitted winter scene with the CN Tower, a crew in orange vests digging out a red car and clearing a driveway" width="1280" height="714" fetchpriority="high"></picture></div>
    <div class="hero-copy">
      <div>
        <p class="eyebrow reveal">${icon('car')} Car dig-out &amp; driveway clearing · Toronto</p>
        <h1 class="reveal">Snowed in? <span class="yarn-text">We'll dig you out.</span></h1>
        <p class="hero-lead reveal">Call or message us whenever you need, and our crew will be there within an hour.</p>
        <p class="hero-sub reveal">Cars, driveways, windrows, walkways, steps, roofs and salting for Toronto homes.</p>
      </div>
      <div>
        <div class="hero-ctas reveal">
          <a class="btn btn-call btn-xl" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')}<span><span class="call-word">Call </span>${site.phone.display}</span></a>
          <a class="btn btn-glass btn-xl" href="#quote" data-track="quote_click">Get a free quote</a>
        </div>
        <ul class="hero-trust reveal">
          <li>${icon('shield')} Fully insured</li>
          <li>${icon('truck')} Crew within an hour</li>
          <li>${icon('clock')} Free estimates</li>
        </ul>
      </div>
    </div>
  </div>
  ${wave('wave-bottom', 'var(--bg)')}
</section>
${leadForm()}
${marquee()}
<section class="section services" aria-labelledby="services-title">
  <div class="container">
    <p class="kicker center reveal">What we do</p>
    <h2 id="services-title" class="section-title reveal">Every kind of snow, one call</h2>
    <div class="services-grid">
      ${services.map((s) => `
      <article id="${s.id}" class="service-card reveal">
        <span class="service-icon">${icon(s.icon)}</span>
        <div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <a href="#quote" class="link-arrow" data-track="quote_click">Get a price <span aria-hidden="true">→</span></a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section id="work" class="section work" aria-labelledby="work-title">
  <div class="container">
    <p class="kicker center reveal">Real jobs, real photos</p>
    <h2 id="work-title" class="section-title reveal">Our work in Toronto</h2>
    <p class="section-sub reveal">Driveways, walkways and flat roofs we cleared this winter.</p>
    <div class="work-grid">
      ${gallery.map((g) => `
      <figure class="work-item reveal">${pic(g.img, g.alt)}<figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>
<section class="section pains" aria-labelledby="pains-title">
  <div class="container">
    <p class="kicker center reveal">Why let us do it</p>
    <h2 id="pains-title" class="section-title reveal">Snow is never <em>just</em> snow</h2>
    <p class="section-sub reveal">Toronto gets over a metre of snow in an average winter, and most of it is heavy, wet and followed by a freeze.</p>
    <div class="pain-grid">
      ${pains.map(([i, t, d]) => `
      <article class="pain-card reveal">
        <span class="pain-icon">${icon(i)}</span>
        <h3>${t}</h3>
        <p>${d}</p>
      </article>`).join('')}
    </div>
    <div class="relief reveal">
      <p><strong>Good news:</strong> you don't have to touch a shovel. One call and a crew comes out to clear it for you.</p>
      <a class="btn btn-call" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} <span><span class="call-word">Call </span>${site.phone.display}</span></a>
    </div>
  </div>
</section>
<section class="section steps-section" aria-labelledby="how-title">
  <div class="container">
    <p class="kicker center reveal">Simple as 1-2-3-4</p>
    <h2 id="how-title" class="section-title reveal">From your call to a clear driveway</h2>
    <ol class="steps">
      <li class="reveal"><span class="step-icon">${icon('phone')}</span><strong>Call or send the form</strong><span>Tell us your address and what needs clearing. A photo helps.</span></li>
      <li class="reveal"><span class="step-icon">${icon('check')}</span><strong>Get a price</strong><span>A clear price before we start, no surprises.</span></li>
      <li class="reveal"><span class="step-icon">${icon('truck')}</span><strong>We come out</strong><span>Usually within an hour: shovelled, scraped and salted.</span></li>
      <li class="reveal"><span class="step-icon">${icon('camera')}</span><strong>See the result</strong><span>Photos when we are done. Pay when you are happy.</span></li>
    </ol>
  </div>
</section>
${moreSection()}
<section id="faq" class="section" aria-labelledby="faq-title">
  <div class="container narrow">
    <h2 id="faq-title" class="section-title reveal">Questions? We've got answers</h2>
    ${faqs.map(([q, a]) => `<details class="faq reveal"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
  </div>
</section>
<section class="final-cta">
  ${wave('wave-top', 'var(--bg)')}
  ${snowfall()}
  <div class="container">
    <span class="final-drop" aria-hidden="true">${icon('snow')}</span>
    <h2 class="reveal">Snowed in right now?</h2>
    <p class="reveal">Call or message us and we'll send a crew. Free quote, no obligation. ${esc(site.area)}.</p>
    <div class="hero-ctas center reveal">
      <a class="btn btn-call btn-xl" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')}<span><span class="call-word">Call </span>${site.phone.display}</span></a>
      <a class="btn btn-glass btn-xl" href="#quote" data-track="quote_click">Get a free quote</a>
    </div>
  </div>
</section>`;


  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return page({
    path: '/',
    title: `Car Dig-Out & Driveway Snow Clearing Toronto | ${site.brand}`,
    description: `Residential snow removal in Toronto: car dig-out, driveway and windrow clearing, walkways, salting and roofs. Crew within an hour. Call ${site.phone.display}.`,
    body,
    schema: [faqSchema],
  });
};

const guidesIndex = () =>
  page({
    path: '/guides/',
    title: `Snow Removal Guides & How-To | ${site.brand}`,
    description: 'Practical winter advice for Toronto homeowners: driveways, ice dams, salt and sidewalk rules.',
    body: `
<section class="section article-head">
  <div class="container narrow">
    <h1>Winter guides &amp; how-to</h1>
    <p class="section-sub left">Practical advice on getting through a Toronto winter without a sore back.</p>
    <ul class="guide-list">
      ${guides.map((g) => `<li><a href="/guides/${g.slug}/"><strong>${esc(g.title)}</strong><span>${esc(g.description)}</span></a></li>`).join('')}
    </ul>
  </div>
</section>`,
  });

const guidePage = (g) =>
  page({
    path: `/guides/${g.slug}/`,
    title: `${g.title} | ${site.brand}`,
    description: g.description,
    schema: [{
      '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.description,
      publisher: { '@type': 'Organization', name: site.brand },
    }],
    body: `
<article class="section article">
  <div class="container narrow">
    <p class="crumbs"><a href="/">Home</a> / <a href="/guides/">Guides</a></p>
    <h1>${esc(g.title)}</h1>
    ${g.body}
    <aside class="article-cta">
      <h2>Need help with the snow?</h2>
      <p>Free quote in Toronto &amp; the GTA. A crew within an hour of your call.</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="/#quote" data-track="quote_click">Get a free quote</a>
        <a class="btn btn-outline" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} ${site.phone.display}</a>
      </div>
    </aside>
    <p class="more-guides"><strong>More guides:</strong> ${guides.filter((o) => o !== g).map((o) => `<a href="/guides/${o.slug}/">${esc(o.short)}</a>`).join(' · ')}</p>
  </div>
</article>`,
  });

const thankYou = () =>
  page({
    path: '/thank-you/',
    title: `Thank you | ${site.brand}`,
    description: 'Your request has been received.',
    noindex: true,
    body: `
<section class="section thanks">
  <div class="container narrow center">
    <span class="thanks-icon">${icon('check')}</span>
    <h1>Thank you! Your request is in.</h1>
    <p>We will call you back shortly. Need us sooner?</p>
    <a class="btn btn-primary btn-lg" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} <span><span class="call-word">Call </span>${site.phone.display}</span></a>
    <p class="muted">While you wait: <a href="/guides/">read our winter guides</a>.</p>
  </div>
</section>
${moreSection()}
<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead'});</script>`,
  });

const privacy = () =>
  page({
    path: '/privacy/',
    title: `Privacy Policy | ${site.brand}`,
    description: `How ${site.brand} handles information you send through this website.`,
    body: `
<article class="section article">
  <div class="container narrow">
    <h1>Privacy policy</h1>
    <p>This website is operated by ${esc(site.brand)}. We respect your privacy and handle personal information in line with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).</p>
    <h2>What we collect</h2>
    <p>When you request a quote we collect the details you enter: name, phone number, address, email (optional), city, property size, the service you need and your message. We also record the advertising campaign that brought you to the site (for example a Google Ads click ID) so we can measure which ads work.</p>
    <h2>How we use it</h2>
    <p>Only to contact you about your request, prepare a quote and provide the service. We do not sell or rent your information.</p>
    <h2>Cookies and analytics</h2>
    <p>We use Google Tag Manager, Google Analytics and Google Ads conversion tracking, which may set cookies to measure visits and ad performance. You can block cookies in your browser settings or opt out of personalised ads at <a href="https://adssettings.google.com" rel="noopener">adssettings.google.com</a>.</p>
    <h2>Contact</h2>
    <p>To access or delete your information, call <a href="tel:${site.phone.tel}">${site.phone.display}</a> or message us on <a href="https://wa.me/${site.whatsapp}" rel="noopener">WhatsApp</a>.</p>
  </div>
</article>`,
  });

const lightsPage = () =>
  page({
    path: '/lights/',
    title: `Permanent holiday lights in Toronto`,
    description: 'Permanent LED holiday lights installed across Toronto & the GTA.',
    body: `
<style>.sticky-cta, .fab-lights { display: none; } .fab-call { bottom: calc(16px + env(safe-area-inset-bottom)); } body { padding-bottom: 0; }</style>
<section class="section lights-page">
  <div class="container lights-inner">
    <div class="lights-photo">${pic('lights-holiday-mix', 'Home outlined with permanent multicolour holiday lights', { eager: true })}</div>
    <div>
      <p class="kicker">We do this too</p>
      <h1>Permanent holiday lights, <span class="lights-text">installed by the same crew</span></h1>
      <p>The team that clears your snow also installs permanent LED lights along the roofline. They mount on the same fascia, stay up all year and are nearly invisible by day.</p>
      <ul class="check-list">
        <li>${icon('check')} 16 million colours and ready-made holiday scenes</li>
        <li>${icon('check')} Control from your phone, with timers and voice</li>
        <li>${icon('check')} No more ladders every November and January</li>
        <li>${icon('check')} Most homes done in one day</li>
      </ul>
      <a class="btn btn-lights btn-xl" href="${site.lightsUrl}" data-track="lights_click">Learn more about permanent lights <span aria-hidden="true">→</span></a>
      <p class="muted"><a href="/">← Back to snow removal</a></p>
    </div>
  </div>
  <div class="container lights-ba">
    <h2>Before &amp; after</h2>
    <div class="lights-ba-grid">
      <figure><div class="lights-ba-img"><span class="ba-tag">Before</span><span class="ba-tag ba-tag-after">After</span>${pic('lights-ba-1', 'Two-storey home: by day on the left, permanent lights on at night on the right')}</div><figcaption>Two-storey with garage</figcaption></figure>
      <figure><div class="lights-ba-img"><span class="ba-tag">Before</span><span class="ba-tag ba-tag-after">After</span>${pic('lights-ba-3', 'Home with dormers: by day on the left, permanent lights on at night on the right')}</div><figcaption>Dormers and gables</figcaption></figure>
    </div>
    <a class="btn btn-lights btn-lg" href="${site.lightsUrl}" data-track="lights_click">See more permanent lights <span aria-hidden="true">→</span></a>
  </div>
</section>`,
  });

const notFound = () =>
  page({
    path: '/404',
    title: `Page not found | ${site.brand}`,
    description: 'Page not found.',
    noindex: true,
    body: `
<section class="section">
  <div class="container narrow center">
    <h1>Page not found</h1>
    <p>The page you are looking for doesn't exist.</p>
    <a class="btn btn-primary" href="/">Go to home page</a>
  </div>
</section>`,
  });

export const pages = () => [
  ['index.html', home()],
  ['guides/index.html', guidesIndex()],
  ...guides.map((g) => [`guides/${g.slug}/index.html`, guidePage(g)]),
  ['thank-you/index.html', thankYou()],
  ['privacy/index.html', privacy()],
  ['lights/index.html', lightsPage()],
  ['404.html', notFound()],
];

export const sitemapPaths = () => ['/', '/guides/', ...guides.map((g) => `/guides/${g.slug}/`), '/privacy/'];
