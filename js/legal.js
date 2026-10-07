/* Arrowpak Travels legal pages: table-of-contents scroll spy, reading progress and fade-ins. */
(function(){
  const sections = [...document.querySelectorAll('.prose section[id]')];
  const links = [...document.querySelectorAll('.toc a')];
  const bar = document.querySelector('.toc-progress i');
  const prose = document.querySelector('.prose');

  function update(){
    const line = innerHeight * 0.3;
    let current = sections[0];
    sections.forEach(s => { if (s.getBoundingClientRect().top <= line) current = s; });
    links.forEach(a => a.classList.toggle('active', a.hash === '#' + current.id));
    if (bar && prose) {
      const r = prose.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (line - r.top) / (r.height - innerHeight * 0.4)));
      bar.style.transform = 'scaleX(' + p + ')';
    }
  }
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();

  const fades = document.querySelectorAll('[data-fade]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
    fades.forEach(el => io.observe(el));
  } else fades.forEach(el => el.classList.add('in'));
})();
