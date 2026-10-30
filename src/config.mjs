// Site-wide settings. Change values here and rebuild (`npm run build`).
export const site = {
  brand: 'Snow Force Toronto',
  // Production URL, used for canonical links, sitemap and structured data.
  url: 'https://showel-squad.com',
  phone: { display: '(365) 360-8470', tel: '+13653608470' },
  // WhatsApp chat for the green floating button (international format, digits only).
  whatsapp: '13653608470',
  // Sister sites promoted in "You may be interested" and the garland button.
  lightsUrl: 'https://lights-toronto.unknwn-creation.workers.dev/',
  guttersUrl: 'https://gutters-toronto.unknwn-creation.workers.dev/',
  hours: 'Phone or text us, day or night',
  area: 'Toronto & the GTA',
  // Google Tag Manager container ID, e.g. 'GTM-XXXXXXX'. Empty = no GTM.
  // Conversions are pushed to dataLayer: generate_lead, phone_click, quote_click.
  gtmId: '',
};

export const services = [
  {
    id: 'car-dig-out',
    title: 'Car Dig-Out',
    text: 'Street parking sealed in by the plow? We sweep the car clean, free all four wheels and cut a lane out to the road.',
    icon: 'car',
  },
  {
    id: 'driveways',
    title: 'Driveway Clearing',
    text: 'Phone us whenever you need and a crew scrapes your driveway back to bare asphalt or interlock, short pad or long double.',
    icon: 'truck',
  },
  {
    id: 'windrow',
    title: 'Plow Ridge Removal',
    text: 'That rock-hard bank the city plow drops across your driveway entrance gets broken up and moved aside.',
    icon: 'road',
  },
  {
    id: 'walkways',
    title: 'Paths, Steps & Sidewalk',
    text: 'Front path, porch, stairs and the public sidewalk by your lot, cleared with hand shovels edge to edge.',
    icon: 'shovel',
  },
  {
    id: 'salting',
    title: 'Salt & Grip',
    text: 'A light, even spread of salt or a paw-safe melter once the snow is off, so overnight refreeze does not catch you out.',
    icon: 'drop',
  },
  {
    id: 'ice',
    title: 'Ice Chipping',
    text: 'Trampled, frozen crust chipped off paths and pads, then treated, so nobody slips on the way to the door.',
    icon: 'snow',
  },
  {
    id: 'flat-roofs',
    title: 'Flat Roofs & Balconies',
    text: 'Garage tops, flat roofs, terraces and balconies unloaded by hand with plastic blades that will not cut the membrane.',
    icon: 'building',
  },
  {
    id: 'roof',
    title: 'Roof Snow & Icicles',
    text: 'Lower roof edges raked clear, hanging icicles brought down safely and ice ridges opened so water can drain.',
    icon: 'house',
  },
];

// Service area for the form and structured data.
export const cities = [
  'Toronto', 'Scarborough', 'North York', 'Etobicoke', 'East York', 'York', 'Markham', 'Vaughan',
  'Richmond Hill', 'Mississauga', 'Brampton', 'Pickering', 'Oakville', 'Ajax',
  'Burlington', 'Whitby', 'Newmarket', 'Oshawa', 'Milton', 'Aurora',
];

// Partner marquee. Shown as text wordmarks; to use real logo files put
// them in public/assets/img/partners/ and set `logo: '/assets/img/partners/x.svg'`.
export const partners = [
  { name: 'HomeStars', style: 'hs' },
  { name: 'Toro', style: 'brand' },
  { name: 'Houzz', style: 'houzz' },
  { name: 'Ariens', style: 'brand' },
  { name: 'Home Depot Pro', style: 'hd' },
  { name: 'Three Best Rated', style: 'tbr' },
  { name: 'Western', style: 'brand' },
  { name: 'Bark', style: 'bark' },
  { name: "Lowe's", style: 'lowes' },
  { name: 'Boss Snowplow', style: 'brand' },
  { name: 'HomeAdvisor', style: 'ha' },
];

// Photos from real jobs in Toronto. Images live in public/assets/img/work/
// as .jpg + .webp with the same name; pass the name without extension.
export const gallery = [
  { img: 'job-driveway', caption: 'Side drive scraped and treated', alt: 'Narrow drive along a brick home scraped down to the pavement after a storm' },
  { img: 'job-walkway', caption: 'Path to the front door', alt: 'Shovelled path leading to the door of a brick house between high snowbanks' },
  { img: 'job-flat-roof', caption: 'Flat roof unloaded', alt: 'Night view of a flat roof with the heavy snow shovelled off' },
  { img: 'job-roof-deck', caption: 'Terrace by the back door', alt: 'Roof terrace outside a back door cleared after an evening snowfall' },
  { img: 'job-roof-ledge', caption: 'Narrow ledge, hand shovelled', alt: 'Snow shovel resting on a narrow roof ledge beside a brick wall' },
  { img: 'winter-icicles', caption: 'Icicles before removal', alt: 'Row of long icicles under a snow-loaded gutter' },
];
