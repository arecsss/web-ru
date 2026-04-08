// ============================================
// SCRIPT UNIFICADO DE TEMA Y SESIÓN
// ============================================
// Este archivo contiene la lógica para:
// 1. Detectar y aplicar el modo oscuro/claro
// 2. Guardar la preferencia del usuario
// 3. Actualizar los botones de autenticación

// IIFE (Immediately Invoked Function Expression) para aplicar el tema antes de que la página cargue
(function () {
  // Obtiene el tema guardado en localStorage
  var localTheme = localStorage.getItem("theme");
  
  // Detecta si el sistema operativo del usuario prefiere modo oscuro
  var sysTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  
  // Si el usuario guardó "dark-mode" O si no hay preferencia guardada pero el sistema prefiere oscuro
  if (localTheme === "dark-mode" || (!localTheme && sysTheme)) {
    // Añade la clase "dark-mode" al body para aplicar estilos oscuros
    document.body.classList.add("dark-mode");
  }
})();

// Espera a que el DOM esté completamente cargado para interactuar con los elementos
document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // SECCIÓN 1: LÓGICA DEL TOGGLE DE TEMA
  // ============================================
  
  // Obtiene el elemento del toggle de modo oscuro
  var toggleNav = document.getElementById("dark-mode-toggle-nav");
  
  // Si el body ya tiene la clase "dark-mode", marca el checkbox como activado
  if (document.body.classList.contains("dark-mode")) {
    if (toggleNav) toggleNav.checked = true;
  }

  // Escucha cambios en el toggle
  if (toggleNav) {
    toggleNav.addEventListener("change", function (e) {
      // Obtiene el estado del checkbox (true = marcado, false = desmarcado)
      var isDark = e.target.checked;
      
      if (isDark) {
        // Si está marcado, activa modo oscuro
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark-mode");
      } else {
        // Si no está marcado, activa modo claro
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
      }
    });
  }

  // ============================================
  // SECCIÓN 2: LÓGICA DE AUTENTICACIÓN Y NAVEGACIÓN
  // ============================================
  
  // Verifica si el usuario está logueado
  var logged = localStorage.getItem("loggedIn") === "true";
  
  // Obtiene el contenedor de botones de autenticación en la navegación
  var authButtonsNav = document.getElementById("auth-buttons-nav");

  // Si el usuario está logueado Y el contenedor existe
  if (logged && authButtonsNav) {
    // Obtiene el nombre del usuario guardado
    var userName = localStorage.getItem("userName") || "Usuario";
    
    // Reemplaza los botones de login/registro con el botón de cerrar sesión
    authButtonsNav.innerHTML = `
      <span style="color: var(--text-muted); font-size: 0.95rem;">Hola, ${userName}</span>
      <a href="#" id="logout-btn-header" class="logout-link">Cerrar sesión</a>
    `;
    
    // Añade evento al botón de cerrar sesión
    document
      .getElementById("logout-btn-header")
      .addEventListener("click", function (e) {
        // Previene el comportamiento por defecto del enlace
        e.preventDefault();
        
        // Limpia los datos de sesión del localStorage
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        
        // Recarga la página para que se actualice la navegación
        location.reload();
      });
  }
});
