import './globals.css'

export const metadata = {
  title: 'Green Basket Demo School',
  description: 'Live school management system demo by Green Basket Global.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
