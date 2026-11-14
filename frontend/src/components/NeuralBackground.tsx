import { useEffect, useRef } from 'react'

interface Node { x: number; y: number; vx: number; vy: number }

/** A quiet "neural network" behind the page. Nodes drift, link up when close, and reach toward the cursor. Click to send a pulse through it. */
export default function NeuralBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
    let w = 0, h = 0, raf = 0, frame = 0, color = '35,133,207'
    let nodes: Node[] = []
    const mouse = { x: -9999, y: -9999 }
    const pulses: { x: number; y: number; r: number }[] = []

    function readColor() {
      const hex = getComputedStyle(document.documentElement).getPropertyValue('--act').trim()
      const m = /^#([0-9a-f]{6})$/i.exec(hex)
      if (m) color = `${parseInt(m[1].slice(0, 2), 16)},${parseInt(m[1].slice(2, 4), 16)},${parseInt(m[1].slice(4, 6), 16)}`
    }
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      canvas!.width = w * dpr; canvas!.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(24, Math.min(80, Math.round((w * h) / 22000)))
      nodes = Array.from({ length: count }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 }))
    }
    function draw() {
      frame++
      if (frame % 40 === 1) readColor()
      ctx!.clearRect(0, 0, w, h)
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx; n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
          for (const p of pulses) {
            const dx = n.x - p.x, dy = n.y - p.y, d = Math.hypot(dx, dy)
            if (Math.abs(d - p.r) < 30 && d > 0) { n.x += (dx / d) * 2.2; n.y += (dy / d) * 2.2 }
          }
        }
      }
      for (let i = pulses.length - 1; i >= 0; i--) { pulses[i].r += 7; if (pulses[i].r > Math.max(w, h)) pulses.splice(i, 1) }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 140) { ctx!.strokeStyle = `rgba(${color},${(1 - d / 140) * .35})`; ctx!.lineWidth = 1; ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke() }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (dm < 190) { ctx!.strokeStyle = `rgba(255,200,61,${(1 - dm / 190) * .8})`; ctx!.lineWidth = 1.4; ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(mouse.x, mouse.y); ctx!.stroke() }
        ctx!.fillStyle = `rgba(${color},.55)`; ctx!.beginPath(); ctx!.arc(a.x, a.y, 2.2, 0, 6.283); ctx!.fill()
      }
      if (!reduce && !document.hidden) raf = requestAnimationFrame(draw)
      else if (!reduce) raf = window.setTimeout(() => { raf = requestAnimationFrame(draw) }, 400) as unknown as number
    }
    const onMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onLeave = () => { mouse.x = mouse.y = -9999 }
    const onClick = (e: MouseEvent) => { pulses.push({ x: e.clientX, y: e.clientY, r: 0 }) }

    resize(); readColor(); draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize); window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave); window.removeEventListener('click', onClick)
    }
  }, [])

  return <canvas ref={ref} className="neural" aria-hidden="true" />
}
