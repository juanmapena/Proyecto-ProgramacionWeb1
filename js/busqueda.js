// busqueda.js
import { obtenerTodosLosCursos } from "./bbdd.js";

export class Busqueda {
  constructor() {}

  render() {
    // registramos los listeners directamente.
    const formBusqueda = document.querySelector(".form_busqueda");
    const inputBusqueda = document.querySelector(".input_busqueda");
    const modalNoEncontrado = document.getElementById("exito-modal");
    const botonCerrarModal = document.getElementById("modal-exito-aceptar");

    if (!formBusqueda || !inputBusqueda) return;

    // Normalizamos detección de carpeta y base (usa siempre /pages en minúsculas)
    const estaEnPages = window.location.pathname.toLowerCase().includes("/pages/");
    const baseRuta = estaEnPages ? "." : "./pages";

    const cursos = obtenerTodosLosCursos();

    // Helpers de matching
    const incluyePalabra = (texto, palabra) => {
      // match por palabra completa (evita confundir "java" con "javascript")
      const re = new RegExp(`\\b${palabra}\\b`, "i");
      return re.test(texto);
    };

    formBusqueda.addEventListener("submit", (ev) => {
      ev.preventDefault();

      const q = (inputBusqueda.value || "").trim().toLowerCase();
      if (!q) return;

      let cursoEncontrado = null;

      // Prioridad Java vs JavaScript
      if (incluyePalabra(q, "java") && !q.includes("javascript") && !incluyePalabra(q, "js")) {
        cursoEncontrado = cursos.find(c => c.idNombre === "curso-java");
      } else if (q.includes("javascript") || incluyePalabra(q, "js")) {
        cursoEncontrado = cursos.find(c => c.idNombre === "curso-js");
      }

      // Búsqueda genérica si no se encontró arriba
      if (!cursoEncontrado) {
        cursoEncontrado = cursos.find((c) => {
          const titulo = (c.titulo || "").toLowerCase();
          const id = (c.idNombre || "").toLowerCase();

          const alias = [];
          if (id.includes("python")) alias.push("python", "py");
          if (id.includes("react")) alias.push("react", "reactjs");
          if (id.includes("html") || id.includes("css")) alias.push("html", "css", "html y css", "css y html");
          if (id.includes("c++") || id.includes("cpp")) alias.push("c++", "cpp");

          const coincideAlias = alias.some(a => q.includes(a));
          const coincideTitulo = titulo.includes(q);
          const coincideId = id.includes(q);

          return coincideAlias || coincideTitulo || coincideId;
        });
      }

      if (cursoEncontrado) {
        const destino = `${baseRuta}/detalle-general.html?name=${cursoEncontrado.idNombre}`;
        // Forzamos navegación (aunque ya estemos en detalle)
        window.location.assign(destino);
      } else {
        modalNoEncontrado?.showModal?.();
      }
    });

    botonCerrarModal?.addEventListener("click", () => modalNoEncontrado?.close());
  }
}
