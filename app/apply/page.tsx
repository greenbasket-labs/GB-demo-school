'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'

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

type Application = {
  id: string
  vacancyId: string
  openingTitle: string
  type: Vacancy['type']
  applicantName: string
  phone: string
  email: string
  dateOfBirth: string
  gender: string
  address: string
  guardianName: string
  previousSchool: string
  className: string
  qualification: string
  experience: string
  subjects: string
  documents: string
  notes: string
  submittedAt: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

const blank = {
  vacancyId: '', applicantName: '', phone: '', email: '', dateOfBirth: '', gender: '', address: '',
  guardianName: '', previousSchool: '', className: '', qualification: '', experience: '', subjects: '',
  documents: '', notes: '',
}

export default function ApplyPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [form, setForm] = useState(blank)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('gb-school-vacancies')
    if (stored) {
      try {
        const open = (JSON.parse(stored) as Vacancy[]).filter((item) => item.status === 'Open')
        setVacancies(open)
        if (open[0]) setForm((current) => ({ ...current, vacancyId: open[0].id }))
      } catch { /* keep empty */ }
    }
  }, [])

  const selected = vacancies.find((item) => item.id === form.vacancyId)
  const update = (key: keyof typeof blank, value: string) => setForm((current) => ({ ...current, [key]: value }))

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!selected || !form.applicantName.trim() || !form.phone.trim()) return

    const application: Application = {
      ...form,
      id: `app-${Date.now()}`,
      openingTitle: selected.title,
      type: selected.type,
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    }
    const stored = window.localStorage.getItem('gb-school-applications')
    let applications: Application[] = []
    if (stored) {
      try { applications = JSON.parse(stored) } catch { /* start fresh */ }
    }
    window.localStorage.setItem('gb-school-applications', JSON.stringify([application, ...applications]))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="application-page">
        <div className="application-card card success-card">
          <p className="eyebrow">APPLICATION RECEIVED</p>
          <h1>Thank you for applying.</h1>
          <p className="muted">Your application for <strong>{selected?.title}</strong> has been submitted for owner review.</p>
          <span className="pill">Pending review</span>
          <p className="muted application-note">This application does not create a student, teacher or staff account. The school must review and approve it first.</p>
          <Link className="btn secondary" href="/">Return home</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="application-page">
      <div className="application-card card">
        <div className="topline">
          <div>
            <p className="eyebrow">GREEN BASKET SCHOOL</p>
            <h1>Application Form</h1>
            <p className="muted">Apply for an open admission, teaching or staff opportunity.</p>
          </div>
          <Link className="btn secondary" href="/">Home</Link>
        </div>

        {vacancies.length === 0 ? (
          <div className="empty-state">
            <h3>No openings are currently available.</h3>
            <p className="muted">Please check again when the school publishes a new opening.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div className="form-grid application-form-grid">
              <label>Opening<select aria-label="Opening" value={form.vacancyId} onChange={(e) => update('vacancyId', e.target.value)}>{vacancies.map((item) => <option key={item.id} value={item.id}>{item.title} — {item.type}</option>)}</select></label>
              <label>Applicant full name<input required aria-label="Applicant full name" value={form.applicantName} onChange={(e) => update('applicantName', e.target.value)} /></label>
              <label>Phone number<input required aria-label="Phone number" value={form.phone} onChange={(e) => update('phone', e.target.value)} /></label>
              <label>Email<input aria-label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} /></label>
              <label>Date of birth<input aria-label="Date of birth" type="date" value={form.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} /></label>
              <label>Gender<select aria-label="Gender" value={form.gender} onChange={(e) => update('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option></select></label>
              <label className="form-wide">Address<textarea aria-label="Address" rows={3} value={form.address} onChange={(e) => update('address', e.target.value)} /></label>
              {selected?.type === 'Student Admission' && <>
                <label>Parent / guardian name<input aria-label="Parent guardian name" value={form.guardianName} onChange={(e) => update('guardianName', e.target.value)} /></label>
                <label>Previous school<input aria-label="Previous school" value={form.previousSchool} onChange={(e) => update('previousSchool', e.target.value)} /></label>
                <label>Class applying for<input aria-label="Class applying for" placeholder={selected.className || 'e.g. Primary 4'} value={form.className} onChange={(e) => update('className', e.target.value)} /></label>
              </>}
              {(selected?.type === 'Teacher' || selected?.type === 'Staff') && <>
                <label>Qualification<input aria-label="Qualification" placeholder={selected.qualification || 'e.g. NCE, B.Ed'} value={form.qualification} onChange={(e) => update('qualification', e.target.value)} /></label>
                <label>Experience<input aria-label="Experience" placeholder={selected.experience || 'e.g. 2 years'} value={form.experience} onChange={(e) => update('experience', e.target.value)} /></label>
                {selected.type === 'Teacher' && <label>Subjects<input aria-label="Subjects" placeholder={selected.subjects || 'e.g. Mathematics'} value={form.subjects} onChange={(e) => update('subjects', e.target.value)} /></label>}
              </>}
              <label className="form-wide">Documents / credentials<textarea aria-label="Documents credentials" rows={3} placeholder="List certificates, results, references or other documents you will provide." value={form.documents} onChange={(e) => update('documents', e.target.value)} /></label>
              <label className="form-wide">Additional information<textarea aria-label="Additional information" rows={4} value={form.notes} onChange={(e) => update('notes', e.target.value)} /></label>
            </div>
            <div className="application-requirements">
              <strong>Opening requirements</strong>
              <p className="muted">{selected?.requirements || 'No additional requirements were specified.'}</p>
              {selected?.deadline && <p className="muted">Application deadline: {selected.deadline}</p>}
            </div>
            <div className="settings-actions">
              <button className="btn primary" type="submit">Submit application</button>
              <span className="muted">Your application will remain pending until reviewed.</span>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
