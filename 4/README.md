<div align="center">

# 🐾 Pawfolk Pet Shop & Accessories Store

<p align="center">
  <strong>A modern, handcrafted, framework-free multipage pet boutique & care website template.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Responsive-Mobile_&_Tablet-1f79c6?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Responsive" />
  <img src="https://img.shields.io/badge/Direction-LTR_%26_RTL-orange?style=for-the-badge" alt="LTR & RTL" />
  <img src="https://img.shields.io/badge/Theme-Dark_%26_Light-17221C?style=for-the-badge" alt="Dark and Light" />
</p>

---

[✨ Features](#-key-features) • [🚀 Quick Start](#-quick-start) • [📄 Page Showcase](#-page-directory) • [🎨 Design System](#-design-system--palette) • [📁 Directory Structure](#-project-structure) • [🛠️ Customization](#-customization--checklist)

---

</div>

## 🌟 Overview

**Pawfolk** is a playful, high-character website template created for independent pet boutiques, grooming salons, and organic pet food suppliers. It features bold editorial poster typography, tactile button interactions, rich anthropomorphic artwork, smooth scroll reveals, and full **Dark Mode** and **RTL (Right-to-Left)** language support.

Built with **vanilla HTML5, CSS3, and JavaScript** — zero build tools, node dependencies, or complex frameworks required.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📱 **Fully Responsive** | Fluid breakpoints for Mobile (`<=540px`, `<=620px`), Tablet (`<=768px`, `<=1100px`), and Desktop (`1100px+`). |
| 🌐 **RTL & LTR Support** | 1-click text direction toggle with mirrored layouts, drawer transforms, and `localStorage` persistence. |
| 🌙 **Light & Dark Theme** | Instant theme switcher with system preference detection (`prefers-color-scheme`) and smooth transitions. |
| 🛒 **Interactive Demo Cart** | Slide-out cart drawer, item count badge, subtotal calculations, and item removals synced via `localStorage`. |
| 🎨 **Tactile Design Language** | Neo-brutalist hard drop shadows, playful hover animations, floating character blobs, and animated marquee ribbons. |
| ♿ **Accessibility First** | Semantic landmarks (`<header>`, `<main>`, `<nav>`), skip-to-content links, ARIA attributes, and `prefers-reduced-motion` compliance. |
| 🔍 **Live Shop Filtering** | Category filtering (Dogs, Cats, Birds, Small Pets), search input, and dynamic sorting by price & popularity. |
| 📝 **Form Validation** | Client-side validated forms with accessible live error feedback and confirmation toast notifications. |

---

## 🚀 Quick Start

No package manager or compilation step needed!

### Option 1: Direct File
Simply double-click [`index.html`](index.html) to open the site directly in any web browser.

### Option 2: Local HTTP Server (Recommended)
Run a lightweight server using Python or Node:

```bash
# Using Python 3
python3 -m http.server 8000

# Or using Node / npx
npx serve .
```

Then visit [`http://localhost:8000`](http://localhost:8000) in your browser.

---

## 📄 Page Directory

```
├── 🏠 Home Pages
│   ├── index.html               # Home 1 — Product-forward editorial storefront & hero showcase
│   └── index1.html              # Home 2 — "Curious Creature Club" community & story layout
│
├── 🛍️ Shop & Services
│   ├── pages/shop.html          # Product catalog with category filter, search, & demo cart
│   ├── pages/grooming.html      # Spa packages, grooming pricing, & appointment request form
│   ├── pages/services.html      # General store services overview & amenities
│   └── pages/brands.html        # Ethical maker directory & shelf ingredient standards
│
├── 📖 Content & Story
│   ├── pages/about.html         # Brand story, mission, and community rescue initiatives
│   ├── pages/blog.html          # Pet wellness journal, training tips, & nutrition guides
│   └── pages/contact.html       # Store location, opening hours, interactive map card, & FAQ
│
├── 🔐 Account & Auth
│   ├── pages/signin.html        # Clean customer login with RTL/Theme toggle bar
│   └── pages/signup.html        # Customer registration with pet profile inputs
│
└── ⚙️ System & Legal
    ├── pages/404.html           # Playful "Lost Scent" 404 error page
    ├── pages/coming-soon.html   # Under construction teaser with newsletter subscribe
    ├── pages/privacy.html       # Privacy Policy template
    └── pages/terms.html         # Terms of Service template
```

---

## 🎨 Design System & Palette

Pawfolk is designed around a curated, disciplined color palette that remains cohesive in both Light and Dark themes:

<div align="center">

| Color | Hex Token | CSS Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Warm Cream** | `#FFF7E8` | `--cream` | Base canvas background, badge surface, and light text |
| **Deep Forest Ink** | `#17221C` | `--dark` / `--ink` | Primary typography, borders, hard offset drop-shadows |
| **Cobalt Blue** | `#1F79C6` | `--blue` | Primary buttons, active highlights, icons, and focus rings |
| **Sunny Mustard** | `#F3B23F` | `--mustard` | Accent banners, secondary tags, and badge highlights |
| **Playful Coral** | `#EB6A53` | `--coral` | Secondary card highlights and mascot backdrops |
| **Fresh Mint** | `#84D4A8` | `--mint` | Category tags and organic indicator badges |

</div>

---

## 📁 Project Structure

```text
├── assets/
│   ├── css/
│   │   ├── style.css            # Primary core styles, tokens, typography, and responsive rules
│   │   ├── dark-mode.css        # High-contrast dark theme token overrides & component rules
│   │   └── rtl.css              # Bidirectional mirroring, drawer flips, and RTL alignments
│   ├── js/
│   │   └── main.js              # Theme switcher, RTL handler, cart drawer, toast, and nav logic
│   └── images/                  # High-res WebP & PNG character artwork and product graphics
├── documentation/
│   └── README.md                # Technical developer documentation, API guide, and credits
├── pages/                       # Sub-pages and auth layouts
├── index.html                   # Primary storefront homepage
├── index1.html                  # Secondary community homepage
└── README.md                    # Project overview & documentation
```

---

## 🛠️ Customization & Checklist

Before deploying Pawfolk to production, make sure to:

1. **Update Business Info**:
   - Search & replace `Pawfolk`, `24 Tailwag Lane`, `Portland, OR`, phone numbers, and `.example` email addresses.
   - Update the **Schema.org** JSON-LD structured data in `<head>` of [`index.html`](index.html).
2. **Hook Up Form Backends**:
   - Connect appointment requests on [`pages/grooming.html`](pages/grooming.html), newsletter subscriptions, and contact messages to your backend API or Formspree/EmailJS.
3. **Cart & Commerce Integration**:
   - Replace the demo client-side bag with Shopify Buy Button, Snipcart, Stripe Checkout, or your WooCommerce API.
4. **Font Awesome CDN / CSP**:
   - Font Awesome Free 6.7.2 is referenced via CDN. Self-host if required by your Content Security Policy (CSP).

---

## 📋 Browser & Device Support

- **Browsers**: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+, Opera, iOS Safari, Android Chrome.
- **Viewports**: 320px up to 4K ultra-wide screens.
- **Accessibility**: Keyboard navigable (`Tab`/`Shift+Tab`), ARIA expanded states, readable color contrasts, and screen-reader tested landmarks.

---

<div align="center">

Made with 🐾 for pet lovers everywhere.

</div>
