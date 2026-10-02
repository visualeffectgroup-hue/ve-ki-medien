// Mobile Navigation
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Header-Linie beim Scrollen
const header = document.querySelector('.header');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Logo: Wenn img/logo.svg fehlt, Textmarke zeigen
document.querySelectorAll('[data-logo]').forEach(img => {
  const brand = img.closest('.brand');
  const ok = () => brand.classList.add('has-logo');
  const fail = () => img.remove();
  if (img.complete) (img.naturalWidth ? ok() : fail());
  else { img.addEventListener('load', ok); img.addEventListener('error', fail); }
});

// Bild-Platzhalter: Wenn ein Bild nicht lädt, beschrifteten Platzhalter zeigen
document.querySelectorAll('img[data-replace]').forEach(img => {
  const swap = () => {
    const ph = document.createElement('div');
    ph.className = 'img-ph ' + img.className;
    ph.style.aspectRatio = getComputedStyle(img).aspectRatio;
    ph.innerHTML = '<span>📷 ' + img.dataset.replace + '</span>';
    img.replaceWith(ph);
  };
  if (img.complete && !img.naturalWidth) swap();
  else img.addEventListener('error', swap);
});

// Heutigen Tag in den Öffnungszeiten markieren
const rows = document.querySelectorAll('.hours tr');
const day = new Date().getDay(); // 0 = So
const idx = day === 0 || day === 6 ? 5 : day - 1;
if (rows[idx]) rows[idx].classList.add('is-today');

// Jahr im Footer
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Scroll-Reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
