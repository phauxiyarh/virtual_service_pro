import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SectionDivider({ inverted = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div ref={ref} className={`relative overflow-hidden ${inverted ? 'bg-white' : 'bg-cream'}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1px] max-w-[600px] mx-auto origin-center"
        style={{
          background: inverted
            ? 'linear-gradient(90deg, transparent, rgba(30,58,95,0.12), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(122,173,204,0.3), transparent)',
        }}
      />
    </div>
  )
}
