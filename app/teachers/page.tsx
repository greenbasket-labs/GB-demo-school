'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

const teachers = [
  { id: 'TCH/24/001', name: 'Mrs. Ibrahim', subject: 'Mathematics', classes: 'JSS 1A, JSS 2A', status: 'Active' },
  { id: 'TCH/24/002', name: 'Mr. Musa', subject: 'Basic Science', classes: 'JSS 2A, JSS 3A', status: 'Active' },
  { id: 'TCH/24/003', name: 'Mrs. Okafor', subject: 'English Language', classes: 'JSS 3A, SS 1B', status: 'Active' },
  { id: 'TCH/24/004', name: 'Mr. Bello', subject: 'Physics', classes: 'SS 1B, SS 2A', status: 'Active' },
  { id: 'TCH/24/005', name: 'Mrs. Yusuf', subject: 'Chemistry', classes: 'SS 2A, SS 3B', status: 'Active' },
]

export default function TeachersPage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<typeof teachers[number] | null>(null)

  const filtered = useMemo(() => teachers.filter((teacher) =>
    `${teacher.name} ${teacher.subject} ${teacher.classes}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <Link href="/dashboard?role=teacher" className="back-link">← Teacher Dashboard</Link>
          <h1>My Teaching</h1>
          <p>Classes, students and teaching assignments for this demo teacher.</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span>My Classes</span><strong>2</strong></div>
        <div className="stat-card"><span>Students</span><strong>75</strong></div>
        <div className="stat-card"><span>Subjects</span><strong>2</strong></div>
        <div className="stat-card"><span>Attendance</span><strong>94%</strong></div>
      </div>

      <section className="card">
        <div className="section-head">
          <div><h2>Teacher Directory</h2><p>Teaching staff and current class assignments.</p></div>
          <input className="search-input" placeholder="Search teacher, subject or class" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Teacher ID</th><th>Teacher</th><th>Subject</th><th>Classes</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{filtered.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td><td><strong>{teacher.name}</strong></td><td>{teacher.subject}</td><td>{teacher.classes}</td>
                <td><span className="badge success">{teacher.status}</span></td>
                <td><button className="button small" onClick={() => setSelected(teacher)}>View</button></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="quick-grid">
        <Link className="action-card" href="/classes?role=teacher"><strong>My Classes</strong><span>Open class workspaces and student lists.</span></Link>
        <Link className="action-card" href="/students?role=teacher"><strong>My Students</strong><span>Review students connected to your teaching work.</span></Link>
        <Link className="action-card" href="/attendance?role=teacher"><strong>Take Attendance</strong><span>Record today's attendance register.</span></Link>
        <Link className="action-card" href="/results?role=teacher"><strong>Enter Results</strong><span>Review and save academic results.</span></Link>
      </section>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="modal" onClick={(e) => e.stopPropagation()}><div className="section-head"><div><h2>{selected.name}</h2><p>{selected.id}</p></div><button className="button" onClick={() => setSelected(null)}>Close</button></div><div className="detail-grid"><div><span>Subject</span><strong>{selected.subject}</strong></div><div><span>Classes</span><strong>{selected.classes}</strong></div><div><span>Status</span><strong>{selected.status}</strong></div></div></div></div>}
    </main>
  )
}
