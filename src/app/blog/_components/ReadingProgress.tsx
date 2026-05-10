'use client'
import { useEffect, useRef, useState } from 'react'

export default function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    const update = () => {
      frameRef.current = null
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      if (max <= 0) {
        setScrollable(false)
        return
      }
      setScrollable(true)
      const p = Math.min(1, Math.max(0, window.scrollY / max))
      if (barRef.current) barRef.current.style.width = `${p * 100}%`
    }

    const schedule = () => {
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  if (!scrollable) return null

  return (
    <div className="fixed top-0 left-0 right-0 h-2 border-b-2 border-border bg-secondary-background z-50">
      <div
        ref={barRef}
        className="h-full bg-main border-r-2 border-border transition-[width] duration-100"
        style={{ width: '0%' }}
      />
    </div>
  )
}
