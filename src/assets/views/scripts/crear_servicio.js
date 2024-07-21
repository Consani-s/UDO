let $idusu = document.getElementById("id_usu");
let $tipser = document.getElementById("tip_ser");
let $stdser = document.getElementById("std_ser");
let $fechiser = document.getElementById("fechi_ser");
let $fechcser = document.getElementById("fechc_ser");
let $idservicio = document.getElementById("id_serv");
let $acumulado= document.getElementById("acum");


function regisserv() {
    
    let tipser = $tipser.value || `e`;
    let stdser = $stdser.value || `e`;
    let fechiser = $fechiser.value || 0;
    let fechcser = $fechcser.value || 0;
    let id =  $idusu.value ||0;
    fetch(`http://localhost:6060/createServicio/${encodeURIComponent(id)}/${encodeURIComponent(tipser)}/${encodeURIComponent(fechiser)}/${encodeURIComponent(fechcser)}/${encodeURIComponent(stdser)}`)
    .then((res) => {
        if (!res.ok) {
            return res.json().then(error => alert(error.message));
        }
        res.json().then((res) => console.log(res))
        window.location.href = 'gestion_servicios.html'
    })
}

function eliminar() {
    let ids =  $idservicio.value ||0;
    fetch(`http://localhost:6060/deleteServicio/1/${encodeURIComponent(ids)}`)
    .then((res) => {
        if (!res.ok) {
            return res.json().then(error => alert(error.message));
        }
        res.json().then((res) => console.log(res))
        window.location.href = 'eliminarservicio.html'
    })
}

function editserv() {
    
    let tipser = $tipser.value || `e`;
    let stdser = $stdser.value || `e`;
    let fechiser = $fechiser.value || 0;
    let fechcser = $fechcser.value || 0;
    let id =  $idusu.value ||0;
    let idser =  $idservicio.value ||0;
    let acum = $acumulado.value ||0;
    fetch(`http://localhost:6060/updateServicio/1/${encodeURIComponent(id)}/${encodeURIComponent(tipser)}/${encodeURIComponent(fechiser)}/${encodeURIComponent(fechcser)}/${encodeURIComponent(stdser)}/${encodeURIComponent(acum)}/${encodeURIComponent(idser)}`)
    .then((res) => {
        if (!res.ok) {
            return res.json().then(error => alert(error.message));
        }
        res.json().then((res) => console.log(res))
        window.location.href = 'gestion_servicios.html'
    })
}
