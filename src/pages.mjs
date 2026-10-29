import { site, services, cities, partners, gallery } from './config.mjs';
import { guides } from './guides.mjs';
import { page, esc, icon } from './layout.mjs';

const pic = (name, alt, { eager = false, cls = '' } = {}) =>
  `<picture><source type="image/webp" srcset="/assets/img/work/${name}.webp"><img class="${cls}" src="/assets/img/work/${name}.jpg" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;

const moreSection = () => `
<section id="more" class="section more-section" aria-labelledby="more-title">
  <div class="container">
    <p class="kicker center reveal">Our partners</p>
    <div class="more-grid">
      <a class="more-card reveal" href="${site.lightsUrl}" target="_blank" rel="noopener" data-track="lights_click">
        <div class="more-photo">${pic('lights-holiday-mix', 'Roofline of a home glowing with multicolour LED track lights')}</div>
        <div class="more-copy">
          <span class="more-brand">Partner · Roofline lighting</span>
          <h2 id="more-title">Roof lights that stay up <span class="lights-text">all year round</span></h2>
          <p>Low-profile LED channels tucked under the eaves. Pick festive colours or a soft white glow from an app, any night of the year.</p>
          <span class="btn btn-lights">Explore roof lights <span aria-hidden="true">→</span></span>
        </div>
      </a>
      <a class="more-card more-gutters reveal" href="${site.guttersUrl}" target="_blank" rel="noopener" data-track="gutters_click">
        <div class="more-photo">${pic('winter-icicles', 'Gutter heavy with snow and a fringe of long icicles')}</div>
        <div class="more-copy">
          <span class="more-brand">Partner · Gutters</span>
          <h2>Big icicles usually mean <span class="grad-text">blocked gutters.</span></h2>
          <p>Cleaning, repairs and leaf guards that let melting snow run off the roof rather than freeze at the edge.</p>
          <span class="btn btn-ice">Explore gutter services <span aria-hidden="true">→</span></span>
        </div>
      </a>
    </div>
  </div>
</section>`;

const serviceOptions = [
  'Car dig-out', 'Driveway', 'Front path, steps & sidewalk', 'Flat roof, terrace or balcony',
  'Roof snow / icicles', 'Salt or ice chipping', 'Plow ridge at the driveway', 'Something else',
];

const propertyOptions = ['Fits 1–2 cars', 'Fits 3–4 cars', 'Long / 5+ cars', 'Path and steps only', 'Only the car'];

const leadForm = () => `
<section id="quote" class="quote-section" aria-labelledby="quote-title">
  <div class="container">
    <form class="lead-form" action="/api/lead" method="post" novalidate>
      <div class="form-head">
        <h2 id="quote-title">Tell us what is snowed in</h2>
        <p>A few quick details and a crew member phones you back with the price.</p>
      </div>
      <div class="form-grid">
        <label>Name<input name="name" autocomplete="name" required maxlength="80" placeholder="First name is fine"></label>
        <label>Phone<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required maxlength="30" placeholder="(416) 000-0000"></label>
        <label class="span-2">Street address<input name="address" autocomplete="street-address" maxlength="160" placeholder="45 Dundas St E"></label>
        <label>City
          <select name="city" required>
            <option value="">Pick your area</option>
            ${cities.map((c) => `<option>${c}</option>`).join('')}
            <option>Elsewhere in the GTA</option>
          </select>
        </label>
        <label>Driveway size
          <select name="property">
            <option value="">How big?</option>
            ${propertyOptions.map((s) => `<option>${s}</option>`).join('')}
          </select>
        </label>
        <label class="span-2">What needs clearing
          <select name="service" required>
            <option value="">Choose one</option>
            ${serviceOptions.map((s) => `<option>${s}</option>`).join('')}
          </select>
        </label>
        <label><span>Email <span class="opt">(optional)</span></span><input name="email" type="email" autocomplete="email" maxlength="120" placeholder="you@email.com"></label>
        <label><span>Notes <span class="opt">(optional)</span></span><input name="message" maxlength="1500" placeholder="Which car, parking spot, gate code…"></label>
      </div>
      <input class="hp" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign">
      <input type="hidden" name="utm_term"><input type="hidden" name="gclid"><input type="hidden" name="page">
      <button class="btn btn-call btn-lg btn-block" type="submit">Send my request</button>
      <p class="form-status" role="status" aria-live="polite"></p>
      <p class="form-alt"><a href="tel:${site.phone.tel}" data-track="phone_click"><span class="call-word">Call </span>${site.phone.display}</a></p>
    </form>
    <div class="trust-strip reveal">
      <div class="trust-main">
        <strong>60 min</strong>
        <span>is our usual arrival time after you phone, across <b>Toronto &amp; the GTA</b></span>
      </div>
      <ul class="trust-list">
        <li>${icon('shield')} Insured workers</li>
        <li>${icon('check')} Price agreed upfront</li>
        <li>${icon('car')} Cars and driveways</li>
        <li>${icon('camera')} Before &amp; after photos</li>
      </ul>
    </div>
  </div>
