import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

interface Props { open: boolean; title: string; onClose: () => void; children: ReactNode; actions?: ReactNode }

export default function Modal({ open, title, onClose, children, actions }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} aria-labelledby="dlg-title" onClose={onClose} onClick={e => { if (e.target === ref.current) onClose() }}>
      <h3 id="dlg-title">{title}</h3>
      {children}
      <div className="row" style={{ marginTop: 18 }}>
        {actions}
        <button className="btn sm" onClick={onClose}>Close</button>
      </div>
    </dialog>
  )
}
