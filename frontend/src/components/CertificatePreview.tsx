import BrowserWindow from './BrowserWindow'
import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteData'

interface Props { onSelect: (id: string) => void; onOpen: (i: number) => void }

export default function CertificatePreview({ onSelect, onOpen }: Props) {
  const { data: { certificates: certs } } = useSiteData()
  return (
    <BrowserWindow className="pv cert" label="Certificates preview">
      <div className="pvb">
        <div>
          <h2>Certificates</h2>
          <p>Continuous learning, for continuous growth.</p>
          <Link className="btn sm" to="/certificates" onClick={() => onSelect('certificates')}>View All {certs.length} →</Link>
        </div>
        <div className="stack">
          {certs.slice(0, 3).map((c, i) => (
            <button key={c.title} className="mini" aria-label={`Open certificate: ${c.title}`} onClick={() => onOpen(i)}>
              <span className="ico" aria-hidden="true">{c.icon}</span>
              {c.provider && <>{c.provider}<br /></>}{c.title}
            </button>
          ))}
        </div>
      </div>
    </BrowserWindow>
  )
}
