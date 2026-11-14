import type { Cert, Project } from '../config/siteConfig'

const BASE = (import.meta.env.VITE_API_URL ?? '') as string

export interface Skill { id?: number; name: string; icon: string; bg: string }
export interface SiteInfo { email: string; linkedin: string; github: string; portrait: string; about_photo: string }
export interface AboutInfo { bio: string; interests: string; approach: string; goals: string }
export interface Portfolio {
  site: SiteInfo
  about: AboutInfo
  skills: Skill[]
  projects: Project[]
  certificates: Cert[]
}

export async function fetchPortfolio(): Promise<Portfolio> {
  const r = await fetch(`${BASE}/api/portfolio`)
  if (!r.ok) throw new Error(`API ${r.status}`)
  return r.json()
}

export async function sendContact(body: { name: string; email: string; message: string }): Promise<void> {
  const r = await fetch(`${BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!r.ok) throw new Error(`API ${r.status}`)
}
