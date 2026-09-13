import Link from 'next/link'

const roles = [
  ['Owner / Admin','owner'],['Accountant / Cashier','cashier'],['Teacher','teacher'],['Parent','parent'],['Student','student']
]
export default function Login(){return <main className="login"><div className="login-box"><div className="brand">Green Basket Global</div><div className="card" style={{marginTop:16}}><div className="eyebrow">Demo access</div><h1>Enter Green Basket Demo School</h1><p className="muted">Choose a role to explore the live school workflow. No setup is required.</p><form action="/dashboard" method="get"><label><strong>Demo role</strong></label><select name="role" defaultValue="owner">{roles.map(([name,value])=><option value={value} key={value}>{name}</option>)}</select><button className="btn primary" style={{width:'100%'}} type="submit">Enter dashboard</button></form><Link href="/" className="btn secondary" style={{width:'100%',marginTop:10}}>Back to website</Link></div></div></main>}
