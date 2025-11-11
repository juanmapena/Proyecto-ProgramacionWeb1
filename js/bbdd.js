const cursos = [
    {
        id: 1,
        titulo: "JavaScript",
        idNombre: "curso-js",            
        docentes: [1],                   
        detalle: "Aprende a programar en JavaScript, el lenguaje esencial para el desarrollo web, con proyectos prácticos e interacciones de DOM.",
        requisitos: "Conocimientos básicos de informática y HTML/CSS.",
        duracionSemanas: 12,
        nivel: "Inicial",
        precio: 150.0,
        urlLogo: "../assets/logo_javascript_home.jpg",
        urlImagenPrincipal: "../assets/logo-javascript.jpg",
        contenido: [
        { unidad: 1, tituloUnidad: "Introducción a JavaScript", temas: ["Historia y uso", "Variables y tipos", "Primer script"] },
        { unidad: 2, tituloUnidad: "Operadores y Condicionales", temas: ["Operadores aritméticos/lógicos", "If/else", "Buenas prácticas"] },
        { unidad: 3, tituloUnidad: "Bucles y Arrays", temas: ["for / while / for...of", "Métodos de arrays", "Ejercicios guiados"] },
        { unidad: 4, tituloUnidad: "Funciones y DOM", temas: ["Funciones y scope", "Eventos", "Manipulación del DOM"] },
        { unidad: 5, tituloUnidad: "Asincronía", temas: ["Callbacks", "Promesas", "async/await"] },
        { unidad: 6, tituloUnidad: "Proyecto Final", temas: ["Página interactiva", "Organización del código", "Presentación"] }
        ]
    },
    {
        id: 2,
        titulo: "Java",
        idNombre: "curso-java",
        docentes: [3],                   
        detalle: "Aprende Java desde cero hasta Programación Orientada a Objetos con ejercicios y mini proyectos.",
        requisitos: "Conocimientos básicos de programación.",
        duracionSemanas: 10,
        nivel: "Inicial",
        precio: 110.0,
        urlLogo: "../assets/logo_java.jpg",
        urlImagenPrincipal: "../assets/java_detalle.jpg",
        contenido: [
        { unidad: 1, tituloUnidad: "Introducción y Entorno", temas: ["JDK/IDE", "Hola Mundo", "Tipos primitivos"] },
        { unidad: 2, tituloUnidad: "Control de Flujo", temas: ["if/else/switch", "for/while", "Ejercicios prácticos"] },
        { unidad: 3, tituloUnidad: "Colecciones", temas: ["Arrays", "ArrayList/HashMap", "Iteraciones"] },
        { unidad: 4, tituloUnidad: "POO en Java", temas: ["Clases y objetos", "Encapsulamiento", "Relaciones"] },
        { unidad: 5, tituloUnidad: "Archivos y Excepciones", temas: ["I/O básico", "try/catch", "Buenas prácticas"] },
        { unidad: 6, tituloUnidad: "Proyecto Final", temas: ["App simple con OOP", "Presentación", "Feedback"] }
        ]
    },
    {
        id: 3,
        titulo: "Python",
        idNombre: "curso-python",
        docentes: [4],                   
        detalle: "Aprende los fundamentos de Python con ejemplos prácticos para automatización, scripts y ciencia de datos básica.",
        requisitos: "Ganas de aprender.",
        duracionSemanas: 6,
        nivel: "Inicial",
        precio: 120.0,
        urlLogo: "../assets/logo_phyton_home.jpg",
        urlImagenPrincipal: "../assets/python-imagen.jpg",
        contenido: [
        { unidad: 1, tituloUnidad: "Sintaxis y Tipos", temas: ["Números y strings", "Entrada/Salida", "Condicionales"] },
        { unidad: 2, tituloUnidad: "Estructuras y Bucles", temas: ["Listas/Tuplas/Dict", "for/while", "Ejercicios"] },
        { unidad: 3, tituloUnidad: "Funciones", temas: ["Parámetros y retorno", "Alcance", "Buenas prácticas"] },
        { unidad: 4, tituloUnidad: "Módulos y Archivos", temas: ["import", "Lectura/Escritura", "CSV simple"] },
        { unidad: 5, tituloUnidad: "Errores y Testing", temas: ["try/except", "assert", "Casos de prueba"] },
        { unidad: 6, tituloUnidad: "Proyecto Final", temas: ["Script útil", "Refactor", "Presentación"] }
        ]
    },
    {
        id: 4,
        titulo: "HTML & CSS",
        idNombre: "html-css-inicial",
        docentes: [5],
        detalle: "Aprende los fundamentos de la estructura (HTML) y el diseño (CSS) de cualquier página web moderna.",
        requisitos: "Ninguno, ideal para empezar desde cero.",
        duracionSemanas: 3,
        nivel: "Inicial",
        precio: 49.99,
        urlLogo: "../assets/html-css-pngg.png",
        urlImagenPrincipal: "../assets/html-css-pngg.png",
        contenido: [
            {
                unidad: 1,
                tituloUnidad: "Estructura Web con HTML5",
                temas: ["Etiquetas semánticas", "Formularios y accesibilidad", "Enlaces e imágenes"]
            },
            {
                unidad: 2,
                tituloUnidad: "Estilizado con CSS3",
                temas: ["Selectores, herencia y cascada", "Modelo de caja (Box Model)", "Introducción a Flexbox"]
            }
        ]
    },
    {
        id: 5,
        titulo: "React",
        idNombre: "react-avanzado",
        docentes: [6],
        detalle: "Domina los Hooks, el estado global con Redux/Context y la optimización de rendimiento en aplicaciones de React escalables.",
        requisitos: "Conocimiento intermedio de JavaScript y React.",
        duracionSemanas: 8,
        nivel: "Avanzado",
        precio: 199.99,
        urlLogo: "../assets/react.png",
        urlImagenPrincipal: "../assets/react.png",
        contenido: [
            {
                unidad: 1,
                tituloUnidad: "Hooks Avanzados",
                temas: ["`useReducer` para estado complejo", "Creación de *Custom Hooks*", "Memorización con `useMemo` y `useCallback`"]
            },
            {
                unidad: 2,
                tituloUnidad: "Estado Global y Rutas",
                temas: ["Context API", "Introducción a Redux", "React Router v6"]
            }
        ]
    },
    {
        id: 6,
        titulo: "C++",
        idNombre: "cpp-intermedio",
        docentes: [2],
        detalle: "Aprende los fundamentos de C++, manejo de memoria básico y la implementación de Programación Orientada a Objetos.",
        requisitos: "Conocimiento de programación estructurada.",
        duracionSemanas: 9,
        nivel: "Intermedio",
        precio: 150.00,
        urlLogo: "../assets/c+.png",
        urlImagenPrincipal: "../assets/c+.png",
        contenido: [
            {
                unidad: 1,
                tituloUnidad: "Clases y Objetos en C++",
                temas: ["Conceptos de Clases", "Destructores y Constructores", "Herencia y Polimorfismo"]
            },
            {
                unidad: 2,
                tituloUnidad: "Manejo Básico de Memoria",
                temas: ["Punteros", "Referencias", "Asignación dinámica con `new` y `delete`"]
            }
        ]
    }
];

