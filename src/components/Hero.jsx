import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate, useMotionValue, useSpring } from 'framer-motion'
import useMousePosition from '../hooks/useMousePosition'

const chips = [
  {
    icon: '📊', title: 'Dashboard Ready', sub: 'Analytics Report',
    className: 'top-[8%] -left-[15%]',
    initial: { opacity: 0, x: -30, scale: 0.8 },
    delay: 0.8,
  },
  {
    icon: '✅', title: 'Task Complete', sub: 'Email Campaign',
    className: 'bottom-[28%] -right-[15%]',
    initial: { opacity: 0, x: 30, scale: 0.8 },
    delay: 1.2,
  },
  {
    icon: '🤖', title: 'AI Workflow', sub: 'Automated',
    className: 'bottom-[5%] -left-[10%]',
    initial: { opacity: 0, y: 30, scale: 0.8 },
    delay: 1.6,
  },
]

const stats = [
  { count: 5,   suffix: '+', label: 'Years Experience' },
  { count: 50,  suffix: '+', label: 'Projects Delivered' },
  { count: 30,  suffix: '+', label: 'Tools & Tech Stack' },
  { count: 200, suffix: '+', label: 'Students & Clients' },
]

const typingMsgs = [
  'Working on your project…',
  'Analysing your data…',
  'Scheduling your content…',
  'Automating your workflow…',
  'Building your dashboard…',
]

function CountUp({ target, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate(v) {
        if (ref.current) ref.current.textContent = Math.round(v)
      },
    })
    return () => controls.stop()
  }, [inView, target])

  return (
    <span className="inline-flex items-end gap-0.5">
      <span ref={ref} className="font-extrabold text-4xl md:text-[42px] text-navy font-sans tabular-nums">0</span>
      <span className="font-bold text-2xl text-navy-light mb-1">{suffix}</span>
    </span>
  )
}

