import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import PageShell from '../components/PageShell'
import CareerChapterCard from '../components/CareerChapterCard'
import { chapters, pageIntro, storySteps } from '../config/careerJourney'
import { useReveal } from '../hooks/useReveal'
import type { Theme } from '../hooks/useTheme'
import '../styles/careerJourney.css'

const goTo = (id: string) => {
  const el = document.getElementById(`stop-${id}`)
  if (!el) return
  // short chapters are centred; chapters taller than the screen (common on phones) start at their heading
  const tall = el.getBoundingClientRect().height > window.innerHeight * 0.75
  el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth', block: tall ? 'start' : 'center' })
}

const colorOf = (id: string) => chapters.find(c => c.id === id)?.color

export default function ExperiencePage({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const n = chapters.length
  useReveal()

  // Which chapter is in the middle of the screen, and how far along the path the visitor has scrolled.
  // Worked out from the scroll position (not from observer events) so it is always in sync, even when a click
  // scrolls to a chapter that was already partly in view. The short last chapter can never reach mid-screen,
  // so reaching the end of the page counts as being on it.
  useEffect(() => {
    let raf = 0
    const calc = () => {
      const el = listRef.current
      if (!el) return
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      const line = window.innerHeight * 0.45
      let idx = -1
      chapters.forEach((c, i) => {
        const r = document.getElementById(`stop-${c.id}`)?.getBoundingClientRect()
        if (r && r.top <= line && r.bottom >= line) idx = i
      })
      if (atEnd) idx = n - 1
      if (idx >= 0) setActive(idx)
      if (atEnd) { setProgress(1); return }
      const r = el.getBoundingClientRect()
      setProgress(Math.min(1, Math.max(0, (window.innerHeight * 0.5 - r.top) / r.height)))
    }
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(calc) }
    calc()
    window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [n])

  return (
    <PageShell theme={theme} setTheme={setTheme} emoji="🗺️" title="Experience" intro={pageIntro}>
      <ol className="cj-story" aria-label="My career story in four steps">
        {storySteps.map((s, i) => (
          <li key={s.to}>
            <button className="cj-step" style={{ '--c': colorOf(s.to) } as CSSProperties} onClick={() => goTo(s.to)}>
              <i aria-hidden="true">{s.icon}</i>{s.label}
            </button>
            {i < storySteps.length - 1 && <span className={`cj-arrow${i === storySteps.length - 2 ? ' pivot' : ''}`} aria-hidden="true">→</span>}
          </li>
        ))}
      </ol>

      <section className="sec jny cj" aria-label="Career journey">
        <aside className="jmap" aria-label="Journey map">
          <div className="jrail" aria-hidden="true">
            <i className="jfill" style={{ height: `${progress * 100}%` }} />
            <span className="jwalker" style={{ top: `calc(${progress} * (100% - 26px))` }}>🚀</span>
          </div>
          <ol>
            {chapters.map((c, i) => {
              const nx = chapters[i + 1]
              const dashed = c.kind === 'exploration' || nx?.kind === 'exploration'
              return (
                <li key={c.id} className={dashed ? 'cj-dash' : undefined} data-done={active > i ? 'true' : undefined}
                  style={{ '--c': c.color, '--n': nx?.color ?? c.color } as CSSProperties}>
                  <button aria-current={active === i ? 'step' : undefined} onClick={() => goTo(c.id)}>
                    <span className="jdot">{i + 1}</span>
                    <span className="jlabel">{c.mapLabel}{(c.mapWhen ?? c.when) && <small>{c.mapWhen ?? c.when}</small>}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </aside>

        <div className="jstages cj-stages" ref={listRef}>
          {chapters.map((c, i) => (
            <CareerChapterCard key={c.id} chapter={c} index={i} total={n} isActive={active === i}
              prev={chapters[i - 1]} next={chapters[i + 1]} onGo={goTo} />
          ))}
        </div>
      </section>
    </PageShell>
  )
}