const docentes = [
    {
        id: 1,
        nombreCompleto: "Roberto Perez",
        calificacion: 5,
        detalle: "Con más de 7 años de experiencia en desarrollo web, Roberto se especializa en JavaScript, tanto en el lado del cliente como en el servidor. Ha impartido cursos en universidades y plataformas online, enseñando desde los fundamentos del lenguaje hasta frameworks modernos como React y Node.js. Apasionado por la creación de aplicaciones dinámicas e interactivas, utiliza proyectos prácticos para que los estudiantes adquieran experiencia real en el desarrollo web.",
        trayectoria: "Inició su carrera como desarrollador frontend en una agencia digital, donde trabajó en proyectos de diseño y programación de sitios web interactivos. Posteriormente, se desempeñó como desarrollador fullstack en empresas tecnológicas, aplicando JavaScript junto con herramientas como Express y MongoDB. Paralelamente, comenzó a dar clases de JavaScript en academias de programación y bootcamps, formando a cientos de estudiantes en tecnologías web modernas. Actualmente, combina la enseñanza con el desarrollo freelance de aplicaciones web y móviles.",
        urlImagen: "../assets/profesor_div.jpg" 
    },
    {
    id: 2,
    nombreCompleto: "Ariel Pereira",
    calificacion: 4,
    detalle: "Ingeniero de software con más de 10 años de experiencia en programación de sistemas y desarrollo con C++. Especialista en optimización de código, estructuras de datos, manejo de memoria y arquitectura de software. Combina la enseñanza con proyectos técnicos en entornos de alto rendimiento.",
    trayectoria: "Ariel inició su carrera en la industria de los videojuegos, donde se especializó en el uso de C++ para el desarrollo de motores gráficos y algoritmos de física. Más tarde trabajó en empresas tecnológicas dedicadas a la ingeniería de software y sistemas embebidos, liderando equipos de desarrollo en proyectos de tiempo real y simulación. Actualmente, se dedica a la docencia y mentoría de estudiantes interesados en la programación de bajo nivel, fomentando el pensamiento lógico, la eficiencia y las buenas prácticas de programación en C++.",
    urlImagen: "../assets/profesor-c++.jpg"
},
    {
        id: 3,
        nombreCompleto: "Tomás Urquiza",
        calificacion: 3,
        detalle: "Con más de 10 años de experiencia en programación, Tomás se especializa en Java, con un enfoque en aplicaciones empresariales, móviles y de escritorio. Ha impartido cursos en universidades y academias de tecnología, enseñando desde los fundamentos del lenguaje hasta temas avanzados como programación orientada a objetos, bases de datos y desarrollo con frameworks como Spring y Hibernate. Apasionado por la enseñanza práctica, guía a sus estudiantes a construir proyectos reales que fortalecen su perfil profesional.",    
        trayectoria: "Inició su carrera como desarrollador backend en una consultora de software, trabajando en proyectos de sistemas de gestión y aplicaciones financieras. Más tarde, se incorporó en empresas internacionales como ingeniero de software, desarrollando soluciones escalables en Java y optimizando procesos con bases de datos relacionales. Paralelamente, comenzó a dar clases en cursos presenciales y online, formando a cientos de estudiantes en Java y sus principales herramientas. Actualmente, combina su labor docente con proyectos freelance en desarrollo de APIs, microservicios y aplicaciones móviles en Android.",
        urlImagen: "../assets/profesor_java.jpg"
    },
    {
        id: 4,
        nombreCompleto: "Jorge Medina",
        calificacion: 5,
        detalle: "Con más de 8 años de experiencia enseñando programación, Roberto se especializa en Python para desarrollo web, automatización y ciencia de datos. Ha dictado cursos en universidades, plataformas online y empresas tecnológicas, guiando a cientos de estudiantes a dominar desde los fundamentos hasta temas avanzados como APIs, scraping, testing y visualización de datos. Apasionado por la enseñanza práctica, utiliza ejemplos del mundo.",
        trayectoria: "Inició su carrera como desarrollador backend en una startup de tecnología educativa, donde descubrió su pasión por Python. Más tarde, se desempeñó como ingeniero de software en empresas del sector financiero, utilizando Python para automatizar procesos y analizar grandes volúmenes de datos. Paralelamente, comenzó a dictar cursos en universidades y plataformas de educación online, donde ha formado a más de 1.000 estudiantes. Actualmente, se dedica a la enseñanza a tiempo completo y al desarrollo de proyectos freelance en análisis de datos, machine learning y automatización con Python.",
        urlImagen: "../assets/profesor_python_nuevo.jpg"
    },
{
    id: 5,
    nombreCompleto: "Lucía Fernández",
    calificacion: 5,
    detalle: "Desarrolladora frontend con más de 8 años de experiencia creando interfaces atractivas, accesibles y optimizadas. Especialista en HTML5, CSS3 y metodologías modernas de diseño responsivo, combina la estética con la funcionalidad para lograr experiencias web de alto impacto.",
    trayectoria: "Lucía inició su carrera en agencias de diseño digital, donde trabajó en la maquetación y optimización de sitios para marcas reconocidas. Luego lideró el equipo frontend de una startup de tecnología educativa, donde implementó buenas prácticas de accesibilidad y performance web. Además, ha dictado más de 50 bootcamps y talleres de HTML, CSS y diseño responsivo, formando a nuevos desarrolladores en fundamentos sólidos del desarrollo web.",
    urlImagen: "../assets/profesora-html.jpg"
},
{
    id: 6,
    nombreCompleto: "Juan Gómez",
    calificacion: 5,
    detalle: "Ingeniero de software especializado en desarrollo frontend con React, con más de 6 años de experiencia en la creación de aplicaciones SPA escalables y de alto rendimiento. Experto en el uso de Hooks, Context API, Redux y buenas prácticas de arquitectura en React.",
    trayectoria: "Comenzó su carrera como desarrollador web construyendo interfaces interactivas con JavaScript y React. Participó en proyectos internacionales enfocados en la optimización del rendimiento y la experiencia de usuario. Actualmente trabaja como desarrollador senior en una empresa de software, donde lidera el desarrollo de aplicaciones en React, capacita a equipos nuevos en el uso de librerías modernas y dicta cursos sobre React y JavaScript avanzado.",
    urlImagen: "../assets/profesor-react.jpg"
},
];

