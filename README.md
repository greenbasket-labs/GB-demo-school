# Green Basket Demo School

A clean, realistic marketing demo for **Green Basket Global's private-school management system**.

## Live demo flow

Visitors can enter directly from the landing page or use the demo access screen.

**Dashboard → Students → Classes → Attendance → Fees & Payments → Results → Reports → Announcements**

## Demo roles

- **Owner / Admin** — full school operations, setup, users and oversight
- **Accountant / Cashier** — cashier dashboard, student fee lookup, balances, payments, collections and payment history
- **Teacher** — teaching workspace, classes, students, attendance and results
- **Parent** — linked children only, daily attendance, attendance history, fees, payments, results and announcements
- **Student** — personal profile, class, daily attendance, attendance history, fees, results and announcements

Role cards on the landing page link directly into the matching demo dashboard.

## Current demo scope

The demo is intentionally small and polished. It uses realistic Nigerian private-school data and responsive screens to demonstrate the core workflow without pretending to be the full production application.

Included areas:

- Marketing landing page
- Demo role entry
- Role-specific dashboard views
- Role-aware sidebar navigation
- Mobile-friendly navigation drawer
- Students, classes, attendance, fees, results and reports
- Announcements / notifications
- Owner/Admin staff and teacher view
- Owner/Admin parents and guardians view
- Owner/Admin subjects and academic setup view
- Owner/Admin school settings view
- Owner/Admin users and roles view
- Owner/Admin audit history view
- Cashier dashboard with student search, balances, payment recording, collection methods, outstanding balances and recent payment history
- Teacher workspace with teaching assignments, class/student overview, attendance and results quick links
- Parent portal limited to the parent's linked children, with daily attendance and attendance history
- Student portal limited to the student's own profile, attendance, fees, results and announcements
- School Settings grouped into clean expandable sections for school information, academic setup and school sections
- School Settings fields for school name, logo, motto, address, phone, email, academic session, current term and Nursery/Primary/Junior/Senior section selection

The demo data is intentionally representative rather than connected to a live school database.

The interface uses consistent buttons, form controls, cards, tables, spacing and mobile behavior across the demo.

The sidebar keeps the selected demo role while navigating between modules, so each role sees only the relevant workflow.

## Development workflow

Each feature is implemented, verified through CI, documented here as the scope evolves, committed to `main`, and then the next feature is started.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Source of truth

Production application: `greenbasket-labs/school-management-system`
