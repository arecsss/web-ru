// ============================================
// SCRIPT DE GESTIÓN DE SESIÓN Y AUTENTICACIÓN
// ============================================

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene el contenedor de botones de autenticación en la navegación
    const authButtonsContainer = document.getElementById('auth-buttons-nav');
    
    // Si el contenedor no existe en la página, salir de la función
    if (!authButtonsContainer) return;

    // Verifica si el usuario ha iniciado sesión
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const userName = localStorage.getItem('userName') || 'Usuario';
    const userEmail = (localStorage.getItem('userEmail') || '').toLowerCase().trim();

    // Si el usuario está logueado, muestra el botón de cerrar sesión
    if (isLoggedIn) {
        var adminBtn = userEmail === "jibarracuervo@gmail.com" 
          ? '<a href="admin.html" class="btn-text admin-link" style="color: #ff6b00; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-right: 10px;">Admin</a>' 
          : '';
        authButtonsContainer.innerHTML = `
            ${adminBtn}
            <!-- Botón de cerrar sesión -->
            <button class="btn-text logout-link" onclick="cerrarSesion()">Cerrar sesión</button>
        `;
    } else {
        // Si no está logueado, muestra los botones de login y registro
        authButtonsContainer.innerHTML = `
            <a href="login.html" class="btn-text">Acceder</a>
            <a href="register.html" class="btn-primary">Registrarse</a>
        `;
    }
});

// Función para cerrar sesión
function cerrarSesion() {
    // Limpia los datos de sesión del localStorage
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    
    // Redirige al usuario a la página de inicio
    location.href = 'index.html';
}
