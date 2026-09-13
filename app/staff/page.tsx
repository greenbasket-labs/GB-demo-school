import Sidebar from '../components/Sidebar'

const staff = [
  ['Mrs. Amina Ibrahim','Principal','Administration'],
  ['Mr. Musa Bello','Vice Principal, Academics','Administration'],
  ['Mrs. Grace Okafor','Mathematics Teacher','JSS / Senior School'],
  ['Mr. Yusuf Adeyemi','English Teacher','Junior School'],
  ['Mrs. Fatima Sani','Account Officer','Finance'],
]

export default function StaffPage() {
  return <div className="app-shell"><Sidebar /><main className="main"><p className="eyebrow">OWNER / ADMIN</p><h1>Staff & Teachers</h1><p className="muted">View the people responsible for teaching and running the school.</p><div className="card-grid">{staff.map(([name,role,unit]) => <section className="card" key={name}><h3>{name}</h3><p>{role}</p><small>{unit}</small></section>)}</div></main></div>
}
