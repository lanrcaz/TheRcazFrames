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
  filmAnchor: string;
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
    name: 'VOX CINEMAS',
    slug: 'vox-cinemas',
    projectCount: '2 PROJECTS',
    dateRange: '2024',
    description:
      'Worked with the team to capture Will Smith and Martin Lawrence for a 30-second theatrical promotional campaign, building a fast-paced spot around star presence, action energy, and the film\'s signature buddy-cop attitude.',
    projects: [
      { name: 'Bad Boys II Campaign', year: '2024', type: 'TVC' },
    ],
    tags: ['COMMERCIAL', 'CAM OP', 'SOUND ENGINEER', 'LIGHTING'],
    images: ['/film/vox-bad-boys-ii/scene-15.jpg', '/film/vox-bad-boys-ii/scene-10.jpg'],
    layout: 'A',
    filmAnchor: 'project-vox-bad-boys-ii',
  },
  {
    id: 2,
    romanNumeral: 'II',
    name: 'LUCID MOTORS / MCH',
    slug: 'lucid-motors-mch',
    projectCount: '2 PROJECTS',
    dateRange: '2024',
    description:
      'Camera assistant and post-production for a premium Saudi automotive brand commercial blending architectural cityscapes, car detail work, and Arabic culture.',
    projects: [
      { name: 'Lucid Air Commercial', year: '2024', type: 'TVC' },
      { name: 'Behind the Scenes', year: '2024', type: 'Documentary' },
    ],
    tags: ['FILM', 'CAM OP', 'SOUND ENGINEER', '35MM'],
    images: ['/film/mch-lucid-car/scene-01.jpg', '/film/mch-lucid-car/scene-10.jpg'],
    layout: 'B',
    filmAnchor: 'project-mch-lucid',
  },
  {
    id: 3,
    romanNumeral: 'III',
    name: 'RED BULL',
    slug: 'red-bull',
    projectCount: '2 PROJECTS',
    dateRange: '2023',
    description:
      'Captured an action-driven four-day Red Bull paramotor production, following a top athlete through high-intensity preparation, practice runs, precision flight planning, and the final performance day.',
    projects: [
      { name: 'The Breaking Pointe', year: '2023', type: 'Documentary' },
      { name: 'Athlete Portraits', year: '2023', type: 'Photography' },
    ],
    tags: ['FILM', 'CAM OP', 'SOUND ENGINEER', 'ACTION'],
    images: ['/film/redbull-breaking-pointe/scene-01.jpg', '/film/redbull-breaking-pointe/scene-15.jpg'],
    layout: 'A',
    filmAnchor: 'project-breaking-pointe',
  },
  {
    id: 4,
    romanNumeral: 'IV',
    name: 'VOLKSWAGEN',
    slug: 'volkswagen',
    projectCount: '2 PROJECTS',
    dateRange: '2023',
    description:
      'Shot and edited a branded documentary that went beyond the car itself, capturing the Golf GTI culture, long-time enthusiasts, and the people who have lived with the GTI legacy for years.',
    projects: [
      { name: 'Gen GTI Documentary', year: '2023', type: 'Documentary' },
      { name: 'Social Assets', year: '2023', type: 'Social' },
    ],
    tags: ['DOCUMENTARY', 'CAM OP', 'SOUND ENGINEER', '16MM'],
    images: ['/film/vw-gen-gti-docu/scene-01.jpg', '/film/vw-gen-gti-docu/scene-15.jpg'],
    layout: 'B',
    filmAnchor: 'project-vw-gen-gti',
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

export const testimonials: Testimonial[] = [
  {
    quote:
      'The Lucid Air project was about restraint. Every frame had to breathe. The car\'s lines did the work \u2014 my job was to give them space. Arabic coffee culture became the bridge between heritage and innovation.',
    name: 'FERLAN RACAZA',
    title: 'CAM OP \u2014 Lucid Motors / MCH',
  },
  {
    quote:
      'With Red Bull, it was all about keeping up. Breakdancers don\'t wait for cameras. We shot handheld, stayed low, and chased the energy. The best moments happened when we were almost too late.',
    name: 'FERLAN RACAZA',
    title: 'CAM OP \u2014 The Breaking Pointe',
  },
  {
    quote:
      'Documentary work is listening. The GTI film wasn\'t about cars \u2014 it was about the people who gave decades of their lives to one idea. Their passion carried every frame.',
    name: 'FERLAN RACAZA',
    title: 'CAM OP \u2014 Gen GTI Documentary',
  },
];
