-- ================================================================
-- MUSCLE TRAINING — Importação de Fichas: Amanda + Denis
-- ================================================================
-- ANTES DE RODAR:
--   1. Supabase Dashboard > Authentication > Users > Add User
--      - aquadrosn@gmail.com  (senha temporária)
--      - sined.imr@gmail.com  (senha temporária)
--   2. Execute este script no SQL Editor
-- ================================================================

-- Função auxiliar: busca exercício pelo nome ou cria se não existir
CREATE OR REPLACE FUNCTION _tmp_get_or_create_exercise(
  p_name        TEXT,
  p_muscle_group TEXT,
  p_created_by  UUID
) RETURNS UUID AS $$
DECLARE v_id UUID;
BEGIN
  SELECT id INTO v_id FROM exercise_library WHERE LOWER(name) = LOWER(p_name) LIMIT 1;
  IF v_id IS NULL THEN
    INSERT INTO exercise_library (id, name, muscle_group, created_by)
    VALUES (gen_random_uuid(), p_name, p_muscle_group, p_created_by)
    RETURNING id INTO v_id;
  END IF;
  RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- ================================================================

DO $$
DECLARE
  amanda_id UUID;
  denis_id  UUID;
  admin_id  UUID;

  -- ── Exercícios ──────────────────────────────────────────────
  ex_elevacao_pelvica         UUID;
  ex_agach_bulgaro            UUID;
  ex_stiff                    UUID;
  ex_cadeira_flexora          UUID;
  ex_cadeira_abdutora         UUID;
  ex_puxada_alta              UUID;
  ex_remada_baixa_triangulo   UUID;
  ex_desenvolvimento_halter   UUID;
  ex_elev_lateral_halter      UUID;
  ex_rosca_direta             UUID;
  ex_abdominais               UUID;
  ex_agach_livre              UUID;
  ex_leg_press                UUID;
  ex_cadeira_extensora        UUID;
  ex_cadeira_adutora          UUID;
  ex_supino_maquina           UUID;
  ex_elev_lateral_polia       UUID;
  ex_crucifixo_invertido      UUID;
  ex_triceps_polia_corda      UUID;
  ex_panturrilha_pe           UUID;
  ex_leg_press_pes_altos      UUID;
  ex_afundo_passada           UUID;
  ex_supino_inclinado_halter  UUID;
  ex_puxada_aberta            UUID;
  ex_supino_reto_maquina      UUID;
  ex_remada_cavalinho         UUID;
  ex_rosca_barra_w            UUID;
  ex_agach_hack               UUID;
  ex_supino_reto_barra        UUID;
  ex_crucifixo_inclinado      UUID;
  ex_crucifixo_maquina        UUID;
  ex_elev_frontal_halter      UUID;
  ex_triceps_testa            UUID;
  ex_remada_curvada           UUID;
  ex_pulley_triangulo         UUID;
  ex_remada_unilateral        UUID;
  ex_rack_pull                UUID;
  ex_rosca_scott              UUID;
  ex_rosca_martelo            UUID;
  ex_mesa_flexora             UUID;
  ex_panturrilha_sentado      UUID;

  -- ── Fichas Amanda ───────────────────────────────────────────
  w_am_seg UUID; w_am_ter UUID; w_am_qua UUID; w_am_qui UUID; w_am_sex UUID;

  -- ── Fichas Denis ────────────────────────────────────────────
  w_de_seg UUID; w_de_ter UUID; w_de_qua UUID; w_de_qui UUID; w_de_sex UUID;

