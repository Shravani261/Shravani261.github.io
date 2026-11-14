
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { useReveal } from '../hooks/useReveal'
import type { Theme } from '../hooks/useTheme'
import type { CSSProperties } from 'react'
import '../styles/playground.css'

const GAMES = [
  {
    id: 'house',
    title: 'House Price Detective',
    description: 'Guess the price of a dream house.',
    emoji: '🏡',
    difficulty: 'Easy',
    category: 'Machine Learning',
    theme: 'house'
  },
  {
    id: 'shopping',
    title: 'Shopping Detective',
    description: 'Predict which product will sell the most.',
    emoji: '🛒',
    difficulty: 'Easy',
    category: 'Data Analytics',
    theme: 'shopping'
  },
  {
    id: 'spam',
    title: 'Spam Detective',
    description: 'Find suspicious messages before AI does.',
    emoji: '💌',
    difficulty: 'Fun',
    category: 'Artificial Intelligence',
    theme: 'spam'
  }
]

export default function PlaygroundPage({
  theme,
  setTheme
}: {
  theme: Theme
  setTheme: (t: Theme) => void
}) {
  useReveal()

  return (
    <PageShell
      theme={theme}
      setTheme={setTheme}
      emoji="🎮"
      title="Playground"
      intro="Explore, experiment, and discover how AI works. No technical knowledge needed — just have fun!"
    >
      <section className="split-playground">

        {/* LEFT INTRODUCTION PANEL */}

        <div className="playground-intro-panel">

          <div className="intro-decoration intro-circle-one" />
          <div className="intro-decoration intro-circle-two" />

          <span className="intro-small-star">✨</span>

          <h2 className="split-title">
            Playground
          </h2>

          <div className="split-title-underline" />

          <h3>✨ Think you can outsmart AI?</h3>

          <p className="split-description">
            Guess house prices, predict shopping trends,
            and challenge an AI spam detector.
          </p>

          <div className="no-tech-badge">
            No technical knowledge needed —
            just have fun! 🎮
          </div>

          <div className="controller-art">
            🎮
          </div>

          <div className="intro-star star-one">✦</div>
          <div className="intro-star star-two">✧</div>

          <span className="intro-bottom-text">
            PLAY · LEARN · ENJOY
          </span>

        </div>

        {/* RIGHT GAME SELECTION PANEL */}

        <div className="playground-games-panel">

          <div className="games-panel-heading">

            <div>
              <span className="games-eyebrow">
                THE GAME ZONE
              </span>

              <h2>Choose your challenge</h2>

              <p>Pick a game and let's play!</p>
            </div>

            <div className="games-total">
              🎮 03
            </div>

          </div>

          {/* GAME CARDS */}

          <div className="split-game-list">

            {GAMES.map((game, index) => (

              <article
                key={game.id}
                className={`split-game-card ${game.theme} rvz`}
                style={{
                  '--d': `${index * 110}ms`
                } as CSSProperties}
              >

                {/* ORIGINAL EMOJI ICONS */}

                <div className={`split-game-illustration ${game.theme}-illustration`}>
                  <span>{game.emoji}</span>
                </div>

                {/* GAME INFORMATION */}

                <div className="split-game-info">

                  <h3>{game.title}</h3>

                  <p>{game.description}</p>

                  <div className="split-game-meta">

                    <span>{game.difficulty}</span>

                    <span className="game-category">
                      {game.category}
                    </span>

                  </div>

                </div>

                {/* NAVIGATE TO INDIVIDUAL GAME */}

                <Link
                  to={`/playground/${game.id}`}
                  className="split-play-button"
                  aria-label={`Play ${game.title}`}
                >
                  Play <span>→</span>
                </Link>

              </article>

            ))}

          </div>

          {/* FOOTER */}

          <div className="split-panel-footer">
            <span>💡</span>
            Every game is a little adventure into AI!
          </div>

        </div>

      </section>
    </PageShell>
  )
}
