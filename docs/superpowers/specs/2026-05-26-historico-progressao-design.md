# Fase 7 — Histórico & Progressão: Design Spec

**Data:** 2026-05-26  
**Status:** Aprovado  
**PRD refs:** §3.6 Histórico e Progressão, §3.7 Peso e Medidas Corporais

---

## 1. Escopo

Entregar visualização completa de histórico de treinos, gráficos de progressão de carga e frequência, além de registro e histórico de peso corporal e medidas corporais.

**Fora de escopo:** edição/exclusão de registros passados, comparativo entre alunos (admin), notificações de metas.

---

## 2. Rotas e Navegação

### Novas rotas (todas protegidas — `ProtectedRoute`)

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/historico` | `HistoryPage` | Lista cronológica reversa de sessões realizadas |
| `/historico/:logId` | `SessionDetailPage` | Detalhe de uma sessão: exercícios, séries, cargas |
| `/progresso` | `ProgressPage` | Gráfico de carga por exercício + gráfico de frequência semanal |
| `/medidas` | `MeasurementsPage` | Peso corporal (gráfico + lista) + medidas corporais |

### Ponto de entrada — Dashboard (`/dashboard`)

Três cards adicionados abaixo do card de treino do dia:

**Card "Último treino"**
- Mostra: data, nome da ficha, duração, emoji de dificuldade
- Toque → `/historico`
- Vazio: texto "// nenhum treino registrado ainda"

**Card "Progresso"**
- Mostra: sequência atual (ex: "4 treinos esta semana") + peso atual (se registrado)
- Toque → `/progresso`

**Card "Medidas"**
- Mostra: peso mais recente + variação desde o primeiro registro (ex: "−3.5kg")
- Toque → `/medidas`
- Vazio: "// registre seu peso para acompanhar a evolução"

### Segundo ponto de entrada para gráfico de carga

Em `SessionDetailPage`, ao lado de cada exercício: botão **"ver evolução →"**  
Navega para `/progresso?exercise=:exerciseId`, que pré-seleciona o exercício no dropdown.

---

## 3. Páginas

### 3.1 `HistoryPage` (`/historico`)

**Estado:** `sessions: WorkoutLog[]`, `loading`, `error`

**Layout:**
- Header sticky com `← Dashboard` e título `// histórico`
- Label de seção: `// X sessões registradas`
- Lista de cards, um por sessão, ordenada da mais recente para a mais antiga
- Cada card mostra:
  - Data formatada (ex: "Ter, 23 Mai 2026")
  - Nome da ficha (ex: "Peito & Tríceps — A")
  - Duração em minutos + emoji de dificuldade + quantidade de séries
  - Toque → navega para `/historico/:logId`
- **Estado vazio:** ícone 📋, texto "Nenhum treino registrado ainda", botão "Começar agora →" → `/workouts`

---

### 3.2 `SessionDetailPage` (`/historico/:logId`)

**Estado:** `session: WorkoutLogDetail | null`, `loading`, `error`

**Layout:**
- Header: `←` + nome da ficha + data
- Bloco de meta: duração · dificuldade emoji · séries totais
- Notas do aluno (se existirem), em DM Mono itálico
- Label: `// X exercícios`
- Para cada exercício:
  - Nome do exercício + grupo muscular (chip)
  - Tabela compacta de séries: `Série 1 | 12 reps | 60kg ✓`
  - Botão `📈 ver evolução →` → `/progresso?exercise=:exerciseId`

---

### 3.3 `ProgressPage` (`/progresso`)

**Estado:** `exerciseId: string | null`, `exercises: Exercise[]`, `loadData: LoadPoint[]`, `frequencyData: WeekFrequency[]`, `loading`

Lê `?exercise=` da URL ao montar para pré-selecionar exercício vindo do detalhe de sessão.

**Layout:**
- Header: `← Dashboard` + título `// progresso`
- **Bloco 1 — Evolução de carga:**
  - Label `// evolução de carga`
  - Dropdown para escolher exercício (lista apenas exercícios que o aluno já treinou)
  - `LoadProgressChart` (Recharts `LineChart`): eixo X = datas, eixo Y = carga máxima (kg) por sessão, cor lime `#c8f04a`
  - Abaixo do gráfico: chip com variação total (ex: "+15kg em 8 semanas")
  - Estado vazio (nunca treinou): texto orientativo
- **Bloco 2 — Frequência semanal:**
  - Label `// frequência — últimas 8 semanas`
  - `FrequencyChart` (Recharts `BarChart`): eixo X = semanas, eixo Y = número de treinos, cor lime
- **Estado vazio global** (sem nenhum treino registrado): ícone 📊, botão "Registrar primeiro treino →" → `/workouts`

---

### 3.4 `MeasurementsPage` (`/medidas`)

**Estado:** `weights: UserWeight[]`, `measurements: BodyMeasurement[]`, `showWeightModal`, `showMeasurementModal`, `loading`

**Layout — Seção Peso:**
- Label `// peso corporal`
- Botão `＋ Registrar peso` (abre `WeightEntryModal`)
- `WeightChart` (Recharts `LineChart`): peso × data, cor lime
- Lista dos últimos 10 registros: data + kg + variação em relação ao anterior (ex: "−0.8kg")
- Estado vazio: "// nenhum peso registrado"

