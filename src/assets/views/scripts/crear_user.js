let $nomuser = document.getElementById("nombre_usu");
let $ciuser = document.getElementById("ci_usu");
let $tlfuser = document.getElementById("telf_usu");
let $passuser = document.getElementById("pass_usu");
let $user = document.getElementById("usu");
let $tipouser = document.getElementById("tipo_usu");
let $idusu = document.getElementById("id_usu");

function regisuser() {
    let nomuser = $nomuser.value || 'e';
    let ciuser = $ciuser.value || 'e';
    let tlfuser = $tlfuser.value || 0;
    let passuser = $passuser.value || 0;
    let tipouser = $tipouser.value || 0;
    let user = $user.value || 'e'
    fetch(`http://localhost:6060/createUsuario/1
        /${encodeURIComponent(ciuser)}
        /${encodeURIComponent(nomuser)}
        /${encodeURIComponent(tlfuser)}
        /${encodeURIComponent(user)}
        /${encodeURIComponent(passuser)}
        /${encodeURIComponent(tipouser)}`)
    .then((res) => {
        if (!res.ok) {
            return res.json().then(error => alert(error.message));
        }
        res.json().then((res) => console.log(res))
        window.location.href = 'gestion_clientes.html'
    })

}

function edituser() {
    let nomuser = $nomuser.value || 'e';
    let ciuser = $ciuser.value || 'e';
    let tlfuser = $tlfuser.value || 0;
    let passuser = $passuser.value || 0;
    let tipouser = $tipouser.value || 0;
    let user = $user.value || 'e'
    let id = $idusu.value || 0;
    fetch(`http://localhost:6060/updateUsuario/1/${encodeURIComponent(id)}/${encodeURIComponent(ciuser)}/${encodeURIComponent(nomuser)}/${encodeURIComponent(tlfuser)}/${encodeURIComponent(user)}/${encodeURIComponent(passuser)}/${encodeURIComponent(tipouser)}`)
    .then((res) => {
        if (!res.ok) {
            return res.json().then(error => alert(error.message));
        }
        res.json().then((res) => console.log(res))
        window.location.href = 'gestion_clientes.html'
    })

}

function elimuser() {
    let id = $idusu.value || 0;
    fetch(`http://localhost:6060/deleteUsuario/1/${encodeURIComponent(id)}`)
    .then((res) => {
        if (!res.ok) {
            return res.json().then(error => alert(error.message));
        }
        res.json().then((res) => console.log(res))
        window.location.href = 'eliminarusuario.html'
    })
}