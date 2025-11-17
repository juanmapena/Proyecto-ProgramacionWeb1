import { getUsuarios, guardarUsuarios, getUsuarioLogueado, encontrarUsuario } from "./bbdd.js";
import { ERRORES, mostrarErrorPago, vaciarTextContent } from './utilities.js';

const obtenerElemento = id => document.getElementById(id);

const ERRORES_PAGO_ADICIONALES = {
    CAMPO_VACIO: "TODOS los campos son obligatorios y no pueden estar vacíos.",
    NOMBRE_FORMATO: "El nombre debe contener solo letras y espacios.",
    VENCIMIENTO_INVALIDO: "La fecha de vencimiento es inválida. Asegúrate de seleccionar una fecha posterior a la actual.",
};

const ERRORES_COMPLETOS = {
    ...ERRORES.PAGO,
    ...ERRORES_PAGO_ADICIONALES
};


export class SimuladorPago {
    constructor() {
        this.formulario = document.querySelector('main form');
        this.inputTarjeta = obtenerElemento('card');
        this.inputCodigoSeguridad = obtenerElemento('code');
        this.inputNombre = obtenerElemento('name');
        this.inputDNI = obtenerElemento('id');
        this.selectMes = obtenerElemento('mes');
        this.selectAnio = obtenerElemento('anio');

        this.dialogoCancelar = obtenerElemento('dialog-cancel');
        this.dialogoConfirmar = obtenerElemento('dialog-confirm');
        this.dialogoExito = obtenerElemento('dialog-success');

        this.botonCancelar = document.querySelector('.cancel');
        this.botonPagar = document.querySelector('.pay');

        this.botonConfirmarPago = obtenerElemento('confirm-payment');
        this.botonConfirmarCancelacion = obtenerElemento('confirm-cancel');
        this.botonIrAHome = obtenerElemento('go-home');

        this.mensajeError = obtenerElemento('error-pago-mensaje');
    }

    validarTarjeta() {
        const tarjetaLimpia = this.inputTarjeta.value.replace(/\s+/g, '');
        return /^\d{16}$/.test(tarjetaLimpia);
    }

    validarCodigoSeguridad() {
        const soloDigitos = (this.inputCodigoSeguridad?.value ?? '').replace(/\D/g, '');
        return /^\d{3}$/.test(soloDigitos);
    }