</section>`;

const partnerItem = (p) =>
  p.logo
    ? `<li><img src="${p.logo}" alt="${esc(p.name)}" height="36" loading="lazy"></li>`
    : `<li class="wm wm-${p.style}">${esc(p.name)}</li>`;

const marquee = () => `
<section class="partners" aria-label="Platforms and equipment">
  <p class="partners-title">Find us on and gear we rely on</p>
  <div class="marquee">
    <ul class="marquee-track">${partners.map(partnerItem).join('')}</ul>
    <ul class="marquee-track" aria-hidden="true">${partners.map(partnerItem).join('')}</ul>
  </div>
</section>`;

const faqs = [
  ['What will it cost?', 'Every job is different: one car on the street is quicker than a long driveway plus a roof. Phone us or use the form with your address and we name the price before anyone picks up a shovel.'],
  ['How soon can a crew get to me?', 'Most of the time within an hour after you reach us. On the heaviest storm days the phones get busy, so calling early helps.'],
  ['Can you dig out my car?', 'Yes, that is one of our most common calls. We sweep the snow off without scratching the paint, free the wheels from the plow bank and open a lane to the road.'],
  ['Will you move the plow ridge at the end of my driveway?', 'Yes. The packed bank the city plow leaves behind gets chopped up and shifted aside during that trip; tell us about it when you phone.'],
  ['Do you work on flat roofs and balconies?', 'Yes. Garage roofs, flat roofs, terraces and balconies are cleared by hand with plastic blades, and we leave a thin cushion of snow to protect the surface.'],
  ['Can you take down icicles?', 'Yes. We knock down hanging icicles safely, rake the lower roof edge and open the ice along the eaves so water can run off.'],
  ['What do you put down after clearing?', 'Regular rock salt unless you ask otherwise. If you have pets or new concrete, tell us and we bring a gentler melter.'],
  ['Where do you work?', `Across Toronto and the GTA, including ${cities.slice(0, 12).join(', ')}.`],
];

// Lumpy snowdrift edge, like a wool blanket of snow.
const drift = [52, 38, 58, 30, 46, 62, 34, 50, 40, 56, 28, 48];
const driftPath = `M0 120V${drift[0]}${drift.map((h, i) => `Q${i * 120 + 60} ${h - 34} ${(i + 1) * 120} ${drift[(i + 1) % drift.length]}`).join('')}V120z`;
const wave = (cls, fill) =>
  `<svg class="wave ${cls}" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path fill="${fill}" d="${driftPath}"/></svg>`;

const pains = [
  ['car', 'Stuck at the curb', 'The plow seals your parked car behind a frozen bank right before you need to leave for work.'],
  ['warn', 'Falls on the steps', 'Ice on stairs and paths is where most winter falls happen, and a guest who slips on your property is your problem.'],
  ['house', 'Water through the ceiling', 'Snow melting on a warm roof refreezes at the edge, and the trapped water finds its way indoors.'],
  ['shovel', 'Strained backs and hearts', 'Lifting wet snow in the cold is hard work. Hospitals see a wave of shovelling injuries after every big storm.'],
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
        <p class="eyebrow reveal">${icon('car')} Toronto · residential snow crew</p>
        <h1 class="reveal">Car buried? Driveway blocked? <span class="yarn-text">Leave it to us.</span></h1>
        <p class="hero-lead reveal">Phone or text any time and a crew usually pulls up within the hour.</p>
        <p class="hero-sub reveal">We free cars from plow banks, clear driveways and paths, salt the steps and take snow off roofs.</p>
      </div>
      <div>
        <div class="hero-ctas reveal">
          <a class="btn btn-call btn-xl" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')}<span><span class="call-word">Call </span>${site.phone.display}</span></a>
          <a class="btn btn-glass btn-xl" href="#quote" data-track="quote_click">Ask for a price</a>
        </div>
        <ul class="hero-trust reveal">
          <li>${icon('shield')} Insured</li>
          <li>${icon('truck')} Usually here in 60 min</li>
          <li>${icon('check')} Price before we start</li>
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
    <p class="kicker center reveal">Our services</p>
    <h2 id="services-title" class="section-title reveal">From the curb to the rooftop</h2>
    <div class="services-grid">
      ${services.map((s) => `
      <article id="${s.id}" class="service-card reveal">
        <span class="service-icon">${icon(s.icon)}</span>
        <div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
          <a href="#quote" class="link-arrow" data-track="quote_click">Ask about this <span aria-hidden="true">→</span></a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section id="work" class="section work" aria-labelledby="work-title">
  <div class="container">
    <p class="kicker center reveal">From our phones</p>
    <h2 id="work-title" class="section-title reveal">Recent jobs around the city</h2>
    <p class="section-sub reveal">Snapshots our crew took on site after finishing up.</p>
    <div class="work-grid">
      ${gallery.map((g) => `
      <figure class="work-item reveal">${pic(g.img, g.alt)}<figcaption>${esc(g.caption)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>
<section class="section pains" aria-labelledby="pains-title">
  <div class="container">
    <p class="kicker center reveal">Why not just leave it</p>
    <h2 id="pains-title" class="section-title reveal">What a snowy morning <em>really</em> costs</h2>
    <p class="section-sub reveal">Toronto winters bring wet, heavy snowfalls that often freeze solid by the next night.</p>
    <div class="pain-grid">
      ${pains.map(([i, t, d]) => `
      <article class="pain-card reveal">
        <span class="pain-icon">${icon(i)}</span>
        <h3>${t}</h3>
        <p>${d}</p>
      </article>`).join('')}
    </div>
    <div class="relief reveal">
      <p><strong>The easy way:</strong> stay inside with a hot drink. Phone us and the crew handles the cold part.</p>
      <a class="btn btn-call" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} <span><span class="call-word">Call </span>${site.phone.display}</span></a>
    </div>
  </div>
</section>
<section class="section steps-section" aria-labelledby="how-title">
  <div class="container">
    <p class="kicker center reveal">How it goes</p>
    <h2 id="how-title" class="section-title reveal">Four steps, no fuss</h2>
    <ol class="steps">
      <li class="reveal"><span class="step-icon">${icon('phone')}</span><strong>Reach out</strong><span>Phone, text or fill in the form with your address. Snap a photo if you can.</span></li>
      <li class="reveal"><span class="step-icon">${icon('check')}</span><strong>Hear the price</strong><span>We agree on the cost first, so the bill holds no surprises.</span></li>
      <li class="reveal"><span class="step-icon">${icon('truck')}</span><strong>Crew arrives</strong><span>Typically inside an hour, with shovels, scrapers and salt.</span></li>
      <li class="reveal"><span class="step-icon">${icon('camera')}</span><strong>Check it</strong><span>We send pictures of the finished job, and you pay once it looks right.</span></li>
    </ol>
  </div>
</section>
${moreSection()}
<section id="faq" class="section" aria-labelledby="faq-title">
  <div class="container narrow">
    <h2 id="faq-title" class="section-title reveal">Things people ask us</h2>
    ${faqs.map(([q, a]) => `<details class="faq reveal"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}
  </div>
</section>
<section class="final-cta">
  ${wave('wave-top', 'var(--bg)')}
  ${snowfall()}
  <div class="container">
    <span class="final-drop" aria-hidden="true">${icon('snow')}</span>
    <h2 class="reveal">Stuck in the snow today?</h2>
    <p class="reveal">Get in touch and a crew heads your way. The price is free to ask, with nothing to sign, anywhere in ${esc(site.area)}, any hour.</p>
    <div class="hero-ctas center reveal">
      <a class="btn btn-call btn-xl" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')}<span><span class="call-word">Call </span>${site.phone.display}</span></a>
      <a class="btn btn-glass btn-xl" href="#quote" data-track="quote_click">Ask for a price</a>
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
    title: `Snow Removal for Toronto Homes: Cars, Driveways, Roofs | ${site.brand}`,
    description: `Toronto residential snow crew: we dig out buried cars, clear driveways, plow ridges, steps and roofs, usually within an hour. Phone ${site.phone.display}.`,
    body,
    schema: [faqSchema],
  });
};

