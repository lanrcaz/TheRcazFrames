import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative">
      {/* Film Grain Overlay */}
      <div
        className="fixed inset-0 pointer-events-none animate-grain"
        style={{
          zIndex: 9999,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

function ScrollProgress() {
  return (
    <div
      className="fixed top-0 right-0 w-[2px] h-full pointer-events-none hidden lg:block"
      style={{ zIndex: 100 }}
    >
      <ScrollProgressBar />
    </div>
  )
}

import { useState, useEffect } from 'react'

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="w-full origin-top"
      style={{
        height: `${progress * 100}%`,
        backgroundColor: 'var(--color-accent-gold)',
        transition: 'height 100ms linear',
      }}
    />
  )
}
