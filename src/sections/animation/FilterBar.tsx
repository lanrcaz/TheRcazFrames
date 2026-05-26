import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export type FilterCategory = 'ALL' | 'BRAND FILM' | 'MIXED MEDIA'

interface FilterBarProps {
  activeFilter: FilterCategory
  onFilterChange: (filter: FilterCategory) => void
  projectCount: number
}

const FILTERS: FilterCategory[] = [
  'ALL',
  'BRAND FILM',
  'MIXED MEDIA',
]

export default function FilterBar({ activeFilter, onFilterChange, projectCount }: FilterBarProps) {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="sticky top-[72px] z-40 transition-all duration-1000"
      style={{
        backgroundColor: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div
        className="max-w-[var(--max-content-width)] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ padding: '1rem var(--space-page-x)' }}
      >
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((filter) => (
            <motion.button
              key={filter}
              layout
              onClick={() => onFilterChange(filter)}
              className="relative font-mono uppercase transition-colors duration-300 cursor-pointer"
              style={{
                fontSize: 'clamp(0.55rem, 0.65vw, 0.65rem)',
                letterSpacing: '0.15em',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: activeFilter === filter ? '#C9A96E' : 'rgba(255,255,255,0.12)',
                backgroundColor: activeFilter === filter ? 'rgba(201,169,110,0.15)' : 'transparent',
                color: activeFilter === filter ? '#C9A96E' : 'var(--color-text-secondary)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {filter}
            </motion.button>
          ))}

          {/* Project Count */}
          <span
            className="font-mono ml-2 sm:ml-4"
            style={{
              fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
              letterSpacing: '0.12em',
              color: 'var(--color-text-muted)',
            }}
          >
            {projectCount} PROJECT{projectCount !== 1 ? 'S' : ''}
          </span>
        </div>

        {/* Sort dropdown placeholder */}
        <div className="hidden sm:flex items-center gap-2">
          <span
            className="font-mono"
            style={{
              fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
              letterSpacing: '0.12em',
              color: 'var(--color-text-muted)',
            }}
          >
            SORT
          </span>
          <select
            className="font-mono bg-transparent border-none outline-none cursor-pointer transition-colors duration-300 hover:text-[#C9A96E]"
            style={{
              fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
              letterSpacing: '0.12em',
              color: 'var(--color-text-secondary)',
            }}
            defaultValue="newest"
          >
            <option value="newest" style={{ backgroundColor: '#111111' }}>NEWEST FIRST</option>
            <option value="oldest" style={{ backgroundColor: '#111111' }}>OLDEST FIRST</option>
          </select>
        </div>
      </div>
    </div>
  )
}
