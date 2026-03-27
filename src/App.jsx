import Nav         from './components/Nav'
import Hero        from './components/Hero'
import Services    from './components/Services'
import Credentials from './components/Credentials'
import Tools       from './components/Tools'
import Contact     from './components/Contact'
import Footer      from './components/Footer'
import ScrollTop   from './components/ScrollTop'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Credentials />
        <Tools />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
