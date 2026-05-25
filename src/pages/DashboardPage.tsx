import { LogOut, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { useAuth } from '../context/AuthContext'
import { Avatar } from '../components/ui/Avatar'
import { Button } from '../components/ui/Button'
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher'

// Dashboard placeholder — será substituído na Fase 7

export function DashboardPage() {
  const { profile, isAdmin, signOut } = useAuth()

  const nameParts = (profile?.full_name ?? 'Atleta').split(' ')
  const firstName = nameParts[0]
  const lastName  = nameParts.slice(1).join(' ')

  async function handleLogout() {
    await signOut()
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Grid lines decorativo */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ borderRight: '1px solid var(--border)' }} />
        ))}
      </div>

      {/* ── Header ──────────────────────────────────── */}
      <header
        className="sticky top-0 z-20"
        style={{
          padding: '14px 16px',
          background: 'rgba(5,5,10,0.7)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}>
              MUSCLE TRAINING
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              fontStyle: 'italic',
              color: 'var(--fg-3)',
              letterSpacing: '0.1em',
              marginTop: 1,
            }}>
              // {isAdmin ? 'painel admin' : 'bem-vindo de volta'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              style={{ fontSize: 10, padding: '0 10px', height: 28 }}
            >
              <LogOut size={12} />
              Sair
            </Button>
            {profile?.full_name && (
              <Avatar name={profile.full_name} size="sm" />
            )}
          </div>
        </div>
      </header>

      {/* ── Conteúdo ─────────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 py-6 relative z-10">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: '2px solid var(--accent)',
            padding: '16px',
            marginBottom: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Hatch pattern */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 16px, rgba(200,240,74,0.025) 16px, rgba(200,240,74,0.025) 17px)',
            pointerEvents: 'none',
          }} />

          <div className="relative flex items-start justify-between gap-3">
            <div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: 4,
              }}>
                // bom dia
              </div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: '-0.01em',
                color: 'var(--fg)',
                lineHeight: 1,
              }}>
                {firstName}{' '}
                {lastName && (
                  <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                    {lastName}
                  </em>
                )}
              </div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                marginTop: 10,
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-light)',
                border: '1px solid rgba(200,240,74,0.25)',
                padding: '3px 8px',
                background: 'var(--accent-muted)',
              }}>
                {isAdmin ? '⭐ Personal Trainer' : '💪 Em treino'}
              </div>
            </div>

            {profile?.full_name && (
              <Avatar name={profile.full_name} size="md" />
            )}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--border)',
            marginBottom: 12,
          }}
        >
          {[
            { label: 'Treinos',  value: '—',   accent: true },
            { label: 'kg atual', value: profile?.weight        ? String(profile.weight)        : '—' },
            { label: 'kg alvo',  value: profile?.target_weight ? String(profile.target_weight) : '—' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'var(--surface)',
                padding: '12px 10px',
                textAlign: 'center',
              }}
            >
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 26,
                fontWeight: 800,
                color: stat.accent ? 'var(--accent)' : 'var(--fg)',
                display: 'block',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {stat.value}
              </span>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--fg-3)',
                marginTop: 4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Card — próximas fases */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'var(--surface)',
            border: '1px solid rgba(200,240,74,0.25)',
            boxShadow: '0 0 0 1px rgba(200,240,74,0.06), 0 4px 32px rgba(200,240,74,0.08)',
            padding: '20px',
            marginBottom: 8,
          }}
        >
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 12,
          }}>
            // status das fases
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { label: 'Auth',       done: true  },
              { label: 'Perfil',     done: true  },
              { label: 'Design v2',  done: true  },
              { label: 'Fichas',     done: false },
              { label: 'Treino',     done: false },
              { label: 'Histórico',  done: false },
            ].map((phase) => (
              <span
                key={phase.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '3px 9px',
                  border: '1px solid',
                  borderColor: phase.done ? 'rgba(200,240,74,0.3)' : 'var(--border-md)',
                  background: phase.done ? 'var(--accent-muted)' : 'transparent',
                  color: phase.done ? 'var(--accent-light)' : 'var(--fg-3)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {phase.done ? '✓' : '○'} {phase.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Link — perfil */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/perfil"
            className="flex items-center justify-between group"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '2px solid var(--surface-3)',
              padding: '12px 14px',
              transition: 'border-color 0.15s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderLeftColor = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderLeftColor = 'var(--surface-3)'
            }}
          >
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--fg)',
                letterSpacing: '0.03em',
              }}>
                Meu Perfil
              </div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: 'var(--fg-3)',
                letterSpacing: '0.04em',
                marginTop: 1,
                fontStyle: 'italic',
              }}>
                // ver e editar dados pessoais
              </div>
            </div>
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
              style={{ color: 'var(--fg-3)' }}
            />
          </Link>
        </motion.div>

      </main>
    </div>
  )
}
