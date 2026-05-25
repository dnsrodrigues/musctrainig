import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'motion/react'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ThemeSwitcher } from '../components/ui/ThemeSwitcher'

// ─── Validação ────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('Digite um e-mail válido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type LoginForm = z.infer<typeof loginSchema>

// ─── Página ───────────────────────────────────────────────────────────────────

export function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginForm) {
    setErrorMessage('')
    try {
      await signIn(data.email, data.password)
      navigate('/dashboard', { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : ''
      if (msg.includes('Invalid login credentials') || msg.includes('invalid_credentials')) {
        setErrorMessage('E-mail ou senha incorretos.')
      } else if (msg.includes('Email not confirmed')) {
        setErrorMessage('Confirme seu e-mail antes de entrar.')
      } else if (msg.includes('Too many requests')) {
        setErrorMessage('Muitas tentativas. Aguarde alguns minutos.')
      } else {
        setErrorMessage('Erro ao entrar. Verifique sua conexão.')
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >

      {/* Toggle dark/light — canto superior direito */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {/* Grid lines decorativo */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ borderRight: '1px solid var(--border)' }} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative z-10"
      >

        {/* ── Brand / Rings ─────────────────────────── */}
        <div className="flex flex-col items-center mb-8 gap-5">

          {/* Anéis animados */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: 120, height: 120 }}
          >
            {/* Ring externo */}
            <div
              className="absolute rounded-full"
              style={{
                width: 110, height: 110,
                border: '1px solid rgba(200,240,74,0.2)',
                animation: 'loginSpin 28s linear infinite',
              }}
            >
              <div style={{
                position: 'absolute',
                width: 7, height: 7,
                background: 'var(--accent)',
                borderRadius: '50%',
                top: 0, left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px var(--accent)',
              }} />
            </div>

            {/* Ring médio */}
            <div
              className="absolute rounded-full"
              style={{
                width: 78, height: 78,
                border: '1px dashed rgba(200,240,74,0.15)',
                animation: 'loginSpin 18s linear infinite reverse',
              }}
            />

            {/* Ring interno */}
            <div
              className="absolute rounded-full"
              style={{
                width: 50, height: 50,
                border: '1px solid rgba(200,240,74,0.3)',
                animation: 'loginSpin 10s linear infinite',
              }}
            />

            {/* Core */}
            <div style={{
              width: 28, height: 28,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 20px rgba(200,240,74,0.7), 0 0 40px rgba(200,240,74,0.25)',
              animation: 'coreGlow 4s ease-in-out infinite',
              position: 'relative',
              zIndex: 2,
            }} />
          </div>

          {/* Nome */}
          <div className="text-center">
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              lineHeight: 1,
            }}>
              MUSCLE TRAINING
            </h1>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontStyle: 'italic',
              color: 'var(--fg-3)',
              marginTop: 6,
              letterSpacing: '0.08em',
            }}>
              // seu treino · sua evolução
            </p>
          </div>
        </div>

        {/* ── Formulário ──────────────────────────────── */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border-md)',
          borderLeft: '2px solid var(--accent)',
          padding: '28px 24px',
        }}>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: '0.02em',
            color: 'var(--fg)',
            marginBottom: 4,
          }}>
            Bem-vindo de volta
          </h2>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            fontStyle: 'italic',
            color: 'var(--fg-3)',
            marginBottom: 24,
          }}>
            // entre com seu e-mail e senha
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: '10px 14px',
                  background: 'var(--danger-muted)',
                  border: '1px solid rgba(248,113,113,0.2)',
                  borderLeft: '2px solid var(--danger)',
                  color: 'var(--danger)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  letterSpacing: '0.03em',
                }}
              >
                ⚠ {errorMessage}
              </motion.div>
            )}

            <Button
              type="submit"
              size="lg"
              loading={isSubmitting}
              className="w-full mt-1"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar →'}
            </Button>
          </form>
        </div>

        {/* Rodapé */}
        <p style={{
          textAlign: 'center',
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          fontStyle: 'italic',
          color: 'var(--fg-3)',
          marginTop: 20,
        }}>
          // não tem conta? fale com seu personal trainer.
        </p>
      </motion.div>

      {/* Keyframes locais para os anéis */}
      <style>{`
        @keyframes loginSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes coreGlow {
          0%, 100% { transform: scale(1);   box-shadow: 0 0 20px rgba(200,240,74,0.7), 0 0 40px rgba(200,240,74,0.25); }
          50%       { transform: scale(1.2); box-shadow: 0 0 35px rgba(200,240,74,1),   0 0 60px rgba(200,240,74,0.4); }
        }
      `}</style>
    </div>
  )
}
