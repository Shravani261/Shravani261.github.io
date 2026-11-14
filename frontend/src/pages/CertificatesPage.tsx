import { useState } from 'react'
import PageShell from '../components/PageShell'
import Modal from '../components/Modal'
import { useSiteData } from '../context/SiteData'
import { useReveal } from '../hooks/useReveal'
import { tilt } from '../hooks/tilt'
import type { Theme } from '../hooks/useTheme'
import type { CSSProperties } from 'react'

export default function CertificatesPage({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  const { data: { certificates: certs } } = useSiteData()
  const [open, setOpen] = useState<number | null>(null)
  useReveal()
  const cur = open !== null ? certs[open] : null

  return (
    <PageShell theme={theme} setTheme={setTheme} emoji="🎓" title="Certificates"
      intro={`${certs.length} credentials so far. Continuous learning, for continuous growth.`}>
      <section className="sec" aria-label="Certificates">
        <div className="cards">
          {certs.map((c, i) => (
            <div key={c.title} className={i % 2 ? 'rvr' : 'rvl'} style={{ '--d': `${(i % 3) * 90}ms` } as CSSProperties}>
              <article className="pc pj tl" {...tilt}>
                {c.image
                  ? <img className="cthumb" src={c.image} alt={`${c.title} certificate`} loading="lazy" />
                  : <div className="cthumb cph" aria-hidden="true"><span>{c.icon}</span></div>}
                <h3>{c.title}</h3>
                <p>{c.provider || 'Recognition'}{c.date && ` · ${c.date}`}</p>
                <div className="row">
                  <button className="btn sm" onClick={() => setOpen(i)}>View Details</button>
                  {c.url && <a className="lnk" href={c.url} target="_blank" rel="noopener noreferrer">Verify credential</a>}
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>

      <Modal open={open !== null} title={cur?.title ?? ''} onClose={() => setOpen(null)}
        actions={cur?.url ? <a className="btn sm" href={cur.url} target="_blank" rel="noopener noreferrer">Open credential</a> : undefined}>
        {cur && <>
          <p>{cur.provider || 'Recognition'}{cur.date && ` · ${cur.date}`}</p>
          {cur.image && <img className="cimg" src={cur.image} alt={`${cur.title} certificate`} />}
        </>}
      </Modal>
    </PageShell>
  )
}
