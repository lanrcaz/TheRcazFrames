import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ClientSlideData } from './clientData'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface ClientSlideProps {
  data: ClientSlideData
  index: number
}

export default function ClientSlide({ data, index }: ClientSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null)
  const bgBlurRef = useRef<HTMLDivElement>(null)
  const primaryImgRef = useRef<HTMLDivElement>(null)
  const secondaryImgRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const projectsRef = useRef<HTMLUListElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  const isTypeA = data.layout === 'A'

  useLayoutEffect(() => {
    const slide = slideRef.current
    if (!slide) return

    const ctx = gsap.context(() => {
      // Entrance timeline - scrubbed to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: 'top top',
          end: '+=150%',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      })

      // 0-10%: Background blur image fades in
      tl.fromTo(
        bgBlurRef.current,
        { opacity: 0 },
        { opacity: 0.15, ease: 'none' },
        0
      )

      // 10-25%: Primary image clip-path wipe-up reveal
      tl.fromTo(
        primaryImgRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.15, ease: 'power3.inOut' },
        0.10
      )

      // 20-30%: Secondary image wipe-up
      tl.fromTo(
        secondaryImgRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 0.10, ease: 'power3.inOut' },
        0.20
      )

      // 25-35%: Roman numeral fades in
      tl.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.10, ease: 'power3.out' },
        0.25
      )

      // 30-40%: Client name words reveal
      const nameWords = nameRef.current?.querySelectorAll('.name-word')
      if (nameWords) {
        tl.fromTo(
          nameWords,
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, stagger: 0.02, duration: 0.10, ease: 'power4.out' },
          0.30
        )
      }

      // 40-50%: Metadata + divider fade-up
      tl.fromTo(
        metaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08, ease: 'power3.out' },
        0.40
      )

      // 45-55%: Description fade-up
      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.08, ease: 'power3.out' },
        0.45
      )

      // 55-65%: Project list stagger
      const projectItems = projectsRef.current?.querySelectorAll('li')
      if (projectItems) {
        tl.fromTo(
          projectItems,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.015, duration: 0.08, ease: 'power3.out' },
          0.55
        )
      }

      // 65-70%: Tags fade-up
      tl.fromTo(
        tagsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.05, ease: 'power3.out' },
        0.65
      )

      // 70-75%: CTA fade-up
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.05, ease: 'power3.out' },
        0.70
      )

      // 85-100%: Content exit animation
      const exitDir = isTypeA ? 50 : -50
      tl.to(
        [numberRef.current, nameRef.current, metaRef.current, descRef.current, projectsRef.current, tagsRef.current, ctaRef.current],
        { x: exitDir, opacity: 0, duration: 0.12, ease: 'power2.in' },
        0.85
      )
      tl.to(
        [primaryImgRef.current, secondaryImgRef.current],
        { x: -exitDir * 0.5, opacity: 0, duration: 0.12, ease: 'power2.in' },
        0.88
      )

      // Background exit
      tl.to(bgBlurRef.current, { opacity: 0, duration: 0.10 }, 0.90)
    }, slide)

    return () => ctx.revert()
  }, [isTypeA])

  const contentPanel = (
    <div className="relative flex flex-col justify-center" style={{ padding: '3rem' }}>
      {/* Glassmorphic card background */}
      <div
        className="absolute inset-0 rounded-[4px]"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      />

      <div className="relative z-10">
        {/* Decorative roman numeral */}
        <span
          ref={numberRef}
          className="absolute font-display font-light leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(6rem, 12vw, 10rem)',
            color: 'var(--color-text-muted)',
            letterSpacing: '-0.03em',
            top: '-2rem',
            [isTypeA ? 'right' : 'left']: '-1rem',
            opacity: 0.3,
          }}
        >
          {data.romanNumeral}
        </span>

        {/* Label */}
        <span
          className="font-mono tracking-[0.2em] uppercase block mb-3"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
          }}
        >
          CLIENT
        </span>

        {/* Client Name */}
        <h2
          ref={nameRef}
          className="font-display font-normal leading-[1.1] overflow-hidden mb-3"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.02em',
          }}
        >
          {data.name.split(' ').map((word, i) => (
            <span key={i} className="name-word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        {/* Project count + date range */}
        <div ref={metaRef} className="mb-4">
          <span
            className="font-mono tracking-[0.12em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            {data.projectCount} &middot; {data.dateRange}
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-[1px] w-10 mb-4"
          style={{ backgroundColor: 'var(--color-border)' }}
        />

        {/* Description */}
        <p
          ref={descRef}
          className="font-body font-light leading-[1.7] mb-5"
          style={{
            fontSize: 'clamp(0.875rem, 1vw, 1rem)',
            color: 'var(--color-text-secondary)',
            maxWidth: '400px',
          }}
        >
          {data.description}
        </p>

        {/* Project list */}
        <ul ref={projectsRef} className="space-y-2 mb-5">
          {data.projects.map((project) => (
            <li
              key={project.name}
              className="font-mono tracking-[0.08em]"
              style={{
                fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              {project.name} ({project.year}) — {project.type}
            </li>
          ))}
        </ul>

        {/* Discipline tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-2 mb-5">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono tracking-[0.12em] uppercase px-3 py-1 rounded-full"
              style={{
                fontSize: 'clamp(0.55rem, 0.6vw, 0.65rem)',
                color: 'var(--color-text-muted)',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#"
          className="group inline-flex items-center gap-2 font-body font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:text-[#D4B87A]"
          style={{
            fontSize: '0.75rem',
            color: '#C9A96E',
          }}
        >
          <span className="relative">
            VIEW FULL CASE STUDY
            <span
              className="absolute -bottom-1 left-0 h-[1px] w-full origin-left transition-transform duration-300 scale-x-50 group-hover:scale-x-100"
              style={{ backgroundColor: '#C9A96E' }}
            />
          </span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </a>
      </div>
    </div>
  )

  const imagePanel = (
    <div className="flex flex-col gap-2 h-full">
      {/* Primary image */}
      <div
        ref={primaryImgRef}
        className="flex-[7] min-h-0 rounded-[2px] overflow-hidden"
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      >
        <img
          src={data.images[0]}
          alt={`${data.name} — scene 1`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      {/* Secondary image */}
      <div
        ref={secondaryImgRef}
        className="flex-[3] min-h-0 rounded-[2px] overflow-hidden"
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      >
        <img
          src={data.images[1]}
          alt={`${data.name} — scene 2`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
    </div>
  )

  return (
    <div
      ref={slideRef}
      className="relative min-h-[100dvh] w-full overflow-hidden"
      data-slide-index={index}
    >
      {/* Background blur image for ambient color bleed */}
      <div
        ref={bgBlurRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <img
          src={data.images[0]}
          alt=""
          className="w-full h-full object-cover"
          style={{
            filter: 'blur(40px) brightness(0.3)',
            transform: 'scale(1.1)',
          }}
        />
      </div>

      {/* Slide content */}
      <div className="relative z-10 h-full min-h-[100dvh] flex items-center px-[var(--space-page-x)] py-[72px]">
        <div className="max-w-[var(--max-content-width)] mx-auto w-full h-[calc(100dvh-144px)]">
          {isTypeA ? (
            <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-4 h-full">
              <div className="h-full min-h-0">{imagePanel}</div>
              <div className="h-full min-h-0">{contentPanel}</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-4 h-full">
              <div className="h-full min-h-0 order-2 md:order-1">{contentPanel}</div>
              <div className="h-full min-h-0 order-1 md:order-2">{imagePanel}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
