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
    image: '/film/travel-series/scene-01.png',
    tags: ['TRAVEL', 'DIRECTOR', 'COLORIST'],
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
    image: '/film/mch-lucid-car/scene-01.png',
    tags: ['AUTOMOTIVE', 'DIRECTOR', 'DP'],
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
    image: '/film/redbull-breaking-pointe/scene-01.png',
    tags: ['SPORT', 'DIRECTOR', 'EDITOR'],
  },
]
