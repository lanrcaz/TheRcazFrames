import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Film from './pages/Film'

function FilmPage() {
  return <Film />
}

function AnimationPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-[72px]">
      <div className="text-center">
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-[#F5F0EB]">Animation</h1>
        <p className="font-body text-[#9A9590] mt-4">Animation portfolio coming soon.</p>
      </div>
    </div>
  )
}

function ClientsPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-[72px]">
      <div className="text-center">
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-[#F5F0EB]">Clients</h1>
        <p className="font-body text-[#9A9590] mt-4">Client showcase coming soon.</p>
      </div>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-[72px]">
      <div className="text-center">
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-[#F5F0EB]">About</h1>
        <p className="font-body text-[#9A9590] mt-4">About page coming soon.</p>
      </div>
    </div>
  )
}

function ContactPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-[72px]">
      <div className="text-center">
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light text-[#F5F0EB]">Contact</h1>
        <p className="font-body text-[#9A9590] mt-4">Contact page coming soon.</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film" element={<FilmPage />} />
        <Route path="/animation" element={<AnimationPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  )
}
