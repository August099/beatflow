document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    const switchModo = document.getElementById('flexSwitchCheckDefault')

    if (usuario.modo === 'oscuro') {
        switchModo.checked = true

        document.documentElement.style.setProperty('--gradiente-fondo', 'radial-gradient(circle,rgba(65, 90, 119, 1) 0%, rgba(65, 90, 119, 1) 100%)')
        document.documentElement.style.setProperty('--color-claro', '#778DA9')
        document.documentElement.style.setProperty('--color-semiclaro', '#415A77')
        document.documentElement.style.setProperty('--color-medio', '#1B263B')
        document.documentElement.style.setProperty('--color-oscuro', '#0D1B2A')
        document.documentElement.style.setProperty('--color-fuerte', '#E0E1DD')
    }

    switchModo.addEventListener('change', () => {
        if (switchModo.checked === true) {
            usuario.modo = 'oscuro'

            document.documentElement.style.setProperty('--gradiente-fondo', 'radial-gradient(circle,rgba(65, 90, 119, 1) 0%, rgba(65, 90, 119, 1) 100%)')
            document.documentElement.style.setProperty('--color-claro', '#778DA9')
            document.documentElement.style.setProperty('--color-semiclaro', '#415A77')
            document.documentElement.style.setProperty('--color-medio', '#1B263B')
            document.documentElement.style.setProperty('--color-oscuro', '#0D1B2A')
            document.documentElement.style.setProperty('--color-fuerte', '#E0E1DD')
        } else {
            usuario.modo = 'claro'

            document.documentElement.style.setProperty('--gradiente-fondo', 'radial-gradient(circle,rgba(0, 150, 199, 1) 0%, rgba(0, 119, 182, 1) 100%)')
            document.documentElement.style.setProperty('--color-claro', '#00B4D8')
            document.documentElement.style.setProperty('--color-semiclaro', '#0096C7')
            document.documentElement.style.setProperty('--color-medio', '#0077B6')
            document.documentElement.style.setProperty('--color-oscuro', '#023E8A')
            document.documentElement.style.setProperty('--color-fuerte', '#03045E')
        }

        localStorage.setItem('usuario', JSON.stringify(usuario))
    })
})