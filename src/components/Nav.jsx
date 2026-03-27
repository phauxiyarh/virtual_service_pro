import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import useActiveSection from '../hooks/useActiveSection'

const links = [
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Tools',       href: '#tools' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const active                  = useActiveSection()

  // Scroll progress bar
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
        className={`fixed top-0 inset-x-0 z-[900] transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-xl shadow-[0_1px_4px_rgba(30,58,95,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1140px] mx-auto px-7 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-2.5 group">
            <motion.span
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 bg-gradient-sky rounded-[10px] flex items-center justify-center text-lg shadow-glow-blue flex-shrink-0"
            >
              💻
            </motion.span>
            <span className="font-semibold text-navy text-[17px] tracking-tight">
              Fauwzziyyah <em className="font-serif italic text-navy-light not-italic">Umar</em>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map(l => {
              const id = l.href.replace('#', '')
              const isActive = active === id
              return (
                <li key={l.label} className="relative">
                  <a
                    href={l.href}
                    className={`text-[13.5px] font-medium transition-colors duration-200 relative
                               ${isActive ? 'text-navy' : 'text-ink-soft hover:text-navy'}`}
                  >
                    {l.label}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-[3px] left-0 right-0 h-[2px] bg-navy-light rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              )
            })}
            <li>
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-block bg-gradient-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-[10px]
                           shadow-[0_2px_10px_rgba(30,58,95,0.25)] transition-shadow duration-200
                           hover:shadow-glow-blue-lg ${active === 'contact' ? 'ring-2 ring-sky/40 ring-offset-2 ring-offset-cream' : ''}`}
              >
                Let's Work
              </motion.a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/60 transition-colors"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <motion.span animate={{ width: open ? 18 : 22 }} className="block h-0.5 bg-ink-mid rounded-full" />
            <span className="block w-[22px] h-0.5 bg-ink-mid rounded-full" />
            <motion.span animate={{ width: open ? 18 : 14 }} className="block h-0.5 bg-ink-mid rounded-full" />
          </button>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-sky via-navy-light to-purple origin-left"
          style={{ scaleX }}
        />
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
            />
            <motion.aside
              key="drawer"
              className="fixed top-0 right-0 z-[999] h-full w-[min(320px,85vw)] bg-white shadow-card-xl flex flex-col pt-20 px-8 pb-10"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              <button
                className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:bg-gray-100 transition-colors text-xl"
                onClick={closeDrawer}
                aria-label="Close menu"
              >
                ✕
              </button>

              <ul className="list-none flex flex-col">
                {[...links, { label: 'Contact', href: '#contact' }].map((l, i) => {
                  const id = l.href.replace('#', '')
                  return (
                    <motion.li
                      key={l.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                    >
                      <a
                        href={l.href}
                        onClick={closeDrawer}
                        className={`block py-4 text-xl font-semibold border-b border-gray-100 transition-colors
                                   ${active === id ? 'text-navy-light' : 'text-navy hover:text-navy-light'}`}
                      >
                        <span className="flex items-center gap-3">
                          {active === id && (
                            <motion.span
                              layoutId="mobile-dot"
                              className="w-2 h-2 bg-sky rounded-full"
                            />
                          )}
                          {l.label}
                        </span>
                      </a>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Drawer CTA */}
              <motion.a
                href="#contact"
                onClick={closeDrawer}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-auto block text-center bg-gradient-navy text-white font-semibold py-3.5 rounded-xl shadow-glow-blue"
              >
                Start a Project
              </motion.a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
