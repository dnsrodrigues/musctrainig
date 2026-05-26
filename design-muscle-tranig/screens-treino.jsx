/* global React, Sidebar, Icon, MobStatus */
// ─────────────────────────────────────────────────────────────
// TREINO DO DIA EM EXECUÇÃO — a tela-herói do FORJA
// Duas variações de desktop + uma mobile.
// ─────────────────────────────────────────────────────────────

const TREINO_HOJE = {
  nome: "PUSH · Peito · Ombro · Tríceps",
  data: "Quinta · 21 mai",
  duracaoEstimada: 62,
  exercicios: [
    { nome: "Supino Reto Barra",         grupo: "Peito",   series: 4, reps: "8-10", carga: 80, descanso: 90 },
    { nome: "Supino Inclinado Halteres", grupo: "Peito",   series: 3, reps: "10",   carga: 28, descanso: 75 },
    { nome: "Crucifixo Polia Alta",      grupo: "Peito",   series: 3, reps: "12-15",carga: 15, descanso: 60 },
    { nome: "Desenvolvimento Militar",   grupo: "Ombro",   series: 4, reps: "8",    carga: 50, descanso: 90 },
    { nome: "Elevação Lateral",          grupo: "Ombro",   series: 4, reps: "12",   carga: 12, descanso: 45 },
    { nome: "Tríceps Corda",             grupo: "Tríceps", series: 3, reps: "12",   carga: 25, descanso: 45 },
    { nome: "Tríceps Francês Halter",    grupo: "Tríceps", series: 3, reps: "10",   carga: 18, descanso: 60 },
  ],
};

