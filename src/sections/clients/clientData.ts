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
    romanNumeral: 'I',
    name: 'LUCID MOTORS / MCH',
    slug: 'lucid-motors-mch',
    projectCount: '2 PROJECTS',
    dateRange: '2024',
    description:
      'A premium automotive commercial for Lucid Motors filmed across Abu Dhabi. Architectural cityscapes meet meticulous car cinematography \u2014 from the iconic light bar detail to Arabic coffee culture woven into the narrative.',
    projects: [
      { name: 'Lucid Air Commercial', year: '2024', type: 'TVC' },
      { name: 'Behind the Scenes', year: '2024', type: 'Documentary' },
    ],
    tags: ['FILM', 'DIRECTOR', 'COLOR GRADE', '35MM'],
    images: ['/film/mch-lucid-car/scene-01.jpg', '/film/mch-lucid-car/scene-10.jpg'],
    layout: 'A',
  },
  {
    id: 2,
    romanNumeral: 'II',
    name: 'RED BULL',
    slug: 'red-bull',
    projectCount: '2 PROJECTS',
    dateRange: '2023',
    description:
      'A Red Bull branded documentary on competitive breakdancing. Raw, kinetic energy captured through dynamic movement and intimate portraits of athletes pushing the boundaries of physical expression.',
    projects: [
      { name: 'The Breaking Pointe', year: '2023', type: 'Documentary' },
      { name: 'Athlete Portraits', year: '2023', type: 'Photography' },
    ],
    tags: ['FILM', 'DIRECTOR', 'STEADICAM', 'ACTION'],
    images: ['/film/redbull-breaking-pointe/scene-01.jpg', '/film/redbull-breaking-pointe/scene-15.jpg'],
    layout: 'B',
  },
  {
    id: 3,
    romanNumeral: 'III',
    name: 'VOX CINEMAS',
    slug: 'vox-cinemas',
    projectCount: '2 PROJECTS',
    dateRange: '2024',
    description:
      'A high-octane commercial campaign for the theatrical release of Bad Boys II. Explosive action sequences, dramatic car chases, and the electric energy of Will Smith and Martin Lawrence.',
    projects: [
      { name: 'Bad Boys II Campaign', year: '2024', type: 'TVC' },
      { name: 'Social Cutdowns', year: '2024', type: 'Social' },
    ],
    tags: ['COMMERCIAL', 'DIRECTOR', 'PRODUCT', 'LIGHTING'],
    images: ['/film/vox-bad-boys-ii/scene-01.jpg', '/film/vox-bad-boys-ii/scene-10.jpg'],
    layout: 'A',
  },
  {
    id: 4,
    romanNumeral: 'IV',
    name: 'VOLKSWAGEN',
    slug: 'volkswagen',
    projectCount: '2 PROJECTS',
    dateRange: '2023',
    description:
      'A branded documentary exploring the legacy and evolution of the Volkswagen Golf GTI. From the original Mk1 to the latest generation \u2014 told through engineers, collectors, and drivers who live the hot hatch culture.',
    projects: [
      { name: 'Gen GTI Documentary', year: '2023', type: 'Documentary' },
      { name: 'Social Assets', year: '2023', type: 'Social' },
    ],
    tags: ['DOCUMENTARY', 'DIRECTOR', 'CINEMATOGRAPHY', '16MM'],
    images: ['/film/vw-gen-gti-docu/scene-01.jpg', '/film/vw-gen-gti-docu/scene-15.jpg'],
    layout: 'B',
  },
];

export const allClients: ClientListItem[] = [
  { id: 1, name: 'LUCID MOTORS / MCH', projectCount: '2', disciplines: ['Film', 'Directing', 'Color'] },
  { id: 2, name: 'RED BULL', projectCount: '2', disciplines: ['Film', 'Action', 'Steadicam'] },
  { id: 3, name: 'VOX CINEMAS', projectCount: '2', disciplines: ['Commercial', 'TVC'] },
  { id: 4, name: 'VOLKSWAGEN', projectCount: '2', disciplines: ['Documentary', '16mm'] },
  { id: 5, name: 'MUSIC TRAVEL LOVE', projectCount: '1', disciplines: ['Travel', 'Music'] },
  { id: 6, name: 'TRAVEL SERIES', projectCount: '1', disciplines: ['Film', 'Directing'] },
  { id: 7, name: 'HITB CYBERWEEK', projectCount: '1', disciplines: ['Motion Graphics', 'Branding'] },
  { id: 8, name: 'FASHION TELEVISION', projectCount: '1', disciplines: ['Motion', 'Spec Ad'] },
  { id: 9, name: 'MERCEDES-BENZ FASHION WEEK', projectCount: '1', disciplines: ['Motion', 'Fashion'] },
  { id: 10, name: 'SWIMWEAR TRENDS', projectCount: '1', disciplines: ['Motion', 'TVC'] },
  { id: 11, name: 'VXV ARTIST COLLECTIVE', projectCount: '1', disciplines: ['Motion', 'Branding'] },
  { id: 12, name: 'TOP 10 MOST STYLISH MEN', projectCount: '1', disciplines: ['Motion', 'Editorial'] },
];

// Director's notes — project reflections from Ferlan's creative perspective
export const testimonials: Testimonial[] = [
  {
    quote:
      'The Lucid Air project was about restraint. Every frame had to breathe. The car\'s lines did the work \u2014 my job was to give them space. Arabic coffee culture became the bridge between heritage and innovation.',
    name: 'FERLAN RACAZA',
    title: 'Director — Lucid Motors / MCH',
  },
  {
    quote:
      'With Red Bull, it was all about keeping up. Breakdancers don\'t wait for cameras. We shot handheld, stayed low, and chased the energy. The best moments happened when we were almost too late.',
    name: 'FERLAN RACAZA',
    title: 'Director — The Breaking Pointe',
  },
  {
    quote:
      'Documentary work is listening. The GTI film wasn\'t about cars \u2014 it was about the people who gave decades of their lives to one idea. Their passion carried every frame.',
    name: 'FERLAN RACAZA',
    title: 'Director — Gen GTI Documentary',
  },
];