**Layout — Seção Medidas:**
- Separador + label `// medidas corporais`
- Botão `＋ Nova medição` (abre `MeasurementEntryModal`)
- Último registro: grid de chips com cada medida (cintura, quadril, braço, etc.)
- Histórico simplificado: lista dos últimos 3 registros com data e medidas em uma linha
- Estado vazio: "// nenhuma medição registrada"

---

## 4. Componentes

### Gráficos (`src/components/charts/`)

**`LoadProgressChart`**
```ts
interface Props {
  data: Array<{ date: string; maxLoad: number }>
  exerciseName: string
}
```
Recharts `LineChart` responsivo. Tooltip customizado no design system. Sem eixos verbosos — apenas grid horizontal sutil.

**`FrequencyChart`**
```ts
interface Props {
  data: Array<{ week: string; count: number }>
}
```
Recharts `BarChart` responsivo. Barras arredondadas (radius `[3,3,0,0]`), cor lime.

**`WeightChart`**
```ts
interface Props {
  data: Array<{ date: string; weight: number }>
}
```
Recharts `LineChart` responsivo. Área preenchida com gradiente lime transparente abaixo da linha.

### Modais de registro

**`WeightEntryModal`**
```ts
interface Props {
  isOpen: boolean
  onClose: () => void
  onSaved: (weight: UserWeight) => void
}
```
Bottom sheet (igual ao `WorkoutFinishModal`). Campos: peso em kg (input numérico, pré-preenchido com último peso) + data (default = hoje). Botão "Salvar".

**`MeasurementEntryModal`**
```ts
interface Props {
  isOpen: boolean
  onClose: () => void
  onSaved: (measurement: BodyMeasurement) => void
}
```
Bottom sheet. Campos opcionais: cintura, quadril, abdômen, coxa, braço, peitoral, panturrilha (todos em cm). Data (default = hoje). Botão "Salvar" habilitado se ao menos 1 campo preenchido.

---

## 5. Serviços

### `src/services/history.service.ts`

```ts
getWorkoutHistory(userId: string): Promise<WorkoutLog[]>
// SELECT workout_logs JOIN workouts ON workout_id, ORDER BY started_at DESC

getSessionDetail(logId: string): Promise<WorkoutLogDetail>
// SELECT workout_log + exercise_logs JOIN exercise_library, ORDER BY exercise_id, set_number

getExercisesTrainedByUser(userId: string): Promise<Exercise[]>
// SELECT DISTINCT exercise_library via exercise_logs → workout_logs WHERE user_id

getLoadProgression(userId: string, exerciseId: string): Promise<LoadPoint[]>
// Busca todos os exercise_logs do exercício via workout_logs do usuário,
// agrupa por data em JavaScript (MAX load_kg por dia), retorna ordenado por data.
// PostgREST não suporta GROUP BY — agregação feita no cliente.

getWeeklyFrequency(userId: string): Promise<WeekFrequency[]>
// Busca workout_logs das últimas 8 semanas (WHERE started_at >= now - 56 days),
// agrupa por semana em JavaScript, retorna array com início da semana + contagem.
```

### `src/services/measurements.service.ts`

```ts
getUserWeights(userId: string): Promise<UserWeight[]>
// SELECT * FROM user_weights WHERE user_id ORDER BY measured_at DESC

addUserWeight(userId: string, weightKg: number, measuredAt: string): Promise<UserWeight>
// INSERT INTO user_weights

getBodyMeasurements(userId: string): Promise<BodyMeasurement[]>
// SELECT * FROM body_measurements WHERE user_id ORDER BY measured_at DESC LIMIT 3

addBodyMeasurement(userId: string, data: Partial<BodyMeasurement>): Promise<BodyMeasurement>
// INSERT INTO body_measurements
```

---

## 6. Tipos novos em `src/types/index.ts`

```ts
interface WorkoutLogDetail extends WorkoutLog {
  workout?: Workout
  exercise_logs: ExerciseLogDetail[]
}

interface ExerciseLogDetail extends ExerciseLog {
  exercise: Exercise
}

interface LoadPoint {
  date: string      // 'YYYY-MM-DD'
  maxLoad: number   // kg
}

interface WeekFrequency {
  week: string      // 'YYYY-MM-DD' (início da semana)
  count: number
}
```

---

## 7. Banco de dados

**Nenhuma migração necessária.** Tabelas já existem: `workout_logs`, `exercise_logs`, `user_weights`, `body_measurements`.

**RLS:** as políticas atuais permitem que o aluno leia apenas seus próprios registros (`WHERE user_id = auth.uid()`). Confirmar que as tabelas `user_weights` e `body_measurements` têm essa política antes de implementar.

---

## 8. Dependência externa

```bash
npm install recharts
```

Recharts está especificado no PRD (v11). Instalar antes de qualquer componente de gráfico.

---

## 9. Critério de conclusão

- Aluno vê lista de sessões realizadas em `/historico`
- Aluno abre detalhe de uma sessão e vê todas as séries registradas
- Aluno vê gráfico de evolução de carga para pelo menos um exercício
- Aluno vê gráfico de frequência semanal
- Aluno registra peso e vê gráfico de evolução
- Aluno registra medidas corporais
- Cards de resumo aparecem no Dashboard com dados reais
- Nenhum `alert()` ou `confirm()` — usar estados de erro inline
