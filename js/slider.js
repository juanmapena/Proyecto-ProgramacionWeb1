import { obtenerTodosLosCursos } from "./bbdd.js";

export class CursosSlider {
  constructor() {}

  render() {
    const cont = document.querySelector("#slider-cursos");
    if (!cont) return;

    const lista = cont.querySelector(".cursos-lista");
    const btnPrev = cont.querySelector(".cursos-boton.prev");
    const btnNext = cont.querySelector(".cursos-boton.next");
    if (!lista || !btnPrev || !btnNext) return;

    // --- helpers de rutas ---
    const enPages = window.location.pathname.toLowerCase().includes("/pages/");
    const basePages = enPages ? "." : "./Pages";
    const resolveAsset = (p) => {
      if (!p) return "";
      if (p.startsWith("../")) return enPages ? p : "./" + p.slice(3);
      if (p.startsWith("./"))  return enPages ? p.replace("./", "../") : p;
      if (p.startsWith("/"))   return p; // absoluta al sitio (ok)
      // ruta relativa "assets/..."
      return (enPages ? "../" : "./") + p;
    };

    // --- poblar dinámicamente con TODOS los cursos de la bbdd ---
    const cursos = obtenerTodosLosCursos();
    lista.innerHTML = cursos.map(c => `
      <a class="curso-card" href="${basePages}/detalle-general.html?name=${c.idNombre}">
        <img src="${resolveAsset(c.urlLogo)}" alt="${c.titulo}">
        <span>${c.titulo}</span>
      </a>
    `).join("");

    const items = Array.from(lista.children);
    if (!items.length) return;

    // --- slider ---
    let index = 0;
    const visibles = () => {
      const w = cont.clientWidth;
      if (w <= 600) return 1;
      if (w <= 900) return 2;
      return 3;
    };

    const gapPx = () => {
      const styles = getComputedStyle(lista);
      const raw = (styles.gap || styles.columnGap || "24") + "";
      const n = parseFloat(raw);
      return Number.isFinite(n) ? n : 24;
    };

    const cardWidth = () => {
      const first = items[0];
      return first.getBoundingClientRect().width + gapPx();
    };

    const maxInicio = () => Math.max(0, items.length - visibles());

    const irA = (i) => {
      index = Math.min(Math.max(i, 0), maxInicio());
      lista.style.transform = `translateX(${-index * cardWidth()}px)`;
    };

    const siguiente = () => {
      const max = maxInicio();
      index = (index < max) ? index + 1 : 0;
      lista.style.transform = `translateX(${-index * cardWidth()}px)`;
    };

    const anterior = () => {
      const max = maxInicio();
      index = (index > 0) ? index - 1 : max;
      lista.style.transform = `translateX(${-index * cardWidth()}px)`;
    };

    // autoplay con accesibilidad
    const INTERVALO = 3000;
    let timer = null;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = () => { stop(); if (!prefersReduced) timer = setInterval(siguiente, INTERVALO); };
    const stop  = () => { if (timer) clearInterval(timer); timer = null; };

    btnPrev.addEventListener("click", () => { anterior(); start(); });
    btnNext.addEventListener("click", () => { siguiente(); start(); });

    cont.addEventListener("mouseenter", stop);
    cont.addEventListener("mouseleave", start);
    [btnPrev, btnNext].forEach(b => {
      b.addEventListener("focus", stop);
      b.addEventListener("blur", start);
      b.addEventListener("touchstart", stop, { passive: true });
      b.addEventListener("touchend", start, { passive: true });
    });
    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : start();
    });

    window.addEventListener("resize", () => irA(index));
    irA(0);
    start();
  }
}
