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

    // Si el usuario está logueado, muestra el botón de cerrar sesión
    if (isLoggedIn) {
        authButtonsContainer.innerHTML = `
            <!-- Botón de cerrar sesión -->
            <span style="color: var(--text-muted); font-size: 0.95rem;">Hola, ${userName}</span>
            <button class="btn-primary" onclick="cerrarSesion()">Cerrar sesión</button>
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
