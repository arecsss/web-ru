# Proyecto: web-RU (Real Utility)

## Información General

**Creador:** Juan Sebastián Rubio Cuervo  
**Programa:** Ingeniería de Sistemas  
**Institución:** Fundación universitaria U compensar  
**Profesor:** Cristian Alejandro Amaya Fernández  
**Fecha:** 20/04/2026

---

## ¿Qué es?
Sitio web de descargas seguras de programas, optimizaciones de PC, tutoriales y recursos de sistemas operativos. Incluye sistema de usuarios con login/registro (Supabase), panel de admin, sección de solicitudes, chat en tiempo real, etc.

## Ubicación
`C:\web-RU`

## Objetivo
Desarrollar una pagina web personal donde la gente pueda encontrar los programas que necesitan sin publicidad o anuncios molestos, además de encontrar optimizaciones para sus equipos y enseñanzas de tecnología, con recursos de ISO'S y chats de soporte.

## Misión
Brindar a cada usuario un espacio confiable y libre de engaños donde pueda descargar herramientas, optimizaciones y programas reales para su equipo. Eliminar la frustración de los botones falsos, los comandos confusos y las páginas llenas de publicidad.

## Visión
Convertirnos en la plataforma de referencia en habla hispana para la instalación, optimización y aprendizaje tecnológico.

---

## Páginas del Proyecto (Cuerpo/)

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Principal - presentación, gestión de usuario, misión/visión, video explicativo |
| `login.html` | Login de usuarios (limitado a inicio, quien soy y solicitudes) |
| `register.html` | Registro de nuevos usuarios |
| `programas.html` | Directorio de programas con categorías y buscador |
| `optimizaciones.html` | Optimizaciones para PC y móvil (individuales y paquetes) |
| `sistemas.html` | Distribuciones de sistemas operativos, comparaciones, noticias |
| `aprende.html` | Academia informativa con modales y filtros (botón "LEER MÁS") |
| `solicitudes.html` | Tickets, chat en tiempo real, quejas y sugerencias |
| `contacto.html` | Sección de soporte y contacto con el creador |
| `quiensoy.html` | Información sobre el creador y historia del proyecto |
| `descargo.html` | Aviso de responsabilidad de descargas |
| `politica-privacidad.html` | Política de privacidad |
| `admin.html` | Panel de administración (solo jibarracuervo@gmail.com) |

---

## Tecnologías Usadas

- **Frontend:** HTML5, CSS3, JavaScript vanilla (ES6+)
- **Backend/Base de datos:** Supabase
- **Estilos:** Variables CSS, sistema de temas (dark/light)
- **Sin frameworks** - para mantener control y aprender las bases

---

## Sistema de Autenticación

- Todo corre a través de `supabase.js` (conexión centralizada)
- `sesion.js` verifica si el usuario está logueado
- Sesión persistente con localStorage
- Cada página protegida tiene un "guard" que verifica登录状态
- Si no está logueado, redirige a login con retorno a la página original

---

## Tema Oscuro/Claro

- Controlado por `tema.js` (IIFE - se ejecuta antes de cargar)
- Detecta preferencia del sistema operativo
- Guarda elección en localStorage
- Usa variables CSS en `:root` - al agregar clase `dark-mode` al body, todos los colores cambian

---

## Lo que hemos hecho (sesión 21/04/2026)

### 1. Organización de scripts JS
Extrajimos todos los scripts inline de los archivos HTML y los organizamos en archivos separados:
- **JS/auth-guard.js** - Verifica si el usuario está logueado, si no lo redirige a login
- **JS/theme-session.js** - Controla el tema oscuro y el botón de cerrar sesión
- **JS/carrusel-sistemas.js** - Carrusel de noticias en la página de Sistemas
- **JS/buscador-programas.js** - Buscador en tiempo real de programas
- **JS/modales-aprende.js** - Sistema de modales (ventanas emergentes) y filtros para la sección Aprende
- **JS/descarga-forzada.js** - Descarga forzada de archivos desde HuggingFace

### 2. HTMLs actualizados
- Sistemas.html → auth-guard + theme-session + carrusel-sistemas
- Optimizaciones.html → auth-guard + theme-session + descarga-forzada
- Programas.html → auth-guard + theme-session + buscador-programas
- Aprende.html → auth-guard + modales-aprende + theme-session
- solicitudes.html → theme-session
- Contacto.html → theme-session
- Descargo.html → theme-session
- politica-privacidad.html → theme-session

### 3. Lazy Loading
Las 105 imágenes de Programas.html ya tienen `loading="lazy"` aplicado.

---

## Archivos JS Originales (ya existentes)

| Archivo | Función |
|---------|---------|
| `supabase.js` | Conexión con Supabase |
| `tema.js` | Control del modo oscuro/claro |
| `sesion.js` | Verificación de sesión de usuario |
| `pixel-effect.js` | Partículas de colores en el fondo |
| `pixel-trail.js` | Estela de partículas del mouse |
| `page-index.js` | Lógica de la página principal |
| `page-login.js` | Lógica de login |
| `page-register.js` | Lógica de registro |

---

## Base de Datos (Supabase)

### Tablas:
1. **users** - ID, email, fecha registro, nombre completo
2. **tickets** - ID, tipo (sugerencia/queja/solicitud), asunto, mensaje, email, fecha, estado
3. **sugerencias** - para sugerencias de usuarios
4. **quejas** - para quejas/reclamos
5. **solicitudes_servicio** - para solicitudes de servicio
6. **mensajes_chat** - mensajes del chat en tiempo real

---

## Efectos Visuales

- **Cubo Rubik 3D** - Logo animado en el nav (todos los HTML)
- **Pixel Effect** - Partículas de colores en background
- **Pixel Trail** - Estela de partículas al mover el mouse
- **Toggle tema** - Checkbox transformado en botón animado con sol/luna

---

## Rendimiento

- Recursos importantes con `preload`
- Imágenes con `loading="lazy"`
- Scripts de Supabase con `defer`
- Animaciones con `transform` y `opacity` (usa GPU)
- Módulos ES6 para organización del código

---

## Estructura del Proyecto

```
C:\web-RU\
├── Cuerpo\           (12 archivos HTML)
├── JS\               (archivos JS)
│   ├── supabase.js
│   ├── tema.js
│   ├── sesion.js
│   ├── auth-guard.js (nuevo)
│   ├── theme-session.js (nuevo)
│   ├── carrusel-sistemas.js (nuevo)
│   ├── buscador-programas.js (nuevo)
│   ├── modales-aprende.js (nuevo)
│   ├── descarga-forzada.js (nuevo)
│   ├── pixel-effect.js
│   ├── pixel-trail.js
│   └── page-*.js
├── style\            (CSS - index.css)
├── img\              (imágenes y recursos)
├── sesiones\         (para guardar sesiones exportadas)
└── CONTEXTO.md       (este archivo)
```

---

## Cómo continuar una sesión

1. Abrir OpenCode en la carpeta `C:\web-RU`
2. Al iniciar, decir: **"Lee el archivo CONTEXTO.md para entender el proyecto"**
3. Continuar desde donde dejamos

---

## Pendiente / Próximos pasos

- Ninguno definido por ahora
- Hay cosas por pulir y conexiones backend por completar