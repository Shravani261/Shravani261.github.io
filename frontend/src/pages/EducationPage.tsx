import PageShell from '../components/PageShell'
import type { Theme } from '../hooks/useTheme'
import '../styles/education.css'

export default function EducationPage({
  theme,
  setTheme
}: {
  theme: Theme
  setTheme: (t: Theme) => void
}) {
  return (
    <PageShell
      theme={theme}
      setTheme={setTheme}
      emoji="🎓"
      title="Education"
      intro="Learning, growing and building a strong foundation in Data Science & AI."
    >
      <section className="education-page">

        <div className="education-timeline">

          <article className="education-card">
            <span className="edu-icon">🎓</span>
            <h2>B.Sc. in Computer Science</h2>
            <p>Savitribai Phule Pune University</p>
            <div className="edu-stats">
              <span>CGPA 9.3</span>
              <span>3rd Rank</span>
            </div>
            <small>2020 – 2023</small>
          </article>

          <article className="education-card">
            <span className="edu-icon">📜</span>
            <h2>PG Diploma in Data Science & AI</h2>
            <p>Savitribai Phule Pune University</p>
            <div className="edu-stats">
              <span>CGPA 9.7</span>
              <span>2nd Rank</span>
            </div>
            <small>2023 – 2024</small>
          </article>

          <article className="education-card current">
            <span className="current-label">
              Currently Pursuing
            </span>
            <span className="edu-icon">🤖</span>
            <h2>AI Course at AccioJob</h2>
            <p>
              Building deeper skills in AI and advancing
              towards a career in Data Science & AI.
            </p>
          </article>

        </div>

        <div className="education-signature">
          <span>✦</span>
          A journey of continuous learning...
        </div>

      </section>
    </PageShell>
  )
}