import BrowserWindow from './BrowserWindow'
import { useSiteData } from '../context/SiteData'

export default function AboutPreview({ onSelect }: { onSelect: (id: string) => void }) {
  const { data: { site } } = useSiteData()
  return (
    <BrowserWindow className="pv" label="About preview">
      <div className="pvb">
        <div>
          <h2>About Me</h2>
          <p>I contributed building a platform that verified 1M+ selfies for Meri Mati Mera Desh, part of a Guinness World Record. Now I turn data into stories.</p>
          <a className="btn sm" href="#about" onClick={() => onSelect('about')}>Know More →</a>
        </div>
        <div className="ph">
          <span className="badge">🏆 Guinness World Record · Meri Mati Mera Desh</span>
          <img src="/Guinness.jpeg" alt="Shravani Jagtap with the Guinness World Record certificate" />
        </div>
      </div>
    </BrowserWindow>
  )
}