export function obtenerDocentePorId(id) {
    return docentes.find(doc => doc.id === id);
}

export function obtenerTodosLosCursos() {
    return cursos.slice();
}

export function obtenerCursoPorId(id) {
    const idNumerico = parseInt(id, 10);
    return cursos.find(curso => curso.id === idNumerico);
}

export function obtenerCursoPorIdNombre(idNombre) {
    return cursos.find(curso => curso.idNombre === idNombre);
}

export function getNombreDocenteDeCurso(cursoId) {
    const curso = cursos.find(c => c.id === cursoId);
    if (curso && curso.docentes.length > 0) {
        const docenteId = curso.docentes[0];
        const docente = obtenerDocentePorId(docenteId);
        return docente ? docente.nombreCompleto : "Docente no asignado";
    }
    return "Docente no encontrado";
}

// FUNCIONES DEL localStorage --------------------------------------------

export function getUsuarios() {
    const usuariosJSON = localStorage.getItem('usuarios');
    if (usuariosJSON) {
        return JSON.parse(usuariosJSON);
    } else {
        return [];
    }
}

export function existeUsuario(nombreDeUsuario, email) {
    const listaUsuarios = getUsuarios();
    let existeUsuario = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        const usuarioActual = listaUsuarios[i]; 

        if ( usuarioActual.nombreUsuario === nombreDeUsuario || usuarioActual.email === email ) {
            existeUsuario = true;
            break;
        }
    }

    return existeUsuario;
}

