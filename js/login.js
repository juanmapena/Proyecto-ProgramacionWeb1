


import { ERRORES, cambiarTextContent, redirigir } from "./utilities.js";
import { encontrarUsuario, setUsuarioLogueado } from "./bbdd.js";

const RUTA_HOME = '../index.html';

const loginForm = document.getElementById('login-form');
const inputUsuario = document.getElementById('name');
const inputContrasenia = document.getElementById('password');
const mensajeError = document.getElementById('login-error');

function mostrarError(error){
    cambiarTextContent(mensajeError, error);
}

function controlLogin(event) {
    event.preventDefault();

    let usuarioIngresado = inputUsuario.value;
    let contraseniaEncontrada = inputContrasenia.value;

    if( !usuarioIngresado || !contraseniaEncontrada ) {
        mostrarError(ERRORES.REGISTRO.TODOS_LOS_CAMPOS_REQUERIDOS);
        return;
    }

    const usuarioEncontrado = encontrarUsuario(usuarioIngresado);

    if (!usuarioEncontrado) {
        mostrarError(ERRORES.LOGIN.USUARIO_O_CONTRASENIA_INVALIDOS);
        return;
    }
    
    if (usuarioEncontrado.contrasenia === contraseniaEncontrada) {
        setUsuarioLogueado(usuarioEncontrado.nombreUsuario);
        redirigir(RUTA_HOME);
    } else {
        mostrarError(ERRORES.LOGIN.USUARIO_O_CONTRASENIA_INVALIDOS);
    }
}

loginForm.addEventListener('submit', controlLogin);