const guidesIndex = () =>
  page({
    path: '/guides/',
    title: `Winter Tips for Toronto Homeowners | ${site.brand}`,
    description: 'Short reads on digging out cars, plow ridges, safe shovelling and icicles.',
    body: `
<section class="section article-head">
  <div class="container narrow">
    <h1>Winter tips</h1>
    <p class="section-sub left">What we have learned clearing snow around Toronto, in plain language.</p>
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
    <p class="crumbs"><a href="/">Home</a> / <a href="/guides/">Winter tips</a></p>
    <h1>${esc(g.title)}</h1>
    ${g.body}
    <aside class="article-cta">
      <h2>Rather not do it yourself?</h2>
      <p>Our crew covers Toronto &amp; the GTA and usually arrives inside an hour.</p>
      <div class="hero-ctas">
        <a class="btn btn-primary" href="/#quote" data-track="quote_click">Ask for a price</a>
        <a class="btn btn-outline" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} ${site.phone.display}</a>
      </div>
    </aside>
    <p class="more-guides"><strong>Keep reading:</strong> ${guides.filter((o) => o !== g).map((o) => `<a href="/guides/${o.slug}/">${esc(o.short)}</a>`).join(' · ')}</p>
  </div>
</article>`,
  });

const thankYou = () =>
  page({
    path: '/thank-you/',
    title: `Request received | ${site.brand}`,
    description: 'We have your request.',
    noindex: true,
    body: `
<section class="section thanks">
  <div class="container narrow center">
    <span class="thanks-icon">${icon('check')}</span>
    <h1>Got it, thanks!</h1>
    <p>A crew member will phone you in a few minutes. In a hurry?</p>
    <a class="btn btn-primary btn-lg" href="tel:${site.phone.tel}" data-track="phone_click">${icon('phone')} <span><span class="call-word">Call </span>${site.phone.display}</span></a>
    <p class="muted">Meanwhile, browse our <a href="/guides/">winter tips</a>.</p>
  </div>
</section>
${moreSection()}
<script>window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead'});</script>`,
  });

