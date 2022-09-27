// Simulador de compra con tarjeta de credito con diferentes intereses. 
// Supongamos que que el que maneja el posnet es un crack e ingresa siempre un valor que aparece en las opciones.
// Y que solo le pagan con el mismo saldo, 

let saldoTarjeta = 20000;
let precioProducto = parseInt(prompt('Introduzca el precio del producto'));
let cuotas;
let cuota;
let confirma;

let tarjeta = parseInt(prompt('Ingrese con que tarjeta va a abonar , \n 1-Mastarcard hasta 12 cuotas sin interes \n 2-Visa hasta 6 cuotas sin interes \n 3-American Express todas las cuotas tienen interes \n 4-Salir '));


// Elegimos el tipo de tarjeta que va a utilizar para pagar
// Mientras la opcion de tarjeta sea diferente a 4 , va a entrar al bucle
while (tarjeta != 4) {

// Dependiendo el tipo de tarjeta que elija, va a entrar a determinado caso
    switch (tarjeta) {


        case 1: if (precioProducto <= saldoTarjeta) {
            cuotas = parseInt(prompt('Ingrese la cantaidad de cuotas, 3 , 6  o 12'));
            while(!(cuotas === 3 || cuotas === 6 || cuotas === 12)){
                alert('El cantidad de cuotas no es correcto')
                cuotas = parseInt(prompt('Ingrese la cantaidad de cuotas, 3 , 6  o 12'));
            }
            interesesMastercard(cuotas);


            confirma = parseInt(prompt('Ingrese \n 1-Confirmar \n 2-presione cualquier tecla para salir'));


            if (confirma === 1) {
                alert('Gracias por tu compra');

            } else alert('Nos vemos pronto');


        } else {
            alert('Saldo insuficiente');
        }

            break

        case 2: if (precioProducto <= saldoTarjeta) {
            cuotas = parseInt(prompt('Ingrese la cantaidad de cuotas, 3 , 6  o 12'));
            while(!(cuotas === 3 || cuotas === 6 || cuotas === 12)){
                alert('El cantidad de cuotas no es correcto')
                cuotas = parseInt(prompt('Ingrese la cantaidad de cuotas, 3 , 6  o 12'));
            }
            interesesVisa(cuotas);

            confirma = parseInt(prompt('Ingrese \n 1-Confirmar \n 2-presione cualquier tecla para salir'));


            if (confirma === 1) {
                alert('Gracias por tu compra');

            } else alert('Nos vemos pronto');

        } else {
            alert('Saldo insuficiente');
        }
            break

        case 3: if (precioProducto <= saldoTarjeta) {
            cuotas = parseInt(prompt('Ingrese la cantaidad de cuotas, 3 , 6  o 12'));
            while(!(cuotas === 3 || cuotas === 6 || cuotas === 12)){
                alert('El cantidad de cuotas no es correcto')
                cuotas = parseInt(prompt('Ingrese la cantaidad de cuotas, 3 , 6  o 12'));
            }
            interesesAmericanExpress(cuotas);

            confirma = parseInt(prompt('Ingrese \n 1-Confirmar \n 2-presione cualquier tecla para salir'));


            if (confirma === 1) {
                alert('Gracias por tu compra');

            } else alert('Nos vemos pronto');

        } else {
            alert('Saldo insuficiente');
        }
            break

        default:

            alert('Ingrese una tarjeta valida');
            break

    }

   
  tarjeta = parseInt(prompt('Ingrese con que tarjeta va a abonar , \n 1-Mastarcard hasta 12 cuotas sin interes \n 2-Visa hasta 6 cuotas sin interes \n 3-American Express todas las cuotas tienen interes \n 4-Salir '));

}

// Funciones que indican el valor de los intereses que le corresponde a cada tarjeta de credito

function interesesMastercard(cuotas) {
    if (cuotas === 3) {

        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else if (cuotas === 6) {

        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else if (cuotas === 12) {

        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else {
        alert('Usted a elegido una opcion incorrecta');
    }

}



function interesesVisa(cuotas) {
    if (cuotas === 3) {
        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else if (cuotas === 6) {
        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else if (cuotas === 12) {
        precioProducto = precioProducto * 1.45;
        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else {
        alert('Usted a elegido una opcion incorrecta');
    }

}



function interesesAmericanExpress(cuotas) {
    if (cuotas === 3) {
        precioProducto = precioProducto * 1.20;
        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else if (cuotas === 6) {
        precioProducto = precioProducto * 1.34;
        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else if (cuotas === 12) {
        precioProducto = precioProducto * 1.47;
        cuota = precioProducto / cuotas;
        alert('El precio del producto total financiado es de ' + precioProducto + ' son ' + cuotas + ' cuotas de ' + cuota);
    } else {
        alert('Usted a elegido una opcion incorrecta');
    }

}




