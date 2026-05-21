// Configuración de Supabase
const SUPABASE_URL = 'https://gnkimlwixjgnrdreezvx.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_l__Q5SOsfFyLWu4wNO6i0A_jR2S1pWS'

// Inicializar el cliente de Supabase
// Usamos la versión de CDN para que funcione directamente en el navegador sin compiladores
const { createClient } = window.supabase

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Función para registrar un nuevo usuario
export async function registrarConEmail(email, password, nombre) {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: nombre
                }
            }
        })

        if (error) throw error
        return { data, error: null }
    } catch (error) {
        console.error('Error al registrar:', error.message)
        return { data: null, error: error.message }
    }
}

// Función para iniciar sesión
export async function iniciarSesionConEmail(email, password) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) throw error
        
        // Obtener el nombre del usuario desde los metadatos
        const userName = data.user?.user_metadata?.full_name || email.split('@')[0]
        
        return { data, error: null, userName }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message)
        return { data: null, error: error.message }
    }
}

// Función para cerrar sesión
export async function cerrarSesion() {
    await supabase.auth.signOut()
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userName') /* Limpiar el nombre del usuario al cerrar sesión */
    location.href = 'login.html'
}
