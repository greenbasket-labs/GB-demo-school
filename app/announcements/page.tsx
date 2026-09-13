'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const announcements = [
  { title:'First Term Parent Meeting', date:'13 Sep 2026', audience:'Parents', text:'Parent meeting holds on Friday at 2:00 PM in the school hall. Class teachers will share term progress and next steps.' },
  { title:'Continuous Assessment Deadline', date:'12 Sep 2026', audience:'Teachers', text:'All first-term continuous assessment scores should be completed before the results review.' },
  { title:'School Fees Reminder', date:'10 Sep 2026', audience:'All families', text:'Families with outstanding first-term balances are encouraged to complete payment before the next reporting cycle.' },
]

export default function Announcements() {
  const [selected, setSelected] = useState<string | null>(null)
  const router = useRouter()

  return <div className="dashboard">
    <main className="main" style={{maxWidth:980,margin:'0 auto',width:'100%'}}>
      <div style={{marginBottom:18}}>
        <button className="btn secondary" onClick={() => router.back()}>← Back</button>
      </div>
      <div className="topline">
        <div>
          <div className="eyebrow">School communication</div>
          <h1 style={{margin:'5px 0'}}>Announcements</h1>
          <p className="muted">Important updates for staff, students and families.</p>
        </div>
        <span className="pill">3 NEW</span>
      </div>

      <div className="grid" style={{gap:14}}>
        {announcements.map(item => <div className="card" key={item.title}>
          <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'flex-start'}}>
            <div>
              <span className="eyebrow">{item.audience}</span>
              <h3 style={{margin:'5px 0'}}>{item.title}</h3>
            </div>
            <small className="muted">{item.date}</small>
          </div>
          <p className="muted">{item.text}</p>
          <button className="btn secondary" onClick={() => setSelected(item.title)}>{selected === item.title ? 'Read' : 'View announcement'}</button>
          {selected === item.title && <div className="section" style={{marginTop:14,padding:12}}><strong>Announcement opened</strong><p className="muted" style={{margin:'5px 0 0'}}>This demo shows how school-wide messages can be presented to the right audience.</p></div>}
        </div>)}
      </div>
    </main>
  </div>
}
