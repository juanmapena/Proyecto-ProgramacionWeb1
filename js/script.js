import { FormularioContacto } from "../js/contacto.js";
import { SimuladorPago } from "../js/formasdepago.js";
import { PersonalizadorTarjetaRegalo } from "../js/giftcarsd.js";
import {Detalle} from './detalle.js'
import {CursosSlider} from './slider.js'
import {Busqueda} from './busqueda.js'


document.addEventListener('DOMContentLoaded', function () {
    const appContacto = new FormularioContacto();
    const appPago = new SimuladorPago();
    const appGiftcard = new PersonalizadorTarjetaRegalo();

    const detalle = new Detalle();
    const slider = new CursosSlider();
    const busqueda = new Busqueda();



    busqueda.render();
    detalle.render();
    slider.render();
    appContacto.render();
    appPago.render();
    appGiftcard.render();
});

