


import { ERRORES, cambiarTextContent, redirigir } from "./utilities.js";
import { encontrarUsuario, setUsuarioLogueado } from "./bbdd.js";

const RUTA_HOME = '../index.html';

const loginForm = document.getElementById('login-form');
const inputUsuario = document.getElementById('name');
const inputContrasenia = document.getElementById('password');
const mensajeError = document.getElementById('login-error');

function mostrarError(){
    cambiarTextContent(mensajeError, ERRORES.LOGIN.USUARIO_O_CONTRASENIA_INVALIDOS);
}

function controlLogin(event) {
    event.preventDefault();

    let usuarioIngresado = inputUsuario.value;

    const usuarioEncontrado = encontrarUsuario(usuarioIngresado);

    if (!usuarioEncontrado) {
        mostrarError();
        return;
    }
    

    let contraseniaEncontrada = inputContrasenia.value;
    
    if (usuarioEncontrado.contrasenia === contraseniaEncontrada) {
        setUsuarioLogueado(usuarioEncontrado.nombreUsuario);
        redirigir(RUTA_HOME);
    } else {
        mostrarError();
    }
}

loginForm.addEventListener('submit', controlLogin);