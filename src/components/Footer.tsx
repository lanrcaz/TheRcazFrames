import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Film', path: '/film' },
  { label: 'Animation', path: '/animation' },
  { label: 'Clients', path: '/clients' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const DISCIPLINE_LINKS = [
  'Film Direction',
  'Motion Graphics',
  'Brand Systems',
  'AI Film Ecosystems',
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ferlanracaza' },
  { label: 'Portfolio', href: 'https://ferlanportfolio.my.canva.site/ferlanmotionworks' },
  { label: 'GitHub', href: 'https://github.com/lanrcaz' },
  { label: 'Email', href: 'mailto:ferlan.racaza@gmail.com' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      {/* Row 1 */}
      <div
        className="max-w-[var(--max-content-width)] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
        style={{ padding: 'var(--space-section-y) var(--space-page-x) var(--space-component)' }}
      >
        {/* Left: Brand */}
        <div>
          <h3 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-[-0.01em]" style={{ color: 'var(--color-text-primary)' }}>
            THE R'CAZ
            <br />
            FRAMES
          </h3>
          <p
            className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mt-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            FILM & MOTION — DUBAI, UAE
          </p>
        </div>

        {/* Right: Link Columns */}
        <div className="grid grid-cols-3 gap-8">
          {/* Navigation */}
          <div>
            <h4
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              NAVIGATION
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-body text-sm transition-colors duration-300 hover:text-[#C9A96E]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disciplines */}
          <div>
            <h4
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              DISCIPLINES
            </h4>
            <ul className="space-y-2">
              {DISCIPLINE_LINKS.map((label) => (
                <li key={label}>
                  <span
                    className="font-body text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              CONNECT
            </h4>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm transition-colors duration-300 hover:text-[#C9A96E]"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Row 2: Quote */}
      <div className="max-w-[var(--max-content-width)] mx-auto px-[var(--space-page-x)]">
        <div className="h-[1px] w-full" style={{ backgroundColor: 'var(--color-border)' }} />
        <p
          className="font-display italic text-center py-8 text-base md:text-lg"
          style={{ color: 'var(--color-text-muted)' }}
        >
          &ldquo;Senior creative with 12+ years across branded content, motion design, broadcast, and social-first video. Based in Dubai, UAE.&rdquo;
        </p>
      </div>

      {/* Row 3: Copyright */}
      <div className="max-w-[var(--max-content-width)] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4" style={{ padding: 'var(--space-component) var(--space-page-x)' }}>
        <p
          className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] tracking-[0.12em]"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          &copy; 2025 FERLAN RACAZA / THE R'CAZ FRAMES. ALL RIGHTS RESERVED.
        </p>
        <button
          onClick={scrollToTop}
          className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] tracking-[0.12em] uppercase transition-colors duration-300 hover:text-[#C9A96E]"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          BACK TO TOP
        </button>
      </div>
    </footer>
  )
}
