import { getUsuarioLogueado, encontrarUsuario, guardarUsuarios, getUsuarios, obtenerContadorDelCarrito } from "./bbdd.js";
import { mostrarElementoFlex, cambiarTextContent } from './utilities.js';

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");

    if (contador) {
        const contadorActual = obtenerContadorDelCarrito(); //obtenemos el contador de la bbdd

        cambiarTextContent(contador, contadorActual);

        mostrarElementoFlex(contador);
    }
}

document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

document.addEventListener('DOMContentLoaded', () => {

    const productosContainer = document.getElementById("productos-carrito");
    const totalMostrar = document.getElementById("total-mostrar");



    const nombreUsuario = getUsuarioLogueado();

    let arrayDeItems = []; //array de los cursos a mostrar

    if (nombreUsuario) {
        const usuarioLogueado = encontrarUsuario(nombreUsuario);
        if (usuarioLogueado) {
            arrayDeItems = usuarioLogueado.carrito || []; //cargamos el carrito del usuario logueado
        }
    }

    /**  @param {Array<Object>} nuevoArrayDeItems*/

    function guardarCarritoEnBBDD(nuevoArrayDeItems) {

        const listaUsuarios = getUsuarios();
        const indiceUsuario = listaUsuarios.findIndex(u => u.nombreUsuario === nombreUsuario);

        if (indiceUsuario !== -1) {

            listaUsuarios[indiceUsuario].carrito = nuevoArrayDeItems; // Actualizar el array 'carrito' del usuario
            guardarUsuarios(listaUsuarios);
        }
    }

    function actualizarCarrito() {
        productosContainer.innerHTML = "";
        let nuevoTotal = 0;

        if (arrayDeItems.length === 0) {
            productosContainer.innerHTML = `
            <p class="carrito-vacio">El carrito esta vacio. <br>
            Explora nuestros cursos   
            </p>
            <button class="button_style">
            <a href="./cursos.html">Cursos</a>
            </buutton>
        `;

            guardarCarritoEnBBDD([]); //asegura de que quede vacio y no se cargue el carrito de otro usuario
            totalMostrar.textContent = "$0.00";
            return;
        }

        arrayDeItems.forEach((item, index) => { //recorremos el array y obtenemos los datos para agregarlos al html
            nuevoTotal += item.precio * item.cantidad;

            const productoHTML = `
        <article class="product-item" data-index="${index}">
                    <div class="products_style">
                        <img src="${item.imagen}" alt="Logo Curso">
                        <p>${item.nombre}</p>
                        <p>x ${item.cantidad}</p>
                        <p>$${item.precio.toFixed(2)} 
                           <button class="button_delete" type="button" data-index="${index}">&#x2212;</button>
                        </p>
                    </div>
                </article>
        `;

            productosContainer.innerHTML += productoHTML;
        });

        totalMostrar.textContent = `$${nuevoTotal.toFixed(2)}`;

        localStorage.setItem('totalCarrito', nuevoTotal);

        const botonEliminar = document.querySelectorAll(".button_delete");

        botonEliminar.forEach(botonEliminar => { //cada item del carrito se puede eliminar del mismo
            botonEliminar.addEventListener("click", eliminarItem);
        });
    }

    function eliminarItem(e) {
        const elementoAEliminar = parseInt(e.target.dataset.index);

        arrayDeItems.splice(elementoAEliminar, 1);

        guardarCarritoEnBBDD(arrayDeItems);

        actualizarCarrito();
    }

    actualizarCarrito(); //actualizamos siempre el carrito al final con los cambios que se hayan hecho

    actualizarContadorCarrito();
});