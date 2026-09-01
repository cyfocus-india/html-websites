# Ironlane Moto Works

A responsive, multipage motorcycle service and repair website built with HTML, CSS and vanilla JavaScript only. The template includes two home-page directions, a complete service catalogue, brand coverage, a price guide and calculator, rider reviews, appointment booking, legal pages, authentication UI demonstrations and utility pages.

## Installation guide

1. Copy the complete project folder to your computer or web host.
2. Keep the directory structure unchanged so relative asset links continue to work.
3. For a local preview, open `index.html` directly or run any static file server from the project root.
4. For production, deploy the entire directory to a static host such as GitHub Pages, Cloudflare Pages, Netlify, Apache or Nginx.
5. Connect the demo forms to a secure form endpoint or server-side application before accepting real information.
6. Replace the demonstration business identity, address, map marker, reviews, prices and policies before launch.

No build step, package manager or application server is required.

## Customization guide

### Colors

Edit the CSS custom properties at the top of `assets/css/style.css`. Light-theme values live in `:root`; dark-theme overrides live in `assets/css/dark-mode.css`. The primary accent is `--accent`.

### Typography

The template uses a system sans-serif stack and a condensed system display stack, so there are no font downloads. Replace `--font-body` and `--font-display` in `assets/css/style.css` if your licensed font files are added to `assets/fonts/`.

### Brand and contact details

The shared header and footer are generated in `assets/js/main.js`. Update the brand markup, address, phone, email, opening hours and social links there once. Page-specific contact details also appear in `pages/contact.html`.

### Images

Final generated images are in `assets/images/` as optimized WebP files. Their descriptive filenames indicate their use. Preserve meaningful `alt` text whenever images are replaced.

### Motion

Reveal, hover, hero and slider animation rules are in `assets/css/style.css`. All motion is disabled or reduced automatically when `prefers-reduced-motion: reduce` is active.

### Forms

`assets/js/main.js` supplies accessible client-side validation and demo success feedback. It deliberately does not transmit data. Connect each form to a secure endpoint and add server-side validation before production.

## Page structure

- `index.html` — cinematic image-led homepage.
- `index1.html` — alternate inspection-first homepage.
- `pages/services.html` — seven core services with four unique service photographs.
- `pages/brands.html` — supported and enquiry-only motorcycle brands.
- `pages/pricing.html` — detailed approximate price table and working range calculator.
- `pages/reviews.html` — realistic, clearly disclosed demonstration reviews.
- `pages/contact.html` — contact details, appointment form and OpenStreetMap embed.
- `pages/about.html` — brand story, workflow, timeline and values.
- `pages/signin.html` and `pages/signup.html` — front-end account UI demonstrations.
- `pages/privacy.html` and `pages/terms.html` — clearly labelled sample legal content.
- `pages/404.html` and `pages/coming-soon.html` — utility pages.

## Niche analysis

Motorcycle service customers need confidence before committing their vehicle to a workshop. The template therefore prioritizes service scope, model compatibility, approximate pricing, visible workmanship, opening hours and a short appointment workflow. It avoids a customer dashboard because the core journey is low-frequency and appointment-led; sign-in and sign-up pages are included only as optional interface demonstrations.

## Key rider workflows

1. Discover the workshop from a homepage.
2. Understand available service and brand coverage.
3. Check an approximate price range.
4. Read rider-oriented proof and workshop process.
5. Submit a validated appointment request.
6. Find the location and opening hours.

## Accessibility

The template includes semantic landmarks, a skip link, visible focus styles, keyboard-operable controls, labelled form fields, live error and success messages, reduced-motion support, contrast-aware light and dark themes and RTL layout support. Accessibility is an ongoing production responsibility: re-test after replacing colors, content, forms or third-party embeds.

## Responsive breakpoints

- Mobile: below 640px
- Tablet: 640px–1023px
- Desktop: 1024px–1279px
- Large: 1280px and above

## Credits

- Custom workshop photography: generated for this project with OpenAI ImageGen; stored locally as WebP assets.
- Icons: [Lucide](https://lucide.dev/), loaded from a pinned unpkg CDN build; Lucide is available under the ISC License.
- Map data and embed: [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors.
- All layout, styling, interactions and original template copy are project-local.

Brand names on the Brands page are used descriptively to demonstrate service compatibility. No manufacturer endorsement or affiliation is implied.

## Changelog

### 1.0.0 — 2026-08-28

- Initial multipage release.
- Added two home-page variants and all required utility pages.
- Added generated WebP image set.
- Added dark/light mode with system detection, RTL support and reduced-motion handling.
- Added appointment validation, review slider and pricing calculator.
- Added accessibility notes and third-party credits.

## Support

For production issues, provide the browser name and version, page URL, screen size, exact steps and any console error. The fictional email addresses in the demo are not an active support channel.

## Production checklist

- Replace all fictional business, review, pricing and policy content.
- Connect forms to secure processing and add server-side validation.
- Verify the real workshop map marker and opening hours.
- Test keyboard navigation, screen readers, contrast and zoom after customization.
- Run link, HTML, CSS, performance and cross-browser checks on the deployed URL.
- Confirm manufacturer wording and legal policies with appropriate advisors.

