const $content = document.getElementById('content');
const $barra_busqueda = document.getElementById('barra_busqueda');
const $radios = document.getElementsByName('radio');
const $categorias = document.getElementById('cat');

async function llenarCategorias(){
    let categorias = [];
    await fetch(`http://localhost:6060/readCategoria/-1`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for(let i = 0; i < data.length; i++){
                if(!categorias.includes(data[i].tipo)){
                    categorias.push(data[i].tipo);
                    $categorias.innerHTML += `<li style="text-align: center"><input class="radio" style="display: none" name="radio" id="${data[i].tipo}" type="radio"><label style="cursor: pointer;" for="${data[i].tipo}">${data[i].tipo}</label></li>`;
                }
            }
        })
        .catch(error => console.error(`⚠️ ` + `ERROR EN LA LECTURA: ` + error));
}

function buscar(){
    $content.innerHTML = ''; //<h5>No se encontró ningún producto...</h5>
    let categoria = -1;
    let nombreProducto = $barra_busqueda.value || -1;
    $radios.forEach(element => {
        if(element.checked){
            categoria = element.id;
        }
    });

    console.log(categoria, nombreProducto);
    fetch(`http://localhost:6060/readProductoByCategoria/${encodeURIComponent(categoria)}/${encodeURIComponent(nombreProducto)}`)
    .then(response => response.json())
    .then(data => {
        if(data.length == 0) $content.innerHTML = '<h5>No se encontró ningún producto...</h5>';
        data.forEach(async producto => {

            let img;
            await fetch(`http://localhost:6060/readImagen/${encodeURIComponent(producto.id)}`)
                .then(response => response.blob())
                .then(data => {
                    let read = new FileReader();
                    read.onload = (event) => {
                        img = event.target.result;
                    }
                    read.readAsDataURL(data);
                })
                .catch(error => console.error(`⚠️ ` + `ERROR EN LA LECTURA: ` + error));

            await fetch(`http://localhost:6060/readCategoria/${encodeURIComponent(producto.id)}`)
                .then(response => response.json())
                .then(data => {
                    let categorias = '';
                    data.forEach(element => {
                        categorias += `<li><a href="#">${element.tipo}</a></li>`;
                    })
                    $content.innerHTML += `
                            <div class="ficha" title="${producto.descrip}">
                                <div>
                                    <img src="${img}" alt="..." onerror="this.src='logo.png'">
                                    <h5 class="card-title">${producto.nombre} <i>$${producto.priceU}</i></h5>
                                </div>
                                <ul>
                                    ${categorias}
                                </ul>
                            </div>
                        `;
                })
                .catch(error => console.error(`⚠️ ` + `ERROR EN LA LECTURA` + error));

        });
    })
    .catch(error => console.error(`⚠️ ` + `ERROR EN LA LECTURA: ` + error));
}

buscar();
llenarCategorias();
    