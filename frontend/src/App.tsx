import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ExperiencePage from './pages/ExperiencePage'
import ProjectsPage from './pages/ProjectsPage'
import CertificatesPage from './pages/CertificatesPage'
import PlaygroundPage from './pages/PlaygroundPage'
import NeuralBackground from './components/NeuralBackground'
import ScrollManager from './components/ScrollManager'
import { useTheme } from './hooks/useTheme'
import PlaygroundGamePage from './pages/PlaygroundGamePage'
import EducationPage from './pages/EducationPage'

export default function App() {
  const [theme, setTheme] = useTheme()
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => { first.current = false }, [])
  const tp = { theme, setTheme }

  return (
    <>
      <NeuralBackground />
      <ScrollManager />
      {/* colour wipe + slide-in on every page change (not on first load) */}
      {!first.current && <div key={`w${pathname}`} className="wipe" aria-hidden="true"><span>✦ loading insights…</span></div>}
      <div key={pathname} className={first.current ? 'page' : 'page slide'}>
        <Routes>
  <Route path="/" element={<HomePage {...tp} />} />
  <Route path="/experience" element={<ExperiencePage {...tp} />} />
  <Route path="/projects" element={<ProjectsPage {...tp} />} />
  <Route path="/education" element={<EducationPage {...tp} />} />
  <Route path="/certificates" element={<CertificatesPage {...tp} />} />
  <Route path="/playground" element={<PlaygroundPage {...tp} />} />

  <Route
    path="/playground/:gameId"
    element={
      <PlaygroundGamePage
        theme={theme}
        setTheme={setTheme}
      />
    }
  />

  {/* Keep wildcard route at the end */}
  <Route path="*" element={<HomePage {...tp} />} />
</Routes>
      </div>
    </>
  )
}