    validarNombre() {
        const nombreUsuario = this.inputNombre.value.trim();
        return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreUsuario);
    }

    validarDNI() {
        const dniLimpio = this.inputDNI.value.replace(/\./g, '').replace(/\s+/g, '');
        return /^\d{7,8}$/.test(dniLimpio);
    }

    validarVencimiento() {
        const mes = parseInt(this.selectMes.value);
        const anio = parseInt(this.selectAnio.value);

        if (isNaN(mes) || isNaN(anio) || mes <= 0 || anio <= 0) return false;

        const hoy = new Date();
        const actualMes = hoy.getMonth() + 1;
        const actualAnio = hoy.getFullYear();

        return anio > actualAnio || (anio === actualAnio && mes >= actualMes);
    }

    validarTodo() {
        return (
            this.validarTarjeta() &&
            this.validarCodigoSeguridad() &&
            this.validarNombre() &&
            this.validarDNI() &&
            this.validarVencimiento()
        );
    }

    formatearTarjeta() {
        const soloDigitos = this.inputTarjeta.value.replace(/\D/g, '');
        this.inputTarjeta.value = soloDigitos.match(/.{1,4}/g)?.join(' ') || soloDigitos;
    }

    formatearCodigo() {
        if (!this.inputCodigoSeguridad) return;
        this.inputCodigoSeguridad.value = this.inputCodigoSeguridad.value.replace(/\D/g, '').substring(0, 3);
    }

    formatearNombre() {
        this.inputNombre.value = this.inputNombre.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }

    formatearDNI() {
        let valor = this.inputDNI.value.replace(/\D/g, '').substring(0, 8);
        let formateado = '';
        if (valor.length > 2) {
            formateado += valor.substring(0, 2) + '.';
            valor = valor.substring(2);
        }
        if (valor.length > 3) {
            formateado += valor.substring(0, 3) + '.';
            valor = valor.substring(3);
        }
        this.inputDNI.value = formateado + valor;
    }


    manejarPagarClick(event) {
        event.preventDefault();

        if (this.mensajeError) vaciarTextContent(this.mensajeError);

      
        if (this.inputTarjeta.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.CAMPO_VACIO, this.mensajeError);
            return;
        } else if (!this.validarTarjeta()) {
            mostrarErrorPago(ERRORES_COMPLETOS.TARJETA_LONGITUD, this.mensajeError);
            return;
        }

        if (this.inputCodigoSeguridad.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.CAMPO_VACIO, this.mensajeError);
            return;
        } else if (!this.validarCodigoSeguridad()) {
            mostrarErrorPago(ERRORES_COMPLETOS.CODIGO_LONGITUD, this.mensajeError);
            return;
        }

        if (this.inputNombre.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.CAMPO_VACIO, this.mensajeError);
            return;
        } else if (!this.validarNombre()) {
            mostrarErrorPago(ERRORES_COMPLETOS.NOMBRE_FORMATO, this.mensajeError);
            return;
        }

        if (this.inputDNI.value.trim() === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.CAMPO_VACIO, this.mensajeError);
            return;
        } else if (!this.validarDNI()) {
            mostrarErrorPago(ERRORES_COMPLETOS.DNI_LONGITUD, this.mensajeError);
            return;
        }

        if (this.selectMes.value === '' || this.selectAnio.value === '') {
            mostrarErrorPago(ERRORES_COMPLETOS.CAMPO_VACIO, this.mensajeError);
            return;
        } else if (!this.validarVencimiento()) {
            mostrarErrorPago(ERRORES_COMPLETOS.VENCIMIENTO_INVALIDO, this.mensajeError);
            return;
        }

        this.dialogoConfirmar.showModal();

    }

    ejecutarTransaccion() {
        const nombreUsuario = getUsuarioLogueado();
        let listaUsuarios = getUsuarios();


        if (!nombreUsuario) {
            return;
        }

        const indiceUsuario = listaUsuarios.findIndex(u => u.nombreUsuario === nombreUsuario);

        if (indiceUsuario !== -1) {
            let usuario = listaUsuarios[indiceUsuario];

            const itemsTransferidos = usuario.carrito.length;

            if (!usuario.cursosComprados) {
                usuario.cursosComprados = [];
            }

            usuario.cursosComprados.push(...usuario.carrito);

            usuario.carrito = [];

            guardarUsuarios(listaUsuarios);
        }
    }

    render() {
        const main = document.getElementById("main-forma-pago");
        if (!main) return;

        if (this.inputTarjeta) {
            this.inputTarjeta.addEventListener('input', () => this.formatearTarjeta());
        }

        if (this.inputCodigoSeguridad) {
            this.inputCodigoSeguridad.addEventListener('input', () => this.formatearCodigo());
            this.inputCodigoSeguridad.addEventListener('blur', () => this.formatearCodigo());
        }

        if (this.inputNombre) {
            this.inputNombre.addEventListener('input', () => this.formatearNombre());
        }

        if (this.inputDNI) {
            this.inputDNI.addEventListener('input', () => this.formatearDNI());
        }

        if (this.botonPagar) {
            this.botonPagar.addEventListener('click', this.manejarPagarClick.bind(this));
        }

        if (this.botonCancelar) {
            this.botonCancelar.addEventListener('click', (e) => {
                e.preventDefault();
                this.dialogoCancelar.showModal();
            });
        }

        if (this.botonConfirmarCancelacion) {
            this.botonConfirmarCancelacion.addEventListener('click', (e) => {

                e.preventDefault();

                this.dialogoCancelar.close();
                window.location.href = './carrito.html';
            });
        }


        const botonNoVolverModal = this.dialogoCancelar.querySelector('.cancel');

        if (botonNoVolverModal) {
            botonNoVolverModal.addEventListener('click', (e) => {

                e.preventDefault();

                this.dialogoCancelar.close();
            });
        }


        if (this.botonConfirmarPago) {
            this.botonConfirmarPago.addEventListener('click', (e) => {
                e.preventDefault();

                this.ejecutarTransaccion();

                this.dialogoConfirmar.close();
                this.dialogoExito.showModal();
            });
        }

        if (this.botonIrAHome) {
            this.botonIrAHome.addEventListener('click', () => {
                this.dialogoExito.close();
                window.location.href = '../index.html';
            });
        }
    }
}