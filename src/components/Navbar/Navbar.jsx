import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Flavors', href: '#flavors' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'Ingredients', href: '#ingredients' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav ref={navRef} className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo" id="navbar-logo">
          <span className="logo-m">M</span>ONSTER
        </a>

        <ul className="navbar-links" id="navbar-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a href={href} className="nav-link" id={`nav-${label.toLowerCase()}`}>
                {label}
                <span className="nav-link-line" />
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <a href="#cta" className="btn-primary nav-cta" id="navbar-cta">
            Get Monster
          </a>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="hamburger-btn"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} id="mobile-menu">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
        <a href="#cta" className="btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>
          Get Monster
        </a>
      </div>
    </nav>
  )
}
