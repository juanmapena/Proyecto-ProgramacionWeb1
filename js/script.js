import { FormularioContacto } from "../js/contacto.js";
import { SimuladorPago } from "../js/formasdepago.js";


document.addEventListener('DOMContentLoaded', function () {
    const appContacto = new FormularioContacto();
    const appPago = new SimuladorPago();



    appContacto.render();
    appPago.render();
});

