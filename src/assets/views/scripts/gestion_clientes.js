const $tbody = document.getElementById('body_content');
const $barra_busqueda = document.getElementById('barra_busqueda');

function llenarTabla() {
    $tbody.innerHTML = '';
    let nombreCompleto = $barra_busqueda.value.toUpperCase() || -1;
    console.log(nombreCompleto);
    fetch(`http://localhost:6060/readUsuario/1/${encodeURIComponent(nombreCompleto)}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                $tbody.innerHTML +=
                    `
                        <tr style="display: flex; width: 100%;">
                            <td style="display: block;" class="tableCell">${element.id}</td>
                            <td style="display: block;" class="tableCell">${element.ced}</td>
                            <td style="display: block;" class="tableCell">${element.nombreCompleto}</td>
                            <td style="display: block;" class="tableCell">${element.num}</td>
                            <td style="display: block;" class="tableCell">${element.usuario}</td>
                            <td style="display: block;" class="tableCell">${element.pass}</td>
                            <td style="display: block;" class="tableCell">${element.type}</td>
                        </tr>
                    `;
            });
        })
        .catch(error => console.error(`⚠️ ` + `ERROR EN LA LECTURA: ` + error));
}

llenarTabla();