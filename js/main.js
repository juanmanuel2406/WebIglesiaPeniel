/* ==========================================================================
   IGLESIA PENIEL BUENOS AIRES — Lógica de la página (rediseño CityLife)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const L = CONFIG; // los datos editables viven en config.js

  /* ---------- 1. Tarjetas de horarios ---------- */
  const horariosGrid = $('#horariosGrid');
  if (horariosGrid) {
    horariosGrid.innerHTML = L.horarios.map((h, i) => `
      <article class="horario-card reveal${i === 0 ? ' is-visible' : ''}">
        <span class="horario-day">${h.dia}</span>
        <h3 class="horario-name">${h.nombre}</h3>
        <div class="horario-time">${h.hora} hs</div>
        <p class="horario-note">${h.nota}</p>
      </article>
    `).join('');
  }

  /* ---------- 2. Sedes / espacios ---------- */
  const sedesGrid = $('#sedesGrid');
  if (sedesGrid) {
    const pin = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
    const clock = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>';
    sedesGrid.innerHTML = L.sedes.map((s, i) => `
      <article class="sede-card reveal${i === 0 ? ' is-visible' : ''}">
        <span class="sede-tipo">${s.tipo}</span>
        <h3 class="sede-name">${s.nombre}</h3>
        <p class="sede-dir">${pin}<span>${s.direccion}</span></p>
        <span class="sede-tiempo">${clock}${s.tiempo}</span>
        <p class="sede-detail">${s.detalle}</p>
        <div class="sede-actions">
          ${s.acciones.map(a => `<a data-link="${a.dataLink}" href="#" class="btn btn-sm ${a.clase}">${a.texto}</a>`).join('')}
        </div>
      </article>
    `).join('');
  }

  /* ---------- 3. Valores / ADN ---------- */
  const valoresGrid = $('#valoresGrid');
  if (valoresGrid) {
    valoresGrid.innerHTML = L.valores.map(v => `
      <div class="valor-chip reveal">
        <span class="valor-inicial">${v.inicial}</span>
        <p>${v.texto}</p>
      </div>
    `).join('');
  }

  /* ---------- 4. Siguientes pasos ---------- */
  const pasosGrid = $('#pasosGrid');
  if (pasosGrid) {
    pasosGrid.innerHTML = L.pasos.map((p, i) => `
      <article class="paso-card reveal${i === 0 ? ' is-visible' : ''}">
        <span class="paso-inicial">${p.inicial}</span>
        <h3>${p.titulo}</h3>
        <p>${p.texto}</p>
        <a data-link="${p.dataLink}" href="#" class="btn ${p.clase}">${p.boton}</a>
      </article>
    `).join('');
  }

  /* ---------- 5. Pastores ---------- */
  const pastoresGrid = $('#pastoresGrid');
  if (pastoresGrid) {
    pastoresGrid.innerHTML = L.pastores.map((p, i) => `
      <article class="pastor-card reveal${i === 0 ? ' is-visible' : ''}">
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

  /* ---------- 6. Videos / prédicas ---------- */
  const videosGrid = $('#videosGrid');
  if (videosGrid) {
    videosGrid.innerHTML = L.videos.map((v, i) => {
      const hasId = v.id.trim() !== '';
      const url = i === 0 && L.ultimoMensaje ? L.ultimoMensaje : L.redes.youtube;
      const cover = `
        ${hasId
        ? `<img class="video-thumb" src="https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg"
              onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${v.id}/hqdefault.jpg';"
              alt="Miniatura del video: ${v.titulo}" loading="lazy">`
        : ''}
        <span class="video-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>
      `;
      return `
        <article class="video-card reveal${i === 0 ? ' is-visible' : ''}">
          <a class="video-cover" href="${url}" target="_blank" rel="noopener" aria-label="Ver: ${v.titulo}">
            ${cover}
          </a>
          <div class="video-body">
            <span class="video-date">${v.fecha}</span>
            <h3>${v.titulo}</h3>
            <a class="video-link" href="${url}" target="_blank" rel="noopener">Ver en YouTube →</a>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ---------- 7. Enlaces de contacto (teléfono) ---------- */
  $$('[data-tel]').forEach(a => {
    a.href = `tel:${L.telefono.tel}`;
    if (a.textContent.trim().startsWith('(')) a.textContent = L.telefono.display;
  });

  /* ---------- 8. Enlaces externos (redes, WhatsApp, mapas, prédicas) ---------- */
  const dirTexto = `${L.direccion.calle}, ${L.direccion.barrio}`;
  const linksMap = {
    telefono: `tel:${L.telefono.tel}`,
    mapaDireccion: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dirTexto)}`,
    whatsapp: `https://wa.me/${L.telefono.wa}?text=${encodeURIComponent(L.telefono.waMensaje)}`,
    whatsappLibreria: `https://wa.me/${L.libreria.wa}?text=${encodeURIComponent(L.libreria.waMensaje)}`,
    libreriaWeb: L.libreria.web,
    facebook: L.redes.facebook,
    instagram: L.redes.instagram,
    youtube: L.redes.youtube,
    ultimoMensaje: L.ultimoMensaje
  };
  Object.entries(linksMap).forEach(([key, url]) => {
    $$(`[data-link="${key}"]`).forEach(a => {
      a.href = url;
      if (/^https?:/.test(url)) { a.target = '_blank'; a.rel = 'noopener'; }
    });
  });

  /* ---------- 9. Años de servicio (valor fijo, sin animación) ---------- */
  const statYears = $('#statYears');
  if (statYears) statYears.textContent = new Date().getFullYear() - 1969;

  /* ---------- 10. Revelar secciones al hacer scroll (fade suave) ---------- */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- 11. Navbar con scroll ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- 12. Menú móvil ---------- */
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

  /* ---------- 13. Formulario de petición de oración → WhatsApp ---------- */
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

  /* ---------- 14. Año en el footer ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
});