import { getUsuarioLogueado, encontrarUsuario, getUsuarios, guardarUsuarios, obtenerCursoPorId } from "./bbdd.js";
import { ERRORES, REGEXP } from './utilities.js'; 


function vaciarTextContentSeguro(elemento){
    if (elemento) {
        elemento.textContent = '';
        elemento.classList.remove('mensaje-alerta');
        elemento.classList.remove('error-rojo-prolijo'); 
        elemento.style.color = ''; 
    }
}

function mostrarErrorPagoSeguro(mensaje, elementoMensaje) {
    if (elementoMensaje) {
        elementoMensaje.textContent = mensaje;
        elementoMensaje.classList.add('mensaje-alerta');
        elementoMensaje.classList.add('error-rojo-prolijo');
        elementoMensaje.style.color = 'red'; 
    }
}

const ERRORES_GIFTCARD_ADICIONALES = {
    NOMBRE_REQUERIDO: "Nombre del destinatario es obligatorio.",
    NOMBRE_FORMATO: "Solo se permiten letras y espacios.",
    MONTO_REQUERIDO: "El monto es obligatorio.",
    MONTO_MINIMO: "El monto debe ser mínimo $1.",
    OPCION_REQUERIDA: "Debés seleccionar una opción.",
};

const ERRORES_COMPLETOS = {
    ...ERRORES.REGISTRO,
    ...ERRORES_GIFTCARD_ADICIONALES
};


export class PersonalizadorTarjetaRegalo {

    constructor() {
        this.tarjetaVistaPrevia = document.getElementById('vista-previa-tarjeta');
        this.nombreDestinatarioVistaPrevia = document.getElementById('nombre-destinatario-vista-previa');
        this.montoVistaPrevia = document.getElementById('monto-vista-previa');

        this.inputNombre = document.getElementById('input-nombre-destinatario');
        this.inputMonto = document.getElementById('input-monto');
        this.formulario = document.querySelector('.form_dates form'); 

        this.errorNombre = document.getElementById('error-nombre');
        this.errorMonto = document.getElementById('error-monto');
        this.errorColor = document.getElementById('error-color');
        this.errorFuente = document.getElementById('error-fuente');
        this.errorUbicacion = document.getElementById('error-ubicacion');
        this.errorFondo = document.getElementById('error-fondo');

        this.mapaColores = {
            'Dorado': 'goldenrod',
            'Rojo': 'red',
            'Azul': 'blue',
            'Verde': 'green',
            'Gris': 'grey'
        };

        this.mapaFondos = {
            'fondo1': '#DAA520',
            'fondo2': '#000000',
            'fondo3': '#00FF00',
            'fondo4': '#FF0000',
            'fondo5': '#00FFFF'
        };

        this.mapaUbicaciones = {
            'ubicacion_superior_derecha': 'superior-derecha',
            'ubicacion_superior_izquierda': 'superior-izquierda',
            'ubicacion_inferior_derecha': 'inferior-derecha',
            'ubicacion_inferior_izquierda': 'inferior-izquierda'
        };


        this.dialogConfirmacion = document.getElementById('dialog-confirmacion');
        this.botonCancelar = document.getElementById('boton-cancelar');
        this.botonConfirmar = document.getElementById('boton-confirmar');
        this.dialogoBotonNo = document.getElementById('dialogo-cancelar-no');
        this.dialogoBotonSi = document.getElementById('dialogo-confirmar-si');

        this.dialogoLoginRequerido = document.getElementById('dialog-login-requerido-cuenta');
        this.botonLoginDialogo = document.getElementById('dialogo-cuenta-login');
        this.botonCerrarAlerta = document.getElementById('dialogo-alerta-cerrar');

        this.URL_DESTINO_INDEX= '../index.html';
        this.URL_DESTINO_CARRITO = './carrito.html';

        const nombreUsuario = getUsuarioLogueado();

        if (!nombreUsuario) {
            if (this.dialogoLoginRequerido && typeof this.dialogoLoginRequerido.showModal === 'function') {
                this.dialogoLoginRequerido.showModal();
            }
        }
        
        this.inicializarEscuchadores();
        this.inicializarEstadoTarjeta();
    }
    
    obtenerValorRadio(nombre) {
        return this.formulario.querySelector(`input[name="${nombre}"]:checked`)?.value;
    }

    vaciarTodosLosErrores() {
        vaciarTextContentSeguro(this.errorNombre);
        vaciarTextContentSeguro(this.errorMonto);
        vaciarTextContentSeguro(this.errorColor);
        vaciarTextContentSeguro(this.errorFuente);
        vaciarTextContentSeguro(this.errorUbicacion);
        vaciarTextContentSeguro(this.errorFondo);
    }
    

