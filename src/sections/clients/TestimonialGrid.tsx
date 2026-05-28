import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from './clientData'

gsap.registerPlugin(ScrollTrigger)

export default function TestimonialGrid() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header animation
      const headerEls = headerRef.current?.querySelectorAll('.header-el')
      if (headerEls) {
        gsap.set(headerEls, { y: 30, opacity: 0 })
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(headerEls, {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.1,
              ease: 'power3.out',
            })
          },
        })
      }

      // Card animations
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card')
      const quotes = cardsRef.current?.querySelectorAll('.quote-mark')

      if (cards) {
        gsap.set(cards, { y: 40, opacity: 0 })
        gsap.set(quotes ?? [], { scale: 0.8, opacity: 0 })

        ScrollTrigger.create({
          trigger: cardsRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.12,
              ease: 'power3.out',
            })
            gsap.to(quotes ?? [], {
              scale: 1,
              opacity: 0.3,
              duration: 0.6,
              stagger: 0.12,
              ease: 'back.out(2)',
              delay: 0.2,
            })
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      <div className="max-w-[var(--max-content-width)] mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12">
          <span
            className="header-el font-mono tracking-[0.2em] uppercase block mb-3"
            style={{
              fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            DIRECTOR'S NOTES
          </span>
          <h2
            className="header-el font-display font-light leading-[1.05] mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            BEHIND THE WORK
          </h2>
          <div className="header-el">
            <span
              className="h-[1px] w-[80px] block"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative p-8 rounded-[4px] transition-all duration-400 hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.1)]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Quote mark */}
              <span
                className="quote-mark font-display leading-none block mb-4"
                style={{
                  fontSize: '4rem',
                  color: 'var(--color-text-muted)',
                  opacity: 0.3,
                }}
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p
                className="font-display italic leading-[1.6] mb-6"
                style={{
                  fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {testimonial.quote}
              </p>

              {/* Divider */}
              <div
                className="h-[1px] w-10 mb-4"
                style={{ backgroundColor: 'var(--color-border)' }}
              />

              {/* Client info */}
              <p
                className="font-body font-medium"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                {testimonial.name}
              </p>
              <p
                className="font-mono tracking-[0.08em] mt-1"
                style={{
                  fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                {testimonial.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