BEGIN

  -- ──────────────────────────────────────────────────────────────
  -- 1. Busca IDs
  -- ──────────────────────────────────────────────────────────────
  SELECT id INTO amanda_id FROM auth.users WHERE email = 'aquadrosn@gmail.com';
  SELECT id INTO denis_id  FROM auth.users WHERE email = 'sined.imr@gmail.com';
  SELECT id INTO admin_id  FROM profiles   WHERE role  = 'admin' LIMIT 1;

  IF amanda_id IS NULL THEN
    RAISE EXCEPTION 'Amanda não encontrada. Crie a conta em Authentication > Users antes de rodar este script.';
  END IF;
  IF denis_id IS NULL THEN
    RAISE EXCEPTION 'Denis não encontrado. Crie a conta em Authentication > Users antes de rodar este script.';
  END IF;
  IF admin_id IS NULL THEN
    RAISE EXCEPTION 'Nenhum admin encontrado no banco.';
  END IF;

  -- ──────────────────────────────────────────────────────────────
  -- 2. Atualiza perfis
  -- ──────────────────────────────────────────────────────────────
  UPDATE profiles
    SET full_name = 'Amanda de Quadros Nunes Rodrigues', role = 'user', is_active = true
  WHERE id = amanda_id;

  UPDATE profiles
    SET full_name = 'Denis Iran Mendes Rodrigues', role = 'user', is_active = true
  WHERE id = denis_id;

  -- ──────────────────────────────────────────────────────────────
  -- 3. Exercícios na biblioteca (cria se não existir)
  -- ──────────────────────────────────────────────────────────────
  ex_elevacao_pelvica        := _tmp_get_or_create_exercise('Elevação Pélvica',              'glutes',    admin_id);
  ex_agach_bulgaro           := _tmp_get_or_create_exercise('Agachamento Búlgaro',           'legs',      admin_id);
  ex_stiff                   := _tmp_get_or_create_exercise('Stiff',                         'legs',      admin_id);
  ex_cadeira_flexora         := _tmp_get_or_create_exercise('Cadeira Flexora',               'legs',      admin_id);
  ex_cadeira_abdutora        := _tmp_get_or_create_exercise('Cadeira Abdutora',              'glutes',    admin_id);
  ex_puxada_alta             := _tmp_get_or_create_exercise('Puxada Alta na Polia',          'back',      admin_id);
  ex_remada_baixa_triangulo  := _tmp_get_or_create_exercise('Remada Baixa com Triângulo',    'back',      admin_id);
  ex_desenvolvimento_halter  := _tmp_get_or_create_exercise('Desenvolvimento com Halteres',  'shoulders', admin_id);
  ex_elev_lateral_halter     := _tmp_get_or_create_exercise('Elevação Lateral com Halteres', 'shoulders', admin_id);
  ex_rosca_direta            := _tmp_get_or_create_exercise('Rosca Direta',                  'biceps',    admin_id);
  ex_abdominais              := _tmp_get_or_create_exercise('Abdominais',                    'abs',       admin_id);
  ex_agach_livre             := _tmp_get_or_create_exercise('Agachamento Livre',             'legs',      admin_id);
  ex_leg_press               := _tmp_get_or_create_exercise('Leg Press 45°',                'legs',      admin_id);
  ex_cadeira_extensora       := _tmp_get_or_create_exercise('Cadeira Extensora',             'legs',      admin_id);
  ex_cadeira_adutora         := _tmp_get_or_create_exercise('Cadeira Adutora',               'legs',      admin_id);
  ex_supino_maquina          := _tmp_get_or_create_exercise('Supino na Máquina',             'chest',     admin_id);
  ex_elev_lateral_polia      := _tmp_get_or_create_exercise('Elevação Lateral na Polia',     'shoulders', admin_id);
  ex_crucifixo_invertido     := _tmp_get_or_create_exercise('Crucifixo Invertido',           'shoulders', admin_id);
  ex_triceps_polia_corda     := _tmp_get_or_create_exercise('Tríceps na Polia com Corda',    'triceps',   admin_id);
  ex_panturrilha_pe          := _tmp_get_or_create_exercise('Panturrilha em Pé',             'calves',    admin_id);
  ex_leg_press_pes_altos     := _tmp_get_or_create_exercise('Leg Press 45° (Pés Altos)',     'glutes',    admin_id);
  ex_afundo_passada          := _tmp_get_or_create_exercise('Afundo Passada',                'legs',      admin_id);
  ex_supino_inclinado_halter := _tmp_get_or_create_exercise('Supino Inclinado com Halteres', 'chest',     admin_id);
  ex_puxada_aberta           := _tmp_get_or_create_exercise('Puxada Aberta no Pulley',       'back',      admin_id);
  ex_supino_reto_maquina     := _tmp_get_or_create_exercise('Supino Reto na Máquina',        'chest',     admin_id);
  ex_remada_cavalinho        := _tmp_get_or_create_exercise('Remada Cavalinho (T-Bar)',       'back',      admin_id);
  ex_rosca_barra_w           := _tmp_get_or_create_exercise('Rosca Direta na Barra W',       'biceps',    admin_id);
  ex_agach_hack              := _tmp_get_or_create_exercise('Agachamento no Hack Machine',   'legs',      admin_id);
  ex_supino_reto_barra       := _tmp_get_or_create_exercise('Supino Reto com Barra',         'chest',     admin_id);
  ex_crucifixo_inclinado     := _tmp_get_or_create_exercise('Crucifixo Inclinado com Halteres', 'chest',  admin_id);
  ex_crucifixo_maquina       := _tmp_get_or_create_exercise('Crucifixo na Máquina (Voador)', 'chest',     admin_id);
  ex_elev_frontal_halter     := _tmp_get_or_create_exercise('Elevação Frontal com Halteres', 'shoulders', admin_id);
  ex_triceps_testa           := _tmp_get_or_create_exercise('Tríceps Testa',                 'triceps',   admin_id);
  ex_remada_curvada          := _tmp_get_or_create_exercise('Remada Curvada com Barra',      'back',      admin_id);
  ex_pulley_triangulo        := _tmp_get_or_create_exercise('Pulley com Triângulo',          'back',      admin_id);
  ex_remada_unilateral       := _tmp_get_or_create_exercise('Remada Unilateral',             'back',      admin_id);
  ex_rack_pull               := _tmp_get_or_create_exercise('Rack Pull',                     'back',      admin_id);
  ex_rosca_scott             := _tmp_get_or_create_exercise('Rosca Scott',                   'biceps',    admin_id);
  ex_rosca_martelo           := _tmp_get_or_create_exercise('Rosca Martelo com Halteres',    'biceps',    admin_id);
  ex_mesa_flexora            := _tmp_get_or_create_exercise('Mesa Flexora',                  'legs',      admin_id);
  ex_panturrilha_sentado     := _tmp_get_or_create_exercise('Panturrilha Sentado',           'calves',    admin_id);

  -- ──────────────────────────────────────────────────────────────
  -- 4. FICHAS DE AMANDA
  --    Divisão: 3x Inferiores (Seg/Qua/Sex) + 2x Superiores (Ter/Qui)
  -- ──────────────────────────────────────────────────────────────

  -- ── Segunda — Inferiores ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino A — Inferiores',
    'Divisão 3x Inferiores / 2x Superiores',
    amanda_id, admin_id, ARRAY['monday']::text[], false, true)
  RETURNING id INTO w_am_seg;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_am_seg, ex_elevacao_pelvica,  4, '8-10',  'Barra ou Máquina — carga pesada!',                     90, 1),
    (w_am_seg, ex_agach_bulgaro,     3, '10',    'Smith ou Halteres — 10 reps por perna',                90, 2),
    (w_am_seg, ex_stiff,             4, '10',    'Halteres ou Barra',                                    90, 3),
    (w_am_seg, ex_cadeira_flexora,   3, '10-12', '2s de insistência na contração final',                75, 4),
    (w_am_seg, ex_cadeira_abdutora,  3, '15',    NULL,                                                   60, 5);

  -- ── Terça — Superiores ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino B — Superiores',
    'Divisão 3x Inferiores / 2x Superiores',
    amanda_id, admin_id, ARRAY['tuesday']::text[], false, true)
  RETURNING id INTO w_am_ter;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_am_ter, ex_puxada_alta,            4, '10',          'Pegada aberta',                             75, 1),
    (w_am_ter, ex_remada_baixa_triangulo, 3, '10-12',       NULL,                                        75, 2),
    (w_am_ter, ex_desenvolvimento_halter, 3, '10',          NULL,                                        75, 3),
    (w_am_ter, ex_elev_lateral_halter,    4, '12',          'Essencial para o desenho do ombro',         60, 4),
    (w_am_ter, ex_rosca_direta,           3, '12',          'Polia ou Halteres',                         60, 5),
    (w_am_ter, ex_abdominais,             3, 'Até a falha', 'Infra ou supra',                            60, 6);

  -- ── Quarta — Inferiores ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino C — Inferiores',
    'Divisão 3x Inferiores / 2x Superiores',
    amanda_id, admin_id, ARRAY['wednesday']::text[], false, true)
  RETURNING id INTO w_am_qua;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_am_qua, ex_agach_livre,       4, '8-10', 'Agachamento Livre ou Hack Machine',                              90, 1),
    (w_am_qua, ex_leg_press,         3, '10-12','Pés mais baixos na plataforma (isolar quadríceps)',              90, 2),
    (w_am_qua, ex_cadeira_extensora, 4, '12',   'Última série: DROP-SET até falhar + reduz peso e continua',      75, 3),
    (w_am_qua, ex_cadeira_adutora,   3, '15',   NULL,                                                             60, 4);

  -- ── Quinta — Superiores ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino D — Superiores',
    'Divisão 3x Inferiores / 2x Superiores',
    amanda_id, admin_id, ARRAY['thursday']::text[], false, true)
  RETURNING id INTO w_am_qui;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_am_qui, ex_supino_maquina,      3, '10-12', 'Supino Vertical ou Crucifixo Reto na Máquina',  75, 1),
    (w_am_qui, ex_elev_lateral_polia,  4, '10-12', 'Cabo',                                          60, 2),
    (w_am_qui, ex_crucifixo_invertido, 3, '12',    'Máquina ou Halteres — posterior de ombro',      60, 3),
    (w_am_qui, ex_triceps_polia_corda, 4, '12',    NULL,                                            60, 4),
    (w_am_qui, ex_panturrilha_pe,      4, '15-20', 'Segurar 1s no topo da contração',               60, 5);

  -- ── Sexta — Inferiores ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino E — Inferiores',
    'Divisão 3x Inferiores / 2x Superiores',
    amanda_id, admin_id, ARRAY['friday']::text[], false, true)
  RETURNING id INTO w_am_sex;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_am_sex, ex_leg_press_pes_altos, 4, '10',    'Pés altos e afastados — foco em glúteo e adutores',          90, 1),
    (w_am_sex, ex_cadeira_flexora,     3, '10-12', 'Ou Mesa Flexora',                                             75, 2),
    (w_am_sex, ex_afundo_passada,      3, '20',    '20 passos totais por série, caminhando com halteres',         75, 3),
    (w_am_sex, ex_cadeira_abdutora,    4, '15',    'Tronco inclinado para frente — para fritar o glúteo médio',  60, 4);

  -- ──────────────────────────────────────────────────────────────
  -- 5. FICHAS DE DENIS
  --    Método Séries Válidas: 2x até a falha real por exercício
  --    Feeder Sets = 3-5 reps apenas para ajustar carga
  -- ──────────────────────────────────────────────────────────────

  -- ── Segunda — Peito + Costas + Braços ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino A — Peito + Costas',
    'Método Séries Válidas: apenas 2 séries até a falha real por exercício. Feeder Sets = 3-5 reps para ajustar carga.',
    denis_id, admin_id, ARRAY['monday']::text[], false, true)
  RETURNING id INTO w_de_seg;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_de_seg, ex_supino_inclinado_halter, 2, 'Até a falha', 'PRINCIPAL — progredir carga | 1 aquec + 2 feeders',   180, 1),
    (w_de_seg, ex_puxada_aberta,          2, 'Até a falha', 'PRINCIPAL — progredir carga | 1 aquec + 2 feeders',   180, 2),
    (w_de_seg, ex_supino_reto_maquina,    2, 'Até a falha', 'Articulado | 1 feeder antes',                         120, 3),
    (w_de_seg, ex_remada_cavalinho,       2, 'Até a falha', 'T-Bar com apoio | 1 feeder antes',                    120, 4),
    (w_de_seg, ex_elev_lateral_halter,    3, 'Até a falha', NULL,                                                   90, 5),
    (w_de_seg, ex_rosca_barra_w,          3, 'Até a falha', NULL,                                                   90, 6),
    (w_de_seg, ex_triceps_polia_corda,    3, 'Até a falha', NULL,                                                   90, 7);

  -- ── Terça — Pernas ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino B — Pernas',
    'Método Séries Válidas: 2 séries até a falha real por exercício.',
    denis_id, admin_id, ARRAY['tuesday']::text[], false, true)
  RETURNING id INTO w_de_ter;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_de_ter, ex_cadeira_flexora,   2, 'Até a falha', 'Aquecer posterior protege o joelho | 1 aquec + 2 feeders', 90,  1),
    (w_de_ter, ex_agach_hack,        2, 'Até a falha', 'PRINCIPAL de força — Hack ou Livre | 2 feeders antes',     180, 2),
    (w_de_ter, ex_leg_press,         2, 'Até a falha', '1 feeder antes',                                           120, 3),
    (w_de_ter, ex_cadeira_extensora, 2, 'Até a falha', NULL,                                                        90, 4),
    (w_de_ter, ex_panturrilha_pe,    3, 'Até a falha', NULL,                                                        60, 5);

  -- ── Quarta — Peito + Ombros ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino C — Peito + Ombros',
    'Método Séries Válidas: 2 séries até a falha real por exercício.',
    denis_id, admin_id, ARRAY['wednesday']::text[], false, true)
  RETURNING id INTO w_de_qua;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_de_qua, ex_supino_reto_barra,   2, 'Até a falha', 'PRINCIPAL — progredir carga | 1 aquec + 2 feeders', 180, 1),
    (w_de_qua, ex_crucifixo_inclinado, 2, 'Até a falha', '1 feeder antes',                                     90, 2),
    (w_de_qua, ex_crucifixo_maquina,   2, 'Até a falha', 'Voador',                                             75, 3),
    (w_de_qua, ex_elev_lateral_polia,  3, 'Até a falha', 'Cabo',                                               75, 4),
    (w_de_qua, ex_elev_frontal_halter, 2, 'Até a falha', NULL,                                                  75, 5),
    (w_de_qua, ex_triceps_testa,       3, 'Até a falha', 'Ou Tríceps Francês na Polia',                        75, 6);

  -- ── Quinta — Costas + Bíceps ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino D — Costas + Bíceps',
    'Método Séries Válidas: 2 séries até a falha real por exercício.',
    denis_id, admin_id, ARRAY['thursday']::text[], false, true)
  RETURNING id INTO w_de_qui;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_de_qui, ex_remada_curvada,    2, 'Até a falha', 'PRINCIPAL — progredir carga | 1 aquec + 2 feeders', 180, 1),
    (w_de_qui, ex_pulley_triangulo,  2, 'Até a falha', '1 feeder antes',                                     90, 2),
    (w_de_qui, ex_remada_unilateral, 2, 'Até a falha', 'Serrote',                                            90, 3),
    (w_de_qui, ex_rack_pull,         2, 'Até a falha', 'Ou Extensão Lombar',                                 120, 4),
    (w_de_qui, ex_rosca_scott,       3, 'Até a falha', 'Máquina ou Banco Scott',                              75, 5),
    (w_de_qui, ex_rosca_martelo,     2, 'Até a falha', NULL,                                                  75, 6);

  -- ── Sexta — Pernas Posteriores + Glúteo ──
  INSERT INTO workouts (id, name, description, user_id, created_by, week_days, is_template, is_active)
  VALUES (gen_random_uuid(),
    'Treino E — Posteriores + Glúteo',
    'Método Séries Válidas: 2 séries até a falha real por exercício. Sáb+Dom: recuperação da lombar.',
    denis_id, admin_id, ARRAY['friday']::text[], false, true)
  RETURNING id INTO w_de_sex;

  INSERT INTO workout_exercises
    (workout_id, exercise_id, sets, reps, notes, rest_seconds, order_index) VALUES
    (w_de_sex, ex_mesa_flexora,        2, 'Até a falha', 'PRINCIPAL | 1 aquec + 2 feeders',                       180, 1),
    (w_de_sex, ex_stiff,               2, 'Até a falha', 'Barra ou Halteres | 1 feeder | Sáb+Dom: recuperar lombar', 150, 2),
    (w_de_sex, ex_leg_press_pes_altos, 2, 'Até a falha', 'Pés altos e afastados — glúteo e posteriores | 1 feeder', 120, 3),
    (w_de_sex, ex_cadeira_flexora,     2, 'Até a falha', 'Cadeira Sentada',                                         90, 4),
    (w_de_sex, ex_cadeira_abdutora,    3, 'Até a falha', NULL,                                                       60, 5),
    (w_de_sex, ex_panturrilha_sentado, 3, 'Até a falha', NULL,                                                       60, 6);

  RAISE NOTICE '✅ Importação concluída com sucesso!';
  RAISE NOTICE '   Amanda (aquadrosn@gmail.com): 5 fichas criadas — Treino A a E';
  RAISE NOTICE '   Denis  (sined.imr@gmail.com): 5 fichas criadas — Treino A a E';

END $$;

-- Remove função auxiliar temporária
DROP FUNCTION IF EXISTS _tmp_get_or_create_exercise(TEXT, TEXT, UUID);
