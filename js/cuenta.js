import {    
    ERRORES,
    REGEXP,
    validarPorRegExp, 
    cambiarTextContent, 
    vaciarTextContent,
    mostrarElementoBlock
} from "./utilities.js";

import {
    getUsuarioLogueado,
    encontrarUsuario,
    guardarUsuarios,
    getUsuarios,
    getCursosDeUsuario,
    obtenerCursoPorId,
    getAvatarDelUsuarioLogueado
} from "./bbdd.js";

const FORM_PROFILE = document.getElementById("profile-form");
const DELETE_ACCOUNT_BTN = document.getElementById("delete-account");
const DELETE_ACCOUNT_MODAL = document.getElementById("delete-account-modal");
const DELETE_ACCOUNT_MODAL_BTN_YES = document.getElementById("delete-account-modal-yes");
const DELETE_ACCOUNT_MODAL_BTN_NO = document.getElementById("delete-account-modal-no");
const ALL_MAIN_SECTIONS = document.querySelectorAll("main section");
const COURSES_CONTAINER = document.querySelector("section.courses-list article.images-container")
const MSJ_DINAMICO = document.getElementById("mensaje-dinamico");

const profileName = document.getElementById("profile-name");
const profileLastName = document.getElementById("profile-last-name");
const profileEmail = document.getElementById("profile-email");
const profileCurrentPassword = document.getElementById("profile-current-password");
const profileNewPassword = document.getElementById("profile-new-password");
const profileRepeatNewPassword = document.getElementById("profile-repeat-password");
const profileUsername = document.getElementById("profile-username");

const avatarImg = document.getElementById("profile-avatar");
const nombreUsuarioEnModal = document.getElementById("delete-modal-account-username");

const GUARDAR_DATOS_MODAL = document.getElementById("save-data-modal");
const BOTON_DATOS_GUARDADOS = document.getElementById("save-data-confirm");

function inicializarAvatar(){
    let idAvatar = getAvatarDelUsuarioLogueado();
    const avatarBasePath = "../Assets/"
    avatarImg.src = avatarBasePath + "avatar" + idAvatar +".png";
}

function cargarCursos(){
    let nombreDeUsuarioActual = getUsuarioLogueado();
    let cursosDeUsuario = getCursosDeUsuario(nombreDeUsuarioActual);

    if ( !cursosDeUsuario[0] ) {
        return;
    }
    
    vaciarTextContent(COURSES_CONTAINER);

    cursosDeUsuario.forEach((cursoId) => {
        let cursoActual = obtenerCursoPorId(cursoId);
        
        let cursoUrl = "../pages/detalle-general?name=" + cursoActual.idNombre;

        let nuevoAnchor = document.createElement("a");
        nuevoAnchor.href = cursoUrl;

        let nuevaImagen = document.createElement("img");
        nuevaImagen.src = cursoActual.urlImagenPrincipal;
        nuevaImagen.alt = cursoActual.titulo;

        let nuevoParrafo = document.createElement("p");
        cambiarTextContent(nuevoParrafo, cursoActual.titulo)

        nuevoAnchor.appendChild(nuevaImagen);
        nuevoAnchor.appendChild(nuevoParrafo);

        COURSES_CONTAINER.appendChild(nuevoAnchor);
    });
}

function cargarDatosIniciales() {
    let usuarioActual = localStorage.getItem("usuarioLogueado");

    cambiarTextContent(nombreUsuarioEnModal, usuarioActual)

    if ( !usuarioActual ) {
        window.location.href = '../index.html';
        return;
    }

    const usuarioEncontrado = encontrarUsuario(usuarioActual);
    
    if ( !usuarioEncontrado ) {
        window.location.href = './login.html';
        return;
    }

    profileName.value = usuarioEncontrado.nombre;
    profileLastName.value = usuarioEncontrado.apellido;
    profileEmail.value = usuarioEncontrado.email;

    cambiarTextContent(profileUsername, usuarioEncontrado.nombreUsuario)

    cargarCursos();
}

function actualizarDatosDelUsuario(usuarioActual){
    let listaUsuarios = getUsuarios();

    if ( !listaUsuarios )
        return;

    const indiceUsuarioActual = listaUsuarios.findIndex(usuario => 
        usuario.nombreUsuario === usuarioActual
    );

    if ( indiceUsuarioActual < 0 )
        return false;

    listaUsuarios[indiceUsuarioActual].nombre = profileName.value;
    listaUsuarios[indiceUsuarioActual].apellido = profileLastName.value;
    listaUsuarios[indiceUsuarioActual].email = profileEmail.value;
    listaUsuarios[indiceUsuarioActual].contrasenia = profileNewPassword.value;

    guardarUsuarios(listaUsuarios);

    return true;
}

function mostrarError(mensajeError){
    cambiarTextContent(MSJ_DINAMICO, mensajeError);
}

