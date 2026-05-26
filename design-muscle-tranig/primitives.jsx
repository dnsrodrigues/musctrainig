/* global React */
// Shared icons + small primitives used across all FORJA screens.
// Style: 1.6-2px stroke, rounded caps, no fill — works on dark bg.

const Ico = {
  home:      <path d="M3 11l9-8 9 8M5 9.5V21h14V9.5"/>,
  flame:    (<>
                <path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-1.5 1-3 2-4-1 3 .5 4 2 4 0-2-2-3-2-5 0-2 2-3 2-3z"/>
                <path d="M8 14a4 4 0 0 0 8 0"/>
              </>),
  calendar: (<>
                <rect x="3" y="5" width="18" height="16" rx="2"/>
                <path d="M3 10h18M8 3v4M16 3v4"/>
              </>),
  dumbbell: (<>
                <path d="M3 9v6M21 9v6M6 7v10M18 7v10M9 12h6"/>
                <path d="M9 9v6M15 9v6"/>
              </>),
  chart:    (<>
                <path d="M3 21h18"/>
                <path d="M6 17V11M11 17V7M16 17V13M21 17V9"/>
              </>),
  edit:     (<>
                <path d="M14 4l6 6L8 22H2v-6z"/>
                <path d="M14 4l6 6"/>
              </>),
  user:     (<>
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>
              </>),
  timer:    (<>
                <circle cx="12" cy="13" r="8"/>
                <path d="M12 9v4l3 2M9 2h6"/>
              </>),
  search:   (<>
                <circle cx="11" cy="11" r="7"/>
                <path d="M21 21l-4.5-4.5"/>
              </>),
  plus:     <path d="M12 5v14M5 12h14"/>,
  arrow:    <path d="M5 12h14M13 6l6 6-6 6"/>,
  arrowL:   <path d="M19 12H5M11 18l-6-6 6-6"/>,
  check:    <path d="M5 12l5 5L20 7"/>,
  play:     <path d="M6 4l14 8L6 20z" fill="currentColor"/>,
  pause:    <path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/>,
  more:     <path d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth="3"/>,
  bell:     (<>
                <path d="M6 9a6 6 0 0 1 12 0c0 6 2 8 2 8H4s2-2 2-8"/>
                <path d="M10 21a2 2 0 0 0 4 0"/>
              </>),
  flash:    <path d="M13 2L4 13h7l-1 9 9-11h-7z"/>,
  history:  (<>
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/>
                <path d="M3 3v5h5"/>
                <path d="M12 7v5l4 2"/>
              </>),
  trophy:   (<>
                <path d="M8 4h8v5a4 4 0 0 1-8 0z"/>
                <path d="M4 5h4v3a2 2 0 0 1-4 0zM16 5h4v3a2 2 0 0 1-4 0z"/>
                <path d="M9 14h6v2a3 3 0 0 1-3 3 3 3 0 0 1-3-3zM7 21h10"/>
              </>),
  logout:   (<>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <path d="M16 17l5-5-5-5M21 12H9"/>
              </>),
  settings: (<>
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.55-1H3a2 2 0 0 1 0-4h.09a1.7 1.7 0 0 0 1.55-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h0a1.7 1.7 0 0 0 1-1.55V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.55h0a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v0a1.7 1.7 0 0 0 1.55 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"/>
              </>),
};

function Icon({ name, size = 18, stroke = 1.8, ...rest }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size}
         fill="none" stroke="currentColor" strokeWidth={stroke}
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {Ico[name] || null}
    </svg>
  );
}

// Phone-frame style status bar (mobile screens)
function MobStatus({ time = "07:42" }) {
  return (
    <div className="mob-status">
      <span>{time}</span>
      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <rect x="0.5" y="0.5" width="13" height="9" rx="2" stroke="currentColor"/>
          <rect x="2" y="2" width="9" height="6" fill="currentColor"/>
          <rect x="14" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor"/>
        </svg>
      </div>
    </div>
  );
}

// Theme accent picker — native widget that lives in the UI
const THEMES = [
  { id: "lime",    name: "Lime",    accent: "#d4ff3a", fg: "#0a0a0a" },
  { id: "coral",   name: "Coral",   accent: "#ff2e4d", fg: "#ffffff" },
  { id: "orange",  name: "Forge",   accent: "#ff6b00", fg: "#0a0a0a" },
  { id: "ice",     name: "Ice",     accent: "#00d4ff", fg: "#0a0a0a" },
  { id: "violet",  name: "Violet",  accent: "#a78bfa", fg: "#0a0a0a" },
  { id: "white",   name: "Mono",    accent: "#f5f5f0", fg: "#0a0a0a" },
];

