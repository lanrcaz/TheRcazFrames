import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PageHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const leftRuleRef = useRef<HTMLSpanElement>(null)
  const rightRuleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background entrance: fade + scale
      gsap.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', delay: 0.2 }
      )

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Title reveal - word level stagger
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.08,
            ease: 'power4.out',
            delay: 0.6,
          }
        )
      }

      // Breadcrumb fade up
      gsap.fromTo(
        breadcrumbRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      // Label fade up
      gsap.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
      )

      // Subtitle fade up
      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.0 }
      )

      // Decorative lines grow from center
      gsap.fromTo(
        [leftRuleRef.current, rightRuleRef.current],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1.2,
          stagger: 0.1,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '70vh', minHeight: '500px' }}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
        style={{
          backgroundImage: 'url(/film-project-1-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[var(--space-page-x)]">
        {/* Breadcrumb */}
        <div ref={breadcrumbRef} className="mb-6" style={{ opacity: 0 }}>
          <span
            className="font-mono tracking-[0.12em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            <Link
              to="/"
              className="transition-colors duration-300 hover:text-[#C9A96E]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              HOME
            </Link>
            {' / '}
            FILM
          </span>
        </div>

        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono tracking-[0.2em] uppercase block mb-4"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            opacity: 0,
          }}
        >
          FILM PORTFOLIO
        </span>

        {/* Title with decorative lines */}
        <div className="flex items-center gap-4 md:gap-6 mb-4">
          <span
            ref={leftRuleRef}
            className="hidden md:block h-[1px] w-[40px] lg:w-[80px] origin-right"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: 'scaleX(0)',
            }}
          />
          <h1
            ref={titleRef}
            className="font-display font-light leading-[0.95] tracking-[-0.02em] overflow-hidden"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              color: 'var(--color-text-primary)',
            }}
          >
            <span className="word inline-block" style={{ opacity: 0 }}>
              DIRECTED
            </span>{' '}
            <span className="word inline-block" style={{ opacity: 0 }}>
              WORKS
            </span>
          </h1>
          <span
            ref={rightRuleRef}
            className="hidden md:block h-[1px] w-[40px] lg:w-[80px] origin-left"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono tracking-[0.15em] uppercase"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            color: 'var(--color-text-secondary)',
            opacity: 0,
          }}
        >
          NARRATIVE SHORTS · BRANDED CONTENT · MUSIC VIDEOS · COMMERCIAL
        </p>
      </div>
    </section>
  )
}
