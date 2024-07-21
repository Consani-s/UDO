const $tbody = document.getElementById('body_content');
const $barra_busqueda = document.getElementById('barra_busqueda');

function llenarTabla() {
    $tbody.innerHTML = '';
    let id = $barra_busqueda.value || -1;
    console.log(id);
    fetch(`http://localhost:6060/readServicio/1/${encodeURIComponent(id)}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                $tbody.innerHTML +=
                    `
                        <tr style="display: flex; width: 100%;">
                            <td style="display: block;" class="tableCell">${element.id}</td>
                            <td style="display: block;" class="tableCell">${element.idUsuario}</td>
                            <td style="display: block;" class="tableCell">${element.tipo}</td>
                            <td style="display: block;" class="tableCell">${element.fechaInicial}</td>
                            <td style="display: block;" class="tableCell">${element.fechaFinal}</td>
                            <td style="display: block;" class="tableCell">${element.estado}</td>
                            <td style="display: block;" class="tableCell">${element.precioAcumulado}</td>
                        </tr>
                    `;
            });
        })
        .catch(error => console.error(`⚠️ ` + `ERROR EN LA LECTURA: ` + error));
}

llenarTabla();