import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import ProductShowcase from './components/ProductShowcase/ProductShowcase'
import FlavorCarousel from './components/FlavorCarousel/FlavorCarousel'
import Lifestyle from './components/Lifestyle/Lifestyle'
import Ingredients from './components/Ingredients/Ingredients'
import Community from './components/Community/Community'
import FinalCTA from './components/FinalCTA/FinalCTA'
import Footer from './components/Footer/Footer'
import './index.css'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const lenisRef = useRef(null)

  useEffect(() => {
    // Loader
    const timer = setTimeout(() => setLoaded(true), 1800)

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      clearTimeout(timer)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {/* Noise film grain overlay */}
      <div className="noise-overlay" />

      {/* Loading screen */}
      <div className={`loader ${loaded ? 'hidden' : ''}`}>
        <div className="loader-logo">MONSTER</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
      </div>

      <Navbar />
      <main>
        <Hero />
        <ProductShowcase />
        <FlavorCarousel />
        <Lifestyle />
        <Ingredients />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
