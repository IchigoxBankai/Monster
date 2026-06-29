import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Particle canvas overlay (no 3D can anymore) ── */
function initParticles(canvas) {
  const ctx = canvas.getContext('2d')
  let w = canvas.offsetWidth
  let h = canvas.offsetHeight
  canvas.width = w
  canvas.height = h

  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 2.5 + 0.5,
    speedX: (Math.random() - 0.5) * 0.4,
    speedY: -(Math.random() * 0.6 + 0.2),
    opacity: Math.random() * 0.7 + 0.1,
    decay: Math.random() * 0.004 + 0.002,
  }))

  let running = true
  let opacity = 0 // controlled by GSAP

  function draw() {
    if (!running) return
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => {
      p.x += p.speedX
      p.y += p.speedY
      p.opacity -= p.decay
      if (p.opacity <= 0 || p.y < 0) {
        p.x = Math.random() * w
        p.y = h + 10
        p.opacity = Math.random() * 0.7 + 0.2
        p.speedX = (Math.random() - 0.5) * 0.4
        p.speedY = -(Math.random() * 0.6 + 0.2)
      }
      ctx.save()
      ctx.globalAlpha = p.opacity * opacity
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = '#39ff14'
      ctx.shadowColor = '#39ff14'
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.restore()
    })
    requestAnimationFrame(draw)
  }
  draw()

  const onResize = () => {
    w = canvas.offsetWidth
    h = canvas.offsetHeight
    canvas.width = w
    canvas.height = h
  }
  window.addEventListener('resize', onResize)

  return {
    setOpacity: (v) => { opacity = v },
    destroy: () => {
      running = false
      window.removeEventListener('resize', onResize)
    },
  }
}

export default function Hero() {
  const sectionRef = useRef(null)
  const canRef     = useRef(null)       // the <img>
  const glowRef    = useRef(null)       // neon glow layer behind can
  const particleCanvasRef = useRef(null)
  const titleRef   = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef     = useRef(null)
  const scrollRef  = useRef(null)
  const particleCtrl = useRef(null)

  useEffect(() => {
    /* ── Particles ── */
    particleCtrl.current = initParticles(particleCanvasRef.current)

    /* ── Text entrance ── */
    gsap.fromTo(titleRef.current,
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.3, ease: 'power3.out', delay: 0.2 }
    )
    gsap.fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.65 }
    )
    gsap.fromTo(ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.05 }
    )
    gsap.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 1.8 }
    )

    /* ── Can entrance ── */
    gsap.fromTo(canRef.current,
      { y: 80, opacity: 0, scale: 0.85 },
      { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out', delay: 0.15 }
    )
    gsap.fromTo(glowRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out', delay: 0.3 }
    )

    /* ── Continuous float ── */
    gsap.to(canRef.current, {
      y: -22,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    gsap.to(glowRef.current, {
      y: -10,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    /* ── Glow pulse ── */
    gsap.to(glowRef.current, {
      opacity: 0.55,
      duration: 1.9,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    /* ── Scroll-triggered scroll timeline ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.4,
        pin: true,
        anticipatePin: 1,
      }
    })

    // Scroll: scale + gentle tilt — NO filter override (mix-blend-mode active)
    tl.to(canRef.current, {
      scale: 1.12,
      rotate: 3,
      duration: 1,
    }, 0)
    .to(glowRef.current, { opacity: 0.95, scale: 1.5, duration: 1 }, 0)
    .to({}, {
      onUpdate: function() {
        particleCtrl.current?.setOpacity(this.progress() * 0.9)
      },
      duration: 1,
    }, 0)
    .to(titleRef.current, { y: -30, opacity: 0.6, duration: 0.6 }, 0.3)

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      particleCtrl.current?.destroy()
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Particle canvas overlay */}
      <canvas ref={particleCanvasRef} className="hero-particle-canvas" id="hero-particle-canvas" />

      {/* Background decorations */}
      <div className="hero-bg-grid" />
      <div className="hero-bg-radial" />

      {/* ── Can image (right side, centered vertically) ── */}
      <div className="hero-can-stage">
        {/* Glow layers */}
        <div className="hero-glow-outer" ref={glowRef} id="hero-glow">
          <div className="hero-glow-inner" />
        </div>

        {/* Rotating ring */}
        <div className="hero-orbit-ring" />

        {/* The actual Monster can image */}
        <img
          ref={canRef}
          src="/hero_can_v3.png"
          alt="Monster Energy Zero Ultra Can"
          className="hero-can-img"
          id="hero-can-img"
          draggable={false}
        />
      </div>

      {/* ── Text content (left side) ── */}
      <div className="hero-content">
        <div className="hero-top-badge">
          <span className="section-label">Zero Sugar · Maximum Energy</span>
        </div>

        <h1 className="hero-title" ref={titleRef} id="hero-title">
          UNLEASH<br />
          <span className="gradient-text">THE ULTRA</span>
        </h1>

        <p className="hero-subtitle" ref={subtitleRef} id="hero-subtitle">
          Zero sugar. Maximum energy.<br />A new level of refreshment.
        </p>

        <div className="hero-cta-group" ref={ctaRef} id="hero-cta">
          <a href="#product" className="btn-primary" id="hero-explore-btn">
            Explore The Energy
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#flavors" className="btn-outline" id="hero-flavors-btn">
            View Flavors
          </a>
        </div>

        <div className="hero-stats">
          {[['0g', 'Sugar'], ['160mg', 'Caffeine'], ['6', 'Flavors']].map(([val, label]) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-val">{val}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" ref={scrollRef} id="hero-scroll-indicator">
        <div className="scroll-mouse" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
