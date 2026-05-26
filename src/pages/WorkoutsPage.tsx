import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useAuth } from '../context/AuthContext'
import { getMyWorkouts } from '../services/workout.service'
import { getWorkoutHistory } from '../services/history.service'
import { Topbar } from '../components/layout/Topbar'
import { Icon } from '../components/ui/Icon'
import type { Workout, WeekDay, WorkoutLog } from '../types'
import { MUSCLE_GROUP_LABELS, WEEK_DAY_LABELS, WEEK_DAY_SHORT } from '../types'

const DAY_MAP: Record<number, WeekDay> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
}

const WEEK_ORDER: WeekDay[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export function WorkoutsPage() {
  const { profile } = useAuth()
  const navigate = useNavigate()

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [history, setHistory] = useState<WorkoutLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const todayKey = DAY_MAP[new Date().getDay()]

  async function load() {
    if (!profile?.id) return
    setLoading(true)
    setError(null)
    try {
      const [w, h] = await Promise.all([
        getMyWorkouts(profile.id),
        getWorkoutHistory(profile.id),
      ])
      setWorkouts(w)
      setHistory(h)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar fichas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [profile?.id])

  // Stats da semana
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7)) // segunda-feira
  weekStart.setHours(0, 0, 0, 0)
  const sessionsThisWeek = history.filter((h) => {
    return new Date(h.started_at).getTime() >= weekStart.getTime()
  })

  const totalDuration = sessionsThisWeek.reduce((sum, s) => sum + (s.duration_minutes ?? 0), 0)

  // Constrói a "semana" — uma linha por dia útil + ficha (ou descanso)
  const weekDays = WEEK_ORDER.map((day) => {
    const workout = workouts.find((w) => w.week_days.includes(day))
    const isToday = day === todayKey
    const sessionForToday = workout
      ? sessionsThisWeek.find((s) => {
          const d = new Date(s.started_at)
          return DAY_MAP[d.getDay()] === day
        })
      : undefined
    return {
      day,
      workout,
      isToday,
      done: Boolean(sessionForToday),
    }
  })

  return (
    <>
      <Topbar
        eyebrow={`MINHA ROTINA · SEMANA ${weekDays.filter((d) => d.workout).length} DIAS`}
        title="PLANO DA SEMANA"
        actions={
          <>
            {(() => {
              const today = weekDays.find((d) => d.isToday)
              if (today?.workout && !today.done) {
                return (
                  <button
                    className="btn primary"
                    onClick={() => navigate(`/workouts/${today.workout!.id}/session`)}
                  >
                    <Icon name="play" size={12} /> Iniciar treino
                  </button>
                )
              }
              return null
            })()}
          </>
        }
      />

      <div className="content">
        {/* Stats */}
        <div className="forja-workouts-stats">
          <div className="card">
            <div className="stat-label">Concluídos</div>
            <div className="f-display" style={{ fontSize: 48, color: 'var(--success)' }}>
              {loading ? '…' : `${sessionsThisWeek.length} / ${weekDays.filter((d) => d.workout).length}`}
            </div>
          </div>
          <div className="card">
            <div className="stat-label">Tempo · semana</div>
            <div className="f-display" style={{ fontSize: 48, color: 'var(--text)' }}>
              {loading ? '…' : totalDuration}
              <span className="stat-unit" style={{ fontSize: 14 }}>min</span>
            </div>
          </div>
          <div className="card">
            <div className="stat-label">Fichas ativas</div>
            <div className="f-display" style={{ fontSize: 48, color: 'var(--accent)' }}>
              {loading ? '…' : workouts.length}
            </div>
          </div>
          <div className="card">
            <div className="stat-label">Histórico total</div>
            <div className="f-display" style={{ fontSize: 48, color: 'var(--text)' }}>
              {loading ? '…' : history.length}
            </div>
          </div>
        </div>

        {/* Erro */}
        {!loading && error && (
          <div
            className="card"
            style={{ borderLeft: '2px solid var(--danger)', background: 'rgba(255,61,85,0.05)' }}
          >
            <div style={{ color: 'var(--danger)', marginBottom: 8 }}>⚠ {error}</div>
            <button onClick={load} className="btn ghost">
              Tentar novamente
            </button>
          </div>
        )}

        {/* Sem fichas */}
        {!loading && !error && workouts.length === 0 && (
          <div
            className="card"
            style={{ borderStyle: 'dashed', textAlign: 'center', padding: '40px 24px' }}
          >
            <div style={{ fontSize: 36, marginBottom: 12 }}>📋</div>
            <h2 className="f-display" style={{ fontSize: 28, color: 'var(--text)', marginBottom: 6 }}>
              NENHUMA FICHA AINDA
            </h2>
            <div style={{ color: 'var(--text-dim)', fontSize: 13 }}>
              Seu personal ainda não criou fichas para você.
            </div>
          </div>
        )}

        {/* Lista de dias */}
        {!loading && !error && workouts.length > 0 && (
          <div className="col gap-3">
            {weekDays.map(({ day, workout, isToday, done }, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="card"
                style={{
                  padding: 0,
                  borderColor: isToday ? 'var(--accent)' : 'var(--hairline)',
                  borderLeft: isToday ? '3px solid var(--accent)' : '1px solid var(--hairline)',
                  opacity: !workout ? 0.7 : 1,
                  cursor: workout ? 'pointer' : 'default',
                  transition: 'border-color 0.15s',
                }}
                onClick={() => workout && navigate(`/workouts/${workout.id}`)}
              >
                <div className="forja-workouts-row">
                  {/* Dia */}
                  <div className="forja-workouts-day">
                    <div
                      className="label-sm"
                      style={{ color: isToday ? 'var(--accent)' : 'var(--text-dim)' }}
                    >
                      {WEEK_DAY_LABELS[day].toUpperCase()}
                    </div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                      {!workout && <span className="chip">DESCANSO</span>}
                      {workout && done && <span className="chip success">CONCLUÍDO</span>}
                      {workout && isToday && !done && <span className="chip solid">HOJE</span>}
                      {workout && !isToday && !done && <span className="chip">PROGRAMADO</span>}
                    </div>
                  </div>

                  {/* Treino */}
                  <div>
                    <h2
                      className="f-display"
                      style={{ fontSize: 36, margin: 0, lineHeight: 1, color: 'var(--text)' }}
                    >
                      {workout ? workout.name.toUpperCase() : 'DESCANSO'}
                    </h2>
                    {workout && (
                      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                        {(() => {
                          const groups = Array.from(
                            new Set(
                              (workout.exercises ?? [])
                                .map((e) => e.exercise?.muscle_group)
                                .filter(Boolean)
                            )
                          )
                          return groups.slice(0, 3).map((g) => (
                            <span key={g} className="chip muscle">
                              {MUSCLE_GROUP_LABELS[g!]}
                            </span>
                          ))
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Stats + ação */}
                  <div className="forja-workouts-actions">
                    {workout && (
                      <div style={{ display: 'flex', gap: 22 }}>
                        <div>
                          <div className="stat-label">Exerc.</div>
                          <div className="f-display" style={{ fontSize: 24, color: 'var(--text)' }}>
                            {workout.exercises?.length ?? 0}
                          </div>
                        </div>
                        <div>
                          <div className="stat-label">Séries</div>
                          <div className="f-display" style={{ fontSize: 24, color: 'var(--text)' }}>
                            {(workout.exercises ?? []).reduce((sum, e) => sum + (e.sets ?? 0), 0)}
                          </div>
                        </div>
                      </div>
                    )}
                    {workout && isToday && !done && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/workouts/${workout.id}/session`)
                        }}
                        className="btn primary"
                      >
                        <Icon name="play" size={12} /> Iniciar
                      </button>
                    )}
                    {workout && (!isToday || done) && (
                      <button
                        className="btn ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/workouts/${workout.id}`)
                        }}
                      >
                        Ver <Icon name="arrow" size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {loading && (
          <div className="col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="skeleton" style={{ height: 88, borderRadius: 14 }} />
            ))}
          </div>
        )}

        {/* Loading dummy var usado só para evitar warning */}
        <div style={{ display: 'none' }}>{WEEK_DAY_SHORT[todayKey]}</div>

        {/* Fallback: lista de fichas que não estão em nenhum dia da semana */}
        {!loading && !error && workouts.length > 0 && (() => {
          const unscheduled = workouts.filter((w) => w.week_days.length === 0)
          if (unscheduled.length === 0) return null
          return (
            <div style={{ marginTop: 16 }}>
              <Link to="#" className="label-sm" style={{ textDecoration: 'none' }}>
                Fichas sem agendamento ({unscheduled.length})
              </Link>
              <div className="col gap-2" style={{ marginTop: 10 }}>
                {unscheduled.map((w) => (
                  <div
                    key={w.id}
                    className="card"
                    style={{ cursor: 'pointer', padding: '14px 18px' }}
                    onClick={() => navigate(`/workouts/${w.id}`)}
                  >
                    <div
                      className="f-display"
                      style={{ fontSize: 22, color: 'var(--text)' }}
                    >
                      {w.name.toUpperCase()}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>
                      {w.exercises?.length ?? 0} exercícios — sem dia agendado
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })()}
      </div>

      <style>{`
        .forja-workouts-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .forja-workouts-row {
          display: grid;
          grid-template-columns: 160px 1fr auto;
          align-items: center;
          padding: 22px 26px;
          gap: 24px;
        }
        .forja-workouts-day { min-width: 0; }
        .forja-workouts-actions {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        @media (max-width: 900px) {
          .forja-workouts-stats { grid-template-columns: repeat(2, 1fr); }
          .forja-workouts-row {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 18px 20px;
          }
          .forja-workouts-actions {
            justify-content: space-between;
            gap: 12px;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  )
}
