/* =========================================================
   SECCIÓN JÓVENES · configuración y comportamiento
   ========================================================= */

const JOVENES_CONFIG = {
  // Nombres de los líderes, tal como querés que aparezcan.
  // Ej.: "Martina y Lucas". Si queda vacío, la línea no se muestra.
  lideres: "Joel y Rocío",

  // Usuario de Instagram del grupo (sin @)
  instagramUsuario: "jov.peniel",

  // Código de la publicación destacada (lo que va después de /p/ en el link)
  // Link original: https://www.instagram.com/p/DRfAzsljayy/
  publicacionDestacada: "DRfAzsljayy",
};

(function () {
  const section = document.getElementById("jovenes");
  if (!section) return;

  const cfg = JOVENES_CONFIG;
  const profileUrl = `https://www.instagram.com/${cfg.instagramUsuario}/`;
  const postUrl = `https://www.instagram.com/p/${cfg.publicacionDestacada}/`;

  /* --- Enlaces --- */
  section.querySelectorAll("[data-jv-profile]").forEach((a) => (a.href = profileUrl));
  section.querySelectorAll("[data-jv-post]").forEach((a) => (a.href = postUrl));
  section.querySelectorAll("[data-jv-handle]").forEach((el) => (el.textContent = "@" + cfg.instagramUsuario));

  /* --- Nombres de los líderes --- */
  const names = section.querySelector("[data-jv-names]");
  if (names && cfg.lideres.trim()) {
    names.textContent = cfg.lideres.trim();
    names.hidden = false;
  }

  /* --- Video de Instagram: se carga solo cuando está por verse --- */
  const screen = section.querySelector(".jv-screen");
  if (screen) {
    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      screen.dataset.state = "loading";

      const iframe = document.createElement("iframe");
      iframe.src = `${postUrl}embed/`;
      iframe.title = `Video destacado de los Jóvenes de Peniel en Instagram (@${cfg.instagramUsuario})`;
      iframe.loading = "lazy";
      iframe.allow = "autoplay; encrypted-media; picture-in-picture; clipboard-write";
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("scrolling", "no");

      // Si Instagram no responde (bloqueadores, sin conexión), queda el póster con el link.
      const fallback = setTimeout(() => {
        if (screen.dataset.state !== "loaded") screen.dataset.state = "error";
      }, 10000);

      const markLoaded = () => {
        clearTimeout(fallback);
        screen.dataset.state = "loaded";
      };

      // Instagram avisa por postMessage cuando el post terminó de dibujarse.
      window.addEventListener("message", (e) => {
        if (e.origin !== "https://www.instagram.com" || e.source !== iframe.contentWindow) return;
        let data = e.data;
        try { if (typeof data === "string") data = JSON.parse(data); } catch (_) { return; }
        if (data && data.type === "MEASURE") markLoaded();
      });

      // Respaldo por si el aviso no llega: mostramos el iframe poco después de cargar.
      iframe.addEventListener("load", () => setTimeout(markLoaded, 2500));

      screen.prepend(iframe);
    };

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            load();
            io.disconnect();
          }
        },
        { rootMargin: "400px 0px" }
      );
      io.observe(screen);
    } else {
      load();
    }
  }

  /* --- Animación de entrada --- */
  const items = section.querySelectorAll(".jv-reveal");
  if (!("IntersectionObserver" in window) || !items.length) return;

  document.documentElement.classList.add("jv-js");
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealIO.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((el) => revealIO.observe(el));
})();
