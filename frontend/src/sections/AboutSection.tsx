const about = {
  headline: 'Most people see data. I see stories waiting to be decoded, and systems waiting to be taught.',
  intro: 'My journey runs from spreadsheets to machine learning to Generative AI, and I learn best by building.',
  stats: [
    { value: '1M+', label: 'selfies verified' },
    { value: 'Guinness', label: 'World Record contributor' },
    { value: 'Deloitte AU', label: 'Data Analytics simulation' },
    { value: 'IBM · Anthropic', label: 'AI learning credentials' },
  ],
  highlights: [
    { icon: '🏆', title: 'Record-breaking scale', text: 'Built a Streamlit platform to verify 1M+ selfies for the Meri Mati Mera Desh campaign, contributing to a Guinness World Record for the World’s Largest Selfie Album.' },
    { icon: '🔍', title: 'Fraud & forensics mindset', text: 'Audited financial data at a risk consultancy. In Deloitte Australia’s Data Analytics simulation, built classification logic to flag Fair, Unfair and Highly Discriminative pay gaps, plus a Tableau dashboard to spot factory downtime.' },
    { icon: '🤖', title: 'Teaching machines to read', text: 'Built a Naive Bayes model that classifies raw bank transaction narrations into categories, plus an SMS spam detector. I’m drawn to turning unstructured text into structured insight.' },
    { icon: '🎬', title: 'Recommendation & similarity', text: 'Created a content-based movie recommender using feature vectorization and cosine similarity.' },
    { icon: '📊', title: 'Dashboards that talk', text: 'Swiggy Customer & Delivery Analytics (Excel, Pivot Tables, XLOOKUP, slicers) and a Video Game Sales Dashboard, built so anyone can understand the business in seconds.' },
    { icon: '🚀', title: 'Currently exploring', text: 'LLMs, RAG, LangChain and AI agents, backed by IBM SkillsBuild and Anthropic’s AI Fluency certification.' },
  ],
  belief: 'AI is only as intelligent as the data and the questions behind it. Tools and models will keep changing, but curiosity, honesty about what the data can and can’t say, and the habit of learning by doing will always matter.',
  motto: 'I’d rather build one thing that works than talk about ten that might.',
}

export default function AboutSection() {
  return (
    <section className="sec rv" id="about" aria-labelledby="ah">
      <h2 id="ah">About</h2>
      <p className="a-head">{about.headline} <span aria-hidden="true">🧠✨</span></p>
      <p className="a-intro">{about.intro}</p>

      <ul className="a-stats" aria-label="Highlights">
        {about.stats.map(s => (
          <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>
        ))}
      </ul>

      <div className="cards">
        {about.highlights.map(h => (
          <article className="pc" key={h.title}>
            <div className="ico" style={{ fontSize: 36 }} aria-hidden="true">{h.icon}</div>
            <h3>{h.title}</h3>
            <p>{h.text}</p>
          </article>
        ))}
      </div>

      <blockquote className="a-belief">
        <p>{about.belief}</p>
        <footer>{about.motto}</footer>
      </blockquote>
    </section>
  )
}