import { ChevronRight, Edit2, UserPlus } from 'lucide-react'
import type { Workout } from '../types'
import { WEEK_DAY_SHORT } from '../types'

interface WorkoutCardProps {
  workout: Workout
  isToday?: boolean
  onClick: () => void
  onEdit?: () => void
  onAssign?: () => void
  usageCount?: number
}

export function WorkoutCard({
  workout,
  isToday = false,
  onClick,
  onEdit,
  onAssign,
  usageCount,
}: WorkoutCardProps) {
  const exerciseCount = workout.exercises?.length ?? 0
  const daysLabel = workout.week_days
    .map((d) => WEEK_DAY_SHORT[d])
    .join(' · ')

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)',
        border: isToday
          ? '1px solid var(--accent)'
          : '1px solid var(--border)',
        borderLeft: isToday
          ? '3px solid var(--accent)'
          : '3px solid var(--border)',
        borderRadius: 4,
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background 0.15s',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--accent)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        if (!isToday) {
          el.style.borderColor = 'var(--border)'
          el.style.borderLeftColor = 'var(--border)'
        }
      }}
    >
      {/* Badge HOJE */}
      {isToday && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontFamily: "'DM Mono', monospace",
            fontSize: 8,
            fontWeight: 400,
            letterSpacing: '0.15em',
            padding: '2px 6px',
            borderRadius: 2,
          }}
        >
          HOJE
        </div>
      )}

      {/* Nome */}
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 15,
          color: 'var(--fg)',
          marginBottom: 4,
          paddingRight: isToday ? 48 : 0,
          lineHeight: 1.2,
        }}
      >
        {workout.name}
      </div>

      {/* Metadados */}
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: 'var(--fg-3)',
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {daysLabel && <span>{daysLabel}</span>}
        {exerciseCount > 0 && (
          <span style={{ opacity: 0.6 }}>
            {exerciseCount} exercício{exerciseCount !== 1 ? 's' : ''}
          </span>
        )}
        {workout.is_template && usageCount !== undefined && (
          <span style={{ opacity: 0.5 }}>
            usado por {usageCount} aluno{usageCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Ações admin (editar / atribuir) */}
      {(onEdit || onAssign) && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            marginTop: 10,
            paddingTop: 10,
            borderTop: '1px solid var(--border)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {onEdit && (
            <button
              onClick={onEdit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'transparent',
                border: '1px solid var(--border-md)',
                borderRadius: 4,
                padding: '4px 10px',
                color: 'var(--fg-2)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              <Edit2 size={10} />
              Editar
            </button>
          )}
          {onAssign && (
            <button
              onClick={onAssign}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'transparent',
                border: '1px solid rgba(200,240,74,0.3)',
                borderRadius: 4,
                padding: '4px 10px',
                color: 'var(--accent)',
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                textTransform: 'uppercase',
              }}
            >
              <UserPlus size={10} />
              Atribuir
            </button>
          )}
        </div>
      )}

      {/* Seta de navegação (sem ações admin) */}
      {!onEdit && !onAssign && (
        <ChevronRight
          size={14}
          style={{
            position: 'absolute',
            right: 14,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--fg-3)',
            opacity: 0.4,
          }}
        />
      )}
    </div>
  )
}
