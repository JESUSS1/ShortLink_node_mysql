var btnACortar = document.getElementById('btnAcortar');
var txtUrl = document.getElementById('url');

var myTable = document.getElementById('tabla')
var tblBody = document.getElementById("tbody");
function listarTabla (){

  tblBody.remove(); //remueve elementos existentes

  // Crea las celdas
  for (let i = 0; i < 2; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (let j = 0; j < 3; j++) {
      var celda = document.createElement("td"); // Crea un elemento <td> y un nodo de texto,
      var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j); //asigna un texto a una variable
      celda.appendChild(textoCelda); //se asgina la variable de texto a la celda creada
      hilera.appendChild(celda);//se agrega la celda a la hilera de celdas horizontales
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
}


listarTabla();


btnACortar.addEventListener('click',function(){
  console.log("click");
})
