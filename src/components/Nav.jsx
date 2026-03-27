import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import useActiveSection from '../hooks/useActiveSection'

const links = [
  { label: 'About',       href: '#about',       icon: '👤' },
  { label: 'Services',    href: '#services',     icon: '🛠️' },
  { label: 'Credentials', href: '#credentials',  icon: '🏆' },
  { label: 'Tools',       href: '#tools',        icon: '⚡' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const active                  = useActiveSection()

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const closeDrawer = () => setOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[900] transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl shadow-[0_1px_20px_rgba(30,58,95,0.08)] border-b border-white/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1140px] mx-auto px-7 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <a href="#about" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 bg-gradient-to-br from-sky to-navy-light rounded-[12px]
                         flex items-center justify-center text-lg shadow-glow-blue flex-shrink-0 overflow-hidden"
            >
              💻
              {/* Shine sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-navy text-[16px] tracking-tight leading-tight group-hover:text-navy-light transition-colors duration-200">
                Fauwzziyyah <span className="font-serif italic text-navy-light">Umar</span>
              </span>
              <span className="text-[9.5px] uppercase tracking-[2px] text-muted font-semibold leading-tight hidden sm:block">
                Virtual Professional
              </span>
            </div>
          </a>

          {/* Desktop pill nav */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-500 ${
              scrolled ? 'bg-cream/80 border border-[#E4E8EF]/80 shadow-[0_2px_12px_rgba(30,58,95,0.05)]' : 'bg-white/40 backdrop-blur-sm border border-white/50'
            }`}>
              {links.map(l => {
                const id = l.href.replace('#', '')
                const isActive = active === id
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    className="relative px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(30,58,95,0.10)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-navy font-semibold' : 'text-ink-soft hover:text-navy'}`}>
                      {l.label}
                    </span>
                  </a>
                )
              })}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative ml-2 inline-flex items-center gap-2 bg-gradient-to-r from-navy-mid to-navy text-white
                         text-[13px] font-semibold px-5 py-2.5 rounded-full overflow-hidden
                         shadow-[0_4px_16px_rgba(30,58,95,0.3)] transition-shadow duration-300
                         hover:shadow-[0_6px_24px_rgba(30,58,95,0.4)]
                         ${active === 'contact' ? 'ring-2 ring-sky/50 ring-offset-2 ring-offset-cream' : ''}`}
            >
              {/* Button shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Let's Work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.a>
          </div>

          {/* Hamburger — animated morphing icon */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl
                       hover:bg-navy/5 active:bg-navy/10 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-full h-[2px] bg-navy rounded-full origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.15 }}
                className="block w-full h-[2px] bg-navy rounded-full"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block w-full h-[2px] bg-navy rounded-full origin-center"
              />
            </div>
          </motion.button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-sky via-navy-light to-purple origin-left"
          style={{ scaleX, opacity: scrolled ? 1 : 0 }}
        />
      </nav>

      {/* Mobile Drawer — full-screen overlay style */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[998] bg-navy/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeDrawer}
            />
            <motion.aside
              key="drawer"
              className="fixed top-0 right-0 z-[999] h-full w-[min(340px,88vw)]
                         bg-gradient-to-b from-white to-cream
                         shadow-[-8px_0_40px_rgba(30,58,95,0.18)]
                         flex flex-col overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-[#E4E8EF]">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 bg-gradient-to-br from-sky to-navy-light rounded-[10px] flex items-center justify-center text-sm">
                    💻
                  </span>
                  <span className="font-bold text-navy text-[15px]">Menu</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-cream hover:bg-[#E4E8EF] transition-colors"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Nav links */}
              <ul className="list-none flex flex-col px-5 pt-4 gap-1">
                {[...links, { label: 'Contact', href: '#contact', icon: '💬' }].map((l, i) => {
                  const id = l.href.replace('#', '')
                  const isActive = active === id
                  return (
                    <motion.li
                      key={l.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={l.href}
                        onClick={closeDrawer}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200
                                   ${isActive
                                     ? 'bg-navy/[0.06] text-navy font-semibold'
                                     : 'text-ink-soft hover:bg-navy/[0.03] hover:text-navy'}`}
                      >
                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-colors
                                         ${isActive ? 'bg-sky/15' : 'bg-cream'}`}>
                          {l.icon}
                        </span>
                        <span className="text-[16px]">{l.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active"
                            className="ml-auto w-1.5 h-1.5 bg-sky rounded-full"
                          />
                        )}
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Drawer footer */}
              <div className="mt-auto px-5 pb-8 pt-4">
                <motion.a
                  href="#contact"
                  onClick={closeDrawer}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-navy-mid to-navy
                             text-white font-semibold py-4 rounded-2xl shadow-glow-blue
                             hover:shadow-glow-blue-lg transition-shadow"
                >
                  Start a Project
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>

                <p className="text-center text-[11px] text-muted mt-4">
                  phauzee97@gmail.com
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
