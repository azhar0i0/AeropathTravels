/* Aeropath Travels shared layout: header, mobile menu and footer for every page.
   Each page has <div data-layout="header"></div> and <div data-layout="footer"></div>;
   this script swaps them for the markup below, then wires the menu, header state and anchor links. */
/* Office details, shared by the footer, the contact section (js/contact.js) and the contact page map */
window.AEROPATH_OFFICE = {
  email: 'hello@aeropathtravels.com',
  short: 'DHA Phase 1 & Phase 2, Lahore',
  hours: 'Mon to Sat, 10:00 to 19:00 PKT',
  locations: [
    { name: 'Main office', area: 'DHA Phase 1', address: 'Street 149, Sector H Commercial, DHA Phase 1, Lahore Cantt 54820, Pakistan', lat: 31.483222, lng: 74.395722, maps: 'https://maps.app.goo.gl/ZqBRsfp69AEJjrTDA' },
    { name: 'Second office', area: 'DHA Phase 2', address: 'DHA Phase 2, Lahore Cantt 54820, Pakistan', lat: 31.475337, lng: 74.402499, maps: 'https://maps.app.goo.gl/yShakcCoVVKW5RnW8' }
  ]
};
window.AEROPATH_OFFICE.locations.forEach(l => l.directions = `https://www.google.com/maps/dir/?api=1&destination=${l.lat},${l.lng}`);

(function(){
  const office = window.AEROPATH_OFFICE;
  const isHome = document.body.dataset.page === 'home';
  const arrow = '<span class="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
  const nav = [
    ['index.html#services', 'Services'],
    ['index.html#growth', 'Growth'],
    ['index.html#process', 'Process'],
    ['index.html#work', 'Work'],
    ['index.html#reviews', 'Reviews'],
    ['contact.html', 'Contact']
  ];

  const header = `
<div class="progress" id="progress" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>
<header class="site-header" id="siteHeader">
  <div class="wrap nav">
    <a class="brand" href="index.html#top" aria-label="Aeropath Travels home">
      <img class="on-light" src="img/logo.png" alt="Aeropath Travels" width="573" height="183">
      <img class="on-dark" src="img/logo-light.png" alt="" width="600" height="182">
    </a>
    <ul class="nav-links">${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
    <div class="nav-cta">
      <a class="btn btn-dark" href="contact.html">Book a call ${arrow}</a>
      <button class="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<nav class="mobile-menu no-bar" id="mobileMenu" aria-label="Mobile">
  <ul>${nav.map(([h, t], i) => `<li><a href="${h}">${t} <small>0${i + 1}</small></a></li>`).join('')}</ul>
  <div class="menu-pics">
    <img src="img/dest-umrah.webp" alt="" loading="lazy">
    <img src="img/hero-dashboard.webp" alt="" loading="lazy">
    <img src="img/dest-turkey.webp" alt="" loading="lazy">
  </div>
  <div class="menu-foot">
    <span>${office.email}</span>
    <a class="btn btn-light" href="contact.html">Book a call ${arrow}</a>
  </div>
</nav>`;

  const footer = `
<footer>
  <div class="wrap">
    <div class="foot-top">
      <div class="brand-col">
        <img src="img/logo-light.png" alt="Aeropath Travels" loading="lazy">
        <p>Back-office software, websites, SEO, AEO and social media for the travel trade. Lahore, Pakistan.</p>
        <a class="btn btn-light" href="contact.html" style="justify-self:start">Book a discovery call ${arrow}</a>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="index.html#services">Back-office software</a></li>
          <li><a href="index.html#services">Websites &amp; custom systems</a></li>
          <li><a href="index.html#growth">SEO &amp; AEO</a></li>
          <li><a href="index.html#growth">Social media</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="index.html#destinations">Who we serve</a></li>
          <li><a href="index.html#process">Process</a></li>
          <li><a href="index.html#work">Work</a></li>
          <li><a href="index.html#reviews">Reviews</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact &amp; legal</h4>
        <ul>
          <li><a href="mailto:${office.email}">${office.email}</a></li>
          ${office.locations.map(l => `<li><a href="${l.maps}" target="_blank" rel="noopener"><small>${l.name}</small>${l.address}</a></li>`).join('')}
          <li><a href="contact.html#faq">FAQ</a></li>
          <li><a href="privacy.html">Privacy policy</a></li>
          <li><a href="terms.html">Terms of service</a></li>
        </ul>
      </div>
    </div>
    <div class="wordmark" id="wordmark" aria-hidden="true">${[...'Aeropath'].map(c => `<span>${c}</span>`).join('')}</div>
    <div class="foot-bottom"><span>&copy; ${new Date().getFullYear()} Aeropath Travels (Pvt) Ltd. All rights reserved.</span><span><a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a> &middot; <a href="#top">Back to top &uarr;</a></span></div>
  </div>
</footer>`;

  const swap = (name, html) => { const el = document.querySelector(`[data-layout="${name}"]`); if (el) el.outerHTML = html; };
  swap('header', header);
  swap('footer', footer);

  const root = document.documentElement;
  const siteHeader = document.getElementById('siteHeader');
  const menu = document.getElementById('mobileMenu');
  const burger = document.getElementById('burger');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Current page highlight for nav and footer links to other pages */
  const here = location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a, footer a').forEach(a => {
    if (!here || a.getAttribute('href') !== here) return;
    a.setAttribute('aria-current', 'page');
    if (a.closest('.nav-links')) a.classList.add('active');
  });

  /* Mobile menu: burger morphs into a close cross; page scroll is locked only while open */
  function openMenu(){ document.body.classList.add('menu-open'); menu.classList.add('open'); burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Close menu'); root.style.overflow = 'hidden'; }
  function closeMenu(){ document.body.classList.remove('menu-open'); menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Open menu'); root.style.overflow = ''; }
  burger.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu(); });
  addEventListener('resize', () => { if (innerWidth > 860 && menu.classList.contains('open')) closeMenu(); });

  /* In-page links scroll smoothly under the fixed header; links to other pages navigate normally */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href*="#"]');
    if (!a) return;
    const url = new URL(a.href, location.href);
    const page = p => p.replace(/index\.html$/, '');
    const samePage = page(url.pathname) === page(location.pathname);
    const target = url.hash.length > 1 && document.querySelector(url.hash);
    if (!samePage || !target) { closeMenu(); return; }
    e.preventDefault();
    closeMenu();
    const y = url.hash === '#top' ? 0 : target.getBoundingClientRect().top + scrollY - siteHeader.offsetHeight + 1;
    scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', url.hash === '#top' ? location.pathname : url.hash);
  });

  /* Header: solid once scrolling starts, hides on scroll down, returns on scroll up; progress bar */
  const progress = document.getElementById('progress');
  let lastY = scrollY;
  function onScroll(){
    const y = scrollY;
    siteHeader.classList.toggle('scrolled', y > 20);
    siteHeader.classList.toggle('hide', y > 600 && y > lastY && !menu.classList.contains('open'));
    lastY = y;
    const max = root.scrollHeight - innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Active nav link on the home page */
  if (isHome && 'IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.nav-links a')].filter(l => l.hash);
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) links.forEach(l => l.classList.toggle('active', l.hash === '#' + en.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(l => { const s = document.querySelector(l.hash); if (s) io.observe(s); });
  }
})();
