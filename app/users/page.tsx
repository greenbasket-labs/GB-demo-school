import Sidebar from '../components/Sidebar'

const users = [
  ['Owner / Admin','Full school access','Active'],
  ['Cashier','Fees, payments & reports','Active'],
  ['Teacher','Classes, attendance & results','Active'],
  ['Parent','Child records & communication','Active'],
  ['Student','Own academic records','Active'],
]

export default function UsersPage() {
  return <div className="app-shell"><Sidebar /><main className="main"><p className="eyebrow">OWNER / ADMIN</p><h1>Users & Roles</h1><p className="muted">Review the demo access model used by each school role.</p><div className="table-wrap"><table><thead><tr><th>Role</th><th>Access</th><th>Status</th></tr></thead><tbody>{users.map(([role,access,status]) => <tr key={role}><td>{role}</td><td>{access}</td><td>{status}</td></tr>)}</tbody></table></div></main></div>
}
