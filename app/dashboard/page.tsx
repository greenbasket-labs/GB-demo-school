import Link from 'next/link'

const common = [
  ['Dashboard','/dashboard'], ['Students','/students'], ['Classes','/classes'],
  ['Attendance','/attendance'], ['Fees & Payments','/fees-payments'], ['Results','/results'], ['Reports','/reports']
]

const roles = {
  owner: { name:'Owner / Admin', eyebrow:'School management', intro:'Everything your school needs to monitor daily operations.', cards:[['Students','1,248','Active learners'],['Teachers','74','Teaching staff'],['Attendance','94.2%','Today'],['Outstanding','₦18.4m','Fees balance']] },
  cashier: { name:'Accountant / Cashier', eyebrow:'Finance desk', intro:'Keep fee collection and payment records under control.', cards:[['Collected','₦42.7m','This session'],['Outstanding','₦18.4m','Balance'],['Payments','326','Recorded this term'],['Collection rate','69.9%','Overall']] },
  teacher: { name:'Teacher', eyebrow:'Teaching workspace', intro:'Focus on your classes, attendance and academic results.', cards:[['My classes','4','Assigned'],['Students','148','Across classes'],['Attendance','96.1%','This week'],['Results','92%','Processed']] },
  parent: { name:'Parent', eyebrow:'Parent portal', intro:'See your children’s school activity in one place.', cards:[['Children','2','Enrolled'],['Attendance','95.4%','This term'],['Fees','₦80,000','Outstanding'],['Results','4.2 / 5','Average grade']] },
  student: { name:'Student', eyebrow:'Student portal', intro:'Your classes, attendance and academic progress at a glance.', cards:[['Class','JSS 2A','Current class'],['Subjects','10','This term'],['Attendance','97%','This term'],['Average','82%','Current result']] }
} as const

type Role = keyof typeof roles

export default async function Dashboard({searchParams}:{searchParams:Promise<{role?:string}>}) {
  const params = await searchParams
  const role: Role = params.role && params.role in roles ? params.role as Role : 'owner'
  const data = roles[role]
  const links = role === 'cashier' ? common.filter(x=>['Dashboard','Fees & Payments','Reports'].includes(x[0])) : role === 'teacher' ? common.filter(x=>['Dashboard','Classes','Students','Attendance','Results'].includes(x[0])) : role === 'parent' ? common.filter(x=>['Dashboard','Attendance','Fees & Payments','Results'].includes(x[0])) : role === 'student' ? common.filter(x=>['Dashboard','Attendance','Results'].includes(x[0])) : common

  return <div className="dashboard"><aside className="side"><div className="brand">GB <span style={{color:'#fff'}}>School</span></div><small style={{padding:'0 10px',color:'#8fae9a'}}>DEMO SCHOOL</small>{links.map(([label,href])=><Link href={`${href}${href==='/dashboard'?`?role=${role}`:''}`} key={label}>{label}</Link>)}<Link href="/login" style={{marginTop:30}}>Switch role</Link></aside><main className="main"><div className="topline"><div><div className="eyebrow">2025/2026 · First Term · {data.eyebrow}</div><h1 style={{margin:'5px 0'}}>Good morning, {data.name}</h1><p className="muted">{data.intro}</p></div><span className="pill">LIVE DEMO</span></div><div className="grid grid4">{data.cards.map(([label,value,sub])=><div className="card" key={label}><span className="muted">{label}</span><div className="stat">{value}</div><small className="muted">{sub}</small></div>)}</div><div className="card" style={{marginTop:18}}><h3>Quick actions</h3><div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:14}}>{links.slice(1,4).map(([label,href])=><Link className="btn secondary" href={href} key={label}>{label}</Link>)}</div></div></main></div>
}