import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashScreen   from './components/SplashScreen'
import CursorGlow     from './components/CursorGlow'
import Nav            from './components/Nav'
import Hero           from './components/Hero'
import SectionDivider from './components/SectionDivider'
import Services       from './components/Services'
import Credentials    from './components/Credentials'
import Tools          from './components/Tools'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import ScrollTop      from './components/ScrollTop'
import Admin          from './components/Admin'

export default function App() {
  const [loaded, setLoaded]       = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <>
      {/* Splash */}
      <AnimatePresence mode="wait">
        {!loaded && <SplashScreen key="splash" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main site */}
      {loaded && (
        <>
          <CursorGlow />
          <Nav />
          <main>
            <Hero />
            <SectionDivider inverted />
            <Services />
            <Credentials />
            <SectionDivider />
            <Tools />
            <SectionDivider inverted />
            <Contact />
          </main>
          <Footer onAdminOpen={() => setShowAdmin(true)} />
          <ScrollTop />
        </>
      )}

      {/* Admin portal — full-screen overlay */}
      <AnimatePresence>
        {showAdmin && (
          <motion.div
            key="admin-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9998]"
          >
            <Admin onExit={() => setShowAdmin(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
