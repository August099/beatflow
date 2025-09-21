function activar_select() {
    const select = document.getElementById('ordenar')

    select.addEventListener('change', () => {
        const contenedor = document.getElementById('lista-canciones')
        contenedor.innerHTML = ''

        const usuario = JSON.parse(localStorage.getItem('usuario'))
        const canciones = usuario.canciones
        let cancionesOrdenadas

        if (select.value === 'artista') {
            usuario.orden = 'artista'
            cancionesOrdenadas = canciones.sort((a, b) => a.autor.localeCompare(b.autor))
        } else {
            usuario.orden = 'cancion'
            cancionesOrdenadas = canciones.sort((a, b) => a.nombre.localeCompare(b.nombre))
        }

        localStorage.setItem('usuario', JSON.stringify(usuario))
        
        agregar_canciones(cancionesOrdenadas)
    })
}

function agregar_canciones(lista) {
    const contenedor = document.getElementById('lista-canciones')
    const template = document.getElementById('template-cancion')
    let numero = 1
    
    if (lista.length === 0) {
        const template = document.getElementById('sin-canciones')
        const clon = template.content.cloneNode(true)
        contenedor.appendChild(clon)
    }

    for (const cancion of lista) {
        const clon = template.content.cloneNode(true)
        const item = clon.firstElementChild

        clon.querySelector('.numero').textContent = numero
        numero++

        clon.querySelector('.nombre').textContent = cancion.nombre
        clon.querySelector('.autor').textContent = cancion.autor

        const eliminar = clon.querySelector('.guardar')

        eliminar.addEventListener('click', () => {
            const usuario = JSON.parse(localStorage.getItem('usuario'))

            usuario.canciones = usuario.canciones.filter(obj => obj.id !== cancion.id)
            item.remove()

            localStorage.setItem('usuario', JSON.stringify(usuario))

            if (contenedor.childElementCount === 0) {
                const template = document.getElementById('sin-canciones')
                const clon = template.content.cloneNode(true)
                contenedor.appendChild(clon)
            }
        })

        contenedor.appendChild(clon)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    const canciones = usuario.canciones
    let cancionesOrdenadas

    const select = document.getElementById('ordenar')

    if (usuario.orden === 'artista') {
        select.value = 'artista'
        cancionesOrdenadas = canciones.sort((a, b) => a.autor.localeCompare(b.autor))
    } else {
        select.value = 'cancion'
        cancionesOrdenadas = canciones.sort((a, b) => a.nombre.localeCompare(b.nombre))
    }

    agregar_canciones(cancionesOrdenadas)

    activar_select()
})