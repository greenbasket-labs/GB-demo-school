'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  ['Dashboard', '/dashboard'],
  ['My Teaching', '/teachers'],
  ['Classes', '/classes'],
  ['Students', '/students'],
  ['Attendance', '/attendance'],
  ['Results', '/results'],
  ['Announcements', '/announcements'],
]

export default function TeacherRoleNav() {
  const pathname = usePathname()
  return <nav className="role-nav">{links.map(([label, href]) => <Link key={label} className={pathname === href ? 'active' : ''} href={`${href}?role=teacher`}>{label}</Link>)}</nav>
}
