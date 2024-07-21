
let $usuario = document.getElementById("nombre_usuario");
let $pass = document.getElementById("password");
history.replaceState(null, '', "/login");

function ingresar() {
    let user = $usuario.value || 'e';
    let pass = $pass.value || 'e';
    fetch(`http://localhost:8080/loginUser/${encodeURIComponent(user)}/${encodeURIComponent(pass)}`)
        .then((res) => {
            if (!res.ok) {
                return res.json().then(error => alert(error.message));
            }
            res.json().then((res) => console.log(res))
            window.location.href = 'ecommerce.html'
        })
}

