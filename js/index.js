let cancionActual
const audio = new Audio()

async function cargar_canciones() {
    const contenedor = document.getElementById("canciones-sugerencias")
    const template = document.getElementById("template-sugerencia-canciones")
    const cancionesSelec = []

    for (let i = 0; i < 6; i++) {
        const clon = template.content.cloneNode(true)
        const cancion = await cancion_aleatoria(cancionesSelec)
        cancionesSelec.push(cancion.id)

        clon.querySelector(".card-title").textContent = cancion.nombre

        const imagen = clon.querySelector('img')
        imagen.src = cancion.portada

        clon.querySelector("button").addEventListener('click', () => reproducir_cancion(cancion))

        contenedor.appendChild(clon)
    }
}

async function cargar_mixes() {
    const contenedor = document.getElementById("mixes")
    const template = document.getElementById("template-sugerencia-mix")

    for (let i = 0; i < 4; i++) {
        const clone = template.content.cloneNode(true)
        const cancionesSelec = []
        const canciones = []

        for (let index = 0; index < 10; index++) {
            const cancion = await cancion_aleatoria(cancionesSelec)
            cancionesSelec.push(cancion.id)
            canciones.push(cancion.nombre)
        }

        clone.querySelector(".card-title").textContent = `Mix diario ${i + 1}`
        clone.querySelector(".card-text").textContent = canciones.join(', ')
        contenedor.appendChild(clone)
    }
}

async function cargar_artistas() {
    const contenedor = document.getElementById("artistas-sugerencias")
    const template = document.getElementById("template-sugerencia-carrusel")
    const artistasSelec = []

    for (let i = 0; i < 3; i++) {
        const clon = template.content.cloneNode(true)
        const artista = await artista_aleatorio(artistasSelec)
        const albumes = artista.albumes

        artistasSelec.push(artista.nombre)
        
        clon.querySelector(".sub-titulo").textContent = artista.nombre
        clon.querySelector(".imagen-artista").src = albumes[0].portada

        const carrusel = clon.querySelector(".carrusel")
        const carruselItems = carrusel.querySelector(".carrusel-items")
        const templateItemCarrusel = document.getElementById("template-item-carrusel")

        for (const album of albumes) {
            const clonItem = templateItemCarrusel.content.cloneNode(true)
            const canciones = []

            album.canciones.forEach(cancion => {
                canciones.push(cancion.nombre)
            });

            clonItem.querySelector(".card-title").textContent = album.nombre
            clonItem.querySelector(".card-text").textContent = canciones.join(', ')
            clonItem.querySelector("img").src = album.portada
            carruselItems.appendChild(clonItem)
        }

        activar_carrusel(carrusel)

        contenedor.appendChild(clon)
    }
}

async function cargar_bandas() {
    const contenedor = document.getElementById("bandas-sugerencias")
    const template = document.getElementById("template-sugerencia-carrusel")
    const bandasSelec = []

    for (let i = 0; i < 3; i++) {
        const clon = template.content.cloneNode(true)
        const banda = await banda_aleatoria(bandasSelec)
        const albumes = banda.albumes

        bandasSelec.push(banda.nombre)
        
        clon.querySelector(".sub-titulo").textContent = banda.nombre
        clon.querySelector(".imagen-artista").src = albumes[0].portada

        const carrusel = clon.querySelector(".carrusel")
        const carruselItems = carrusel.querySelector(".carrusel-items")
        const templateItemCarrusel = document.getElementById("template-item-carrusel")

        for (const album of albumes) {
            const clonItem = templateItemCarrusel.content.cloneNode(true)
            const canciones = []

            album.canciones.forEach(cancion => {
                canciones.push(cancion.nombre)
            });

            clonItem.querySelector(".card-title").textContent = album.nombre
            clonItem.querySelector(".card-text").textContent = canciones.join(', ')
            clonItem.querySelector("img").src = album.portada
            carruselItems.appendChild(clonItem)
        }

        activar_carrusel(carrusel)

        contenedor.appendChild(clon)
    }
}

