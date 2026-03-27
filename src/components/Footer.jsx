import { motion } from 'framer-motion'

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/fauwzziyyah-umar',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:phauzee97@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
  },
]

export default function Footer({ onAdminOpen }) {
  return (
    <footer className="relative bg-navy overflow-hidden">
      {/* Animated wave top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky/30 to-transparent" />

      <div className="max-w-[1140px] mx-auto px-7 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <motion.span
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 bg-white/10 rounded-[12px] flex items-center justify-center text-xl cursor-default"
            >
              💻
            </motion.span>
            <div>
              <div className="text-white font-bold text-[17px] leading-tight">Fauwzziyyah Umar</div>
              <div className="text-white/40 text-[11px] uppercase tracking-[1.5px] font-medium">Virtual Professional</div>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-[10px] bg-white/[0.08] hover:bg-white/[0.15]
                           flex items-center justify-center text-white/60 hover:text-white
                           transition-colors duration-200"
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-[1px] bg-white/[0.08]" />

        {/* Bottom row — 3 columns: copyright | admin icon | location */}
        <div className="grid grid-cols-3 items-center gap-4">
          <p className="text-white/35 text-[13px]">
            © {new Date().getFullYear()} Fauwzziyyah Umar · Automate. Optimize.{' '}
            <em className="text-white/60 font-serif italic">Grow.</em>
          </p>

          {/* Center admin icon */}
          <div className="flex justify-center">
            <motion.button
              onClick={onAdminOpen}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.10]
                         flex items-center justify-center text-white/[0.12] hover:text-white/40
                         transition-colors duration-500 cursor-pointer"
              aria-label="Admin Portal"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </motion.button>
          </div>

          <p className="text-white/25 text-[11px] text-right">
            Maryland, USA · Remote-first
          </p>
        </div>
      </div>
    </footer>
  )
}
