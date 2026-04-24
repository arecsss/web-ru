// Importamos la función de cerrar sesión desde nuestro archivo centralizado de Supabase
import { cerrarSesion } from './supabase.js';

document.addEventListener('DOMContentLoaded', function () {
    /* ============================================================
       CONTROL DE SESIÓN Y VINCULACIÓN DINÁMICA (ESPECÍFICO DE INDEX)
       ============================================================ */
    var logged = localStorage.getItem('loggedIn'); 
    var userEmail = (localStorage.getItem('userEmail') || '').toLowerCase().trim();
    
    // DEBUG: Verificar en consola
    console.log('=== DEBUG ADMIN ===');
    console.log('loggedIn value:', localStorage.getItem('loggedIn'));
    console.log('userEmail (raw):', localStorage.getItem('userEmail'));
    console.log('userEmail (processed):', userEmail);
    console.log('Is admin:', userEmail === 'jibarracuervo@gmail.com');
    
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

    logged = (logged === 'true');
    
    if (logged && userEmail === 'jibarracuervo@gmail.com') {
        // Si el usuario es admin, ocultamos elementos innecesarios para una experiencia más limpia
        if (misionVision) misionVision.classList.add('hidden');          
        if (videoSection) videoSection.classList.add('hidden');          
        if (authSection) authSection.classList.add('hidden');            
        if (registertxt) registertxt.classList.add('hidden');            

    } else if (logged) {
        // Usuario logueado pero no es admin
        if (misionVision) misionVision.classList.add('hidden');          
        if (videoSection) videoSection.classList.add('hidden');          
        if (authSection) authSection.classList.add('hidden');            
        if (registertxt) registertxt.classList.add('hidden');            
    } 

    // Añadir el listener para Supabase si el botón de logout existe
    if (logged) {
        var logoutBtn = document.getElementById('logout-btn-header');
        if (logoutBtn) {
            // Clonamos el botón para eliminar los event listeners que tema.js haya agregado
            var newLogoutBtn = logoutBtn.cloneNode(true);
            logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
            
            newLogoutBtn.addEventListener('click', async function (e) {
                e.preventDefault();
                await cerrarSesion();
            });
        }
    }

    if (!logged) {
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
