<div align="center">

# 🌟 Northstar Tutoring Center

**A modern, accessible, high-performance multipage tutoring platform for school students (Grades 1–12).**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Zero Build Step](https://img.shields.io/badge/Zero_Build_Step-100%25_Vanilla-2ea44f?style=for-the-badge)](#-quick-start)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_AA/AAA-green?style=for-the-badge)](#-accessibility--standards)
[![Dark Mode](https://img.shields.io/badge/Theme-Light_%26_Dark-2f4b36?style=for-the-badge)](#-design-system--css-architecture)

<p align="center">
  <a href="#-quick-start">⚡ Quick Start</a> •
  <a href="#-key-highlights--features">✨ Key Features</a> •
  <a href="#-complete-page-directory">📑 Page Directory</a> •
  <a href="#-interactive-systems-deep-dive">🧠 Interactive Systems</a> •
  <a href="#-design-system--css-architecture">🎨 Design System</a> •
  <a href="#-changelog">📜 Changelog</a>
</p>

---

</div>

## 📖 Overview

**Northstar Tutoring** is a multi-page web platform engineered for K-12 tutoring centers, academies, and educational institutions. Built with pure vanilla web technologies (HTML5, modern CSS variables, and ES6 JavaScript), it requires zero compilation, node dependencies, or bundlers while delivering a lightning-fast, highly responsive user experience.

---

## ⚡ Quick Start

Launch the website immediately in any browser without needing to install packages or configure build pipelines.

```bash
# Option 1: Python static server (Recommended)
python3 -m http.server 8080

# Option 2: Node npx serve
npx serve .

# Option 3: PHP built-in server
php -S localhost:8080
```

> Open your browser and navigate to **`http://localhost:8080`** (or double-click `index.html` to open directly).

---

## ✨ Key Highlights & Features

| Category | Capability | Details |
| :--- | :--- | :--- |
| 🌓 **Theming** | **Zero-FOUC Dark/Light Mode** | System preference detection, instant CSS custom property switching, `localStorage` state persistence. |
| 🌐 **Localization** | **Bi-Directional RTL Support** | Seamless Right-to-Left layout mirroring with typography adjustments and direction persistence. |
| 🎯 **Course Filtration** | **Deep-Link Grade Filter** | Instant filter by Elementary (1–5), Middle (6–8), High (9–10), and Senior (11–12) with URL param (`?grade=...`) auto-sync and smooth scroll. |
| 🔍 **Interactive Finder** | **Course Recommendation Engine** | Filter by grade level, subject, and format with interactive cards and one-click enrollment prefill. |
| 📊 **Student Dashboard** | **Full Portal Experience** | Live class schedule, interactive attendance calendar with month navigation, downloadable study notes, and score analytics. |
| 🛡️ **Forms & A11y** | **Client-Side Validation** | Accessible live field validation, password match checker, keyboard-trapped mobile drawer, and WCAG AA contrast. |
| ⚡ **Performance** | **Ultra-Lightweight & Fast** | 13 optimized WebP images, system font stacks, zero heavy runtime frameworks, and 60fps animations. |

---

## 📑 Complete Page Directory

```
├── 📄 index.html                  # Editorial Home 1 (Curriculum, methodology, metrics ticker, testimonials)
├── 📄 index1.html                 # Alternate Home 2 (Interactive course finder, feature highlights)
└── 📁 pages/
    ├── 📚 courses.html            # Subject breakdown, grade matrix & deep-linked interactive filter
    ├── 🛠️ services.html           # Small-group, 1-to-1 coaching, exam prep & study clinics
    ├── 👨‍🏫 tutors.html             # Educator credentials, specializations & faculty standards
    ├── 🏷️ fees.html               # Transparent pricing tiers, tuition comparison & accordion FAQ
    ├── 🏆 results.html            # Student performance data, top score profiles & progress charts
    ├── 📝 blog.html               # Student learning journal & exam revision strategy articles
    ├── 📬 contact.html            # Validated diagnostic booking form, center info & location map
    ├── 💻 dashboard.html          # Student portal: timetable, interactive calendar, study notes & tests
    ├── 🔐 signin.html             # Accessible student login form with live error states
    ├── ✍️ signup.html             # New student registration with grade level & subject selection
    ├── ⏳ coming-soon.html        # Interactive countdown & notify-me launch page
    ├── 🚫 404.html                # Custom error page with quick-navigation recovery links
    ├── 🔒 privacy.html            # Data protection & privacy policy
    └── 📜 terms.html              # Terms of service and tutoring enrollment policies
```

---

## 🧠 Interactive Systems Deep Dive

### 1. 🎓 Grade-Wise Course Filtering (`courses.html`)
- **Direct & URL Auto-Filtering**: Access grade-specific curriculums directly from the home page cards via `courses.html?grade=elementary#course-detail`, `?grade=middle`, `?grade=high`, or `?grade=senior`.
- **Fluid Layout Transitions**: Smooth card transitions when toggling filters between Elementary (1–5), Middle School (6–8), High School (9–10), and Senior School (11–12).
- **Exact Subject Matching**: 16 dedicated course modules across Mathematics, Science, English, and Social Studies.

### 2. 📅 Interactive Attendance Calendar (`dashboard.html`)
- **Full Month Navigation**: Dynamically cycle through previous and next months with dynamic day numbering.
- **Interactive Day Status**: Click on any date to inspect session attendance records, test dates, and planned reviews.

### 3. 📥 Downloadable Study Notes & Toast System (`dashboard.html`)
- **Direct Text Downloads**: Download formatted summary notes (`.txt`) for Mathematics, Physics, Chemistry, and English literature.
- **Toast Notifications**: Interactive toast alerts confirming download status and action feedbacks.

### 4. 🔍 Interactive Course Finder (`index1.html`)
- **Instant Recommendations**: Select grade stage, target subject, and learning format (Small Group / 1-on-1 / Online) to generate an immediate course pathway.
- **Form Auto-Prefill**: Links directly to `contact.html` with selected parameters pre-populated in the diagnostic booking form.

---

## 🎨 Design System & CSS Architecture

### Primary Palette

| Color Name | Token | HEX (Light Mode) | HEX (Dark Mode) | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Forest Green** | `--green` | `#2f4b36` | `#58a06e` | Primary brand, CTA buttons, active states |
| **Forest Sage** | `--green-dark` | `#223828` | `#3d704d` | Accent hover states, headers |
| **Warm Page** | `--page` | `#fbf8f2` | `#111613` | Canvas background |
| **Clean Surface** | `--surface` | `#ffffff` | `#18211b` | Cards, modals, containers |
| **Deep Ink** | `--ink` | `#1a231d` | `#f0f5f1` | Primary typography |
| **Muted Slate** | `--muted` | `#59665c` | `#9eb1a3` | Secondary text, meta info |
| **Soft Line** | `--line` | `#e4dfd5` | `#2a382e` | Borders, subtle dividers |

### Typography Stack
- **Editorial Heading Stack**: `"Iowan Old Style", "Apple Garamond", "Baskerville", "Times New Roman", "Droid Serif", "Times", "Source Serif Pro", serif`
- **Body & Interface Stack**: `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- **Monospace Metrics Stack**: `ui-monospace, "SF Mono", "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace`

---

## 📁 Repository Structure

```
.
├── assets/
│   ├── css/
│   │   ├── style.css          # Core design tokens, typography, grid & layout rules
│   │   ├── dark-mode.css      # Dark theme overrides & color inversions
│   │   └── rtl.css            # Bi-directional right-to-left layout adjustments
│   ├── js/
│   │   ├── main.js            # Global logic: theme, navigation, filters, validation, parallax
│   │   └── dashboard.js       # Student portal: timetable, calendar & test evaluations
│   └── images/                # 13 optimized WebP photographs & educational assets
├── pages/                     # 12 distinct multi-page subpages
├── index.html                 # Main Homepage (Editorial)
├── index1.html                # Alternate Homepage (Interactive Finder)
├── favicon.ico                # Northstar brand favicon
├── robots.txt                 # Search engine crawler configuration
└── README.md                  # Comprehensive project documentation
```

---

## ♿ Accessibility & Standards

- **Semantic Landmark HTML**: Clean usage of `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- **ARIA Compliant**: Proper `aria-expanded`, `aria-pressed`, `aria-label`, and `aria-hidden` attributes on all dynamic toggles.
- **Keyboard Friendly**: Skip-to-content links, visible `:focus-visible` outlines, focus trapping in mobile navigation drawers, and Escape key dismissal.
- **Color Contrast**: 100% compliant with **WCAG 2.1 Level AA and AAA** color contrast ratios across light and dark modes.
- **Motion Accessibility**: Full support for `prefers-reduced-motion: reduce` across all CSS transitions and JavaScript parallax listeners.

---

## 📜 Changelog

### 🚀 Version 1.2.0 — *September 2026*
- **Connected Homepage to Grade Filters**: "View details" buttons on Homepage 1 now deep-link directly with automatic filtering and smooth scrolling.
- **Dedicated Grade Courses Breakdown**: Added 16 curriculum cards in `courses.html` covering Elementary, Middle School, High School, and Senior School.
- **Deep-Link Auto-Filtering**: Enhanced `setupCourseFilter` to read URL search parameters (`?grade=...`) and hash anchors with smooth viewport navigation.
- **Refined Card Transitions**: Polished fluid entry animations on grade selection.

### 📦 Version 1.1.0 — *August 2026*
- **Comprehensive UI/UX Polish**: Upgraded styling across all 14 HTML pages.
- **Interactive Student Portal**: Added interactive attendance month navigator, downloadable notes, and toast notifications.
- **Zero-FOUC Theme & RTL Engine**: Implemented fast theme/RTL preference loader in `<head>`.

### 🐣 Version 1.0.0 — *August 2026*
- Initial release with complete multi-page architecture.

---

## 🤝 Credits & Acknowledgements

- **Icons**: [Lucide Icons](https://lucide.dev) (ISC License)
- **Imagery**: Custom educational visuals formatted in optimized WebP.
- **Architecture**: Hand-crafted with modern Vanilla HTML5/CSS3/ES6.

<div align="center">

---

**© 2026 Northstar Tutoring. Crafted for Academic Excellence.**

</div>
