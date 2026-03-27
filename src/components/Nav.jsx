import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',       href: '#about' },
  { label: 'Services',    href: '#services' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Tools',       href: '#tools' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const closeDrawer = () => setOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[900] h-[68px] transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-xl shadow-[0_1px_4px_rgba(30,58,95,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1140px] mx-auto px-7 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#about" className="flex items-center gap-2.5 group">
            <span className="w-9 h-9 bg-gradient-sky rounded-[10px] flex items-center justify-center text-lg shadow-glow-blue flex-shrink-0">
              💻
            </span>
            <span className="font-semibold text-navy text-[17px] tracking-tight">
              Fauwzziyyah <em className="font-serif italic text-navy-light not-italic">Umar</em>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-[13.5px] font-medium text-ink-soft hover:text-navy transition-colors duration-200 relative
                             after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:w-0 after:bg-navy-light after:rounded-full
                             after:transition-all after:duration-200 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="bg-gradient-navy text-white text-[13px] font-semibold px-5 py-2.5 rounded-[10px]
                           shadow-[0_2px_10px_rgba(30,58,95,0.25)] transition-all duration-200
                           hover:-translate-y-0.5 hover:shadow-glow-blue-lg"
              >
                Let's Work
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-5.5 h-0.5 bg-ink-mid rounded-full" />
            <span className="block w-5.5 h-0.5 bg-ink-mid rounded-full" />
            <span className="block w-5.5 h-0.5 bg-ink-mid rounded-full" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-[998] bg-black/50"
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
                {[...links, { label: 'Contact', href: '#contact' }].map((l, i) => (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    <a
                      href={l.href}
                      onClick={closeDrawer}
                      className="block py-4 text-xl font-semibold text-navy border-b border-gray-100 hover:text-navy-light transition-colors"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
