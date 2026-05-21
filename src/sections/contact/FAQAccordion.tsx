import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is your typical project timeline?',
    answer:
      'Timelines vary significantly by project scope. A short branded film typically takes 4–6 weeks from concept to delivery. Animation projects range from 6–12 weeks depending on complexity. Rush timelines are possible with adjusted scope — let\'s discuss your deadline.',
  },
  {
    question: 'Do you work with international clients?',
    answer:
      'Absolutely. While based in Dubai, I regularly collaborate with clients across the Middle East, Asia, Europe, and beyond. Remote directing, virtual production reviews, and cloud-based workflows make distance a non-issue.',
  },
  {
    question: 'What is your approach to the creative process?',
    answer:
      'Every project begins with a discovery call to understand your vision, audience, and goals. From there, I develop a creative treatment with visual references and a proposed approach. Once approved, we move through pre-production, production, and post — with check-ins at each stage.',
  },
  {
    question: 'Can you handle both filming and animation in one project?',
    answer:
      'Yes — hybrid projects are a specialty. Live-action footage can be enhanced with animation, VFX, or motion graphics. This creates unique visual experiences that neither medium could achieve alone. Let\'s discuss the blend that works for your story.',
  },
  {
    question: 'What deliverables are included?',
    answer:
      'Standard deliverables include the master file in your preferred format, social media cutdowns (15s, 30s, 60s), and still frames for promotional use. Custom deliverables — like behind-the-scenes content or director\'s commentary — can be arranged.',
  },
]

export default function FAQAccordion() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        padding: 'var(--space-section-y) var(--space-page-x)',
      }}
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
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
          COMMON QUESTIONS
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
          FREQUENTLY ASKED
        </h2>
        <div className="flex justify-center">
          <span
            className="h-[1px] w-[80px] transition-transform duration-800 origin-center"
            style={{
              backgroundColor: 'var(--color-border)',
              transform: headerVisible ? 'scaleX(1)' : 'scaleX(0)',
              transitionDelay: '200ms',
            }}
          />
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-[var(--max-narrow-width)] mx-auto">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className="transition-all duration-1000"
              style={{
                borderTop: '1px solid var(--color-border)',
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <span
                  className="font-display transition-colors duration-300"
                  style={{
                    fontSize: '1.125rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                  }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  className="shrink-0 transition-transform duration-300"
                  style={{
                    color: 'var(--color-text-muted)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="font-body leading-[1.7] tracking-[0.01em] pb-6"
                      style={{
                        fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
