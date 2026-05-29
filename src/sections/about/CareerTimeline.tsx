import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface TimelineEntry {
  year: string
  title: string
  description: string
}

const ENTRIES: TimelineEntry[] = [
  {
    year: '2008 — 2012',
    title: 'BS Information Technology — Graphics & Animation',
    description:
      'University of San Jose-Recoletos, Philippines. Built the foundation in 3D, motion graphics, and visual storytelling. Senior 3D Concept Artist creating character and environment models in Maya and ZBrush.',
  },
  {
    year: '2012',
    title: 'Senior Concept Artist — CallOut',
    description:
      'Cebu City, Philippines. Produced branding, infographics, storyboards, 3D assets, and visual communication materials for clients in Australia and Singapore.',
  },
  {
    year: '2013 — 2017',
    title: 'Broadcast Motion Designer — FashionOne',
    description:
      'Cebu, Philippines. Delivered motion graphics, VFX, and video editing for broadcast and digital. Collaborated with international teams across Japan, Spain, and beyond.',
  },
  {
    year: '2017 — Present',
    title: 'Senior Motion & Post Lead — Create Production DXB',
    description:
      'Dubai, UAE. Lead creative across TVCs, branded films, social video, and campaign assets. Oversee post-production, coach contributors, and architect AI film ecosystems using Seedance and Kling.',
  },
  {
    year: '2024 — Present',
    title: 'Filming Focus — Commercial & Branded Content',
    description:
      'Deep into filming: Travel Series with music producers, automotive commercials for Lucid Motors, and Red Bull documentary work. The camera is now the primary tool.',
  },
  {
    year: '2025 — Present',
    title: 'AI Film Systems & Creative Automation',
    description:
      'Developed AI-powered film and ad-creation workflows. Built FilmaFlow for cinematic storyboarding. Designed 18-agent marketing systems and lead generation pipelines with creative-to-growth integration.',
  },
]

export default function CareerTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])
  const [headerVisible, setHeaderVisible] = useState(false)

  // Header reveal with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  // GSAP scroll-driven line animation + entry reveals
  useGSAP(
    () => {
      if (!lineRef.current || !sectionRef.current) return

      // Animate the center line draw
      const lineLength = lineRef.current.getTotalLength?.() || 1000
      gsap.set(lineRef.current, {
        strokeDasharray: lineLength,
        strokeDashoffset: lineLength,
      })

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true,
        },
      })

      // Animate each entry
      entryRefs.current.forEach((entryEl, i) => {
        if (!entryEl) return
        const isLeft = i % 2 === 0

        gsap.fromTo(
          entryEl,
          {
            opacity: 0,
            x: isLeft ? -30 : 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: entryEl,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="max-w-[var(--max-narrow-width)] mx-auto text-center mb-16"
      >
        <p
          className="font-mono tracking-[0.2em] uppercase transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          THE JOURNEY
        </p>
        <h2
          className="font-display font-light leading-[1.05] tracking-[-0.01em] mt-4 mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: 'var(--color-text-primary)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '100ms',
          }}
        >
          A DECADE OF FRAMES
        </h2>
        <p
          className="font-body font-light leading-[1.7] tracking-[0.01em] transition-all duration-1000"
          style={{
            fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
            color: 'var(--color-text-secondary)',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '200ms',
          }}
        >
          From Cebu to Dubai — the milestones that built a creative career across broadcast, film, and motion design.
        </p>
        <div className="flex justify-center mt-6">
          <span
            className="h-[1px] w-[80px] transition-transform duration-800 origin-center"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: headerVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '300ms',
            }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="relative max-w-[var(--max-content-width)] mx-auto">
        {/* Desktop center line SVG */}
        <svg
          className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] hidden md:block"
          preserveAspectRatio="none"
        >
          <line
            ref={lineRef}
            x1="1"
            y1="0"
            x2="1"
            y2="100%"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        </svg>

        {/* Mobile left line */}
        <div
          className="absolute left-[6px] top-0 h-full w-[1px] md:hidden"
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        {/* Timeline Entries */}
        <div className="flex flex-col gap-12 md:gap-16">
          {ENTRIES.map((entry, i) => {
            const isLeft = i % 2 === 0
            return (
              <div
                key={entry.year}
                ref={(el) => { entryRefs.current[i] = el }}
                className={`relative flex flex-col md:flex-row md:items-center ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node (desktop centered, mobile left) */}
                <div className="absolute left-[2px] md:left-1/2 md:-translate-x-1/2 top-2 z-10">
                  <div
                    className="w-3 h-3 rounded-full border-2 transition-all duration-300"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-accent-gold)',
                    }}
                  />
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 md:w-[45%] ${
                    isLeft ? 'md:pr-[5%] md:text-right' : 'md:pl-[5%] md:text-left'
                  }`}
                >
                  <span
                    className="font-display font-light"
                    style={{
                      fontSize: '2.5rem',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {entry.year}
                  </span>
                  <h3
                    className="font-display mt-2 mb-2"
                    style={{
                      fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                      color: 'var(--color-text-primary)',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className="font-body leading-[1.7] tracking-[0.01em]"
                    style={{
                      fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {entry.description}
                  </p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
