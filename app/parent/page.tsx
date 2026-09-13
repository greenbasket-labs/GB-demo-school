'use client'

import { useState } from 'react'
import Link from 'next/link'

const children = [
  { name: 'Aisha Abdullahi', admission: 'GB/24/0184', className: 'JSS 2A', relationship: 'Daughter', attendance: 96, present: 24, absent: 1, today: 'Present', result: 84, paid: 100000, outstanding: 40000 },
  { name: 'Yusuf Abdullahi', admission: 'GB/24/0318', className: 'Primary 5B', relationship: 'Son', attendance: 94, present: 23, absent: 2, today: 'Present', result: 79, paid: 100000, outstanding: 40000 },
]

export default function ParentPage() {
  const [selected, setSelected] = useState(0)
  const [showHistory, setShowHistory] = useState(false)
  const child = children[selected]
  const totalDue = child.paid + child.outstanding

  return (
    <main className="page">
      <div className="page-header">
        <div><span className="eyebrow">PARENT PORTAL</span><h1>My Children</h1><p>View attendance, results, fees and school updates for your linked child.</p></div>
      </div>

      <section className="card" style={{marginBottom:20}}>
        <h2>Select child</h2>
        <div className="button-row">
          {children.map((item, index) => <button key={item.admission} className={selected === index ? 'button primary' : 'button secondary'} onClick={() => { setSelected(index); setShowHistory(false) }}>{item.name} · {item.className}</button>)}
        </div>
      </section>

      <div className="stats-grid">
        <div className="card"><span>Today&apos;s Attendance</span><strong>{child.today}</strong><small>13 Sep 2026</small></div>
        <div className="card"><span>Attendance Rate</span><strong>{child.attendance}%</strong><small>{child.present} present · {child.absent} absent</small></div>
        <div className="card"><span>Average Result</span><strong>{child.result}%</strong><small>Current published results</small></div>
        <div className="card"><span>Outstanding Fees</span><strong>₦{child.outstanding.toLocaleString()}</strong><small>of ₦{totalDue.toLocaleString()} total due</small></div>
      </div>

      <section className="card" style={{marginTop:20}}>
        <div className="section-heading"><div><h2>{child.name}</h2><p>{child.admission} · {child.className} · {child.relationship}</p></div><span className="status">Linked child</span></div>
        <div className="grid-2">
          <div><h3>Daily attendance</h3><p><strong>{child.today}</strong> today, 13 Sep 2026</p><button className="button secondary" onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Hide' : 'View'} attendance history</button>{showHistory && <div className="list" style={{marginTop:12}}>{[['13 Sep 2026','Present'],['12 Sep 2026','Present'],['11 Sep 2026','Present'],['10 Sep 2026','Absent'],['09 Sep 2026','Present']].map(([date,status]) => <div className="list-row" key={date}><span>{date}</span><strong>{status}</strong></div>)}</div>}</div>
          <div><h3>Fees & payments</h3><div className="list"><div className="list-row"><span>Total due</span><strong>₦{totalDue.toLocaleString()}</strong></div><div className="list-row"><span>Paid</span><strong>₦{child.paid.toLocaleString()}</strong></div><div className="list-row"><span>Outstanding</span><strong>₦{child.outstanding.toLocaleString()}</strong></div><div className="list-row"><span>Last payment</span><strong>10 Sep 2026 · Bank Transfer</strong></div></div></div>
        </div>
      </section>

      <section className="card" style={{marginTop:20}}>
        <div className="section-heading"><div><h2>Results</h2><p>Published academic results for {child.name}.</p></div></div>
        <div className="list">{[['Mathematics','88%'],['English Language','84%'],['Basic Science','81%'],['Social Studies','86%']].map(([subject,score]) => <div className="list-row" key={subject}><span>{subject}</span><strong>{score}</strong></div>)}</div>
      </section>

      <section className="card" style={{marginTop:20}}>
        <h2>Announcements</h2><div className="list"><div className="list-row"><span>First Term Parent Meeting · 13 Sep 2026</span><strong>Today</strong></div><div className="list-row"><span>School Fees Reminder · 10 Sep 2026</span><strong>Parents</strong></div></div>
      </section>

      <div className="button-row" style={{marginTop:20}}><Link className="button secondary" href="/attendance?role=parent">Attendance</Link><Link className="button secondary" href="/fees-payments?role=parent">Fees & Payments</Link><Link className="button secondary" href="/results?role=parent">Results</Link><Link className="button secondary" href="/announcements?role=parent">Announcements</Link></div>
    </main>
  )
}
