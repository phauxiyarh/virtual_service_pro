import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { damping: 25, stiffness: 200 })
  const smoothY = useSpring(y, { damping: 25, stiffness: 200 })
  const visible = useRef(false)
  const opacity = useMotionValue(0)

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible.current) {
        visible.current = true
        opacity.set(1)
      }
    }

    const leave = () => {
      visible.current = false
      opacity.set(0)
    }

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y, opacity])

  return (
    <motion.div
      className="fixed top-0 left-0 w-[420px] h-[420px] rounded-full pointer-events-none z-[9990]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
        opacity,
        background: 'radial-gradient(circle, rgba(122,173,204,0.07) 0%, transparent 70%)',
        filter: 'blur(1px)',
      }}
    />
  )
}
