import { ERRORES, mostrarErrorPago, vaciarTextContent, REGEXP } from './utilities.js';

const ERRORES_CONTACTO_ADICIONALES = {
    NOMBRE_APELLIDO_FORMATO: "El nombre y el apellido solo pueden contener letras y espacios.",
    TELEFONO_FORMATO: "El teléfono debe contener exactamente 8 dígitos.",
    CONSULTA_REQUERIDA: "Debe ingresar una consulta en el mensaje.",
};

const ERRORES_COMPLETOS = {
    ...ERRORES.REGISTRO,
    ...ERRORES_CONTACTO_ADICIONALES
};


export class FormularioContacto {
    constructor() {
        this.formulario = document.getElementById('formulario-contacto');
        this.modalConfirmacion = document.getElementById('confirmacion-modal');
        this.modalExito = document.getElementById('exito-modal');

        this.btnAceptarConf = document.getElementById('modal-aceptar');
        this.btnCancelarConf = document.getElementById('modal-cancelar');
        this.btnAceptarExito = document.getElementById('modal-exito-aceptar');

        this.areaConsulta = document.getElementById('message');
        this.contadorCaracteres = document.getElementById('char-count');
        this.inputNombre = document.getElementById('name');
        this.inputApellido = document.getElementById('lastname');
        this.inputTelefono = document.getElementById('phonenumber');
        this.inputEmail = document.getElementById('email');
        this.mensajeError = document.getElementById('error-contacto-mensaje');
    }

    validarEmail() {
        return REGEXP.EMAIL.test(this.inputEmail.value.trim());
    }

    validarTelefono() {
        const telefonoLimpio = this.inputTelefono.value.replace(/\D/g, '');
        return /^\d{8}$/.test(telefonoLimpio);
    }
    
    validarNombreApellido(inputElement) {
        const valorLimpio = inputElement.value.trim();
        return valorLimpio === '' || REGEXP.SOLO_LETRAS_Y_ESPACIOS.test(valorLimpio);
    }

    actualizarContador() {
        if (!this.areaConsulta || !this.contadorCaracteres) return;

        const longitudActual = this.areaConsulta.value.length;
        const longitudMaxima = this.areaConsulta.maxLength;
        this.contadorCaracteres.textContent = `${longitudActual}/${longitudMaxima}`;

        if (longitudActual >= longitudMaxima - 50) {
            this.contadorCaracteres.style.color = 'red';
        } else {
            this.contadorCaracteres.style.color = 'black';
        }
    }

    manejarEnvio(event) {
        event.preventDefault();
        vaciarTextContent(this.mensajeError);

        if (this.inputNombre.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.TODOS_LOS_CAMPOS_REQUERIDOS, this.mensajeError);
            return;
        } else if (!this.validarNombreApellido(this.inputNombre)) {
            mostrarErrorPago(ERRORES_COMPLETOS.NOMBRE_APELLIDO_FORMATO, this.mensajeError);
            return;
        }

        if (this.inputApellido.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.TODOS_LOS_CAMPOS_REQUERIDOS, this.mensajeError);
            return;
        } else if (!this.validarNombreApellido(this.inputApellido)) {
            mostrarErrorPago(ERRORES_COMPLETOS.NOMBRE_APELLIDO_FORMATO, this.mensajeError);
            return;
        }

        if (this.inputEmail.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.TODOS_LOS_CAMPOS_REQUERIDOS, this.mensajeError);
            return;
        } else if (!this.validarEmail()) {
            mostrarErrorPago(ERRORES_COMPLETOS.EMAIL_ERRONEO, this.mensajeError); 
            return;
        }

        if (this.inputTelefono.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.TODOS_LOS_CAMPOS_REQUERIDOS, this.mensajeError);
            return;
        } else if (!this.validarTelefono()) {
            mostrarErrorPago(ERRORES_COMPLETOS.TELEFONO_FORMATO, this.mensajeError);
            return;
        }

        if (this.areaConsulta.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.CONSULTA_REQUERIDA, this.mensajeError);
            return;
        }
        
        this.modalConfirmacion.showModal();
    }


    manejarAceptarConfirmacion() {
        this.modalConfirmacion.close();
        this.modalExito.showModal();
    }

    manejarAceptarExito() {
        this.modalExito.close();
        this.formulario.submit();
    }
    
    manejarInputEmail() {
        if (this.mensajeError) vaciarTextContent(this.mensajeError);
    }

    manejarInputLetras(event) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        const valorActual = event.target.value;

        if (!regex.test(valorActual)) {
            event.target.value = valorActual.slice(0, -1);
        }
    }

    manejarInputTelefono(event) {
        let valorLimpio = event.target.value.replace(/\D/g, '');

        if (valorLimpio.length > 8) {
            valorLimpio = valorLimpio.substring(0, 8);
        }
        
        if (valorLimpio.length === 8) {
             event.target.value = valorLimpio.substring(0, 4) + '-' + valorLimpio.substring(4);
        } else {
             event.target.value = valorLimpio;
        }
    }
    
    manejarInputAreaConsulta() {
        if (this.mensajeError) vaciarTextContent(this.mensajeError);
    }

    render() {
        const mainC = document.getElementById("main-contacto");
        if (!mainC) return;
        
        if (this.areaConsulta && this.contadorCaracteres) {
            this.actualizarContador();
            this.areaConsulta.addEventListener('input', () => {
                this.actualizarContador();
                this.manejarInputAreaConsulta();
            });
        }

        if (this.inputNombre) {
            this.inputNombre.addEventListener('input', (event) => this.manejarInputLetras(event));
        }
        if (this.inputApellido) {
            this.inputApellido.addEventListener('input', (event) => this.manejarInputLetras(event));
        }

        if (this.inputTelefono) {
            this.inputTelefono.addEventListener('input', (event) => this.manejarInputTelefono(event));
        }

        if (this.inputEmail) {
            this.inputEmail.addEventListener('input', () => this.manejarInputEmail());
        }

        if (this.formulario) {
            this.formulario.addEventListener('submit', (event) => this.manejarEnvio(event));
        }

        if (this.btnAceptarConf) {
            this.btnAceptarConf.addEventListener('click', () => this.manejarAceptarConfirmacion());
        }

        if (this.btnCancelarConf && this.modalConfirmacion) {
            this.btnCancelarConf.addEventListener('click', () => this.modalConfirmacion.close());
        }

        if (this.btnAceptarExito) {
            this.btnAceptarExito.addEventListener('click', () => this.manejarAceptarExito());
        }
    }
}