import { useMemo, useState } from 'react'
import { QUIZ, spamProbability, tokenize, wordScore } from './spamModel'
import type { Label } from './spamModel'

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]] } return b }

export default function SpamOrHam() {
  const [order, setOrder] = useState(() => shuffle(QUIZ))
  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState<Label | null>(null)
  const [you, setYou] = useState(0)
  const [model, setModel] = useState(0)

  const finished = i >= order.length
  const q = order[Math.min(i, order.length - 1)]
  const p = useMemo(() => spamProbability(q.text), [q])
  const modelSays: Label = p > 0.5 ? 'spam' : 'ham'

  function pick(l: Label) {
    if (answer) return
    setAnswer(l)
    if (l === q.label) setYou(s => s + 1)
    if (modelSays === q.label) setModel(s => s + 1)
  }
  function next() { setAnswer(null); setI(i + 1) }
  function again() { setOrder(shuffle(QUIZ)); setI(0); setAnswer(null); setYou(0); setModel(0) }

  if (finished) {
    const verdict = you > model ? 'You beat the model! 🏆' : you === model ? 'A tie with the machine. 🤝' : 'The model edged you out this time. 🤖'
    return (
      <div className="game">
        <div className="result"><b>{you} / {order.length}</b> for you · <b>{model} / {order.length}</b> for my Naive Bayes model<p>{verdict}</p></div>
        <p className="g-hint">The model learned from only 24 example messages. A real spam detector learns from thousands, which is why data quality matters.</p>
        <div className="row"><button className="btn sm" onClick={again}>Play again</button></div>
      </div>
    )
  }

  return (
    <div className="game">
      <p className="g-hint">Can you out-classify a model? Decide if each text is spam, then see what my Naive Bayes detector thinks.</p>
      <div className="g-stats"><span>Message <b>{i + 1}/{order.length}</b></span><span>You <b>{you}</b></span><span>Model <b>{model}</b></span></div>
      <div className="sms" aria-live="polite">
        {q.text.split(/(\s+)/).map((tok, k) => {
          const s = answer ? wordScore(tokenize(tok)[0] ?? '') : 0
          return <span key={k} className={s > 0.9 ? 'w-spam' : s < -0.9 ? 'w-ham' : undefined}>{tok}</span>
        })}
      </div>
      {!answer ? (
        <div className="row"><button className="btn sm" onClick={() => pick('spam')}>🚫 Spam</button><button className="btn sm ghost" onClick={() => pick('ham')}>✅ Not spam</button></div>
      ) : (
        <>
          <p className="g-msg">
            {answer === q.label ? '✅ You got it.' : '❌ Not this one.'} It was <b>{q.label === 'spam' ? 'spam' : 'not spam'}</b>. My model says <b>{modelSays === 'spam' ? 'spam' : 'not spam'}</b> ({Math.round((modelSays === 'spam' ? p : 1 - p) * 100)}% sure) {modelSays === q.label ? '✅' : '❌'}
          </p>
          <p className="g-hint"><span className="w-spam">red</span> words pushed the model toward spam, <span className="w-ham">green</span> toward normal.</p>
          <div className="row"><button className="btn sm" onClick={next}>{i + 1 === order.length ? 'See results' : 'Next message →'}</button></div>
        </>
      )}
    </div>
  )
}
