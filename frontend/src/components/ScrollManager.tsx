import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** New page -> start at the top. Link with #hash -> scroll to that section. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
      const t = window.setTimeout(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      }, 120)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])
  return null
}
