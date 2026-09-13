'use client'
import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'

const children = [
  ['Aisha Abdullahi','JSS 2A','96%','84%','N40,000'],
  ['Yusuf Abdullahi','Primary 5B','94%','79%','N40,000'],
]

export default function Portal() {
  const [selected, setSelected] = useState(0)
  const child = children[selected]
  return <div className="dashboard"><Sidebar/><main className="main">
    <div className="topline"><div><div className="eyebrow">Parent portal | 2025/2026 First Term</div><h1 style={{margin:'5px 0'}}>My children</h1><p className="muted">Attendance, results and school fees in one place.</p></div><span className="pill">PARENT</span></div>
    <div className="grid grid4">
      <div className="card"><span className="muted">Children</span><div className="stat">2</div><small className="muted">Currently enrolled</small></div>
      <div className="card"><span className="muted">Attendance</span><div className="stat">{child[2]}</div><small className="muted">Selected child</small></div>
      <div className="card"><span className="muted">Average result</span><div className="stat">{child[3]}</div><small className="muted">Current term</small></div>
      <div className="card"><span className="muted">Outstanding fees</span><div className="stat">{child[4]}</div><small className="muted">Selected child</small></div>
    </div>
    <div className="card" style={{marginTop:18}}><div className="eyebrow">Children</div><h2 style={{margin:'4px 0 16px'}}>School progress</h2>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:18}}>{children.map((item,index)=><button key={item[0]} className={`btn ${selected===index?'primary':'secondary'}`} onClick={()=>setSelected(index)}>{item[0]}</button>)}</div>
      <div className="grid grid3"><div className="card"><strong>{child[1]}</strong><div className="muted">Current class</div></div><div className="card"><strong>{child[2]}</strong><div className="muted">Attendance this term</div></div><div className="card"><strong>{child[3]}</strong><div className="muted">Average result</div></div></div>
      <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:18}}><Link className="btn secondary" href="/attendance?role=parent">View attendance</Link><Link className="btn secondary" href="/results?role=parent">View results</Link><Link className="btn secondary" href="/fees-payments?role=parent">View fees</Link></div>
    </div>
  </main></div>
}
