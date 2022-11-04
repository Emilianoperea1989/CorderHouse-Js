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
    filtroAll = document.querySelectorAll(('input[type=checkbox][name=marca],[name=color]')),
    modalCarrito = new bootstrap.Modal(carrito),
    productoAgregado = document.getElementById('productoAgregado'),
    total = document.getElementById('total'),
    btnCompraExitosa = document.getElementById('btnCompraExitosa');

// Funcion para dar formato al precio a moneda argentina

    const formatterPeso = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    })

// funcion para registrar nuevo cliente

function registroNuevoCliente(username, email, pass) {

    let nuevoCliente = new Cliente(username, email, pass);
    let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if ((username.length > 4) && (regexEmail.test(email)) && (pass.length > 8)) {
        clientesRegistrados.push(nuevoCliente);
        localStorage.setItem('usuarios', JSON.stringify(clientesRegistrados));
    } else {
        swal('Datos incorrectos', '\nEl nombre requiere minimo 4 caracteres \nEmail = ejemplo@gmail.com \nLa contraseña requiere minimo 8 caracteres', 'error', { className: "sweetalert" });
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
        swal('Usted a ingresado un Usuario y/o Contraseña no valida', 'Intente nuevamente', 'error', { className: "sweetalert" });
    } else {
        saludo.innerText = `¡Bienvenido ${usuarioRegistrado.username}!`;
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


// Esta funcion muestra un nuevo carrito sin nungun producto despues de haber efectuado la compra

btnCompraExitosa.addEventListener('click', () => {
    if (clienteLogeado.length !== 0) {
        compraExitosa();
        modalCarrito.hide();
        productoAgregado.innerHTML = '';
        cantidadCarrito.innerHTML = '';
        total.innerHTML = '';
        contarcarrito = 0;
        subTotal = 0;
    }else{
        swal('Necesitas inicar sesion para realizar la compra','','error');
    }
})


// Esta funcion muestra el mensaje de compra finalizada

function compraExitosa(){
    swal('Gracias por tu compra',' Estamos preparando tu pedido','success');
}

function agregadoAlCarrito(){
    swal('Producto agregado al carrito','','success');
}

let contarcarrito = 0;
let subTotal = 0;
const cantidadCarrito = document.getElementById('cantidadCarrito');

// Esta funcion crea las tarjetas de los productos

function createHTML(array) {
    array.map((producto) => {
        tarjetaProducto.innerHTML += `
        <div class="contenedor-productos" id="cardProduct">
            <img src="${producto.img}" class="d-block  mt-5 pb-5 productos" alt="${producto.marca}">    
              <div class="debajo-producto">
             <p class="precio">${formatterPeso.format(producto.precio)}</p>  
             <button type="button" class="btn btn-info  botonComprar"
             value=${producto.precio}
              name= ${producto.img} 
             >
             Agregar  <span class="material-symbols-outlined">
             add_shopping_cart
             </span>
           </button>
           </div>
         </div>`
    
// Aca se crea un elemento del dom que que es el boton para agregar al carrito y se genera para cada producto agregado al carrito la imagen , la marca y el precio   


        btnComprar = document.querySelectorAll('.botonComprar');    
        btnComprar.forEach(btn => btn.addEventListener('click', () => {
            contarcarrito++;
            subTotal += parseInt(btn.value);
            productoAgregado.innerHTML +=`
            <div class="modal-body" id="productoAgregado" >
            <img src="${btn.name}" class="d-block  mt-2 pb-2 productos" alt="${producto.marca}">    
            <p class="precio">${formatterPeso.format(btn.value)}</p> 
            </div> ` 
            cantidadCarrito.innerHTML = `<span> (${contarcarrito})</span>`;
            total.innerHTML = `<p class="precio ms-5">Total: ${formatterPeso.format(subTotal)}</p> `;
            agregadoAlCarrito();
        }))
    })
}


// En esta funcion se hace una peticion fetch a la base de datos generdada de forma local .JSON y se espera tener la informacion, luego se llama a la funcion createHTML y se le ingresa el array que devuelve el fetch

async function generarTarjetas() {
    const respuesta = await fetch('./javaScript/data.json');
    const datos = await respuesta.json();
    createHTML(datos);
}

// En el inicio de la pagina se verifica si verifica si el usuario es cliente para poder iniciar sesion y tambien se generan las tarjetas

window.onload = () => {

    obtenerDatos(localStorage);
    generarTarjetas();



};

// En esta funcion se hace una peticion de los productos y hace un filtrado segun la marca y el color

async function filtros(filtroMarca, filtroColor) {
    const respuesta = await fetch('./javaScript/data.json');
    const datos = await respuesta.json();
    const marcas = datos.filter((datos) => (datos.marca == `${filtroMarca[0]}` || datos.marca == `${filtroMarca[1]}` || datos.marca == `${filtroMarca[2]}`));
    if (filtroMarca.length > 0 && filtroColor.length === 0) {
        return datos.filter((datos) => (datos.marca == `${filtroMarca[0]}` || datos.marca == `${filtroMarca[1]}` || datos.marca == `${filtroMarca[2]}`));
    } else if (filtroMarca.length > 0 && filtroColor.length > 0) {
        return marcas.filter((marcas) => (marcas.color == `${filtroColor[0]}` || marcas.color == `${filtroColor[1]}`));
    } else {
        return datos.filter((datos) => (datos.color == `${filtroColor[0]}` || datos.color == `${filtroColor[1]}`));
    }
}

// esta funcion devuelve un array de la base de datos

async function baseDatos() {
    const respuesta = await fetch('./javaScript/data.json');
    const datos = await respuesta.json();
    return datos;
}


 // en esta funcion se verifica en el filtro que opcion esta seleccionada para que luego se ejecute el filtrado 

let filtroTodo = [];

filtroAll.forEach(function (checkbox) {
    checkbox.addEventListener('change', async () => {
        tarjetaProducto.innerHTML = '';
        filtroTodo = Array.from(filtroAll).filter(i => i.checked).map(i => i.value)
       
        filtroMarca = filtroTodo.filter((dato) => dato == 'Adidas' || dato == 'Nike' || dato == 'Reebok');
        filtroColor = filtroTodo.filter((dato) => dato == 'Blanco' || dato == 'Negro');
        const creadorTarjetas = await filtros(filtroMarca, filtroColor);
        creadorTarjetas.map((producto) => {
            tarjetaProducto.innerHTML += `
            <div class="contenedor-productos" id="cardProduct">
                <img src="${producto.img}" class="d-block  mt-5 pb-5 productos" alt="${producto.marca}">    
                  <div class="debajo-producto">
                 <p class="precio">${formatterPeso.format(producto.precio)}</p>  
                 <button type="button" class="btn btn-info botonComprar" 
                 value=${producto.precio}
                  name= ${producto.img} 
                 >
                 Añadir <span class="material-symbols-outlined">
                 add_shopping_cart
                 </span>
               </button>
               </div>
             </div>`
            btnComprar = document.querySelectorAll('.botonComprar');
            btnComprar.forEach(btn => btn.addEventListener('click', () => {
                contarcarrito++
                subTotal += parseInt(btn.value);
                productoAgregado.innerHTML +=`
                <div class="modal-body" id="productoAgregado" >
                <img src="${btn.name}" class="d-block  mt-2 pb-2 productos" alt="${producto.marca}">    
                <p class="precio">${formatterPeso.format(btn.value)}</p> 
                </div> ` 
                cantidadCarrito.innerHTML = `<span> (${contarcarrito})</span>`;
                total.innerHTML = `<p class="precio ms-5">Total: ${formatterPeso.format(subTotal)}</p> `;
                agregadoAlCarrito();
            }))

        })
        if (creadorTarjetas.length == 0) {
            generarTarjetas();
          
        }
    
    })
})
