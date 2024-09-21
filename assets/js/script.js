let listaNombresGastos = [];
let listaValoresGastos = [];
let listaDescripcionGastos = [];

// Función que se invoca al momento en el que el usuario hace clic en el botón gasto.
function clickBoton () {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = Number(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(valorGasto);
    listaDescripcionGastos.push(descripcionGasto)
    
    actualizarListaGastos();
    alertaGasto(valorGasto);
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');

    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValoresGastos[posicion]);
        const descripcionGasto = listaDescripcionGastos[posicion];
        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} - ${descripcionGasto}
                        <button class="update-btn">Actualizar</button></li><button onclick="eliminarGasto(${posicion});">Eliminar</button></li>`;
        // Calculando el total de los gastos
        totalGastos += Number(valorGasto);
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion) {
    console.log(posicion);
    
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function alertaGasto(valorGasto) {
    if(valorGasto > 150) {
        alert('¡Cuida tus finanzas! \n¡Has realizado un gasto mayor a 150 USD!')
    }
}