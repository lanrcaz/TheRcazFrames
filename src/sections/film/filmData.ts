import type { Project } from './ProjectCard'
import type { FilterCategory } from './FilterBar'

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Travel Series — Music Producer',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2024,
    duration: '3 MIN',
    client: 'Confidential',
    description:
      'Cam-Op and Sound Engineer on a cinematic Dubai travel series across Burj Khalifa, yacht, city, luxury, and music-led moments.',
    image: '/film/travel-series/scene-01.jpg',
    tags: ['TRAVEL', 'CAM OP', 'SOUND ENGINEER'],
  },
  {
    id: 2,
    title: 'MCH — Lucid',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2024,
    duration: '60 SEC',
    client: 'MCH / Lucid Motors',
    description:
      'Camera assistant and post-production for a premium Saudi automotive brand commercial blending architectural cityscapes, car detail work, and Arabic culture.',
    image: '/film/mch-lucid-car/scene-01.jpg',
    tags: ['AUTOMOTIVE', 'CAM OP', 'SOUND ENGINEER'],
  },
  {
    id: 3,
    title: 'The Breaking Pointe',
    category: 'BRANDED' as FilterCategory,
    year: 2023,
    duration: '4 MIN',
    client: 'Red Bull',
    description:
      'Captured an action-driven four-day Red Bull paramotor production, following a top athlete through high-intensity preparation, practice runs, precision flight planning, and the final performance day.',
    image: '/film/redbull-breaking-pointe/scene-01.jpg',
    tags: ['SPORT', 'CAM OP', 'SOUND ENGINEER'],
  },
  {
    id: 4,
    title: 'Music Travel Love — Dubai',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2024,
    duration: '2 MIN',
    client: 'Confidential',
    description:
      'Produced three music videos with the renowned YouTube artist duo Music Travel Love in collaboration with Dubai Tourism, capturing Dubai\'s iconic locations, atmosphere, and cinematic travel energy across a three-week production.',
    image: '/film/music-travel-love-dubai/scene-01.jpg',
    tags: ['TRAVEL', 'CAM OP', 'SOUND ENGINEER'],
  },
  {
    id: 5,
    title: 'VOX Cinema — Bad Boys II',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2024,
    duration: '30 SEC',
    client: 'VOX Cinemas',
    description:
      'Worked with the team to capture Will Smith and Martin Lawrence for a 30-second theatrical promotional campaign, building a fast-paced spot around star presence, action energy, and the film\'s signature buddy-cop attitude.',
    image: '/film/vox-bad-boys-ii/scene-01.jpg',
    tags: ['CINEMA', 'CAM OP', 'SOUND ENGINEER'],
  },
  {
    id: 6,
    title: 'VW Gen GTI — Documentary',
    category: 'BRANDED' as FilterCategory,
    year: 2023,
    duration: '5 MIN',
    client: 'Volkswagen',
    description:
      'Shot and edited a branded documentary that went beyond the car itself, capturing the Golf GTI culture, long-time enthusiasts, and the people who have lived with the GTI legacy for years.',
    image: '/film/vw-gen-gti-docu/scene-01.jpg',
    tags: ['AUTOMOTIVE', 'CAM OP', 'SOUND ENGINEER'],
  },
]
