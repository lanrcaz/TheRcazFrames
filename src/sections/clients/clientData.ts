export interface ClientProject {
  name: string;
  year: string;
  type: string;
}

export interface ClientSlideData {
  id: number;
  romanNumeral: string;
  name: string;
  slug: string;
  projectCount: string;
  dateRange: string;
  description: string;
  projects: ClientProject[];
  tags: string[];
  images: [string, string];
  layout: 'A' | 'B';
}

export interface ClientListItem {
  id: number;
  name: string;
  projectCount: string;
  disciplines: string[];
  logo?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

export const clientSlides: ClientSlideData[] = [
  {
    id: 1,
    romanNumeral: 'II',
    name: 'ACME STUDIOS',
    slug: 'acme-studios',
    projectCount: '4 PROJECTS',
    dateRange: '2019–2024',
    description:
      'A five-year partnership crafting cinematic brand stories for one of the industry\'s most respected production houses. From period dramas to modern campaigns, each project demanded visual precision and narrative clarity.',
    projects: [
      { name: 'The Regency Collection', year: '2024', type: 'Brand Film' },
      { name: 'Heritage Series', year: '2022', type: 'Documentary Short' },
      { name: 'Annual Gala', year: '2021', type: 'Event Coverage' },
      { name: 'Behind the Scenes', year: '2019', type: 'Promotional' },
    ],
    tags: ['FILM', 'DIRECTOR', 'COLOR GRADE', '35MM'],
    images: ['/film/mch-lucid-car/scene-01.jpg', '/film/mch-lucid-car/scene-10.jpg'],
    layout: 'A',
  },
  {
    id: 2,
    romanNumeral: 'III',
    name: 'NOVA PICTURES',
    slug: 'nova-pictures',
    projectCount: '3 PROJECTS',
    dateRange: '2020–2023',
    description:
      'High-energy collaborations pushing the boundaries of action cinematography. Fast-paced, visceral storytelling with a relentless commitment to practical effects and dynamic camera work.',
    projects: [
      { name: 'Neon Veins', year: '2023', type: 'Feature' },
      { name: 'The Chase', year: '2022', type: 'Short Film' },
      { name: 'Crossfire', year: '2020', type: 'Action Sequence' },
      { name: 'Afterburn', year: '2020', type: 'Promotional' },
    ],
    tags: ['FILM', 'DIRECTOR', 'STEADICAM', 'ACTION'],
    images: ['/film/redbull-breaking-pointe/scene-01.jpg', '/film/redbull-breaking-pointe/scene-15.jpg'],
    layout: 'B',
  },
  {
    id: 3,
    romanNumeral: 'IV',
    name: 'ARIA ENTERTAINMENT',
    slug: 'aria-entertainment',
    projectCount: '4 PROJECTS',
    dateRange: '2020–2024',
    description:
      'A creative partnership built on rhythm and visual energy. Music videos and performance pieces that translate sound into motion — bold, colorful, and unapologetically cinematic.',
    projects: [
      { name: 'Drift', year: '2024', type: 'Music Video' },
      { name: 'After Hours', year: '2023', type: 'Performance Piece' },
      { name: 'Pulse', year: '2021', type: 'Music Video' },
      { name: 'Luminescence', year: '2020', type: 'Visual Album' },
    ],
    tags: ['FILM', 'MUSIC VIDEO', 'COLOR', 'VFX'],
    images: ['/film/vox-bad-boys-ii/scene-01.jpg', '/film/vox-bad-boys-ii/scene-10.jpg'],
    layout: 'A',
  },
  {
    id: 4,
    romanNumeral: 'V',
    name: 'METRO MEDIA',
    slug: 'metro-media',
    projectCount: '3 PROJECTS',
    dateRange: '2021–2024',
    description:
      'Premium brand storytelling for luxury clients. Every frame designed to communicate sophistication, craft, and aspiration. Precision lighting and meticulous attention to material textures.',
    projects: [
      { name: 'The Meridian Collection', year: '2024', type: 'Brand Film' },
      { name: 'Iron & Oak', year: '2023', type: 'Commercial' },
      { name: 'Cascade', year: '2022', type: 'Product Film' },
      { name: 'Atelier', year: '2021', type: 'Brand Film' },
    ],
    tags: ['COMMERCIAL', 'DIRECTOR', 'PRODUCT', 'LIGHTING'],
    images: ['/film/vw-gen-gti-docu/scene-01.jpg', '/film/vw-gen-gti-docu/scene-15.jpg'],
    layout: 'B',
  },
  {
    id: 5,
    romanNumeral: 'VI',
    name: 'SKYLINE PRODUCTIONS',
    slug: 'skyline-productions',
    projectCount: '3 PROJECTS',
    dateRange: '2019–2023',
    description:
      'Documentary and unscripted content with a cinematic eye. Finding the extraordinary in real moments — capturing authenticity with the visual language of fiction filmmaking.',
    projects: [
      { name: 'The Long Road', year: '2023', type: 'Documentary' },
      { name: 'Harbour Lights', year: '2021', type: 'Short Doc' },
      { name: 'Field Notes', year: '2020', type: 'Series' },
      { name: 'Raw', year: '2019', type: 'Documentary' },
    ],
    tags: ['DOCUMENTARY', 'DIRECTOR', 'CINEMATOGRAPHY', '16MM'],
    images: ['/film/travel-series/scene-05.jpg', '/film/music-travel-love-dubai/scene-01.jpg'],
    layout: 'A',
  },
  {
    id: 6,
    romanNumeral: 'VII',
    name: 'ECLIPSE CREATIVE',
    slug: 'eclipse-creative',
    projectCount: '4 PROJECTS',
    dateRange: '2020–2024',
    description:
      'Animation-forward collaborations blending live-action and animated worlds. Where practical filmmaking meets digital craft — creating hybrid visual experiences that defy categorization.',
    projects: [
      { name: 'Lumina', year: '2024', type: 'Animated Short' },
      { name: 'The In-Between', year: '2023', type: 'Hybrid Film' },
      { name: 'Widget', year: '2021', type: 'Animation' },
      { name: 'Aurora', year: '2020', type: 'VFX Sequence' },
    ],
    tags: ['ANIMATION', 'DIRECTOR', 'VFX', 'COMPOSITING'],
    images: ['/film/vox-bad-boys-ii/scene-05.jpg', '/film/redbull-breaking-pointe/scene-08.jpg'],
    layout: 'B',
  },
];

export const allClients: ClientListItem[] = [
  { id: 1, name: 'ACME STUDIOS', projectCount: '4', disciplines: ['Film', 'Directing', 'Color'] },
  { id: 2, name: 'NOVA PICTURES', projectCount: '3', disciplines: ['Film', 'Action', 'Steadicam'] },
  { id: 3, name: 'ARIA ENTERTAINMENT', projectCount: '4', disciplines: ['Film', 'Music Video', 'VFX'] },
  { id: 4, name: 'METRO MEDIA', projectCount: '3', disciplines: ['Commercial', 'Product'] },
  { id: 5, name: 'SKYLINE PRODUCTIONS', projectCount: '3', disciplines: ['Documentary', '16mm'] },
  { id: 6, name: 'ECLIPSE CREATIVE', projectCount: '4', disciplines: ['Animation', 'VFX', 'Hybrid'] },
  { id: 7, name: 'PRISM STUDIOS', projectCount: '2', disciplines: ['Animation', '3D'] },
  { id: 8, name: 'HORIZON FILMS', projectCount: '3', disciplines: ['Film', 'Branded'] },
  { id: 9, name: 'TEMPO MEDIA', projectCount: '2', disciplines: ['Music Video', 'Color'] },
  { id: 10, name: 'CRAFT CO.', projectCount: '3', disciplines: ['Commercial', 'Animation'] },
  { id: 11, name: 'LUMEN PICTURES', projectCount: '4', disciplines: ['Film', 'Narrative'] },
  { id: 12, name: 'STATIC MOTION', projectCount: '2', disciplines: ['Motion Graphics'] },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Ferlan brought a level of visual storytelling and craft we hadn\'t experienced before. Every frame was considered, every cut intentional. A true creative partner.',
    name: 'SARAH CHEN',
    title: 'Creative Director, ACME STUDIOS',
  },
  {
    quote:
      'Working together felt effortless. They understood our vision immediately and elevated it beyond what we imagined possible.',
    name: 'MARCUS REID',
    title: 'EP, NOVA PICTURES',
  },
  {
    quote:
      'The attention to detail is extraordinary. Color, composition, pacing — every element serves the story.',
    name: 'ELENA VOSS',
    title: 'Head of Production, ARIA ENTERTAINMENT',
  },
];
