
import { useState } from 'react'
import Hero from '../components/Hero'
import ProjectPreview from '../components/ProjectPreview'
import CertificatePreview from '../components/CertificatePreview'
import ExperiencePreview from '../components/ExperiencePreview'
import AboutPreview from '../components/AboutPreview'
import BottomNavigation from '../components/BottomNavigation'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'
import { useActiveSection } from '../hooks/useActiveSection'
import { useReveal } from '../hooks/useReveal'
import { useSiteData } from '../context/SiteData'
import type { Theme } from '../hooks/useTheme'
import EducationPreview from '../components/EducationPreview'

type Open = { kind: 'project' | 'cert'; i: number } | null

const ids = ['home', 'about', 'contact']

export default function HomePage({
  theme,
  setTheme
}: {
  theme: Theme
  setTheme: (t: Theme) => void
}) {
  const [active, setActive] = useActiveSection(ids)
  const [open, setOpen] = useState<Open>(null)

  const {
    data: { projects, certificates: certs }
  } = useSiteData()

  useReveal()

  const p = open?.kind === 'project' ? projects[open.i] : null
  const c = open?.kind === 'cert' ? certs[open.i] : null

  return (
    <>
      <main>
        <div className="grid" id="home">
          <Hero
            active={active}
            onSelect={setActive}
            theme={theme}
            setTheme={setTheme}
          />

          {/* Right-side cards */}
          <div className="side">

            {/* 1. About */}
            <AboutPreview onSelect={setActive} />

            {/* 2. My Journey */}
            <ExperiencePreview onSelect={setActive} />

            {/* 3. My Projects */}
<ProjectPreview
  onSelect={setActive}
  onOpen={i => setOpen({ kind: 'project', i })}
/>

{/* 4. Education */}
<EducationPreview />

{/* 5. Certificates */}
<CertificatePreview
  onSelect={setActive}
  onOpen={i => setOpen({ kind: 'cert', i })}
/>

          </div>
        </div>

        <BottomNavigation active={active} onSelect={setActive} />

        <AboutSection />
        <ContactSection />
      </main>

      <Footer />

      <Modal
        open={!!open}
        title={p?.title ?? c?.title ?? ''}
        onClose={() => setOpen(null)}
        actions={
          <>
            {p?.url && (
              <a
                className="btn sm"
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open project
              </a>
            )}

            {p?.code && (
              <a
                className="lnk"
                href={p.code}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </a>
            )}

            {c?.url && (
              <a
                className="btn sm"
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open credential
              </a>
            )}
          </>
        }
      >
        {p && (
          <>
            <p>{p.description}</p>
            <div className="tags">
              {p.tech.map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </>
        )}

        {c && (
          <>
            <p>
              {c.provider || 'Recognition'}
              {c.date && ` · ${c.date}`}
            </p>

            {c.image && (
              <img
                className="cimg"
                src={c.image}
                alt={`${c.title} certificate`}
              />
            )}
          </>
        )}
      </Modal>
    </>
  )
}
