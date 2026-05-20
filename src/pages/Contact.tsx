import PageHeroContact from '@/sections/contact/PageHeroContact'
import ContactFormInfo from '@/sections/contact/ContactFormInfo'
import FAQAccordion from '@/sections/contact/FAQAccordion'
import Footer from '@/components/Footer'

export default function Contact() {
  return (
    <main>
      <PageHeroContact />
      <ContactFormInfo />
      <FAQAccordion />
      <Footer />
    </main>
  )
}
