# Fase 5 — Fichas de Treino: Design Document

**Data:** 2026-05-25  
**Status:** Aprovado para implementação  
**Sessão de brainstorming:** 554-1779734956

---

## 1. Objetivo

Permitir que o **admin (personal trainer)** crie e gerencie fichas de treino, e que o **aluno** visualize as fichas atribuídas a ele, vendo qual treino fazer hoje.

---

## 2. Modelo de Dados

### Tabela `workouts` (adicionar colunas)

```sql
ALTER TABLE workouts
  ADD COLUMN IF NOT EXISTS is_template BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS template_id UUID REFERENCES workouts(id),
  ADD COLUMN IF NOT EXISTS days_of_week TEXT[] DEFAULT '{}';
  -- days_of_week: ['mon', 'wed', 'fri'] etc.
```

**Decisão:** Modelo misto.
- `is_template = true` → ficha na biblioteca, reutilizável, não pertence a aluno
- `is_template = false` + `user_id` → ficha do aluno (pode ter sido criada a partir de um template via `template_id`)
- Deletar = setar `is_active = false` (nunca deletar fisicamente)

### Tabela `workout_exercises` (nova)

```sql
CREATE TABLE workout_exercises (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id    UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
  exercise_id   UUID NOT NULL REFERENCES exercises(id),
  order_index   INTEGER NOT NULL DEFAULT 0,
  sets          INTEGER NOT NULL DEFAULT 3,
  reps          INTEGER NOT NULL DEFAULT 12,
  load_kg       NUMERIC(6,2),          -- carga em kg, pode ser null
  rest_seconds  INTEGER DEFAULT 60,    -- tempo de descanso
  notes         TEXT,                  -- observação do personal
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workout_exercises_workout ON workout_exercises(workout_id);
```

### RLS Policies

```sql
-- workout_exercises: aluno lê as suas, admin lê/escreve todas
ALTER TABLE workout_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "aluno_le_seus_exercicios" ON workout_exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM workouts w
      WHERE w.id = workout_exercises.workout_id
        AND (w.user_id = auth.uid() OR w.is_template = true)
    )
  );

CREATE POLICY "admin_gerencia_exercicios" ON workout_exercises
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );
```

---

## 3. Telas e Navegação

### Fluxo do Aluno

```
Dashboard → /workouts (WorkoutsPage) → /workouts/:id (WorkoutDetailPage)
```

- **WorkoutsPage:** ficha do dia em destaque (detectada pelo `days_of_week` e dia atual da semana) + lista das demais fichas abaixo
- **WorkoutDetailPage:** nome da ficha, dias da semana, lista de `ExerciseRow` com séries × reps × carga × observação

### Fluxo do Admin — Biblioteca

```
/admin/workouts (WorkoutsAdminPage) → /admin/workouts/new ou /:id/edit (WorkoutFormPage) → AssignWorkoutModal
```

### Fluxo do Admin — Via Perfil do Aluno (Fase 9, simplificado agora)

```
StudentDetailPage → /admin/workouts/new?userId=X (WorkoutFormPage pré-vinculada)
```

---

## 4. Componentes

### `WorkoutCard.tsx`

Props:
```ts
interface WorkoutCardProps {
  workout: Workout;
  isToday?: boolean;       // destaca com borda accent + botão
  onClick: () => void;
  onAssign?: () => void;   // só no admin
  onEdit?: () => void;     // só no admin
}
```

### `ExerciseRow.tsx`

Props:
```ts
interface ExerciseRowProps {
  exercise: WorkoutExercise & { exercise: Exercise };
  editable?: boolean;      // modo admin (mostra inputs de edição)
  onRemove?: () => void;   // só quando editable
  onChange?: (data: Partial<WorkoutExercise>) => void;
}
```

### `ExerciseSelector.tsx` (modal)

Props:
```ts
interface ExerciseSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
  excludeIds?: string[];   // já adicionados à ficha
}
```

Comportamento:
- Busca por nome (debounce 300ms)
- Filtra por grupo muscular (chips)
- Lista os 39 exercícios do banco, filtrada em tempo real
- Ao clicar, fecha o modal e retorna o exercício para o `WorkoutFormPage`

