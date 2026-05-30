import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function PageHeroAbout() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: '60vh' }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms]"
        style={{
          backgroundImage: 'url(/film/mch-lucid-car/scene-01.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: revealed ? 1 : 0,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Breadcrumb */}
        <div
          className="transition-all duration-1000"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '200ms',
          }}
        >
          <Link
            to="/"
            className="font-mono tracking-[0.12em] uppercase transition-colors duration-300 hover:text-[#C9A96E]"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-tertiary)',
              lineHeight: 1.4,
            }}
          >
            HOME / ABOUT
          </Link>
        </div>

        {/* Label */}
        <p
          className="font-mono tracking-[0.2em] uppercase mt-6 mb-4 transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '300ms',
          }}
        >
          THE FILMMAKER
        </p>

        {/* Title */}
        <h1
          className="font-display font-light leading-[0.95] tracking-[-0.02em] transition-all duration-1000"
          style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            color: 'var(--color-text-primary)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '400ms',
          }}
        >
          THE STORY
        </h1>

        {/* Decorative rules */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span
            className="h-[1px] w-[60px] origin-right transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '500ms',
            }}
          />
          <span
            className="h-[1px] w-[60px] origin-left transition-transform duration-800"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '500ms',
            }}
          />
        </div>

        {/* Subtitle */}
        <p
          className="font-mono tracking-[0.12em] uppercase mt-6 transition-all duration-1000"
          style={{
            fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
            color: 'var(--color-text-tertiary)',
            lineHeight: 1.4,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(40px)',
            transitionDelay: '600ms',
          }}
        >
          CAM OP &middot; SOUND ENGINEER &middot; VISUAL STORYTELLER
        </p>
      </div>
    </section>
  )
}
