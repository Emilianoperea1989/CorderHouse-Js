
//  Creador clase Cliente y Producto

class Cliente {
    constructor(username, email, pass) {
        this.username = username,
            this.email = email,
            this.pass = pass
    }
};

// Variables y Objetos del DOM

let clientesRegistrados = [],
    clienteLogeado = [],
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
    check = document.getElementById('check'),
    marcaFiltro = document.querySelectorAll('input[type=checkbox][name=marca]'),
    colorFiltro = document.querySelectorAll('input[type=checkbox][name=color]'),
    filtroAll = document.querySelectorAll(('input[type=checkbox][name=marca],[name=color]'));



// funcion para registrar nuevo cliente

function registroNuevoCliente(username, email, pass) {
    let nuevoCliente = new Cliente(username, email, pass);
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if ((username.length > 4) && (regexEmail.test(email)) && (pass.length > 8)) {
        clientesRegistrados.push(nuevoCliente);
        localStorage.setItem('usuarios', JSON.stringify(clientesRegistrados));
    } else {
        alert('datos incorrectos \nEl nombre requiere minimo 4 caracteres \nEmail = ejemplo@gmail.com \nLa contraseña requiere minimo 8 caracteres');
    }

};

// Funcion para obtener los datos de los clientes 

function obtenerDatos(storage) {
    clientesRegistrados = (storage.getItem('usuarios')) ? JSON.parse(storage.getItem('usuarios')) : [];
};

// Funcion para verificar si el cliente esta registrado para poder iniciar sesion

function inicioSesion(cliente, password) {

    let usuarioRegistrado = clientesRegistrados.find((clienteRegistrado) => clienteRegistrado.email == cliente && clienteRegistrado.pass == password);
    if (!usuarioRegistrado) {
        alert('Usted a ingresado un Usuario y/o Contraseña no valida');
    } else {
        saludo.innerText = `Bienvenido ${usuarioRegistrado.username}`;
        mostrarContenido(toggles, 'd-none');

        if (check.checked) {
            clientesRegistrados.push(usuarioRegistrado);
            localStorage.setItem('usuarios', JSON.stringify(clientesRegistrados));

        } else {
            clienteLogeado.push(usuarioRegistrado);
            sessionStorage.setItem('usuario', JSON.stringify(clienteLogeado));

        }
        return usuarioRegistrado;
    }


}
// funcion para mostrar contendio si estas registrado o no

function mostrarContenido(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

// Acción para boton registrar

botonRegistrar.addEventListener('click', (e) => {
    e.preventDefault();
    registroNuevoCliente(username.value, email.value, password.value);
    username.value = '';
    email.value = '';
    password.value = '';
    modal.hide();
})

function createHTML(array){
    array.map((producto) => { 
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
}



async function generarTarjetas () {
    const respuesta = await fetch ('./javaScript/data.json');
    const datos = await respuesta.json(); 
    createHTML(datos);
}


window.onload = () => {

    obtenerDatos(localStorage);
    generarTarjetas();
    
      

};

// Acción para boton login

botonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    inicioSesion(emailLogin.value, passwordLogin.value);
    emailLogin.value = '';
    passwordLogin.value = '';
    modalL.hide();

})

//  Acción para boton logout

btnLogout.addEventListener('click', () => {
    sessionStorage.clear();
    clienteLogeado = [];
    mostrarContenido(toggles, 'd-none');
});



   async function filtros(filtroMarca, filtroColor) {
    const respuesta = await fetch ('./javaScript/data.json');
     const datos = await respuesta.json();
     const marcas = datos.filter((datos) => (datos.marca == `${filtroMarca[0]}` || datos.marca == `${filtroMarca[1]}` || datos.marca == `${filtroMarca[2]}`));
    if(filtroMarca.length > 0 && filtroColor.length === 0){
        return datos.filter((datos) => (datos.marca == `${filtroMarca[0]}` || datos.marca == `${filtroMarca[1]}` || datos.marca == `${filtroMarca[2]}`));
    }else if(filtroMarca.length > 0 && filtroColor.length > 0){
        return marcas.filter((marcas) =>(marcas.color == `${filtroColor[0]}` || marcas.color == `${filtroColor[1]}`));
    }else{
        return datos.filter((datos) =>(datos.color == `${filtroColor[0]}` || datos.color == `${filtroColor[1]}`));
    }
    }

    async function baseDatos() {
        const respuesta = await fetch ('./javaScript/data.json');
        const datos = await respuesta.json();
        return datos;
    }
    

let filtroTodo = [];


 filtroAll.forEach(function (checkbox) {
    checkbox.addEventListener('change', async () => {
        tarjetaProducto.innerHTML = '';
        filtroTodo = Array.from(filtroAll).filter(i => i.checked).map(i => i.value)
        // console.log(filtroTodo);
        filtroMarca = filtroTodo.filter( (dato )=> dato == 'Adidas'|| dato =='Nike'|| dato =='Reebok');
        filtroColor = filtroTodo.filter( (dato )=> dato == 'Blanco'|| dato =='Negro');
        const creadorTarjetas = await filtros(filtroMarca,filtroColor);
        creadorTarjetas.map((producto) => {
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
        if (creadorTarjetas.length == 0) {
            const baseDeDatosDeProductos = await baseDatos();
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
        }
    })
})