// ============ DESKTOP — Variação A: foco vertical, painel grande ============
function TreinoExecucaoA() {
  const ex = TREINO_HOJE.exercicios[1]; // Supino Inclinado Halteres
  const exIdx = 1;
  const total = TREINO_HOJE.exercicios.length;
  const sets = [
    { reps: 10, carga: 26, done: true,  pr: false },
    { reps: 10, carga: 28, done: true,  pr: true  },
    { reps: 8,  carga: 28, done: false, current: true },
    { reps: "", carga: 28, done: false },
  ];

  return (
    <div className="scr" data-screen-label="Treino em Execução — Desktop A">
      <Sidebar active="treino"/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div className="topbar-title">TREINO EM EXECUÇÃO</div>
            <div className="topbar-sub">{TREINO_HOJE.data} · começou às 07:38</div>
          </div>
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <span className="chip danger"><span style={{ width:6, height:6, borderRadius:99, background:'currentColor' }}/> AO VIVO 24:18</span>
            <button className="btn ghost"><Icon name="pause" size={14}/> Pausar</button>
            <button className="btn">Encerrar</button>
          </div>
        </div>

        <div className="content" style={{ flexDirection:'row', alignItems:'stretch' }}>
          {/* LEFT — Lista de exercícios */}
          <div className="col gap-3" style={{ width: 280 }}>
            <div className="label-sm">Exercícios · {exIdx + 1}/{total}</div>
            <div className="bar"><span style={{ width: `${((exIdx)/total)*100}%` }}/></div>
            <div className="col" style={{ marginTop: 8 }}>
              {TREINO_HOJE.exercicios.map((e, i) => (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'12px 8px',
                  borderBottom:'1px solid var(--hairline)',
                  opacity: i < exIdx ? 0.45 : 1,
                }}>
                  <div style={{
                    width:26, height:26, borderRadius:6,
                    background: i === exIdx ? 'var(--accent)' : (i < exIdx ? 'transparent' : 'var(--bg-2)'),
                    border: i === exIdx ? 'none' : '1px solid var(--border)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color: i === exIdx ? 'var(--accent-fg)' : 'var(--text-dim)',
                    fontFamily:'var(--f-mono)', fontSize:12, fontWeight:700,
                  }}>
                    {i < exIdx ? <Icon name="check" size={14} stroke={2.5}/> : (i + 1).toString().padStart(2,'0')}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight: i === exIdx ? 700 : 500, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {e.nome}
                    </div>
                    <div style={{ fontSize:11, color:'var(--text-faint)' }}>
                      {e.series}×{e.reps} · {e.carga}kg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER — Exercício atual */}
          <div className="col flex-1 gap-5" style={{ minWidth: 0 }}>
            <div className="card" style={{ padding: 0, overflow:'hidden' }}>
              <div style={{ display:'flex', alignItems:'stretch' }}>
                <div className="ph-img" style={{ width: 220, height: 220, borderRadius: 0, borderRight:'1px solid var(--hairline)', border:'none' }}/>
                <div className="col flex-1" style={{ padding: '26px 28px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                    <div>
                      <div className="eyebrow" style={{ color:'var(--accent)' }}>Exercício {(exIdx+1).toString().padStart(2,'0')}</div>
                      <h1 className="f-display" style={{ fontSize: 54, margin:'4px 0 6px' }}>{ex.nome.toUpperCase()}</h1>
                      <div style={{ display:'flex', gap: 6 }}>
                        <span className="chip muscle">{ex.grupo}</span>
                        <span className="chip">{ex.series} séries</span>
                        <span className="chip">{ex.reps} reps</span>
                        <span className="chip">desc. {ex.descanso}s</span>
                      </div>
                    </div>
                    <button className="btn ghost"><Icon name="more" size={16}/></button>
                  </div>
                  <div style={{ marginTop:'auto', display:'flex', gap: 28, paddingTop: 18, borderTop:'1px solid var(--hairline)' }}>
                    <div>
                      <div className="stat-label">Última vez</div>
                      <div className="f-display" style={{ fontSize:22 }}>26kg × 10</div>
                    </div>
                    <div className="divider-v" style={{ height: 36, alignSelf:'center' }}/>
                    <div>
                      <div className="stat-label">PR atual</div>
                      <div className="f-display" style={{ fontSize:22, color:'var(--accent)' }}>30kg × 8</div>
                    </div>
                    <div className="divider-v" style={{ height: 36, alignSelf:'center' }}/>
                    <div>
                      <div className="stat-label">Volume hoje</div>
                      <div className="f-display" style={{ fontSize:22 }}>540 <span className="stat-unit">kg</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Séries */}
            <div className="card" style={{ padding: 0 }}>
              <div style={{ display:'grid', gridTemplateColumns:'36px 1fr 1fr 1fr 32px', gap:12,
                padding:'14px 16px', borderBottom:'1px solid var(--hairline)' }}>
                <div className="label-sm">#</div>
                <div className="label-sm">Carga (kg)</div>
                <div className="label-sm">Reps</div>
                <div className="label-sm">RIR</div>
                <div></div>
              </div>
              {sets.map((s, i) => (
                <div key={i} className={"set-row " + (s.done ? "done " : "") + (s.current ? "current" : "")}>
                  <div className="set-idx">{i + 1}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <input className="set-input" defaultValue={s.carga || ''} placeholder="—"/>
                    {s.pr && <span className="chip success" style={{ padding:'2px 8px', fontSize:9 }}>PR</span>}
                  </div>
                  <input className="set-input" defaultValue={s.reps || ''} placeholder="—"/>
                  <input className="set-input" defaultValue={s.done ? "1" : ""} placeholder="—"/>
                  <div className={"check" + (s.done ? " checked" : "")}>
                    {s.done && <Icon name="check" size={14} stroke={3}/>}
                  </div>
                </div>
              ))}
              <div style={{ padding:'14px 16px', borderTop:'1px solid var(--hairline)' }}>
                <button className="btn ghost" style={{ width:'100%', justifyContent:'center' }}>
                  <Icon name="plus" size={14}/> Adicionar série
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Descanso + próximo */}
          <div className="col gap-4" style={{ width: 280 }}>
            <div className="card card-accent" style={{ padding: 24 }}>
              <div className="eyebrow" style={{ color:'rgba(0,0,0,0.5)' }}>Descanso</div>
              <div className="f-display" style={{ fontSize: 96, lineHeight: 0.9, marginTop: 6 }}>00:47</div>
              <div style={{ height: 4, background:'rgba(0,0,0,0.2)', borderRadius: 99, margin:'12px 0' }}>
                <div style={{ width:'48%', height:'100%', background:'#0a0a0a', borderRadius:99 }}/>
              </div>
              <div style={{ display:'flex', gap:8, marginTop: 14 }}>
                <button className="btn" style={{ background:'#0a0a0a', color:'var(--accent)', borderColor:'#0a0a0a', flex:1, justifyContent:'center' }}>
                  +15s
                </button>
                <button className="btn" style={{ background:'#0a0a0a', color:'var(--accent)', borderColor:'#0a0a0a', flex:1, justifyContent:'center' }}>
                  Pular
                </button>
              </div>
            </div>

            <div className="card">
              <div className="label-sm">Próximo</div>
              <div className="f-display" style={{ fontSize: 28, marginTop: 6, lineHeight: 1.05 }}>
                CRUCIFIXO POLIA ALTA
              </div>
              <div style={{ color:'var(--text-dim)', fontSize:13, marginTop: 4 }}>
                3 séries · 12-15 reps · 15kg
              </div>
              <div className="ph-img" style={{ height: 100, marginTop: 14 }}/>
            </div>

            <div className="card card-flat">
              <div className="label-sm">Sessão</div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, fontSize:13 }}>
                <span style={{ color:'var(--text-dim)' }}>Volume</span>
                <span className="f-mono">2.140 kg</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:13 }}>
                <span style={{ color:'var(--text-dim)' }}>Séries</span>
                <span className="f-mono">7 / 24</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:13 }}>
                <span style={{ color:'var(--text-dim)' }}>FC média</span>
                <span className="f-mono">132 bpm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ DESKTOP — Variação B: cronômetro hero, layout horizontal ============