async function activar_carrusel (carrusel) {
    const carruselItems = carrusel.querySelector(".carrusel-items")
    const prevBtn = carrusel.querySelector(".carousel-control-prev")
    const proxBtn = carrusel.querySelector(".carousel-control-next")
    const cartas = carruselItems.querySelectorAll(".carrusel-item")

    let i = 0
    const cartasVisibles = 5
    const total = cartas.length

    const mover_carrusel = () => {
        const cardWidth = cartas[0].offsetWidth + parseFloat(getComputedStyle(cartas[0]).marginRight) * 2
        carruselItems.style.transform = `translateX(-${i * cardWidth}px)`
    }
    
    proxBtn.addEventListener("click", () => {
        if (i < total - cartasVisibles) {
            i++
            mover_carrusel()
        }
    })

    prevBtn.addEventListener("click", () => {
        if (i > 0) {
            i--
            mover_carrusel()
        }
    })

    window.addEventListener("resize", mover_carrusel)

}

async function cancion_aleatoria(excepciones = []) {
    return new Promise((resolve, reject) => {
        fetch('./js/data.json')
            .then(response => response.json()) 
            .then(data => {
                const canciones = data.canciones.filter(obj => !excepciones.includes(obj.id))

                resolve(canciones[Math.floor(Math.random() * (canciones.length))])
            })
            .catch(err => console.error(err));
    })
}

async function artista_aleatorio(excepciones = []) {
    return new Promise((resolve, reject) => {
        fetch('./js/data.json')
            .then(response => response.json()) 
            .then(data => {
                const listaArtistas = Object.keys(data.artistas).filter(nombre => !excepciones.includes(nombre))
                const artistaSeleccionado = listaArtistas[Math.floor(Math.random() * (listaArtistas.length))]
                data.artistas[artistaSeleccionado].nombre = artistaSeleccionado
                resolve(data.artistas[artistaSeleccionado])   
            })
            .catch(err => console.error(err));
    })
}

async function banda_aleatoria(excepciones = []) {
    return new Promise((resolve, reject) => {
        fetch('./js/data.json')
            .then(response => response.json()) 
            .then(data => {
                const listaBandas = Object.keys(data.bandas).filter(nombre => !excepciones.includes(nombre))
                const bandaSeleccionada = listaBandas[Math.floor(Math.random() * (listaBandas.length))]
                data.bandas[bandaSeleccionada].nombre = bandaSeleccionada
                resolve(data.bandas[bandaSeleccionada])   
            })
            .catch(err => console.error(err));
    })
}

function reproducir_cancion (cancion) {
    document.getElementById('imagen-reproductor').src = cancion.portada
    document.getElementById('cancion-reproductor').textContent = cancion.nombre
    document.getElementById('autor-reproductor').textContent = cancion.autor

    const footer = document.querySelector('footer')

    if (footer.classList.contains('d-none')) {
        footer.classList.remove('d-none')
        footer.classList.add('d-flex')
    }

    cancionActual = cancion
    audio.src = cancion.audio
    audio.play()
    audio.currentTime

    const btnReproducir = document.getElementById('reproducir-cancion')
    const iconoReproducir = btnReproducir.querySelector('i')

    if (iconoReproducir.classList.contains('bi-play-fill')) {
        iconoReproducir.classList.remove('bi-play-fill')
        iconoReproducir.classList.add('bi-pause-fill')
    }
}

