//1. leer los input: Nombre, apellido, email, usuario, contraseña
//2. Si usuario existe, "usuario existente".
//3. Si no existe el usuario, validar campos:
// nombre (cantidad de letras) Apellido(cantidad de letras) 
// Email(@) Usuario(Sin espacios, que no se parezca a otro) Contraseña(8 caracteres: 1mayus,1numero,1 simbolo)

import {    
    ERRORES,
    REGEXP,
    COLORES_CSS as COLORES,
    validarPorRegExp, 
    cambiarTextContent, 
    vaciarTextContent, 
    cambiarColorDeFuente,
    redirigir
} from "./utilities.js";

import {
    guardarNuevoUsuario,
    existeUsuario
} from "./bbdd.js";


const FORM_REGISTRO = document.getElementById('registro-form');
const MSJ_DINAMICO = document.getElementById('mensaje-dinamico');
const TODOS_RADIO_INPUT_AVATAR = document.querySelectorAll('#registro-form input.avatar-input');
const TODAS_IMAGENES_AVATAR = document.querySelectorAll('#registro-form img.avatar-img');

const inputNombre = document.getElementById('nombre');
const inputApellido = document.getElementById('apellido');
const inputEmail = document.getElementById('email');
const inputNombreUsuario= document.getElementById('nombre-usuario');
const inputContrasenia= document.getElementById('password');
const inputRepetirContrasenia = document.getElementById('repeat-password');

const errorNombre = document.getElementById('nombre-error');
const errorApellido = document.getElementById('apellido-error');
const errorEmail = document.getElementById('email-error');
const errorNombreUsuario = document.getElementById('nombre-usuario-error');
const errorContrasenia = document.getElementById('password-error');
const errorRepetirContrasenia = document.getElementById('repeat-password-error');

const todosLosErrores = [
    errorNombre, errorApellido, errorEmail, errorNombreUsuario, 
    errorContrasenia, errorRepetirContrasenia, MSJ_DINAMICO
];

const LOGIN_URL = './login.html';

function limpiarMensajesError() {
    todosLosErrores.forEach(error => {
        if (error) {
            vaciarTextContent(error);
        }
    });
}

function controlRegistro(event){
    event.preventDefault();
    limpiarMensajesError();
    vaciarTextContent(MSJ_DINAMICO);

    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const email = inputEmail.value.trim();
    const nombreUsuario= inputNombreUsuario.value.trim();
    const contrasenia= inputContrasenia.value.trim();
    const repetirContrasenia = inputRepetirContrasenia.value.trim();

    if(!nombre || !apellido || !email || !nombreUsuario || !contrasenia){
        cambiarColorDeFuente(MSJ_DINAMICO, COLORES.ROJO);
        cambiarTextContent(MSJ_DINAMICO, ERRORES.REGISTRO.TODOS_LOS_CAMPOS_REQUERIDOS);
        return;
    }

    if (contrasenia != repetirContrasenia){
        cambiarTextContent(errorRepetirContrasenia, ERRORES.REGISTRO.CONTRASENIAS_NO_COINCIDEN)
        return;
    }

    if (!validarPorRegExp(nombre, REGEXP.SOLO_LETRAS_Y_ESPACIOS) || nombre.length < 2 || nombre.length > 50) {
        cambiarTextContent(errorNombre, ERRORES.REGISTRO.SOLO_LETRAS_Y_MINIMO_DOS_CARACTERES);
        return;
    }

    if (!validarPorRegExp(apellido, REGEXP.SOLO_LETRAS_Y_ESPACIOS) || apellido.length < 2 || apellido.length > 50) {
        cambiarTextContent(errorApellido, ERRORES.REGISTRO.SOLO_LETRAS_Y_MINIMO_DOS_CARACTERES);
        return;
    }

    if (!validarPorRegExp(nombreUsuario, REGEXP.USUARIO) || nombreUsuario.length < 4) {
        cambiarTextContent(errorNombreUsuario, ERRORES.REGISTRO.SOLO_CUATRO_CARACTERES_LETRAS_Y_NUMERO);
        return;
    }

    if (!validarPorRegExp(email, REGEXP.EMAIL)) {
        cambiarTextContent(errorEmail, ERRORES.REGISTRO.EMAIL_ERRONEO)
        return;
    }
    
    if (contrasenia.length < 8 || 
        !validarPorRegExp(contrasenia, REGEXP.MINIMO_UNA_MAYUS) ||
        !validarPorRegExp(contrasenia, REGEXP.MINIMO_UNA_MINUS) ||
        !validarPorRegExp(contrasenia, REGEXP.MINIMO_UN_NUMERO)) {
        
        cambiarTextContent(errorContrasenia, ERRORES.REGISTRO.CONTRASENIA_INVALIDA);
        return;
    }

    if( existeUsuario(nombreUsuario, email) ){
        cambiarColorDeFuente(MSJ_DINAMICO, COLORES.ROJO);
        cambiarTextContent(MSJ_DINAMICO, ERRORES.REGISTRO.USUARIO_YA_REGISTRADO);
        return;
    }

    const AVATAR_RADIO_BTN_SELECTED = document.querySelector('input[name="avatar"]:checked');

    const nuevoUsuario = {
        nombre,
        apellido,
        email,
        nombreUsuario,         // Username o nick
        contrasenia,
        avatar: AVATAR_RADIO_BTN_SELECTED && AVATAR_RADIO_BTN_SELECTED.value ? AVATAR_RADIO_BTN_SELECTED.value : 1,
        carrito: [],           // Cursos en el carrito (todavía no fueron comprados)
        cursosComprados: []    // Cursos que ya fueron comprados (el cliente ya es dueño)
    }
    
    guardarNuevoUsuario(nuevoUsuario);

    cambiarColorDeFuente(MSJ_DINAMICO, COLORES.VERDE);
    cambiarTextContent(MSJ_DINAMICO, ERRORES.REGISTRO.REGISTRO_EXITOSO);

    setTimeout(()=>{
        redirigir(LOGIN_URL);
    }, 1500);
}

function elegirAvatar(elem){    
    TODAS_IMAGENES_AVATAR.forEach((img)=>{ 
        img.classList.remove('selected-avatar');
    });

    elem.target.classList.add('selected-avatar')
}

function inicializarAvatares(){
    TODAS_IMAGENES_AVATAR.forEach((img)=>{ 
        img.addEventListener('click', elegirAvatar);
    });
}

inicializarAvatares();

FORM_REGISTRO.addEventListener('submit', controlRegistro);