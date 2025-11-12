// ./js/boton-sesion-header.js
import {
  getUsuarioLogueado,
  removerUsuarioLogueado,
  obtenerContadorDelCarrito,
} from "./bbdd.js";

export class BotonSesionHeader {
  constructor() {}

  render() {
    // Detecta si estamos dentro de /pages/ para construir rutas correctas
    function rutas() {
      const enPages = window.location.pathname.toLowerCase().includes("/pages/");
      return {
        home:  enPages ? "../index.html"   : "./index.html",
        login: enPages ? "./login.html"    : "./pages/login.html",
      };
    }

    // Pinta el numerito del carrito (<span id="cart-count">)
    function actualizarNumeroCarrito() {
      const contador = document.getElementById("cart-count");
      if (!contador) return;

      let cantidad = 0;
      try {
        cantidad = Number(obtenerContadorDelCarrito?.() ?? 0);
      } catch {}

      if (cantidad > 0) {
        contador.textContent = cantidad;
        contador.style.display = "inline-block";
      } else {
        contador.textContent = "";
        contador.style.display = "none";
      }
    }

    // Cambia “Iniciar sesión / Cerrar sesión”
    function configurarBotonSesion() {
  const linkOriginal  = document.getElementById("enlace-boton-sesion"); // <a>
  if (!linkOriginal) return;

  const { home, login } = rutas();
  const usuario = getUsuarioLogueado();

  // Reemplazo el <a> para limpiar listeners previos
  const linkNuevo = linkOriginal.cloneNode(true);
  linkOriginal.parentNode.replaceChild(linkNuevo, linkOriginal);

  // 🔧 Re-seleccionar el botón porque fue clonado junto con el <a>
  const btn = document.getElementById("boton-sesion");
  if (!btn) return;

  if (usuario) {
    linkNuevo.href = home;
    btn.textContent = "Cerrar sesión";
    linkNuevo.addEventListener("click", (e) => {
      e.preventDefault();
      removerUsuarioLogueado();
      window.location.assign(home);
    });
  } else {
    linkNuevo.href = login;
    btn.textContent = "Iniciar sesión";
  }
}

    function initHeader() {
      configurarBotonSesion();
      actualizarNumeroCarrito();
    }

    // 🔴 IMPORTANTE: Inicializar AHORA (no volver a escuchar DOMContentLoaded)
    initHeader();

    // Reaccionar a cambios desde otras pestañas o al actualizar el carrito
    window.addEventListener("storage", (e) => {
      if (e.key === "usuarios" || e.key === "usuarioLogueado") {
        configurarBotonSesion();
        actualizarNumeroCarrito();
      }
    });

    window.addEventListener("cart:updated", actualizarNumeroCarrito);

    // Exponer función para refresco manual si la necesitas desde otras páginas
    window.actualizarNumeroCarrito = actualizarNumeroCarrito;
  }
}
