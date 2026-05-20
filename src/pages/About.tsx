import PageHeroAbout from '@/sections/about/PageHeroAbout'
import BioSection from '@/sections/about/BioSection'
import CareerTimeline from '@/sections/about/CareerTimeline'
import PhilosophyGrid from '@/sections/about/PhilosophyGrid'
import ToolsGrid from '@/sections/about/ToolsGrid'
import CTABand from '@/sections/CTABand'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <main>
      <PageHeroAbout />
      <BioSection />
      <CareerTimeline />
      <PhilosophyGrid />
      <ToolsGrid />
      <CTABand />
      <Footer />
    </main>
  )
}
