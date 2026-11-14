import { useState } from 'react'

interface Round { pts: [number, number][]; r: number }

const randn = () => Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random())

function newRound(): Round {
  const target = Math.round((Math.random() * 1.9 - 0.95) * 100) / 100
  const raw = Array.from({ length: 45 }, () => { const a = randn(); return [a, target * a + Math.sqrt(1 - target * target) * randn()] as [number, number] })
  const mx = raw.reduce((s, p) => s + p[0], 0) / raw.length, my = raw.reduce((s, p) => s + p[1], 0) / raw.length
  let sxy = 0, sxx = 0, syy = 0
  for (const [x, y] of raw) { sxy += (x - mx) * (y - my); sxx += (x - mx) ** 2; syy += (y - my) ** 2 }
  return { pts: raw, r: sxy / Math.sqrt(sxx * syy) }   // the true sample correlation, not just the target
}

export default function GuessCorrelation() {
  const [round, setRound] = useState<Round>(newRound)
  const [guess, setGuess] = useState(0)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)
  const [played, setPlayed] = useState(0)

  const err = Math.abs(guess - round.r)
  const pts = Math.max(0, Math.round(100 - err * 200))
  const face = err < 0.05 ? '🎯 Spot on!' : err < 0.15 ? '👏 Very close!' : err < 0.3 ? '🙂 Not bad.' : '😅 Tricky one. That is why we calculate it.'

  function lock() { setDone(true); setScore(s => s + pts); setPlayed(p => p + 1) }
  function next() { setRound(newRound()); setGuess(0); setDone(false) }

  return (
    <div className="game">
      <p className="g-hint">How correlated is this data? Slide to guess r, from −1 (opposite) to +1 (together).</p>
      <svg viewBox="0 0 240 240" className="chart sq" role="img" aria-label="Scatter plot to guess the correlation of">
        <line className="axis" x1="0" x2="240" y1="120" y2="120" /><line className="axis" x1="120" x2="120" y1="0" y2="240" />
        {round.pts.map(([x, y], i) => <circle key={i} className="dot" cx={Math.min(232, Math.max(8, 120 + x * 36))} cy={Math.min(232, Math.max(8, 120 - y * 36))} r="4.5" />)}
      </svg>
      <label className="slider">Your guess: <b>{guess.toFixed(2)}</b>
        <input type="range" min={-1} max={1} step={0.01} value={guess} disabled={done} onChange={e => setGuess(Number(e.target.value))} aria-label="Guess the correlation" />
      </label>
      <div className="g-msg" aria-live="polite">
        {done ? <>Actual r = <b>{round.r.toFixed(2)}</b>. Off by {err.toFixed(2)} → <b>+{pts}</b> pts. {face}</> : 'Lock it in when you are ready.'}
      </div>
      <div className="g-stats"><span>Score <b>{score}</b></span><span>Rounds <b>{played}</b></span><span>Avg <b>{played ? Math.round(score / played) : '–'}</b></span></div>
      <div className="row">
        {!done ? <button className="btn sm" onClick={lock}>Lock in guess</button> : <button className="btn sm" onClick={next}>Next round →</button>}
      </div>
    </div>
  )
}
