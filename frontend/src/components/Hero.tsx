import BrowserWindow from './BrowserWindow'
import Header from './Header'
import { useSiteData } from '../context/SiteData'
import type { Theme } from '../hooks/useTheme'
import ResumeButtons from './ResumeButtons'
import TypeLine from './TypeLine'
import { Link } from 'react-router-dom'

interface Props { active: string; onSelect: (id: string) => void; theme: Theme; setTheme: (t: Theme) => void }

export default function Hero(props: Props) {
  const { data: { site } } = useSiteData()
  return (
    <BrowserWindow className="hero" label="Introduction">
      <Header {...props} />
      <div className="hbody">
        <div className="txt">
          <div className="hi">Hi, I’m</div>
          <h1 className="name"><span className="l1">Shravani</span> <span className="l2">Jagtap</span></h1>
          <div className="role">
            Data Analyst
            <svg viewBox="0 0 32 32" fill="none" stroke="#0B2348" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="18" width="5" height="9" /><rect x="13" y="12" width="5" height="15" /><rect x="22" y="6" width="5" height="21" /></svg>
          </div>
          <p className="sub">Turning data into insights for <span className="ul">smarter</span> decisions</p>
          <TypeLine />
          <div className="row">
            <Link className="btn" to="/projects" onClick={() => props.onSelect('projects')}><span aria-hidden="true">📊</span> Explore My Work →</Link>
            <Link className="btn ghost" to="/playground"><span aria-hidden="true">🎮</span> Play with my data</Link>
          </div>
          <ResumeButtons />
        </div>

        <div className="pwrap">
          <div className="blob" aria-hidden="true" />
          <div className="portrait">
            {site.portrait ? (
              <img src={site.portrait} alt="Portrait of Shravani Jagtap" />
            ) : (
              <>
                <svg viewBox="0 0 100 130" width="70%" aria-hidden="true"><circle cx="50" cy="42" r="22" fill="#0B2348" opacity=".25" /><path d="M8 130c0-34 18-50 42-50s42 16 42 50z" fill="#0B2348" opacity=".25" /></svg>
                <small>Portrait placeholder</small>
              </>
            )}
          </div>
        </div>
      </div>
      <button className="scr" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' })}><span className="mouse" aria-hidden="true" />Scroll Down ↓</button>
    </BrowserWindow>
  )
}