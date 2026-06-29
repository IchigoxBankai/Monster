import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Lifestyle.css'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  { id: 'athletes', icon: '🏆', label: 'Athletes', desc: 'Fueling champions on the track, pitch, and podium.' },
  { id: 'gaming', icon: '🎮', label: 'Gaming', desc: 'Peak focus when every frame and second counts.' },
  { id: 'adventure', icon: '🏔', label: 'Adventure', desc: 'More energy for the trails less traveled.' },
  { id: 'performance', icon: '⚡', label: 'Performance', desc: 'Engineered for those who push further, always.' },
]

const STATS = [
  { val: '50+', label: 'Countries' },
  { val: '100M+', label: 'Fans Worldwide' },
  { val: '0g', label: 'Sugar (Zero Ultra)' },
  { val: '30+', label: 'Flavors' },
]

export default function Lifestyle() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const pillarsRef = useRef([])
  const statsRef = useRef([])
  const parallaxRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on background
      gsap.to(parallaxRef.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      })

      // Title
      gsap.fromTo(titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        }
      )

      // Pillars
      gsap.fromTo(pillarsRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
        }
      )

      // Stats counter
      statsRef.current.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
          }
        )
      })
    }, sectionRef)

    // Cycle active pillar
    const interval = setInterval(() => {
      setActiveIdx(i => (i + 1) % PILLARS.length)
    }, 2400)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [])

  return (
    <section className="lifestyle" id="lifestyle" ref={sectionRef}>
      {/* Animated background */}
      <div className="lifestyle-bg" ref={parallaxRef}>
        <div className="lifestyle-bg-grid" />
        <div className="lifestyle-bg-orb orb1" />
        <div className="lifestyle-bg-orb orb2" />
        <div className="lifestyle-bg-orb orb3" />
        <div className="lifestyle-energy-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="energy-line" style={{ '--i': i }} />
          ))}
        </div>
      </div>

      <div className="lifestyle-inner">
        {/* Top content */}
        <div className="lifestyle-header">
          <span className="section-label lifestyle-badge">Lifestyle</span>
          <h2 className="lifestyle-title" ref={titleRef} id="lifestyle-title">
            BUILT FOR THOSE<br />
            WHO PUSH<br />
            <span className="gradient-text">FURTHER</span>
          </h2>
        </div>

        {/* Pillars */}
        <div className="lifestyle-pillars">
          {PILLARS.map((p, i) => (
            <div
              key={p.id}
              className={`lifestyle-pillar ${i === activeIdx ? 'active' : ''}`}
              id={`lifestyle-${p.id}`}
              ref={el => pillarsRef.current[i] = el}
              onMouseEnter={() => setActiveIdx(i)}
            >
              <div className="pillar-icon">{p.icon}</div>
              <div className="pillar-body">
                <h3 className="pillar-label">{p.label}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
              <div className="pillar-arrow">→</div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="lifestyle-stats-bar">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="lifestyle-stat"
              id={`lifestyle-stat-${i}`}
              ref={el => statsRef.current[i] = el}
            >
              <span className="lifestyle-stat-val gradient-text">{s.val}</span>
              <span className="lifestyle-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
