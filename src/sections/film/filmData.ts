import type { Project } from './ProjectCard'
import type { FilterCategory } from './FilterBar'

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Echoes of Tide',
    category: 'NARRATIVE' as FilterCategory,
    year: 2024,
    duration: '18 MIN',
    client: 'Independent',
    description:
      'A meditation on memory and loss set against the rhythmic backdrop of a coastal town. A woman returns to her childhood home to confront the ghosts she left behind.',
    image: '/film-project-1-hero.jpg',
    tags: ['35MM', 'DIRECTOR', 'COLORIST'],
  },
  {
    id: 2,
    title: 'The Last Light',
    category: 'NARRATIVE' as FilterCategory,
    year: 2023,
    duration: '24 MIN',
    client: 'Independent',
    description:
      'In a world slowly losing its sunlight, a father and daughter navigate the final days of natural light. An intimate apocalypse told through small moments.',
    image: '/film-project-2-hero.jpg',
    tags: ['ARRI', 'DIRECTOR', 'WRITER'],
  },
  {
    id: 3,
    title: 'Meridian',
    category: 'BRANDED' as FilterCategory,
    year: 2024,
    duration: '4 MIN',
    client: 'ACME Studios',
    description:
      'A branded short exploring the intersection of craft and technology. Filmed across three continents, following artisans who shape luxury goods.',
    image: '/film-project-3-hero.jpg',
    tags: ['DIGITAL', 'DIRECTOR', 'PRODUCER'],
  },
  {
    id: 4,
    title: 'Drift',
    category: 'MUSIC VIDEO' as FilterCategory,
    year: 2024,
    duration: '5 MIN',
    client: 'Aria Entertainment',
    description:
      'A dreamlike music video for an indie electronic artist. Surreal visuals blend practical effects with in-camera transitions in a single continuous journey.',
    image: '/film-project-4-hero.jpg',
    tags: ['ANAMORPHIC', 'DIRECTOR', 'EDITOR'],
  },
  {
    id: 5,
    title: 'Solstice',
    category: 'NARRATIVE' as FilterCategory,
    year: 2023,
    duration: '15 MIN',
    client: 'Independent',
    description:
      'Two strangers meet at a roadside diner on the longest day of the year. Conversations unfold in real-time as daylight slowly fades.',
    image: '/film-scene-1a.jpg',
    tags: ['35MM', 'DIRECTOR', 'WRITER'],
  },
  {
    id: 6,
    title: 'Iron & Oak',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2023,
    duration: '60 SEC',
    client: 'Metro Media',
    description:
      'A cinematic brand film for a heritage furniture maker. Each frame composed like a Dutch master painting, celebrating material and craft.',
    image: '/film-scene-1b.jpg',
    tags: ['DIGITAL', 'DIRECTOR', 'DP'],
  },
  {
    id: 7,
    title: 'Neon Veins',
    category: 'MUSIC VIDEO' as FilterCategory,
    year: 2023,
    duration: '4 MIN',
    client: 'Nova Pictures',
    description:
      'An electrifying visual journey through a city after dark. Neon-drenched streets and kinetic choreography merge in a tribute to urban nightlife.',
    image: '/film-scene-1c.jpg',
    tags: ['DIGITAL', 'DIRECTOR', 'COLORIST'],
  },
  {
    id: 8,
    title: 'Paper Boats',
    category: 'NARRATIVE' as FilterCategory,
    year: 2022,
    duration: '12 MIN',
    client: 'Independent',
    description:
      'A quiet story about an elderly man who folds paper boats and releases them into a river, each carrying a message to someone he has lost.',
    image: '/film-scene-1d.jpg',
    tags: ['16MM', 'DIRECTOR', 'EDITOR'],
  },
  {
    id: 9,
    title: 'The Frame',
    category: 'BRANDED' as FilterCategory,
    year: 2022,
    duration: '3 MIN',
    client: 'ACME Studios',
    description:
      'An artistic exploration of what it means to be seen. Commissioned as a brand film for a luxury eyewear house, blending fashion with fine art.',
    image: '/featured-film.jpg',
    tags: ['ANAMORPHIC', 'DIRECTOR', 'PRODUCER'],
  },
  {
    id: 10,
    title: 'Cascade',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2022,
    duration: '30 SEC',
    client: 'Metro Media',
    description:
      'A premium product film showcasing a luxury timepiece through dramatic macro cinematography and controlled water effects.',
    image: '/client-metro-scene-1.jpg',
    tags: ['MACRO', 'DIRECTOR', 'DP'],
  },
  {
    id: 11,
    title: 'After Hours',
    category: 'MUSIC VIDEO' as FilterCategory,
    year: 2021,
    duration: '3 MIN',
    client: 'Aria Entertainment',
    description:
      'A single-take music video following a dancer through an empty warehouse, capturing raw emotion in movement and shadow.',
    image: '/client-aria-scene-1.jpg',
    tags: ['DIGITAL', 'DIRECTOR', 'CHOREOGRAPHER'],
  },
  {
    id: 12,
    title: 'Origin',
    category: 'NARRATIVE' as FilterCategory,
    year: 2021,
    duration: '20 MIN',
    client: 'Independent',
    description:
      'A sci-fi short about the first human colony on Mars and the unexpected discovery that challenges everything they believed about life.',
    image: '/client-nova-scene-1.jpg',
    tags: ['DIGITAL', 'DIRECTOR', 'VFX'],
  },
]
