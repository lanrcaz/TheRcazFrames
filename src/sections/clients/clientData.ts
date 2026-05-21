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
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'The level of visual storytelling Ferlan brought to our Lucid Air campaign was unprecedented. Every frame was considered, every cut intentional.',
    name: 'Ferlan Racaza',
    title: 'Director & Cinematographer',
  },
  {
    quote:
      'Working with Red Bull on The Breaking Pointe felt effortless. Raw kinetic energy captured through dynamic movement and intimate athlete portraits.',
    name: 'Ferlan Racaza',
    title: 'Director & Cinematographer',
  },
  {
    quote:
      'The attention to detail is extraordinary. Color, composition, pacing \u2014 every element serves the story. From automotive to action to documentary.',
    name: 'Ferlan Racaza',
    title: 'Director & Cinematographer',
  },
];
