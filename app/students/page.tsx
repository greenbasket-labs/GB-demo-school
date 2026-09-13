'use client'

import Link from 'next/link'
import {useMemo,useState} from 'react'

const rows=[['GBS/25/001','Aisha Bello','JSS 2A','Active'],['GBS/25/002','Daniel Okafor','SS 1B','Active'],['GBS/25/003','Maryam Musa','JSS 3A','Active'],['GBS/25/004','Samuel Adeyemi','SS 2A','Active'],['GBS/25/005','Esther James','SS 3B','Active']]

export default function Students(){
 const [query,setQuery]=useState('')
 const [status,setStatus]=useState('All')
 const [selected,setSelected]=useState<string|null>(null)
 const [added,setAdded]=useState(false)
 const filtered=useMemo(()=>rows.filter(r=>r.join(' ').toLowerCase().includes(query.toLowerCase())&&(status==='All'||r[3]===status)),[query,status])
 return <Page title="Students" sub="1,248 active students">
  <div className="grid grid4" style={{marginBottom:18}}>
   <div className="card"><div className="muted">Total students</div><div className="stat">1,248</div></div>
   <div className="card"><div className="muted">Active</div><div className="stat">1,231</div></div>
   <div className="card"><div className="muted">New this term</div><div className="stat">42</div></div>
   <div className="card"><div className="muted">Showing</div><div className="stat">{filtered.length}</div></div>
  </div>
  <div className="card">
   <div style={{display:'flex',justifyContent:'space-between',gap:12,marginBottom:18,flexWrap:'wrap'}}>
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search student, admission no. or class..." style={{maxWidth:430,width:'100%',padding:'12px 14px',border:'1px solid #d7ddd9',borderRadius:10,fontSize:14}} />
    <div style={{display:'flex',gap:8}}>
     {['All','Active'].map(x=><button key={x} className={status===x?'btn primary':'btn secondary'} onClick={()=>setStatus(x)}>{x}</button>)}
     <button className="btn secondary" onClick={()=>setAdded(true)}>+ Add student</button>
    </div>
   </div>
   <table className="table"><thead><tr><th>Admission No.</th><th>Name</th><th>Class</th><th>Status</th><th></th></tr></thead><tbody>{filtered.map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{i===3?<span className="pill">{x}</span>:x}</td>)}<td><button className="btn secondary" onClick={()=>setSelected(r[0])}>View</button></td></tr>)}{filtered.length===0&&<tr><td colSpan={5} className="muted">No students found.</td></tr>}</tbody></table>
   {selected&&<div className="card" style={{marginTop:18}}><div className="eyebrow">Student profile</div><h3 style={{margin:'6px 0'}}>Viewing {selected}</h3><p className="muted">Demo profile: attendance, results, fees and class information are available from the school modules.</p><button className="btn secondary" onClick={()=>setSelected(null)}>Close</button></div>}
   {added&&<div className="card" style={{marginTop:18}}><div className="eyebrow">Demo action</div><h3 style={{margin:'6px 0'}}>Add student</h3><p className="muted">Student registration form would open here in the live system.</p><button className="btn primary" onClick={()=>setAdded(false)}>Close</button></div>}
  </div>
 </Page>
}

function Page({title,sub,children}:{title:string,sub:string,children:React.ReactNode}){return <div className="dashboard"><aside className="side"><div className="brand">GB <span style={{color:'#fff'}}>School</span></div>{['Dashboard','Students','Classes','Attendance','Fees & Payments','Results','Reports'].map(x=><Link href={x==='Dashboard'?'/dashboard':`/${x.toLowerCase().replaceAll(' ','-').replace('&-','')}`} key={x}>{x}</Link>)}</aside><main className="main"><div className="topline"><div><div className="eyebrow">Student management</div><h1 style={{margin:'5px 0'}}>{title}</h1><p className="muted">{sub}</p></div><Link className="btn primary" href="/dashboard">Dashboard</Link></div>{children}</main></div>}
