import PageHero from '../sections/clients/PageHero'
import ClientSlideCarousel from '../sections/clients/ClientSlideCarousel'
import ClientList from '../sections/clients/ClientList'
import TestimonialGrid from '../sections/clients/TestimonialGrid'
import CTABand from '../sections/CTABand'

export default function Clients() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Section 1: Page Hero */}
      <PageHero />

      {/* Section 2: Client Slide Experience (Core Feature) */}
      <ClientSlideCarousel />

      {/* Section 3: Client List (Compact View) */}
      <ClientList />

      {/* Section 4: Testimonials */}
      <TestimonialGrid />

      {/* Section 5: CTA Band + Footer */}
      <CTABand />
    </div>
  )
}
