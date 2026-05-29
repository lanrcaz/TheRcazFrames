import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { allClients } from './clientData'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ClientList() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

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

      // Row animations
      const rows = listRef.current?.querySelectorAll('.client-row')
      const dividers = listRef.current?.querySelectorAll('.row-divider')

      if (rows) {
        gsap.set(rows, { y: 30, opacity: 0 })
        gsap.set(dividers ?? [], { scaleX: 0 })

        ScrollTrigger.create({
          trigger: listRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(rows, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power3.out',
            })
            gsap.to(dividers ?? [], {
              scaleX: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power2.out',
              delay: 0.3,
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
        backgroundColor: 'var(--color-bg-primary)',
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
            ALL CLIENTS
          </span>
          <h2
            className="header-el font-display font-light leading-[1.05] mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            EVERY PARTNERSHIP
          </h2>
          <div className="header-el">
            <span
              className="h-[1px] w-[80px] block"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
          </div>
        </div>

        {/* Client list */}
        <div ref={listRef}>
          {allClients.map((client, index) => (
            <div key={client.id}>
              {/* Divider */}
              {index === 0 && (
                <div
                  className="row-divider h-[1px] w-full origin-left"
                  style={{ backgroundColor: 'var(--color-border)' }}
                />
              )}

              {/* Row */}
              <div
                className="client-row group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 px-3 transition-colors duration-300 cursor-pointer"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.02)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                }}
              >
                {/* Left: Client name */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span
                    className="font-display font-normal transition-colors duration-300 group-hover:text-[var(--color-text-primary)] shrink-0"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.5vw, 1.25rem)',
                      color: 'var(--color-text-primary)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {client.name}
                  </span>
                  <span
                    className="font-mono tracking-[0.08em] shrink-0"
                    style={{
                      fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                      color: 'var(--color-text-tertiary)',
                    }}
                  >
                    {client.projectCount} {client.projectCount === '1' ? 'project' : 'projects'}
                  </span>
                </div>

                {/* Right: Tags + View link */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-2">
                    {client.disciplines.map((disc) => (
                      <span
                        key={disc}
                        className="font-mono tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                        style={{
                          fontSize: 'clamp(0.5rem, 0.55vw, 0.6rem)',
                          color: 'var(--color-text-muted)',
                          backgroundColor: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        {disc}
                      </span>
                    ))}
                  </div>
                  <span
                    className="font-mono tracking-[0.1em] uppercase flex items-center gap-1 transition-colors duration-300 group-hover:text-[#C9A96E] shrink-0"
                    style={{
                      fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    VIEW
                    <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
