export const REGEXP = {
    EMAIL : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    SOLO_LETRAS_Y_ESPACIOS : /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑ]+$/,
    USUARIO : /^[a-zA-Z0-9]+$/,
    MINIMO_UNA_MAYUS : /[A-Z]/,
    MINIMO_UNA_MINUS : /[a-z]/,
    MINIMO_UN_NUMERO : /[0-9]/
}

export const COLORES_CSS = {
    BLANCO: "white",
    NEGRO: "black",
    GRIS: "gray",
    ROJO: "red",
    AZUL: "blue",
    AMARILLO: "yellow",
    CIAN: "cyan",
    MAGENTA: "magenta",
    VERDE: "green",
    NARANJA: "orange",
    VIOLETA: "purple"
};

export const ERRORES = {
    REGISTRO: {
        TODOS_LOS_CAMPOS_REQUERIDOS: "Todos los campos son obligatorios.",
        CONTRASENIAS_NO_COINCIDEN: "Las contraseñas no coinciden.",
        SOLO_LETRAS_Y_MINIMO_DOS_CARACTERES: "Solo se permiten letras y mínimo 2 caracteres.",
        SOLO_CUATRO_CARACTERES_LETRAS_Y_NUMERO: "Mínimo 4 caracteres, solo letras y números.",
        EMAIL_ERRONEO: "Formato de email inválido (ej: usuario@dominio.com).",
        CONTRASENIA_INVALIDA: "Mínimo 8 caracteres, con mayúsculas, minúsculas y números.",
        USUARIO_YA_REGISTRADO: "El usuario o el email ya están en uso, intente nuevamente.",
        REGISTRO_EXITOSO: "¡Registro exitoso! Redirigiendo al login..."
    },
    LOGIN: {
        USUARIO_O_CONTRASENIA_INVALIDOS: "Usuario o contraseña inválidos"
    },
    CUENTA: {
        CONTRASENIA_ACTUAL_INCORRECTA: "Contraseña actual incorrecta.",
        NUEVA_CONTRASENIA_INVALIDA: "La nueva contraseña debe tener como mínimo 8 caracteres, con mayúsculas, minúsculas y números.",
        CONTRASENIAS_NUEVAS_NO_IGUALES: "Debe repetir la misma contraseña en ambos campos.",
        NUEVA_IGUAL_A_ACTUAL: "La nueva contraseña es igual a la actual",
        ERROR_INESPERADO: "Error inesperado. Intente nuevamente en unos minutos..."
    }
}

export function cambiarColorDeFuente(elemento, color){
    elemento.style.color = color;
}

export function validarPorRegExp(string, regExp) {
    return regExp.test(string);
}

export function cambiarTextContent(elemento, texto){
    elemento.textContent = texto;
}

export function vaciarTextContent(elemento){
    elemento.textContent = '';
}

export function redirigir(ruta){
    window.location.href = ruta;
}

export function mostrarElementoBlock(elemento){
    elemento.style.display = "block";
}

export function mostrarElementoFlex(elemento){
    elemento.style.display = "flex";
}

export function esconderElemento(elemento){
    elemento.style.display = "none";
}