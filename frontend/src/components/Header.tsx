import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import ThemeToggle from './ThemeToggle'
import type { Theme } from '../hooks/useTheme'

interface Props { active?: string; onSelect?: (id: string) => void; theme: Theme; setTheme: (t: Theme) => void }

export default function Header({ active, onSelect, theme, setTheme }: Props) {
  return (
    <header className="hd">
      <Link className="brand" to="/" onClick={() => onSelect?.('home')}>
        Shravani
        <svg viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true"><path d="M2 5 Q50 0 98 4" stroke="#FFC83D" strokeWidth="3.5" fill="none" strokeLinecap="round" /></svg>
      </Link>
      <Navigation active={active} onSelect={onSelect} />
      <ThemeToggle theme={theme} onChange={setTheme} />
    </header>
  )
}
