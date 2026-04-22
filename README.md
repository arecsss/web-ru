# web-RU (Real Utility)

> Plataforma web de descargas seguras sin publicidad, optimizaciones de PC y aprendizaje tecnológico.

## ¿Qué es web-RU?

**web-RU** es un proyecto personal creado por [Juan Sebastián Rubio Cuervo](mailto:jibarracuervo@gmail.com), estudiante de Ingeniería de Sistemas en la Fundación Universitaria U compensar. El objetivo principal es brindar a cada usuario un espacio confiable y libre de engaños donde pueda descargar herramientas, optimizaciones y programas reales para su equipo.

## Mission

Eliminar la frustración de:
- Botones falsos de descarga
- Comandos confusos
- Páginas llenas de publicidad molesta

## Características

- **Descargas Seguras** - Programas verificados sin bundles ni publicidad
- **Optimizaciones** - Guías para PC y móvil (individuales y paquetes)
- **Sistemas Operativos** - Distribuciones ISO con comparaciones
- **Academia** - Artículos y tutoriales tecnológicos
- **Soporte** - Tickets, chat en tiempo real y contacto directo
- **Panel de Administración** - Gestión completa del sitio

## Páginas del Proyecto

| Página | Descripción |
|--------|-------------|
| `index.html` | Principal - presentación, gestión de usuario, misión/visión |
| `login.html` | Login de usuarios |
| `register.html` | Registro de nuevos usuarios |
| `programas.html` | Directorio de programas con categorías y buscador |
| `optimizaciones.html` | Optimizaciones para PC y móvil |
| `sistemas.html` | Distribuciones de sistemas operativos |
| `aprende.html` | Academia informativa con artículos |
| `solicitudes.html` | Tickets y chat en tiempo real |
| `contacto.html` | Sección de soporte y contacto |
| `quiensoy.html` | Información sobre el creador |
| `descargo.html` | Aviso de responsabilidad |
| `politica-privacidad.html` | Política de privacidad |
| `admin.html` | Panel de administración |

## Tecnologías

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend/DB:** Supabase (Auth + Base de datos)
- **Estilos:** Variables CSS, sistema de temas (dark/light)
- **Sin frameworks** - Código puro para control total

## Estructura del Proyecto

```
web-RU/
├── Cuerpo/           # 12 páginas HTML
├── JS/               # Scripts JavaScript
│   ├── supabase.js   # Conexión a Supabase
│   ├── tema.js       # Control tema oscuro/claro
│   ├── sesion.js     # Verificación de sesión
│   └── ...
├── style/
│   └── index.css    # Estilos principales
├── img/             # Imágenes y recursos
└── README.md
```

## Instalación Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/web-RU.git
   ```

2. Abrir en un servidor local (recomendado para Supabase):
   ```bash
   # Si tienes Python instalado
   python -m http.server 8000

   # O con Node.js
   npx serve
   ```

3. Configurar Supabase:
   - Crear proyecto en [supabase.com](https://supabase.com)
   - Actualizar credenciales en `JS/supabase.js`

## Effectos Visuales

- **Cubo Rubik 3D** - Logo animado en el navbar
- **Pixel Effect** - Partículas de colores en el fondo
- **Pixel Trail** - Estela de partículas del mouse
- **Toggle Tema** - Botón animado sol/luna

## Base de Datos (Supabase)

### Tablas
- `users` - Usuarios registrados
- `tickets` - Sistema de tickets
- `sugerencias` - Sugerencias de usuarios
- `quejas` - Quejas y reclamos
- `solicitudes_servicio` - Solicitudes de servicio
- `mensajes_chat` - Chat en tiempo real

## Contribuir

1. Fork del repositorio
2. Crear rama: `git checkout -b feature/nueva-caracteristica`
3. Commit: `git commit -m 'Añadir nueva característica'`
4. Push: `git push origin feature/nueva-caracteristica`
5. Abrir Pull Request

## Licencia

MIT License - Consulta el archivo LICENSE para más detalles.

## Contacto

- **Email:** jibarracuervo@gmail.com
- **Proyecto:** [https://github.com/tu-usuario/web-RU](https://github.com/tu-usuario/web-RU)

---

*Creado con 💻 por Juan Sebastián Rubio Cuervo*
*Ingeniería de Sistemas - Fundación Universitaria U compensar*