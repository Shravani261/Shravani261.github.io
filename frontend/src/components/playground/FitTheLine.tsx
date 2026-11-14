import { useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

const W = 400, H = 260
interface Pt { x: number; y: number }   // data values, 0..100

const randn = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())
const clamp = (v: number) => Math.min(98, Math.max(2, v))

function fit(pts: Pt[]) {
  const n = pts.length
  if (n < 2) return null
  const mx = pts.reduce((a, p) => a + p.x, 0) / n, my = pts.reduce((a, p) => a + p.y, 0) / n
  const sxx = pts.reduce((a, p) => a + (p.x - mx) ** 2, 0)
  if (sxx < 1e-6) return null
  const m = pts.reduce((a, p) => a + (p.x - mx) * (p.y - my), 0) / sxx
  const c = my - m * mx
  const ssRes = pts.reduce((a, p) => a + (p.y - (m * p.x + c)) ** 2, 0)
  const ssTot = pts.reduce((a, p) => a + (p.y - my) ** 2, 0)
  return { m, c, r2: ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot) }
}

export default function FitTheLine() {
  const [pts, setPts] = useState<Pt[]>([])
  const [showErr, setShowErr] = useState(true)
  const svg = useRef<SVGSVGElement>(null)
  const f = useMemo(() => fit(pts), [pts])
  const X = (v: number) => (v / 100) * W, Y = (v: number) => H - (v / 100) * H

  function add(e: MouseEvent<SVGSVGElement>) {
    const r = svg.current!.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100, y = (1 - (e.clientY - r.top) / r.height) * 100
    setPts(p => (p.length >= 60 ? p : [...p, { x: clamp(x), y: clamp(y) }]))
  }
  function randomData() {
    const m = (Math.random() * 1.6 - 0.8), c = 50 - m * 50, noise = 6 + Math.random() * 14
    setPts(Array.from({ length: 16 }, () => { const x = 6 + Math.random() * 88; return { x, y: clamp(m * x + c + randn() * noise) } }))
  }
  const verdict = !f ? 'Click the chart to add points. The model trains itself as you go.'
    : f.r2 > 0.85 ? 'Strong fit. The line explains most of the pattern.'
    : f.r2 > 0.5 ? 'A decent trend, but there is a lot of noise.'
    : 'Weak fit. Maybe there is no linear pattern here.'

  return (
    <div className="game">
      <p className="g-hint">Be the data. Click to drop points and watch a regression line train itself, live.</p>
      <svg ref={svg} viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label={`Scatter plot with ${pts.length} points${f ? ` and a fitted line with R squared ${f.r2.toFixed(2)}` : ''}`} onClick={add}>
        <g className="grid-lines">{[25, 50, 75].map(v => <g key={v}><line x1={X(v)} x2={X(v)} y1="0" y2={H} /><line x1="0" x2={W} y1={Y(v)} y2={Y(v)} /></g>)}</g>
        {f && showErr && pts.map((p, i) => <line key={`e${i}`} className="err-l" x1={X(p.x)} x2={X(p.x)} y1={Y(p.y)} y2={Y(f.m * p.x + f.c)} />)}
        {f && <line className="fit-l" x1={X(0)} y1={Y(f.c)} x2={X(100)} y2={Y(f.m * 100 + f.c)} />}
        {pts.map((p, i) => <circle key={i} className="dot" cx={X(p.x)} cy={Y(p.y)} r="5" />)}
      </svg>
      <div className="g-stats" aria-live="polite">
        <span><b>{pts.length}</b> points</span>
        <span>{f ? <>y = <b>{f.m.toFixed(2)}</b>x + <b>{f.c.toFixed(1)}</b></> : 'y = ?'}</span>
        <span>R² <b>{f ? f.r2.toFixed(2) : '–'}</b></span>
      </div>
      <div className="meter" aria-hidden="true"><i style={{ width: `${(f?.r2 ?? 0) * 100}%` }} /></div>
      <p className="g-msg">{verdict}</p>
      <div className="row">
        <button className="btn sm" onClick={randomData}>🎲 Random data</button>
        <button className="btn sm ghost" onClick={() => setShowErr(s => !s)} aria-pressed={showErr}>{showErr ? 'Hide' : 'Show'} errors</button>
        <button className="btn sm ghost" onClick={() => setPts([])}>Clear</button>
      </div>
    </div>
  )
}
