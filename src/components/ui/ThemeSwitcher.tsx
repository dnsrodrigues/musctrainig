import { useTheme, ACCENT_THEMES } from '../../context/ThemeContext'

interface ThemeSwitcherProps {
  /** modo compacto (linha horizontal de bolinhas) ou expandido (com label) */
  compact?: boolean
}

/**
 * Seletor de cor accent. Em compact, mostra só os 6 círculos.
 * No modo expandido, exibe label "TEMA · Nome" + bolinhas.
 */
export function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const { accentId, setAccent, currentAccent } = useTheme()

  if (compact) {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {ACCENT_THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setAccent(t.id)}
            title={t.name}
            aria-label={`Mudar accent para ${t.name}`}
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: t.accent,
              cursor: 'pointer',
              padding: 0,
              border: accentId === t.id ? '2px solid var(--text)' : '2px solid transparent',
              outline: accentId === t.id ? '1px solid var(--text-faint)' : 'none',
              transition: 'transform 0.12s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '12px 10px',
        borderTop: '1px solid var(--hairline)',
        marginTop: 4,
      }}
    >
      <div
        style={{
          fontSize: 9,
          color: 'var(--text-faint)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 8,
          paddingLeft: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 600,
        }}
      >
        <span>Tema</span>
        <span className="f-mono" style={{ color: 'var(--accent)' }}>
          {currentAccent.name}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6, paddingLeft: 4 }}>
        {ACCENT_THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setAccent(t.id)}
            title={t.name}
            aria-label={`Mudar accent para ${t.name}`}
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: t.accent,
              cursor: 'pointer',
              padding: 0,
              border: accentId === t.id ? '2px solid var(--text)' : '2px solid transparent',
              boxShadow: accentId === t.id ? `0 0 0 1px ${t.accent}` : 'none',
              transition: 'transform 0.12s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        ))}
      </div>
    </div>
  )
}
