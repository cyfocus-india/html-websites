# Pawfolk Template Documentation

## 1. Installation guide

1. Copy the complete folder to your web server or static host.
2. Keep the relative `assets/` and `pages/` paths unchanged.
3. Set `index.html` as the default document.
4. Test all routes from the final host, especially links inside `pages/`.
5. Connect the forms, cart, authentication, checkout, map, and booking request to production services before launch.

The site uses only HTML, CSS, and JavaScript. There is no framework or build requirement.

## 2. Customization guide

### Colors and geometry

Edit the tokens at the top of `assets/css/style.css`. The main palette uses:

- `--cream` (`#FFF7E8`): primary background and light text
- `--dark` (`#17221C`): type, outlines, and high-contrast surfaces
- `--blue` (`#1F79C6`): primary action, feature, and highlight color

Every softer surface, border, and hover state is mixed from those same three source colors with CSS `color-mix()`. Keep new components and artwork within this palette so the interface remains cohesive.

Dark-theme replacements live in `assets/css/dark-mode.css`. RTL layout-specific transforms live in `assets/css/rtl.css`.

### Content

Search for `Pawfolk`, `24 Tailwag Lane`, `Portland`, phone numbers, and `.example` email addresses and replace them with real business data. Update JSON-LD store data in `index.html`.

### Images

Four original, three-color generated illustrations are in `assets/images/` as PNG and WebP: `pawpals-hero-tricolor`, `product-mascots-tricolor`, `grooming-story-tricolor`, and `care-story-tricolor`. Keep intrinsic width and height on `<img>` elements to reduce layout shift. If replacing an image, preserve its aspect ratio or adjust the relevant `object-fit` rule.

### Icons

Font Awesome Free is loaded from cdnjs. For offline use, self-host the library and update each stylesheet URL.

## 3. Page structure

- Home 01: announcement, sticky navigation, hero, pet categories, popular products, maker story, grooming feature, care journal, newsletter, footer.
- Home 02: alternate club-style hero, product picks, pathway cards, newsletter.
- Shop: product filtering, price sorting, add-to-bag interactions, special-order callout.
- Brands: brand cards and selection standards.
- Grooming: service tiers, prices, visit process, validated request form.
- Care journal: featured guide, topic cards, wellbeing note, newsletter.
- Contact: address, hours, map treatment, special-order enquiry, FAQ cards.

## 4. Credits

- Original site artwork: created with OpenAI ImageGen for this project. The attached poster collage was used only as broad visual inspiration; the delivered characters and compositions are original.
- Icons: Font Awesome Free 6.7.2, loaded via cdnjs. License: CC BY 4.0 for icons, SIL OFL 1.1 for fonts, MIT for code.
- UI code, copy, mascots, color system, animation treatment, and page layouts: original for this template.
- No third-party stock photography is used.

## 5. Changelog

### 1.0.0 — 2026-08-28

- Initial multipage release
- Added two home layouts and pet-specific shop filtering
- Added dark/light preference, RTL/LTR switch, accessible form validation, and persistent demo cart
- Added original anthropomorphic hero, product, grooming, and care-journal illustrations
- Refined the complete interface and illustration system to a strict cream, near-black, and cobalt palette
- Added responsive, reduced-motion, legal, account, 404, and coming-soon pages

## 6. Support

For template customization, first check browser developer-console errors and confirm the relative paths have not changed. Test from a local HTTP server instead of relying only on `file://` URLs. When requesting support, include the browser/version, page URL, viewport size, and steps to reproduce.

## Production checklist

- Replace all fictional business and legal content.
- Connect forms and display real submission states.
- Add real inventory, payment, tax, fulfillment, return, and grooming policies.
- Self-host or approve the Font Awesome CDN under the site’s content-security policy.
- Validate HTML and test keyboard, screen reader, contrast, zoom, RTL, reduced motion, and responsive layouts.
- Run cross-browser QA in current Chrome, Firefox, Safari, and Edge.
