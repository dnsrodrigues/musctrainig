interface ConfirmModalProps {
  title: string
  message: string
  confirmLabel?: string
  danger?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  title,
  message,
  confirmLabel = 'Confirmar',
  danger,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(6,7,26,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      onClick={onCancel}
    >
      <div
        className="card"
        style={{ width: '100%', maxWidth: 400, padding: 28, display: 'flex', flexDirection: 'column', gap: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: 18,
          margin: 0,
          color: 'var(--text)',
        }}>
          {title}
        </h2>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          {message}
        </p>
        <div className="row gap-2" style={{ marginTop: 8 }}>
          <button onClick={onCancel} className="btn ghost" style={{ flex: 1 }}>
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="btn primary"
            style={danger ? { flex: 1, background: 'var(--danger)', borderColor: 'var(--danger)' } : { flex: 1 }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