function TreinoExecucaoB() {
  const ex = TREINO_HOJE.exercicios[1];
  const sets = [
    { reps: 10, carga: 26, done: true  },
    { reps: 10, carga: 28, done: true,  pr: true },
    { reps: 8,  carga: 28, done: false, current: true },
    { reps: "", carga: 28, done: false },
  ];

  return (
    <div className="scr" data-screen-label="Treino em Execução — Desktop B">
      <Sidebar active="treino"/>
      <div className="main">
        <div className="topbar" style={{ background:'var(--accent)', color:'var(--accent-fg)', borderBottom:'none' }}>
          <div className="topbar-left">
            <div className="topbar-title" style={{ color:'var(--accent-fg)' }}>EM TREINO · 24:18</div>
            <div style={{ fontSize:13, color:'rgba(0,0,0,0.55)' }}>{TREINO_HOJE.nome}</div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn" style={{ background:'#0a0a0a', color:'var(--accent)', borderColor:'#0a0a0a' }}>
              <Icon name="pause" size={14}/> Pausar
            </button>
            <button className="btn" style={{ background:'rgba(0,0,0,0.85)', color:'var(--text)', borderColor:'rgba(0,0,0,0.85)' }}>
              Encerrar treino
            </button>
          </div>
        </div>

        <div className="content" style={{ padding: 0, gap: 0 }}>
          {/* HERO — exercício + cronômetro */}
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', minHeight: 320, borderBottom:'1px solid var(--hairline)' }}>
            <div style={{ padding:'36px 40px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
              <div>
                <div className="eyebrow">Exercício 02 de 07 · {ex.grupo}</div>
                <h1 className="f-display" style={{ fontSize: 96, margin:'10px 0 0', maxWidth: '12ch' }}>
                  {ex.nome.toUpperCase()}
                </h1>
              </div>
              <div style={{ display:'flex', gap:36, marginTop: 24 }}>
                <div>
                  <div className="stat-label">Meta</div>
                  <div className="f-display" style={{ fontSize: 40 }}>
                    {ex.series}<span style={{ color:'var(--text-dim)' }}>×</span>{ex.reps}
                  </div>
                </div>
                <div className="divider-v" style={{ height: 56, alignSelf:'center' }}/>
                <div>
                  <div className="stat-label">Carga base</div>
                  <div className="f-display" style={{ fontSize: 40 }}>{ex.carga}<span className="stat-unit">kg</span></div>
                </div>
                <div className="divider-v" style={{ height: 56, alignSelf:'center' }}/>
                <div>
                  <div className="stat-label">PR</div>
                  <div className="f-display" style={{ fontSize: 40, color:'var(--accent)' }}>30<span className="stat-unit">kg</span></div>
                </div>
              </div>
            </div>
            <div style={{
              background:'#050506', borderLeft:'1px solid var(--hairline)',
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              padding: 32, position:'relative', overflow:'hidden',
            }}>
              <div style={{
                position:'absolute', inset:-1, opacity:0.04,
                background:`radial-gradient(circle at center, var(--accent) 0%, transparent 70%)`,
              }}/>
              <div className="eyebrow" style={{ color:'var(--accent)' }}>DESCANSO</div>
              <div className="f-display" style={{ fontSize: 180, lineHeight: 0.85, marginTop: 8, color:'var(--accent)', position:'relative' }}>00:47</div>
              <div style={{ display:'flex', gap: 10, marginTop: 18, position:'relative' }}>
                <button className="btn">-15s</button>
                <button className="btn">+15s</button>
                <button className="btn primary"><Icon name="play" size={12}/> Pular</button>
              </div>
            </div>
          </div>

          {/* MIDDLE — séries da série atual + lista compacta */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', minHeight: 380 }}>
            <div style={{ padding:'28px 40px', borderRight:'1px solid var(--hairline)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: 16 }}>
                <div className="f-display" style={{ fontSize: 24 }}>SÉRIES</div>
                <div style={{ display:'flex', gap: 6 }}>
                  <span className="chip">RIR · Reserva</span>
                  <span className="chip">Cadência 3-0-1-0</span>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'36px 1fr 1fr 1fr 80px', gap:12, padding:'10px 0 14px',
                borderBottom:'1px solid var(--hairline)', color:'var(--text-dim)', fontSize:11, textTransform:'uppercase', letterSpacing:'0.1em' }}>
                <div>#</div><div>Carga</div><div>Reps</div><div>RIR</div><div></div>
              </div>
              {sets.map((s, i) => (
                <div key={i} className={"set-row " + (s.done ? "done " : "") + (s.current ? "current" : "")}>
                  <div className="set-idx">0{i + 1}</div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <input className="set-input" defaultValue={s.carga || ''} placeholder="—"/>
                    {s.pr && <span className="chip success" style={{ padding:'2px 8px', fontSize:9 }}>+PR</span>}
                  </div>
                  <input className="set-input" defaultValue={s.reps || ''} placeholder="—"/>
                  <input className="set-input" defaultValue={s.done ? "2" : ""} placeholder="—"/>
                  <div style={{ display:'flex', justifyContent:'flex-end' }}>
                    <div className={"check" + (s.done ? " checked" : "")}>
                      {s.done && <Icon name="check" size={14} stroke={3}/>}
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn ghost" style={{ marginTop: 14 }}>
                <Icon name="plus" size={14}/> Drop set / Falha
              </button>
            </div>

            <div style={{ padding:'24px 22px', background:'var(--bg-1)' }}>
              <div className="label-sm">Próximos exercícios</div>
              <div className="col gap-3" style={{ marginTop: 14 }}>
                {TREINO_HOJE.exercicios.slice(2, 6).map((e, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 0', borderBottom:'1px solid var(--hairline)' }}>
                    <div className="ph-img" style={{ width:48, height:48, flexShrink:0 }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{e.nome}</div>
                      <div style={{ fontSize:11, color:'var(--text-dim)' }}>{e.series}×{e.reps} · {e.carga}kg</div>
                    </div>
                    <div className="pill-num">0{i + 3}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MOBILE — Treino em execução ============
function TreinoExecucaoMobile() {
  const ex = TREINO_HOJE.exercicios[1];
  const sets = [
    { reps: 10, carga: 26, done: true  },
    { reps: 10, carga: 28, done: true,  pr: true },
    { reps: 8,  carga: 28, done: false, current: true },
    { reps: "", carga: 28, done: false },
  ];
  return (
    <div className="mob" data-screen-label="Treino em Execução — Mobile">
      <MobStatus/>
      <div style={{ padding: '8px 22px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button style={{ background:'transparent', border:'none', color:'var(--text)' }}>
          <Icon name="arrowL" size={22}/>
        </button>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
          <span style={{ fontSize:10, color:'var(--text-dim)', letterSpacing:'0.15em' }}>EM TREINO</span>
          <span className="f-mono" style={{ fontSize:16, fontWeight:600, color:'var(--accent)' }}>24:18</span>
        </div>
        <button style={{ background:'transparent', border:'none', color:'var(--text)' }}>
          <Icon name="more" size={22}/>
        </button>
      </div>

      <div style={{ padding: '4px 22px 16px' }}>
        <div className="eyebrow">Exercício 02 / 07 · {ex.grupo}</div>
        <h1 className="f-display" style={{ fontSize: 44, margin: '4px 0 12px' }}>
          {ex.nome.toUpperCase()}
        </h1>
        <div className="bar"><span style={{ width: '28%' }}/></div>
      </div>

      <div style={{ flex:1, overflow:'auto', padding: '0 16px' }}>
        <div className="card card-accent" style={{ padding: 18, marginBottom: 14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div className="eyebrow" style={{ color:'rgba(0,0,0,0.55)' }}>DESCANSO</div>
            <div style={{ display:'flex', gap:6 }}>
              <button className="btn" style={{ background:'#0a0a0a', color:'var(--accent)', borderColor:'#0a0a0a', padding:'6px 10px', fontSize:11 }}>+15s</button>
              <button className="btn" style={{ background:'#0a0a0a', color:'var(--accent)', borderColor:'#0a0a0a', padding:'6px 10px', fontSize:11 }}>PULAR</button>
            </div>
          </div>
          <div className="f-display" style={{ fontSize: 80, lineHeight: 0.85, marginTop: 4 }}>00:47</div>
          <div style={{ height: 3, background:'rgba(0,0,0,0.2)', borderRadius: 99, marginTop: 8 }}>
            <div style={{ width:'48%', height:'100%', background:'#0a0a0a', borderRadius:99 }}/>
          </div>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div style={{ display:'grid', gridTemplateColumns:'28px 1fr 1fr 36px', gap: 10,
            padding:'12px 14px', borderBottom:'1px solid var(--hairline)',
            fontSize:10, color:'var(--text-dim)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
            <div>#</div><div>Kg</div><div>Reps</div><div></div>
          </div>
          {sets.map((s, i) => (
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'28px 1fr 1fr 36px', gap:10,
              padding:'14px 14px',
              borderBottom: i === sets.length - 1 ? 'none' : '1px solid var(--hairline)',
              alignItems:'center',
              opacity: s.done ? 0.5 : 1,
              background: s.current ? 'var(--bg-2)' : 'transparent',
            }}>
              <div className="f-display" style={{ fontSize:18, color: s.current ? 'var(--accent)' : 'var(--text-dim)' }}>{i+1}</div>
              <input className="set-input" defaultValue={s.carga || ''} placeholder="—" style={{ fontSize:14, padding:'6px 8px' }}/>
              <input className="set-input" defaultValue={s.reps || ''} placeholder="—" style={{ fontSize:14, padding:'6px 8px' }}/>
              <div className={"check" + (s.done ? " checked" : "")} style={{ width:20, height:20 }}>
                {s.done && <Icon name="check" size={12} stroke={3}/>}
              </div>
            </div>
          ))}
        </div>

        <button className="btn primary" style={{ width:'100%', justifyContent:'center', marginTop: 16, padding:'16px' }}>
          CONCLUIR SÉRIE · INICIAR DESCANSO
        </button>

        <div style={{ marginTop: 18, padding:'14px 16px', background:'var(--bg-1)', borderRadius:'var(--r-3)', border:'1px solid var(--hairline)' }}>
          <div className="label-sm">Próximo</div>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:8 }}>
            <div className="ph-img" style={{ width:48, height:48 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:600 }}>Crucifixo Polia Alta</div>
              <div style={{ fontSize:11, color:'var(--text-dim)' }}>3×12-15 · 15kg</div>
            </div>
            <Icon name="arrow" size={18}/>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TreinoExecucaoA, TreinoExecucaoB, TreinoExecucaoMobile, TREINO_HOJE });
