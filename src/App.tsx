import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Film from './pages/Film'
import Animation from './pages/Animation'
import Clients from './pages/Clients'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film" element={<Film />} />
        <Route path="/animation" element={<Animation />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
