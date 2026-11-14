
import { Link, useParams } from 'react-router-dom'
import PageShell from '../components/PageShell'

import HousePriceDetective from '../components/playground/HousePriceDetective'
import ShoppingDetective from '../components/playground/ShoppingDetective'
import SpamOrHam from '../components/playground/SpamOrHam'

import type { Theme } from '../hooks/useTheme'
import '../styles/playground.css'

const GAME_COMPONENTS = {
  house: {
    title: 'House Price Detective',
    emoji: '🏡',
    image: '/images/housepp.jpg',
    description: 'Explore the house and make your best price prediction.',
    component: HousePriceDetective
  },
  shopping: {
    title: 'Shopping Detective',
    emoji: '🛒',
    image: '/images/cart.jpg',
    description: 'Use the clues to predict the bestselling product.',
    component: ShoppingDetective
  },
  spam: {
    title: 'Spam Detective',
    emoji: '💌',
    image: null,
    description: 'Can you identify suspicious messages better than AI?',
    component: SpamOrHam
  }
}

type GameId = keyof typeof GAME_COMPONENTS

export default function PlaygroundGamePage({
  theme,
  setTheme
}: {
  theme: Theme
  setTheme: (t: Theme) => void
}) {
  const { gameId } = useParams<{ gameId: string }>()

  const game = gameId && gameId in GAME_COMPONENTS
    ? GAME_COMPONENTS[gameId as GameId]
    : undefined

  if (!game) {
    return (
      <PageShell
        theme={theme}
        setTheme={setTheme}
        emoji="🎮"
        title="Game not found"
        intro="This game does not exist."
      >
        <Link to="/playground">
          ← Back to Playground
        </Link>
      </PageShell>
    )
  }

  const GameComponent = game.component

  return (
    <PageShell
      theme={theme}
      setTheme={setTheme}
      emoji={game.emoji}
      title={game.title}
      intro={game.description}
    >

      <section className="individual-game-page">

        {/* BACK BUTTON */}
        <Link
          to="/playground"
          className="back-playground"
        >
          ← Back to all games
        </Link>

        {/* GAME WINDOW */}
        <div className="individual-game-window">

          {/* GAME HEADER */}
          <div className="individual-game-header">

            <div className="individual-game-heading">

              <div className="individual-game-image">
                {game.image ? (
                  <img
                    src={game.image}
                    alt={game.title}
                  />
                ) : (
                  <span>{game.emoji}</span>
                )}
              </div>

              <div>
                <span>THE INTERACTIVE ZONE</span>

                <h2>
                  {game.emoji} {game.title}
                </h2>

                <p>{game.description}</p>
              </div>

            </div>

            <span className="live-game-badge">
              ● LIVE GAME
            </span>

          </div>

          {/* EXISTING GAME COMPONENT */}
          <div className="individual-game-content">
            <GameComponent />
          </div>

          {/* FOOTER */}
          <div className="individual-game-footer">
            ✨ Have fun experimenting!
          </div>

        </div>

      </section>

    </PageShell>
  )
}
