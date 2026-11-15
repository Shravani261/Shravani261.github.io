import BrowserWindow from './BrowserWindow'
import Header from './Header'
import type { Theme } from '../hooks/useTheme'
import ResumeButtons from './ResumeButtons'
import TypeLine from './TypeLine'
import { Link } from 'react-router-dom'

interface Props { active: string; onSelect: (id: string) => void; theme: Theme; setTheme: (t: Theme) => void }

export default function Hero(props: Props) {
  return (
    <BrowserWindow className="hero poster" label="Introduction">
      <Header {...props} />
      <div className="pbody">
        <div className="pw-big" aria-hidden="true">PORTFOLIO</div>
        <img className="pw-cut" src="/portrait-think.webp" alt="Portrait of Shravani Jagtap" />
        <div className="pw-name">
          <div className="pw-hi">Hi, I’m</div>
          <h1 className="pw-script">Shravani Jagtap</h1>
        </div>
        <div className="pw-right">
          <div className="pw-role">Data Analyst</div>
          <p className="pw-tag">Turning data into insights for <span className="ul">smarter</span> decisions</p>
          <TypeLine />
        </div>
        <div className="pw-left">
          <Link className="btn" to="/projects" onClick={() => props.onSelect('projects')}><span aria-hidden="true">📊</span> Explore My Work →</Link>
          <Link className="btn ghost" to="/playground"><span aria-hidden="true">🎮</span> Play with my data</Link>
          <ResumeButtons />
        </div>
      </div>
      <button className="scr" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' })}><span className="mouse" aria-hidden="true" />Scroll Down ↓</button>
    </BrowserWindow>
  )
}