const privacy = () =>
  page({
    path: '/privacy/',
    title: `Privacy | ${site.brand}`,
    description: `What ${site.brand} does with the details you share on this site.`,
    body: `
<article class="section article">
  <div class="container narrow">
    <h1>Privacy</h1>
    <p>${esc(site.brand)} runs this site. Personal details you send us are treated according to PIPEDA, the federal privacy law for Canadian businesses.</p>
    <h2>Information you give us</h2>
    <p>The request form asks for your name, phone, street address, area, driveway size, the job you need and any notes; email is optional. Along with that we save which ad or link brought you here (for instance a Google Ads click identifier), so we know which advertising works.</p>
    <h2>Why we keep it</h2>
    <p>Only so we can phone you back, give you a price and do the work. Your details are never sold, traded or rented to anyone.</p>
    <h2>Cookies</h2>
    <p>Cookies may be stored by Google's tag, analytics and ad conversion tools to count visits and measure ads. You can turn cookies off in your browser, and manage ad personalisation at <a href="https://adssettings.google.com" rel="noopener">adssettings.google.com</a>.</p>
    <h2>Questions or removal</h2>
    <p>To see or erase what we hold about you, phone <a href="tel:${site.phone.tel}">${site.phone.display}</a> or write to us on <a href="https://wa.me/${site.whatsapp}" rel="noopener">WhatsApp</a>.</p>
  </div>
</article>`,
  });

