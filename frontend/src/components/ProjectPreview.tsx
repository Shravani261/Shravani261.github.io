import BrowserWindow from './BrowserWindow'
import { Link } from 'react-router-dom'
import { useSiteData } from '../context/SiteData'

interface Props { onSelect: (id: string) => void; onOpen: (i: number) => void }

export default function ProjectPreview({ onSelect, onOpen }: Props) {
  const { data: { projects } } = useSiteData()
  return (
    <BrowserWindow className="pv" label="Projects preview">
      <div className="pvb">
        <div>
          <h2>My Projects</h2>
          <p>Real-world projects built with Python, SQL and more.</p>
<Link className="btn sm" to="/projects" onClick={() => onSelect('projects')}>
  View All →
</Link>        </div>
        <div className="stack">
          {projects.slice(0, 3).map((p, i) => (
            <button key={p.title} className="mini" aria-label={`Open project: ${p.title}`} onClick={() => onOpen(i)}>
              <span className="ico" aria-hidden="true">{p.icon}</span>{p.title}
            </button>
          ))}
        </div>
      </div>
    </BrowserWindow>
  )
}
