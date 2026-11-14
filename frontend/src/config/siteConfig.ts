/* ===== Replace placeholders here ===== */
export type ProjectCategory = 'ml' | 'dashboard' | 'analytics'
export interface Project {
  title: string; icon: string; description: string; tech: string[]; url: string; code: string
  category: ProjectCategory
  highlights: string[]   // short bullet points shown in the project popup
}
export interface Cert { provider: string; title: string; icon: string; date: string; url: string; image: string }
export interface Stage {
  id: string; when: string; place: string; title: string; icon: string
  summary: string; bullets: string[]; skills: string[]; color: string
  link?: { to: string; label: string }
}
export const site = {
  email: 'Shravanijagtap261@gmail.com', // PLACEHOLDER
  linkedin: 'https://www.linkedin.com/in/shravani-jagtap-913188290',
  github: 'https://github.com/Shravani261',                      // e.g. https://github.com/...
  portrait: '/myphoto1.png',                    // PLACEHOLDER: '/portrait.png' (file in /public) or URL
  aboutPhoto: '',                  // PLACEHOLDER: landscape photo
}

export const nav = [
  { id: 'home', label: 'Home', to: '/', color: '#2385CF', hover: '#1a6fb3' },
  { id: 'experience', label: 'Experience', to: '/experience', color: '#FFE08A', hover: '#ffc83d' },
  { id: 'projects', label: 'Projects', to: '/projects', color: '#BFE3FF', hover: '#7cc3ff' },
  { id: 'certificates', label: 'Certificates', to: '/certificates', color: '#E5CCFF', hover: '#c79bff' },
  { id: 'playground', label: 'Playground 🎮', to: '/playground', color: '#FFC2D9', hover: '#ff8fb8' },
  { id: 'about', label: 'About', to: '/#about', color: '#A4E2C7', hover: '#5fd0a0' },
  { id: 'contact', label: 'Contact', to: '/#contact', color: '#FFBD91', hover: '#ff9a5c' },
  {
  id: 'education',
  label: 'Education',
  to: '/education',
  color: '#BFE3FF',
  hover: '#7cc3ff'
},
]

export const skills = [
  { name: 'Python', icon: '🐍', bg: '#dbeafe' },
  { name: 'SQL', icon: 'SQL', bg: '#e5e7eb' },
  { name: 'Power BI', icon: '📊', bg: '#fde9a9' },
  { name: 'Data Visualization', icon: '📈', bg: '#e0dcff' },
  { name: 'Microsoft Excel', icon: 'X', bg: '#c9efd6' },
]

export const projects: Project[] = [
  {
    title: 'Bank Transaction Classification', icon: '🏦', category: 'ml',
    description: 'Classifies raw bank transaction narrations into spending categories using text features and a Naive Bayes model.',
    highlights: ['Turns unstructured transaction text into structured categories', 'Naive Bayes classifier on text features', 'Built with Python, Pandas and scikit-learn'],
    tech: ['Python', 'scikit-learn', 'Pandas', 'Naive Bayes'], url: '', code: '',
  },
  {
    title: 'SMS Spam Detector', icon: '📩', category: 'ml',
    description: 'A text classifier that separates spam from genuine SMS messages.',
    highlights: ['Text classification on short, noisy messages', 'Try the same idea yourself in the Playground'],
    tech: ['Python', 'NLP', 'Machine Learning'], url: '', code: '',
  },
  {
    title: 'Movie Recommendation System', icon: '🎬', category: 'ml',
    description: 'A content-based recommender that suggests movies using feature vectorization and cosine similarity.',
    highlights: ['Feature vectorization of movie content', 'Cosine similarity to rank the closest matches', 'Built with Python, NumPy and Pandas'],
    tech: ['Python', 'NumPy', 'Pandas', 'Cosine Similarity'], url: '', code: '',
  },
  {
    title: 'Meri Mati Mera Desh Selfie Platform', icon: '🏆', category: 'analytics',
    description: 'A Streamlit platform that verified 1M+ selfies for the Meri Mati Mera Desh campaign, which contributed to a Guinness World Record for the World’s Largest Selfie Album.',
    highlights: ['Verified 1M+ selfies at scale', 'Part of a Guinness World Record', 'Built with Python and Streamlit'],
    tech: ['Python', 'Streamlit'], url: '', code: '',
  },
  {
    title: 'Video Game Sales Dashboard', icon: '🎮', category: 'dashboard',
    description: 'An interactive dashboard exploring global game sales by platform, genre and publisher.',
    highlights: ['SQL for the analysis, Power BI for the visuals', 'Slice sales by platform, genre and publisher'],
    tech: ['SQL', 'Power BI'], url: '', code: '',
  },
  {
    title: 'Swiggy Customer & Delivery Analytics', icon: '🛵', category: 'dashboard',
    description: 'A customer and delivery analytics dashboard built so anyone can understand the business in seconds.',
    highlights: ['Pivot Tables and XLOOKUP for the analysis', 'Slicers for interactive exploration'],
    tech: ['Excel', 'Pivot Tables', 'XLOOKUP', 'Slicers'], url: '', code: '',
  },
  {
    title: 'Deloitte Data Analytics Simulation', icon: '🔍', category: 'analytics',
    description: 'Deloitte Australia job simulation: classification logic to flag Fair, Unfair and Highly Discriminative pay gaps, plus a dashboard to spot factory downtime.',
    highlights: ['Pay-gap classification logic: Fair, Unfair, Highly Discriminative', 'Tableau dashboard to spot factory downtime', 'Completed July 2026'],
    tech: ['Data Analysis', 'Tableau', 'Forensic Technology'], url: '', code: '',
  },
]

