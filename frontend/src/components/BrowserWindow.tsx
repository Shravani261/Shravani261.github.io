import type { ReactNode } from 'react'

interface Props { className?: string; label: string; children: ReactNode }

export default function BrowserWindow({ className = '', label, children }: Props) {
  return (
    <section className={`win ${className}`} aria-label={label}>
      <div className="bar" aria-hidden="true"><i /><i /><i /></div>
      {children}
    </section>
  )
}
