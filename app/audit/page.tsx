import Sidebar from '../components/Sidebar'

const activity = [
  ['08:42','Owner / Admin','Reviewed attendance register','Attendance'],
  ['09:15','Cashier','Updated payment register','Fees'],
  ['10:05','Teacher','Saved JSS 2A results','Results'],
  ['11:20','Owner / Admin','Published parent announcement','Communication'],
]

export default function AuditPage() {
  return <div className="app-shell"><Sidebar /><main className="main"><p className="eyebrow">OWNER / ADMIN</p><h1>Audit History</h1><p className="muted">A simple view of important school activity for the demo.</p><div className="table-wrap"><table><thead><tr><th>Time</th><th>User</th><th>Activity</th><th>Area</th></tr></thead><tbody>{activity.map(([time,user,action,area]) => <tr key={`${time}-${action}`}><td>{time}</td><td>{user}</td><td>{action}</td><td>{area}</td></tr>)}</tbody></table></div></main></div>
}
