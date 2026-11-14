import type { ReactNode } from 'react'
import BrowserWindow from './BrowserWindow'
import Header from './Header'
import Footer from './Footer'
import type { Theme } from '../hooks/useTheme'

interface Props { theme: Theme; setTheme: (t: Theme) => void; emoji: string; title: string; intro: string; children: ReactNode }

/** Common frame for the inner pages: browser window with the site header, a page title, then the page content. */
export default function PageShell({ theme, setTheme, emoji, title, intro, children }: Props) {
  return (
    <>
      <main className="inner">
        <BrowserWindow className="pagehead" label={`${title} page header`}>
          <Header theme={theme} setTheme={setTheme} />
          <div className="ph-body">
            <h1><span className="ph-emoji" aria-hidden="true">{emoji}</span> {title}</h1>
            <p>{intro}</p>
          </div>
        </BrowserWindow>
        {children}
      </main>
      <Footer />
    </>
  )
}
