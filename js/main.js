/* ==========================================================================
   IGLESIA PENIEL BUENOS AIRES — Lógica de la página
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const L = CONFIG; // los datos editables viven en config.js

  /* ---------- 1. Enlaces de contacto (teléfono) ---------- */
  const telDisplay = L.telefono.display;
  $$('[data-tel]').forEach(a => {
    a.href = `tel:${L.telefono.tel}`;
    if (a.textContent.trim().startsWith('(')) a.textContent = telDisplay;
  });

  /* ---------- 2. Enlaces de redes / externos ---------- */
  const linksMap = {
    facebook: L.redes.facebook,
    instagram: L.redes.instagram,
    youtube: L.redes.youtube,
    libreriaWeb: L.libreria.web,
    whatsapp: `https://wa.me/${L.telefono.wa}?text=${encodeURIComponent(L.telefono.waMensaje)}`,
    whatsappLibreria: `https://wa.me/${L.libreria.wa}?text=${encodeURIComponent(L.libreria.waMensaje)}`
  };
  Object.entries(linksMap).forEach(([key, url]) => {
    $$(`[data-link="${key}"]`).forEach(a => { a.href = url; });
  });

  /* ---------- 3. Tarjetas de horarios ---------- */
  const horariosGrid = $('#horariosGrid');
  if (horariosGrid) {
    horariosGrid.innerHTML = L.horarios.map((h, i) => `
      <article class="horario-card reveal${i === 0 ? ' is-visible' : ''}" ${i > 0 ? `style="--d:${i * 0.1}s"` : ''}>
        <span class="horario-day">${h.dia}</span>
        <h3 class="horario-name">${h.nombre}</h3>
        <div class="horario-time">${h.hora} hs</div>
        <p class="horario-note">${h.nota}</p>
      </article>
    `).join('');
  }

  /* ---------- 4. Tarjetas de pastores ---------- */
  const pastoresGrid = $('#pastoresGrid');
  if (pastoresGrid) {
    pastoresGrid.innerHTML = L.pastores.map((p, i) => `
      <article class="pastor-card reveal" ${i > 0 ? `style="--d:${i * 0.15}s"` : ''}>
        <div class="pastor-photo">
          <img src="${p.foto}" alt="${p.nombre}" loading="lazy">
        </div>
        <div class="pastor-body">
          <span class="pastor-cargo">${p.cargo}</span>
          <h3 class="pastor-name">${p.nombre}</h3>
          <p class="pastor-msg">${p.mensaje}</p>
        </div>
      </article>
    `).join('');
  }

  /* ---------- 5. Videos / prédicas ---------- */
  const videosGrid = $('#videosGrid');
  if (videosGrid) {
    videosGrid.innerHTML = L.videos.map((v, i) => {
      const isEmbed = v.id.trim() !== '';
      const cover = isEmbed
        ? `<iframe src="https://www.youtube.com/embed/${v.id}" title="${v.titulo}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<div class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>`;
      return `
        <article class="video-card reveal" ${i > 0 ? `style="--d:${i * 0.12}s"` : ''}>
          <div class="video-cover">${cover}</div>
          <div class="video-body">
            <span class="video-date">${v.fecha}</span>
            <h3>${v.titulo}</h3>
            ${isEmbed ? '' : `<a class="video-link" href="${L.redes.youtube}" target="_blank" rel="noopener">Ver en YouTube →</a>`}
          </div>
        </article>
      `;
    }).join('');
  }

  /* ---------- 6. Contadores animados ---------- */
  const animateCounter = (el) => {
    const hasFloat = el.dataset.counter === 'float';
    const decimals = hasFloat ? +(el.dataset.decimals || 1) : 0;
    let target = +(el.dataset.to || 0);
    if (el.dataset.yearFrom) target = new Date().getFullYear() - +el.dataset.yearFrom;
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals).replace('.', ',');
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = (hasFloat ? target.toFixed(decimals) : Math.round(target)).toString().replace('.', ',');
    };
    requestAnimationFrame(tick);
  };

  const counterObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: .6 });
  $$('[data-counter]').forEach(el => counterObs.observe(el));

  /* ---------- 7. Revelar secciones al hacer scroll ---------- */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- 8. Navbar con scroll ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 9. Menú móvil ---------- */
  const navToggle = $('#navToggle');
  const navLinks = $('#navLinks');
  const closeMenu = () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.nav-links a', navLinks).forEach(a => a.addEventListener('click', closeMenu));

  /* ---------- 10. Formulario de petición de oración → WhatsApp ---------- */
  const form = $('#prayerForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = $('#fNombre').value.trim();
      const contacto = $('#fContacto').value.trim();
      const motivo = $('#fMotivo').value.trim();
      const mensaje = $('#fMensaje').value.trim();

      if (!form.checkValidity()) { form.reportValidity(); return; }

      let texto = `*Petición desde la web de la iglesia*%0A`;
      texto += `%0A*Nombre:* ${encodeURIComponent(nombre)}%0A`;
      if (contacto) texto += `*Contacto:* ${encodeURIComponent(contacto)}%0A`;
      texto += `*Motivo:* ${encodeURIComponent(motivo)}%0A%0A`;
      texto += `${encodeURIComponent(mensaje)}`;

      window.open(`https://wa.me/${L.telefono.wa}?text=${texto}`, '_blank');
    });
  }

  /* ---------- 11. Año en el footer ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
});