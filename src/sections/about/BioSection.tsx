import { useRef, useState, useEffect } from 'react'

export default function BioSection() {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      <div className="max-w-[var(--max-content-width)] mx-auto grid grid-cols-1 md:grid-cols-[40%_55%] gap-[5%]">
        {/* Left Column - Portrait */}
        <div
          className="transition-all duration-[1400ms] ease-out"
          style={{
            opacity: revealed ? 1 : 0,
            clipPath: revealed ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
            transitionDelay: '0ms',
          }}
        >
          <div className="overflow-hidden rounded-[var(--border-radius-md)] group">
            <img
              src="/film/travel-series/scene-01.jpg"
              alt="Ferlan Racaza — Senior Brand Creative based in Dubai"
              className="w-full aspect-[3/4] object-cover transition-transform duration-[600ms] group-hover:scale-[1.02]"
            />
          </div>
          <p
            className="font-mono tracking-[0.12em] uppercase mt-3"
            style={{
              fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
              color: 'var(--color-text-tertiary)',
              lineHeight: 1.4,
            }}
          >
            DUBAI, UAE &middot; SENIOR BRAND CREATIVE
          </p>
        </div>

        {/* Right Column - Bio Text */}
        <div className="flex flex-col justify-center">
          {/* Section Label */}
          <div
            className="flex items-center gap-4 mb-6 transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '0ms',
            }}
          >
            <span
              className="font-mono tracking-[0.2em] uppercase"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              ABOUT
            </span>
            <span
              className="h-[1px] w-[60px] origin-left transition-transform duration-800"
              style={{
                backgroundColor: 'var(--color-border)',
                transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
                transitionDelay: '200ms',
              }}
            />
          </div>

          {/* Title */}
          <h2
            className="font-display font-light tracking-[-0.01em] leading-[1.2] transition-all duration-1000"
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '100ms',
            }}
          >
            Ferlan Racaza — Film & Motion Creative
          </h2>

          {/* Bio Paragraphs */}
          <div className="flex flex-col gap-6 mt-6">
            <p
              className="font-body font-light leading-[1.7] tracking-[0.01em] transition-all duration-1000"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                color: 'var(--color-text-secondary)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '200ms',
              }}
            >
              Senior creative with 12+ years across branded content, motion design, broadcast,
              social-first video, concept art, and post-production. Currently based in Dubai, leading
              visual direction from idea through delivery across commercials, brand films, social
              campaigns, and digital storytelling at Create Production DXB.
            </p>
            <p
              className="font-body font-light leading-[1.7] tracking-[0.01em] transition-all duration-1000"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                color: 'var(--color-text-secondary)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '350ms',
              }}
            >
              The work combines hands-on craft in Adobe Creative Suite, Cinema 4D, compositing, and
              color with AI film ecosystem design using Seedance, Kling workflows, and Higgsfield-style
              automation systems that turn UGC inputs into ad concepts, motion assets, and
              campaign-ready creative variants. Film is the focus — motion graphics is the foundation.
            </p>
            <p
              className="font-body font-light leading-[1.7] tracking-[0.01em] transition-all duration-1000"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                color: 'var(--color-text-secondary)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: '500ms',
              }}
            >
              From Cebu to Dubai — built a creative career across broadcast, post-production, and
              brand systems. Now focused on filming: TVCs, branded films, social content, and
              AI-powered creative workflows. Every frame captured with intention.
            </p>
          </div>

          {/* Signature */}
          <div
            className="mt-8 flex items-center gap-3 transition-all duration-1000"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '650ms',
            }}
          >
            <span
              className="font-display"
              style={{ fontSize: '2rem', color: 'var(--color-accent-gold)' }}
            >
              FR
            </span>
            <span
              className="font-mono tracking-[0.2em] uppercase"
              style={{
                fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.4,
              }}
            >
              FERLAN RACAZA / THE RCAZ FRAMES
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