export function guardarNuevoUsuario(nuevoUsuario){
    let nuevaListaDeUsuarios = getUsuarios();
    nuevaListaDeUsuarios.push(nuevoUsuario);
    guardarUsuarios(nuevaListaDeUsuarios);
}

export function guardarUsuarios(listaUsuarios) {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

export function getUsuarioLogueado() {
    return localStorage.getItem('usuarioLogueado');
}

export function getDatosDeUsuarioLogueado(){
    return encontrarUsuario(getUsuarioLogueado());
}

export function getCursosDeUsuario(nombreDeUsuario){
    let usuario = encontrarUsuario(nombreDeUsuario);

    return usuario.cursosComprados;
}

export function encontrarUsuario(usuarioIngresado){
    const listaUsuarios = getUsuarios();
    const usuarioEncontrado = listaUsuarios.find(usuario => usuario.nombreUsuario === usuarioIngresado);

    return usuarioEncontrado;
}

export function setUsuarioLogueado(username) {
    localStorage.setItem('usuarioLogueado', username);
}

export function removerUsuarioLogueado() {
    localStorage.removeItem('usuarioLogueado');
}

export function obtenerContadorDelCarrito(){
    const nombreDeUsuario= getUsuarioLogueado();

    if(!nombreDeUsuario){
        return 0;
    }

    const usuario=encontrarUsuario(nombreDeUsuario);

    return usuario.carrito.length;
}