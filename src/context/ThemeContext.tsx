import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type ColorMode = 'dark' | 'light'

interface ThemeContextValue {
  mode: ColorMode
  toggleMode: () => void
}

// ─── Contexto ────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'dark',
  toggleMode: () => {},
})

// ─── Provider ────────────────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ColorMode>(() => {
    const stored = localStorage.getItem('musc-color-mode')
    if (stored === 'dark' || stored === 'light') return stored
    // Detecta preferência do sistema operacional
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = mode
    localStorage.setItem('musc-color-mode', mode)
  }, [mode])

  // Aplica na montagem inicial (sem flash)
  useEffect(() => {
    document.documentElement.dataset.theme = mode
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function toggleMode() {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTheme() {
  return useContext(ThemeContext)
}
