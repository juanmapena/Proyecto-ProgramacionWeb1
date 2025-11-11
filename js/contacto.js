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

        if (!this.formulario || !this.modalConfirmacion || !this.inputEmail) {
            console.error('Inicialización fallida: Faltan IDs esenciales en el HTML.');
            return;
        }
    }

    validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validarTelefono() {
        const telefonoLimpio = this.inputTelefono.value.replace(/\D/g, '');

        if (telefonoLimpio === "") {
            this.inputTelefono.setCustomValidity("");
            return true;
        }

        const regexTelefono = /^\d{8}$/;
        if (!regexTelefono.test(telefonoLimpio)) {
            this.inputTelefono.setCustomValidity("El teléfono debe tener 8 dígitos.");
            return false;
        }

        if (telefonoLimpio.length === 8) {
            const telefonoFormateado = telefonoLimpio.substring(0, 4) + '-' + telefonoLimpio.substring(4);
            this.inputTelefono.value = telefonoFormateado;
        }

        this.inputTelefono.setCustomValidity("");
        return true;
    }

    validarNombreApellido(inputElement, nombreCampo) {
        const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

        if (inputElement.value === "") {
            inputElement.setCustomValidity("");
            return true;
        }

        if (!regexLetras.test(inputElement.value)) {
            inputElement.setCustomValidity(`El campo ${nombreCampo} solo puede contener letras y espacios.`);
            return false;
        }

        inputElement.setCustomValidity("");
        return true;
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

        let esValido = true;

        if (!this.validarNombreApellido(this.inputNombre, 'Nombre') || !this.validarNombreApellido(this.inputApellido, 'Apellido')) {
            esValido = false;
        }

        if (!this.validarEmail(this.inputEmail.value)) {
            this.inputEmail.setCustomValidity("Ingrese un formato de email válido (ej: nombre@dominio.com).");
            esValido = false;
        } else {
            this.inputEmail.setCustomValidity("");
        }

        if (!this.validarTelefono()) {
            esValido = false;
        }

        if (!this.formulario.checkValidity()) {
            esValido = false;
        }

        if (esValido) {
            this.modalConfirmacion.showModal();
        } else {
            this.formulario.reportValidity();
        }
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
        this.inputEmail.setCustomValidity("");
        if (!this.validarEmail(this.inputEmail.value) && this.inputEmail.value.length > 0) {
            this.inputEmail.setCustomValidity("Ingrese un formato de email válido (ej: nombre@dominio.com).");
        }
    }

    manejarInputLetras(event) {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        const valorActual = event.target.value;

        if (!regex.test(valorActual)) {
            event.target.value = valorActual.slice(0, -1);
        }
        this.validarNombreApellido(event.target, event.target.id === 'name' ? 'Nombre' : 'Apellido');
    }

    manejarInputTelefono(event) {
        let valorLimpio = event.target.value.replace(/\D/g, '');

        if (valorLimpio.length > 8) {
            valorLimpio = valorLimpio.substring(0, 8);
        }

        event.target.value = valorLimpio;

        this.validarTelefono();
    }

    render() {
        if (this.areaConsulta && this.contadorCaracteres) {
            this.actualizarContador();
            this.areaConsulta.addEventListener('input', () => this.actualizarContador());
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

        this.formulario.addEventListener('submit', (event) => this.manejarEnvio(event));

        this.btnAceptarConf.addEventListener('click', () => this.manejarAceptarConfirmacion());
        this.btnCancelarConf.addEventListener('click', () => this.modalConfirmacion.close());
        this.btnAceptarExito.addEventListener('click', () => this.manejarAceptarExito());
    }
}