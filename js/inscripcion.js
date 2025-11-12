import { getUsuarioLogueado, guardarUsuarios, getUsuarios, obtenerContadorDelCarrito, obtenerTodosLosCursos, encontrarUsuario } from './bbdd.js';
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

    obtenerContadorDelCarrito();

    function soloNumeros(event) {
        event.target.value = event.target.value.replace(/[^0-9]/g, '');
    }

    function generarOpcionesCursos() {

        const cursosSinFiltrar = obtenerTodosLosCursos();

        const cursosDisponibles = cursosSinFiltrar.filter((curso) => {return curso.id < 7;});
        
        let opcionesHTML = "";

        cursosDisponibles.forEach(curso => {
            opcionesHTML += `
            <option value="${curso.titulo}" data-price="${curso.precio}"> ${curso.titulo}</option>
            `;
        });
        return opcionesHTML;
    }

    const opcionesCursos = generarOpcionesCursos();

    const botonEmpresarial = document.getElementById("boton-empresarial");
    const botonPersonal = document.getElementById("boton-personal");

    const formSection = document.getElementById("section-form");
    const form = document.getElementById("inscripcion-form");

    const personaContainer = document.getElementById("persona-container");
    const agregarContainer = document.getElementById("agregar-container");
    const botonAgregar = document.getElementById("agregar-boton");

    const totalMostrar = document.getElementById("total");

    const modal = document.getElementById("modal");
    const resumen = document.getElementById("resumen");
    const cancelar = document.getElementById("cancelar");
    const confirmar = document.getElementById("confirmar");

    modal.classList.add("ocultar");

    const DIALOG_LOGIN_CUENTA = document.getElementById("dialog-login-requerido-cuenta");
    const BTN_IR_LOGIN_CUENTA = document.getElementById("dialogo-cuenta-login");

    DIALOG_LOGIN_CUENTA.classList.add("ocultar");

    function verificarSesion() {
        const usuarioLogueado = getUsuarioLogueado();

        if (!usuarioLogueado) {
            DIALOG_LOGIN_CUENTA.classList.remove("ocultar")
            DIALOG_LOGIN_CUENTA.showModal();
            DIALOG_LOGIN_CUENTA.style.display = 'block';
            BTN_IR_LOGIN_CUENTA.onclick = () => {
                DIALOG_LOGIN_CUENTA.classList.add("ocultar");
                DIALOG_LOGIN_CUENTA.close();

                window.location.href = './login.html';
            }
            return false;
        }

        return true;
    }

    verificarSesion();

    let tipo = ""; //esto se va a encargar de identificar que tipo de form mostrar
    let total = 0;
    const adicionalEmpresa = 20; //al ser form empresarial, se le suma costo fijo
    let contadorPersona = 0;


    botonEmpresarial.addEventListener("click", () => {
        tipo = "empresarial";
        iniciarFormulario();
    });

    botonPersonal.addEventListener("click", () => {
        tipo = "personal";
        iniciarFormulario();
    })

    function iniciarFormulario() {

        personaContainer.innerHTML = "";
        total = 0;
        totalMostrar.textContent = "$0.00";

        if (tipo === "personal") {
            agregarContainer.classList.add("ocultar"); //oculta todo lo relacionado al agreagar persona porque no tiene sentido en el form personal
            crearFromPersonal();
        } else {
            agregarContainer.classList.remove("ocultar"); //muestra el agregar persona
            crearCampoEmpresarial(true); //es primera persona? true porque es la primera que se va a crear al iniciar el form
        }
    }

    function crearFromPersonal() {
        personaContainer.innerHTML = `
        <article id="persona" class="persona-style personal">
            <label for="nombre">Ingrese su nombre</label>
            <input type="text" id="nombre" required>

            <label for="apellido">Ingrese su apellido</label>
            <input type="text" id="apellido" required>

            <label for="email">Ingrese su email</label>
            <input type="email" id="email" required>

            <label for="tel">Ingrese su numero de telefono</label>
            <input type="tel" id="tel" minlength="10" maxlength="10" required>

            <label for="curso">Seleccione el curso</label>
            <select class="selector-style" id="curso"> ${opcionesCursos} </select>

        </article>
    `;
        document.getElementById("tel").addEventListener('input', soloNumeros);

        const cursos = document.getElementById("curso");
        cursos.addEventListener("change", calcularTotal);

        calcularTotal();
    }

    /**@param {boolean} esPrimeraPersona*/ //su único propósito es documentar que hace la función y que tipo de parametros espera.

    function crearCampoEmpresarial(esPrimeraPersona) { //cuando se llame al metodo, se debe indicar si va a ser la primera persona o no
        contadorPersona++; //cuando se crea el form, se el contador arranca en 1, cada que se agregue un campo al form empresarial, el contador va a aumentar

        const article = document.createElement("article");
        article.className = "persona-style";
        article.id = `persona-${contadorPersona}`; //usamos el contador para indicar y distinguir que es por ejemplo "persona-1" y "persona-2" en base a como se fueron creando y que los datos no se pisen 

        article.innerHTML = `
    <label for="nombre-${contadorPersona}">Nombre y Apellido:</label>
    <input type="text" name="nombre-${contadorPersona}" id="nombre-${contadorPersona}" required>

    <label for="dni-${contadorPersona}">DNI:</label>
    <input type="text" name="dni-${contadorPersona}" id="dni-${contadorPersona}" minlength="7" maxlength="8" required>

    <label for="email-${contadorPersona}">Email:</label>
    <input type="email" name="email-${contadorPersona}" id="email-${contadorPersona}" required>

    <label for="telefono-${contadorPersona}">Teléfono:</label>
    <input type="tel" name="telefono-${contadorPersona}" id="telefono-${contadorPersona}" minlength="10" maxlength="10" required>

    <label for="curso-${contadorPersona}">Seleccione el curso</label>
        <select class="selector-style" id="curso-${contadorPersona}"> ${opcionesCursos} </select>

    <button type="button" class="eliminar">&#x2212;</button>
  `;

        personaContainer.appendChild(article); //se agrega todo al html

        document.getElementById(`dni-${contadorPersona}`).addEventListener('input', soloNumeros);
        document.getElementById(`telefono-${contadorPersona}`).addEventListener('input', soloNumeros);

        const cursos = document.querySelector(`#curso-${contadorPersona}`)
        cursos.addEventListener("change", calcularTotal); //cuando la seleccion de curso cambia, se calcula el precio de la nueva seleccion
        calcularTotal(); //calcula el total de todos los cursos

        const botonEliminar = article.querySelector(".eliminar");

        botonEliminar.addEventListener("click", () => {
            if (esPrimeraPersona) { //si es la primer persona que se crea, no se va a eliminar el campo, simplemente se va a limpiar los datos que contenga
                const inputs = article.querySelectorAll("input");

                inputs.forEach(input => (input.value = ""));

                calcularTotal();

            } else { //si no es la primera persona, se borra todo el campo de esa persona
                article.remove();
                contadorPersona--;
                calcularTotal();
            }
        })
    }

    botonAgregar.addEventListener("click", () => {
        if (tipo !== "personal") {
            tipo = "empresarial";
        }
        crearCampoEmpresarial(false); //como el agregar siempre se va a usar cuando necesitemos sumar mas campos, previamente debe existir una persona primero, por ello se pone esPrimeraPersona=false
        //entonces cuando se quieran eliminar los campos creados con el agregar, se eliminaran y no se limpiar los valores que contengan
    });

    function calcularTotal() {
        const personas = personaContainer.querySelectorAll(".persona-style");
        let subtotal = 0;

        personas.forEach(persona => { //se van a recorrer todos los campos de persona que haya, por cada persona se va a obtener el curso
            const selector = persona.querySelector('select');

            if (selector) { //se obtiene el precio del curso que este seleccionado, si es de inscripcion personal el precio sera el mismo que el del curso, caso contrario se le sumara $20 fijo
                const cursoSeleccionado = selector.options[selector.selectedIndex];

                const precioDelCurso = parseFloat(cursoSeleccionado.getAttribute('data-price'));

                if (tipo === "personal") {
                    subtotal = precioDelCurso;
                } else if (tipo === "empresarial") {
                    subtotal += parseFloat(precioDelCurso) + parseFloat(adicionalEmpresa);
                }
            }
        });

        total = subtotal;
        totalMostrar.textContent = `$${total.toFixed(2)}`;

    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        mostrarResumen(); //se llama a la funcion de mostrar resumen de toda la inscripcion
        modal.classList.remove("ocultar");
        modal.showModal();
    })

    function mostrarResumen() {
        let resumenHTML = ""; //aseguramos de que siempre arranque vacio para evitar acumulaciones de previos resumenes
        const personasAMostrar = personaContainer.querySelectorAll(".persona-style");

        if (tipo == "personal") {
            const datos = personasAMostrar[0]; //solo va a haber una persona por eso se selecciona la posicion 0 del array

            resumenHTML += `
        <h4>Tipo de inscripcion: ${tipo.toUpperCase()}</h4>
        
        <h4>Datos ingresados: </h4>
        
            <ul>
                <li>Nombre: ${datos.querySelector("#nombre").value}</li>
                <li>Apellido: ${datos.querySelector("#apellido").value}</li>
                <li>Email: ${datos.querySelector("#email").value}</li>
                <li>Telefono: ${datos.querySelector("#tel").value}</li>
                <li>Curso: ${datos.querySelector("#curso").value}</li>

            </ul>
        `;
        } else { //si es empresarial, se obtiene el largo que tenga el array

            resumenHTML += `
            <h4>Tipo de inscripcion: ${tipo.toUpperCase()}</h4>

            <h4>Cantidad de personas inscriptas: ${personasAMostrar.length}</h4>

            <h4>Datos ingresados: </h4>

            <ul>`;

            personasAMostrar.forEach((datos, index) => { //por cada persona a mostrar vamos a ponerle el numero del array +1 para evitar arrancar en "persona 0"
                const personaNumero = index + 1;
                const numeroDelId = datos.id.split('-')[1];
                //separa al string como array, es parecido al toCharArray();
                //datos, agarra el id, split('-') va a separar el id a partir de cada "-" que tenga, y va a agarrar el elemento que se encuentre en la posicion [1] de ese array del string
                //ejemplo: id="persona-2", persona va a ser la posicion 0, el - lo va a dividir, el 2 va a ser la posicion 1 del array

                const nombre = datos.querySelector(`#nombre-${numeroDelId}`).value;
                const dni = datos.querySelector(`#dni-${numeroDelId}`).value;
                const email = datos.querySelector(`#email-${numeroDelId}`).value;
                const tel = datos.querySelector(`#telefono-${numeroDelId}`).value;
                const cursos = datos.querySelector(`#curso-${numeroDelId}`).value;

                resumenHTML += `
            <li>
                <strong>Persona ${personaNumero}:</strong> <br> 
                <strong>Nombre:</strong> ${nombre} <br> 
                <strong>DNI:</strong> ${dni} <br> 
                <strong>Email:</strong> ${email} <br> 
                <strong>Tel:</strong> ${tel} <br> 
                <strong>Cursos:</strong> ${cursos} 
            </li>`;
            })

            resumenHTML += `<li><strong>Total a Pagar: $${total.toFixed(2)}</strong></li>`
            resumenHTML += `</ul>`;
        }

        resumen.innerHTML = resumenHTML;
    }

    function obtenerItemsParaElCarrito() {
        const personas = personaContainer.querySelectorAll(".persona-style"); //obtenemos todas las personas
        const itemsCarrito = []; //se crea array vacio

        const cursosDisponibles = obtenerTodosLosCursos();

        personas.forEach(persona => {
            const select = persona.querySelector('select');

            if (select) {
                const selectedOption = select.options[select.selectedIndex];

                const nombreDelCurso = selectedOption.value;
                const cursoEncontrado = cursosDisponibles.find(curso => curso.titulo === nombreDelCurso);
                const idDelCurso = cursoEncontrado ? cursoEncontrado.id : 1;


                const precioBase = cursoEncontrado ? cursoEncontrado.precio : 0;
                const urlLogo = cursoEncontrado ? cursoEncontrado.urlLogo : '../assets/default_logo.jpg';


                let costoFinalDelItem = parseFloat(precioBase); // Aseguramos que sea un número
                let detalle = 'Curso de ' + nombreDelCurso;

                if (tipo === "empresarial") {
                    costoFinalDelItem = costoFinalDelItem + parseFloat(adicionalEmpresa);
                }

                itemsCarrito.push({
                    id: idDelCurso,
                    nombre: detalle,
                    precio: costoFinalDelItem,
                    cantidad: 1,
                    tipo: tipo,
                    imagen: urlLogo
                });
            }
        });

        return itemsCarrito;
    }



    cancelar.addEventListener("click", () => {
        modal.classList.add("ocultar");
        modal.close();
    })

    confirmar.addEventListener("click", () => {
        const nuevosItems = obtenerItemsParaElCarrito();

        const nombreUsuario = getUsuarioLogueado(); //obtiene el usuario logueado

        const listaUsuarios = getUsuarios(); //vamos a traer toda la lista de usuarios y vamos a  ver al que esta logueado
        const indiceUsuario = listaUsuarios.findIndex(usuario => usuario.nombreUsuario === nombreUsuario);

        if (indiceUsuario === -1) { // si no se encuentra al usuario salta error
            alert("Error: Usuario no encontrado.");
            return;
        }

        const carritoActualDelUsuario = listaUsuarios[indiceUsuario].carrito || []; //traemos el carrito que ya tenga el usuario
        const itemsCarritoCombinado = [...carritoActualDelUsuario, ...nuevosItems]; //combinamos el carrito que tenia con lo nuevo
        listaUsuarios[indiceUsuario].carrito = itemsCarritoCombinado; //guardamos este nuevo carrito combinado

        const nuevoTotalCarrito = itemsCarritoCombinado.reduce((sum, item) => sum + item.precio * item.cantidad, 0); //se calcula el nuevo total

        guardarUsuarios(listaUsuarios); //guardamos al usuario actualizado

        localStorage.setItem('totalCarrito', nuevoTotalCarrito.toFixed(2));

        actualizarContadorCarrito();

        modal.classList.add("ocultar");
        modal.close();


        window.location.href = './carrito.html';
    });
});