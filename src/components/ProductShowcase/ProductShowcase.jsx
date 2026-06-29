import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ProductShowcase.css'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    id: 'zero-sugar',
    icon: '◎',
    title: 'Zero Sugar',
    desc: 'All the taste, none of the compromise. Ultra-clean energy without the crash.',
    color: '#39ff14',
  },
  {
    id: 'ultra-refresh',
    icon: '❄',
    title: 'Ultra Refreshing',
    desc: 'A crisp, light flavor profile that redefines what an energy drink can taste like.',
    color: '#00e5ff',
  },
  {
    id: 'performance',
    icon: '⚡',
    title: 'High Performance',
    desc: '160mg of natural caffeine. B-vitamins. Taurine. Everything built to fuel your peak.',
    color: '#ff6b35',
  },
]

export default function ProductShowcase() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const badgeRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax slide-in
      gsap.fromTo(imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )

      // Badge + title
      gsap.fromTo([badgeRef.current, titleRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      )

      // Feature cards stagger
      gsap.fromTo(cardsRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
        }
      )

      // Energy line draw
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%', once: true }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="showcase" id="product" ref={sectionRef}>
      <div className="showcase-bg-accent" />

      <div className="showcase-inner">
        {/* Left: Product visual */}
        <div className="showcase-visual" ref={imageRef}>
          <div className="showcase-glow-ring" />
          <div className="showcase-can-wrap">
            <img
              src="/monster_can.jpg"
              alt="Monster Energy Zero Ultra Can"
              className="showcase-can-img"
              id="showcase-can-img"
            />
            <div className="showcase-float-badge" id="showcase-zero-badge">
              <span className="float-badge-val">0g</span>
              <span className="float-badge-label">Sugar</span>
            </div>
            <div className="showcase-float-badge right" id="showcase-energy-badge">
              <span className="float-badge-val">160mg</span>
              <span className="float-badge-label">Caffeine</span>
            </div>
          </div>

          {/* Decorative rotating ring */}
          <div className="showcase-orbit-ring" />
        </div>

        {/* Right: Content */}
        <div className="showcase-content">
          <div ref={badgeRef}>
            <span className="section-label">Product</span>
          </div>

          <h2 className="showcase-title" ref={titleRef} id="showcase-title">
            ENGINEERED<br />
            FOR THE<br />
            <span className="gradient-text">ULTRA STATE</span>
          </h2>

          <div
            ref={lineRef}
            className="showcase-divider"
            style={{ transformOrigin: 'left' }}
          />

          <div className="showcase-features">
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                className="feature-card glass-card"
                id={`feature-${f.id}`}
                ref={el => cardsRef.current[i] = el}
              >
                <div className="feature-icon" style={{ color: f.color }}>{f.icon}</div>
                <div className="feature-body">
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
                <div className="feature-line" style={{ background: f.color }} />
              </div>
            ))}
          </div>

          <a href="#flavors" className="btn-primary" id="showcase-cta" style={{ marginTop: '32px', width: 'fit-content' }}>
            Explore All Flavors
          </a>
        </div>
      </div>
    </section>
  )
}
