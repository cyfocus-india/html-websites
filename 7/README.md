# PLAY ZONE - Kids Play Zone & Indoor Play Area Website

> A modern, multipurpose, multipage **HTML5, CSS3, and Vanilla JavaScript** website template designed specifically for indoor children's playgrounds, soft play centers, and family amusement parks. Faithfully styled after modern geometric Bauhaus playground aesthetics.

---

## 🎨 Reference Design Fidelity & Visual Principles

- **Primary Colors**:
  - Royal Blue: `#0D5BE1` (Primary brand buttons, badges, and accents)
  - Energetic Red: `#E52E2E` (CTAs, highlighted buttons, dots)
  - Sunny Yellow: `#F5B300` (Toddler highlights, badges, geometric shapes)
  - Dark Slate: `#111827` (Headings & crisp typography)
- **Geometric Bauhaus Styling**:
  - Distinctive arch masks, triangular cutouts, circular photo windows, and 9-dot matrices.
  - Large hero arch cutout featuring a happy child sliding down a yellow slide.
  - Play Zones age cards (Baby Zone, Explorer Zone, Adventure Zone, Challenge Zone) each with bespoke geometric framing.
  - Custom vector Bauhaus Birthday Cake and Building Blocks illustrations.

---

## 📁 Technical File Structure

```
7 Kids Play Zone & Indoor Play Area/
├── index.html                  # Home 1 (Reference faithful replica)
├── index1.html                 # Home 2 (Alternative dynamic hero + live slot checker)
├── assets/
│   ├── css/
│   │   ├── style.css           # Core styling, tokens, components, responsive layouts
│   │   ├── dark-mode.css       # Full high-contrast dark theme overrides
│   │   └── rtl.css             # Right-to-Left layout & mirroring support
│   ├── js/
│   │   ├── main.js             # Theme toggle, RTL toggle, mobile nav, forms, modals, toasts
│   │   └── dashboard.js        # Parent portal slot engine, memberships, party planner, invoices
│   └── images/                 # Custom vector SVGs (hero kid slide, 4 zones, ball pit, badges)
├── pages/
│   ├── play-zones.html         # 4 Age zones breakdown with rules & equipment specs
│   ├── birthday-parties.html   # Party packages (Mini Bash, Super Party, VIP), theme selector
│   ├── membership-plans.html   # Pricing tiers (Starter, Gold, Platinum), annual toggle, matrix
│   ├── safety-standards.html   # BIS certification, sanitization protocol, grip socks policy
│   ├── dashboard.html          # Interactive Parent Portal (5 modules)
│   ├── about.html              # Facility stats, story, play coaches, and values
│   ├── contact.html            # Operating hours, parking info, validated form, stylized SVG map
│   ├── signin.html             # Parent Login with 1-click Demo credentials
│   ├── signup.html             # Account creation with child profiles & digital waiver
│   ├── 404.html                # Custom animated 404 error page
│   ├── coming-soon.html        # Glow Laser Arena expansion with live countdown timer
│   ├── privacy.html            # Child privacy protection & CCTV storage policies
│   └── terms.html              # Play zone rules, socks policy & cancellation terms
└── README.md                   # Project overview & documentation
```

---

## 🚀 Key Features

### 1. Interactive Parent Dashboard (`pages/dashboard.html`)
- **Real-Time Slot Availability**: Live capacity engine checking slots by play date and age group zone (Baby, Explorer, Adventure, Challenge).
- **Multi-Child Booking**: Instant total calculation for 1 to 5 children with optional anti-skid grip socks, producing a printable express QR pass.
- **Active Membership Tracker**: Visual digital pass with dynamic remaining visits progress meter (e.g. 8 of 12 visits left) and 1-click renewal.
- **Visit History & Invoices**: Detailed visit log with itemized invoice generator and printable receipts (`window.print()`).
- **Birthday Party Customizer**: Live quotation engine with theme selector, guest count slider (10 to 40 kids), and optional party add-ons.
- **Child Profiles & Safety Waiver**: Digital waiver management with verified status badges.

### 2. Dual Homepage Layouts
- **Home 1 (`index.html`)**: Precise reproduction of the provided reference design layout, geometric hero, highlights bar, zone cards, birthday & membership cards, safety priority section, and quick portal login card.
- **Home 2 (`index1.html`)**: Dynamic alternative experience with an interactive slot quick-checker bar, interactive adventure facility map, today's workshop schedule, and filterable photo gallery.

### 3. Responsive Breakpoints (Specification Aligned)
```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  1024px - 1280px
Large:    > 1280px
```

### 4. Accessibility & UI Enhancements
- **Dark / Light Mode Toggle**: System preference auto-detection (`prefers-color-scheme`) with `localStorage` persistence.
- **RTL Language Support**: Seamless Right-to-Left orientation toggle with dedicated `rtl.css`.
- **WCAG 2.1 AA Compliance**: Semantic markup (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`), keyboard navigation, skip-to-content links, and ARIA attributes.
- **Client-Side Form Validation**: Real-time error messages, tooltips, and password visibility toggles.
- **Zero Framework Bloat**: Pure HTML5, CSS3, and JavaScript — 100% portable, no server or build process required.

---

## 🛠️ Quick Start

### Local Browser
Double click `index.html` or `index1.html` in your file browser.

### Local Development Server
```bash
# Python 3
python3 -m http.server 8080

# Or using npx
npx serve .
```
Then visit `http://localhost:8080` in your web browser.

---

## 📄 License & Credits
- **Google Fonts**: Plus Jakarta Sans & Outfit (OFL)
- **Icons**: Font Awesome 6 Free (CC BY 4.0)
- **Artwork**: Custom vector SVG playground graphics and Bauhaus geometric patterns.
- &copy; 2026 Play Zone. All rights reserved.
