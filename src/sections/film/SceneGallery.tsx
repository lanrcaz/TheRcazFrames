import { useRef, useEffect, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lightbox from './Lightbox'

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
  src: string
  title: string
  description: string
  aspect: string
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/film-scene-1a.jpg',
    title: 'Echoes of Tide',
    description: 'Low-angle hallway, dramatic shadows, noir lighting',
    aspect: '16/9',
  },
  {
    src: '/film-scene-1b.jpg',
    title: 'Solstice',
    description: 'Diner two-shot, practical lighting, rich colors',
    aspect: '16/9',
  },
  {
    src: '/film-scene-1c.jpg',
    title: 'Neon Veins',
    description: 'Aerial coastal road, morning fog',
    aspect: '2.39/1',
  },
  {
    src: '/film-scene-1d.jpg',
    title: 'Paper Boats',
    description: 'Close-up of hands with photograph, warm window light',
    aspect: '4/3',
  },
  {
    src: '/client-acme-scene-1.jpg',
    title: 'Meridian',
    description: 'Grand hallway, symmetrical, chandelier reflections',
    aspect: '16/9',
  },
  {
    src: '/client-nova-scene-1.jpg',
    title: 'Origin',
    description: 'Car chase through European streets, motion blur',
    aspect: '16/9',
  },
  {
    src: '/client-aria-scene-2.jpg',
    title: 'After Hours',
    description: 'Vintage microphone, single spotlight, rim light',
    aspect: '4/3',
  },
  {
    src: '/client-metro-scene-1.jpg',
    title: 'Cascade',
    description: 'Luxury watch on marble, dramatic side lighting',
    aspect: '16/9',
  },
]

export default function SceneGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const handleNavigate = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header staggered fade-up
      const headerEls = headerRef.current?.querySelectorAll('.fade-up-el')
      if (headerEls) {
        gsap.fromTo(
          headerEls,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Decorative divider line grow
      gsap.fromTo(
        dividerRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: dividerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      )

      // Image reveal - clip-path wipe up + scale
      const items = gridRef.current?.querySelectorAll('.gallery-item')
      if (items) {
        items.forEach((item, i) => {
          const img = item.querySelector('.gallery-img')
          gsap.fromTo(
            item,
            { clipPath: 'inset(100% 0 0% 0)' },
            {
              clipPath: 'inset(0% 0 0% 0)',
              duration: 1.4,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                once: true,
              },
              delay: (i % 3) * 0.1,
            }
          )
          gsap.fromTo(
            img,
            { scale: 1.1 },
            {
              scale: 1,
              duration: 1.4,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                once: true,
              },
              delay: (i % 3) * 0.1,
            }
          )
        })
      }
    }, sectionRef)

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
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <span
            className="fade-up-el font-mono tracking-[0.2em] uppercase block mb-4"
            style={{
              fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
              color: 'var(--color-text-muted)',
              opacity: 0,
            }}
          >
            BEHIND THE LENS
          </span>
          <h2
            className="fade-up-el font-display font-light leading-[1.05] tracking-[-0.01em] mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: 'var(--color-text-primary)',
              opacity: 0,
            }}
          >
            FRAMES IN FOCUS
          </h2>
          <p
            className="fade-up-el font-body font-light max-w-[600px]"
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              opacity: 0,
            }}
          >
            A closer look at the cinematography, composition, and visual language
            across the film portfolio.
          </p>
        </div>

        {/* Decorative divider */}
        <div
          ref={dividerRef}
          className="h-[1px] w-full mb-12 origin-left"
          style={{
            backgroundColor: 'var(--color-border)',
            transform: 'scaleX(0)',
          }}
        />

        {/* Masonry Grid */}
        <div
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3"
          style={{ gap: '1rem' }}
        >
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className="gallery-item break-inside-avoid mb-4 group cursor-pointer"
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
              }}
              onClick={() => handleImageClick(index)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="gallery-img w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  style={{ aspectRatio: image.aspect }}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(10,10,10,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span
                    className="font-mono tracking-[0.2em] uppercase"
                    style={{
                      fontSize: 'clamp(0.6rem, 0.7vw, 0.7rem)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    VIEW
                  </span>
                </div>
              </div>
              {/* Metadata */}
              <div className="mt-2">
                <p
                  className="font-mono tracking-[0.12em] uppercase"
                  style={{
                    fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {image.title}
                </p>
                <p
                  className="font-body"
                  style={{
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                    color: 'var(--color-text-tertiary)',
                    lineHeight: 1.4,
                  }}
                >
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex}
        onNavigate={handleNavigate}
      />
    </section>
  )
}
