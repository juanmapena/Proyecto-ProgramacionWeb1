import { FormularioContacto } from "../js/contacto.js";
import { SimuladorPago } from "../js/formasdepago.js";
import { PersonalizadorTarjetaRegalo } from "../js/giftcarsd.js";


document.addEventListener('DOMContentLoaded', function () {
    const appContacto = new FormularioContacto();
    const appPago = new SimuladorPago();
    const appGiftcard = new PersonalizadorTarjetaRegalo();



    appContacto.render();
    appPago.render();
    appGiftcard.render();
});

