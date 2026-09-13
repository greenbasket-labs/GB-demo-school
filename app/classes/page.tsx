'use client'

import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'
import {useMemo,useState} from 'react'

const classes=[['JSS 1A','38','Mrs. Ibrahim'],['JSS 2A','41','Mr. Musa'],['JSS 3A','39','Mrs. Okafor'],['SS 1B','36','Mr. Bello'],['SS 2A','34','Mrs. Yusuf'],['SS 3B','31','Mr. Adeyemi']]

export default function Classes(){
 const [query,setQuery]=useState(''); const [selected,setSelected]=useState<string|null>(null)
 const filtered=useMemo(()=>classes.filter(c=>c.join(' ').toLowerCase().includes(query.toLowerCase())),[query])
 return <Page><div className="eyebrow">Academic structure</div><h1>Classes</h1><p className="muted">36 active classes · 1,248 students</p><div style={{display:'flex',gap:12,marginTop:22,marginBottom:18,flexWrap:'wrap'}}><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search class or teacher..." style={{maxWidth:380,width:'100%',padding:'12px 14px',border:'1px solid #d7ddd9',borderRadius:10,fontSize:14}}/><span className="pill" style={{alignSelf:'center'}}>{filtered.length} classes</span></div><div className="grid grid3">{filtered.map(c=><button key={c[0]} onClick={()=>setSelected(c[0])} className="card" style={{textAlign:'left',cursor:'pointer',border:'1px solid #e3e8e5'}}><span className="pill">ACTIVE</span><h2>{c[0]}</h2><p>{c[1]} students</p><p className="muted">Class teacher: {c[2]}</p><p className="muted" style={{marginTop:14}}>Open class →</p></button>)}</div>{filtered.length===0&&<div className="card muted">No classes found.</div>}{selected&&<div className="card" style={{marginTop:20}}><div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}><div><span className="eyebrow">Class selected</span><h3 style={{margin:'4px 0'}}>{selected}</h3><p className="muted">Demo class workspace · Students · Attendance · Results</p></div><button className="btn secondary" onClick={()=>setSelected(null)}>Close</button></div></div>}</Page>
}
function Page({children}:{children:React.ReactNode}){return <div className="dashboard"><Sidebar/><main className="main">{children}</main></div>}
