import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PageHero() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current || !sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollProgress = -rect.top * 0.25
      bgRef.current.style.transform = `translateY(${scrollProgress}px) scale(1.05)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '70vh', minHeight: '500px' }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-opacity duration-[1500ms]"
        style={{
          backgroundImage: 'url(/anim-project-1-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: revealed ? 1 : 0,
          transform: 'scale(1.05)',
        }}
      />

      {/* Base overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      {/* Copper-tinted overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-[800ms]"
        style={{
          backgroundColor: 'rgba(184, 115, 51, 0.03)',
          opacity: revealed ? 1 : 0,
          transitionDelay: '800ms',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-[var(--space-page-x)]">
        {/* Breadcrumb */}
        <div
          className="font-mono transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            letterSpacing: '0.12em',
            lineHeight: 1.4,
            color: 'var(--color-text-tertiary)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms',
            marginBottom: '1.5rem',
          }}
        >
          <Link
            to="/"
            className="transition-colors duration-300 hover:text-[#C9A96E]"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            HOME
          </Link>
          {' / '}
          <span style={{ color: 'var(--color-text-muted)' }}>ANIMATION</span>
        </div>

        {/* Label */}
        <span
          className="font-mono uppercase transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            letterSpacing: '0.2em',
            lineHeight: 1.4,
            color: '#B87333',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '300ms',
            marginBottom: '1rem',
          }}
        >
          ANIMATION PORTFOLIO
        </span>

        {/* Title with decorative rules */}
        <div className="flex items-center gap-6 mb-6">
          {/* Left decorative rule */}
          <span
            className="hidden md:block h-[1px] w-[60px] origin-right transition-transform duration-1000"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '600ms',
            }}
          />

          <h1
            className="font-display font-light transition-all duration-1000"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
              color: 'var(--color-text-primary)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '500ms',
            }}
          >
            ANIMATED WORKS
          </h1>

          {/* Right decorative rule */}
          <span
            className="hidden md:block h-[1px] w-[60px] origin-left transition-transform duration-1000"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '600ms',
            }}
          />
        </div>

        {/* Subtitle */}
        <span
          className="font-mono uppercase transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            letterSpacing: '0.12em',
            lineHeight: 1.4,
            color: 'var(--color-text-secondary)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '700ms',
          }}
        >
          3D ANIMATION · 2D ANIMATION · MOTION GRAPHICS · STOP MOTION
        </span>
      </div>
    </section>
  )
}
