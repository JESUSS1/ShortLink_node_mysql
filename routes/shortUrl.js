var express = require('express');
var router = express.Router();
var ClsShort = require('../Clases/ClsShort');

/* POST URL . */
router.post('/', function(req, res) {

  let enlaceO = req.body.url //obtenemos el enlace enviado
  if(enlaceO.startsWith("http" || "https")){ //verificamos que la cadena incie con http o https
    let objShort = new ClsShort(); //usamos un metodo de la clase que creamos para recortar datos
    //host local + url ,url es un añadido que servira para ser identificado desde el servidor
    let host = "http://localhost:3000/url"; 
    let convertirUiid = objShort.acortarEnlace(); //usamos el metodo que nos devuelve una cadena unica con 8digios

    //asginamos datos a los elementos del objeto clase creado 
    objShort.enlaceOriginal = enlaceO; //enlace original
    objShort.enlaceShort = convertirUiid;//cadena con identicacion unica

    //verificamos que no exista otro enlace igual almacenado
    objShort.verificarOriginal(enlaceO,function(result){
        if(result != null && result != ""){ // si es true entonces obtenemos el enlace original y se envia al index
          console.log("Enlace Original Existe return");
          objShort.listarEnlaces(function(data){ //usamos el metodo listar para obtener los datos sobre lisnks
            let enlaceShortFull = host+result; //creamos el enlace acortado
            //enviamos al index la lista de urls y el enlace acortado en la variable shortUrl
            res.render('index', { title: 'ProyectoShortLink',Enlaces:data,shortUrl:enlaceShortFull});
          });
        //si es false entonces generamos el enlace acortado y lo almacenamos en la BD
        }else{
           objShort.guardar(objShort,function(err){ //enviamos el objeto objShort
            if(!err){ //si no resulta error al guardar entonces continuamos
              console.log("Subido Correctamente");
              objShort.listarEnlaces(function(data){ //obtenemos la data sobre los links
                let enlaceShortFull = host+convertirUiid; //creamos la cadena del enlace corto
                //enviamos al index la lista de urls y el enlace acortado en la variable shortUrl
                res.render('index', { title: 'ProyectoShortLink',Enlaces:data,shortUrl:enlaceShortFull});
              });

            }else{
              console.log("Problema al guardar"); //esto pude ser reemplazado con una alerta
            }
          });
          
        }
    })
  
  }else{
    res.redirect("/")  // puede ser una ventana que indique que no es una url
  }


});


// Permite poder exportar la configuracion del documento hacia otros
module.exports = router;