    validarNombre() {
        const nombre = this.inputNombre.value.trim();
        if (nombre.length === 0) {
            mostrarErrorPagoSeguro(ERRORES_COMPLETOS.NOMBRE_REQUERIDO, this.errorNombre);
            return false;
        }
        if (!REGEXP.SOLO_LETRAS_Y_ESPACIOS.test(nombre)) {
            mostrarErrorPagoSeguro(ERRORES_COMPLETOS.NOMBRE_FORMATO, this.errorNombre);
            return false;
        }
        vaciarTextContentSeguro(this.errorNombre);
        return true;
    }

    validarMonto() {
        const monto = parseFloat(this.inputMonto.value);
        if (isNaN(monto) || this.inputMonto.value.trim() === '') {
            mostrarErrorPagoSeguro(ERRORES_COMPLETOS.MONTO_REQUERIDO, this.errorMonto);
            return false;
        }
        if (monto <= 0) {
            mostrarErrorPagoSeguro(ERRORES_COMPLETOS.MONTO_MINIMO, this.errorMonto);
            return false;
        }
        vaciarTextContentSeguro(this.errorMonto);
        return true;
    }
    
    validarSeleccion(nombreGrupo, elementoError) {
        const valor = this.obtenerValorRadio(nombreGrupo);
        if (!valor) {
            mostrarErrorPagoSeguro(ERRORES_COMPLETOS.OPCION_REQUERIDA, elementoError);
            return false;
        }
        vaciarTextContentSeguro(elementoError);
        return true;
    }

    manejarConfirmarClick(e) {
        e.preventDefault();
        
        this.vaciarTodosLosErrores();

        const validaciones = [
            this.validarNombre(),
            this.validarMonto(),
            this.validarSeleccion('colores', this.errorColor),
            this.validarSeleccion('fuente', this.errorFuente),
            this.validarSeleccion('ubicaciones', this.errorUbicacion),
            this.validarSeleccion('fondo', this.errorFondo)
        ];

        const esValido = validaciones.every(resultado => resultado === true);


        if (esValido) {
            if (this.dialogConfirmacion && typeof this.dialogConfirmacion.showModal === 'function') {
                this.dialogConfirmacion.showModal();
            } else {
                this.agregarGiftCardAlCarrito(); 
                window.location.href = this.URL_DESTINO_CARRITO;
            }
        }
    }


    inicializarEstadoTarjeta() {

        if (this.inputNombre) {
            this.actualizarNombreDestinatario(this.inputNombre.value || "Destinatario");
        }
        if (this.inputMonto) {
            this.actualizarMonto(this.inputMonto.value || 0);
        }

        if (this.formulario) {
            const colorInicial = this.formulario.querySelector('input[name="colores"]:checked');
            if (colorInicial) this.actualizarColorNombre(colorInicial.value);

            const ubicacionInicial = this.formulario.querySelector('input[name="ubicaciones"]:checked');
            if (ubicacionInicial) this.actualizarUbicacionMonto(ubicacionInicial.id);

            const fondoInicial = this.formulario.querySelector('input[name="fondo"]:checked');
            if (fondoInicial) this.actualizarFondoTarjeta(fondoInicial.value);

            const fuenteInicial = this.formulario.querySelector('input[name="fuente"]:checked');
            this.actualizarTamanoFuente(fuenteInicial ? fuenteInicial.value : '32px');
        }
    }

