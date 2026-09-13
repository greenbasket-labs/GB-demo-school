# Green Basket Demo School

A clean, realistic marketing demo for **Green Basket Global's private-school management system**.

## Live demo flow

Visitors can enter directly from the landing page or use the demo access screen.

**Dashboard → Students → Classes → Attendance → Fees & Payments → Results → Reports → Announcements**

## Demo roles

- **Owner / Admin** — school-wide operations and reporting
- **Accountant / Cashier** — fees, payments and collections
- **Teacher** — classes, attendance and results
- **Parent** — children, fees and academic progress
- **Student** — subjects, attendance and results

Role cards on the landing page link directly into the matching demo dashboard.

## Current demo scope

The demo is intentionally small and polished. It uses realistic Nigerian private-school data and responsive screens to demonstrate the core workflow without pretending to be the full production application.

Included areas:

- Marketing landing page
- Demo role entry
- Role-specific dashboard views
- Role-aware sidebar navigation
- Shared active sidebar navigation
- Mobile-friendly navigation drawer
- Students with realistic admission numbers, classes and profiles
- Classes with realistic class sizes and teachers
- Attendance
- Fees & Payments
- Results
- Reports
- Announcements / notifications
- Parent portal with child selection and quick links to attendance, results and fees

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
