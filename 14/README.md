<div align="center">

# 📦 MoveMate — Home Shifting & Packing Service

### Modern, High-Performance Multi-Page Website & Moving Management Portal

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Dark Mode](https://img.shields.io/badge/Dark%20Mode-Supported-075fd7?style=for-the-badge&logo=ghostery&logoColor=white)](#)
[![RTL Ready](https://img.shields.io/badge/RTL%20Layout-Supported-10b981?style=for-the-badge)](#)
[![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero%20Build-8b5cf6?style=for-the-badge)](#)
[![Accessibility](https://img.shields.io/badge/WCAG-2.1%20AA%20Compliant-3b82f6?style=for-the-badge)](#)

<br/>

<p align="center">
  <strong>MoveMate</strong> is a production-ready, ultra-fast static multi-page web platform designed for professional relocation, logistics, and packing services. Engineered with zero external runtime dependencies, full dark mode, bidirectional RTL support, accessible semantic HTML5, and rich interactive features.
</p>

</div>

---

## 🌟 Key Highlights & Features

| Feature | Description |
| :--- | :--- |
| ⚡ **Zero Build Step** | Works out-of-the-box via `file://` or any static HTTP server. No Node, React, Vite, or bundlers needed. |
| 🎨 **Dual Theme Engine** | Instant seamless toggle between Light Mode and Dark Mode with auto-persistence in `localStorage`. |
| 🌐 **Complete RTL Support** | Built-in Right-to-Left (RTL) layout switcher with tailored flipped grid, mirrored icons, and navigation. |
| 🧮 **Instant Price Calculator** | Dynamic shifting cost estimator based on move type, apartment size, distance, and custom add-on services. |
| 📍 **Smart Route Finder** | Live route & distance computation, instant vehicle dispatch estimation, and Indian city autocomplete. |
| 📊 **Customer Dashboard** | Interactive customer management panel with booking timeline, GPS tracker, and status cards. |
| 🧾 **Digital Invoice Generator** | Live client-side GST-compliant downloadable text invoice (`.txt`) with custom breakdown. |
| 🔐 **Complete Auth Demo** | Fully validated Sign In, Sign Up, and dedicated Password Recovery (`forgot-password.html`) flows. |
| ♿ **Accessibility First** | ARIA landmarks, live validation error regions, skip-to-content links, and WCAG AA contrast compliance. |
| 🖼️ **Optimized Artwork** | Modern responsive `<picture>` tags with lightweight WebP formats and PNG fallbacks. |

---

## 🧭 Page Catalog & Navigation

```
├── 🏠 Homepages
│   ├── index.html                   ── Standard Marketing Landing Page (Hero, Trust, Services, Process, Testimonials)
│   └── index1.html                  ── Express Relocation & Instant Estimator Homepage
│
├── 🚚 Core Relocation Pages
│   ├── pages/services.html          ── Comprehensive Moving Catalog (Local, Intercity, Office, Packing)
│   ├── pages/pricing.html           ── Interactive Instant Pricing Calculator & Tier Comparison
│   ├── pages/how-it-works.html      ── Visual 6-Step Customer Moving Journey & Safety Guarantees
│   └── pages/service-areas.html     ── Interactive India Map & Tier-1/2/3 Regional Coverage Browser
│
├── 👤 Customer Portal & Authentication
│   ├── pages/dashboard.html         ── Live Moving Dashboard, Tracking, Invoices & Settings
│   ├── pages/signin.html            ── Accessible Customer Login Page
│   ├── pages/signup.html            ── Customer Account Registration Form
│   └── pages/forgot-password.html   ── Account Security & Password Recovery Flow
│
├── 🏢 Company & Support
│   ├── pages/about.html             ── Company Story, Quality Principles, Leadership & Impact Stats
│   └── pages/contact.html           ── Inquiry Form, Branch Coordinates, Direct Support & FAQ Accordion
│
└── ⚖️ Legal & Utility
    ├── pages/privacy.html           ── Data Protection & Privacy Rights
    ├── pages/terms.html             ── Relocation Terms of Service & Service Level Agreement
    ├── pages/coming-soon.html       ── Feature Under Construction Utility Page
    └── pages/404.html               ── Error Page with Helpful Navigation Return
```

---

## 🚀 Quick Start & Installation

### Option 1: Direct File Access (No Server Required)
Simply double-click `index.html` or open any file in your favorite web browser (Chrome, Firefox, Safari, Edge).

### Option 2: Local Static Server (Recommended)
For testing full asset loading, run any of the following lightweight commands in the project root:

#### Python 3:
```bash
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

#### Node.js / NPX:
```bash
npx serve .
# Or: npx http-server -p 8000
```

#### PHP:
```bash
php -S localhost:8000
```

---

## 🛠️ Technology Stack & Architecture

```
MoveMate/
├── index.html                       # Primary Landing Page
├── index1.html                      # Alternative Express Landing Page
├── assets/
│   ├── css/
│   │   ├── style.css                # Core Design Tokens, Typography, Layouts & Components (4,000+ lines)
│   │   ├── dark-mode.css            # Dark Theme Color Variables & Component Overrides
│   │   └── rtl.css                  # Right-to-Left (RTL) Layout Flips & Icon Alignments
│   ├── js/
│   │   ├── main.js                  # Global Nav, Header/Footer Injection, Modals, Forms & Theme Engine
│   │   └── dashboard.js             # Pricing Engine, Authentication, Dashboard Tabs & Invoice Generator
│   └── images/
│       ├── favicon.svg              # MoveMate SVG Brand Icon
│       ├── *.webp                   # Modern WebP compressed illustrations
│       └── *.png                    # High-resolution PNG fallbacks
└── pages/                           # Subpages directory
```

---

## 🎨 Customization Guide

### 1. Design Tokens & Branding
Global CSS custom properties are located at the top of [`assets/css/style.css`](assets/css/style.css):

```css
:root {
  --brand: #075fd7;         /* Primary brand accent */
  --brand-dark: #0548a3;    /* Deep hover blue */
  --brand-light: #eaf3ff;   /* Soft background tint */
  --navy: #062344;          /* Heading and primary dark shade */
  --text: #334155;          /* Body copy text color */
  --surface: #ffffff;       /* Card and modal backgrounds */
  --radius: 16px;           /* Standard card corner radius */
  --font-sans: system-ui, -apple-system, sans-serif;
}
```

### 2. Dark Mode Palette
Modify dark theme colors in [`assets/css/dark-mode.css`](assets/css/dark-mode.css) under `html[data-theme="dark"]`.

### 3. Dynamic Header & Footer
The site header and footer are rendered dynamically via [`assets/js/main.js`](assets/js/main.js). Modifying navigation links or contact information in `main.js` automatically updates all 15 pages across the entire website.

---

## ♿ Accessibility & Performance Standards

- **Semantic Landmarks**: Strict `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` tagging.
- **Keyboard Friendly**: Skip-to-content links on every page, visible focus rings (`:focus-visible`), and accessible modal traps.
- **Accessible Forms**: `aria-live="polite"` feedback containers, live client-side validation, and accessible labels.
- **Optimized Performance**: Zero third-party trackers or heavy JavaScript libraries. Core bundle loads in under 100ms.
- **Reduced Motion**: Full support for `@media (prefers-reduced-motion: reduce)`.

---

## 📄 License & Credits

- **License**: Provided under the [MIT License](LICENSE).
- **Artwork**: Generated original MoveMate vectors and illustrations optimized for high-density displays.
- **Icons**: Inline scalable SVG icon set (No external icon font CDNs required).

---

<div align="center">
  <sub>MoveMate • We Move With Care • Designed & Built with Modern Vanilla Web Technologies</sub>
</div>