function activar_footer() {
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    const btnGuardar = document.getElementById('guardar-cancion')
    const iconoGuradar = btnGuardar.querySelector('i')

    btnGuardar.addEventListener('click', () => {
        if (cancionActual) {
            if (iconoGuradar.classList.contains('bi-heart')) {
                usuario.canciones.push(cancionActual)

                iconoGuradar.classList.remove('bi-heart')
                iconoGuradar.classList.add('bi-heart-fill')
            } else {
                usuario.canciones = usuario.canciones.filter(obj => obj.id !== cancionActual.id)
                iconoGuradar.classList.remove('bi-heart-fill')
                iconoGuradar.classList.add('bi-heart')
            }

            localStorage.setItem('usuario', JSON.stringify(usuario))
        }
    })

    const btnReproducir = document.getElementById('reproducir-cancion')
    const iconoReproducir = btnReproducir.querySelector('i')

    btnReproducir.addEventListener('click', () => {
        if (cancionActual) {
            if (iconoReproducir.classList.contains('bi-play-fill')) {
                audio.play()
                iconoReproducir.classList.remove('bi-play-fill')
                iconoReproducir.classList.add('bi-pause-fill')
            } else {
                audio.pause()
                iconoReproducir.classList.remove('bi-pause-fill')
                iconoReproducir.classList.add('bi-play-fill')
            }
        }
    })

    const volumen = document.getElementById('volumen-cancion')
    const mutear = document.getElementById('mutear-cancion')
    const iconoMutear = mutear.querySelector('i')

    audio.volume = usuario.volumen
    volumen.value = usuario.volumen

    if (volumen.value == 0) {
        iconoMutear.classList.remove('bi-volume-up-fill')
        iconoMutear.classList.add('bi-volume-mute-fill')
    }

    if (volumen.value === 0) {
        iconoMutear.classList.remove('bi-volume-up-fill')
        iconoMutear.classList.add('bi-volume-mute-fill')
    }

    volumen.addEventListener('input', () => {
        usuario.volumen = volumen.value

        localStorage.setItem('usuario', JSON.stringify(usuario))

        audio.volume = volumen.value

        if (volumen.value == 0) {
            iconoMutear.classList.remove('bi-volume-up-fill')
            iconoMutear.classList.add('bi-volume-mute-fill')
        } else if (iconoMutear.classList.contains('bi-volume-mute-fill')) {
            iconoMutear.classList.remove('bi-volume-mute-fill')
            iconoMutear.classList.add('bi-volume-up-fill')
        }
    })

    mutear.addEventListener('click', () => {
        if (iconoMutear.classList.contains('bi-volume-up-fill')) {
            audio.volume = 0
            volumen.value = 0
            usuario.volumen = volumen.value

            localStorage.setItem('usuario', JSON.stringify(usuario))

            iconoMutear.classList.remove('bi-volume-up-fill')
            iconoMutear.classList.add('bi-volume-mute-fill')
        } else {
            audio.volume = 0.5
            volumen.value = 0.5

            iconoMutear.classList.remove('bi-volume-mute-fill')
            iconoMutear.classList.add('bi-volume-up-fill')
        }
    })

    const progreso = document.getElementById('progreso-reproductor')
    const tiempoActual = document.getElementById('tiempo-actual-cancion')
    const duracion = document.getElementById('duracion-cancion')

    audio.addEventListener("loadedmetadata", () => {
        progreso.max = audio.duration
        duracion.textContent = formato_tiempo(audio.duration)
    })

    audio.addEventListener("timeupdate", () => {
        progreso.value = audio.currentTime
        tiempoActual.textContent = formato_tiempo(audio.currentTime)
    })

    progreso.addEventListener("input", () => {
        audio.currentTime = progreso.value
    })

    const footer = document.querySelector('footer')
    const cerrar = document.getElementById('cerrar-footer')

    cerrar.addEventListener('click', () => {
        if (footer.classList.contains('d-flex')) {
            audio.src = null
            footer.classList.remove('d-flex')
            footer.classList.add('d-none')
        }
    })
}

function formato_tiempo(tiempo) {
  const minutos = Math.floor(tiempo / 60)
  const segundos = Math.floor(tiempo % 60)

  return (
    String(minutos).padStart(2, "0") +
    ":" +
    String(segundos).padStart(2, "0")
  )
}

document.addEventListener('DOMContentLoaded', () => {
    
    const usuario = JSON.parse(localStorage.getItem('usuario'))

    if (!usuario) {
        localStorage.setItem('usuario', JSON.stringify( { canciones: [], volumen: 0.5 } ))
    }

    activar_footer()
    cargar_canciones()
    cargar_mixes()
    cargar_artistas()
    cargar_bandas()
})
