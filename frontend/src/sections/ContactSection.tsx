import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSiteData } from '../context/SiteData'
import { sendContact } from '../api/client'
import ContactIntro from '../components/ContactIntro'

export default function ContactSection() {
  const { data: { site } } = useSiteData()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const n = String(f.get('n')).trim(), em = String(f.get('e')).trim(), m = String(f.get('m')).trim()
    const errs: Record<string, string> = {}
    if (!n) errs.n = 'Enter your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) errs.e = 'Enter a valid email address.'
    if (!m) errs.m = 'Write a message.'
    setErrors(errs)
    if (Object.keys(errs).length) { setStatus('Fix the highlighted fields.'); return }

    setBusy(true)
    setStatus('Sending…')
    try {
      await sendContact({ name: n, email: em, message: m })
      form.reset()
      setStatus('Thanks! Your message has been sent.')
    } catch {
      setStatus('Could not send your message right now. Please email me directly instead.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="sec rv" id="contact" aria-labelledby="kh">
      <h2 id="kh">Contact</h2>
      <div className="cgrid">
        <div>
          <ContactIntro />
        </div>
        <form onSubmit={submit} noValidate>
          <label>Name<input name="n" autoComplete="name" required /><span className="err">{errors.n}</span></label>
          <label>Email<input name="e" type="email" autoComplete="email" required /><span className="err">{errors.e}</span></label>
          <label>Message<textarea name="m" rows={4} required /><span className="err">{errors.m}</span></label>
          <button className="btn" type="submit" disabled={busy}>Send message</button>
          <div id="fm" role="status">{status}</div>
        </form>
      </div>
    </section>
  )
}
