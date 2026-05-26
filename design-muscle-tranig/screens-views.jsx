/* global React, Sidebar, Icon, MobStatus, TREINO_HOJE */
// Dashboard, Semana, Biblioteca, Histórico — telas de visualização

// ============ DASHBOARD / HOJE ============
function Dashboard() {
  const semana = [
    { dia: "SEG", nome: "PULL", grupos: "Costas · Bíceps", duracao: 58, done: true },
    { dia: "TER", nome: "LEGS", grupos: "Quadríceps · Glúteo", duracao: 72, done: true },
    { dia: "QUA", nome: "DESCANSO", grupos: "Mobilidade leve", duracao: 0, rest: true },
    { dia: "QUI", nome: "PUSH", grupos: "Peito · Ombro · Tríceps", duracao: 62, today: true },
    { dia: "SEX", nome: "PULL", grupos: "Costas · Bíceps", duracao: 58 },
    { dia: "SAB", nome: "LEGS", grupos: "Posterior · Panturrilha", duracao: 65 },
    { dia: "DOM", nome: "DESCANSO", grupos: "Folga total", duracao: 0, rest: true },
  ];

  return (
    <div className="scr" data-screen-label="Dashboard / Hoje — Desktop">
      <Sidebar active="home"/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div style={{ fontSize:12, color:'var(--text-dim)', letterSpacing:'0.15em' }}>QUINTA · 21 MAI · 2026</div>
            <div className="topbar-title">BOM DIA, LUCAS</div>
          </div>
          <div style={{ display:'flex', gap: 10, alignItems:'center' }}>
            <button className="btn ghost"><Icon name="bell" size={16}/></button>
            <button className="btn ghost"><Icon name="search" size={16}/></button>
            <button className="btn primary"><Icon name="play" size={12}/> Iniciar treino</button>
          </div>
        </div>

        <div className="content">
          {/* Hero: Treino do dia */}
          <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap: 20 }}>
            <div className="card card-accent" style={{ padding: 32, position:'relative', overflow:'hidden', minHeight: 280 }}>
              <div style={{ position:'absolute', right:-40, top:-40, opacity:0.06, fontFamily:'var(--f-display)', fontSize: 380, lineHeight:0.8, color:'#000' }}>
                04
              </div>
              <div style={{ position:'relative' }}>
                <div className="eyebrow" style={{ color:'rgba(0,0,0,0.55)' }}>TREINO DE HOJE · 04 DE 06</div>
                <h1 className="f-display" style={{ fontSize: 96, lineHeight:0.9, margin:'8px 0 4px' }}>PUSH</h1>
                <div style={{ fontSize:16, color:'rgba(0,0,0,0.7)' }}>Peito · Ombro · Tríceps</div>
                <div style={{ display:'flex', gap:24, marginTop: 28, alignItems:'baseline' }}>
                  <div>
                    <div style={{ fontSize:10, color:'rgba(0,0,0,0.55)', letterSpacing:'0.15em' }}>EXERCÍCIOS</div>
                    <div className="f-display" style={{ fontSize: 36 }}>07</div>
                  </div>
                  <div style={{ width:1, height: 40, background:'rgba(0,0,0,0.2)' }}/>
                  <div>
                    <div style={{ fontSize:10, color:'rgba(0,0,0,0.55)', letterSpacing:'0.15em' }}>TEMPO ESTIMADO</div>
                    <div className="f-display" style={{ fontSize: 36 }}>62 <span style={{ fontSize:18 }}>min</span></div>
                  </div>
                  <div style={{ width:1, height: 40, background:'rgba(0,0,0,0.2)' }}/>
                  <div>
                    <div style={{ fontSize:10, color:'rgba(0,0,0,0.55)', letterSpacing:'0.15em' }}>VOLUME ALVO</div>
                    <div className="f-display" style={{ fontSize: 36 }}>8.4t</div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:10, marginTop: 28 }}>
                  <button className="btn lg" style={{ background:'#0a0a0a', color:'var(--accent)', borderColor:'#0a0a0a' }}>
                    <Icon name="play" size={14}/> Começar agora
                  </button>
                  <button className="btn lg" style={{ background:'transparent', color:'#0a0a0a', borderColor:'rgba(0,0,0,0.3)' }}>
                    Ver detalhes
                  </button>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="col gap-3">
              <div className="card" style={{ display:'flex', alignItems:'flex-end', gap: 18 }}>
                <div>
                  <div className="stat-label">Streak</div>
                  <div className="stat-num">17 <span className="stat-unit">dias</span></div>
                </div>
                <div style={{ flex:1, display:'flex', gap:3, alignItems:'flex-end', paddingBottom: 6 }}>
                  {[40,55,30,70,65,80,90,50,75,85,60,95].map((h,i) => (
                    <div key={i} style={{ flex:1, height: h * 0.6, background: i > 8 ? 'var(--accent)' : 'var(--bg-3)', borderRadius: 2 }}/>
                  ))}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
                <div className="card">
                  <div className="stat-label">Volume / semana</div>
                  <div className="stat-num" style={{ fontSize: 44 }}>32.8<span className="stat-unit">t</span></div>
                  <div style={{ color:'var(--success)', fontSize:12, marginTop: 4 }}>↗ +12% vs ant.</div>
                </div>
                <div className="card">
                  <div className="stat-label">PRs no mês</div>
                  <div className="stat-num" style={{ fontSize: 44, color:'var(--accent)' }}>06</div>
                  <div style={{ color:'var(--text-dim)', fontSize:12, marginTop: 4 }}>2 esta semana</div>
                </div>
              </div>
            </div>
          </div>

          {/* Semana strip */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '20px 24px', borderBottom:'1px solid var(--hairline)' }}>
              <h2 className="card-title">SEMANA 22 · CICLO HIPERTROFIA</h2>
              <button className="btn ghost">Ver tudo <Icon name="arrow" size={14}/></button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(7, 1fr)' }}>
              {semana.map((d, i) => (
                <div key={i} style={{
                  padding: '18px 16px',
                  borderRight: i < 6 ? '1px solid var(--hairline)' : 'none',
                  background: d.today ? 'var(--bg-2)' : 'transparent',
                  borderTop: d.today ? '3px solid var(--accent)' : '3px solid transparent',
                  opacity: d.rest ? 0.55 : 1,
                  minHeight: 130,
                  display:'flex', flexDirection:'column', gap:4,
                }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span className="label-sm" style={{ color: d.today ? 'var(--accent)' : 'var(--text-dim)' }}>{d.dia}</span>
                    {d.done && <div className="check checked" style={{ width:16, height:16 }}><Icon name="check" size={10} stroke={3}/></div>}
                    {d.today && <span className="chip solid" style={{ padding:'2px 6px', fontSize:9 }}>HOJE</span>}
                  </div>
                  <div className="f-display" style={{ fontSize:22, lineHeight:1 }}>{d.nome}</div>
                  <div style={{ fontSize:11, color:'var(--text-dim)' }}>{d.grupos}</div>
                  {!d.rest && <div style={{ fontSize:11, color:'var(--text-faint)', marginTop:'auto' }}>{d.duracao}min</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: progresso + atalhos */}
          <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap: 20 }}>
            <div className="card">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <h2 className="card-title">VOLUME · ÚLTIMAS 8 SEMANAS</h2>
                <div style={{ display:'flex', gap:6 }}>
                  <span className="chip solid">Volume</span>
                  <span className="chip">Intensidade</span>
                </div>
              </div>
              <div style={{ height: 160, display:'flex', alignItems:'flex-end', gap: 12, marginTop: 24 }}>
                {[
                  { w:"S15", v:55 }, { w:"S16", v:62 }, { w:"S17", v:58 },
                  { w:"S18", v:70 }, { w:"S19", v:68 }, { w:"S20", v:78 },
                  { w:"S21", v:82 }, { w:"S22", v:95, current:true },
                ].map((b, i) => (
                  <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                    <div style={{ width:'100%', height: `${b.v}%`,
                      background: b.current ? 'var(--accent)' : 'var(--bg-3)',
                      borderRadius: 4,
                      position:'relative',
                    }}>
                      {b.current && <div style={{ position:'absolute', top:-22, left:'50%', transform:'translateX(-50%)', fontFamily:'var(--f-display)', fontSize:18, whiteSpace:'nowrap' }}>32.8t</div>}
                    </div>
                    <div style={{ fontSize:10, color:'var(--text-dim)' }}>{b.w}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="card-title">PRs RECENTES</h2>
              <div className="col gap-3" style={{ marginTop: 18 }}>
                {[
                  { ex:"Supino Inclinado Halter", val:"30kg × 8", quando:"há 2 dias" },
                  { ex:"Agachamento Livre",        val:"120kg × 5", quando:"semana 21" },
                  { ex:"Levantamento Terra",       val:"140kg × 3", quando:"semana 21" },
                  { ex:"Barra Fixa Lastreada",     val:"+15kg × 6", quando:"semana 20" },
                ].map((p, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12, paddingBottom: 12, borderBottom: i < 3 ? '1px solid var(--hairline)' : 'none' }}>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--bg-2)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent)' }}>
                      <Icon name="trophy" size={18}/>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{p.ex}</div>
                      <div style={{ fontSize:11, color:'var(--text-dim)' }}>{p.quando}</div>
                    </div>
                    <div className="f-display" style={{ fontSize:20, color:'var(--accent)' }}>{p.val}</div>
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

// ============ DASHBOARD MOBILE ============
function DashboardMobile() {
  return (
    <div className="mob" data-screen-label="Dashboard — Mobile">
      <MobStatus/>
      <div style={{ padding:'8px 22px 16px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, color:'var(--text-dim)', letterSpacing:'0.15em' }}>QUI · 21 MAI</div>
            <div className="f-display" style={{ fontSize: 36 }}>BOM DIA,<br/>LUCAS</div>
          </div>
          <div className="nav-avatar" style={{ width:42, height:42, fontSize:20 }}>L</div>
        </div>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'0 16px 16px' }}>
        <div className="card card-accent" style={{ padding: 22, marginBottom: 14, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', right:-30, top:-30, fontFamily:'var(--f-display)', fontSize:220, opacity:0.08, color:'#000' }}>04</div>
          <div style={{ position:'relative' }}>
            <div className="eyebrow" style={{ color:'rgba(0,0,0,0.55)' }}>HOJE · DIA 04 / 06</div>
            <h1 className="f-display" style={{ fontSize: 68, lineHeight:0.85, margin:'4px 0' }}>PUSH</h1>
            <div style={{ fontSize:13, color:'rgba(0,0,0,0.7)' }}>Peito · Ombro · Tríceps</div>
            <div style={{ display:'flex', gap:14, marginTop:16, fontFamily:'var(--f-mono)', fontSize:12 }}>
              <span><b>7</b> exercícios</span>
              <span><b>62</b>min</span>
              <span><b>8.4t</b> volume</span>
            </div>
            <button className="btn lg" style={{ background:'#0a0a0a', color:'var(--accent)', borderColor:'#0a0a0a', width:'100%', justifyContent:'center', marginTop:18 }}>
              <Icon name="play" size={14}/> COMEÇAR TREINO
            </button>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:14 }}>
          <div className="card" style={{ padding: 16 }}>
            <div className="stat-label">Streak</div>
            <div className="f-display" style={{ fontSize: 40 }}>17 <span className="stat-unit" style={{ fontSize:13 }}>dias</span></div>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <div className="stat-label">Vol. semana</div>
            <div className="f-display" style={{ fontSize: 40 }}>32.8<span className="stat-unit" style={{ fontSize:13 }}>t</span></div>
          </div>
        </div>

        <div className="card" style={{ padding: 18 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span className="label-sm">SEMANA 22</span>
            <span className="chip">Hipertrofia</span>
          </div>
          <div style={{ display:'flex', gap:6, marginTop:14, justifyContent:'space-between' }}>
            {['S','T','Q','Q','S','S','D'].map((d, i) => {
              const states = [{done:true},{done:true},{rest:true},{today:true},{},{},{rest:true}];
              const st = states[i];
              return (
                <div key={i} style={{
                  flex:1, padding:'10px 4px',
                  background: st.today ? 'var(--accent)' : st.rest ? 'transparent' : 'var(--bg-2)',
                  color: st.today ? 'var(--accent-fg)' : st.rest ? 'var(--text-faint)' : 'var(--text)',
                  borderRadius: 6, textAlign:'center',
                  border: st.rest ? '1px dashed var(--border)' : 'none',
                }}>
                  <div style={{ fontSize:9, letterSpacing:'0.1em', opacity:0.7 }}>{d}</div>
                  <div className="f-display" style={{ fontSize:18, marginTop:2 }}>
                    {st.done ? '✓' : st.rest ? '—' : (i+19)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mob-tabbar">
        {[
          { i: "home",   l:"Hoje",       a: true },
          { i: "flame",  l:"Treino" },
          { i: "calendar", l:"Semana" },
          { i: "chart",  l:"Progresso" },
          { i: "user",   l:"Perfil" },
        ].map((t, k) => (
          <div key={k} className={"mob-tab" + (t.a ? " active":"")}>
            <Icon name={t.i} size={22}/>{t.l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ LISTA SEMANA ============
function SemanaPlan() {
  const dias = [
    { dia:"Segunda", data:"19/05", treino:"PULL A", grupos:["Costas", "Bíceps"], exercicios:7, duracao:58, status:"done", volume:"6.8t" },
    { dia:"Terça",   data:"20/05", treino:"LEGS A", grupos:["Quadríceps","Glúteo"], exercicios:8, duracao:72, status:"done", volume:"12.4t" },
    { dia:"Quarta",  data:"21/05", treino:"DESCANSO", grupos:["Mobilidade"], exercicios:5, duracao:25, status:"rest" },
    { dia:"Quinta",  data:"22/05", treino:"PUSH A", grupos:["Peito","Ombro","Tríceps"], exercicios:7, duracao:62, status:"today", volume:"8.4t" },
    { dia:"Sexta",   data:"23/05", treino:"PULL B", grupos:["Costas","Bíceps"], exercicios:7, duracao:58, volume:"7.2t" },
    { dia:"Sábado",  data:"24/05", treino:"LEGS B", grupos:["Posterior","Panturrilha"], exercicios:6, duracao:65, volume:"10.1t" },
    { dia:"Domingo", data:"25/05", treino:"DESCANSO", grupos:["Folga"], exercicios:0, duracao:0, status:"rest" },
  ];

  return (
    <div className="scr" data-screen-label="Lista da Semana — Desktop">
      <Sidebar active="semana"/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div style={{ fontSize:12, color:'var(--text-dim)', letterSpacing:'0.15em' }}>CICLO HIPERTROFIA · SEMANA 22 DE 12</div>
            <div className="topbar-title">PLANO DA SEMANA</div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn ghost"><Icon name="arrowL" size={14}/></button>
            <button className="btn">19 — 25 mai</button>
            <button className="btn ghost"><Icon name="arrow" size={14}/></button>
            <button className="btn primary"><Icon name="plus" size={14}/> Novo dia</button>
          </div>
        </div>

        <div className="content">
          {/* Resumo */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14 }}>
            {[
              { l:"Concluídos",  v:"2 / 5", c:'var(--success)' },
              { l:"Volume real", v:"19.2t" },
              { l:"PRs",         v:"02", c:'var(--accent)' },
              { l:"Aderência",   v:"100%" },
            ].map((s, i) => (
              <div key={i} className="card">
                <div className="stat-label">{s.l}</div>
                <div className="f-display" style={{ fontSize: 48, color: s.c || 'var(--text)' }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Lista de dias */}
          <div className="col gap-3">
            {dias.map((d, i) => (
              <div key={i} className="card" style={{
                padding: 0,
                borderColor: d.status === 'today' ? 'var(--accent)' : 'var(--hairline)',
                opacity: d.status === 'rest' ? 0.7 : 1,
              }}>
                <div style={{ display:'grid', gridTemplateColumns:'140px 1fr auto', alignItems:'center', padding:'22px 26px', gap:24 }}>
                  <div>
                    <div className="label-sm" style={{ color: d.status === 'today' ? 'var(--accent)' : 'var(--text-dim)' }}>
                      {d.dia.toUpperCase()} · {d.data}
                    </div>
                    <div style={{ marginTop: 6, display:'flex', gap:6, alignItems:'center' }}>
                      {d.status === 'done'  && <span className="chip success">CONCLUÍDO</span>}
                      {d.status === 'today' && <span className="chip solid">HOJE</span>}
                      {d.status === 'rest'  && <span className="chip">DESCANSO</span>}
                    </div>
                  </div>

                  <div>
                    <h2 className="f-display" style={{ fontSize: 44, margin:0, lineHeight: 1 }}>{d.treino}</h2>
                    <div style={{ display:'flex', gap:6, marginTop: 8 }}>
                      {d.grupos.map((g, k) => <span key={k} className="chip muscle">{g}</span>)}
                    </div>
                  </div>

                  <div style={{ display:'flex', alignItems:'center', gap: 28 }}>
                    <div style={{ display:'flex', gap: 22 }}>
                      <div>
                        <div className="stat-label">Exerc.</div>
                        <div className="f-display" style={{ fontSize: 26 }}>{d.exercicios || '—'}</div>
                      </div>
                      <div>
                        <div className="stat-label">Tempo</div>
                        <div className="f-display" style={{ fontSize: 26 }}>{d.duracao || '—'}<span className="stat-unit" style={{ fontSize:12 }}>min</span></div>
                      </div>
                      <div>
                        <div className="stat-label">Volume</div>
                        <div className="f-display" style={{ fontSize: 26, color: d.status === 'today' ? 'var(--accent)' : 'var(--text)' }}>
                          {d.volume || '—'}
                        </div>
                      </div>
                    </div>
                    {d.status === 'today' && (
                      <button className="btn primary"><Icon name="play" size={12}/> Iniciar</button>
                    )}
                    {d.status !== 'today' && d.status !== 'rest' && (
                      <button className="btn ghost">Ver <Icon name="arrow" size={14}/></button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ BIBLIOTECA DE EXERCÍCIOS ============
function Biblioteca() {
  const exercicios = [
    { nome:"Supino Reto Barra",        grupo:"Peito",   equip:"Barra",     dificuldade:"Avançado",     pr:"100kg × 5"  },
    { nome:"Supino Inclinado Halter",  grupo:"Peito",   equip:"Halter",    dificuldade:"Intermediário", pr:"30kg × 8"  },
    { nome:"Crucifixo Polia Alta",     grupo:"Peito",   equip:"Polia",     dificuldade:"Iniciante",     pr:"18kg × 12" },
    { nome:"Crossover",                grupo:"Peito",   equip:"Polia",     dificuldade:"Intermediário", pr:"22kg × 10" },
    { nome:"Mergulho Paralelas",       grupo:"Peito",   equip:"Peso corporal", dificuldade:"Avançado",  pr:"+25kg × 8" },
    { nome:"Desenvolvimento Militar",  grupo:"Ombro",   equip:"Barra",     dificuldade:"Avançado",     pr:"60kg × 5"  },
    { nome:"Elevação Lateral",         grupo:"Ombro",   equip:"Halter",    dificuldade:"Iniciante",     pr:"14kg × 12" },
    { nome:"Face Pull",                grupo:"Ombro",   equip:"Polia",     dificuldade:"Iniciante",     pr:"30kg × 15" },
  ];
  const grupos = [
    { l:"Todos", n:124, a:true },
    { l:"Peito", n:18 },
    { l:"Costas", n:22 },
    { l:"Ombro", n:14 },
    { l:"Bíceps", n:11 },
    { l:"Tríceps", n:12 },
    { l:"Quadríceps", n:16 },
    { l:"Posterior", n:9 },
    { l:"Glúteo", n:10 },
    { l:"Panturrilha", n:5 },
    { l:"Abdômen", n:7 },
  ];

  return (
    <div className="scr" data-screen-label="Biblioteca de Exercícios — Desktop">
      <Sidebar active="biblio"/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div style={{ fontSize:12, color:'var(--text-dim)', letterSpacing:'0.15em' }}>124 EXERCÍCIOS · 11 GRUPOS</div>
            <div className="topbar-title">BIBLIOTECA</div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <div style={{ position:'relative' }}>
              <input className="input" placeholder="Buscar exercício..." style={{ width: 340, paddingLeft: 38 }}/>
              <Icon name="search" size={16} style={{ position:'absolute', left:14, top:14, color:'var(--text-faint)' }}/>
            </div>
            <button className="btn primary"><Icon name="plus" size={14}/> Criar exercício</button>
          </div>
        </div>

        <div className="content" style={{ flexDirection:'row', padding: 0, gap: 0 }}>
          <div style={{ width: 220, padding:'24px 18px', borderRight:'1px solid var(--hairline)' }}>
            <div className="label-sm" style={{ marginBottom: 12 }}>GRUPO MUSCULAR</div>
            <div className="col gap-1">
              {grupos.map((g, i) => (
                <div key={i} className={"nav-item" + (g.a ? " active" : "")} style={{ justifyContent:'space-between' }}>
                  <span>{g.l}</span>
                  <span style={{ fontSize:11, opacity: 0.7 }}>{g.n}</span>
                </div>
              ))}
            </div>
            <div className="label-sm" style={{ margin:'24px 8px 12px' }}>EQUIPAMENTO</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, padding:'0 8px' }}>
              {['Barra','Halter','Polia','Máquina','Corporal','Anilha','Elástico'].map((e, i) => (
                <span key={i} className="chip" style={{ cursor:'pointer' }}>{e}</span>
              ))}
            </div>
          </div>

          <div style={{ flex:1, padding:'24px 28px', overflow:'auto' }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {exercicios.map((e, i) => (
                <div key={i} className="card" style={{ padding: 0, overflow:'hidden', cursor:'pointer' }}>
                  <div className="ph-img" style={{ height: 140, borderRadius: 0, border:'none', borderBottom:'1px solid var(--hairline)' }}/>
                  <div style={{ padding: 16 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                      <div className="f-display" style={{ fontSize: 22, lineHeight: 1.05 }}>{e.nome.toUpperCase()}</div>
                      <button style={{ background:'transparent', border:'none', color:'var(--text-dim)', cursor:'pointer' }}>
                        <Icon name="plus" size={16}/>
                      </button>
                    </div>
                    <div style={{ display:'flex', gap:6, marginTop:10, flexWrap:'wrap' }}>
                      <span className="chip muscle">{e.grupo}</span>
                      <span className="chip">{e.equip}</span>
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:14, paddingTop:12, borderTop:'1px solid var(--hairline)' }}>
                      <div>
                        <div style={{ fontSize:9, color:'var(--text-faint)', letterSpacing:'0.1em' }}>PR</div>
                        <div className="f-mono" style={{ fontSize:13, fontWeight:600, color:'var(--accent)' }}>{e.pr}</div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:9, color:'var(--text-faint)', letterSpacing:'0.1em' }}>NÍVEL</div>
                        <div style={{ fontSize:11, color:'var(--text-dim)' }}>{e.dificuldade}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ HISTÓRICO / PROGRESSO (gráficos) ============
function Progresso() {
  // Sparkline data
  const lineData = [62, 65, 70, 68, 72, 75, 78, 82, 80, 85, 88, 92];
  const max = Math.max(...lineData);
  const w = 600, h = 200;
  const points = lineData.map((v, i) => `${(i/(lineData.length-1))*w},${h - (v/max)*h*0.85}`).join(' ');
  const area = `0,${h} ${points} ${w},${h}`;

  return (
    <div className="scr" data-screen-label="Progresso / Histórico — Desktop">
      <Sidebar active="historico"/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div style={{ fontSize:12, color:'var(--text-dim)', letterSpacing:'0.15em' }}>ÚLTIMOS 90 DIAS</div>
            <div className="topbar-title">PROGRESSO</div>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            {['7d','30d','90d','1y','Tudo'].map((t, i) => (
              <button key={i} className={"btn " + (i === 2 ? "primary" : "ghost")}>{t}</button>
            ))}
          </div>
        </div>

        <div className="content">
          {/* Top stats */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14 }}>
            {[
              { l:"Treinos",      v:"38",  d:"+4 vs ant.", c:'var(--success)' },
              { l:"Volume total", v:"284t", d:"+18% vs ant.", c:'var(--success)' },
              { l:"PRs novos",    v:"14",  d:"6 esta sem.",  c:'var(--accent)' },
              { l:"Aderência",    v:"94%", d:"−2pp vs ant.", c:'var(--warn)' },
            ].map((s, i) => (
              <div key={i} className="card">
                <div className="stat-label">{s.l}</div>
                <div className="f-display" style={{ fontSize: 56 }}>{s.v}</div>
                <div style={{ fontSize:11, color: s.c, marginTop:4 }}>{s.d}</div>
              </div>
            ))}
          </div>

          {/* Big chart */}
          <div className="card">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <h2 className="card-title">SUPINO INCLINADO HALTER</h2>
                <div style={{ display:'flex', gap:8, marginTop: 8, alignItems:'baseline' }}>
                  <div className="f-display" style={{ fontSize: 64, color:'var(--accent)' }}>30<span className="stat-unit">kg × 8</span></div>
                  <div style={{ color:'var(--success)', fontSize:13, marginLeft: 12 }}>↗ +6kg em 12 semanas</div>
                </div>
              </div>
              <div style={{ display:'flex', gap:6 }}>
                <span className="chip solid">Carga PR</span>
                <span className="chip">Volume</span>
                <span className="chip">Reps</span>
              </div>
            </div>
            <div style={{ marginTop: 24, position:'relative' }}>
              <svg viewBox={`-30 -20 ${w + 60} ${h + 40}`} width="100%" style={{ display:'block' }}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#d4ff3a" stopOpacity="0.4"/>
                    <stop offset="100%" stopColor="#d4ff3a" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {[0, 0.25, 0.5, 0.75, 1].map((y, i) => (
                  <g key={i}>
                    <line x1="0" x2={w} y1={h*y} y2={h*y} stroke="rgba(255,255,255,0.04)"/>
                    <text x={-8} y={h*y + 4} fill="var(--text-faint)" fontSize="10" textAnchor="end">{Math.round(max*(1-y))}kg</text>
                  </g>
                ))}
                <polygon points={area} fill="url(#g1)"/>
                <polyline points={points} fill="none" stroke="var(--accent)" strokeWidth="2.5"/>
                {lineData.map((v, i) => {
                  const x = (i/(lineData.length-1))*w;
                  const y = h - (v/max)*h*0.85;
                  const isLast = i === lineData.length - 1;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r={isLast ? 6 : 3} fill={isLast ? "var(--accent)" : "var(--bg-0)"} stroke="var(--accent)" strokeWidth="2"/>
                      {isLast && <text x={x} y={y - 14} fontSize="11" fill="var(--accent)" fontFamily="var(--f-display)" textAnchor="middle">PR</text>}
                    </g>
                  );
                })}
                {['Mar 1','','Mar 15','','Abr 1','','Abr 15','','Mai 1','','Mai 15',''].map((l, i) => (
                  l ? <text key={i} x={(i/(lineData.length-1))*w} y={h + 18} fill="var(--text-faint)" fontSize="10" textAnchor="middle">{l}</text> : null
                ))}
              </svg>
            </div>
          </div>

          {/* Body composition + group focus */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 20 }}>
            <div className="card">
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <h2 className="card-title">DISTRIBUIÇÃO POR GRUPO</h2>
                <span className="chip">90 dias</span>
              </div>
              <div className="col gap-3" style={{ marginTop: 18 }}>
                {[
                  { l:"Peito",      p:18, abs:"51t", c:'var(--accent)' },
                  { l:"Costas",     p:22, abs:"62t", c:'var(--accent)' },
                  { l:"Ombro",      p:14, abs:"40t", c:'var(--accent)' },
                  { l:"Bíceps",     p:8,  abs:"23t" },
                  { l:"Tríceps",    p:10, abs:"28t" },
                  { l:"Quadríceps", p:16, abs:"45t", c:'var(--accent)' },
                  { l:"Posterior",  p:7,  abs:"20t" },
                  { l:"Outros",     p:5,  abs:"15t" },
                ].map((g, i) => (
                  <div key={i}>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom: 6 }}>
                      <span>{g.l}</span>
                      <span className="f-mono" style={{ color:'var(--text-dim)' }}>{g.abs} · {g.p}%</span>
                    </div>
                    <div className="bar">
                      <span style={{ width: `${(g.p/22)*100}%`, background: g.c || 'var(--bg-4)' }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <h2 className="card-title">MEDIDAS CORPORAIS</h2>
                <button className="btn ghost" style={{ padding:'4px 10px', fontSize:11 }}>
                  <Icon name="plus" size={12}/> Atualizar
                </button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18, marginTop: 18 }}>
                {[
                  { l:"Peso",          v:"82,4", u:"kg",  d:"−1,2kg",   c:'var(--success)' },
                  { l:"% Gordura",     v:"14,1", u:"%",   d:"−0,8pp",   c:'var(--success)' },
                  { l:"Massa magra",   v:"70,8", u:"kg",  d:"+0,9kg",   c:'var(--success)' },
                  { l:"Circunf. peito",v:"106",  u:"cm",  d:"+1,5cm",   c:'var(--accent)' },
                  { l:"Braço",         v:"42",   u:"cm",  d:"+0,8cm",   c:'var(--accent)' },
                  { l:"Cintura",       v:"82",   u:"cm",  d:"−1,2cm",   c:'var(--success)' },
                ].map((m, i) => (
                  <div key={i} style={{ padding: 14, background:'var(--bg-2)', borderRadius:'var(--r-2)' }}>
                    <div className="stat-label" style={{ fontSize:10 }}>{m.l}</div>
                    <div className="f-display" style={{ fontSize: 30 }}>{m.v}<span className="stat-unit" style={{ fontSize:12 }}>{m.u}</span></div>
                    <div style={{ fontSize:11, color: m.c, marginTop:2 }}>{m.d} ↗</div>
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

Object.assign(window, { Dashboard, DashboardMobile, SemanaPlan, Biblioteca, Progresso });
