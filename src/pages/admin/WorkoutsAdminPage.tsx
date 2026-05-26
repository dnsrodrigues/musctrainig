import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, Plus, RefreshCw, Edit2, ChevronDown, ChevronRight } from 'lucide-react'
import { getTemplates, getWorkoutUsageCount, deactivateWorkout, getAllStudentWorkouts } from '../../services/workout.service'
import { WorkoutCard } from '../../components/WorkoutCard'
import { AssignWorkoutModal } from '../../components/AssignWorkoutModal'
import type { Workout, WorkoutWithStudent, WeekDay } from '../../types'
import { WEEK_DAY_SHORT } from '../../types'

export function WorkoutsAdminPage() {
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({})
  const [studentWorkouts, setStudentWorkouts] = useState<WorkoutWithStudent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [assignTarget, setAssignTarget] = useState<Workout | null>(null)
  // Controla quais alunos estão com a seção expandida
  const [expandedStudents, setExpandedStudents] = useState<Set<string>>(new Set())

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const [data, allStudentWorkouts] = await Promise.all([
        getTemplates(),
        getAllStudentWorkouts(),
      ])
      setWorkouts(data)
      setStudentWorkouts(allStudentWorkouts)

      // Carrega contagem de uso dos templates em paralelo
      const counts = await Promise.all(
        data.map(async (w) => ({ id: w.id, count: await getWorkoutUsageCount(w.id) }))
      )
      const countMap: Record<string, number> = {}
      counts.forEach(({ id, count }) => { countMap[id] = count })
      setUsageCounts(countMap)

      // Expande todos os alunos por padrão na primeira carga
      const studentIds = new Set(
        allStudentWorkouts.map((w) => w.student?.id ?? '').filter(Boolean)
      )
      setExpandedStudents(studentIds)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar fichas')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function toggleStudent(studentId: string) {
    setExpandedStudents((prev) => {
      const next = new Set(prev)
      if (next.has(studentId)) next.delete(studentId)
      else next.add(studentId)
      return next
    })
  }

  // Agrupa fichas de alunos por aluno
  const studentGroups = Object.values(
    studentWorkouts.reduce<Record<string, {
      student: { id: string; full_name: string; email: string }
      workouts: WorkoutWithStudent[]
    }>>((acc, w) => {
      const id = w.student?.id ?? 'sem-aluno'
      if (!acc[id]) {
        acc[id] = {
          student: w.student ?? { id: 'sem-aluno', full_name: 'Aluno desconhecido', email: '' },
          workouts: [],
        }
      }
      acc[id].workouts.push(w)
      return acc
    }, {})
  )

  // Disponível para uso futuro via botão dedicado na página
  async function handleDeactivate(workoutId: string) {
    if (!confirm('Desativar esta ficha? Alunos que a têm atribuída continuarão vendo-a.')) return
    try {
      await deactivateWorkout(workoutId)
      setWorkouts((prev) => prev.filter((w) => w.id !== workoutId))
    } catch {
      alert('Erro ao desativar ficha.')
    }
  }
  void handleDeactivate // suprime warning — será usado na Fase 9

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>

      {/* Grid lines decorativo */}
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} style={{ borderRight: '1px solid var(--border)' }} />
        ))}
      </div>

      {/* Header */}
      <header
        className="sticky top-0 z-20"
        style={{
          padding: '14px 16px',
          background: 'rgba(5,5,10,0.7)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-xl mx-auto flex items-center justify-between gap-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link
              to="/dashboard"
              style={{ color: 'var(--fg-3)', opacity: 0.5, display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: 'var(--fg-3)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: 1,
              }}>
                // admin
              </div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 16,
                color: 'var(--fg)',
              }}>
                Fichas de Treino
              </div>
            </div>
          </div>

          {/* Botão nova ficha */}
          <button
            onClick={() => navigate('/admin/workouts/new')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              background: 'var(--accent)',
              border: 'none',
              borderRadius: 4,
              padding: '8px 14px',
              color: 'var(--bg)',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 10,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            <Plus size={12} />
            Nova Ficha
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="relative z-10">
        <div className="max-w-xl mx-auto" style={{ padding: '20px 16px 40px' }}>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" style={{ height: 96, borderRadius: 4 }} />
              ))}
            </div>
          )}

          {/* Erro */}
          {!loading && error && (
            <div style={{
              borderLeft: '2px solid var(--danger)',
              background: 'rgba(239,68,68,0.05)',
              borderRadius: '0 4px 4px 0',
              padding: '12px 16px',
              marginBottom: 16,
            }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--danger)', marginBottom: 6 }}>
                ⚠ {error}
              </div>
              <button
                onClick={load}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: 'transparent', border: '1px solid var(--border-md)',
                  borderRadius: 4, padding: '5px 12px', color: 'var(--fg-2)',
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  letterSpacing: '0.1em', cursor: 'pointer', textTransform: 'uppercase',
                }}
              >
                <RefreshCw size={10} /> Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
            >

              {/* ── SEÇÃO: Biblioteca (Templates) ── */}
              <section>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: 'var(--fg-3)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 10,
                }}>
                  // biblioteca — {workouts.length} template{workouts.length !== 1 ? 's' : ''}
                </div>

                {workouts.length === 0 ? (
                  <div style={{
                    border: '1px dashed var(--border)',
                    borderRadius: 4,
                    padding: '32px 24px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>📋</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 14, color: 'var(--fg)', marginBottom: 8 }}>
                      Nenhuma ficha criada ainda
                    </div>
                    <button
                      onClick={() => navigate('/admin/workouts/new')}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        background: 'var(--accent)', border: 'none', borderRadius: 4,
                        padding: '9px 18px', color: 'var(--bg)',
                        fontFamily: "'Syne', sans-serif", fontWeight: 800,
                        fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                      }}
                    >
                      <Plus size={12} /> Criar primeira ficha
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {workouts.map((workout) => (
                      <WorkoutCard
                        key={workout.id}
                        workout={workout}
                        usageCount={usageCounts[workout.id] ?? 0}
                        onClick={() => navigate(`/admin/workouts/${workout.id}/edit`)}
                        onEdit={() => navigate(`/admin/workouts/${workout.id}/edit`)}
                        onAssign={() => setAssignTarget(workout)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* ── SEÇÃO: Fichas dos Alunos ── */}
              <section>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 12,
                  paddingBottom: 10,
                  borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: 'var(--fg-3)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    // fichas dos alunos — {studentGroups.length} aluno{studentGroups.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {studentGroups.length === 0 ? (
                  <div style={{
                    border: '1px dashed var(--border)',
                    borderRadius: 4,
                    padding: '24px',
                    textAlign: 'center',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 10,
                    color: 'var(--fg-3)',
                    fontStyle: 'italic',
                  }}>
                    // nenhum aluno tem ficha atribuída ainda
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {studentGroups.map(({ student, workouts: sw }) => {
                      const isExpanded = expandedStudents.has(student.id)
                      return (
                        <div key={student.id}>
                          {/* Cabeçalho do aluno — clicável para colapsar */}
                          <button
                            onClick={() => toggleStudent(student.id)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: 'var(--surface)',
                              border: '1px solid var(--border-md)',
                              borderRadius: isExpanded ? '4px 4px 0 0' : 4,
                              padding: '10px 14px',
                              cursor: 'pointer',
                              textAlign: 'left',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              {/* Avatar com iniciais */}
                              <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 4,
                                background: 'var(--accent)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: 11,
                                color: 'var(--bg)',
                                flexShrink: 0,
                              }}>
                                {student.full_name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()}
                              </div>
                              <div>
                                <div style={{
                                  fontFamily: "'Syne', sans-serif",
                                  fontWeight: 800,
                                  fontSize: 13,
                                  color: 'var(--fg)',
                                  lineHeight: 1.2,
                                }}>
                                  {student.full_name}
                                </div>
                                <div style={{
                                  fontFamily: "'DM Mono', monospace",
                                  fontSize: 9,
                                  color: 'var(--fg-3)',
                                  marginTop: 2,
                                }}>
                                  {sw.length} ficha{sw.length !== 1 ? 's' : ''}
                                </div>
                              </div>
                            </div>
                            <div style={{ color: 'var(--fg-3)', display: 'flex', alignItems: 'center' }}>
                              {isExpanded
                                ? <ChevronDown size={14} />
                                : <ChevronRight size={14} />
                              }
                            </div>
                          </button>

                          {/* Fichas do aluno */}
                          {isExpanded && (
                            <div style={{
                              border: '1px solid var(--border-md)',
                              borderTop: 'none',
                              borderRadius: '0 0 4px 4px',
                              overflow: 'hidden',
                            }}>
                              {sw.map((workout, idx) => {
                                const daysLabel = (workout.week_days ?? [])
                                  .map((d: WeekDay) => WEEK_DAY_SHORT[d])
                                  .join(' · ')
                                const isLast = idx === sw.length - 1

                                return (
                                  <div
                                    key={workout.id}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '12px 14px',
                                      borderBottom: isLast ? 'none' : '1px solid var(--border)',
                                      background: 'transparent',
                                      gap: 12,
                                    }}
                                  >
                                    {/* Info da ficha */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                      <div style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontWeight: 800,
                                        fontSize: 12,
                                        color: 'var(--fg)',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        marginBottom: 3,
                                      }}>
                                        {workout.name}
                                      </div>
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        flexWrap: 'wrap',
                                      }}>
                                        {daysLabel && (
                                          <span style={{
                                            fontFamily: "'DM Mono', monospace",
                                            fontSize: 9,
                                            color: 'var(--accent)',
                                            letterSpacing: '0.08em',
                                          }}>
                                            {daysLabel}
                                          </span>
                                        )}
                                        <span style={{
                                          fontFamily: "'DM Mono', monospace",
                                          fontSize: 9,
                                          color: 'var(--fg-3)',
                                        }}>
                                          {workout.exercises?.length ?? 0} exercícios
                                        </span>
                                      </div>
                                    </div>

                                    {/* Botão editar */}
                                    <button
                                      onClick={() => navigate(`/admin/workouts/${workout.id}/edit`)}
                                      title="Editar ficha"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        background: 'transparent',
                                        border: '1px solid var(--border-md)',
                                        borderRadius: 4,
                                        padding: '5px 10px',
                                        color: 'var(--fg-2)',
                                        fontFamily: "'DM Mono', monospace",
                                        fontSize: 9,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        cursor: 'pointer',
                                        flexShrink: 0,
                                        transition: 'border-color 0.15s, color 0.15s',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)'
                                        e.currentTarget.style.color = 'var(--accent)'
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-md)'
                                        e.currentTarget.style.color = 'var(--fg-2)'
                                      }}
                                    >
                                      <Edit2 size={10} />
                                      Editar
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </section>

            </motion.div>
          )}

        </div>
      </main>

      {/* Modal de atribuição */}
      {assignTarget && (
        <AssignWorkoutModal
          workout={assignTarget}
          onClose={() => setAssignTarget(null)}
          onAssigned={() => {
            setAssignTarget(null)
            load()
          }}
        />
      )}
    </div>
  )
}
