
import { useState } from 'react'

const rounds = [
  {
    weather: '☀️ Hot summer day',
    day: 'Saturday',
    discount: '20% discount on cold drinks',
    products: [
      { name: 'Lemonade', emoji: '🍋', sales: 140 },
      { name: 'Chips', emoji: '🍟', sales: 90 },
      { name: 'Ice Cream', emoji: '🍦', sales: 110 }
    ]
  },
  {
    weather: '🌧️ Rainy day',
    day: 'Sunday',
    discount: '10% discount on snacks',
    products: [
      { name: 'Coffee', emoji: '☕', sales: 130 },
      { name: 'Ice Cream', emoji: '🍦', sales: 65 },
      { name: 'Biscuits', emoji: '🍪', sales: 105 }
    ]
  },
  {
    weather: '❄️ Cold winter day',
    day: 'Monday',
    discount: '15% discount on hot drinks',
    products: [
      { name: 'Juice', emoji: '🧃', sales: 55 },
      { name: 'Coffee', emoji: '☕', sales: 150 },
      { name: 'Sandwich', emoji: '🥪', sales: 95 }
    ]
  }
]

export default function ShoppingDetective() {
  const [round, setRound] = useState(0)
  const [choice, setChoice] = useState('')
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)

  const game = rounds[round]
  const winner = [...game.products].sort(
    (a, b) => b.sales - a.sales
  )[0]

  const nextRound = () => {
    setRound((round + 1) % rounds.length)
    setChoice('')
    setRevealed(false)
  }

  return (
    <div className="shopping-game">
      <div className="shopping-illustration">🛒</div>

      <h3>Predict the bestseller!</h3>

      <p>Round {round + 1} of {rounds.length}</p>

      <div className="shopping-clues">
        <p>🌤️ Weather: {game.weather}</p>
        <p>📅 Day: {game.day}</p>
        <p>🏷️ Offer: {game.discount}</p>
      </div>

      <p>Which product will sell the most?</p>

      <div className="shopping-products">
        {game.products.map((product) => (
          <button
            key={product.name}
            disabled={revealed}
            className={
              choice === product.name ? 'selected' : ''
            }
            onClick={() => setChoice(product.name)}
          >
            <span>{product.emoji}</span>
            {product.name}
          </button>
        ))}
      </div>

      {!revealed ? (
        <button
          disabled={!choice}
          onClick={() => {
            setRevealed(true)
            if (choice === winner.name) {
              setScore(score + 1)
            }
          }}
        >
          Reveal sales ✨
        </button>
      ) : (
        <div className="shopping-result">
          <h3>
            {choice === winner.name
              ? '🎉 Excellent prediction!'
              : '🤔 Not quite!'}
          </h3>

          <p>
            {winner.emoji} {winner.name} was the bestseller!
          </p>

          {game.products.map((product) => (
            <p key={product.name}>
              {product.name}: {product.sales} sales
            </p>
          ))}

          <p>🏆 Your score: {score}</p>

          <button onClick={nextRound}>
            Next Round →
          </button>
        </div>
      )}
    </div>
  )
}
