import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FinalCTA.css'

gsap.registerPlugin(ScrollTrigger)

function buildMinimalCan(scene) {
  const group = new THREE.Group()

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 256
  const ctx = canvas.getContext('2d')

  // White base
  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(0, 0, 512, 256)

  // Green accents
  ctx.fillStyle = '#39ff14'
  ctx.fillRect(0, 0, 512, 20)
  ctx.fillRect(0, 236, 512, 20)

  // Monster text
  ctx.font = 'bold 52px Bebas Neue, Arial'
  ctx.fillStyle = '#0a0a0a'
  ctx.textAlign = 'center'
  ctx.fillText('MONSTER', 256, 160)

  ctx.font = 'bold 20px Space Grotesk, Arial'
  ctx.fillStyle = '#39ff14'
  ctx.shadowColor = '#39ff14'
  ctx.shadowBlur = 8
  ctx.fillText('ZERO ULTRA', 256, 60)
  ctx.shadowBlur = 0

  const texture = new THREE.CanvasTexture(canvas)
  const bodyGeo = new THREE.CylinderGeometry(1, 1, 3, 64, 1, true)
  const bodyMat = new THREE.MeshStandardMaterial({ map: texture, metalness: 0.9, roughness: 0.12 })
  group.add(new THREE.Mesh(bodyGeo, bodyMat))

  const lidMat = new THREE.MeshStandardMaterial({ color: 0xd0d4d8, metalness: 0.95, roughness: 0.08 })
  const topGeo = new THREE.CylinderGeometry(1, 1, 0.1, 64)
  const top = new THREE.Mesh(topGeo, lidMat)
  top.position.y = 1.55
  group.add(top)

  const taperTop = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 1, 0.28, 64), lidMat)
  taperTop.position.y = 1.79
  group.add(taperTop)

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.68, 0.18, 64), lidMat)
  neck.position.y = 2.0
  group.add(neck)

  const tabBase = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.07, 64), lidMat)
  tabBase.position.y = 2.13
  group.add(tabBase)

  const bot = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.1, 64), lidMat)
  bot.position.y = -1.6
  group.add(bot)

  group.scale.set(1.6, 1.6, 1.6)
  scene.add(group)
  return group
}

export default function FinalCTA() {
  const canvasRef = useRef(null)
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 10)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3)
    keyLight.position.set(4, 6, 5)
    scene.add(keyLight)

    const greenLight = new THREE.PointLight(0x39ff14, 4, 20)
    greenLight.position.set(-3, -2, 4)
    scene.add(greenLight)

    const can = buildMinimalCan(scene)
    can.position.y = -6
    can.scale.set(0.01, 0.01, 0.01)

    // Entrance animation on scroll
    const ctx2 = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        }
      })
      tl.to(can.position, { y: 0, duration: 1.4, ease: 'elastic.out(1, 0.6)' }, 0)
        .to(can.scale, { x: 1.6, y: 1.6, z: 1.6, duration: 1.4, ease: 'elastic.out(1, 0.6)' }, 0)
        .fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.3)
        .fromTo(textRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.6)
        .fromTo(btnRef.current, { y: 20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, 0.8)
    }, sectionRef)

    // Floating + rotation
    gsap.to(can.position, { y: 0.3, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 })
    gsap.to(can.rotation, { y: Math.PI * 2, duration: 12, ease: 'none', repeat: -1 })

    // Animate green light intensity
    gsap.to(greenLight, { intensity: 8, duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })

    let raf
    function animate() {
      raf = requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      ctx2.revert()
      renderer.dispose()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section className="final-cta" id="cta" ref={sectionRef}>
      {/* Background */}
      <div className="cta-bg">
        <div className="cta-bg-gradient" />
        <div className="cta-bg-radial" />
        <div className="cta-bg-rings">
          {[1,2,3,4].map(i => <div key={i} className="cta-ring" style={{ '--ri': i }} />)}
        </div>
      </div>

      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="cta-canvas" id="cta-canvas" />

      {/* Content */}
      <div className="cta-content">
        <span className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Limited Drop</span>

        <h2 className="cta-title" ref={titleRef} id="cta-title">
          READY TO<br />
          UNLEASH YOUR<br />
          <span className="cta-ultra">ENERGY?</span>
        </h2>

        <p className="cta-text" ref={textRef} id="cta-text">
          Zero sugar. Maximum energy. A new level of refreshment.<br />
          Find Monster Zero Ultra near you today.
        </p>

        <div className="cta-buttons" ref={btnRef} id="cta-buttons">
          <a href="#" className="btn-cta-main" id="cta-get-btn">
            GET MONSTER
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#" className="btn-cta-outline" id="cta-find-btn">
            Find A Store
          </a>
        </div>
      </div>
    </section>
  )
}
