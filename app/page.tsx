import Link from 'next/link'

const roles = [
  ['Owner / Admin','School-wide operations and reporting'],
  ['Accountant / Cashier','Fees, payments and collections'],
  ['Teacher','Classes, attendance and results'],
  ['Parent','Children, fees and academic progress'],
  ['Student','Subjects, attendance and results'],
]

const features = [
  ['Students','Keep student records organised and easy to find.'],
  ['Attendance','Mark attendance and see school-wide trends.'],
  ['Fees & Payments','Track collections, balances and outstanding fees.'],
  ['Results','Manage academic results across classes and subjects.'],
]

export default function Home(){
  return <div className="shell">
    <nav className="nav">
      <div className="brand">Green Basket <span>Global</span></div>
      <Link className="btn primary" href="/login">Enter live demo</Link>
    </nav>

    <main>
      <section className="hero">
        <div>
          <div className="eyebrow">Live product demo · Abuja, Nigeria</div>
          <h1>Run your school from one place.</h1>
          <p>Green Basket gives private schools one clear system for students, classes, attendance, fees, payments and results.</p>
          <div style={{display:'flex',gap:12,marginTop:24,flexWrap:'wrap'}}>
            <Link className="btn primary" href="/login">Enter the school</Link>
            <a className="btn secondary" href="#features">Explore features</a>
          </div>
        </div>
        <div className="demo-card">
          <small>LIVE DEMO SCHOOL</small>
          <h2 style={{fontSize:30,margin:'8px 0 18px'}}>Green Basket Demo School</h2>
          <div className="demo-stat">1,248</div>
          <div style={{color:'#b9d9c5'}}>active students</div>
          <hr style={{border:0,borderTop:'1px solid #ffffff25',margin:'24px 0'}}/>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>2025/2026 Session</span><span>Active</span></div>
        </div>
      </section>

      <section className="section" id="features">
        <div style={{marginBottom:22}}>
          <div className="eyebrow">Built around daily school work</div>
          <h2>Everything important, in one workflow.</h2>
          <p className="muted">Explore the core areas a school team uses every day.</p>
        </div>
        <div className="grid grid4">{features.map(([name,desc])=><div className="card" key={name}><div className="pill">CORE</div><h3>{name}</h3><p className="muted">{desc}</p></div>)}</div>
      </section>

      <section className="section" id="roles">
        <div style={{marginBottom:22}}>
          <div className="eyebrow">One school · multiple roles</div>
          <h2>Test the experience from any role.</h2>
          <p className="muted">Choose a role and explore its dedicated workflow.</p>
        </div>
        <div className="grid grid4">{roles.map(([name,desc],i)=><div className="card" key={name}><div className="pill">ROLE {i+1}</div><h3>{name}</h3><p className="muted">{desc}</p></div>)}</div>
        <div style={{marginTop:24}}><Link className="btn primary" href="/login">Start the live demo →</Link></div>
      </section>
    </main>

    <footer style={{padding:'28px 0 40px',borderTop:'1px solid #e5ebe7',marginTop:20}}>
      <span className="muted">Green Basket Global · Digital solutions for private schools.</span>
    </footer>
  </div>
}