export const certs: Cert[] = [
  { provider: 'IBM SkillsBuild', title: 'Machine Learning for Data Science Projects', icon: '🔷', date: '26 May 2026', url: 'https://skills.yourlearning.ibm.com/certificate/PLAN-D8E7C82C1D76', image: '/certs/ML.jpeg' },
  { provider: 'Deloitte · via Forage', title: 'Data Analytics Job Simulation', icon: '🟢', date: 'July 2026', url: '', image: '/certs/Deloitte.png' },
  { provider: 'Anthropic', title: 'AI Fluency Framework', icon: '✳️', date: '', url: '', image: '/certs/Anthropic.jpeg' },
  { provider: 'Mahajan & Aibara', title: 'Champions at Work', icon: '🏆', date: '12 May 2025', url: '', image: '/certs/champions.jpeg' },
]

/* ===== Experience journey: edit freely. `when` is optional (leave '' to hide it). ===== */
export const journey: Stage[] = [
  {
    id: 'audit', when: '2025', place: 'Mahajan & Aibara', title: 'Where it started: auditing financial data', icon: '🔍', color: '#FFE08A',
    summary: 'My first taste of real data was financial data at a risk consultancy, where a single wrong number matters.',
    bullets: ['Audited financial data with a fraud and forensics mindset', 'Recognised with the “Champions at Work” award (12 May 2025)'],
    skills: ['Data auditing', 'Attention to detail', 'Excel'],
  },
  {
    id: 'dashboards', when: '', place: 'Self-driven projects', title: 'Spreadsheets to dashboards', icon: '📊', color: '#BFE3FF',
    summary: 'I learned to make numbers speak: first in Excel, then with SQL and Power BI.',
    bullets: ['Swiggy Customer & Delivery Analytics in Excel (Pivot Tables, XLOOKUP, slicers)', 'Video Game Sales Dashboard with SQL and Power BI'],
    skills: ['Excel', 'SQL', 'Power BI'],
    link: { to: '/projects', label: 'See the dashboards' },
  },
  {
    id: 'record', when: '', place: 'Meri Mati Mera Desh', title: 'Scaling up: a Guinness World Record', icon: '🏆', color: '#A4E2C7',
    summary: 'Contributed to a Guinness World Record by building a platform that verified 1M+ selfies.',
    bullets: ['Built a Streamlit platform to verify 1M+ selfies', 'Part of the World’s Largest Selfie Album record'],
    skills: ['Python', 'Streamlit'],
    link: { to: '/projects', label: 'See the project' },
  },
  {
    id: 'ml', when: 'May 2026', place: 'IBM SkillsBuild + projects', title: 'Teaching machines to read and recommend', icon: '🤖', color: '#E5CCFF',
    summary: 'Moved from describing data to predicting with it.',
    bullets: ['Naive Bayes bank transaction classifier and SMS spam detector', 'Content-based movie recommender with cosine similarity', 'IBM “Machine Learning for Data Science Projects” completed 26 May 2026'],
    skills: ['scikit-learn', 'NLP', 'Pandas', 'NumPy'],
    link: { to: '/certificates', label: 'View the certificate' },
  },
  {
    id: 'deloitte', when: 'July 2026', place: 'Deloitte Australia · Forage', title: 'Data analytics, the consulting way', icon: '🟢', color: '#FFC2D9',
    summary: 'A job simulation in data analysis and forensic technology.',
    bullets: ['Classification logic to flag Fair, Unfair and Highly Discriminative pay gaps', 'Tableau dashboard to spot factory downtime'],
    skills: ['Tableau', 'Data analysis', 'Forensic technology'],
  },
  {
    id: 'genai', when: 'Now', place: 'Always learning', title: 'Exploring GenAI and AI agents', icon: '🚀', color: '#FFBD91',
    summary: 'Today I am diving into LLMs, RAG, LangChain and AI agents, with the same habit of learning by building.',
    bullets: ['Anthropic AI Fluency certification', 'Hands-on with LLMs, RAG, LangChain and agents'],
    skills: ['LLMs', 'RAG', 'LangChain', 'AI agents'],
  },
]

export const about = {
  bio: 'I’m a data analyst who enjoys turning messy data into clear answers. I like finding the pattern behind a number and explaining it in plain language.',
  interests: 'Data cleaning, SQL analytics, dashboards, machine learning basics.',
  approach: 'Start with the question, check the data’s quality, build the simplest analysis that answers it, then present it visually.',
  goals: 'Grow as an analyst, ship projects that help teams decide faster, and keep learning.',
}
