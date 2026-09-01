# Northstar Tutoring Website

A complete, highly responsive, multipage tutoring-center website built with modern HTML5, CSS3, and vanilla ES6 JavaScript only.

## Quick start

Open `index.html` directly in your browser, or run a simple static server from the project folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

No package installation, compilation, or build step is required.

## Included pages

- `index.html` — Primary editorial home page with curriculum overview, results ticker, methodology, and testimonials
- `index1.html` — Alternate home page with interactive course finder and faculty promise
- `pages/courses.html` — Grade-wise curriculum comparison matrix, interactive course filtering, and subject details
- `pages/services.html` — Tutoring formats: small-group, one-to-one coaching, exam revision, and study skills
- `pages/tutors.html` — Faculty profiles, credentials, subject specializations, and teaching standards
- `pages/fees.html` — Transparent monthly plans, tuition breakdown, and accessible accordion FAQ
- `pages/results.html` — Academic achievement statistics, top student score cards, and subject progress charts
- `pages/blog.html` — Study journal with structured student revision guides
- `pages/contact.html` — Validated diagnostic booking form, neighborhood center details, and animated map
- `pages/dashboard.html` — Comprehensive student portal with timetable, interactive attendance calendar, study notes downloads, and test score reports
- `pages/signin.html` & `signup.html` — Accessible authentication forms with real-time field validation and dashboard redirection
- `pages/privacy.html`, `terms.html`, `404.html`, `coming-soon.html` — Complete utility and legal pages

## Features

- **Mobile-first responsive architecture**: Fluid layouts tailored for 320px, 480px, 640px, 768px, 900px, 1024px, 1180px, and 1440px+ viewports
- **Light & Dark Theme**: Zero-FOUC theme switching with system preference detection and localStorage persistence
- **Full Bi-directional RTL Support**: Complete right-to-left layout mirroring and direction persistence
- **Accessible Mobile Navigation Drawer**: Smooth slide-down drawer with backdrop blur, focus trapping, and Escape key closing
- **Interactive Course Filter**: Real-time filtering by grade level on the courses page
- **Interactive Course Finder**: Instant subject and format recommendations
- **Student Dashboard Portal**:
  - Live weekly timetable and schedule tracking
  - Dynamic attendance calendar with month navigation (Prev / Next) and interactive day feedback
  - Formatted study notes downloads (`.txt`) for all subjects with toast notifications
  - Filterable test schedule and faculty-posted score evaluations
- **Client-side Form Validation**: Real-time field validation with accessible inline error indicators and password matching
- **Smooth Micro-interactions**: Scroll reveals, staggered card entries, animated number counters, accordion transitions, and subtle hero parallax
- **Thirteen original, optimized WebP image assets**
- **SEO & Social Metadata**: Semantic titles, meta descriptions, and OpenGraph-ready landmarks

## Customization

Core design tokens are defined at the top of `assets/css/style.css`. Dark-mode overrides live in `assets/css/dark-mode.css`, and RTL behavior lives in `assets/css/rtl.css`.

Replace center details, course data, fees, tutor biographies, results, and dashboard demo data directly in the HTML files. For production, connect forms and authentication to secure server-side services.

## Credits and license notes

- Original project imagery: generated specifically for this site with OpenAI ImageGen.
- Icons: [Lucide](https://lucide.dev), ISC License, loaded through unpkg.
- Typography: modern system font stacks for zero external network dependency and instant font loading.

## Changelog

### 1.1.0 — 2026-08-28

- Comprehensive UI/UX & design polish across all 18 HTML pages.
- Added interactive grade-wise course filtering on `pages/courses.html`.
- Enhanced interactive attendance calendar with month navigation and day status feedback on `pages/dashboard.html`.
- Added downloadable study notes with live toast notification system.
- Added blurred navigation backdrop with mobile tap-to-close behavior.
- Added custom theme-matched scrollbar.
- Verified WCAG AA/AAA contrast compliance across light and dark modes.
- Unified header navigation and footer structures across all pages.

### 1.0.0 — 2026-08-28

- Initial release.

## Support

Use the website contact page for any questions or customization support.
