import { useSiteData } from '../context/SiteData'

export default function SkillsCard() {
  const { data: { skills } } = useSiteData()
  return (
    <div className="skills">
      <h3>My Skills ☀️</h3>
      <div>
        {skills.map(s => (
          <button key={s.name} className="sk" data-n={s.name} style={{ background: s.bg }} aria-label={s.name}>{s.icon}</button>
        ))}
      </div>
    </div>
  )
}
