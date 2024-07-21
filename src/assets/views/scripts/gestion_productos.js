const $tbody = document.getElementById('body_content');
const $barra_busqueda = document.getElementById('barra_busqueda');

function llenarTabla() {
    $tbody.innerHTML = '';
    let nombre = $barra_busqueda.value || -1;
    console.log(nombre);
    fetch(`http://localhost:6060/readProducto/${encodeURIComponent(nombre)}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                $tbody.innerHTML +=
                    `
                        <tr style="display: flex; width: 100%;">
                            <td style="display: block;" class="tableCell">${element.id}</td>
                            <td style="display: block;" class="tableCell">${element.nombre}</td>
                            <td style="display: block;" class="tableCell">${element.descrip}</td>
                            <td style="display: block;" class="tableCell">${element.stock}</td>
                            <td style="display: block;" class="tableCell">${element.priceU}</td>
                        </tr>
                    `;
            });
        })
        .catch(error => console.error(`⚠️ ` + `ERROR EN LA LECTURA: ` + error));
}

llenarTabla();