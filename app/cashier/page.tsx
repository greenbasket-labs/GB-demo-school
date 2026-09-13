'use client'

import Link from 'next/link'
import { useState } from 'react'

const students = [
  { name: 'Aisha Bello', id: 'GB/24/0184', className: 'JSS 2A', fees: 180000, paid: 140000 },
  { name: 'Daniel Okafor', id: 'GB/24/0217', className: 'SS 1B', fees: 210000, paid: 210000 },
  { name: 'Maryam Musa', id: 'GB/24/0239', className: 'JSS 3A', fees: 195000, paid: 155000 },
  { name: 'Samuel Adeyemi', id: 'GB/24/0271', className: 'SS 2A', fees: 220000, paid: 120000 },
  { name: 'Esther James', id: 'GB/24/0312', className: 'SS 3B', fees: 225000, paid: 185000 },
]

const money = (n: number) => `₦${n.toLocaleString('en-NG')}`

export default function CashierPage() {
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const filtered = students.filter(s => `${s.name} ${s.id} ${s.className}`.toLowerCase().includes(query.toLowerCase()))
  const outstanding = students.reduce((sum, s) => sum + s.fees - s.paid, 0)

  return <main className="page">
    <div className="page-head"><div><Link href="/dashboard?role=cashier">← Dashboard</Link><h1>Cashier</h1><p>Collect payments, check balances, and monitor today's collections.</p></div><button className="button" onClick={() => setMessage('Payment form opened for the demo.')}>+ Record Payment</button></div>
    {message && <div className="notice">{message}</div>}
    <section className="grid-4">
      <div className="card"><span>Today's Collection</span><strong>{money(485000)}</strong><small>8 completed payments</small></div>
      <div className="card"><span>Active Students</span><strong>1,248</strong><small>Available for payment search</small></div>
      <div className="card"><span>Outstanding Students</span><strong>{students.filter(s => s.fees > s.paid).length}</strong><small>In this demo register</small></div>
      <div className="card"><span>Outstanding Balance</span><strong>{money(outstanding)}</strong><small>Current demo balance</small></div>
    </section>
    <section className="card section"><h2>Find a student</h2><p>Search by student name, admission number or class.</p><input className="input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search student..." />
      <div className="table-wrap"><table><thead><tr><th>Student</th><th>Class</th><th>Total fees</th><th>Paid</th><th>Balance</th><th></th></tr></thead><tbody>{filtered.map(s => <tr key={s.id}><td><b>{s.name}</b><small>{s.id}</small></td><td>{s.className}</td><td>{money(s.fees)}</td><td>{money(s.paid)}</td><td>{money(s.fees-s.paid)}</td><td><button className="button small" onClick={() => setMessage(`Payment started for ${s.name}.`)}>Record</button></td></tr>)}</tbody></table></div>
    </section>
    <section className="grid-2">
      <div className="card section"><h2>Today's collections</h2><p>Collection totals by payment method.</p><div className="mini-grid"><div><span>Cash</span><b>₦125,000</b></div><div><span>Bank Transfer</span><b>₦210,000</b></div><div><span>POS</span><b>₦100,000</b></div><div><span>Online</span><b>₦50,000</b></div></div></div>
      <div className="card section"><h2>Payment history</h2><p>Recent completed payments.</p><div className="list"><div><b>Aisha Bello</b><span>Bank Transfer · ₦40,000</span></div><div><b>Daniel Okafor</b><span>POS · ₦70,000</span></div><div><b>Maryam Musa</b><span>Cash · ₦35,000</span></div></div><Link className="text-link" href="/fees-payments?role=cashier">View payment register →</Link></div>
    </section>
  </main>
}
