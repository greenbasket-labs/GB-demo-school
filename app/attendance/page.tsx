'use client'

import Link from 'next/link'
import Sidebar from '@/app/components/Sidebar'
import { useMemo, useState } from 'react'

type Status = 'Present' | 'Absent'
type Student = { id:number; name:string; admissionNo:string; status:Status }
const initialStudents: Student[] = [
  { id:1, name:'Aisha Bello', admissionNo:'GB/24/0184', status:'Present' },
  { id:2, name:'Daniel Okafor', admissionNo:'GB/24/0217', status:'Present' },
  { id:3, name:'Maryam Musa', admissionNo:'GB/24/0239', status:'Present' },
  { id:4, name:'Samuel Adeyemi', admissionNo:'GB/24/0271', status:'Absent' },
  { id:5, name:'Esther James', admissionNo:'GB/24/0312', status:'Present' },
  { id:6, name:'Ibrahim Yusuf', admissionNo:'GB/24/0345', status:'Present' },
]
export default function Attendance(){
 const [students,setStudents]=useState(initialStudents); const [saved,setSaved]=useState(false)
 const present=useMemo(()=>students.filter(s=>s.status==='Present').length,[students]); const absent=students.length-present; const rate=Math.round((present/students.length)*1000)/10
 function setStatus(id:number,status:Status){setSaved(false);setStudents(current=>current.map(s=>s.id===id?{...s,status}:s))}
 function markAllPresent(){setSaved(false);setStudents(current=>current.map(s=>({...s,status:'Present'})))}
 return <Page><div className="eyebrow">Daily attendance</div><div style={{display:'flex',justifyContent:'space-between',gap:16,alignItems:'flex-start',flexWrap:'wrap'}}><div><h1>Attendance</h1><p className="muted">Today · Monday, 14 September 2026 · JSS 2A</p></div><div style={{display:'flex',gap:10}}><button type="button" onClick={markAllPresent} style={secondaryButton}>Mark all present</button><button type="button" onClick={()=>setSaved(true)} style={primaryButton}>Save attendance</button></div></div>{saved&&<div style={savedBanner}>✓ Attendance saved for the demo session</div>}<div style={summaryGrid}><Summary label="Present" value={present} detail="Students present"/><Summary label="Absent" value={absent} detail="Students absent"/><Summary label="Attendance rate" value={`${rate}%`} detail="For JSS 2A today"/></div><div className="card" style={{marginTop:22,overflow:'hidden'}}><div style={{padding:'18px 20px',borderBottom:'1px solid #e8ecf2',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><strong>JSS 2A register</strong><div className="muted" style={{fontSize:13,marginTop:4}}>{students.length} students on today&apos;s register</div></div><span className="pill">Live demo</span></div><table className="table"><thead><tr><th>Student</th><th>Admission No.</th><th>Status</th><th>Action</th></tr></thead><tbody>{students.map(s=><tr key={s.id}><td><strong>{s.name}</strong></td><td>{s.admissionNo}</td><td><span className="pill" style={s.status==='Absent'?{background:'#fff1f0',color:'#b42318'}:undefined}>{s.status}</span></td><td><div style={{display:'flex',gap:7}}><button type="button" onClick={()=>setStatus(s.id,'Present')} style={s.status==='Present'?activeButton:actionButton}>Present</button><button type="button" onClick={()=>setStatus(s.id,'Absent')} style={s.status==='Absent'?absentButton:actionButton}>Absent</button></div></td></tr>)}</tbody></table></div></Page>
}
function Summary({label,value,detail}:{label:string,value:string|number,detail:string}){return <div className="card" style={{padding:18}}><div className="muted" style={{fontSize:13}}>{label}</div><div style={{fontSize:28,fontWeight:800,marginTop:5}}>{value}</div><div className="muted" style={{fontSize:12,marginTop:3}}>{detail}</div></div>}
function Page({children}:{children:React.ReactNode}){return <div className="dashboard"><Sidebar/><main className="main">{children}</main></div>}
const primaryButton:React.CSSProperties={border:0,borderRadius:10,padding:'10px 15px',fontWeight:700,cursor:'pointer',background:'#176b4d',color:'#fff'}
const secondaryButton:React.CSSProperties={border:'1px solid #d9e0e8',borderRadius:10,padding:'10px 15px',fontWeight:700,cursor:'pointer',background:'#fff',color:'#263238'}
const actionButton:React.CSSProperties={border:'1px solid #d9e0e8',borderRadius:8,padding:'7px 10px',fontSize:12,fontWeight:600,cursor:'pointer',background:'#fff',color:'#45505a'}
const activeButton:React.CSSProperties={...actionButton,background:'#edf8f2',borderColor:'#b8dec9',color:'#176b4d'}
const absentButton:React.CSSProperties={...actionButton,background:'#fff1f0',borderColor:'#f0c4c0',color:'#b42318'}
const savedBanner:React.CSSProperties={marginTop:18,padding:'11px 14px',borderRadius:10,background:'#edf8f2',color:'#176b4d',fontSize:14,fontWeight:600}
const summaryGrid:React.CSSProperties={display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:14,marginTop:22}
