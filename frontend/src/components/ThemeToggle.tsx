import type { Theme } from '../hooks/useTheme'

interface Props { theme: Theme; onChange: (t: Theme) => void }

export default function ThemeToggle({ theme, onChange }: Props) {
  return (
    <div className="tg" role="group" aria-label="Theme">
      <button aria-label="Light theme" aria-pressed={theme === 'light'} onClick={() => onChange('light')}>☀</button>
      <button aria-label="Dark theme" aria-pressed={theme === 'dark'} onClick={() => onChange('dark')}>☾</button>
    </div>
  )
}
