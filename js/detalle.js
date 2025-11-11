// detalle.js
import {
  obtenerCursoPorIdNombre,
  obtenerTodosLosCursos,
  obtenerDocentePorId,
} from "./bbdd.js";

export class Detalle {
  constructor() {}

  render() {
    // Ya estamos siendo llamados después de DOMContentLoaded
    const main = document.getElementById("main_detalle");
    if (!main) return;

    const params = new URLSearchParams(window.location.search);
    const idNombre = params.get("name"); // ej: curso-java

    const curso = idNombre ? obtenerCursoPorIdNombre(idNombre) : null;

    if (!curso) {
      // Modal “no encontrado”
      const dlg = document.getElementById("exito-modal");
      if (dlg?.showModal) {
        const t = dlg.querySelector(".modal-title");
        const b = dlg.querySelector(".modal-body");
        if (t) t.textContent = "No se encontró ningún curso con ese nombre";
        if (b) {
          b.insertAdjacentHTML(
            "beforeend",
            "<p style='margin-top:.5rem'>Probá con: JavaScript, Python, HTML, CSS, Java, C++ o React.</p>"
          );
        }
        dlg.showModal();
        document.getElementById("modal-exito-aceptar")?.addEventListener("click", () => dlg.close());
      }

      main.insertAdjacentHTML(
        "afterbegin",
        `<section style="padding:2rem 1rem;text-align:center">
          <h2>No se encontró contenido para: <em>${idNombre ?? "(sin parámetro)"}</em></h2>
        </section>`
      );
      return;
    }

    // ====== Cabecera del curso ======
    const $img     = document.getElementById("curso-imagen");
    const $titulo  = document.getElementById("curso-titulo");
    const $precio  = document.getElementById("curso-precio");
    const $nivel   = document.getElementById("curso-nivel");
    const $dur     = document.getElementById("curso-duracion");
    const $detalle = document.getElementById("curso-detalle");
    const $req     = document.getElementById("curso-requisitos");

    if ($img)    { $img.src = curso.urlImagenPrincipal; $img.alt = curso.titulo; }
    if ($titulo) { $titulo.textContent = curso.titulo; }
    if ($precio) { $precio.textContent = Number(curso.precio).toFixed(2); }
    if ($nivel)  { $nivel.textContent  = curso.nivel; }
    if ($dur)    { $dur.textContent    = curso.duracionSemanas; }
    if ($detalle){ $detalle.textContent = curso.detalle; }
    if ($req)    { $req.textContent     = curso.requisitos; }

    // ====== Contenidos ======
    const $contenidos = document.getElementById("contenidos-lista");
    if ($contenidos) {
      $contenidos.innerHTML = (curso.contenido || [])
        .map(u => `
          <details class="details">
            <summary class="summary">Unidad ${u.unidad}: ${u.tituloUnidad}</summary>
            ${(u.temas || []).map(t => `<p>• ${t}</p>`).join("")}
          </details>
        `)
        .join("");
    }

    // ====== Docente principal ======
    const docenteId = (curso.docentes && curso.docentes[0]) || null;
    const docente = docenteId ? obtenerDocentePorId(docenteId) : null;

    const $docImg   = document.getElementById("docente-imagen");
    const $docNom   = document.getElementById("docente-nombre");
    const $docCal   = document.getElementById("docente-calificacion");
    const $docDet   = document.getElementById("docente-detalle");
    const $docTray  = document.getElementById("docente-trayectoria");

    const estrellas = (n = 0) =>
      "★".repeat(Math.max(0, Math.min(5, n))) +
      "☆".repeat(5 - Math.max(0, Math.min(5, n)));

    if ($docImg)  { $docImg.src = docente?.urlImagen || "../assets/profesor_div.jpg"; }
    if ($docImg)  { $docImg.alt = docente ? `Docente ${docente.nombreCompleto}` : "Docente por confirmar"; }
    if ($docNom)  { $docNom.textContent = docente?.nombreCompleto || "Docente por confirmar"; }
    if ($docCal)  { $docCal.textContent = estrellas(docente?.calificacion || 0); }
    if ($docDet)  { $docDet.textContent = docente?.detalle || "Pronto compartiremos más información sobre el docente."; }
    if ($docTray) { $docTray.textContent = docente?.trayectoria || ""; }

    // ====== Otros cursos (muestra 2 de los 3 principales, evitando el actual) ======
    const $otros = document.getElementById("otros-cursos");
    if ($otros) {
      const mainIds = new Set(["curso-js", "curso-java", "curso-python"]);
      const otros = obtenerTodosLosCursos()
        .filter(c => mainIds.has(c.idNombre) && c.id !== curso.id)
        .slice(0, 2);

      $otros.innerHTML = otros.map(c => `
        <a href="./detalle-general.html?name=${c.idNombre}">
          <div class="card_detalle">
            <img class="card-imagenes" src="${c.urlLogo}" alt="Logo ${c.titulo}">
            <p id="nombre-curso"><strong>${c.titulo}</strong></p>
            <p id="duracion-curso"><strong>Duración:</strong> ${c.duracionSemanas} semanas</p>
          </div>
        </a>
      `).join("");
    }
  }
}
