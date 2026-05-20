import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PageHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const ruleLeftRef = useRef<HTMLSpanElement>(null)
  const ruleRightRef = useRef<HTMLSpanElement>(null)
  const [, setRevealed] = useState(false)

  useEffect(() => {
    // Title words reveal
    const words = titleRef.current?.querySelectorAll('.word')
    if (words) {
      gsap.set(words, { y: '100%', opacity: 0 })
      gsap.to(words, {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.4,
      })
    }

    // Fade-up for label, subtitle, breadcrumb
    const fadeEls = [labelRef.current, subtitleRef.current, breadcrumbRef.current]
    gsap.set(fadeEls, { y: 30, opacity: 0 })
    gsap.to(fadeEls, {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.8,
    })

    // Decorative rules
    gsap.set([ruleLeftRef.current, ruleRightRef.current], { scaleX: 0 })
    gsap.to([ruleLeftRef.current, ruleRightRef.current], {
      scaleX: 1,
      duration: 0.8,
      ease: 'power2.out',
      delay: 1.0,
    })

    // Background parallax
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${self.progress * 25}%)`
        }
      },
    })

    setRevealed(true)

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: 'translateY(0%)' }}
      >
        <img
          src="/client-acme-scene-1.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.4 }}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-[var(--space-page-x)] max-w-[var(--max-content-width)] mx-auto">
        {/* Breadcrumb */}
        <div ref={breadcrumbRef} className="mb-6 overflow-hidden">
          <Link
            to="/"
            className="font-mono tracking-[0.12em] uppercase transition-colors duration-300 hover:text-[#C9A96E]"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            HOME
          </Link>
          <span
            className="font-mono tracking-[0.12em] uppercase mx-2"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            /
          </span>
          <span
            className="font-mono tracking-[0.12em] uppercase"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-muted)',
            }}
          >
            CLIENTS
          </span>
        </div>

        {/* Label */}
        <span
          ref={labelRef}
          className="font-mono tracking-[0.2em] uppercase block mb-4"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
          }}
        >
          CLIENT PORTFOLIO
        </span>

        {/* Title with decorative rules */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <span
            ref={ruleLeftRef}
            className="hidden sm:block h-[1px] w-[60px] origin-right"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <h1
            ref={titleRef}
            className="font-display font-light leading-[0.95] overflow-hidden"
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="word inline-block">THE</span>{' '}
            <span className="word inline-block">ARCHIVE</span>
          </h1>
          <span
            ref={ruleRightRef}
            className="hidden sm:block h-[1px] w-[60px] origin-left"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono tracking-[0.12em] uppercase"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          SELECTED COLLABORATIONS WITH STUDIOS, BRANDS & PRODUCTION HOUSES
        </p>
      </div>
    </section>
  )
}
