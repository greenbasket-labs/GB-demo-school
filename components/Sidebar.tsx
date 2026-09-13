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
] as const

export default function Sidebar({ role }: { role?: string }) {
  const pathname = usePathname()
  const suffix = role ? `?role=${role}` : ''

  return <aside className="side">
    <div className="brand">GB <span style={{color:'#fff'}}>School</span></div>
    <small style={{padding:'0 10px',color:'#8fae9a'}}>DEMO SCHOOL</small>
    {links.map(([label, href]) => {
      const active = pathname === href
      return <Link key={href} href={`${href}${href === '/dashboard' ? suffix : ''}`} className={active ? 'active' : undefined} aria-current={active ? 'page' : undefined}>{label}</Link>
    })}
  </aside>
}
