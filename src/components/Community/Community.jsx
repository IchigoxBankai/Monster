import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Community.css'

gsap.registerPlugin(ScrollTrigger)

const POSTS = [
  {
    id: 'post-1',
    category: 'Athletes',
    title: 'Track Record',
    quote: 'Zero Ultra keeps me sharp for every lap.',
    author: '@carlos_runs',
    emoji: '🏃',
    size: 'tall',
    gradient: 'linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 50%, #0a0a0a 100%)',
    accent: '#39ff14',
  },
  {
    id: 'post-2',
    category: 'Gaming',
    title: 'No Sleep Mode',
    quote: 'When the tournament goes overtime, Ultra goes with me.',
    author: '@xKairo_GG',
    emoji: '🎮',
    size: 'normal',
    gradient: 'linear-gradient(160deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a0a 100%)',
    accent: '#6c63ff',
  },
  {
    id: 'post-3',
    category: 'Adventure',
    title: 'Summit Ready',
    quote: '14,000 ft. One can. Zero excuses.',
    author: '@peak_pursuer',
    emoji: '🏔',
    size: 'normal',
    gradient: 'linear-gradient(160deg, #0a0f1a 0%, #1a2a3a 50%, #0a0a0a 100%)',
    accent: '#00bcd4',
  },
  {
    id: 'post-4',
    category: 'Lifestyle',
    title: 'Studio Sessions',
    quote: 'Creative flow meets zero sugar energy.',
    author: '@beatmaker_z',
    emoji: '🎵',
    size: 'tall',
    gradient: 'linear-gradient(160deg, #1a0a1a 0%, #3a1a3a 50%, #0a0a0a 100%)',
    accent: '#e040fb',
  },
  {
    id: 'post-5',
    category: 'Sports',
    title: 'Iron Will',
    quote: 'Every rep. Every set. Every Ultra.',
    author: '@lift_to_limit',
    emoji: '💪',
    size: 'normal',
    gradient: 'linear-gradient(160deg, #1a0a0a 0%, #3a1a0a 50%, #0a0a0a 100%)',
    accent: '#ff8c00',
  },
  {
    id: 'post-6',
    category: 'Culture',
    title: 'The Grind',
    quote: 'Built different. Fueled different.',
    author: '@monster_life',
    emoji: '🔋',
    size: 'normal',
    gradient: 'linear-gradient(160deg, #0a1a1a 0%, #0a3a2a 50%, #0a0a0a 100%)',
    accent: '#39ff14',
  },
]

export default function Community() {
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

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.96 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              once: true,
            },
            delay: (i % 3) * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="community" id="community" ref={sectionRef}>
      <div className="community-inner">
        <div className="community-header">
          <span className="section-label">Community</span>
          <h2 className="community-title" ref={titleRef} id="community-title">
            THE ULTRA<br />
            <span className="gradient-text">COMMUNITY</span>
          </h2>
          <p className="community-subtitle">
            Athletes. Gamers. Creators. Adventurers.<br />
            United by one uncompromising energy.
          </p>
        </div>

        <div className="community-grid">
          {POSTS.map((post, i) => (
            <div
              key={post.id}
              className={`community-card card-${post.size}`}
              id={post.id}
              ref={el => cardsRef.current[i] = el}
              style={{ background: post.gradient }}
            >
              <div className="card-top">
                <span className="card-category" style={{ color: post.accent, borderColor: `${post.accent}40` }}>
                  {post.category}
                </span>
                <span className="card-emoji">{post.emoji}</span>
              </div>

              <div className="card-body">
                <h3 className="card-title" style={{ color: post.accent }}>{post.title}</h3>
                <blockquote className="card-quote">"{post.quote}"</blockquote>
                <span className="card-author">{post.author}</span>
              </div>

              <div className="card-glow" style={{ background: `radial-gradient(circle at 80% 80%, ${post.accent}20 0%, transparent 60%)` }} />
              <div className="card-hover-border" style={{ borderColor: `${post.accent}60` }} />
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="community-cta-row">
          <p className="community-cta-text">Join the Ultra movement on Instagram</p>
          <a href="#cta" className="btn-primary" id="community-ig-btn">
            @MonsterEnergy
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
