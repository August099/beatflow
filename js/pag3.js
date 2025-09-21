document.addEventListener('DOMContentLoaded', function() {
  const canciones = {
  metal: [
    { titulo: "Enter SandMan - Metallica", youtube: "27VUD3XNZII" }//funciona
  ],
  rock: [
    { titulo: "Highway to Hell - AC/DC", youtube: "BYvXgXSXtfU" }//funciona
  ],
  pop: [
    { titulo: "Stan - Eminen", youtube: "pZd1f05ALTg" },//funciona
    { titulo: "On The Floor - Jennifer Lopez ft. Pitbull", youtube: "2J9Op6f-MMM" },//funciona
    { titulo: "Without Me - Eminem", youtube: "bRWem1X8yPA" }//funciona
  ],
  romantica: [
    { titulo: "Paradise - Coldplay", youtube: "ldLi16uKOwo" },//funciona
  ],
  alternativo: [
    { titulo: "Counting Stars - OneRepublic", youtube: "SRJ6E031I3k" },//funciona
    { titulo: "Something Just Like This - The Chainsmokers & Coldplay", youtube: "R03zGFy65dw" }//funciona
  ],
  tecno: [
    { titulo: "Dangerous - David Guetta", youtube: "QcNyI01eA8I" }//funciona
  
  ],
  cumbia: [
    { titulo: "Something Just Like This - The Chainsmokers & Coldplay", youtube: "R03zGFy65dw" }//funciona
  ],
  latino: [
    { titulo: "TQG - KAROL G, Shakira", youtube: "qGhUW8MARhE" },//funciona
    { titulo: "On The Floor - Jennifer Lopez ft. Pitbull", youtube: "2J9Op6f-MMM" },//funciona
  ]
};

  const resultados = document.getElementById("resultados");
  const generos = document.querySelectorAll(".genero");
  const inputBusqueda = document.getElementById("inputBusqueda");
  const btnBusqueda = document.getElementById("btnBusqueda");

  // Mostrar canciones por género
  generos.forEach(genero => {
    genero.addEventListener("click", () => {
      const seleccionado = genero.dataset.genero;
      mostrarResultados(canciones[seleccionado], `Canciones de ${genero.innerText}`);
    });
  });

  // Buscar canciones
  btnBusqueda.addEventListener("click", () => {
    const consulta = inputBusqueda.value.toLowerCase();
    if (!consulta) {
      resultados.innerHTML = "<p>Ingrese un término de búsqueda</p>";
      return;
    }

    let filtradas = [];
    Object.keys(canciones).forEach(genero => {
      canciones[genero].forEach(cancion => {
        if (cancion.titulo.toLowerCase().includes(consulta)) {
          filtradas.push(cancion);
        }
      });
    });

    if (filtradas.length > 0) {
      mostrarResultados(filtradas, `Resultados de búsqueda para "${consulta}"`);
    } else {
      resultados.innerHTML = `<p>No se encontraron canciones para "${consulta}"</p>`;
    }
  });

  // Función para mostrar resultados con videos
  function mostrarResultados(lista, titulo) {
    resultados.innerHTML = `<h2>${titulo}</h2>` + 
      lista.map(cancion => `
        <div class="cancion">
          <p>${cancion.titulo}</p>
          <iframe 
            src="https://www.youtube.com/embed/${cancion.youtube}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `).join("");
  }
});


