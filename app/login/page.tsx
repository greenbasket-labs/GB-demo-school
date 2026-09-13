import Link from 'next/link'

const roles = [
  ['Owner / Admin','owner','Full school overview'],
  ['Accountant / Cashier','cashier','Fees and payments'],
  ['Teacher','teacher','Classes, attendance and results'],
  ['Parent','parent','Children and school progress'],
  ['Student','student','Subjects and academic progress'],
]

export default function Login() {
  return (
    <main className="login">
      <div className="login-box">
        <div className="brand">Green Basket Global</div>
        <div className="card" style={{marginTop:16}}>
          <div className="eyebrow">LIVE PRODUCT DEMO</div>
          <h1>Enter Green Basket Demo School</h1>
          <p className="muted">Choose a role to explore the live school workflow. No setup is required.</p>

          <div style={{display:'grid',gap:10,margin:'20px 0'}}>
            {roles.map(([name,value,description]) => (
              <div className="card" key={value} style={{padding:14}}>
                <strong>{name}</strong>
                <div className="muted" style={{fontSize:13,marginTop:4}}>{description}</div>
              </div>
            ))}
          </div>

          <form action="/dashboard" method="get">
            <label htmlFor="role"><strong>Choose demo role</strong></label>
            <select id="role" name="role" defaultValue="owner">
              {roles.map(([name,value]) => <option value={value} key={value}>{name}</option>)}
            </select>
            <button className="btn primary" style={{width:'100%',marginTop:12}} type="submit">Enter dashboard</button>
          </form>
          <Link href="/" className="btn secondary" style={{width:'100%',marginTop:10}}>Back to website</Link>
        </div>
      </div>
    </main>
  )
}
