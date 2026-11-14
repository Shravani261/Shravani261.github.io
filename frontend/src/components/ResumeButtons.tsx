const RESUME = '/Shravani Jagtap.pdf'

export default function ResumeButtons() {
  return (
    <div className="row resume-row">
      <a className="btn ghost" href={RESUME} target="_blank" rel="noopener noreferrer">
        <span aria-hidden="true">📄</span> View Resume
      </a>
      <a className="btn ghost" href={RESUME} download="Shravani_Jagtap_Resume.pdf">
        <span aria-hidden="true">⬇</span> Download Resume
      </a>
    </div>
  )
}