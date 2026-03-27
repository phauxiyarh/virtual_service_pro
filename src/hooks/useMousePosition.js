import { useState, useEffect } from 'react'

export default function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const update = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', update, { passive: true })
    return () => window.removeEventListener('mousemove', update)
  }, [])

  return pos
}
