(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Präsentationsmodus: ?clean blendet Platzhalter-Markierungen aus
  if (new URLSearchParams(location.search).has('clean')) document.documentElement.classList.add('clean');

  // Mobile Navigation
  const toggle = $('.nav-toggle');
  const nav = $('#nav');
  const setNav = open => {
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setNav(false); });

  // Header-Schatten beim Scrollen
  const header = $('.header');
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Logo: Wenn img/logo.svg fehlt, Textmarke zeigen
  $$('[data-logo]').forEach(img => {
    const brand = img.closest('.brand');
    const ok = () => brand.classList.add('has-logo');
    const fail = () => img.remove();
    if (img.complete) (img.naturalWidth ? ok() : fail());
    else { img.addEventListener('load', ok); img.addEventListener('error', fail); }
  });

  // Stockbild lädt nicht → beschrifteter Platzhalter
  $$('img[data-replace]').forEach(img => {
    const swap = () => {
      const ph = document.createElement('div');
      ph.className = 'img-ph ' + img.className;
      ph.style.aspectRatio = getComputedStyle(img).aspectRatio;
      ph.setAttribute('role', 'img');
      ph.setAttribute('aria-label', img.alt);
      ph.innerHTML = '<span></span>';
      ph.firstChild.textContent = '📷 ' + img.dataset.replace;
      img.replaceWith(ph);
    };
    if (img.complete && !img.naturalWidth) swap();
    else img.addEventListener('error', swap);
  });

  // Öffnungszeiten: heutigen Tag markieren
  const today = String(new Date().getDay());
  $$('.hours tr[data-day]').forEach(tr => {
    if (tr.dataset.day.split(' ').includes(today)) tr.classList.add('is-today');
  });
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  // Unternavigation: aktiven Abschnitt hervorheben
  const subLinks = $$('.subnav a');
  if (subLinks.length && 'IntersectionObserver' in window) {
    const map = new Map(subLinks.map(a => [a.hash.slice(1), a]));
    const so = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        subLinks.forEach(a => a.classList.remove('is-active'));
        map.get(e.target.id)?.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((_, id) => { const s = document.getElementById(id); if (s) so.observe(s); });
  }

  // Karte erst nach Einwilligung laden (2-Klick-Lösung)
  $$('[data-map]').forEach(box => {
    const btn = $('[data-map-load]', box);
    btn?.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = box.dataset.src;
      iframe.title = 'Karte: Praxis Thomas Omert, Mittelweg 6, Frickenhausen';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      box.innerHTML = '';
      box.appendChild(iframe);
    });
  });

  // Stellenanzeigen aus js/jobs.js
  const jobsEl = $('#jobs-list');
  if (jobsEl && Array.isArray(window.JOBS)) {
    const k = window.JOBS_KONTAKT || {};
    const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const list = arr => (arr || []).map(i => `<li>${esc(i)}</li>`).join('');
    const jobs = window.JOBS.filter(j => j.aktiv !== false);
    jobsEl.innerHTML = jobs.length ? jobs.map(j => `
      <details class="job">
        <summary>
          <h3 class="job__title">${esc(j.titel)}</h3>
          <div class="job__meta">
            <span>${esc(j.arbeitszeit)}</span>
            ${j.start ? `<span>${esc(j.start)}</span>` : ''}
            <span>Frickenhausen</span>
            ${j.beispiel ? '<span class="job__badge">Beispielanzeige</span>' : ''}
          </div>
          <span class="job__toggle" aria-hidden="true"></span>
        </summary>
        <div class="job__body">
          ${j.intro ? `<p class="job__intro">${esc(j.intro)}</p>` : ''}
          <div class="job__cols">
            <div><h4>Ihre Aufgaben</h4><ul>${list(j.aufgaben)}</ul></div>
            <div><h4>Das bringen Sie mit</h4><ul>${list(j.anforderungen)}</ul></div>
            <div><h4>Das bieten wir</h4><ul>${list(j.angebot)}</ul></div>
          </div>
          <div class="job__apply">
            <a class="btn" href="mailto:${esc(k.email)}?subject=${encodeURIComponent('Bewerbung: ' + j.titel)}">Jetzt bewerben</a>
            <p>Bewerbung per E-Mail an <a href="mailto:${esc(k.email)}">${esc(k.email)}</a><br>Fragen vorab? ${esc(k.ansprechpartner)} · <a href="tel:${esc((k.telefon || '').replace(/\s/g, ''))}">${esc(k.telefon)}</a></p>
          </div>
        </div>
      </details>`).join('')
      : `<div class="jobs__empty"><p><strong>Aktuell sind keine Stellen ausgeschrieben.</strong></p><p>Wir freuen uns trotzdem über Ihre <a href="#initiativ">Initiativbewerbung</a>.</p></div>`;
  }

  // Kontaktformular
  $$('[data-contact-form]').forEach(form => {
    const status = $('.form__status', form);
    const btn = $('button[type="submit"]', form);
    const ts = form.elements.ts;
    if (ts) ts.value = Date.now();

    const messages = {
      valueMissing: 'Bitte füllen Sie dieses Feld aus.',
      typeMismatch: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      checkbox: 'Bitte bestätigen Sie die Datenschutzerklärung.'
    };
    const showError = field => {
      const wrap = field.closest('.field');
      wrap.querySelector('.field__error')?.remove();
      wrap.classList.remove('is-invalid');
      field.removeAttribute('aria-invalid');
      if (field.validity.valid) return true;
      const msg = field.type === 'checkbox' ? messages.checkbox : (field.validity.typeMismatch ? messages.typeMismatch : messages.valueMissing);
      const err = document.createElement('span');
      err.className = 'field__error';
      err.id = field.id + '-err';
      err.textContent = msg;
      wrap.appendChild(err);
      wrap.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', err.id);
      return false;
    };
    $$('input, select, textarea', form).forEach(f => {
      // Fehler schon beim Tippen entfernen – sonst verschiebt sich das Layout erst beim Verlassen des Feldes
      if (f.closest('.field') && f.required) f.addEventListener(f.matches('select, [type=checkbox]') ? 'change' : 'input', () => {
        if (f.getAttribute('aria-invalid')) showError(f);
      });
    });

    const setStatus = (type, html) => {
      status.hidden = false;
      status.className = 'form__status is-' + type;
      status.innerHTML = html;
    };

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const fields = $$('[required]', form);
      const valid = fields.map(showError).every(Boolean);
      if (!valid) { fields.find(f => !f.validity.valid)?.focus(); return; }

      btn.disabled = true;
      btn.textContent = 'Wird gesendet …';
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok) throw new Error(data.error || 'send');
        form.reset();
        if (ts) ts.value = Date.now();
        setStatus('success', '<strong>Vielen Dank für Ihre Nachricht!</strong> Wir melden uns so schnell wie möglich bei Ihnen.');
      } catch (err) {
        setStatus('error', '<strong>Die Nachricht konnte leider nicht gesendet werden.</strong> Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an: <a href="tel:+499773898389">09773 89 83 89</a>.');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Nachricht senden';
      }
    });
  });

  // Teamfotos: fehlt img/team/....jpg, werden die Initialen angezeigt
  $$('img[data-initials]').forEach(img => {
    const swap = () => {
      const ph = document.createElement('div');
      ph.className = 'member__initials';
      ph.setAttribute('role', 'img');
      ph.setAttribute('aria-label', img.alt);
      ph.innerHTML = '<span></span><small>Foto folgt</small>';
      ph.firstChild.textContent = img.dataset.initials;
      img.replaceWith(ph);
    };
    if (img.complete && !img.naturalWidth) swap();
    else img.addEventListener('error', swap);
  });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll-Animationen: Inhalte einblenden (gestaffelt) + Bilder "reinschieben"
  if ('IntersectionObserver' in window && !reduced) {
    const groups = '.teaser, .services article, .pillars article, .benefits article, .icon-grid li, .steps li, .member, .job, .pill-cloud li';
    const targets = $$('.section__head, .praxis__text, .owner__text, .philo__text, .initiativ, .team-teaser, .bg-band__inner, ' + groups);
    targets.forEach(t => {
      if (t.matches(groups)) t.style.setProperty('--d', ([...t.parentElement.children].indexOf(t) % 4) * 0.09 + 's');
    });
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    targets.forEach(t => { t.classList.add('reveal'); io.observe(t); });

    const io2 = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-revealed'); io2.unobserve(e.target); }
    }), { threshold: 0.2 });
    $$('[data-reveal-img]').forEach(el => io2.observe(el));
  } else {
    $$('[data-reveal-img]').forEach(el => el.classList.add('is-revealed'));
  }

  // Parallax für Hintergrundbilder
  const para = $$('[data-parallax]');
  if (para.length && !reduced) {
    let ticking = false;
    const update = () => {
      const vh = innerHeight;
      para.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const offset = (r.top + r.height / 2 - vh / 2) * -parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();
  }
})();
