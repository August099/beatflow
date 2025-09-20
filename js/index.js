async function cargar_canciones() {
    const contenedor = document.getElementById("canciones-sugerencias")
    const template = document.getElementById("template-sugerencia-canciones")

    for (let i = 0; i < 6; i++) {
        const clon = template.content.cloneNode(true)
        const cancion = await cancion_aleatoria()

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
        const canciones = []

        for (let index = 0; index < 10; index++) {
            const cancion = await cancion_aleatoria()
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

    for (let i = 0; i < 3; i++) {
        const clon = template.content.cloneNode(true)
        const artista = await artista_aleatorio()
        const albumes = artista.albumes
        
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

    for (let i = 0; i < 3; i++) {
        const clon = template.content.cloneNode(true)
        const banda = await banda_aleatoria()
        const albumes = banda.albumes
        
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

async function cancion_aleatoria(expeciones = []) {
    return new Promise((resolve, reject) => {
        fetch('./js/data.json')
            .then(response => response.json()) 
            .then(data => {
                resolve(data.canciones[Math.floor(Math.random() * (data.canciones.length))])
            })
            .catch(err => console.error(err));
    })
}

async function artista_aleatorio(expeciones = []) {
    return new Promise((resolve, reject) => {
        fetch('./js/data.json')
            .then(response => response.json()) 
            .then(data => {
                const listaArtistas = Object.keys(data.artistas)
                const artistaSeleccionado = listaArtistas[Math.floor(Math.random() * (listaArtistas.length))]
                data.artistas[artistaSeleccionado].nombre = artistaSeleccionado
                resolve(data.artistas[artistaSeleccionado])   
            })
            .catch(err => console.error(err));
    })
}

async function banda_aleatoria(expeciones = []) {
    return new Promise((resolve, reject) => {
        fetch('./js/data.json')
            .then(response => response.json()) 
            .then(data => {
                const listaBandas = Object.keys(data.bandas)
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
}

document.addEventListener('DOMContentLoaded', () => {
    cargar_canciones()
    cargar_mixes()
    cargar_artistas()
    cargar_bandas()
})
