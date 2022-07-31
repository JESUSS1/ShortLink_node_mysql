var express = require('express');
var router = express.Router();
var db = require('../config/conexion');
var ClsShort = require('../Clases/ClsShort');

/* GET home page. */
router.get('/', function(req, res, next) {
  var objShort = new ClsShort(); //creamos un objeto de tipo class
  //usamos el objeto para acceder al metodo listarEnlaces
  objShort.listarEnlaces(function(resultados){ 
    //cargamos el enlace index y enviamos los parametros title,Enlaces y shortUrl
    //se enviara la informacion sobre la consulta realizada mediante el parametro Enlaces
    //shortUrl srive para mostrar el enlace cortado, en esta parte no es necesario enviar nada
    res.render('index', { title: 'ProyectoShortLink',Enlaces:resultados,shortUrl:""});
  });
  //db.end();
});

module.exports = router;
