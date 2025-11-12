import { vaciarTextContent, cambiarTextContent } from "./utilities.js";
import { getUsuarioLogueado, getDatosDeUsuarioLogueado, getCursosDeUsuario, obtenerCursoPorId } from "./bbdd.js";

const tituloContainer = document.getElementById('welcome-title-container');
const titulo = document.getElementById('welcome-title');
const subtitulo = document.getElementById('welcome-subtitle');
const tagline = document.getElementById('welcome-tagline');
const coursesSection = document.getElementById('steps_section');

function personalizarBienvenida(nombreUsuario) {
    subtitulo.textContent = `¡Bienvenido/a de vuelta!`;
    titulo.textContent = `${nombreUsuario}`;
    tagline.textContent = `¡Qué bueno volver a verte! ¿Qué vas a aprender hoy?`;
    
    const avatarBasePath = "./assets/"

    let usuarioActual = getDatosDeUsuarioLogueado();
    let avatarImgRuta = avatarBasePath + "avatar" + usuarioActual.avatar +".png";

    let avatarImg = document.createElement('img');
    avatarImg.src = avatarImgRuta;
    avatarImg.alt = "Avatar del usuario";
    avatarImg.id = "welcome-avatar";

    tituloContainer.insertBefore(avatarImg, titulo);
}

function inicializarMisCursos(nombreDeUsuario){
    coursesSection.innerHTML = `
        <section id="courses-list" class="courses-list">
            <article>
                <h1>Mis cursos</h1>
            </article>
            <article class="images-container"><a href="../pages/detalle-general.html?name=curso-js">
            </article>
        </section>
    `;

    let courses_container = document.querySelector("section.courses-list article.images-container");

    let cursosDeUsuario = getCursosDeUsuario(nombreDeUsuario);
    const cursosSinGiftcard = cursosDeUsuario.filter((curso) => {return curso.id < 7;});

    if ( !cursosSinGiftcard || !cursosSinGiftcard[0] ) {
        let nuevoParrafo = document.createElement("h2");
        cambiarTextContent(nuevoParrafo, "¡Todavía no te inscribiste a ningún curso!");
        nuevoParrafo.id = "article-cursos-vacio";
        
        let articleCursos = document.querySelector("section#courses-list article");
        articleCursos.appendChild(nuevoParrafo);
        return;
    }
    
    vaciarTextContent(courses_container);

    let idCursosAgregados = [];

    cursosDeUsuario.forEach((curso) => {
        let cursoId = curso.id;
        
        if(cursoId > 6 || idCursosAgregados.includes(cursoId)) {
            return;
        }

        idCursosAgregados.push(cursoId);

        let cursoActual = obtenerCursoPorId(cursoId);
        
        let cursoUrl = "./pages/detalle-general.html?name=" + cursoActual.idNombre;

        let nuevoAnchor = document.createElement("a");
        nuevoAnchor.href = cursoUrl;

        let nuevaImagen = document.createElement("img");
        nuevaImagen.src = cursoActual.urlImagenPrincipal;
        nuevaImagen.alt = cursoActual.titulo;

        let nuevoParrafo = document.createElement("p");
        cambiarTextContent(nuevoParrafo, cursoActual.titulo)

        nuevoAnchor.appendChild(nuevaImagen);
        nuevoAnchor.appendChild(nuevoParrafo);

        courses_container.appendChild(nuevoAnchor);
    });
}

function inicializarHome() {
    const nombreDeUsuario = getUsuarioLogueado();

    if ( !getUsuarioLogueado() )
        return;

    personalizarBienvenida(nombreDeUsuario);
    inicializarMisCursos(nombreDeUsuario);
}

inicializarHome();