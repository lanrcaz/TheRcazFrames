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
      'A cinematic travel series following a music producer through Dubai — from the soaring heights of the Burj Khalifa to yacht moments at golden hour. Capturing the intersection of culture, luxury, and sound.',
    image: '/film/travel-series/scene-01.jpg',
    tags: ['TRAVEL', 'DIRECTOR', 'COLOR'],
  },
  {
    id: 2,
    title: 'MCH — Lucid',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2024,
    duration: '60 SEC',
    client: 'MCH / Lucid Motors',
    description:
      'A premium automotive commercial for Lucid Motors filmed across Abu Dhabi. Architectural cityscapes meet meticulous car cinematography — from the iconic light bar detail to Arabic coffee culture woven into the narrative.',
    image: '/film/mch-lucid-car/scene-01.jpg',
    tags: ['AUTOMOTIVE', 'DIT', 'COLOR'],
  },
  {
    id: 3,
    title: 'The Breaking Pointe',
    category: 'BRANDED' as FilterCategory,
    year: 2023,
    duration: '4 MIN',
    client: 'Red Bull',
    description:
      'A Red Bull branded documentary on the world of competitive breakdancing. Raw, kinetic energy captured through dynamic movement and intimate portraits of athletes pushing the boundaries of physical expression.',
    image: '/film/redbull-breaking-pointe/scene-01.jpg',
    tags: ['SPORT', 'DIRECTOR', 'EDITOR'],
  },
  {
    id: 4,
    title: 'Music Travel Love — Dubai',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2024,
    duration: '2 MIN',
    client: 'Confidential',
    description:
      'An intimate travel documentary following musicians exploring the soul of Dubai. From desert dunes at dawn to the neon pulse of the city at night — music, movement, and the moments between.',
    image: '/film/music-travel-love-dubai/scene-01.jpg',
    tags: ['TRAVEL', 'DIRECTOR', 'MUSIC'],
  },
  {
    id: 5,
    title: 'VOX Cinema — Bad Boys II',
    category: 'COMMERCIAL' as FilterCategory,
    year: 2024,
    duration: '30 SEC',
    client: 'VOX Cinemas',
    description:
      'A high-octane VOX Cinemas promotional campaign for the theatrical run of Bad Boys II. Explosive action sequences, dramatic car chases, and the electric energy of Will Smith and Martin Lawrence — all channeled into a 30-second adrenaline rush.',
    image: '/film/vox-bad-boys-ii/scene-01.jpg',
    tags: ['CINEMA', 'DIRECTOR', 'ACTION'],
  },
  {
    id: 6,
    title: 'VW Gen GTI — Documentary',
    category: 'BRANDED' as FilterCategory,
    year: 2023,
    duration: '5 MIN',
    client: 'Volkswagen',
    description:
      'A branded documentary exploring the legacy and evolution of the Volkswagen Golf GTI. From the original Mk1 to the latest generation — told through the eyes of engineers, collectors, and drivers who live and breathe the hot hatch culture.',
    image: '/film/vw-gen-gti-docu/scene-01.jpg',
    tags: ['AUTOMOTIVE', 'DIRECTOR', 'DOCUMENTARY'],
  },
]
