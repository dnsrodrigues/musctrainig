import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type ColorMode = 'dark' | 'light'

export interface AccentTheme {
  id: string
  name: string
  accent: string
  fg: string
}

export const ACCENT_THEMES: AccentTheme[] = [
  { id: 'lime',   name: 'Lime',   accent: '#d4ff3a', fg: '#0a0a0a' },
  { id: 'coral',  name: 'Coral',  accent: '#ff2e4d', fg: '#ffffff' },
  { id: 'orange', name: 'Forge',  accent: '#ff6b00', fg: '#0a0a0a' },
  { id: 'ice',    name: 'Ice',    accent: '#00d4ff', fg: '#0a0a0a' },
  { id: 'violet', name: 'Violet', accent: '#a78bfa', fg: '#0a0a0a' },
  { id: 'white',  name: 'Mono',   accent: '#f5f5f0', fg: '#0a0a0a' },
]

interface ThemeContextValue {
  mode: ColorMode
  toggleMode: () => void
  accentId: string
  setAccent: (id: string) => void
  currentAccent: AccentTheme
}

// ─── Contexto ────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  toggleMode: () => {},
  accentId: 'lime',
  setAccent: () => {},
  currentAccent: ACCENT_THEMES[0],
})

// ─── Aplica accent no document ───────────────────────────────────────────────

function applyAccent(t: AccentTheme) {
  const r = document.documentElement
  r.style.setProperty('--accent', t.accent)
  r.style.setProperty('--accent-fg', t.fg)
  r.style.setProperty('--accent-2', t.accent + 'cc')
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(() => {
    const stored = localStorage.getItem('musc-color-mode')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  const [accentId, setAccentId] = useState<string>(() => {
    return localStorage.getItem('forja-accent') || 'lime'
  })

  // Aplica color mode
  useEffect(() => {
    document.documentElement.dataset.theme = mode
    localStorage.setItem('musc-color-mode', mode)
  }, [mode])

  // Aplica accent
  useEffect(() => {
    const t = ACCENT_THEMES.find((x) => x.id === accentId) ?? ACCENT_THEMES[0]
    applyAccent(t)
    localStorage.setItem('forja-accent', t.id)
  }, [accentId])

  function toggleMode() {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const currentAccent = ACCENT_THEMES.find((x) => x.id === accentId) ?? ACCENT_THEMES[0]

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, accentId, setAccent: setAccentId, currentAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTheme() {
  return useContext(ThemeContext)
}
