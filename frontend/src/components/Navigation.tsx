import { Link, useLocation } from 'react-router-dom'
import { nav } from '../config/siteConfig'

/** `active` is the home-page section in view ('home' | 'about' | 'contact'). It is ignored on other pages. */
interface Props { active?: string; onSelect?: (id: string) => void }

export default function Navigation({ active = '', onSelect }: Props) {
  const { pathname } = useLocation()
  const isCurrent = (n: typeof nav[number]) => {
    if (n.id === 'about' || n.id === 'contact' || n.id === 'home') return pathname === '/' && active === n.id
    return pathname.startsWith(n.to)
  }
  return (
    <nav aria-label="Main">
      <ul>
        {nav.map(n => (
          <li key={n.id}>
            <Link to={n.to} aria-current={isCurrent(n) ? 'page' : undefined} onClick={() => onSelect?.(n.id)}>{n.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
