import type { ReactNode } from 'react'

interface TopbarProps {
  /** Texto pequeno em cima do título (eyebrow). Opcional. */
  eyebrow?: string
  /** Título grande (Bebas Neue). */
  title: string
  /** Subtítulo logo abaixo do título. Opcional. */
  subtitle?: string
  /** Botões e chips à direita. */
  actions?: ReactNode
}

export function Topbar({ eyebrow, title, subtitle, actions }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        {eyebrow && (
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-dim)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </div>
        )}
        <div className="topbar-title">{title}</div>
        {subtitle && <div className="topbar-sub">{subtitle}</div>}
      </div>
      {actions && (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  )
}
