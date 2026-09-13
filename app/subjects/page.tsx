import Sidebar from '../components/Sidebar'

const subjects = [
  ['Mathematics','JSS 1–3 / SS 1–3','Core'],
  ['English Language','JSS 1–3 / SS 1–3','Core'],
  ['Basic Science','JSS 1–3','Core'],
  ['Biology','SS 1–3','Science'],
  ['Economics','SS 1–3','Commercial'],
  ['Computer Studies','JSS 1–3 / SS 1–3','ICT'],
]

export default function SubjectsPage() {
  return <div className="app-shell"><Sidebar /><main className="main"><p className="eyebrow">OWNER / ADMIN</p><h1>Subjects & Academic Setup</h1><p className="muted">Review the subjects used across the school and their class coverage.</p><div className="table-wrap"><table><thead><tr><th>Subject</th><th>Classes</th><th>Area</th></tr></thead><tbody>{subjects.map(([subject,classes,area]) => <tr key={subject}><td>{subject}</td><td>{classes}</td><td>{area}</td></tr>)}</tbody></table></div></main></div>
}
