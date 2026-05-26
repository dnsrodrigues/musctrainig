import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Icon, type IconName } from '../ui/Icon'
import { ThemeSwitcher } from '../ui/ThemeSwitcher'

interface NavLink {
  to: string
  label: string
  icon: IconName
  /** rotas que também ativam este item */
  matches?: (path: string) => boolean
}

function alunoLinks(): NavLink[] {
  return [
    { to: '/dashboard', label: 'Hoje', icon: 'home' },
    { to: '/workouts', label: 'Treino', icon: 'flame', matches: (p) => p.startsWith('/workouts') },
    { to: '/historico', label: 'Histórico', icon: 'history', matches: (p) => p.startsWith('/historico') },
    { to: '/progresso', label: 'Progresso', icon: 'chart' },
    { to: '/medidas', label: 'Medidas', icon: 'scale' },
  ]
}

function adminLinks(): NavLink[] {
  return [
    { to: '/dashboard', label: 'Hoje', icon: 'home' },
    { to: '/admin/workouts', label: 'Fichas', icon: 'edit', matches: (p) => p.startsWith('/admin/workouts') },
  ]
}

export function Sidebar() {
  const { profile, isAdmin, signOut } = useAuth()
  const { pathname } = useLocation()

  const links = isAdmin ? adminLinks() : alunoLinks()
  const isActive = (link: NavLink) =>
    link.matches ? link.matches(pathname) : pathname === link.to

  const initial = (profile?.full_name ?? 'A').charAt(0).toUpperCase()
  const firstName = profile?.full_name?.split(' ')[0] ?? 'Atleta'

  return (
    <aside className="nav">
      <Link to="/dashboard" className="nav-brand" style={{ textDecoration: 'none' }}>
        FORJA<span className="nav-brand-dot">.</span>
      </Link>

      <div className="nav-section">{isAdmin ? 'Personal' : 'Treino'}</div>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={'nav-item' + (isActive(link) ? ' active' : '')}
        >
          <span className="nav-ico">
            <Icon name={link.icon} size={18} />
          </span>
          {link.label}
        </Link>
      ))}

      <div className="nav-section">Conta</div>
      <Link
        to="/perfil"
        className={'nav-item' + (pathname === '/perfil' ? ' active' : '')}
      >
        <span className="nav-ico">
          <Icon name="user" size={18} />
        </span>
        Perfil
      </Link>
      <button
        type="button"
        onClick={() => void signOut()}
        className="nav-item"
        style={{ background: 'transparent', border: 'none', textAlign: 'left', width: '100%', cursor: 'pointer' }}
      >
        <span className="nav-ico">
          <Icon name="logout" size={18} />
        </span>
        Sair
      </button>

      <ThemeSwitcher />

      <div className="nav-user">
        <div className="nav-avatar">{initial}</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 12, minWidth: 0 }}>
          <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {firstName}
          </span>
          <span style={{ color: 'var(--text-faint)' }}>
            {isAdmin ? 'Personal Trainer' : 'Aluno'}
          </span>
        </div>
      </div>
    </aside>
  )
}
