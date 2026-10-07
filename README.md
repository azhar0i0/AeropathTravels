# Aeropath Travels

Marketing site for Aeropath Travels, a Lahore software house building back-office software, booking websites, SEO, AEO and social media for travel companies.

## Pages

- `index.html` — home page
- `contact.html` — contact page: project form, office map and FAQ
- `privacy.html` — privacy policy
- `terms.html` — terms of service

## Structure

- `css/site.css`, `js/site.js` — shared header, mobile menu and footer used by every page
- `css/contact.css`, `js/contact.js` — shared contact section (office details + project form) used on the home and contact pages, plus contact page styles
- `css/legal.css`, `js/legal.js` — shared styles and table-of-contents behaviour for the legal pages
- `img/` — photos, logos, favicons; `img/clients/` holds client logos

Static HTML, no build step. Animations use GSAP and ScrollTrigger from cdnjs. Open `index.html` in a browser or deploy the folder as-is.