function contraseniaActualCorrecta(){
    let contraseniaIngresada = profileCurrentPassword.value;

    let usuarioActual = getUsuarioLogueado();
    
    let datosUsuarioActual = encontrarUsuario(usuarioActual);

    if ( contraseniaIngresada === datosUsuarioActual.contrasenia )
        return true;

    return false;
}

function validarContrasenia(contrasenia){
    if (contrasenia.length < 8 || 
        !validarPorRegExp(contrasenia, REGEXP.MINIMO_UNA_MAYUS) ||
        !validarPorRegExp(contrasenia, REGEXP.MINIMO_UNA_MINUS) ||
        !validarPorRegExp(contrasenia, REGEXP.MINIMO_UN_NUMERO)) {
        
        return false;
    }

    return true;
}

function contraseniaDistintaALaAnterior(nuevaContrasenia){
    const usuarioActual = localStorage.getItem("usuarioLogueado");
    
    let datosUsuarioActual = encontrarUsuario(usuarioActual);

    if ( nuevaContrasenia === datosUsuarioActual.contrasenia ) {
        return false;
    }

    return true;
}

function guardarDatosDeCuenta(event){
    event.preventDefault();
    let usuarioActual = localStorage.getItem("usuarioLogueado");

    if ( !usuarioActual ) {
        window.location.href = '../index.html';
        return;
    }

    if( !contraseniaActualCorrecta() ) {
        mostrarError(ERRORES.CUENTA.CONTRASENIA_ACTUAL_INCORRECTA);
        return;
    }
    
    let contraseniaIngresada = profileNewPassword.value;

    if ( !validarContrasenia(contraseniaIngresada) ) {
        mostrarError(ERRORES.CUENTA.NUEVA_CONTRASENIA_INVALIDA);
        return;
    }

    let contraseniaRepetidaIngresada = profileRepeatNewPassword.value;

    if ( contraseniaIngresada !== contraseniaRepetidaIngresada ) {
        mostrarError(ERRORES.CUENTA.CONTRASENIAS_NUEVAS_NO_IGUALES);
        return;
    }

    if ( !contraseniaDistintaALaAnterior(contraseniaIngresada) ) {
        mostrarError(ERRORES.CUENTA.ERROR_CONTRASENIA_ANTIGUA);
        return;
    }
    
    if ( !actualizarDatosDelUsuario(usuarioActual) ) {
        mostrarError(ERRORES.CUENTA.ERROR_DESCONOCIDO);
        return;
    }
    
    vaciarTextContent(MSJ_DINAMICO);
    mostrarModal(GUARDAR_DATOS_MODAL);
    return;
}

function mostrarModalDeEliminarCuenta(){
    mostrarModal(DELETE_ACCOUNT_MODAL);
}

function mostrarModal(modal){
    mostrarElementoBlock(modal);

    ALL_MAIN_SECTIONS.forEach((section)=>{
        section.style.filter = "blur(2px)";
    });
}

function esconderModalDeEliminarCuenta(){
    esconderModal(DELETE_ACCOUNT_MODAL);
}

function esconderModalDatoGuardados(){
    esconderModal(GUARDAR_DATOS_MODAL);
    profileCurrentPassword.value = '';
    profileNewPassword.value = '';
    profileRepeatNewPassword.value = '';
}

function esconderModal(modal){
    modal.style.display = "none";

    ALL_MAIN_SECTIONS.forEach((section)=>{
        section.style.filter = "none";
    });
}

function eliminarCuenta(){
    let usuarioActual = localStorage.getItem("usuarioLogueado");

    if ( !usuarioActual )
        return;

    const listaUsuarios = getUsuarios();
    
    const indice = listaUsuarios.findIndex(usuario => 
        usuario.nombreUsuario === usuarioActual
    );

    if (indice > -1) {
        listaUsuarios.splice(indice, 1); 
        guardarUsuarios(listaUsuarios);
        localStorage.removeItem("usuarioLogueado");
        window.location.href = '../index.html';
    }
}

inicializarAvatar();    // Inicializamos el avatar elegido al registrarse
cargarDatosIniciales(); // Inicializamos los datos apenas cargue la página

FORM_PROFILE.addEventListener('submit', guardarDatosDeCuenta);

DELETE_ACCOUNT_BTN.addEventListener('click', mostrarModalDeEliminarCuenta);
DELETE_ACCOUNT_MODAL_BTN_YES.addEventListener('click', eliminarCuenta);
DELETE_ACCOUNT_MODAL_BTN_NO.addEventListener('click', esconderModalDeEliminarCuenta);
BOTON_DATOS_GUARDADOS.addEventListener('click', esconderModalDatoGuardados);

/*Cosas que debo agregar:
LISTO    1. Borrar cuenta (Modal con confirmación)
LISTO    2. Guardado de modificacion de datos (+validaciones)
         3. Array de cursos 
NTH      4. Posibilidades de avatares? Para acotar la modificacion de la imagen
*/