---

## 5. Serviço — `workout.service.ts`

```ts
// Aluno
getMyWorkouts(userId: string): Promise<Workout[]>
getWorkoutById(id: string): Promise<WorkoutWithExercises>

// Admin
getAllWorkouts(): Promise<Workout[]>           // templates + fichas de alunos
createWorkout(data: CreateWorkoutDTO): Promise<Workout>
updateWorkout(id: string, data: UpdateWorkoutDTO): Promise<Workout>
deactivateWorkout(id: string): Promise<void>  // is_active = false

// Exercícios da ficha
addExerciseToWorkout(workoutId: string, exerciseId: string, config: ExerciseConfig): Promise<WorkoutExercise>
removeExerciseFromWorkout(workoutExerciseId: string): Promise<void>
reorderExercises(workoutId: string, orderedIds: string[]): Promise<void>

// Catálogo
getExercises(filters?: { muscleGroup?: string; search?: string }): Promise<Exercise[]>

// Atribuição
assignWorkout(workoutId: string, userId: string): Promise<Workout>
```

---

## 6. WorkoutsPage — Lógica "Hoje em Destaque"

```ts
const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const todayKey = DAYS[new Date().getDay()];

const todayWorkout = workouts.find(w =>
  w.days_of_week?.includes(todayKey) && w.is_active
);
```

- Se não há ficha para hoje: mostra todas como lista simples sem destaque
- Se há: card de destaque no topo com botão "Ver Treino →" (navega para `/workouts/:id`)

---

## 7. WorkoutFormPage — Comportamento

- Recebe `id` via params: se presente → modo edição (carrega ficha); se não → modo criação
- Recebe `userId` via query string: se presente → pré-vincula ao aluno (criação via perfil)
- Formulário: nome, dias da semana (checkboxes seg–dom), is_template toggle
- Lista de exercícios com `ExerciseRow editable` + botão `+ Adicionar Exercício` que abre `ExerciseSelector`
- `order_index` automático (posição na lista)
- Salvar: valida nome não vazio e pelo menos 1 exercício
- Após salvar: volta para `/admin/workouts`

---

## 8. Estados de UI

| Situação | Comportamento |
|----------|---------------|
| Carregando | Skeleton cards (2–3 placeholders animados) |
| Erro de rede | Banner `border-left: 2px solid var(--danger)` + botão "Tentar novamente" |
| Sem fichas (aluno) | Card vazio: "Nenhuma ficha atribuída ainda" |
| Sem fichas (admin) | Card vazio: "Crie a primeira ficha" + botão |
| Salvando (form) | Botão desabilitado + spinner |

---

## 9. Arquivos a Criar / Modificar

### Criar
- `src/services/workout.service.ts`
- `src/components/WorkoutCard.tsx`
- `src/components/ExerciseRow.tsx`
- `src/components/ExerciseSelector.tsx`
- `src/pages/WorkoutsPage.tsx`
- `src/pages/WorkoutDetailPage.tsx`
- `src/pages/admin/WorkoutsAdminPage.tsx`
- `src/pages/admin/WorkoutFormPage.tsx`

### Modificar
- `src/App.tsx` — 5 novas rotas
- `src/components/layout/Sidebar.tsx` (ou equivalente) — item "Fichas"
- `src/pages/DashboardPage.tsx` — link para `/workouts`
- `src/types/index.ts` — tipos `Workout`, `WorkoutExercise`, `Exercise`, DTOs
- `supabase-setup.sql` — novas tabelas e RLS

### SQL Migration (executar no Supabase)
- Patch em `supabase-setup.sql` com as alterações descritas na Seção 2

---

## 10. Fora do Escopo (Fase 5)

- Registrar execução de treino (Fase 6)
- Histórico de cargas e progressão (Fase 7)
- Notificações de treino (Fase 8)
- Perfil completo do aluno com histórico (Fase 9)
- Arrastar exercícios para reordenar (pode ser adicionado depois)
