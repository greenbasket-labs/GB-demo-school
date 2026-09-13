'use client'

import Link from 'next/link'
import {useMemo,useState} from 'react'

const rows=[['GBS/25/001','Aisha Bello','JSS 2A','Active'],['GBS/25/002','Daniel Okafor','SS 1B','Active'],['GBS/25/003','Maryam Musa','JSS 3A','Active'],['GBS/25/004','Samuel Adeyemi','SS 2A','Active'],['GBS/25/005','Esther James','SS 3B','Active']]

export default function Students(){
 const [query,setQuery]=useState('')
 const filtered=useMemo(()=>rows.filter(r=>r.join(' ').toLowerCase().includes(query.toLowerCase())),[query])
 return <Page title="Students" sub="1,248 active students">
  <div className="card">
   <div style={{display:'flex',justifyContent:'space-between',gap:12,marginBottom:18,flexWrap:'wrap'}}>
    <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search student, admission no. or class..." style={{maxWidth:430,width:'100%',padding:'12px 14px',border:'1px solid #d7ddd9',borderRadius:10,fontSize:14}} />
    <span className="muted" style={{alignSelf:'center'}}>{filtered.length} shown</span>
   </div>
   <table className="table"><thead><tr><th>Admission No.</th><th>Name</th><th>Class</th><th>Status</th></tr></thead><tbody>{filtered.map(r=><tr key={r[0]}>{r.map((x,i)=><td key={i}>{i===3?<span className="pill">{x}</span>:x}</td>)}</tr>)}{filtered.length===0&&<tr><td colSpan={4} className="muted">No students found.</td></tr>}</tbody></table>
  </div>
 </Page>
}

function Page({title,sub,children}:{title:string,sub:string,children:React.ReactNode}){return <div className="dashboard"><aside className="side"><div className="brand">GB <span style={{color:'#fff'}}>School</span></div>{['Dashboard','Students','Classes','Attendance','Fees & Payments','Results','Reports'].map(x=><Link href={x==='Dashboard'?'/dashboard':`/${x.toLowerCase().replaceAll(' ','-').replace('&-','')}`} key={x}>{x}</Link>)}</aside><main className="main"><div className="topline"><div><div className="eyebrow">Student management</div><h1 style={{margin:'5px 0'}}>{title}</h1><p className="muted">{sub}</p></div><Link className="btn primary" href="/dashboard">Dashboard</Link></div>{children}</main></div>}
