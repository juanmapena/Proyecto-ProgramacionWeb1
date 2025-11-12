import { obtenerTodosLosCursos } from "../js/bbdd.js";

export class Calendario {
  constructor() {
    this.calendarioContainer = document.querySelector(".calendario-fechas");
  }

  render() {
    
    if (!this.calendarioContainer) return;
	
    const cursos = obtenerTodosLosCursos();
    console.log(obtenerTodosLosCursos)
    const fechasCursos = {
      9: cursos.find(c => c.titulo == "Python"),
      17: cursos.find(c => c.titulo == "Java" ),
      23: cursos.find(c => c.titulo == "JavaScript"),
      29: cursos.find(c => c.titulo.includes("HTML")),
    };

    const fechas = this.calendarioContainer.querySelectorAll(".fecha");

    fechas.forEach((fechaLi) => {
      const dia = parseInt(fechaLi.querySelector("h5").textContent);
      const curso = fechasCursos[dia];

      if (curso) {
        const p = document.createElement("p");
        p.textContent = curso.titulo;
        p.classList.add("curso-en-dia");
        fechaLi.querySelector(".fecha-info").appendChild(p);

        fechaLi.classList.add("fecha-con-curso");
        fechaLi.addEventListener("click", () => this.mostrarDialog(curso));
      }
    });
  }

  mostrarDialog(curso) {
    const dialog = document.getElementById("curso-dialog");
    const title = document.getElementById("dialog-title");
    const nivel = document.getElementById("dialog-nivel");
    const duracion = document.getElementById("dialog-duracion");
    const detalleBtn = document.getElementById("dialog-detalle");
    const cerrarBtn = document.getElementById("dialog-cerrar");

    title.textContent = curso.titulo;
    nivel.textContent = curso.nivel;
    duracion.textContent = curso.duracionSemanas;

    dialog.showModal();

    detalleBtn.onclick = () => {
      window.location.href = `./detalle-general.html?name=${curso.idNombre}`;
    };

    cerrarBtn.onclick = () => dialog.close();

    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });

  }
}