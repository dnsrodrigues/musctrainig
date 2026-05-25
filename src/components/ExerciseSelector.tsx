import { useState, useEffect, useRef } from 'react'
import { X, Search } from 'lucide-react'
import type { Exercise, MuscleGroup } from '../types'
import { MUSCLE_GROUP_LABELS } from '../types'
import { getExercises } from '../services/workout.service'

interface ExerciseSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (exercise: Exercise) => void
  excludeIds?: string[]
}

const ALL_MUSCLE_GROUPS = Object.entries(MUSCLE_GROUP_LABELS) as [MuscleGroup, string][]

export function ExerciseSelector({
  isOpen,
  onClose,
  onSelect,
  excludeIds = [],
}: ExerciseSelectorProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [filtered, setFiltered] = useState<Exercise[]>([])
  const [search, setSearch] = useState('')
  const [muscleFilter, setMuscleFilter] = useState<MuscleGroup | null>(null)
  const [loading, setLoading] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  // Carrega exercícios ao abrir
  useEffect(() => {
    if (!isOpen) return
    setLoading(true)
    getExercises()
      .then((data) => {
        setExercises(data)
        setFiltered(data.filter((e) => !excludeIds.includes(e.id)))
      })
      .finally(() => setLoading(false))

    setTimeout(() => searchRef.current?.focus(), 100)
  }, [isOpen])

  // Filtra em tempo real
  useEffect(() => {
    let result = exercises.filter((e) => !excludeIds.includes(e.id))
    if (muscleFilter) result = result.filter((e) => e.muscle_group === muscleFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((e) => e.name.toLowerCase().includes(q))
    }
    setFiltered(result)
  }, [search, muscleFilter, exercises, excludeIds])

  // Fecha com Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5,5,10,0.8)',
          zIndex: 40,
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 50,
          width: 'min(480px, calc(100vw - 32px))',
          maxHeight: 'calc(100vh - 80px)',
          background: 'var(--surface)',
          border: '1px solid var(--border-md)',
          borderTop: '2px solid var(--accent)',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header do modal */}
        <div
          style={{
            padding: '14px 16px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                color: 'var(--fg)',
              }}
            >
              Adicionar Exercício
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                color: 'var(--fg-3)',
                marginTop: 2,
                fontStyle: 'italic',
              }}
            >
              // {exercises.length} exercícios no catálogo
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--fg-3)',
              cursor: 'pointer',
              padding: 4,
              opacity: 0.5,
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Busca */}
        <div
          style={{
            padding: '10px 16px 0',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-md)',
              borderRadius: 4,
              padding: '7px 10px',
              marginBottom: 10,
            }}
          >
            <Search size={13} style={{ color: 'var(--fg-3)', opacity: 0.5, flexShrink: 0 }} />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar exercício..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--fg)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                flex: 1,
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--fg-3)', opacity: 0.5 }}
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Chips de grupo muscular */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
              paddingBottom: 10,
              overflowX: 'auto',
            }}
          >
            <button
              onClick={() => setMuscleFilter(null)}
              style={{
                background: muscleFilter === null ? 'var(--accent)' : 'transparent',
                border: `1px solid ${muscleFilter === null ? 'var(--accent)' : 'var(--border-md)'}`,
                borderRadius: 2,
                padding: '3px 8px',
                color: muscleFilter === null ? 'var(--bg)' : 'var(--fg-3)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Todos
            </button>
            {ALL_MUSCLE_GROUPS.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setMuscleFilter(muscleFilter === key ? null : key)}
                style={{
                  background: muscleFilter === key ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${muscleFilter === key ? 'var(--accent)' : 'var(--border-md)'}`,
                  borderRadius: 2,
                  padding: '3px 8px',
                  color: muscleFilter === key ? 'var(--bg)' : 'var(--fg-3)',
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de exercícios */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '8px 8px' }}>
          {loading && (
            <div
              style={{
                padding: '24px 16px',
                textAlign: 'center',
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              // carregando...
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div
              style={{
                padding: '24px 16px',
                textAlign: 'center',
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: 'var(--fg-3)',
                fontStyle: 'italic',
              }}
            >
              // nenhum exercício encontrado
            </div>
          )}

          {!loading &&
            filtered.map((exercise) => (
              <button
                key={exercise.id}
                onClick={() => {
                  onSelect(exercise)
                  onClose()
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: 3,
                  padding: '9px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(200,240,74,0.06)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    color: 'var(--fg)',
                  }}
                >
                  {exercise.name}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9,
                    color: 'var(--fg-3)',
                    opacity: 0.5,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {MUSCLE_GROUP_LABELS[exercise.muscle_group as MuscleGroup] ?? exercise.muscle_group}
                </span>
              </button>
            ))}
        </div>
      </div>
    </>
  )
}
