import { Link } from 'react-router-dom'
import BrowserWindow from './BrowserWindow'
import { journey } from '../config/siteConfig'

export default function ExperiencePreview({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <BrowserWindow className="pv" label="Experience preview">
      <div className="pvb">
        <div>
          <h2>My Journey</h2>
          <p>From spreadsheets to GenAI, one stop at a time.</p>
          <Link className="btn sm" to="/experience" onClick={() => onSelect('experience')}>Follow the Path →</Link>
        </div>
        <div className="trail" aria-hidden="true">
          <svg viewBox="0 0 220 100" fill="none">
            <path d="M12 82 C50 80 50 30 90 40 S140 90 170 50 S205 18 210 20" stroke="var(--ink)" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
            {journey.map((s, i) => { const t = journey.length === 1 ? 0 : i / (journey.length - 1); return <circle key={s.id} cx={12 + t * 198} cy={[82, 52, 40, 72, 50, 20][i % 6]} r="7" fill={s.color} stroke="var(--ink)" strokeWidth="2.5" /> })}
          </svg>
          <span className="rocket">🚀</span>
        </div>
      </div>
    </BrowserWindow>
  )
}
