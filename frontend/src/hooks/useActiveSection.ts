import { useEffect, useState } from 'react'

/** Tracks which section is in view and adds the reveal class `in`. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); setActive(e.target.id) }
      }),
      { threshold: 0.35 }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [ids])
  return [active, setActive] as const
}
