import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'
import { getTrainers } from '../../services/trainer.service'
import { Topbar } from '../../components/layout/Topbar'
import type { UserProfile } from '../../types'

export function StudentFormPage() {
  const navigate = useNavigate()
  const { profile, isSuperAdmin } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [trainerId, setTrainerId] = useState<string>(profile?.role === 'trainer' ? profile.id : '')
  const [trainers, setTrainers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isSuperAdmin) {
      getTrainers().then((data) => setTrainers(data.filter((t) => t.is_active))).catch(() => {})
    }
  }, [isSuperAdmin])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data, error: fnError } = await supabase.functions.invoke('manage-users', {
        body: { action: 'create-student', email, fullName, trainerId: trainerId || null },
      })
      if (fnError) {
        let msg = fnError.message
        try {
          const body = typeof data === 'object' && data !== null ? data : await fnError.context?.json()
          if (body?.error) msg = body.error
        } catch { /* usa msg padrão */ }
        throw new Error(msg)
      }
      setSuccess(true)
      setTimeout(() => navigate('/admin/students'), 2000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Erro ao criar aluno')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Topbar eyebrow="ALUNOS" title="NOVO ALUNO" />

      <div className="content" style={{ maxWidth: 480 }}>
        {success ? (
          <div className="card" style={{ textAlign: 'center', padding: 32, color: 'var(--accent)' }}>
            ✓ Aluno criado com sucesso! Redirecionando...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="col gap-4">
            <div className="col gap-2">
              <label style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
                Nome completo
              </label>
              <input
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Ex: João Silva"
              />
            </div>

            <div className="col gap-2">
              <label style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
                E-mail
              </label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="aluno@email.com"
              />
            </div>

            {isSuperAdmin && (
              <div className="col gap-2">
                <label style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: "'JetBrains Mono', monospace" }}>
                  Trainer responsável (opcional)
                </label>
                <select
                  className="input"
                  value={trainerId}
                  onChange={(e) => setTrainerId(e.target.value)}
                >
                  <option value="">— Sem trainer —</option>
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>{t.full_name}</option>
                  ))}
                </select>
              </div>
            )}

            {error && (
              <div className="card" style={{ borderLeft: '2px solid var(--danger)', padding: '10px 14px' }}>
                <span style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</span>
              </div>
            )}

            <div className="row gap-2" style={{ marginTop: 8 }}>
              <button type="button" onClick={() => navigate('/admin/students')} className="btn ghost" style={{ flex: 1 }}>
                Cancelar
              </button>
              <button type="submit" disabled={loading} className="btn primary" style={{ flex: 2 }}>
                {loading ? 'Criando...' : 'Criar Aluno'}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
