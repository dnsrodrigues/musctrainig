import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { getWorkoutById } from '../services/workout.service'
import { Topbar } from '../components/layout/Topbar'
import { Icon } from '../components/ui/Icon'
import { MUSCLE_GROUP_LABELS, WEEK_DAY_LABELS } from '../types'
import type { Workout } from '../types'

export function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [workout, setWorkout] = useState<Workout | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    if (!id) return
    setLoading(true)
    setError(null)
    try {
      const data = await getWorkoutById(id)
      setWorkout(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar ficha')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [id])

  const daysLabel = workout?.week_days.map((d) => WEEK_DAY_LABELS[d]).join(' · ') ?? ''
  const exercises = (workout?.exercises ?? []).slice().sort((a, b) => a.order_index - b.order_index)
  const totalSets = exercises.reduce((sum, e) => sum + (e.sets ?? 0), 0)

  // Grupos musculares únicos
  const groups = Array.from(
    new Set(exercises.map((e) => e.exercise?.muscle_group).filter(Boolean))
  )

  return (
    <>
      <Topbar
        eyebrow={daysLabel || 'FICHA DE TREINO'}
        title={workout?.name?.toUpperCase() ?? '—'}
        actions={
          <>
            <Link to="/workouts" className="btn ghost">
              <Icon name="arrowL" size={14} /> Voltar
            </Link>
            {workout && exercises.length > 0 && (
              <button
                className="btn primary"
                onClick={() => navigate(`/workouts/${id}/session`)}
              >
                <Icon name="play" size={12} /> Iniciar treino
              </button>
            )}
          </>
        }
      />

      <div className="content">
        {loading && (
          <>
            <div className="skeleton" style={{ height: 120, borderRadius: 14 }} />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 60, borderRadius: 14 }} />
            ))}
          </>
        )}

        {!loading && error && (
          <div
            className="card"
            style={{ borderLeft: '2px solid var(--danger)', background: 'rgba(255,61,85,0.05)' }}
          >
            <div style={{ color: 'var(--danger)', marginBottom: 8 }}>⚠ {error}</div>
            <button onClick={load} className="btn ghost">Tentar novamente</button>
          </div>
        )}

        {!loading && !error && workout && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            {/* Header card: stats da ficha */}
            <div className="card forja-detail-header">
              <div>
                {workout.description && (
                  <div style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 18 }}>
                    {workout.description}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {groups.map((g) => (
                    <span key={g} className="chip muscle">{MUSCLE_GROUP_LABELS[g!]}</span>
                  ))}
                </div>
              </div>
              <div className="forja-detail-stats">
                <div>
                  <div className="stat-label">Exercícios</div>
                  <div className="f-display" style={{ fontSize: 56, color: 'var(--text)' }}>
                    {String(exercises.length).padStart(2, '0')}
                  </div>
                </div>
                <div className="divider-v" style={{ height: 64, alignSelf: 'center' }} />
                <div>
                  <div className="stat-label">Séries totais</div>
                  <div className="f-display" style={{ fontSize: 56, color: 'var(--accent)' }}>
                    {totalSets}
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de exercícios */}
            {exercises.length === 0 ? (
              <div
                className="card"
                style={{
                  borderStyle: 'dashed',
                  textAlign: 'center',
                  padding: '40px 24px',
                  color: 'var(--text-dim)',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
                Nenhum exercício cadastrado nesta ficha.
              </div>
            ) : (
              <div className="col gap-2">
                <div className="label-sm" style={{ marginBottom: 8 }}>
                  {exercises.length} exercício{exercises.length !== 1 ? 's' : ''}
                </div>
                {exercises.map((ex, i) => (
                  <div
                    key={ex.id}
                    className="card"
                    style={{ padding: '16px 20px' }}
                  >
                    <div className="forja-detail-row">
                      <div className="pill-num" style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          className="f-display"
                          style={{ fontSize: 24, color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}
                        >
                          {(ex.exercise?.name ?? 'Exercício').toUpperCase()}
                        </div>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                          {ex.exercise?.muscle_group && (
                            <span className="chip muscle" style={{ fontSize: 9, padding: '2px 8px' }}>
                              {MUSCLE_GROUP_LABELS[ex.exercise.muscle_group]}
                            </span>
                          )}
                          {ex.notes && (
                            <span style={{ fontSize: 11, color: 'var(--text-faint)', fontStyle: 'italic' }}>
                              {ex.notes}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="forja-detail-row-stats">
                        <div>
                          <div className="stat-label">Séries</div>
                          <div className="f-mono" style={{ fontSize: 16, color: 'var(--text)', fontWeight: 600 }}>
                            {ex.sets}
                          </div>
                        </div>
                        <div>
                          <div className="stat-label">Reps</div>
                          <div className="f-mono" style={{ fontSize: 16, color: 'var(--text)', fontWeight: 600 }}>
                            {ex.reps}
                          </div>
                        </div>
                        <div>
                          <div className="stat-label">Carga</div>
                          <div
                            className="f-mono"
                            style={{ fontSize: 16, color: 'var(--accent)', fontWeight: 600 }}
                          >
                            {ex.suggested_load ? `${ex.suggested_load}kg` : '—'}
                          </div>
                        </div>
                        <div>
                          <div className="stat-label">Desc.</div>
                          <div className="f-mono" style={{ fontSize: 16, color: 'var(--text-dim)', fontWeight: 600 }}>
                            {ex.rest_seconds}s
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <style>{`
        .forja-detail-header {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 32px;
          align-items: center;
        }
        .forja-detail-stats {
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .forja-detail-row {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          gap: 18px;
          align-items: center;
        }
        .forja-detail-row-stats {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .forja-detail-header {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .forja-detail-stats {
            justify-content: flex-start;
          }
          .forja-detail-row {
            grid-template-columns: 40px 1fr;
            gap: 14px;
          }
          .forja-detail-row-stats {
            grid-column: 1 / -1;
            justify-content: space-between;
            gap: 12px;
            padding-top: 12px;
            border-top: 1px solid var(--hairline);
          }
        }
      `}</style>
    </>
  )
}
