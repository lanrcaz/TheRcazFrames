import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clientSlides } from './clientData'

interface ClientSlideNavProps {
  total: number
  active: number
  onDotClick: (index: number) => void
  onPrev: () => void
  onNext: () => void
  isMobile: boolean
}

export default function ClientSlideNav({
  total,
  active,
  onDotClick,
  onPrev,
  onNext,
  isMobile,
}: ClientSlideNavProps) {
  // Mobile: dots below carousel
  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        {/* Dot indicators */}
        <div className="flex items-center gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === active ? '#C9A96E' : 'rgba(245,240,235,0.35)',
                transform: i === active ? 'scale(1.4)' : 'scale(1)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    )
  }

  // Desktop: Right edge vertical bar + bottom counter + arrows
  return (
    <>
      {/* Right edge vertical bar with dots */}
      <div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center"
        style={{ zIndex: 50 }}
      >
        {/* Progress track */}
        <div
          className="relative w-[2px] rounded-full overflow-hidden"
          style={{
            height: '200px',
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        >
          {/* Progress fill */}
          <div
            className="absolute top-0 left-0 w-full transition-all duration-300"
            style={{
              height: `${((active + 1) / total) * 100}%`,
              backgroundColor: '#C9A96E',
            }}
          />
        </div>

        {/* Dots */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-1">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              className="group relative w-3 h-3 flex items-center justify-center"
              aria-label={`Go to ${clientSlides[i]?.name ?? `slide ${i + 1}`}`}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: i === active ? '10px' : '6px',
                  height: i === active ? '10px' : '6px',
                  backgroundColor: i === active ? '#C9A96E' : 'rgba(245,240,235,0.35)',
                  transform: i === active ? 'scale(1.4)' : 'scale(1)',
                }}
              />
              {/* Tooltip */}
              <span
                className="absolute right-full mr-3 px-2 py-1 rounded font-mono text-[0.6rem] tracking-[0.1em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {clientSlides[i]?.name ?? `Slide ${i + 1}`}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom bar: counter + arrows */}
      <div
        className="fixed bottom-6 left-0 right-0 z-10 hidden md:flex items-center justify-center gap-6"
        style={{ zIndex: 50 }}
      >
        {/* Prev arrow */}
        <button
          onClick={onPrev}
          disabled={active === 0}
          className="p-1 transition-colors duration-300 disabled:opacity-20 hover:text-[#C9A96E]"
          style={{ color: 'var(--color-text-muted)' }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Counter */}
        <span
          className="font-mono tracking-[0.12em]"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            color: 'var(--color-text-muted)',
          }}
        >
          {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        {/* Next arrow */}
        <button
          onClick={onNext}
          disabled={active === total - 1}
          className="p-1 transition-colors duration-300 disabled:opacity-20 hover:text-[#C9A96E]"
          style={{ color: 'var(--color-text-muted)' }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </>
  )
}
