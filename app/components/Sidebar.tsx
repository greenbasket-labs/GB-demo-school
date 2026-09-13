'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const common = [
  ['Dashboard','/dashboard'],
  ['Students','/students'],
  ['Classes','/classes'],
  ['Attendance','/attendance'],
  ['Fees & Payments','/fees-payments'],
  ['Results','/results'],
  ['Reports','/reports'],
]

const roleLinks: Record<string, string[]> = {
  cashier: ['Dashboard','Fees & Payments','Reports'],
  teacher: ['Dashboard','Classes','Students','Attendance','Results'],
  parent: ['Dashboard','Attendance','Fees & Payments','Results'],
  student: ['Dashboard','Attendance','Results'],
}

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [role, setRole] = useState('owner')

  useEffect(() => {
    const syncRole = () => {
      const value = new URLSearchParams(window.location.search).get('role')
      setRole(value && roleLinks[value] ? value : 'owner')
    }
    syncRole()
  }, [pathname])

  const allowed = roleLinks[role] ?? common.map(([label]) => label)
  const links = common.filter(([label]) => allowed.includes(label))

  return <>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
      {open ? 'Close' : 'Menu'}
    </button>
    <aside className={`side ${open ? 'mobile-open' : ''}`}>
      <div className="brand">GB <span style={{color:'#fff'}}>School</span></div>
      <small style={{padding:'0 10px',color:'#8fae9a'}}>DEMO SCHOOL</small>
      {links.map(([label, href]) => {
        const active = pathname === href
        const target = role === 'owner' ? href : `${href}?role=${role}`
        return <Link className={active ? 'active' : ''} href={target} key={label} onClick={() => setOpen(false)}>{label}</Link>
      })}
      <Link href="/login" style={{marginTop:30}} onClick={() => setOpen(false)}>Switch role</Link>
    </aside>
  </>
}
