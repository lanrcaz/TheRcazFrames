import { useEffect } from 'react'
import HeroSection from '../sections/HeroSection'
import FeaturedWork from '../sections/FeaturedWork'
import ClientCarousel from '../sections/ClientCarousel'
import DisciplineSplit from '../sections/DisciplineSplit'
import JourneySection from '../sections/JourneySection'
import MarqueeStrip from '../sections/MarqueeStrip'
import CTABand from '../sections/CTABand'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <ClientCarousel />
      <DisciplineSplit />
      <JourneySection />
      <MarqueeStrip />
      <CTABand />
    </>
  )
}
