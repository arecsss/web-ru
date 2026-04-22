// Importamos la función de cerrar sesión desde nuestro archivo centralizado de Supabase
import { cerrarSesion } from './supabase.js';

document.addEventListener('DOMContentLoaded', function () {
    /* ============================================================
       CONTROL DE SESIÓN Y VINCULACIÓN DINÁMICA (ESPECÍFICO DE INDEX)
       ============================================================ */
    var logged = localStorage.getItem('loggedIn') === 'true'; 
    var authSection = document.querySelector('.auth-section');           
    var authButtonsNav = document.getElementById('auth-buttons-nav');    
    var misionVision = document.getElementById('mision-vision');         
    var videoSection = document.getElementById('video-explicativo');     
    var registertxt = document.getElementById('registertxt');            

    // Lista de páginas que requieren que el usuario esté logueado
    var paginasProtegidas = [                                            
        'Programas.html',
        'Optimizaciones.html',
        'Sistemas.html',
        'Aprende.html',
        'solicitudes.html'
    ];

    if (logged) {
        // Si el usuario está logueado, ocultamos elementos innecesarios para una experiencia más limpia
        if (misionVision) misionVision.classList.add('hidden');          
        if (videoSection) videoSection.classList.add('hidden');          
        if (authSection) authSection.classList.add('hidden');            
        if (registertxt) registertxt.classList.add('hidden');            

        // Cambiamos los botones de acceso por el de cerrar sesión
        if (authButtonsNav) {
            authButtonsNav.innerHTML = '<a href="#" id="logout-btn-header" class="logout-link">Cerrar sesión</a>';
            document.getElementById('logout-btn-header').addEventListener('click', async function (e) {
                e.preventDefault();
                await cerrarSesion(); // Llamamos a la función de Supabase para cerrar sesión correctamente
            });
        }

    } else {
        // Si no está logueado, activamos el modo landing
        document.body.classList.add('landing');                          

        // Interceptamos clics en páginas protegidas para redirigir al login
        document.addEventListener('click', function (e) {               
            var link = e.target.closest('a');                            
            if (!link) return;                                           

            var href = link.getAttribute('href');                        
            if (!href) return;                                           

            var nombreArchivo = href.split('/').pop().split('?')[0].split('#')[0];

            var esProtegida = paginasProtegidas.some(function (p) {
                return p.toLowerCase() === nombreArchivo.toLowerCase();
            });

            if (esProtegida) {
                e.preventDefault();                                     
                location.href = 'login.html?redirect=' + encodeURIComponent(nombreArchivo);
            }
        });
    }
});
