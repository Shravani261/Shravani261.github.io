import { useState } from 'react'
import PageShell from '../components/PageShell'
import Modal from '../components/Modal'
import { useSiteData } from '../context/SiteData'
import { useReveal } from '../hooks/useReveal'
import { tilt } from '../hooks/tilt'
import type { Theme } from '../hooks/useTheme'
import type { CSSProperties } from 'react'
import type { ProjectCategory } from '../config/siteConfig'

const FILTERS: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ml', label: '🤖 Machine Learning' },
  { id: 'dashboard', label: '📊 Dashboards' },
  { id: 'analytics', label: '🔍 Analytics' },
]
const CAT: Record<ProjectCategory, string> = { ml: 'Machine Learning', dashboard: 'Dashboard', analytics: 'Analytics' }

export default function ProjectsPage({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  const { data: { projects } } = useSiteData()
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const [open, setOpen] = useState<number | null>(null)
  useReveal([filter])

  const shown = projects.map((p, i) => ({ p, i })).filter(({ p }) => filter === 'all' || p.category === filter)
  const cur = open !== null ? projects[open] : null

  return (
    <PageShell theme={theme} setTheme={setTheme} emoji="🛠️" title="Projects"
      intro={`${projects.length} things I built to turn messy data into answers. Filter them, open one up, or let fate pick.`}>
      <section className="sec" aria-label="Projects">
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map(f => (
            <button key={f.id} className="chipbtn" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}<small>{f.id === 'all' ? projects.length : projects.filter(p => p.category === f.id).length}</small>
            </button>
          ))}
          <button className="chipbtn dice" onClick={() => setOpen(Math.floor(Math.random() * projects.length))}>🎲 Surprise me</button>
        </div>

        <div className="cards pjgrid" key={filter}>
          {shown.map(({ p, i }, k) => (
            <div key={p.title} className={k % 2 ? 'rvr' : 'rvl'} style={{ '--d': `${(k % 3) * 90}ms` } as CSSProperties}>
              <article className="pc pj tl" {...tilt}>
                <div className="pj-top"><span className="ico" aria-hidden="true">{p.icon}</span><span className="cat">{CAT[p.category]}</span></div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                <div className="row">
                  <button className="btn sm" onClick={() => setOpen(i)}>View Project</button>
                  {p.code && <a className="lnk" href={p.code} target="_blank" rel="noopener noreferrer">View Code</a>}
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <Modal open={open !== null} title={cur?.title ?? ''} onClose={() => setOpen(null)}
        actions={<>
          {cur?.url && <a className="btn sm" href={cur.url} target="_blank" rel="noopener noreferrer">Open project</a>}
          {cur?.code && <a className="lnk" href={cur.code} target="_blank" rel="noopener noreferrer">View Code</a>}
        </>}>
        {cur && <>
          <p><span className="cat">{CAT[cur.category]}</span></p>
          <p>{cur.description}</p>
          <ul className="hl">{cur.highlights.map(h => <li key={h}>{h}</li>)}</ul>
          <div className="tags">{cur.tech.map(t => <span key={t}>{t}</span>)}</div>
          {!cur.url && !cur.code && <p><em>Live link and code are coming soon.</em></p>}
        </>}
      </Modal>
    </PageShell>
  )
}
