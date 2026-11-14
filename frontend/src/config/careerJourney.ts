/* =====================================================================
   Career Journey page content (the /experience page). Edit freely.

   - Only this page reads from this file. The Home-page preview still uses
     `journey` in siteConfig.ts, so nothing else on the site is affected.
   - Optional fields can be left out or set to '' and they simply won't show.
   - `organisation` for the Growth Intern chapter is intentionally empty:
     type the company name below when you are ready to show it.
   ===================================================================== */

export interface ChapterTheme { icon: string; label: string }

export interface Chapter {
  id: string
  /** role = a job, exploration = the transition period (never shown as a job), upcoming = new chapter, next = what's next */
  kind: 'role' | 'exploration' | 'upcoming' | 'next'
  color: string              // pastel accent for this chapter
  icon: string               // badge on the card
  mapLabel: string           // short name on the journey map (left)
  when?: string              // date chip on the card (and on the map unless mapWhen is set)
  mapWhen?: string           // optional shorter date for the narrow journey map
  heading: string            // card heading
  role?: string              // job title pill (used when the heading is a story title instead)
  organisation?: string      // shown only when filled in
  label?: string             // small pill, e.g. "Career exploration"
  summary: string[]          // one paragraph per entry
  milestone?: { icon: string; title: string; text: string }
  shift?: { fromIcon: string; from: string; toIcon: string; to: string }
  achievements?: string[]
  skills?: string[]
  themes?: ChapterTheme[]
  /** text on the little connector that leads to the next chapter */
  bridge?: string
  cta?: { label: string; to: string; primary?: boolean }[]
}

export const pageIntro =
  'From Data Analyst to Senior Data Analyst, through a year of exploration and growth, and now into business growth. Scroll down the path or jump to any chapter on the map.'

/** The one-line story shown above the timeline. `to` must match a chapter id. */
export const storySteps = [
  { to: 'data-analyst', icon: '📊', label: 'Data Analyst' },
  { to: 'senior-data-analyst', icon: '🏅', label: 'Senior Data Analyst' },
  { to: 'beyond-the-numbers', icon: '🧭', label: 'Explored & Learned' },
  { to: 'growth-intern', icon: '🌱', label: 'Business Growth' },
]

export const chapters: Chapter[] = [
  {
    id: 'data-analyst', kind: 'role', color: '#FFE08A', icon: '📊',
    mapLabel: 'Data Analyst', when: 'July 2024 – August 2025', mapWhen: 'Jul 2024 – Aug 2025',
    heading: 'Data Analyst',
    organisation: 'Mahajan & Aibara – Internal Audit and Risk Consultancy, Pune',
    summary: [
      'My professional journey began with financial data analysis and business intelligence. I worked on transforming raw data into meaningful insights, building dashboards and improving reporting processes.',
    ],
    achievements: [
      'Built interactive dashboards using Power BI and Looker.',
      'Automated data cleaning and validation using Python.',
      'Reduced manual data-processing effort by 50%.',
      'Developed strong foundations in financial data analysis and stakeholder communication.',
    ],
    skills: ['Excel', 'SQL', 'Python', 'Power BI', 'Looker', 'Data Visualization'],
    bridge: '⭐ Promoted',
  },
  {
    id: 'senior-data-analyst', kind: 'role', color: '#BFE3FF', icon: '📈',
    mapLabel: 'Senior Data Analyst', when: 'August 2025 – October 2025', mapWhen: 'Aug 2025 – Oct 2025',
    heading: 'Senior Data Analyst',
    organisation: 'Mahajan & Aibara – Internal Audit and Risk Consultancy, Pune',
    summary: [
      'Progressing into a Senior Data Analyst role was an important milestone in my career. I took on more complex analytical responsibilities, working with large financial datasets and applying analytical techniques to identify risks and meaningful patterns.',
    ],
    milestone: { icon: '🏅', title: 'Career milestone', text: 'Promoted from Data Analyst to Senior Data Analyst' },
    achievements: [
      'Analysed 100,000+ financial transactions.',
      'Helped reduce reporting errors by 30%.',
      'Applied statistical analysis, predictive modelling and anomaly detection.',
      'Improved fraud identification accuracy by 25%.',
      'Presented insights to non-technical stakeholders.',
    ],
    skills: ['Advanced Excel', 'SQL', 'Python', 'Statistical Analysis', 'Predictive Modelling', 'Anomaly Detection'],
    bridge: '🧭 Time to explore',
  },
  {
    id: 'beyond-the-numbers', kind: 'exploration', color: '#A4E2C7', icon: '🧭',
    mapLabel: 'Beyond the Numbers', when: 'October 2025 – September 2026', mapWhen: 'Oct 2025 – Sep 2026',
    label: '🧭 Career exploration',
    heading: 'Beyond the Numbers: A Year of Exploration and Growth',
    summary: [
      'After progressing from Data Analyst to Senior Data Analyst, I entered a period of professional exploration. While actively searching for suitable opportunities, I continued developing my technical capabilities, exploring new areas of business and analytics, and working on projects.',
      'This phase gave me time to reflect on my strengths, broaden my perspective and become more intentional about my career direction. It helped me recognise how my analytical background could contribute to broader business challenges.',
    ],
    themes: [
      { icon: '🧭', label: 'Professional exploration' },
      { icon: '📚', label: 'Continuous learning and upskilling' },
      { icon: '🛠️', label: 'Independent projects' },
      { icon: '🪜', label: 'Career development' },
      { icon: '🔗', label: 'Exploring the connection between analytics and business' },
    ],
    bridge: '🔄 The pivot',
  },
  {
    id: 'growth-intern', kind: 'upcoming', color: '#FFC2D9', icon: '🌱',
    mapLabel: 'Growth Intern', when: 'Joining October 2026', mapWhen: 'Joining Oct 2026',
    role: 'Growth Intern',
    organisation: '', // ← add the organisation name here when you want it shown
    heading: 'A New Chapter: Exploring Business Growth',
    shift: { fromIcon: '📊', from: 'Analytics', toIcon: '🌱', to: 'Business growth' },
    summary: [
      'Moving beyond traditional data analytics, I am expanding my professional perspective into business growth. I am exploring how analytical thinking, data-driven insights and business understanding can contribute to identifying opportunities and supporting strategic decisions.',
    ],
    themes: [
      { icon: '📈', label: 'Business growth' },
      { icon: '♟️', label: 'Strategic thinking' },
      { icon: '🧠', label: 'Data-driven decision-making' },
      { icon: '🔎', label: 'Understanding business opportunities' },
      { icon: '🤝', label: 'Combining analytics with business strategy' },
    ],
    bridge: '✨ Looking ahead',
  },
  {
    id: 'whats-next', kind: 'next', color: '#E5CCFF', icon: '✨',
    mapLabel: 'What’s Next?',
    label: '✨ What’s Next?',
    heading: 'Turning Insights Into Impact',
    summary: [
      'My journey continues with a commitment to learning, exploring new challenges and combining analytical thinking with business understanding to create meaningful impact.',
    ],
    cta: [
      { label: 'Let’s talk →', to: '/#contact', primary: true },
      { label: 'See what I built', to: '/projects' },
    ],
  },
]
