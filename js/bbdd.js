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
        titulo: "HTML & CSS Esenciales",
        idNombre: "html-css-inicial",
        docentes: [1],
        detalle: "Aprende los fundamentos de la estructura (HTML) y el diseño (CSS) de cualquier página web moderna.",
        requisitos: "Ninguno, ideal para empezar desde cero.",
        duracionSemanas: 3,
        nivel: "Inicial",
        precio: 49.99,
        urlLogo: "/assets/logos/html_css.png",
        urlImagenPrincipal: "/assets/imagenes/html_css_main.jpg",
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
        titulo: "React: Gestión de Estado y Rendimiento",
        idNombre: "react-avanzado",
        docentes: [1],
        detalle: "Domina los Hooks, el estado global con Redux/Context y la optimización de rendimiento en aplicaciones de React escalables.",
        requisitos: "Conocimiento intermedio de JavaScript y React.",
        duracionSemanas: 8,
        nivel: "Avanzado",
        precio: 199.99,
        urlLogo: "/assets/logos/react_logo.png",
        urlImagenPrincipal: "/assets/imagenes/react_main.jpg",
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
        titulo: "C++ Esencial y POO",
        idNombre: "cpp-intermedio",
        docentes: [2],
        detalle: "Aprende los fundamentos de C++, manejo de memoria básico y la implementación de Programación Orientada a Objetos.",
        requisitos: "Conocimiento de programación estructurada.",
        duracionSemanas: 9,
        nivel: "Intermedio",
        precio: 150.00,
        urlLogo: "/assets/logos/cpp_logo.png",
        urlImagenPrincipal: "/assets/imagenes/cpp_main.jpg",
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
        nombreCompleto: "Roberto Gómez",
        calificacion: 4,
        detalle: "Ingeniero de software con profundo conocimiento en lenguajes de bajo nivel como C++ y en sistemas operativos.",
        trayectoria: "Trabajó en la industria de videojuegos y tiene experiencia en optimización de código y algoritmos complejos.",
        urlImagen: "/assets/docentes/roberto_gomez.jpg"
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
        detalle: "Especialista en desarrollo frontend con más de 8 años de experiencia. Experta en tecnologías web y performance.",
        trayectoria: "Lideró el equipo de frontend en una startup de tecnología educativa y ha dictado más de 50 bootcamps.",
        urlImagen: "/assets/docentes/lucia_fernandez.jpg"
    },
    {
        id: 6,
        nombreCompleto: "Roberto Gómez",
        calificacion: 4,
        detalle: "Ingeniero de software con profundo conocimiento en lenguajes de bajo nivel como C++ y en sistemas operativos.",
        trayectoria: "Trabajó en la industria de videojuegos y tiene experiencia en optimización de código y algoritmos complejos.",
        urlImagen: "/assets/docentes/roberto_gomez.jpg"
    }
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

function getUsuarios() {
    const usuariosJSON = localStorage.getItem('usuarios');
    if (usuariosJSON) {
        return JSON.parse(usuariosJSON);
    } else {
        return [];
    }
}

export function guardarUsuarios(listaUsuarios) {
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
}

export function getUsuarioLogueado() {
    return localStorage.getItem('usuarioLogueado');
}

export function setUsuarioLogueado(username) {
    localStorage.setItem('usuarioLogueado', username);
}

export function removerUsuarioLogueado() {
    localStorage.removeItem('usuarioLogueado');
}