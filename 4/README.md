# Pawfolk Pet Shop & Accessories Store

A multipage, framework-free HTML/CSS/JavaScript website template for a friendly independent pet store. The visual direction uses original anthropomorphic characters, editorial poster composition, tactile outlines, playful motion, and a disciplined three-color palette of cream, near-black, and cobalt blue.

## Quick start

No build step is required. Open `index.html` directly, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Home layouts

- `index.html` — product-forward editorial home
- `index1.html` — alternate “curious creature club” home

## Main pages

- `pages/shop.html` — product grid, filters, sorting, and demo cart
- `pages/brands.html` — featured makers and shelf standards
- `pages/grooming.html` — services, pricing, process, and appointment request
- `pages/blog.html` — pet care journal and sample guides
- `pages/contact.html` — location, hours, directions, special orders, and enquiry form
- `pages/about.html` — brand story, values, and community programs
- `pages/services.html` — compact store-services overview
- `pages/signin.html`, `pages/signup.html` — account screens
- `pages/privacy.html`, `pages/terms.html` — template legal pages
- `pages/404.html`, `pages/coming-soon.html` — system pages

## Features

- Mobile-first responsive layout at 640px, 820px/1024px, and 1100px+ ranges
- Light/dark theme with system-preference detection and local persistence
- One-click RTL/LTR layout switch with persistent preference
- Keyboard focus styles, semantic landmarks, labels, live status messages, alt text, and reduced-motion support
- Scroll reveals, tactile hover states, floating characters, animated marquee bands, and card tilt on pointer devices
- Client-side validation with inline, accessible error messaging
- Demo shopping bag persisted in `localStorage`
- Three-color PNG illustrations plus optimized WebP image sources

## Project structure

```text
assets/
  css/style.css
  css/dark-mode.css
  css/rtl.css
  js/main.js
  images/
documentation/
pages/
index.html
index1.html
README.md
```

## Important implementation note

This is a front-end demo. Forms, authentication, checkout, inventory, real map data, and appointment scheduling require backend or third-party service integration before production use. Replace fictional store details and sample legal copy.

See `documentation/README.md` for installation, customization, page structure, credits, changelog, and support notes.
