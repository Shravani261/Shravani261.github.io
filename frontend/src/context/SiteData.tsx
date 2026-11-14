
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import {
  about as aboutDefault,
  certs as certsDefault,
  projects as projectsDefault,
  site as siteDefault,
  skills as skillsDefault
} from '../config/siteConfig'
import { fetchPortfolio } from '../api/client'
import type { Portfolio } from '../api/client'

// Defaults from siteConfig.ts
const fallback: Portfolio = {
  site: siteDefault,
  about: aboutDefault,
  certificates: certsDefault,
  projects: projectsDefault,
  skills: skillsDefault,
}

interface Ctx {
  data: Portfolio
  fromApi: boolean
}

const SiteDataContext = createContext<Ctx>({
  data: fallback,
  fromApi: false
})

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Ctx>({
    data: fallback,
    fromApi: false
  })

  useEffect(() => {
    let alive = true

    fetchPortfolio()
      .then(d => {
        if (alive) {
          setState({
            data: {
              ...d,
              projects: projectsDefault,
              certificates: certsDefault,
              site: {
                ...d.site,
                portrait: d.site?.portrait || siteDefault.portrait,
                about_photo: d.site?.about_photo || siteDefault.about_photo,
                email: siteDefault.email,
                linkedin: siteDefault.linkedin,
                github: siteDefault.github,
              }
            },
            fromApi: true
          })
        }
      })
      .catch(() => {
        // Keep fallback content
      })

    return () => {
      alive = false
    }
  }, [])

  return (
    <SiteDataContext.Provider value={state}>
      {children}
    </SiteDataContext.Provider>
  )
}

export const useSiteData = () => useContext(SiteDataContext)
