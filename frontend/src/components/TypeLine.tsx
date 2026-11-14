import { useEffect, useState } from 'react'

const LINES = ['cleaning messy data…', 'training a model…', 'building a dashboard…', 'asking better questions…', 'learning GenAI, one prompt at a time…']

/** Typewriter line under the hero tagline. Static (first line) when the visitor prefers reduced motion. */
export default function TypeLine() {
  const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
  const [i, setI] = useState(0)
  const [n, setN] = useState(reduce ? LINES[0].length : 0)
  const [dir, setDir] = useState<1 | -1>(1)

  useEffect(() => {
    if (reduce) return
    const full = LINES[i].length
    const t = window.setTimeout(() => {
      if (dir === 1) { if (n < full) setN(n + 1); else setDir(-1) }
      else if (n > 0) setN(n - 1)
      else { setDir(1); setI((i + 1) % LINES.length) }
    }, dir === 1 ? (n === full ? 1300 : 55) : 28)
    return () => window.clearTimeout(t)
  }, [n, dir, i, reduce])

  return <p className="typeline" aria-label="Currently: cleaning messy data, training models, building dashboards"><span aria-hidden="true">&gt; now: {LINES[i].slice(0, n)}<i className="caret" /></span></p>
}
