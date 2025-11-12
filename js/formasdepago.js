import { getUsuarios, guardarUsuarios, getUsuarioLogueado, encontrarUsuario } from "./bbdd.js";
import { ERRORES, mostrarErrorPago, vaciarTextContent } from './utilities.js'; 

const obtenerElemento = id => document.getElementById(id);

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
        return /^\d{16}$/.test(this.inputTarjeta.value.replace(/\s+/g, ''));
    }

    validarCodigoSeguridad() {
        const soloDigitos = (this.inputCodigoSeguridad?.value ?? '').replace(/\D/g, '');
        return /^\d{3}$/.test(soloDigitos);
    }

    validarNombre() {
        const nombreUsuario = this.inputNombre.value.trim();
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreUsuario)) {
            return false;
        }
        return true;
    }

    validarDNI() {
        return /^\d{7,8}$/.test(this.inputDNI.value.replace(/\./g, '').replace(/\s+/g, ''));
    }

    validarVencimiento() {
        const mes = parseInt(this.selectMes.value);
        const anio = parseInt(this.selectAnio.value);
        if (!mes || !anio) return false;

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

        let validacionExitosa = true;

        if (!this.validarTarjeta()) {
            mostrarErrorPago(ERRORES.PAGO.TARJETA_LONGITUD, this.mensajeError);
            this.formulario.reportValidity(); 
            return;
        }

        if (!this.validarCodigoSeguridad()) {
            mostrarErrorPago(ERRORES.PAGO.CODIGO_LONGITUD, this.mensajeError);
            this.formulario.reportValidity();
            return;
        }

        if (!this.validarDNI()) {
            mostrarErrorPago(ERRORES.PAGO.DNI_LONGITUD, this.mensajeError);
            this.formulario.reportValidity();
            return;
        }
        
        if (this.validarTodo()) {
            this.dialogoConfirmar.showModal();
        } else {
            this.formulario.reportValidity();
            mostrarErrorPago(ERRORES.PAGO.VALIDACION_CAMPOS, this.mensajeError);
        }
    }

    ejecutarTransaccion() {
        const nombreUsuario = getUsuarioLogueado(); 
        let listaUsuarios = getUsuarios();
        
        
        if (!nombreUsuario) {
            console.error("ERROR: No hay usuario logueado. Redireccionar al login o mostrar alerta.");
            return; 
        }

        const indiceUsuario = listaUsuarios.findIndex(u => u.nombreUsuario === nombreUsuario);

        if (indiceUsuario !== -1) {
            let usuario = listaUsuarios[indiceUsuario];
            
            
            console.log(`--- INICIO DE TRANSACCIÓN PARA: ${nombreUsuario} ---`);
            console.log(`Cursos en Carrito ANTES:`, usuario.carrito);
            console.log(`Cursos Comprados ANTES:`, usuario.cursosComprados);
            
            const itemsTransferidos = usuario.carrito.length;

            if (!usuario.cursosComprados) {
                usuario.cursosComprados = [];
            }
            
            usuario.cursosComprados.push(...usuario.carrito);
            
            usuario.carrito = [];

            guardarUsuarios(listaUsuarios);

            console.log(`-----------------------------------------------`);
            console.log(`¡TRANSACCIÓN EXITOSA! ${itemsTransferidos} artículos transferidos.`);
            console.log(`Cursos en Carrito DESPUÉS:`, usuario.carrito);
            console.log(`Cursos Comprados DESPUÉS:`, usuario.cursosComprados);
            console.log(`--- FIN DE TRANSACCIÓN ---`);
            
        } else {
            console.error(`ERROR: El usuario logueado "${nombreUsuario}" no fue encontrado en la lista de usuarios.`);
        }
    }

    render() {
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
            this.botonConfirmarCancelacion.addEventListener('click', () => {
                window.location.href = './carrito.html';
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