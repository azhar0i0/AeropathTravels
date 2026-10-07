/* Aeropath Travels shared contact section: office details + project form, used on the home and contact pages.
   A page places <div data-layout="contact"></div>; this script swaps it for the markup below and wires
   the copy-email button and form validation. Load it after site.js and before any page script that animates it. */
(function(){
  const slot = document.querySelector('[data-layout="contact"]');
  if (!slot) return;

  const office = window.AEROPATH_OFFICE;
  const arrow = '<span class="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';
  const needs = ['Invoicing', 'Accounting', 'Payroll & HR', 'Bookings', 'Website', 'SEO & AEO', 'Social media'];
  const esc = s => s.replace(/&/g, '&amp;');
  const here = location.pathname.split('/').pop();

  slot.outerHTML = `
<section class="contact" id="contact">
  <div class="bg"><img src="img/contact-sunset.webp" alt="" id="contactImg" loading="lazy" width="1800" height="1000"></div>
  <div class="wrap contact-grid">
    <div class="contact-copy">
      <span class="label" data-reveal>Contact</span>
      <h2 data-reveal>Tell us where your office <span class="serif">loses time</span></h2>
      <p data-reveal>We reply within one working day with a call slot. If it is a fit, you get a written scope and fixed quote the week after.</p>
      <div class="contact-lines" data-reveal>
        <div><span>Email</span><b id="mailText">${office.email}</b><button type="button" id="copyMail">Copy</button></div>
        <div><span>Offices</span><b>${office.short}</b><a href="${here === 'contact.html' ? '' : 'contact.html'}#visit">Map</a></div>
        <div><span>Hours</span><b>${office.hours}</b></div>
      </div>
    </div>
    <form class="form" id="contactForm" novalidate data-reveal>
      <div class="fields">
        <h3>Start a project</h3>
        <div class="field"><label>What do you need?</label>
          <div class="chips">${needs.map(n => `<label><input type="checkbox" name="need" value="${esc(n)}"><span>${esc(n)}</span></label>`).join('')}</div>
        </div>
        <div class="form-row">
          <div class="field"><label for="fName">Your name</label><input id="fName" name="name" type="text" placeholder="Hamza Qureshi" autocomplete="name"><span class="err">Please add your name.</span></div>
          <div class="field"><label for="fCompany">Company</label><input id="fCompany" name="company" type="text" placeholder="Your travel company" autocomplete="organization"></div>
        </div>
        <div class="field"><label for="fEmail">Email</label><input id="fEmail" name="email" type="email" placeholder="you@company.com" autocomplete="email"><span class="err">Enter a valid email so we can reply.</span></div>
        <div class="field"><label for="fMsg">A little about the project</label><textarea id="fMsg" name="message" placeholder="Invoicing for 3 branches, payroll for 40 staff, a new booking site..."></textarea><span class="err">Tell us a little about the project.</span></div>
        <button class="btn btn-dark" type="submit">Send message ${arrow}</button>
      </div>
      <div class="sent" role="status"><b>Message received.</b>We will reply within one working day with a call slot.</div>
    </form>
  </div>
</section>`;

  /* Copy email */
  const copyBtn = document.getElementById('copyMail');
  const mailText = document.getElementById('mailText');
  copyBtn.addEventListener('click', () => {
    const done = t => { copyBtn.textContent = t; setTimeout(() => copyBtn.textContent = 'Copy', 1600); };
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(mailText); const s = getSelection(); s.removeAllRanges(); s.addRange(r); done('Selected'); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(mailText.textContent).then(() => done('Copied')).catch(fallback); else fallback();
  });

  /* Form validation */
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    const check = (id, test) => { const f = document.getElementById(id); const bad = !test(f.value.trim()); f.closest('.field').classList.toggle('invalid', bad); if (bad) ok = false; };
    check('fName', v => v.length > 1);
    check('fEmail', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    check('fMsg', v => v.length > 5);
    if (!ok) { form.querySelector('.field.invalid input, .field.invalid textarea').focus(); return; }
    form.classList.add('done');
  });
  form.querySelectorAll('input, textarea').forEach(f => f.addEventListener('input', () => { const fl = f.closest('.field'); if (fl) fl.classList.remove('invalid'); }));
})();
