import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
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

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return [hash, (h) => { window.location.hash = h; setHash(h) }]
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [hash, setHash] = useHashRoute()

  const isAdmin = hash === '#admin'

  if (isAdmin) {
    return <Admin onExit={() => setHash('#about')} />
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded && <SplashScreen key="splash" onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

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
          <Footer />
          <ScrollTop />
        </>
      )}
    </>
  )
}
