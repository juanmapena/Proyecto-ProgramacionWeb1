import {Detalle} from './detalle.js'
import {CursosSlider} from './slider.js'
import {Busqueda} from './busqueda.js'


document.addEventListener('DOMContentLoaded', function () {

    const detalle = new Detalle();
    const slider = new CursosSlider();
    const busqueda = new Busqueda();



    busqueda.render();
    detalle.render();
    slider.render();
});

