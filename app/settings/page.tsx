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

type Vacancy = {
  id: string
  title: string
  type: 'Student Admission' | 'Teacher' | 'Staff'
  section: string
  className: string
  subjects: string
  qualification: string
  experience: string
  openings: string
  deadline: string
  requirements: string
  status: 'Open' | 'Closed'
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

const blankVacancy: Omit<Vacancy, 'id'> = {
  title: '', type: 'Teacher', section: 'Primary', className: '', subjects: '',
  qualification: '', experience: '', openings: '1', deadline: '', requirements: '', status: 'Open',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults)
  const [saved, setSaved] = useState(false)
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [vacancy, setVacancy] = useState(blankVacancy)
  const [vacancySaved, setVacancySaved] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('gb-school-settings')
    if (stored) {
      try { setSettings({ ...defaults, ...JSON.parse(stored) }) } catch { /* use defaults */ }
    }
    const storedVacancies = window.localStorage.getItem('gb-school-vacancies')
    if (storedVacancies) {
      try { setVacancies(JSON.parse(storedVacancies)) } catch { /* use defaults */ }
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

  const updateVacancy = (key: keyof typeof blankVacancy, value: string) => {
    setVacancy((current) => ({ ...current, [key]: value }))
    setVacancySaved(false)
  }

  const saveVacancy = () => {
    if (!vacancy.title.trim()) return
    const next: Vacancy = { ...vacancy, id: `vac-${Date.now()}` }
    const updated = [next, ...vacancies]
    setVacancies(updated)
    window.localStorage.setItem('gb-school-vacancies', JSON.stringify(updated))
    setVacancy(blankVacancy)
    setVacancySaved(true)
  }

  const toggleVacancy = (id: string) => {
    const updated = vacancies.map((item) => item.id === id ? { ...item, status: item.status === 'Open' ? 'Closed' : 'Open' } : item)
    setVacancies(updated)
    window.localStorage.setItem('gb-school-vacancies', JSON.stringify(updated))
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <p className="eyebrow">OWNER / ADMIN</p>
        <h1>School Settings</h1>
        <p className="muted">Keep the school identity, academic setup and admissions/recruitment controls in one clean place.</p>

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

          <details className="card settings-section">
            <summary>Admissions & Recruitment <span>Control openings and define requirements</span></summary>
            <div className="settings-subsection">
              <h3>Create a vacancy or admission opening</h3>
              <p className="muted">Applications stay pending until the owner reviews and approves them. Creating an opening does not create a student, teacher or staff account.</p>
              <div className="form-grid">
                <label>Opening title<input aria-label="Opening title" placeholder="e.g. Primary 4 Admission / Primary Mathematics Teacher" value={vacancy.title} onChange={(e) => updateVacancy('title', e.target.value)} /></label>
                <label>Type<select aria-label="Opening type" value={vacancy.type} onChange={(e) => updateVacancy('type', e.target.value)}><option>Student Admission</option><option>Teacher</option><option>Staff</option></select></label>
                <label>Section<select aria-label="Opening section" value={vacancy.section} onChange={(e) => updateVacancy('section', e.target.value)}>{sectionOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label>Class (for admission)<input aria-label="Class" placeholder="e.g. Primary 4" value={vacancy.className} onChange={(e) => updateVacancy('className', e.target.value)} /></label>
                <label>Subjects (for teacher)<input aria-label="Subjects" placeholder="e.g. Mathematics, Basic Science" value={vacancy.subjects} onChange={(e) => updateVacancy('subjects', e.target.value)} /></label>
                <label>Required qualification<input aria-label="Required qualification" placeholder="e.g. NCE, B.Ed" value={vacancy.qualification} onChange={(e) => updateVacancy('qualification', e.target.value)} /></label>
                <label>Experience<input aria-label="Experience" placeholder="e.g. 2 years" value={vacancy.experience} onChange={(e) => updateVacancy('experience', e.target.value)} /></label>
                <label>Number of openings<input aria-label="Number of openings" type="number" min="1" value={vacancy.openings} onChange={(e) => updateVacancy('openings', e.target.value)} /></label>
                <label>Application deadline<input aria-label="Application deadline" type="date" value={vacancy.deadline} onChange={(e) => updateVacancy('deadline', e.target.value)} /></label>
                <label>Opening status<select aria-label="Opening status" value={vacancy.status} onChange={(e) => updateVacancy('status', e.target.value)}><option>Open</option><option>Closed</option></select></label>
                <label className="form-wide">Additional requirements<textarea aria-label="Additional requirements" rows={4} placeholder="Documents, age range, interview requirements, or other conditions" value={vacancy.requirements} onChange={(e) => updateVacancy('requirements', e.target.value)} /></label>
              </div>
              <div className="settings-actions">
                <button className="btn primary" onClick={saveVacancy} disabled={!vacancy.title.trim()}>Add opening</button>
                {vacancySaved && <span className="save-message">Opening added</span>}
              </div>

              <div className="vacancy-list">
                <div className="vacancy-list-header"><h3>Current openings</h3><span className="pill">{vacancies.filter((item) => item.status === 'Open').length} open</span></div>
                {vacancies.length === 0 ? <p className="muted">No openings yet. Create one above.</p> : vacancies.map((item) => (
                  <div className="vacancy-row" key={item.id}>
                    <div><strong>{item.title}</strong><p className="muted">{item.type} · {item.section}{item.className ? ` · ${item.className}` : ''}{item.subjects ? ` · ${item.subjects}` : ''}</p></div>
                    <div className="vacancy-meta"><span className="pill">{item.status}</span><button className="btn secondary" onClick={() => toggleVacancy(item.id)}>{item.status === 'Open' ? 'Close' : 'Reopen'}</button></div>
                  </div>
                ))}
              </div>
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
