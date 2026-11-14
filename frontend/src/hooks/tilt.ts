import type { MouseEvent } from 'react'

/** Spread onto an element: `<div {...tilt}>`. Gives a gentle 3D tilt and a moving glare that follow the cursor. */
export const tilt = {
  onMouseMove(e: MouseEvent<HTMLElement>) {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return
    const el = e.currentTarget, r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-py * 8).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(px * 10).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${((px + 0.5) * 100).toFixed(0)}%`)
    el.style.setProperty('--gy', `${((py + 0.5) * 100).toFixed(0)}%`)
  },
  onMouseLeave(e: MouseEvent<HTMLElement>) {
    const el = e.currentTarget
    el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg')
  },
}
