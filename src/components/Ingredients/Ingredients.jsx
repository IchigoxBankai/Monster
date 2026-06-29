import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Ingredients.css'

gsap.registerPlugin(ScrollTrigger)

const INGREDIENTS = [
  {
    id: 'caffeine',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="#39ff14" strokeWidth="2" strokeDasharray="6 3"/>
        <path d="M22 20 L32 44 L42 20" stroke="#39ff14" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M25 30 L39 30" stroke="#39ff14" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Caffeine',
    amount: '160mg',
    unit: 'per can',
    desc: 'Natural caffeine sourced and precisely dosed for sustained mental clarity and energy.',
  },
  {
    id: 'zero-sugar',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="#39ff14" strokeWidth="2"/>
        <path d="M22 42 L42 22" stroke="#ff3d3d" strokeWidth="3" strokeLinecap="round"/>
        <text x="32" y="38" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#39ff14">0g</text>
      </svg>
    ),
    name: 'Zero Sugar',
    amount: '0g',
    unit: 'sugar',
    desc: 'Sweetened with sucralose — no insulin spike, no sugar crash. Pure performance taste.',
  },
  {
    id: 'vitamins',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,8 52,56 12,56" stroke="#39ff14" strokeWidth="2" fill="none"/>
        <circle cx="32" cy="38" r="6" fill="#39ff14" opacity="0.4"/>
        <circle cx="32" cy="38" r="3" fill="#39ff14"/>
      </svg>
    ),
    name: 'B-Vitamins',
    amount: 'B3 B6 B12',
    unit: 'complex',
    desc: 'Essential B-vitamin complex that supports energy metabolism at the cellular level.',
  },
  {
    id: 'taurine',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 52 C12 20, 52 20, 52 52" stroke="#39ff14" strokeWidth="2" fill="none"/>
        <path d="M32 20 L32 52" stroke="#39ff14" strokeWidth="3" strokeLinecap="round"/>
        <path d="M18 14 L46 14" stroke="#39ff14" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Taurine',
    amount: '2000mg',
    unit: 'amino acid',
    desc: 'A key amino acid that supports cardiovascular health and enhances athletic endurance.',
  },
  {
    id: 'energy-blend',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 12 L24 32 H34 L28 52 L44 28 H34 Z" fill="#39ff14" opacity="0.8"/>
        <circle cx="32" cy="32" r="26" stroke="#39ff14" strokeWidth="1.5" opacity="0.4"/>
      </svg>
    ),
    name: 'Energy Blend',
    amount: 'Proprietary',
    unit: 'formula',
    desc: 'A unique combination of ginseng, L-carnitine, and glucuronolactone for peak output.',
  },
  {
    id: 'electrolytes',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 10 C16 10, 10 28, 10 36 C10 48, 20 54, 32 54 C44 54, 54 48, 54 36 C54 28, 48 10, 32 10 Z" stroke="#39ff14" strokeWidth="2" fill="none"/>
        <path d="M24 36 C24 30, 28 26, 32 24 C36 26, 40 30, 40 36" stroke="#39ff14" strokeWidth="2" fill="none"/>
      </svg>
    ),
    name: 'Electrolytes',
    amount: 'Sodium+',
    unit: 'hydration',
    desc: 'Essential electrolytes for hydration and optimal muscle function during intense activity.',
  },
]

export default function Ingredients() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true }
        }
      )

      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="ingredients" id="ingredients" ref={sectionRef}>
      <div className="ingredients-bg-pattern" />

      <div className="ingredients-inner">
        <div className="ingredients-header">
          <span className="section-label">Performance Formula</span>
          <h2 className="ingredients-title" ref={titleRef} id="ingredients-title">
            WHAT'S INSIDE<br />
            <span className="gradient-text">EVERY DROP</span>
          </h2>
          <p className="ingredients-subtitle">
            Precision-engineered. Scientifically formulated. Uncompromisingly effective.
          </p>
        </div>

        <div className="ingredients-grid">
          {INGREDIENTS.map((item, i) => (
            <div
              key={item.id}
              className="ingredient-card"
              id={`ingredient-${item.id}`}
              ref={el => cardsRef.current[i] = el}
            >
              <div className="ingredient-icon-wrap">
                {item.icon}
                <div className="ingredient-icon-glow" />
              </div>
              <div className="ingredient-amount">
                <span className="amount-val">{item.amount}</span>
                <span className="amount-unit">{item.unit}</span>
              </div>
              <h3 className="ingredient-name">{item.name}</h3>
              <p className="ingredient-desc">{item.desc}</p>
              <div className="ingredient-border-glow" />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="ingredients-note">
          <div className="note-line" />
          <p>All formulas comply with FDA guidelines. Monster Energy products are not intended for children, pregnant women, or those sensitive to caffeine.</p>
          <div className="note-line" />
        </div>
      </div>
    </section>
  )
}
