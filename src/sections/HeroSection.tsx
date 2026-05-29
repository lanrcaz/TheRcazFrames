import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1000),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => setPhase(5), 1400),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return
      const scrollY = window.scrollY
      bgRef.current.style.transform = `translateY(${scrollY * 0.2}px) scale(1.05)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollFade = phase >= 5 ? 1 : 0
  const heroOpacity = typeof window !== 'undefined' && scrollFade ?
    Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.5)) : 1
  const heroTranslate = typeof window !== 'undefined' ?
    -Math.min(40, window.scrollY * 0.1) : 0

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '120vh' }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 transition-opacity duration-[1800ms]"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: 'scale(1.05)',
          willChange: 'transform',
        }}
      >
        <img
          src="/film/travel-series/scene-01.jpg"
          alt="Dubai travel series — Burj Khalifa aerial"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.6) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-[var(--space-page-x)] transition-all duration-700"
        style={{
          opacity: heroOpacity,
          transform: `translateY(${heroTranslate}px)`,
        }}
      >
        {/* Label */}
        <span
          className="font-mono tracking-[0.2em] uppercase mb-6 transition-all duration-800"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          FILM DIRECTOR &amp; ANIMATOR
        </span>

        {/* Display Title */}
        <div className="text-center">
          <h1
            className="font-display font-light tracking-[-0.02em] leading-[0.95] flex items-center gap-4 md:gap-6"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              color: 'var(--color-text-primary)',
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span
              className="hidden md:block h-[1px] w-[60px] lg:w-[80px] shrink-0"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
            THE R'CAZ
            <span
              className="hidden md:block h-[1px] w-[60px] lg:w-[80px] shrink-0"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
          </h1>
          <h1
            className="font-display font-light tracking-[-0.02em] leading-[0.95] mt-[0.1em]"
            style={{
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              color: 'var(--color-text-primary)',
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          >
            FRAMES
          </h1>
        </div>

        {/* Subtitle */}
        <p
          className="font-display text-center mt-8 max-w-[480px] transition-all duration-800"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight: 400,
            letterSpacing: '0.18em',
            lineHeight: 1.4,
            color: 'var(--color-text-secondary)',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Film Is the Focus. Motion Is the Foundation. Twelve Years, Two Disciplines, One Frame at a Time.
        </p>

        {/* Meta Strip */}
        <div
          className="flex items-center gap-3 mt-8 transition-all duration-700"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transitionDelay: '200ms',
          }}
        >
          <span
            className="font-mono tracking-[0.12em]"
            style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-tertiary)' }}
          >
            EST. 2008
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: 'var(--color-text-tertiary)' }}
          />
          <span
            className="font-mono tracking-[0.12em]"
            style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-tertiary)' }}
          >
            DUBAI, UAE
          </span>
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: 'var(--color-text-tertiary)' }}
          />
          <span
            className="font-mono tracking-[0.12em]"
            style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-tertiary)' }}
          >
            FILM &amp; ANIMATION
          </span>
        </div>

        {/* Right Editorial Panel — Desktop */}
        <div
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 max-w-[280px] mr-[var(--space-page-x)] transition-all duration-600"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(20px)',
          }}
        >
          <div
            className="p-6 rounded-[var(--border-radius-md)]"
            style={{
              backgroundColor: 'rgba(10,10,10,0.4)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="font-mono tracking-[0.2em] uppercase block mb-2"
              style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', color: 'var(--color-text-muted)' }}
            >
              ISSUE I
            </span>
            <span
              className="block h-[1px] w-[40px] mb-4"
              style={{ backgroundColor: 'var(--color-border)' }}
            />
            <p
              className="font-display leading-[1.6] mb-4"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                fontWeight: 300,
                letterSpacing: '0.01em',
                color: 'var(--color-text-secondary)',
              }}
            >
              FROM INDEPENDENT SHORTS TO BRANDED CONTENT — A VISUAL ARCHIVE OF TWO CREATIVE DISCIPLINES
            </p>
            <span
              className="font-mono tracking-[0.12em] block mb-2"
              style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-tertiary)' }}
            >
              2008 — PRESENT
            </span>
            <span
              className="font-mono tracking-[0.12em] block"
              style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-muted)' }}
            >
              FROM CONCEPT TO FINAL FRAME &amp; BEYOND
            </span>
          </div>
        </div>

        {/* Editorial Panel — Mobile/Tablet */}
        <div
          className="lg:hidden mt-8 max-w-[500px] mx-auto transition-all duration-600"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div
            className="p-6 rounded-[var(--border-radius-md)]"
            style={{
              backgroundColor: 'rgba(10,10,10,0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span
              className="font-mono tracking-[0.2em] uppercase block mb-2"
              style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', color: 'var(--color-text-muted)' }}
            >
              ISSUE I
            </span>
            <p
              className="font-display text-sm leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              FROM INDEPENDENT SHORTS TO BRANDED CONTENT — A VISUAL ARCHIVE OF TWO CREATIVE DISCIPLINES
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500"
          style={{
            opacity: phase >= 5 ? 1 : 0,
            transform: phase >= 5 ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
          }}
        >
          <span
            className="font-mono tracking-[0.2em] uppercase"
            style={{ fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)', color: 'var(--color-text-muted)' }}
          >
            SCROLL TO EXPLORE
          </span>
          <span
            className="block w-[1px] h-[40px] animate-scroll-bounce"
            style={{ backgroundColor: 'var(--color-text-muted)' }}
          />
        </div>

        {/* Bottom-right rotated text */}
        <div
          className="hidden lg:block absolute bottom-8 right-8 origin-bottom-right transition-all duration-500"
          style={{
            opacity: phase >= 5 ? 0.5 : 0,
            transform: 'rotate(90deg) translateX(100%)',
            transformOrigin: 'bottom right',
          }}
        >
          <span
            className="font-mono tracking-[0.12em] uppercase whitespace-nowrap"
            style={{ fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)', color: 'var(--color-text-muted)' }}
          >
            THE R'CAZ FRAMES / FILM & MOTION / DUBAI
          </span>
        </div>
      </div>
    </section>
  )
}
