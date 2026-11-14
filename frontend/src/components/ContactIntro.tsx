import { useSiteData } from '../context/SiteData'

// Optional GIF: put a file in /public and set e.g. '/wave.gif'.
// Leave it empty to use the animated waving hand instead.
const GIF = ''
const RESUME = '/Shravani Jagtap.pdf'

type Link = { icon: string; label: string; text: string; href: string; external?: boolean }

export default function ContactIntro() {
  const { data: { site } } = useSiteData()
  const links: Link[] = [
    { icon: '✉️', label: 'Email', text: site.email, href: `mailto:${site.email}` },
    { icon: '📄', label: 'Resume', text: 'View or download PDF', href: RESUME, external: true },
  ]

  return (
    <div className="ci">
      <div className="ci-top">
        {GIF
          ? <img className="ci-gif" src={GIF} alt="Friendly wave" />
          : <span className="wave" aria-hidden="true">👋</span>}
        <p className="ci-bubble">Thank you for stopping by!</p>
      </div>

      <p className="ci-cursive">If something here sparked an idea, a question or an opportunity, I’d love to hear from you.</p>
      <p className="ci-open">If you think I could be a good fit, let’s talk. I’m open to opportunities where I can learn fast, own my work and add real value to the team.</p>

      <ul className="ci-links">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <span className="ci-ico" aria-hidden="true">{l.icon}</span>
              <span><b>{l.label}</b><small>{l.text}</small></span>
            </a>
          </li>
        ))}
      </ul>

      <div className="ci-social">
        {site.linkedin && <a className="btn sm" href={site.linkedin} target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>}
        {site.github && <a className="btn sm ghost" href={site.github} target="_blank" rel="noopener noreferrer">💻 GitHub</a>}
      </div>

      <p className="ci-sign">Let’s build something valuable together. <span>— Shravani</span></p>
    </div>
  )
}