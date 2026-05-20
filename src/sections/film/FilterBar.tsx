import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export type FilterCategory = 'ALL' | 'NARRATIVE' | 'BRANDED' | 'MUSIC VIDEO' | 'COMMERCIAL'

interface FilterBarProps {
  activeFilter: FilterCategory
  onFilterChange: (filter: FilterCategory) => void
  projectCount: number
}

const FILTERS: FilterCategory[] = ['ALL', 'NARRATIVE', 'BRANDED', 'MUSIC VIDEO', 'COMMERCIAL']

export default function FilterBar({ activeFilter, onFilterChange, projectCount }: FilterBarProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, barRef)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={barRef}
      className="sticky top-[72px] z-40"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderBottom: '1px solid var(--color-border)',
        opacity: 0,
      }}
    >
      <div
        className="max-w-[var(--max-content-width)] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{
          padding: '1rem var(--space-page-x)',
        }}
      >
        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <motion.button
                key={filter}
                onClick={() => onFilterChange(filter)}
                layout
                className="relative font-mono tracking-[0.12em] uppercase transition-all duration-200 rounded-full cursor-pointer"
                style={{
                  fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                  padding: '0.4rem 1rem',
                  border: isActive
                    ? '1px solid var(--color-text-muted)'
                    : '1px solid var(--color-border)',
                  backgroundColor: isActive
                    ? 'rgba(255,255,255,0.06)'
                    : 'transparent',
                  color: isActive
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-tertiary)',
                }}
                whileHover={{
                  borderColor: 'var(--color-border-hover)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {filter}
              </motion.button>
            )
          })}
        </div>

        {/* Right side: count + sort */}
        <div className="flex items-center gap-4">
          <span
            className="font-mono tracking-[0.12em] uppercase whitespace-nowrap"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            {projectCount} PROJECT{projectCount !== 1 ? 'S' : ''}
          </span>

          <select
            className="font-mono tracking-[0.12em] uppercase cursor-pointer outline-none"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-bg-tertiary)',
              border: 'none',
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--border-radius-sm)',
            }}
            defaultValue="newest"
          >
            <option value="newest">NEWEST FIRST</option>
            <option value="oldest">OLDEST FIRST</option>
          </select>
        </div>
      </div>
    </div>
  )
}
