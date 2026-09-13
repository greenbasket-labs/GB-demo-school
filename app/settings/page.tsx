import Sidebar from '../components/Sidebar'

const settings = [
  ['School name','Green Basket Demo School','Identity'],
  ['Academic session','2025/2026','Academic'],
  ['Current term','First Term','Academic'],
  ['School location','Abuja, Nigeria','School'],
  ['Currency','Nigerian Naira (₦)','Finance'],
]

export default function SettingsPage() {
  return <div className="app-shell"><Sidebar /><main className="main"><p className="eyebrow">OWNER / ADMIN</p><h1>School Settings</h1><p className="muted">Core school configuration shown in the live demo.</p><div className="card-grid">{settings.map(([label,value,group]) => <section className="card" key={label}><small>{group}</small><h3>{label}</h3><p>{value}</p></section>)}</div></main></div>
}
