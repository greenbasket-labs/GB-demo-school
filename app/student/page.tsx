'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function StudentPage() {
  const [history, setHistory] = useState(false)
  const attendance = [['13 Sep 2026','Present'],['12 Sep 2026','Present'],['11 Sep 2026','Present'],['10 Sep 2026','Absent'],['09 Sep 2026','Present']]
  const results = [['Mathematics','88%'],['English Language','84%'],['Basic Science','81%'],['Social Studies','86%']]
  return <main className="page">
    <div className="page-header"><div><Link href="/dashboard?role=student" className="back-link">← Student Dashboard</Link><h1>My Student Portal</h1><p>Private academic and attendance information for this student account.</p></div></div>
    <section className="card profile-card"><div><span className="eyebrow">My Profile</span><h2>Aisha Bello</h2><p>GB/24/0184 · JSS 2A</p></div><span className="badge success">Active Student</span></section>
    <div className="stats-grid"><div className="stat-card"><span>Current Class</span><strong>JSS 2A</strong></div><div className="stat-card"><span>Today's Attendance</span><strong>Present</strong></div><div className="stat-card"><span>Attendance Rate</span><strong>96%</strong></div><div className="stat-card"><span>Average Result</span><strong>84.8%</strong></div></div>
    <section className="card"><div className="section-head"><div><h2>Today's Attendance</h2><p>13 September 2026 · JSS 2A</p></div><span className="badge success">Present</span></div><div className="attendance-status"><strong>Present</strong><span>Attendance was recorded for today's school day.</span></div><button className="button" onClick={() => setHistory(!history)}>{history ? 'Hide' : 'View'} attendance history</button>{history && <div className="table-wrap"><table className="data-table"><thead><tr><th>Date</th><th>Status</th></tr></thead><tbody>{attendance.map(([date,status]) => <tr key={date}><td>{date}</td><td>{status}</td></tr>)}</tbody></table></div>}</section>
    <section className="card"><div className="section-head"><div><h2>My Results</h2><p>Latest published academic results.</p></div><span className="badge success">84.8% average</span></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Subject</th><th>Score</th></tr></thead><tbody>{results.map(([subject,score]) => <tr key={subject}><td><strong>{subject}</strong></td><td>{score}</td></tr>)}</tbody></table></div></section>
    <section className="card"><div className="section-head"><div><h2>My Fees</h2><p>Fee information for this student account.</p></div></div><div className="detail-grid"><div><span>Total Due</span><strong>₦140,000</strong></div><div><span>Paid</span><strong>₦100,000</strong></div><div><span>Outstanding</span><strong>₦40,000</strong></div></div></section>
    <section className="quick-grid"><Link className="action-card" href="/attendance?role=student"><strong>Attendance</strong><span>View your attendance record.</span></Link><Link className="action-card" href="/results?role=student"><strong>Results</strong><span>View your published results.</span></Link><Link className="action-card" href="/announcements?role=student"><strong>Announcements</strong><span>Read student notices.</span></Link></section>
  </main>
}
