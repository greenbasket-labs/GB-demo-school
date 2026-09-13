'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  ['Dashboard','/dashboard'],
  ['Students','/students'],
  ['Classes','/classes'],
  ['Attendance','/attendance'],
  ['Fees & Payments','/fees-payments'],
  ['Results','/results'],
  ['Reports','/reports'],
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return <>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
      {open ? 'Close' : 'Menu'}
    </button>
    <aside className={`side ${open ? 'mobile-open' : ''}`}>
      <div className="brand">GB <span style={{color:'#fff'}}>School</span></div>
      <small style={{padding:'0 10px',color:'#8fae9a'}}>DEMO SCHOOL</small>
      {links.map(([label, href]) => {
        const active = pathname === href
        return <Link className={active ? 'active' : ''} href={href} key={label} onClick={() => setOpen(false)}>{label}</Link>
      })}
      <Link href="/login" style={{marginTop:30}} onClick={() => setOpen(false)}>Switch role</Link>
    </aside>
  </>
}
