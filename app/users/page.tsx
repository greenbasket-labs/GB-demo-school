'use client'

import { FormEvent, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

type Delegation = {
  id: string
  user: string
  email: string
  phone: string
  scope: 'Full Owner Role' | 'Selected Permissions'
  permissions: string[]
  start: string
  end: string
  status: 'Pending 24h' | 'Active' | 'Expired' | 'Revoked'
  createdAt: string
}

const users = [
  ['Owner / Admin', 'Full school access', 'Active'],
  ['Cashier', 'Fees, payments & reports', 'Active'],
  ['Teacher', 'Classes, attendance & results', 'Active'],
  ['Parent', 'Child records & communication', 'Active'],
  ['Student', 'Own academic records', 'Active'],
]

const permissions = [
  'School Setup', 'Admissions & Recruitment', 'Students', 'Classes', 'Attendance',
  'Fees & Payments', 'Results', 'Reports', 'Announcements', 'Staff & Teachers',
  'Parents', 'Subjects & Setup', 'Users & Roles', 'Audit History',
]

export default function UsersPage() {
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const [message, setMessage] = useState('')
  const [scope, setScope] = useState<Delegation['scope']>('Selected Permissions')
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('gb-owner-delegations')
    if (saved) setDelegations(JSON.parse(saved))
  }, [])

  const save = (next: Delegation[]) => {
    setDelegations(next)
    localStorage.setItem('gb-owner-delegations', JSON.stringify(next))
  }

  const createDelegation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const user = String(form.get('user') || '').trim()
    const email = String(form.get('email') || '').trim()
    const phone = String(form.get('phone') || '').trim()
    const start = String(form.get('start') || '')
    const end = String(form.get('end') || '')

    if (!user || !email || !phone || !start || !end) return setMessage('Please complete all delegation fields.')
    if (new Date(end) <= new Date(start)) return setMessage('End time must be after start time.')
    if (scope === 'Selected Permissions' && selected.length === 0) return setMessage('Select at least one permission for a partial delegation.')

    const durationHours = (new Date(end).getTime() - new Date(start).getTime()) / 3600000
    if (scope === 'Full Owner Role' && durationHours < 24) {
      return setMessage('Security rule: Full Owner Role delegation must remain pending for at least 24 hours before activation.')
    }

    const item: Delegation = {
      id: crypto.randomUUID(), user, email, phone, scope,
      permissions: scope === 'Full Owner Role' ? [...permissions] : selected,
      start, end,
      status: scope === 'Full Owner Role' ? 'Pending 24h' : 'Active',
      createdAt: new Date().toISOString(),
    }
    save([item, ...delegations])
    setMessage(scope === 'Full Owner Role'
      ? `Delegation created. ${user} gets zero Owner access until the 24-hour security delay passes. Owner alert required: ${phone} / ${email}.`
      : `Partial delegation created for ${user}. Owner alert required: ${phone} / ${email}.`)
    event.currentTarget.reset()
    setSelected([])
  }

  const revoke = (id: string) => {
    save(delegations.map(item => item.id === id ? { ...item, status: 'Revoked' } : item))
    setMessage('Delegation revoked. An audit event should record this action.')
  }

  return <div className="app-shell"><Sidebar /><main className="main">
    <p className="eyebrow">OWNER / ADMIN</p>
    <h1>Users & Roles</h1>
    <p className="muted">Review school roles and securely delegate selected Owner permissions when needed.</p>

    <div className="table-wrap" style={{marginBottom:24}}><table><thead><tr><th>Role</th><th>Access</th><th>Status</th></tr></thead><tbody>{users.map(([role, access, status]) => <tr key={role}><td>{role}</td><td>{access}</td><td>{status}</td></tr>)}</tbody></table></div>

    <section className="card" style={{padding:20, marginBottom:24}}>
      <h2 style={{marginTop:0}}>Owner Delegation</h2>
      <p className="muted">The delegated user never becomes the actual Owner. Full Owner delegation has a mandatory 24-hour security delay.</p>
      <div className="card" style={{padding:14, margin:'16px 0'}}>
        <strong>Security protection</strong>
        <p className="muted" style={{marginBottom:0}}>When a full delegation is created, the Owner should receive an SMS/phone and email alert immediately. During the 24-hour pending period, the delegate has zero Owner access and the Owner can revoke the request.</p>
      </div>

      <form onSubmit={createDelegation}>
        <div className="form-grid">
          <label>Delegate user<input name="user" placeholder="Full name" /></label>
          <label>Email<input name="email" type="email" placeholder="delegate@example.com" /></label>
          <label>Phone<input name="phone" placeholder="0800 000 0000" /></label>
          <label>Start<input name="start" type="datetime-local" /></label>
          <label>End<input name="end" type="datetime-local" /></label>
          <label>Delegation scope<select value={scope} onChange={e => setScope(e.target.value as Delegation['scope'])}><option>Selected Permissions</option><option>Full Owner Role</option></select></label>
        </div>

        {scope === 'Selected Permissions' && <div style={{marginTop:16}}><strong>Select permissions</strong><div className="form-grid" style={{marginTop:10}}>{permissions.map(permission => <label key={permission} style={{display:'flex',gap:8,alignItems:'center'}}><input type="checkbox" checked={selected.includes(permission)} onChange={e => setSelected(e.target.checked ? [...selected, permission] : selected.filter(item => item !== permission))} />{permission}</label>)}</div></div>}

        <button type="submit" style={{marginTop:18}}>Create Delegation</button>
        {message && <p className="muted" style={{marginTop:12}}>{message}</p>}
      </form>
    </section>

    <section>
      <h2>Delegation History</h2>
      {delegations.length === 0 ? <p className="muted">No owner delegations have been created.</p> : <div className="table-wrap"><table><thead><tr><th>Delegate</th><th>Scope</th><th>Period</th><th>Status</th><th>Action</th></tr></thead><tbody>{delegations.map(item => <tr key={item.id}><td>{item.user}<br /><small>{item.email}</small></td><td>{item.scope}<br /><small>{item.permissions.length} permission(s)</small></td><td>{new Date(item.start).toLocaleString()}<br />to<br />{new Date(item.end).toLocaleString()}</td><td>{item.status}</td><td>{item.status !== 'Revoked' && <button type="button" onClick={() => revoke(item.id)}>Revoke</button>}</td></tr>)}</tbody></table></div>}
    </section>
  </main></div>
}
