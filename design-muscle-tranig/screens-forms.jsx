/* global React, Sidebar, Icon, MobStatus, ThemeSwitch, ShaderBackdrop */

// ============ CADASTRO / EDIÇÃO DE TREINO (Personal trainer) ============
function CadastroTreino() {
  const exercicios = [
    { nome:"Supino Reto Barra",         grupo:"Peito",   series: 4, reps:"8-10",  carga:80, descanso:90, ordem: 1 },
    { nome:"Supino Inclinado Halteres", grupo:"Peito",   series: 3, reps:"10",    carga:28, descanso:75, ordem: 2 },
    { nome:"Crucifixo Polia Alta",      grupo:"Peito",   series: 3, reps:"12-15", carga:15, descanso:60, ordem: 3 },
    { nome:"Desenvolvimento Militar",   grupo:"Ombro",   series: 4, reps:"8",     carga:50, descanso:90, ordem: 4 },
    { nome:"Elevação Lateral",          grupo:"Ombro",   series: 4, reps:"12",    carga:12, descanso:45, ordem: 5 },
  ];

  return (
    <div className="scr" data-screen-label="Cadastro de Treino — Desktop">
      <Sidebar active="criar" role="trainer"/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div style={{ fontSize:12, color:'var(--text-dim)', letterSpacing:'0.15em' }}>
              <span style={{ color:'var(--text-faint)' }}>ALUNOS / JOÃO PEREIRA /</span> NOVO TREINO
            </div>
            <div className="topbar-title">MONTAR TREINO · PUSH A</div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn ghost">Pré-visualizar</button>
            <button className="btn">Salvar rascunho</button>
            <button className="btn primary">Publicar para João</button>
          </div>
        </div>

        <div className="content" style={{ flexDirection:'row', padding: 0, gap: 0 }}>
          {/* LEFT: form */}
          <div style={{ flex: 1, padding:'28px 32px', overflow:'auto' }}>
            {/* Metadados */}
            <div className="card" style={{ marginBottom: 20 }}>
              <h2 className="card-title" style={{ marginBottom: 18 }}>INFORMAÇÕES</h2>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap: 14 }}>
                <div>
                  <div className="label-sm" style={{ marginBottom: 6 }}>Nome do treino</div>
                  <input className="input" defaultValue="PUSH A — Peito · Ombro · Tríceps"/>
                </div>
                <div>
                  <div className="label-sm" style={{ marginBottom: 6 }}>Objetivo</div>
                  <select className="input" defaultValue="hipertrofia">
                    <option>Hipertrofia</option>
                    <option>Força</option>
                    <option>Resistência</option>
                    <option>Cutting</option>
                  </select>
                </div>
                <div>
                  <div className="label-sm" style={{ marginBottom: 6 }}>Duração estimada</div>
                  <input className="input" defaultValue="62 min"/>
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div className="label-sm" style={{ marginBottom: 8 }}>Dias do ciclo</div>
                <div style={{ display:'flex', gap: 6 }}>
                  {['SEG','TER','QUA','QUI','SEX','SAB','DOM'].map((d, i) => (
                    <div key={i} style={{
                      padding:'8px 14px', borderRadius:'var(--r-2)',
                      background: i === 3 ? 'var(--accent)' : 'var(--bg-2)',
                      color: i === 3 ? 'var(--accent-fg)' : 'var(--text-dim)',
                      fontSize:11, fontWeight:600, letterSpacing:'0.1em',
                      cursor:'pointer',
                      border: '1px solid ' + (i === 3 ? 'var(--accent)' : 'var(--border)'),
                    }}>{d}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lista de exercícios */}
            <div className="card" style={{ padding: 0 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '20px 24px', borderBottom:'1px solid var(--hairline)' }}>
                <div>
                  <h2 className="card-title">EXERCÍCIOS</h2>
                  <div style={{ fontSize:12, color:'var(--text-dim)' }}>5 exercícios · 17 séries totais · volume alvo 8,4t</div>
                </div>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn ghost"><Icon name="plus" size={14}/> Superset</button>
                  <button className="btn primary"><Icon name="plus" size={14}/> Adicionar</button>
                </div>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'24px 36px 1fr 80px 100px 80px 90px 30px',
                gap:14, padding:'12px 24px', borderBottom:'1px solid var(--hairline)',
                fontSize:10, color:'var(--text-dim)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                <div></div><div>#</div><div>Exercício</div><div>Séries</div><div>Reps</div><div>Carga</div><div>Descanso</div><div></div>
              </div>

              {exercicios.map((e, i) => (
                <div key={i} style={{
                  display:'grid', gridTemplateColumns:'24px 36px 1fr 80px 100px 80px 90px 30px',
                  gap:14, padding:'14px 24px', borderBottom: i < exercicios.length - 1 ? '1px solid var(--hairline)' : 'none',
                  alignItems:'center',
                }}>
                  <div style={{ color:'var(--text-faint)', cursor:'grab', fontSize:14 }}>⋮⋮</div>
                  <div className="f-display" style={{ fontSize:22, color:'var(--text-dim)' }}>{e.ordem}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600 }}>{e.nome}</div>
                    <span className="chip muscle" style={{ marginTop:4, fontSize:9 }}>{e.grupo}</span>
                  </div>
                  <input className="set-input" defaultValue={e.series} style={{ fontSize:14 }}/>
                  <input className="set-input" defaultValue={e.reps} style={{ fontSize:14 }}/>
                  <input className="set-input" defaultValue={e.carga + "kg"} style={{ fontSize:14 }}/>
                  <input className="set-input" defaultValue={e.descanso + "s"} style={{ fontSize:14 }}/>
                  <button style={{ background:'transparent', border:'none', color:'var(--text-faint)', cursor:'pointer' }}>
                    <Icon name="more" size={16}/>
                  </button>
                </div>
              ))}

              <div style={{ padding: 18, borderTop: '1px solid var(--hairline)' }}>
                <button className="btn ghost" style={{ width:'100%', justifyContent:'center', borderStyle:'dashed' }}>
                  <Icon name="plus" size={14}/> Adicionar exercício
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: AI panel + aluno */}
          <div style={{ width: 320, padding:'28px 24px', borderLeft:'1px solid var(--hairline)', background:'var(--bg-1)', overflow:'auto' }}>
            <div className="card card-flat" style={{ padding: 18, marginBottom: 16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom: 10 }}>
                <div className="nav-avatar" style={{ width:38, height:38, fontSize:16 }}>JP</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600 }}>João Pereira</div>
                  <div style={{ fontSize:11, color:'var(--text-dim)' }}>Aluno · 8 semanas</div>
                </div>
              </div>
              <div style={{ display:'flex', gap: 14, marginTop: 12, paddingTop: 12, borderTop:'1px solid var(--hairline)' }}>
                <div>
                  <div className="label-sm" style={{ fontSize:9 }}>Objetivo</div>
                  <div style={{ fontSize:12, marginTop:2 }}>Hipertrofia</div>
                </div>
                <div>
                  <div className="label-sm" style={{ fontSize:9 }}>Nível</div>
                  <div style={{ fontSize:12, marginTop:2 }}>Intermediário</div>
                </div>
                <div>
                  <div className="label-sm" style={{ fontSize:9 }}>Restrições</div>
                  <div style={{ fontSize:12, marginTop:2 }}>Ombro D.</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: 18, marginBottom: 16, borderColor:'rgba(212,255,58,0.2)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:22, height:22, borderRadius:6, background:'var(--accent)', color:'var(--accent-fg)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon name="flash" size={12}/>
                </div>
                <div className="label-sm" style={{ color:'var(--accent)' }}>SUGESTÃO IA</div>
              </div>
              <div style={{ fontSize:13, lineHeight:1.5, marginTop: 12 }}>
                João teve <b style={{ color:'var(--accent)' }}>PR de supino inclinado</b> na última sessão. Considere subir a carga base de <b>26kg → 28kg</b> e adicionar 1 série.
              </div>
              <div style={{ display:'flex', gap:8, marginTop: 14 }}>
                <button className="btn primary" style={{ padding:'8px 14px', fontSize:11, flex:1, justifyContent:'center' }}>Aplicar</button>
                <button className="btn ghost" style={{ padding:'8px 14px', fontSize:11, flex:1, justifyContent:'center' }}>Ignorar</button>
              </div>
            </div>

            <div className="label-sm" style={{ marginBottom: 10 }}>VOLUME POR GRUPO</div>
            {[
              { l:"Peito",   v:5400, p:64 },
              { l:"Ombro",   v:2200, p:26 },
              { l:"Tríceps", v: 850, p:10 },
            ].map((g, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom: 4 }}>
                  <span>{g.l}</span>
                  <span className="f-mono" style={{ color:'var(--text-dim)' }}>{g.v}kg · {g.p}%</span>
                </div>
                <div className="bar"><span style={{ width: g.p + '%' }}/></div>
              </div>
            ))}

            <div className="card card-flat" style={{ padding: 14, marginTop: 16 }}>
              <div className="label-sm">SÉRIES POR GRUPO · META</div>
              <div style={{ display:'flex', gap: 10, marginTop: 10 }}>
                {[
                  { l:"Peito", c:10, m:12 },
                  { l:"Ombro", c:8, m:8 },
                  { l:"Tríceps", c:0, m:6, warn:true },
                ].map((s, i) => (
                  <div key={i} style={{ flex:1, textAlign:'center', padding:10, background:'var(--bg-2)', borderRadius:'var(--r-2)' }}>
                    <div style={{ fontSize:9, color:'var(--text-faint)', letterSpacing:'0.1em' }}>{s.l.toUpperCase()}</div>
                    <div className="f-display" style={{ fontSize:20, color: s.warn ? 'var(--danger)' : s.c === s.m ? 'var(--success)' : 'var(--text)' }}>
                      {s.c}/{s.m}
                    </div>
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

// ============ PERFIL ============
function Perfil() {
  return (
    <div className="scr" data-screen-label="Perfil — Desktop">
      <Sidebar active="perfil"/>
      <div className="main">
        <div className="topbar">
          <div className="topbar-left">
            <div style={{ fontSize:12, color:'var(--text-dim)', letterSpacing:'0.15em' }}>MEMBRO DESDE MAR / 2025</div>
            <div className="topbar-title">PERFIL</div>
          </div>
          <button className="btn ghost"><Icon name="logout" size={14}/> Sair</button>
        </div>

        <div className="content">
          {/* HEADER */}
          <div className="card" style={{ padding: 0, overflow:'hidden' }}>
            <div className="ph-img" style={{ height: 180, borderRadius: 0, border:'none' }}/>
            <div style={{ padding: '20px 28px 28px', display:'flex', gap:24, alignItems:'flex-end', marginTop: -70, position:'relative' }}>
              <div style={{
                width: 140, height: 140, borderRadius: 16,
                background:'linear-gradient(135deg, #1a1b1c, #050506)',
                border:'4px solid var(--bg-0)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'var(--f-display)', fontSize: 72, color:'var(--accent)',
              }}>LM</div>
              <div style={{ flex:1, paddingBottom: 10 }}>
                <h1 className="f-display" style={{ fontSize: 56, margin:0 }}>LUCAS MENDES</h1>
                <div style={{ display:'flex', gap: 8, marginTop: 6 }}>
                  <span className="chip">Hipertrofia</span>
                  <span className="chip">Intermediário</span>
                  <span className="chip muscle">Personal: Bruno R.</span>
                </div>
              </div>
              <button className="btn primary"><Icon name="edit" size={14}/> Editar perfil</button>
            </div>
          </div>

          {/* STATS LIFETIME */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5, 1fr)', gap: 14 }}>
            {[
              { l:"Treinos totais", v:"284", c:'var(--text)' },
              { l:"Volume lifetime", v:"2,1kt", c:'var(--text)' },
              { l:"Streak atual", v:"17d", c:'var(--accent)' },
              { l:"Maior streak", v:"42d", c:'var(--text)' },
              { l:"PRs totais", v:"38", c:'var(--accent)' },
            ].map((s, i) => (
              <div key={i} className="card">
                <div className="stat-label">{s.l}</div>
                <div className="f-display" style={{ fontSize: 56, color: s.c }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* DADOS PESSOAIS + Configurações */}
          <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap: 20 }}>
            <div className="card">
              <h2 className="card-title">DADOS PESSOAIS</h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 18, marginTop: 18 }}>
                {[
                  { l:"Nome",       v:"Lucas Mendes" },
                  { l:"Email",      v:"lucas.mendes@exemplo.com" },
                  { l:"Telefone",   v:"+55 11 98765-4321" },
                  { l:"Nascimento", v:"14 / 08 / 1996 · 29 anos" },
                  { l:"Altura",     v:"1,78 m" },
                  { l:"Peso",       v:"82,4 kg" },
                  { l:"Objetivo",   v:"Hipertrofia · Bulking" },
                  { l:"Frequência", v:"5x / semana" },
                ].map((f, i) => (
                  <div key={i}>
                    <div className="label-sm">{f.l}</div>
                    <div style={{ fontSize:14, marginTop: 4 }}>{f.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="card-title">PREFERÊNCIAS</h2>
              <div className="col gap-3" style={{ marginTop: 18 }}>
                {[
                  { l:"Unidade", v:"kg", opts:["kg","lb"] },
                  { l:"Sons no cronômetro", toggle: true, on: true },
                  { l:"Vibração ao concluir série", toggle: true, on: true },
                  { l:"Notificações de treino", toggle: true, on: false },
                  { l:"Modo apenas dark", toggle: true, on: true },
                ].map((p, i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom: i < 4 ? '1px solid var(--hairline)' : 'none' }}>
                    <span style={{ fontSize:14 }}>{p.l}</span>
                    {p.toggle ? (
                      <div style={{
                        width: 38, height: 22, borderRadius: 99,
                        background: p.on ? 'var(--accent)' : 'var(--bg-3)',
                        position:'relative', cursor:'pointer',
                      }}>
                        <div style={{
                          position:'absolute', top: 3, left: p.on ? 18 : 3,
                          width: 16, height: 16, borderRadius:'50%',
                          background: p.on ? 'var(--accent-fg)' : '#fff',
                          transition:'left 0.15s',
                        }}/>
                      </div>
                    ) : (
                      <div style={{ display:'flex', gap:4 }}>
                        {p.opts.map((o, k) => (
                          <span key={k} className={"chip" + (o === p.v ? " solid" : "")} style={{ padding:'4px 10px', fontSize:11, cursor:'pointer' }}>{o}</span>
                        ))}
                      </div>
                    )}
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

// ============ LOGIN / CADASTRO ============
function Login() {
  return (
    <div className="scr" data-screen-label="Login — Desktop" style={{ display:'flex' }}>
      {/* Lateral arte */}
      <div style={{
        flex: 1.1, background:'#050506', position:'relative', overflow:'hidden',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        padding: 48,
      }}>
        {/* WebGL shader animado, tinge com a --accent atual */}
        <ShaderBackdrop intensity={1.05}/>
        {/* Vinheta + ruído para legibilidade do texto */}
        <div style={{
          position:'absolute', inset: 0, pointerEvents:'none',
          background:`
            radial-gradient(circle at 30% 50%, transparent 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.25) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 100%)
          `,
        }}/>

        <div className="nav-brand" style={{ fontSize: 56, margin: 0, position:'relative' }}>FORJA<span className="nav-brand-dot">.</span></div>

        <div style={{
          position:'absolute', right: -60, bottom: -40,
          fontFamily:'var(--f-display)', fontSize: 420,
          color:'rgba(255,255,255,0.04)', lineHeight: 0.8,
          pointerEvents:'none',
        }}>
          FORJA
        </div>

        <div style={{ position:'relative', maxWidth: '24ch' }}>
          <div className="eyebrow" style={{ color:'var(--accent)', marginBottom: 14 }}>SEU TREINO. SEU CONTROLE.</div>
          <h1 className="f-display" style={{ fontSize: 88, lineHeight: 0.9, margin: 0 }}>
            FORJADO PELO <span style={{ color:'var(--accent)' }}>ESFORÇO</span> DIÁRIO.
          </h1>
          <div style={{ display:'flex', gap: 22, marginTop: 32 }}>
            <div>
              <div className="f-display" style={{ fontSize: 38, color:'var(--accent)' }}>284</div>
              <div style={{ fontSize:11, color:'var(--text-dim)', letterSpacing:'0.1em' }}>TREINOS REGISTRADOS HOJE</div>
            </div>
            <div>
              <div className="f-display" style={{ fontSize: 38 }}>1,2kt</div>
              <div style={{ fontSize:11, color:'var(--text-dim)', letterSpacing:'0.1em' }}>VOLUME MOVIMENTADO</div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div style={{ flex: 1, display:'flex', alignItems:'center', justifyContent:'center', padding: 48, background:'var(--bg-0)', position:'relative' }}>
        <div style={{ position:'absolute', top: 28, right: 32 }}>
          <ThemeSwitch compact/>
        </div>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div className="eyebrow">Bem-vindo de volta</div>
          <h2 className="f-display" style={{ fontSize: 52, lineHeight: 1, margin:'8px 0 32px' }}>
            ENTRE NO<br/>SEU PAINEL
          </h2>

          <div className="col gap-4">
            <div>
              <div className="label-sm" style={{ marginBottom: 6 }}>Email</div>
              <input className="input" defaultValue="lucas.mendes@exemplo.com"/>
            </div>
            <div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom: 6 }}>
                <div className="label-sm">Senha</div>
                <a style={{ fontSize:11, color:'var(--accent)', textDecoration:'none', cursor:'pointer' }}>Esqueceu?</a>
              </div>
              <input className="input" type="password" defaultValue="••••••••••"/>
            </div>

            <div style={{ display:'flex', alignItems:'center', gap: 10, marginTop: 4 }}>
              <div className="check checked" style={{ width:18, height:18 }}>
                <Icon name="check" size={11} stroke={3}/>
              </div>
              <span style={{ fontSize:13, color:'var(--text-dim)' }}>Manter conectado neste dispositivo</span>
            </div>

            <button className="btn primary xl" style={{ width:'100%', justifyContent:'center', marginTop: 12 }}>
              ENTRAR <Icon name="arrow" size={14}/>
            </button>

            <div style={{ display:'flex', alignItems:'center', gap: 12, margin:'8px 0' }}>
              <hr className="divider" style={{ flex:1 }}/>
              <span style={{ fontSize:11, color:'var(--text-faint)', letterSpacing:'0.15em' }}>OU</span>
              <hr className="divider" style={{ flex:1 }}/>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
              <button className="btn ghost" style={{ justifyContent:'center' }}>Google</button>
              <button className="btn ghost" style={{ justifyContent:'center' }}>Apple</button>
            </div>

            <div style={{ textAlign:'center', fontSize:13, color:'var(--text-dim)', marginTop: 18 }}>
              Primeira vez no FORJA? <a style={{ color:'var(--accent)', cursor:'pointer', fontWeight:600 }}>Criar conta</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CRONÔMETRO DE DESCANSO (mobile, foco total) ============
function CronometroMobile() {
  return (
    <div className="mob" data-screen-label="Cronômetro de Descanso — Mobile"
         style={{ background:'#0a0a0a' }}>
      <MobStatus/>
      <div style={{ padding:'8px 22px 12px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <button style={{ background:'transparent', border:'none', color:'var(--text)' }}>
          <Icon name="arrowL" size={22}/>
        </button>
        <div className="eyebrow">DESCANSO</div>
        <button style={{ background:'transparent', border:'none', color:'var(--text-dim)', fontSize:12, cursor:'pointer' }}>
          PULAR
        </button>
      </div>

      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding: 24, gap: 28 }}>
        {/* Big circular timer */}
        <div style={{ position:'relative', width: 280, height: 280 }}>
          <svg viewBox="0 0 100 100" style={{ position:'absolute', inset: 0, transform:'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--bg-2)" strokeWidth="3"/>
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--accent)" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * 0.48}`}/>
          </svg>
          <div style={{
            position:'absolute', inset: 0,
            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          }}>
            <div style={{ fontSize: 11, color:'var(--text-dim)', letterSpacing:'0.2em' }}>RESTAM</div>
            <div className="f-display" style={{ fontSize: 110, lineHeight: 0.9, color:'var(--accent)' }}>0:47</div>
            <div style={{ fontSize: 11, color:'var(--text-faint)', letterSpacing:'0.15em', marginTop: 6 }}>DE 1:30</div>
          </div>
        </div>

        {/* Próxima série */}
        <div className="card card-flat" style={{ width:'100%', padding: 18, maxWidth: 340 }}>
          <div className="label-sm" style={{ color:'var(--accent)' }}>PRÓXIMA SÉRIE</div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 8 }}>
            <div>
              <div className="f-display" style={{ fontSize: 22 }}>SUPINO INCLINADO</div>
              <div style={{ fontSize:12, color:'var(--text-dim)' }}>Série 3 de 4</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div className="f-display" style={{ fontSize: 30, color:'var(--accent)' }}>28<span className="stat-unit" style={{ fontSize:12 }}>kg</span></div>
              <div style={{ fontSize:11, color:'var(--text-dim)' }}>8 reps · RIR 2</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding:'12px 22px 32px', display:'flex', gap: 10 }}>
        <button className="btn lg" style={{ flex: 1, justifyContent:'center' }}>-15s</button>
        <button className="btn lg" style={{ flex: 1, justifyContent:'center' }}>+15s</button>
        <button className="btn primary lg" style={{ flex: 2, justifyContent:'center' }}>
          INICIAR SÉRIE
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { CadastroTreino, Perfil, Login, CronometroMobile });
