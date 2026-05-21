import { registrarConEmail, iniciarSesionConEmail } from './supabase.js';

// Si ya está autenticado, evitar acceder a esta página de registro
if (localStorage.getItem('loggedIn') === 'true') {
  location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function () {
  // Manejo del toggle de tema oscuro específicamente para esta página si se requiere
  var toggleNav = document.getElementById('dark-mode-toggle');
  if (document.body.classList.contains('dark-mode') && toggleNav) {
    toggleNav.checked = true;
  }

  if (toggleNav) {
    toggleNav.addEventListener('change', function (e) {
      if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light-mode');
      }
    });
  }

  // Lógica del formulario de registro
  var form = document.getElementById('register-form');
  var errorMsg = document.getElementById('error-message');
  var successMsg = document.getElementById('success-message');
  var submitBtn = document.getElementById('submit-btn');

  // Muestra un mensaje si el usuario fue redirigido
  var params = new URLSearchParams(window.location.search);
  if (params.has('redirect')) {
    var msgEl = document.getElementById('redirect-message');
    if (msgEl) {
      msgEl.textContent = 'Regístrate para acceder a las características.';
      msgEl.style.display = 'block';
    }
  }

  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      errorMsg.style.display = 'none';
      successMsg.style.display = 'none';

      var nombre = document.getElementById('full-name').value;
      var email = document.getElementById('email').value;
      var password = document.getElementById('regPassword').value;
      var confirmPassword = document.getElementById('regConfirmPassword').value;

      if (password !== confirmPassword) {
        errorMsg.textContent = "Las contraseñas no coinciden.";
        errorMsg.style.display = 'block';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Cargando...";

      const { data, error } = await registrarConEmail(email, password, nombre);

      if (error) {
        errorMsg.textContent = "Error: " + error;
        errorMsg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = "Registrarse";
      } else {
        // Intentar iniciar sesión automáticamente después del registro
        const { data: loginData, error: loginError } = await iniciarSesionConEmail(email, password);
        
        if (loginError) {
          // Si falla el login automático, mostrar mensaje de confirmación
          successMsg.textContent = "¡Registro exitoso! Por favor, revisa tu correo para confirmar tu cuenta.";
          successMsg.style.display = 'block';
          form.reset();
          submitBtn.textContent = "Registrado";
        } else {
          // Si el login es exitoso, guardar sesión con el nombre y redirigir
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', nombre); /* Guardar el nombre completo del usuario */
          
          var redirect = params.get('redirect');
          location.href = redirect ? redirect : 'index.html';
        }
      }
    });
  }
});