const lightsPage = () =>
  page({
    path: '/lights/',
    title: `Year-round LED roof lights, Toronto`,
    description: 'LED roofline lighting that stays up all year, installed around Toronto & the GTA.',
    body: `
<style>.sticky-cta, .fab-lights { display: none; } .fab-call { bottom: calc(16px + env(safe-area-inset-bottom)); } body { padding-bottom: 0; }</style>
<section class="section lights-page">
  <div class="container lights-inner">
    <div class="lights-photo">${pic('lights-holiday-mix', 'Toronto home lit up along the roof with colourful LED tracks', { eager: true })}</div>
    <div>
      <p class="kicker">From our partners</p>
      <h1>Roof lights you never <span class="lights-text">take down again</span></h1>
      <p>Our partners fit slim LED channels along the fascia under your roof edge. They stay in place through every season and blend into the trim during the day.</p>
      <ul class="check-list">
        <li>${icon('check')} Millions of colours plus preset scenes for every holiday</li>
        <li>${icon('check')} Schedules and voice control from a phone app</li>
        <li>${icon('check')} No more climbing ladders twice a year</li>
        <li>${icon('check')} A typical house is finished in a day</li>
      </ul>
      <a class="btn btn-lights btn-xl" href="${site.lightsUrl}" data-track="lights_click">Visit the lighting site <span aria-hidden="true">→</span></a>
      <p class="muted"><a href="/">← Return to snow removal</a></p>
    </div>
  </div>
  <div class="container lights-ba">
    <h2>Day and night</h2>
    <div class="lights-ba-grid">
      <figure><div class="lights-ba-img"><span class="ba-tag">Day</span><span class="ba-tag ba-tag-after">Night</span>${pic('lights-ba-1', 'Same two-storey house shown in daylight and lit up after dark')}</div><figcaption>Two storeys and a garage</figcaption></figure>
      <figure><div class="lights-ba-img"><span class="ba-tag">Day</span><span class="ba-tag ba-tag-after">Night</span>${pic('lights-ba-3', 'House with dormer windows in daylight and with roof lights on at night')}</div><figcaption>Dormer windows and peaks</figcaption></figure>
    </div>
    <a class="btn btn-lights btn-lg" href="${site.lightsUrl}" data-track="lights_click">More roofline projects <span aria-hidden="true">→</span></a>
  </div>
</section>`,
  });

const interested = () =>
  page({
    path: '/you-may-be-interested/',
    title: `You may be interested | ${site.brand}`,
    description: 'Other home services from our partners and more jobs our snow crew handles.',
    noindex: true,
    body: `
<section class="section interested-head">
  <div class="container narrow center">
    <p class="kicker">While the phone rings</p>
    <h1>You may be interested</h1>
    <p class="section-sub">Our crew will pick up in a moment. In the meantime, here are a few more ways we and our partners keep a Toronto home in shape through winter.</p>
    <p>${icon('phone')} Line dropped? <a href="tel:${site.phone.tel}" data-track="phone_click">Try ${site.phone.display} again</a></p>
  </div>
</section>
${moreSection()}
<section class="section">
  <div class="container">
    <h2 class="section-title">Also on our list</h2>
    <div class="services-grid">
      ${services.map((s) => `
      <a class="service-card" href="/#${s.id}">
        <span class="service-icon">${icon(s.icon)}</span>
        <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
      </a>`).join('')}
    </div>
    <p class="center"><a class="btn btn-primary btn-lg" href="/" data-track="home_click">Back to the main page</a></p>
  </div>
</section>`,
  });

const notFound = () =>
  page({
    path: '/404',
    title: `Nothing here | ${site.brand}`,
    description: 'This page does not exist.',
    noindex: true,
    body: `
<section class="section">
  <div class="container narrow center">
    <h1>This page is snowed under</h1>
    <p>We could not find what you were looking for.</p>
    <a class="btn btn-primary" href="/">Back to the start</a>
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
  ['you-may-be-interested/index.html', interested()],
  ['404.html', notFound()],
];

export const sitemapPaths = () => ['/', '/guides/', ...guides.map((g) => `/guides/${g.slug}/`), '/privacy/'];
