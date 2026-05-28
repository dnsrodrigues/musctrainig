import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { Icon } from './Icon'

const schema = z.object({
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export function ForcePasswordModal() {
  const { user, refreshProfile } = useAuth()
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError('')
    try {
      const { error: authError } = await supabase.auth.updateUser({ password: data.password })
      if (authError) throw authError

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ must_change_password: false })
        .eq('id', user!.id)
      if (profileError) throw profileError

      await refreshProfile()
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Erro ao atualizar senha')
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(6,7,26,0.96)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        className="card"
        style={{ width: '100%', maxWidth: 420, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <div>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-dim)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            Primeiro acesso
          </div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 22, margin: 0, color: 'var(--text)' }}>
            DEFINA SUA SENHA
          </h2>
          <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
            Por segurança, você precisa criar uma senha pessoal antes de continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="col gap-3" noValidate>
          <div className="col gap-2">
            <label style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
              Nova senha
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="input"
                type={showPw ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                style={{ paddingRight: 40 }}
                {...register('password')}
              />
              <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Ocultar' : 'Mostrar'} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 4, display: 'flex', alignItems: 'center' }}>
                <Icon name={showPw ? 'eyeOff' : 'eye'} size={16} />
              </button>
            </div>
            {errors.password && (
              <div style={{ fontSize: 11, color: 'var(--danger)', letterSpacing: '0.04em' }}>⚠ {errors.password.message}</div>
            )}
          </div>

          <div className="col gap-2">
            <label style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
              Confirmar senha
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="input"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                style={{ paddingRight: 40 }}
                {...register('confirmPassword')}
              />
              <button type="button" tabIndex={-1} onClick={() => setShowConfirm(v => !v)} aria-label={showConfirm ? 'Ocultar' : 'Mostrar'} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: 4, display: 'flex', alignItems: 'center' }}>
                <Icon name={showConfirm ? 'eyeOff' : 'eye'} size={16} />
              </button>
            </div>
            {errors.confirmPassword && (
              <div style={{ fontSize: 11, color: 'var(--danger)', letterSpacing: '0.04em' }}>⚠ {errors.confirmPassword.message}</div>
            )}
          </div>

          {serverError && (
            <div style={{ padding: '10px 14px', background: 'rgba(255,61,85,0.08)', border: '1px solid rgba(255,61,85,0.25)', borderRadius: 'var(--r-2)', color: 'var(--danger)', fontSize: 12 }}>
              ⚠ {serverError}
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="btn primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
            {isSubmitting ? 'Salvando...' : 'Definir Senha e Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