function MagneticButton({ children, className, href }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 250, damping: 20 })
  const springY = useSpring(y, { stiffness: 250, damping: 20 })

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.15)
    y.set((e.clientY - cy) * 0.15)
  }

  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const [typingMsg, setTypingMsg] = useState(0)
  const mouse = useMousePosition()

  // Parallax values from mouse position
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const parallaxX = useSpring(mx, { stiffness: 40, damping: 30 })
  const parallaxY = useSpring(my, { stiffness: 40, damping: 30 })

  useEffect(() => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    mx.set((mouse.x - cx) * 0.02)
    my.set((mouse.y - cy) * 0.02)
  }, [mouse.x, mouse.y, mx, my])

  useEffect(() => {
    const id = setInterval(() => {
      setTypingMsg(i => (i + 1) % typingMsgs.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22,1,0.36,1] } },
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[68px]" id="about">
      {/* Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-50 animate-blob-1 top-[-100px] right-[-60px]"
          style={{ background: 'radial-gradient(circle, #A8D4F0 0%, transparent 70%)', filter: 'blur(72px)' }}
        />
        <div className="absolute w-[380px] h-[380px] rounded-full opacity-45 animate-blob-2 bottom-[60px] left-[-60px]"
             style={{ background: 'radial-gradient(circle, #C5B8E8 0%, transparent 70%)', filter: 'blur(72px)' }} />
        <div className="absolute w-[280px] h-[280px] rounded-full opacity-35 animate-blob-3 top-1/2 left-[45%]"
             style={{ background: 'radial-gradient(circle, #B8E4D8 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute inset-0"
             style={{
               backgroundImage: 'linear-gradient(rgba(30,58,95,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.035) 1px, transparent 1px)',
               backgroundSize: '48px 48px',
               maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
             }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1140px] mx-auto w-full px-7 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1 text-center lg:text-left"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 bg-[rgba(122,173,204,0.15)] border border-[rgba(122,173,204,0.4)] text-navy-mid text-[12.5px] font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-[7px] h-[7px] bg-green-500 rounded-full animate-dot-pulse shadow-[0_0_0_3px_rgba(34,197,94,0.25)]" />
              Available for new clients
            </span>
          </motion.div>

          <motion.h1 variants={item} className="font-serif font-bold leading-[1.1] tracking-[-1px] mb-5 text-navy text-[clamp(36px,5vw,58px)]">
            Your Strategic<br />
            <em className="text-gradient-blue">Virtual Partner</em><br />
            <span className="block text-[0.52em] font-sans font-bold uppercase tracking-[2px] text-gradient-purple mt-2 not-italic">
              Powered by AI & Data
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-[15.5px] text-ink-soft leading-[1.78] mb-7 max-w-[460px] mx-auto lg:mx-0">
            MSc Data Analytics graduate (WGU) with <strong className="font-semibold text-ink-mid">hands-on ML engineering experience</strong>, Google & ALX certified, and a track record of <strong className="font-semibold text-navy-light">35%+ engagement gains</strong> through AI-powered workflows.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-2.5 mb-8">
            {[
              { icon: '🎓', text: 'MSc Data Analytics · WGU' },
              { icon: '🏆', text: 'Google · ALX · WiDA Certified' },
              { icon: '🤖', text: 'ML & AI Engineering' },
            ].map(c => (
              <motion.span
                key={c.text}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-1.5 bg-white/80 border border-[#E4E8EF] backdrop-blur-sm
                           px-3.5 py-1.5 rounded-full text-[12.5px] font-medium text-ink-mid cursor-default
                           hover:shadow-card hover:border-sky/50 transition-all duration-200"
              >
                <span>{c.icon}</span> {c.text}
              </motion.span>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-3">
            <MagneticButton
              href="#contact"
              className="btn-primary shadow-glow-blue hover:shadow-glow-blue-lg group"
            >
              Start a Project
              <motion.svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="group-hover:translate-x-1 transition-transform duration-200"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </MagneticButton>
            <MagneticButton href="#services" className="btn-ghost">
              View Services
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Visual — parallax card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22,1,0.36,1] }}
          className="order-1 lg:order-2 flex justify-center"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="relative max-w-[380px] w-full">
            {/* Glow ring */}
            <div className="absolute -inset-[2px] rounded-[28px] animate-card-glow"
                 style={{
                   background: 'linear-gradient(135deg, rgba(122,173,204,0.35), rgba(90,61,138,0.18), rgba(122,173,204,0.3))',
                   filter: 'blur(8px)',
                   zIndex: -1,
                 }} />

            <div className="bg-white/90 backdrop-blur-xl border border-white rounded-[26px] p-7 shadow-card-xl
                            hover:shadow-[0_32px_64px_rgba(30,58,95,0.22)] transition-shadow duration-500">
              {/* SVG illustration */}
              <div className="relative flex justify-center">
                <motion.img
                  src="/virtual_assistant.svg"
                  alt="Virtual Assistant"
                  className="w-full max-w-[240px] h-auto animate-float"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(30,58,95,0.12))' }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />

                {/* Floating chips */}
                {chips.map(chip => (
                  <motion.div
                    key={chip.title}
                    className={`absolute hidden md:flex items-center gap-2 bg-white border border-[#E4E8EF] rounded-[10px] px-3 py-2 shadow-card whitespace-nowrap z-10 ${chip.className}`}
                    initial={chip.initial}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: chip.delay, ease: [0.22,1,0.36,1] }}
                    whileHover={{ scale: 1.08, boxShadow: '0 8px 28px rgba(30,58,95,0.15)' }}
                  >
                    <span className="text-base leading-none">{chip.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-ink-mid leading-tight">{chip.title}</span>
                      <span className="text-[10px] text-muted leading-tight">{chip.sub}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Typing bar */}
              <div className="mt-5 pt-4 border-t border-[#E4E8EF] flex items-center gap-2.5">
                <div className="flex gap-1">
                  {[0,200,400].map(d => (
                    <span key={d} className="block w-1.5 h-1.5 rounded-full bg-sky animate-typing" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
                <motion.span
                  key={typingMsg}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11.5px] text-muted font-medium"
                >
                  {typingMsgs[typingMsg]}
                </motion.span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 max-w-[1140px] mx-auto w-full px-7 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
              whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(30,58,95,0.12)' }}
              className="bg-white/70 backdrop-blur-sm border border-[#E4E8EF] rounded-2xl p-5 text-center
                         transition-all duration-300 shadow-[0_1px_4px_rgba(30,58,95,0.06)] cursor-default group"
            >
              <CountUp target={s.count} suffix={s.suffix} />
              <div className="text-[10.5px] uppercase tracking-[1.2px] text-muted font-semibold mt-1.5 group-hover:text-navy-light transition-colors duration-300">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
