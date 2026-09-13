'use client'

import Link from 'next/link'
import { useState } from 'react'

const reports=[
  ['Student register','1,248 students','Updated today'],
  ['Attendance report','94.2% overall','Updated today'],
  ['Fee collection','₦42.7m collected','Updated today'],
  ['Academic performance','92% processed','First Term'],
]

export default function Reports(){
  const [selected,setSelected]=useState<string | null>(null)
  const [message,setMessage]=useState('')

  function viewReport(name:string){
    setSelected(name)
    setMessage('')
  }

  function exportReport(){
    setMessage(`${selected} prepared for export.`)
  }

  return <Page>
    <div className="eyebrow">School intelligence</div>
    <h1>Reports</h1>
    <p className="muted">Quick reports for school management.</p>
    <div className="grid grid4" style={{marginTop:22}}>
      {reports.map(r=><div className="card" key={r[0]}>
        <span className="pill">REPORT</span>
        <h3>{r[0]}</h3>
        <div className="stat" style={{fontSize:21}}>{r[1]}</div>
        <p className="muted">{r[2]}</p>
        <button className="btn secondary" onClick={()=>viewReport(r[0])}>View report</button>
      </div>)}
    </div>
    {selected && <div className="card" style={{marginTop:22}}>
      <div className="eyebrow">Report preview</div>
      <h2>{selected}</h2>
      <p className="muted">Demo preview generated from the school dashboard data.</p>
      <div className="grid grid4" style={{marginTop:16}}>
        <div><div className="muted">Status</div><strong>Ready</strong></div>
        <div><div className="muted">Period</div><strong>2025/2026</strong></div>
        <div><div className="muted">Format</div><strong>PDF / Excel</strong></div>
        <div><div className="muted">Updated</div><strong>Today</strong></div>
      </div>
      <div style={{display:'flex',gap:10,marginTop:18,flexWrap:'wrap'}}>
        <button className="btn" onClick={exportReport}>Export report</button>
        <button className="btn secondary" onClick={()=>setSelected(null)}>Close</button>
      </div>
      {message && <p style={{marginTop:14}} className="muted">✓ {message}</p>}
    </div>}
  </Page>
}

function Page({children}:{children:React.ReactNode}){return <div className="dashboard"><aside className="side"><div className="brand">GB <span style={{color:'#fff'}}>School</span></div>{['Dashboard','Students','Classes','Attendance','Fees & Payments','Results','Reports'].map(x=><Link href={x==='Dashboard'?'/dashboard':`/${x.toLowerCase().replaceAll(' ','-').replace('&-','')}`} key={x}>{x}</Link>)}</aside><main className="main">{children}</main></div>}
