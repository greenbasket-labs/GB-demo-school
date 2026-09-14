'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

type Settings = {
  schoolName: string
  motto: string
  address: string
  phone: string
  email: string
  session: string
  term: string
  sections: string[]
}

const defaults: Settings = {
  schoolName: 'Green Basket Demo School',
  motto: 'Learning today. Leading tomorrow.',
  address: 'Abuja, Nigeria',
  phone: '+234 800 000 0000',
  email: 'admin@greenbasket.school',
  session: '2026/2027',
  term: 'First Term',
  sections: ['Primary', 'Junior Secondary', 'Senior Secondary'],
}

const sectionOptions = ['Nursery', 'Primary', 'Junior Secondary', 'Senior Secondary']

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('gb-school-settings')
    if (stored) {
      try { setSettings({ ...defaults, ...JSON.parse(stored) }) } catch { /* use defaults */ }
    }
  }, [])

  const update = (key: keyof Settings, value: string) => {
    setSettings((current) => ({ ...current, [key]: value }))
    setSaved(false)
  }

  const toggleSection = (section: string) => {
    setSettings((current) => ({
      ...current,
      sections: current.sections.includes(section)
        ? current.sections.filter((item) => item !== section)
        : [...current.sections, section],
    }))
    setSaved(false)
  }

  const handleLogo = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) setSaved(false)
  }

  const saveSettings = () => {
    window.localStorage.setItem('gb-school-settings', JSON.stringify(settings))
    setSaved(true)
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <p className="eyebrow">OWNER / ADMIN</p>
        <h1>School Settings</h1>
        <p className="muted">Keep the school identity and academic setup in one clean place.</p>

        <div className="settings-stack">
          <details className="card settings-section" open>
            <summary>School Information <span>Identity and contact details</span></summary>
            <div className="form-grid">
              <label>School name<input aria-label="School name" value={settings.schoolName} onChange={(e) => update('schoolName', e.target.value)} /></label>
              <label>Motto<input aria-label="Motto" value={settings.motto} onChange={(e) => update('motto', e.target.value)} /></label>
              <label>Address<input aria-label="Address" value={settings.address} onChange={(e) => update('address', e.target.value)} /></label>
              <label>Phone<input aria-label="Phone" value={settings.phone} onChange={(e) => update('phone', e.target.value)} /></label>
              <label>Email<input aria-label="Email" type="email" value={settings.email} onChange={(e) => update('email', e.target.value)} /></label>
              <label>School logo<input aria-label="School logo" type="file" accept="image/*" onChange={handleLogo} /></label>
            </div>
          </details>

          <details className="card settings-section">
            <summary>Academic Setup <span>Session and current term</span></summary>
            <div className="form-grid">
              <label>Academic session<select aria-label="Academic session" value={settings.session} onChange={(e) => update('session', e.target.value)}><option>2026/2027</option><option>2027/2028</option><option>2028/2029</option></select></label>
              <label>Current term<select aria-label="Current term" value={settings.term} onChange={(e) => update('term', e.target.value)}><option>First Term</option><option>Second Term</option><option>Third Term</option></select></label>
            </div>
          </details>

          <details className="card settings-section">
            <summary>School Sections <span>Select the sections this school operates</span></summary>
            <div className="section-options">
              {sectionOptions.map((section) => (
                <label className="check-option" key={section}>
                  <input aria-label={section} type="checkbox" checked={settings.sections.includes(section)} onChange={() => toggleSection(section)} />
                  <span>{section}</span>
                </label>
              ))}
            </div>
          </details>
        </div>

        <div className="settings-actions">
          <button className="btn primary" onClick={saveSettings}>Save school settings</button>
          {saved && <span className="save-message">Saved successfully</span>}
        </div>
      </main>
    </div>
  )
}
