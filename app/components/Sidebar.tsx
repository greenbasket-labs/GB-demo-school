'use client'

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

  return <aside className="side">
    <div className="brand">GB <span style={{color:'#fff'}}>School</span></div>
    <small style={{padding:'0 10px',color:'#8fae9a'}}>DEMO SCHOOL</small>
    {links.map(([label, href]) => {
      const active = pathname === href
      return <Link className={active ? 'active' : ''} href={href} key={label}>{label}</Link>
    })}
    <Link href="/login" style={{marginTop:30}}>Switch role</Link>
  </aside>
}
