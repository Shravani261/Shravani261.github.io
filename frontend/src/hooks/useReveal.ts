import { useEffect } from 'react'

/** Adds the class `in` to every .rv / .rvl / .rvr / .rvz element as it scrolls into view. */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv:not(.in), .rvl:not(.in), .rvr:not(.in), .rvz:not(.in)'))
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
