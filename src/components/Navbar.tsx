import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'FILM', path: '/film' },
  { label: 'ANIMATION', path: '/animation' },
  { label: 'CLIENTS', path: '/clients' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <div
          className="w-full flex items-center justify-between"
          style={{ paddingLeft: 'var(--space-page-x)', paddingRight: 'var(--space-page-x)' }}
        >
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-tight">
            <span
              className="font-mono text-[0.7rem] tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-text-primary)' }}
            >
              THE SILVER FRAME
            </span>
            <span
              className="font-mono text-[0.55rem] tracking-[0.18em] uppercase"
              style={{ color: 'var(--color-text-muted)' }}
            >
              FILM & ANIMATION
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-[2.5rem]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group relative font-display text-[0.8rem] font-normal tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[#C9A96E]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-1/2 h-[1px] w-full bg-[#C9A96E] origin-center transition-transform duration-300 -translate-x-1/2 scale-x-0 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/contact"
            className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 hover:border-[#C9A96E] hover:scale-105"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: 'var(--color-text-secondary)' }}>
              LET&apos;S TALK
            </span>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1px] transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-text-secondary)',
                transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-[1px] transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-text-secondary)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[1px] transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-text-secondary)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {NAV_LINKS.map((link, i) => (
          <Link
            key={link.path}
            to={link.path}
            className="font-display text-2xl font-normal tracking-[0.18em] uppercase transition-colors duration-300 hover:text-[#C9A96E]"
            style={{
              color: 'var(--color-text-secondary)',
              transitionDelay: menuOpen ? `${i * 80}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 400ms, transform 400ms, color 300ms',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  )
}
