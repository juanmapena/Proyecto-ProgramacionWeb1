import { getUsuarioLogueado, encontrarUsuario, getUsuarios, guardarUsuarios, obtenerCursoPorId } from "./bbdd.js";

export class PersonalizadorTarjetaRegalo {

    constructor() {

        this.tarjetaVistaPrevia = document.getElementById('vista-previa-tarjeta');
        this.nombreDestinatarioVistaPrevia = document.getElementById('nombre-destinatario-vista-previa');
        this.montoVistaPrevia = document.getElementById('monto-vista-previa');

        this.inputNombre = document.getElementById('input-nombre-destinatario');
        this.inputMonto = document.getElementById('input-monto');
        this.formulario = document.querySelector('.form_dates form');

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
        // -------------------------

        
        const nombreUsuario = getUsuarioLogueado();
        

        if (!nombreUsuario) {
            
            if (this.dialogoLoginRequerido && typeof this.dialogoLoginRequerido.showModal === 'function') {
                this.dialogoLoginRequerido.showModal();
            } 

        }
        
        this.inicializarEscuchadores();
        this.inicializarEstadoTarjeta();
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
            this.inputNombre.addEventListener('input', (e) => this.actualizarNombreDestinatario(e.target.value));
        }

        if (this.inputMonto) {
            this.inputMonto.addEventListener('input', (e) => this.actualizarMonto(e.target.value));
        }

        if (this.formulario) {
            this.formulario.addEventListener('change', (e) => {
                const nombreCampo = e.target.name;
                const valorCampo = e.target.value;
                const idCampo = e.target.id;

                switch (nombreCampo) {
                    case 'colores':
                        this.actualizarColorNombre(valorCampo);
                        break;
                    case 'fuente':
                        this.actualizarTamanoFuente(valorCampo);
                        break;
                    case 'ubicaciones':
                        this.actualizarUbicacionMonto(idCampo);
                        break;
                    case 'fondo':
                        this.actualizarFondoTarjeta(valorCampo);
                        break;
                }
            });
        }


        if (this.botonCancelar) {
            this.botonCancelar.addEventListener('click', () => {
                
                window.location.href = this.URL_DESTINO_INDEX;
            });
        }


        if (this.botonConfirmar && this.formulario) {
            this.botonConfirmar.addEventListener('click', (e) => {
                e.preventDefault();

                if (this.formulario.checkValidity()) {

                    if (this.dialogConfirmacion && typeof this.dialogConfirmacion.showModal === 'function') {
                        this.dialogConfirmacion.showModal();
                    } else {
                        window.location.href = this.URL_DESTINO_CARRITO;
                    }
                } else {
                    this.formulario.reportValidity();
                }
            });
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