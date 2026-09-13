import Sidebar from '../components/Sidebar'

const families = [
  ['Abdullahi Family','Aisha Abdullahi','JSS 2A'],
  ['Okafor Family','Daniel Okafor','SS 1B'],
  ['Musa Family','Maryam Musa','JSS 3A'],
  ['Yusuf Family','Ibrahim Yusuf','JSS 2A'],
]

export default function ParentsPage() {
  return <div className="app-shell"><Sidebar /><main className="main"><p className="eyebrow">OWNER / ADMIN</p><h1>Parents & Guardians</h1><p className="muted">Keep family contacts connected to the students they support.</p><div className="table-wrap"><table><thead><tr><th>Family</th><th>Student</th><th>Class</th></tr></thead><tbody>{families.map(([family,student,cls]) => <tr key={family}><td>{family}</td><td>{student}</td><td>{cls}</td></tr>)}</tbody></table></div></main></div>
}
