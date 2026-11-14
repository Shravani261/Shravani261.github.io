import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../config/siteConfig'

interface Props { active: string; onSelect: (id: string) => void }

const Arrow = ({ d }: { d: string }) => (
  <svg className="arr" viewBox="0 0 60 24" fill="none" stroke="#0B2348" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d={d} /></svg>
)

export default function BottomNavigation({ active, onSelect }: Props) {
  return (
    <div className="show" id="explore" aria-label="Section shortcuts">
      <div className="tiles">
        {nav.map(n => (
          <Link key={n.id} className="tile" to={n.to} aria-current={active === n.id ? 'page' : undefined}
             style={{ '--c': n.color, '--h': n.hover, ...(n.id === 'home' ? { color: '#fff' } : {}) } as CSSProperties}
             onClick={() => onSelect(n.id)}>{n.label}</Link>
        ))}
      </div>
    </div>
  )
}
