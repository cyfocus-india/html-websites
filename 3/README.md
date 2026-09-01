# Rosewood Florals

A responsive, multipage flower-shop and bouquet-delivery website built with plain HTML, CSS, and JavaScript.

## Quick start

No build step or package installation is required. From the project folder, start any static file server:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173/`.

Opening the files directly also works for most features, but a local server is recommended for consistent asset loading.

## Highlights

- Two distinct home-page treatments (`index.html` and `index1.html`)
- Occasion-based product filtering and a browser-local demo cart
- Same-day delivery coverage checker
- Custom arrangement, bulk order, contact, newsletter, sign-in, and sign-up form validation
- Light/dark themes with system preference detection and saved preference
- Full right-to-left layout toggle and saved direction preference
- Scroll reveals, restrained parallax, counters, FAQ transitions, hover motion, and page-level image reveals
- `prefers-reduced-motion` support for accessible animation
- Original project imagery in optimized WebP format
- Mobile-first layout at the requested 640px, 1024px, and 1280px ranges

## Project structure

```text
.
├── index.html
├── index1.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── dark-mode.css
│   │   └── rtl.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       └── *.webp
├── pages/
│   └── *.html
├── documentation/
│   ├── GUIDE.md
│   └── IMAGE_PROMPTS.md
└── LICENSE.txt
```

Full installation, customization, page, credit, changelog, and support notes are in [documentation/GUIDE.md](documentation/GUIDE.md).

## Important demo note

Forms, authentication, and the shopping bag are front-end demonstrations. Connect them to a secure commerce or form backend before production use. Replace the fictional address, contact details, policy text, product prices, and delivery rules with verified business information.
