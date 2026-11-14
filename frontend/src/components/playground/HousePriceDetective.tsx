
import { useState } from 'react'

export default function HousePriceDetective() {
  const [bedrooms, setBedrooms] = useState(3)
  const [area, setArea] = useState(1200)
  const [guess, setGuess] = useState('')
  const [revealed, setRevealed] = useState(false)

  // Illustrative simulated estimate, not a real property valuation.
  const estimate = Math.round(
    30 + bedrooms * 5 + area * 0.02
  )

  const checkGuess = () => {
    if (!guess || Number(guess) <= 0) return
    setRevealed(true)
  }

  return (
    <div className="house-game">
      <div className="house-illustration">🏡</div>

      <h3>Meet your dream house!</h3>
      <p>Explore its features and guess its price.</p>

      <label>Bedrooms: {bedrooms}</label>
      <input
        type="range"
        min="1"
        max="6"
        value={bedrooms}
        onChange={(e) => {
          setBedrooms(Number(e.target.value))
          setRevealed(false)
        }}
      />

      <label>House area: {area} sq. ft.</label>
      <input
        type="range"
        min="500"
        max="3000"
        step="100"
        value={area}
        onChange={(e) => {
          setArea(Number(e.target.value))
          setRevealed(false)
        }}
      />

      <label>Your price guess (₹ lakh)</label>
      <input
        type="number"
        min="1"
        value={guess}
        placeholder="Example: 75"
        onChange={(e) => {
          setGuess(e.target.value)
          setRevealed(false)
        }}
      />

      <button onClick={checkGuess}>
        Reveal AI estimate ✨
      </button>

      {revealed && (
        <div className="house-result">
          <h3>🏡 Estimated price: ₹{estimate} lakh</h3>
          <p>
            Your guess: ₹{guess} lakh
          </p>
          <p>
            Difference: ₹
            {Math.abs(Number(guess) - estimate)} lakh
          </p>
          <button onClick={() => {
            setGuess('')
            setRevealed(false)
          }}>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
