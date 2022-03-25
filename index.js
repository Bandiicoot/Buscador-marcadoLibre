function contarResultados(data) {
  const spanResultadosEl = document.querySelector(".resultados-de-busqueda");
  spanResultadosEl.textContent = data["paging"]["total"];
}

function borrarResultados() {
  const contenedor = document.querySelector("#resultss");
  while (contenedor.lastElementChild) {
    contenedor.removeChild(contenedor.lastElementChild);
  }
}

function mostrarResultados(results) {
  const contenedor = document.querySelector("#resultss");
  const template = document.querySelector("#result-item-template");
  //console.log(results);
  for (const r of results) {
    console.log(r);
    //imagen
    const imgEl = template.content.querySelector(".imagen-de-producto");
    imgEl.setAttribute("src", r.thumbnail);

    //titulo
    const nameEl = template.content.querySelector(".name");
    nameEl.textContent = r.title.substring(0, 38) + "...";
    //estado
    const estadoEl = template.content.querySelector(".estado");
    estadoEl.textContent = r.condition;
    if (estadoEl.textContent == "new") {
      estadoEl.textContent = "Nuevo";
    } else if (estadoEl.textContent == "used") {
      estadoEl.textContent = "Usado";
    } else {
      estadoEl.textContent = "No especificado";
    }

    //cantidad de vendidos
    const ventasEl = template.content.querySelector(".numero-de-ventas");
    ventasEl.textContent = r["sold_quantity"];
    //precio
    const precioEl = template.content.querySelector(".precio");
    precioEl.textContent = r.price;
    //reenvio
    const linkEl = template.content.querySelector(".reenvio");
    linkEl.href = r.permalink;

    const clone = document.importNode(template.content, true);
    contenedor.appendChild(clone);
  }
}

function main() {
  const buscar = document.querySelector(".buscador");

  buscar.addEventListener("submit", (event) => {
    event.preventDefault();
    //datosABuscar = new FormData(event.target);
    // console.log(datosABuscar);
    const datosABuscar = event.target.buscar.value;
    console.log(datosABuscar);
    fetch(" https://api.mercadolibre.com/sites/MLA/search?q=" + datosABuscar)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        contarResultados(data);
        borrarResultados();
        mostrarResultados(data.results);
      });
  });
  //mostrarResultados([1, 2, 3, 4, 5, 6]);
}

main();
