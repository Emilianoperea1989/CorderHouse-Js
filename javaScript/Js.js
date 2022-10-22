class Cliente {
    constructor(username, email, pass) {
        this.username = username,
            this.email = email,
            this.pass = pass
    }
};

class Producto {
    constructor(marca, estilo, tipo, color, talle, precio, stock, img) {
        this.marca = marca,
            this.estilo = estilo,
            this.tipo = tipo,
            this.color = color,
            this.talle = talle,
            this.precio = parseFloat(precio).toFixed(3),
            this.stock = stock,
            this.img = img

    }

}

const baseDeDatosDeProductos = [
    new Producto('Nike', 'running', 'Zapatilla', 'Negro', [36, 37, 38, 39, 40, 41], 29.499, true,'../img/zapatillas/nike/zapatillas-nike-running-negras.jpg'),

    new Producto('Nike', 'running', 'Zapatilla', 'Negro', [36, 37, 38, 39, 40], 22.999, true, '../img/zapatillas/nike/zapatillas-nike-urbana-negra.jpg'),

    new Producto('Nike', 'urbano', 'Zapatilla', 'blanco', [36, 37, 39, 41], 31.999, true, '../img/zapatillas/nike/zapatillas-nike-urbana-blanca.jpg'),

    new Producto('Nike', 'running', 'Zapatilla', 'blanco', [36, 37, 38, 40, 41], 23.699, true,'../img/zapatillas/nike/zapatillas-nike-urbana-blanca-bota.jpg'),

    new Producto('Nike', 'running', 'Zapatilla', 'blanco', [36, 37, 38, 40, 41], 19.299, true,'../img/zapatillas/nike/zapatillas-nike-running-blanca.jpg'),

    new Producto('Nike', 'running', 'Zapatilla', 'blanco', [36, 37, 39, 40, 41], 33.899, true,'../img/zapatillas/adidas/zapatillas-adidas-running-blancas.jpg'),

    new Producto('Nike', 'running', 'Zapatilla', 'blanco', [36, 37, 39, 40, 41], 24.699, true,'../img/zapatillas/adidas/zapatillas-adidas-running-negra.jpg'),

    new Producto('Nike', 'running', 'Zapatilla', 'Negro', [37, 38, 39, 40, 41], 18.999, true,'../img/zapatillas/adidas/zapatillas-adidas-urbana-negra.jpg'),

    new Producto('Nike', 'running', 'Zapatilla', 'blanco', [37, 38, 40, 41], 39.299, true,'../img/zapatillas/adidas/zapatillas-adidas-urbana-blanca.jpg'),
    
]
console.log(baseDeDatosDeProductos);


let clientesRegistrados = [],
    botonLogin = document.getElementById('btnLogin'),
    emailLogin = document.getElementById('emailLogin'),
    passwordLogin = document.getElementById('passwordLogin'),
    botonRegistrar = document.getElementById('btnRegistro'),
    modalLogin = document.getElementById('modalLogin'),
    modalL = new bootstrap.Modal(modalLogin),
    modalRegistro = document.getElementById('modalRegistro'),
    modal = new bootstrap.Modal(modalRegistro),
    username = document.getElementById('userName'),
    email = document.getElementById('email'),
    password = document.getElementById('password'),
    toggles = document.querySelectorAll('.toggles'),
    saludo = document.getElementById('nombreUsuario'),
    botonLogout = document.getElementById('btnLogout '),
    tarjetaProducto = document.getElementById('cardProduct'),
    check = document.getElementById('check');
 

function registroNuevoCliente(username, email, pass) {
    let nuevoCliente = new Cliente(username, email, pass);
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
 
    if((username.length > 4) && (regexEmail.test(email)) && (pass.length > 8)){
        clientesRegistrados.push(nuevoCliente);
        localStorage.setItem('usuarios', JSON.stringify(clientesRegistrados)); 
    }else{
        alert('datos incorrectos \nEl nombre requiere minimo 6 caracteres \nEmail = ejemplo@gmail.com \nLa contraseña requiere minimo 8 caracteres'  );
    }

};

function obtenerDatos(storage) {
    clientesRegistrados = (localStorage.getItem('usuarios')) ? JSON.parse(localStorage.getItem('usuarios')) : [];
};

function inicioSesion(cliente, password) {
    let usuarioRegistrado = clientesRegistrados.find((clienteRegistrado) => clienteRegistrado.email == cliente && clienteRegistrado.pass == password);
    if (!usuarioRegistrado) {
        alert('Usted a ingresado un Usuario y/o Contraseña no valida');
    } else {
        saludo.innerText = `Bienvenido ${usuarioRegistrado.username}`;
        mostrarContenido(toggles, 'd-none');
        return usuarioRegistrado;
    }
}
function mostrarContenido(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

botonRegistrar.addEventListener('click', (e) => {
    e.preventDefault();
    registroNuevoCliente(username.value, email.value, password.value);
    username.value = '';
    email.value = '';
    password.value = '';
    modal.hide();
})

window.onload = () => obtenerDatos();

botonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    inicioSesion(emailLogin.value, passwordLogin.value);
    emailLogin.value = '';
    passwordLogin.value = '';
    modalL.hide();

})

btnLogout.addEventListener('click', () => {

    mostrarContenido(toggles, 'd-none');
});

baseDeDatosDeProductos.map((producto) => {
    tarjetaProducto.innerHTML += `
    
    <div class="contenedor-productos" id="cardProduct">
          <img src="${producto.img}" class="d-block  mt-5 pb-5 productos" alt="${producto.marca}">    
        <div class="debajo-producto">
          <p class="precio">$${producto.precio}</p>    
          <p class="descripcion">Zapatillas Nike Tenis Pro</p>     
          <button class="boton-compra">Comprar</button>    
        </div>
    </div>`
})




