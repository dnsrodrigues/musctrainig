import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { MobileTabbar } from './MobileTabbar'

/**
 * Shell padrão de rotas autenticadas:
 *   ┌────────┬────────────────────────┐
 *   │ Side   │  Topbar (vem da page)  │
 *   │ bar    ├────────────────────────┤
 *   │ 240px  │  Outlet (content)      │
 *   └────────┴────────────────────────┘
 * No mobile (≤768px), a sidebar some e aparece a tabbar inferior.
 */
export function AppShell() {
  return (
    <div className="scr">
      <Sidebar />
      <div className="main">
        <Outlet />
      </div>
      <MobileTabbar />
    </div>
  )
}
