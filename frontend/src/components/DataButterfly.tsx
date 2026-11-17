import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import '../styles/butterfly.css'

/* A small "data butterfly" that drifts around the page.
   Wings: bar chart + donut chart (top), sparkline + </> code (bottom).
   - wanders randomly, gets curious when the mouse moves, flies to where you tap on phones
   - click / tap it: it shows a tip from a data tool and changes its colours */

const TOOLS = [
  { name: 'Power BI', w1: '#F2C811', w2: '#E8A800', sy: '#0B2348', tip: 'Clean data in, clear story out.' },
  { name: 'Python', w1: '#3776AB', w2: '#FFD43B', sy: '#0B2348', tip: "df.groupby('question').mean()  # curiosity pays off" },
  { name: 'SQL', w1: '#E48E00', w2: '#00758F', sy: '#FFF4D6', tip: 'SELECT insight FROM data WHERE curiosity > 0;' },
  { name: 'Excel', w1: '#21A366', w2: '#107C41', sy: '#FFF4D6', tip: '=XLOOKUP(idea, data, answer)' },
  { name: 'Tableau', w1: '#4E79A7', w2: '#F28E2B', sy: '#0B2348', tip: 'Drag. Drop. Discover.' },
]
const HELLO = "Hi! I’m Shravani’s data butterfly. Click me again!"

const rand = (a: number, b: number) => a + Math.random() * (b - a)
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

