import { useState } from 'react'
import PageHero from '../sections/film/PageHero'
import FilterBar from '../sections/film/FilterBar'
import ProjectGrid from '../sections/film/ProjectGrid'
import SceneGallery from '../sections/film/SceneGallery'
import CTABand from '../sections/CTABand'
import { PROJECTS } from '../sections/film/filmData'
import type { FilterCategory } from '../sections/film/FilterBar'

export default function Film() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL')

  const filteredCount =
    activeFilter === 'ALL'
      ? PROJECTS.length
      : PROJECTS.filter((p) => p.category === activeFilter).length

  return (
    <main style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <PageHero />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        projectCount={filteredCount}
      />
      <ProjectGrid projects={PROJECTS} activeFilter={activeFilter} />
      <SceneGallery />
      <CTABand />
    </main>
  )
}
