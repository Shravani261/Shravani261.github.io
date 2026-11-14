import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import type { Chapter } from '../config/careerJourney'

interface Props {
  chapter: Chapter
  index: number
  total: number
  isActive: boolean
  prev?: Chapter
  next?: Chapter
  onGo: (id: string) => void
}

/** One chapter of the Career Journey page. Layout is driven by the chapter's content, so any field can be edited or left out. */
export default function CareerChapterCard({ chapter: c, index, total, isActive, prev, next, onGo }: Props) {
  return (
    <article id={`stop-${c.id}`} data-kind={c.kind} data-on={isActive ? 'true' : undefined}
      className={`jcard cj-card ${index % 2 ? 'rvr' : 'rvl'}`} style={{ '--c': c.color } as CSSProperties}
      aria-labelledby={`stop-${c.id}-h`}>
      <div className="jbadge" aria-hidden="true">{c.icon}</div>

      <div className="jmeta">
        <b>Chapter {index + 1} of {total}</b>
        {c.when && <span className="chip">{c.when}</span>}
      </div>

      {(c.label || c.role) && (
        <div className="cj-sub">
          {c.label && <span className="cj-pill">{c.label}</span>}
          {c.role && <span className="cj-pill">💼 {c.role}</span>}
        </div>
      )}

      {c.shift && (
        <div className="cj-shift" role="img" aria-label={`${c.shift.from} to ${c.shift.to}`}>
          <span><i aria-hidden="true">{c.shift.fromIcon}</i>{c.shift.from}</span>
          <em aria-hidden="true">→</em>
          <span className="to"><i aria-hidden="true">{c.shift.toIcon}</i>{c.shift.to}</span>
        </div>
      )}

      <h2 id={`stop-${c.id}-h`}>{c.heading}</h2>
      {c.organisation && <p className="cj-org"><span aria-hidden="true">🏢</span> {c.organisation}</p>}

      {c.summary.map(p => <p key={p}>{p}</p>)}

      {c.milestone && (
        <div className="cj-milestone">
          <span className="mi" aria-hidden="true">{c.milestone.icon}</span>
          <div><small>{c.milestone.title}</small><b>{c.milestone.text}</b></div>
        </div>
      )}

      {c.achievements && (
        <section className="cj-block" aria-label="Achievements">
          <h3>Achievements</h3>
          <ul className="hl">{c.achievements.map(a => <li key={a}>{a}</li>)}</ul>
        </section>
      )}

      {c.themes && (
        <section className="cj-block" aria-label="Themes">
          <h3>Themes of this chapter</h3>
          <ul className="cj-themes">
            {c.themes.map(t => <li key={t.label}><i aria-hidden="true">{t.icon}</i>{t.label}</li>)}
          </ul>
        </section>
      )}

      {c.skills && (
        <section className="cj-block" aria-label="Skills">
          <h3>Skills</h3>
          <div className="tags">{c.skills.map(k => <span key={k}>{k}</span>)}</div>
        </section>
      )}

      <div className="row">
        {prev && <button className="btn sm ghost" onClick={() => onGo(prev.id)} aria-label={`Previous stop: ${prev.mapLabel}`}>↑ Previous stop</button>}
        {next && <button className="btn sm" onClick={() => onGo(next.id)} aria-label={`Next stop: ${next.mapLabel}`}>Next stop ↓</button>}
        {c.cta?.map(b => <Link key={b.to} className={`btn sm${b.primary ? '' : ' ghost'}`} to={b.to}>{b.label}</Link>)}
      </div>

      {c.bridge && next && (
        <span className={`cj-bridge${c.kind === 'exploration' || next.kind === 'exploration' ? ' cj-dash' : ''}`}
          style={{ '--n': next.color } as CSSProperties} aria-hidden="true"><b>{c.bridge}</b></span>
      )}
    </article>
  )
}