export default function DataButterfly() {
  const [n, setN] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [pop, setPop] = useState(false)
  const [bubble, setBubble] = useState<{ title: string; text: string; below: boolean; right: boolean } | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const rotRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number>(0)
  const sim = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, next: 0, ang: 0, curX: 0, curY: 0, curT: -99999, flap: 0.26, hover: false })
  const tool = TOOLS[n % TOOLS.length]

  useEffect(() => {
    const el = rootRef.current
    const rot = rotRef.current
    if (!el || !rot || hidden) return
    const s = sim.current
    const W = () => window.innerWidth
    const H = () => window.innerHeight
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (s.x === 0 && s.y === 0) { s.x = W() * 0.72; s.y = H() * 0.32 }
    const place = () => { el.style.transform = `translate3d(${s.x}px,${s.y}px,0)` }

    if (reduce) {
      // no movement for people who prefer reduced motion: rest in a corner
      s.x = W() - 96; s.y = H() - 110; place()
      const onResize = () => { s.x = W() - 96; s.y = H() - 110; place() }
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const pick = (now: number) => {
      s.tx = rand(50, Math.max(120, W() - 110))
      s.ty = rand(90, Math.max(160, H() - 110))
      s.next = now + rand(1600, 3800)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      s.curX = e.clientX; s.curY = e.clientY; s.curT = performance.now()
    }
    const onTap = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      s.tx = clamp(e.clientX - 30, 20, W() - 90); s.ty = clamp(e.clientY - 30, 80, H() - 90)
      s.next = performance.now() + 3200
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onTap, { passive: true })

    let raf = 0
    let last = performance.now()
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (now > s.next) pick(now)
      let tx = s.tx, ty = s.ty
      if (now - s.curT < 2200) {          // mouse moved recently: circle around it
        const a = now / 600
        tx = s.curX + Math.cos(a) * 80 - 30
        ty = s.curY + Math.sin(a) * 55 - 30
      }
      const dx = tx - s.x, dy = ty - s.y
      const dist = Math.hypot(dx, dy) || 1
      const speed = Math.min(170, 30 + dist * 0.9)
      const wob = Math.sin(now / 230) * 38                // flutter sideways
      const dvx = (dx / dist) * speed + (-dy / dist) * wob
      const dvy = (dy / dist) * speed + (dx / dist) * wob
      if (s.hover) { s.vx *= 0.88; s.vy *= 0.88 }          // slow down when the mouse is on it
      else {
        const k = Math.min(1, dt * 2.4)
        s.vx += (dvx - s.vx) * k
        s.vy += (dvy - s.vy) * k
      }
      s.x = clamp(s.x + s.vx * dt, 10, W() - 74)
      s.y = clamp(s.y + s.vy * dt, 10, H() - 68)
      const sp = Math.hypot(s.vx, s.vy)
      if (sp > 12) {
        const want = (Math.atan2(s.vy, s.vx) * 180) / Math.PI + 90
        const d = ((want - s.ang + 540) % 360) - 180
        s.ang += d * Math.min(1, dt * 5)
      }
      place()
      rot.style.transform = `rotate(${s.ang}deg)`
      const f = Math.max(0.1, 0.3 - sp / 700)               // flaps faster when it flies faster
      if (Math.abs(f - s.flap) > 0.015) { s.flap = f; el.style.setProperty('--flap', `${f}s`) }
      raf = requestAnimationFrame(frame)
    }
    pick(last)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onTap)
    }
  }, [hidden])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onBee = () => {
    const s = sim.current
    const next = n + 1
    const t = TOOLS[next % TOOLS.length]
    setN(next)
    setBubble(n === 0
      ? { title: 'Hello!', text: HELLO, below: s.y < 130, right: s.x > window.innerWidth - 260 }
      : { title: t.name, text: t.tip, below: s.y < 130, right: s.x > window.innerWidth - 260 })
    setPop(true)
    s.vx += rand(-260, 260); s.vy += rand(-280, -80)       // little burst of excitement
    s.next = 0
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => { setBubble(null); setPop(false) }, 4600)
    window.setTimeout(() => setPop(false), 600)
  }

  if (hidden) return null
  const vars = { '--w1': tool.w1, '--w2': tool.w2, '--sy': tool.sy } as CSSProperties
  return (
    <div ref={rootRef} className="bee" style={vars}>
      <div ref={rotRef} className="bee-rot">
        <svg className={pop ? 'bee-art bee-pop' : 'bee-art'} viewBox="0 0 120 110" aria-hidden="true">
          <g className="wl">
            <path className="w1" d="M60 48 C40 6 4 8 7 38 C9 56 40 62 60 52Z" strokeWidth="2.2" strokeLinejoin="round"/>
            <path className="w2" d="M60 56 C42 56 14 64 21 84 C27 100 52 94 60 64Z" strokeWidth="2.2" strokeLinejoin="round"/>
            <g className="sym" strokeWidth="1.6">
              <rect x="17" y="34" width="9" height="13" rx="1.5"/>
              <rect x="29" y="25" width="9" height="22" rx="1.5"/>
              <rect x="41" y="16" width="9" height="31" rx="1.5"/>
            </g>
            <polyline className="line" points="28,86 35,76 43,81 53,68" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle className="dot" cx="28" cy="86" r="2.6"/><circle className="dot" cx="43" cy="81" r="2.6"/><circle className="dot" cx="53" cy="68" r="2.6"/>
          </g>
          <g className="wr">
            <path className="w1" d="M60 48 C80 6 116 8 113 38 C111 56 80 62 60 52Z" strokeWidth="2.2" strokeLinejoin="round"/>
            <path className="w2" d="M60 56 C78 56 106 64 99 84 C93 100 68 94 60 64Z" strokeWidth="2.2" strokeLinejoin="round"/>
            <g fill="none" strokeWidth="9" transform="rotate(-90 88 32)">
              <circle cx="88" cy="32" r="12" stroke="#FFF4D6"/>
              <circle cx="88" cy="32" r="12" stroke="#0B2348" strokeDasharray="34 76"/>
              <circle cx="88" cy="32" r="12" className="pie3" strokeDasharray="18 76" strokeDashoffset="-34"/>
            </g>
            <circle cx="88" cy="32" r="16.5" fill="none" stroke="#0B2348" strokeWidth="1.4"/>
            <path className="code" d="M75 76 L68 83 L75 90 M85 76 L92 83 L85 90" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path className="code" d="M82 74 L78 92" fill="none" strokeWidth="2.4" strokeLinecap="round"/>
          </g>
          <path className="ant" d="M58 27 C54 16 49 10 44 7 M62 27 C66 16 71 10 76 7" fill="none" strokeWidth="2" strokeLinecap="round"/>
          <circle className="tip" cx="44" cy="7" r="2.8"/><circle className="tip" cx="76" cy="7" r="2.8"/>
          <ellipse className="body" cx="60" cy="58" rx="4.4" ry="27"/>
          <circle className="body" cx="60" cy="29" r="5.6"/>
          <circle cx="58.2" cy="28" r="1.2" fill="#FFF4D6"/><circle cx="61.8" cy="28" r="1.2" fill="#FFF4D6"/>
        </svg>
      </div>
      <div
        className="bee-hit"
        role="button"
        tabIndex={-1}
        aria-label="Data butterfly: click for a data tip"
        onClick={onBee}
        onPointerEnter={() => { sim.current.hover = true }}
        onPointerLeave={() => { sim.current.hover = false }}
      />
      {bubble && (
        <div className={`bee-bubble${bubble.below ? ' below' : ''}${bubble.right ? ' right' : ''}`} role="status">
          <b>{bubble.title}</b>
          {bubble.text}
          <button className="bee-shoo" onClick={() => setHidden(true)}>shoo ✕</button>
        </div>
      )}
    </div>
  )
}