function applyTheme(t) {
  const r = document.documentElement;
  r.style.setProperty('--accent', t.accent);
  r.style.setProperty('--accent-fg', t.fg);
  r.style.setProperty('--accent-2', t.accent + 'cc');
}

function ThemeSwitch({ compact = false }) {
  const [current, setCurrent] = React.useState(() => {
    try { return localStorage.getItem('forja-theme') || 'lime'; } catch { return 'lime'; }
  });
  React.useEffect(() => {
    const t = THEMES.find(x => x.id === current) || THEMES[0];
    applyTheme(t);
    try { localStorage.setItem('forja-theme', current); } catch {}
  }, [current]);

  if (compact) {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {THEMES.map(t => (
          <button key={t.id} onClick={() => setCurrent(t.id)} title={t.name}
                  style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: t.accent, cursor: 'pointer', padding: 0,
                    border: current === t.id ? '2px solid var(--text)' : '2px solid transparent',
                    outline: current === t.id ? '1px solid var(--text-faint)' : 'none',
                  }}/>
        ))}
      </div>
    );
  }
  return (
    <div style={{
      padding: '12px 10px',
      borderTop: '1px solid var(--hairline)',
      marginTop: 4,
    }}>
      <div style={{ fontSize: 9, color: 'var(--text-faint)', letterSpacing: '0.18em', textTransform:'uppercase', marginBottom: 8, paddingLeft: 4, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span>Tema</span>
        <span className="f-mono" style={{ color:'var(--accent)' }}>
          {(THEMES.find(t => t.id === current) || THEMES[0]).name}
        </span>
      </div>
      <div style={{ display:'flex', gap: 6, paddingLeft: 4 }}>
        {THEMES.map(t => (
          <button key={t.id} onClick={() => setCurrent(t.id)} title={t.name}
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: t.accent, cursor: 'pointer', padding: 0,
                    border: current === t.id ? '2px solid var(--text)' : '2px solid transparent',
                    boxShadow: current === t.id ? '0 0 0 1px ' + t.accent : 'none',
                    transition: 'transform 0.12s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        ))}
      </div>
    </div>
  );
}

// Sidebar nav (desktop) — pass `active` slug
function Sidebar({ active = "treino", role = "aluno" }) {
  const items = [
    { id: "home",     label: "Hoje",        icon: "home" },
    { id: "treino",   label: "Treino",      icon: "flame" },
    { id: "semana",   label: "Semana",      icon: "calendar" },
    { id: "biblio",   label: "Exercícios",  icon: "dumbbell" },
    { id: "historico",label: "Histórico",   icon: "history" },
  ];
  const trainerItems = [
    { id: "alunos",   label: "Alunos",      icon: "user" },
    { id: "criar",    label: "Criar treino",icon: "edit" },
  ];
  return (
    <aside className="nav">
      <div className="nav-brand">FORJA<span className="nav-brand-dot">.</span></div>
      <div className="nav-section">Treino</div>
      {items.map((it) => (
        <div key={it.id} className={"nav-item" + (active === it.id ? " active" : "")}>
          <span className="nav-ico"><Icon name={it.icon} size={18}/></span>
          {it.label}
        </div>
      ))}
      {role === "trainer" && <>
        <div className="nav-section">Personal</div>
        {trainerItems.map((it) => (
          <div key={it.id} className={"nav-item" + (active === it.id ? " active" : "")}>
            <span className="nav-ico"><Icon name={it.icon} size={18}/></span>
            {it.label}
          </div>
        ))}
      </>}
      <div className="nav-section">Conta</div>
      <div className={"nav-item" + (active === "perfil" ? " active" : "")}>
        <span className="nav-ico"><Icon name="user" size={18}/></span>
        Perfil
      </div>
      <div className="nav-item">
        <span className="nav-ico"><Icon name="settings" size={18}/></span>
        Ajustes
      </div>

      <ThemeSwitch/>

      <div className="nav-user">
        <div className="nav-avatar">L</div>
        <div style={{ display:'flex', flexDirection:'column', fontSize:12 }}>
          <span style={{ fontWeight: 600 }}>Lucas Mendes</span>
          <span style={{ color: 'var(--text-faint)' }}>
            {role === 'trainer' ? 'Personal Trainer' : 'Aluno · Semana 6'}
          </span>
        </div>
      </div>
    </aside>
  );
}

Object.assign(window, { Icon, Ico, MobStatus, Sidebar, ThemeSwitch, THEMES, applyTheme });
