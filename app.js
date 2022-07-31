var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var shortUrl = require('./routes/shortUrl');
var ClsShort = require('./Clases/ClsShort');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Añadirmos body parse
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/shorturl', shortUrl);

app.get('/:url',async (req,res)=>{

    let  enlaceCorto =req.params.url;//obenemos el residuo del enlace : url+la parte corta ejemplo 'urlAAunt6Ki'
    if(enlaceCorto.startsWith("url")){//si el reciduo que recibimos comienza con url entonces comenzara el proceso 

      let urlRecortado = enlaceCorto.replace("url","");//placticamente quitamos la palabra url de la cadena

      let shortUrl = new ClsShort("","",""); //generamos una clase nueva
      shortUrl.enlaceShort = urlRecortado;  //asignamos el valor recortado a un atributo del objeto

      shortUrl.obtenerUrl(shortUrl,function(resultados){//usamos el metodo obteneUrl para devolvernos el enlace original
        console.log(resultados);
        
        //si el enlace original no es nullo entonces comenzamos con la redireccion de la pagina hacia el enlace obtenido
        if(resultados.enlaceOriginal == null || resultados.enlaceOriginal == "") return res.sendStatus(404); //sino entonces 404
        
        res.redirect(shortUrl.enlaceOriginal) //redireccionamos hacia la pagina al cual pertenece el enlace
    }); 
    }else
    {
      return res.sendStatus(404);
    }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
