import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useEmblaCarousel from 'embla-carousel-react'
import ClientSlide from './ClientSlide'
import { clientSlides } from './clientData'
import ClientSlideNav from './ClientSlideNav'

gsap.registerPlugin(ScrollTrigger)

export default function ClientSlideCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const slidesContainerRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile embla carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    containScroll: 'trimSnaps',
  })

  // Check mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Mobile embla slide change
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setActiveSlide(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Desktop: Global snap for pinned slides
  useEffect(() => {
    if (isMobile) return

    // Wait for all slide ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start)

      const maxScroll = ScrollTrigger.maxScroll(window)
      if (!maxScroll || pinned.length === 0) return

      // Build snap targets from pinned slide ranges
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }))

      // Global snap
      const globalSnap = ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            )
            if (!inPinned) return value // Free scroll outside pinned

            // Find nearest slide center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            )
            return target
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0.1,
          ease: 'power2.inOut',
        },
      })

      // Update active slide indicator
      const onUpdate = () => {
        const scrollY = window.scrollY
        const current = pinned.findIndex(st => {
          const end = st.end ?? st.start
          return scrollY >= st.start - 100 && scrollY < end - 100
        })
        if (current !== -1) setActiveSlide(current)
      }
      window.addEventListener('scroll', onUpdate, { passive: true })

      return () => {
        globalSnap.kill()
        window.removeEventListener('scroll', onUpdate)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [isMobile])

  // Header reveal animation
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const els = header.querySelectorAll('.header-animate')
    gsap.set(els, { y: 30, opacity: 0 })

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: 'power3.out',
        })
      },
    })

    return () => trigger.kill()
  }, [])

  // Navigation handlers
  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= clientSlides.length) return

    if (isMobile && emblaApi) {
      emblaApi.scrollTo(index)
    } else {
      // Desktop: scroll to the slide's ScrollTrigger position
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start)
      if (pinned[index]) {
        const target = pinned[index].start + 1 // Slight offset to trigger
        window.scrollTo({ top: target, behavior: 'smooth' })
      }
    }
  }, [isMobile, emblaApi])

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide])
  const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide])

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="relative py-16 text-center px-[var(--space-page-x)]"
      >
        <span
          className="header-animate font-mono tracking-[0.2em] uppercase block mb-3"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
          }}
        >
          12 CLIENTS &middot; 40+ PROJECTS &middot; 10 YEARS
        </span>
        <h2
          className="header-animate font-display font-normal leading-[1.1] mb-4"
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.02em',
          }}
        >
          EXPLORE THE COLLABORATIONS
        </h2>
        <div className="header-animate flex items-center justify-center gap-2">
          <span
            className="font-mono tracking-[0.12em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            SCROLL TO NAVIGATE
          </span>
          <svg
            className="w-4 h-4 animate-scroll-bounce"
            style={{ color: 'var(--color-text-muted)' }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
        {/* Decorative divider */}
        <div className="header-animate mt-6 flex justify-center">
          <span
            className="h-[1px] w-[100px]"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>
      </div>

      {/* Slides */}
      {isMobile ? (
        // Mobile: Horizontal swipe carousel
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-4">
            {clientSlides.map((slide) => (
              <div
                key={slide.id}
                className="flex-none w-[90vw] min-h-[80dvh] rounded-[4px] overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Mobile slide: stacked layout */}
                <div className="flex flex-col h-full">
                  {/* Images */}
                  <div className="flex flex-col gap-1">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={slide.images[0]}
                        alt={`${slide.name} — scene 1`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="aspect-[21/9] overflow-hidden">
                      <img
                        src={slide.images[1]}
                        alt={`${slide.name} — scene 2`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 flex-1">
                    <span
                      className="font-mono tracking-[0.2em] uppercase block mb-2"
                      style={{
                        fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      CLIENT
                    </span>
                    <h3
                      className="font-display font-normal leading-[1.1] mb-2"
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        color: 'var(--color-text-primary)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {slide.name}
                    </h3>
                    <span
                      className="font-mono tracking-[0.12em] uppercase block mb-3"
                      style={{
                        fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      {slide.projectCount} &middot; {slide.dateRange}
                    </span>
                    <p
                      className="font-body font-light leading-[1.7] mb-4"
                      style={{
                        fontSize: 'clamp(0.8rem, 1vw, 0.875rem)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {slide.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono tracking-[0.12em] uppercase px-2 py-0.5 rounded-full"
                          style={{
                            fontSize: 'clamp(0.5rem, 0.6vw, 0.6rem)',
                            color: 'var(--color-text-muted)',
                            backgroundColor: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Desktop: Scroll-driven pinned slides
        <div ref={slidesContainerRef}>
          {clientSlides.map((slide, index) => (
            <ClientSlide key={slide.id} data={slide} index={index} />
          ))}
        </div>
      )}

      {/* Navigation UI */}
      <ClientSlideNav
        total={clientSlides.length}
        active={activeSlide}
        onDotClick={goToSlide}
        onPrev={goPrev}
        onNext={goNext}
        isMobile={isMobile}
      />
    </section>
  )
}