    inicializarEscuchadores() {
        if (this.inputNombre) {
            this.inputNombre.addEventListener('input', (e) => {
                this.actualizarNombreDestinatario(e.target.value);
                this.validarNombre(); 
            });
            this.inputNombre.addEventListener('blur', () => this.validarNombre());
        }

        if (this.inputMonto) {
            this.inputMonto.addEventListener('input', (e) => {
                this.actualizarMonto(e.target.value);
                this.validarMonto(); 
            });
            this.inputMonto.addEventListener('blur', () => this.validarMonto());
        }

        if (this.formulario) {
            this.formulario.addEventListener('change', (e) => {
                const nombreCampo = e.target.name;
                const valorCampo = e.target.value;
                const idCampo = e.target.id;
                
                let errorElement;
                switch (nombreCampo) {
                    case 'colores':
                        this.actualizarColorNombre(valorCampo);
                        errorElement = this.errorColor;
                        break;
                    case 'fuente':
                        this.actualizarTamanoFuente(valorCampo);
                        errorElement = this.errorFuente;
                        break;
                    case 'ubicaciones':
                        this.actualizarUbicacionMonto(idCampo);
                        errorElement = this.errorUbicacion;
                        break;
                    case 'fondo':
                        this.actualizarFondoTarjeta(valorCampo);
                        errorElement = this.errorFondo;
                        break;
                }
                if (errorElement) vaciarTextContentSeguro(errorElement);
            });
        }


        if (this.botonCancelar) {
            this.botonCancelar.addEventListener('click', () => {
                window.location.href = this.URL_DESTINO_INDEX;
            });
        }

        if (this.botonConfirmar) {
            this.botonConfirmar.addEventListener('click', this.manejarConfirmarClick.bind(this));
        }

        if (this.dialogoBotonSi && this.dialogConfirmacion) {
            this.dialogoBotonSi.addEventListener('click', () => {
                const exito = this.agregarGiftCardAlCarrito();
                this.dialogConfirmacion.close();
                if (exito) {
                    window.location.href = this.URL_DESTINO_CARRITO;
                }
            });
        }

        if (this.dialogoBotonNo && this.dialogConfirmacion) {
            this.dialogoBotonNo.addEventListener('click', () => {
                this.dialogConfirmacion.close();
            });
        }

        if (this.botonLoginDialogo && this.dialogoLoginRequerido) {
            this.botonLoginDialogo.addEventListener('click', () => {
                this.dialogoLoginRequerido.close();
                window.location.href = './login.html';
            });
        }

        if (this.botonCerrarAlerta && this.dialogoLoginRequerido) {
            this.botonCerrarAlerta.addEventListener('click', () => {
                this.dialogoLoginRequerido.close();
            });
        }
    }

    agregarGiftCardAlCarrito() {
        const nombreUsuario = getUsuarioLogueado();
        const monto = parseFloat(this.inputMonto.value);

        if (!nombreUsuario) {

            if (this.dialogoLoginRequerido && typeof this.dialogoLoginRequerido.showModal === 'function') {
                this.dialogoLoginRequerido.showModal();
            } else {
                alert("Debes iniciar sesión para añadir la Gift Card al carrito.");
            }

            return false;
        }

        const giftCardFinal = {
            id: 7,
            nombre: `Gift Card Digital: ${this.inputNombre.value}`,
            precio: monto,
            cantidad: 1,
            imagen: "../assets/giftcard.png",
            tipo: 'GiftCard',
            destinatario: this.inputNombre.value
        };

        let listaUsuarios = getUsuarios();
        const indiceUsuario = listaUsuarios.findIndex(u => u.nombreUsuario === nombreUsuario);

        if (indiceUsuario !== -1) {
            let usuario = listaUsuarios[indiceUsuario];
            if (!usuario.carrito) {
                usuario.carrito = [];
            }
            usuario.carrito.push(giftCardFinal);
            guardarUsuarios(listaUsuarios);
            return true;
        } else {
            return false;
        }
    }

    actualizarNombreDestinatario(nombre) {
        if (this.nombreDestinatarioVistaPrevia) {
            this.nombreDestinatarioVistaPrevia.textContent = nombre || "Destinatario";
        }
    }

    actualizarColorNombre(valorColor) {
        if (this.nombreDestinatarioVistaPrevia) {
            const colorCSS = this.mapaColores[valorColor];
            if (colorCSS) {
                this.nombreDestinatarioVistaPrevia.style.color = colorCSS;
            }
        }
    }

    actualizarTamanoFuente(valorFuente) {
        if (this.nombreDestinatarioVistaPrevia) {
            this.nombreDestinatarioVistaPrevia.style.fontSize = valorFuente;
        }
    }

    actualizarMonto(monto) {
        if (this.montoVistaPrevia) {
            const numero = parseFloat(monto);
            let montoFormateado = '$0000.-';

            if (!isNaN(numero) && numero >= 0) {
                montoFormateado = `$${numero.toLocaleString('es-AR', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                })}`;
            }
            this.montoVistaPrevia.textContent = montoFormateado;
        }
    }

    actualizarUbicacionMonto(idUbicacion) {
        if (this.montoVistaPrevia) {
            const clasesUbicacion = Object.values(this.mapaUbicaciones);
            this.montoVistaPrevia.classList.remove(...clasesUbicacion);

            const claseCSS = this.mapaUbicaciones[idUbicacion];
            if (claseCSS) {
                this.montoVistaPrevia.classList.add(claseCSS);
            }
        }
    }

    actualizarFondoTarjeta(valorFondo) {
        if (this.tarjetaVistaPrevia) {
            const colorCSS = this.mapaFondos[valorFondo];
            if (colorCSS) {
                this.tarjetaVistaPrevia.style.backgroundColor = colorCSS;
            }
        }
    }
}