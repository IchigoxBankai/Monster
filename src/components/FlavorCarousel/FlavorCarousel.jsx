import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FlavorCarousel.css'

gsap.registerPlugin(ScrollTrigger)

const FLAVORS = [
  {
    id: 'zero-ultra',
    name: 'Zero Ultra',
    tagline: 'The Original',
    desc: 'Crisp, clean citrus with zero sugar. The one that started it all.',
    calories: '10 Cal',
    caffeine: '140mg',
    accentColor: '#39ff14',
    glowColor: 'rgba(57,255,20,0.35)',
    gradient: 'linear-gradient(135deg, #e8f5e9 0%, #ffffff 60%, #f1f8e9 100%)',
    canColor: '#e8ecf0',
    emoji: '🥤',
  },
  {
    id: 'mango-loco',
    name: 'Mango Loco',
    tagline: 'Tropical Rush',
    desc: 'Explosive mango meets passion fruit in an island-born energy experience.',
    calories: '90 Cal',
    caffeine: '160mg',
    accentColor: '#ff8c00',
    glowColor: 'rgba(255,140,0,0.35)',
    gradient: 'linear-gradient(135deg, #fff3e0 0%, #ffffff 60%, #fbe9d0 100%)',
    canColor: '#ffa030',
    emoji: '🥭',
  },
  {
    id: 'pipeline-punch',
    name: 'Pipeline Punch',
    tagline: "Surf's Up",
    desc: 'Hawaiian punch wave of guava, passion fruit, and orange in perfect harmony.',
    calories: '80 Cal',
    caffeine: '160mg',
    accentColor: '#ff3d82',
    glowColor: 'rgba(255,61,130,0.35)',
    gradient: 'linear-gradient(135deg, #fce4ec 0%, #ffffff 60%, #f8bbd0 100%)',
    canColor: '#ff4090',
    emoji: '🌺',
  },
  {
    id: 'ultra-sunrise',
    name: 'Ultra Sunrise',
    tagline: 'Golden Hour',
    desc: 'A sunrise blend of orange and tangerine with a whisper of peach.',
    calories: '25 Cal',
    caffeine: '140mg',
    accentColor: '#ffd600',
    glowColor: 'rgba(255,214,0,0.35)',
    gradient: 'linear-gradient(135deg, #fffde7 0%, #ffffff 60%, #fff8e1 100%)',
    canColor: '#ffb300',
    emoji: '🌅',
  },
  {
    id: 'ultra-violet',
    name: 'Ultra Violet',
    tagline: 'Into The Dark',
    desc: 'A mysterious blend of grape and acai with an electrifying purple finish.',
    calories: '10 Cal',
    caffeine: '140mg',
    accentColor: '#9c27b0',
    glowColor: 'rgba(156,39,176,0.35)',
    gradient: 'linear-gradient(135deg, #f3e5f5 0%, #ffffff 60%, #ede7f6 100%)',
    canColor: '#7b1fa2',
    emoji: '🔮',
  },
  {
    id: 'ultra-paradise',
    name: 'Ultra Paradise',
    tagline: 'Teal Dreams',
    desc: 'Kiwi, lime, and cucumber collide in this emerald burst of refreshment.',
    calories: '10 Cal',
    caffeine: '140mg',
    accentColor: '#00bcd4',
    glowColor: 'rgba(0,188,212,0.35)',
    gradient: 'linear-gradient(135deg, #e0f7fa 0%, #ffffff 60%, #b2ebf2 100%)',
    canColor: '#0097a7',
    emoji: '🌊',
  },
]

export default function FlavorCarousel() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const titleRef = useRef(null)
  const badgeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo([badgeRef.current, titleRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )

      // Horizontal scroll
      const track = trackRef.current
      const totalWidth = track.scrollWidth - track.parentElement.clientWidth + 80

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalWidth * 1.2}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="flavors" id="flavors" ref={sectionRef}>
      <div className="flavors-header">
        <span className="section-label" ref={badgeRef}>Flavor Experience</span>
        <h2 className="flavors-title" ref={titleRef} id="flavors-title">
          FIND YOUR<br /><span className="gradient-text">ULTRA</span>
        </h2>
        <p className="flavors-subtitle">
          Six signature expressions. One unstoppable energy.
        </p>
      </div>

      <div className="flavors-scroll-wrap">
        <div className="flavors-track" ref={trackRef} id="flavors-track">
          {FLAVORS.map((f) => (
            <FlavorCard key={f.id} flavor={f} />
          ))}
        </div>
      </div>

      <div className="flavors-scroll-hint">
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}

function FlavorCard({ flavor }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rotateX = (-y / rect.height) * 12
    const rotateY = (x / rect.width) * 12
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)'
  }

  return (
    <div
      ref={cardRef}
      className="flavor-card"
      id={`flavor-${flavor.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ background: flavor.gradient }}
    >
      {/* Glow */}
      <div
        className="flavor-glow"
        style={{ background: `radial-gradient(circle at center, ${flavor.glowColor} 0%, transparent 70%)` }}
      />

      {/* Top label */}
      <div className="flavor-label" style={{ color: flavor.accentColor, borderColor: `${flavor.accentColor}40` }}>
        {flavor.tagline}
      </div>

      {/* Visual */}
      <div className="flavor-visual">
        <div
          className="flavor-can-mock"
          style={{ background: `linear-gradient(160deg, ${flavor.canColor}cc, ${flavor.canColor})` }}
        >
          <span className="flavor-can-emoji">{flavor.emoji}</span>
          <div
            className="flavor-can-stripe"
            style={{ background: flavor.accentColor }}
          />
          <span className="flavor-can-name">MONSTER</span>
        </div>
      </div>

      {/* Info */}
      <div className="flavor-info">
        <h3 className="flavor-name" style={{ color: flavor.accentColor }}>{flavor.name}</h3>
        <p className="flavor-desc">{flavor.desc}</p>
      </div>

      {/* Stats */}
      <div className="flavor-stats">
        <div className="flavor-stat">
          <span>{flavor.caffeine}</span>
          <span>Caffeine</span>
        </div>
        <div className="flavor-stat-divider" style={{ background: flavor.accentColor }} />
        <div className="flavor-stat">
          <span>{flavor.calories}</span>
          <span>Calories</span>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="flavor-hover-line" style={{ background: flavor.accentColor }} />
    </div>
  )
}
