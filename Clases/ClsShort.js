const { v4: uuidv4 } = require('uuid');
var db = require('../config/conexion');

class ClsShort {
    constructor(id_link,enlaceOriginal,enlaceShort){
        this.id_link = id_link;
        this.enlaceOriginal = enlaceOriginal;
        this.enlaceShort = enlaceShort;
    }
    listarEnlaces(callback){
        db.query("SELECT * FROM links",function(err,resultados){
            callback(resultados);
        });
    }
    acortarEnlace(){

        let longUUID = uuidv4();//Generamos uuid v4
        //remove decoration
        let shortUUID = longUUID.replace('-',"");
        //Convertir a base64 string
        shortUUID = Buffer.from(shortUUID,"hex").toString("base64").replace(/\//g,"e");
        console.log(shortUUID);
        return shortUUID;
    }
    guardar(objShort,callback){    
        db.query("INSERT INTO links (enlaceOriginal,enlaceShort) VALUES(?,?) ",
        [objShort.enlaceOriginal,objShort.enlaceShort],function(err,resultados){
            if(!err) {
                console.log("subido "+resultados)
                callback(err);
            }else{
                callback(err);
            }
          });
    }

    obtenerUrl(url,callback){

       let enlace = `SELECT * FROM links Where enlaceShort = '${url.enlaceShort}'`+"";

       db.query(enlace,function(err,resultados){
        for(let data in resultados){
            url.id_link = resultados[data].id_link;
            url.enlaceOriginal = resultados[data].enlaceOriginal;
            url.enlaceShort = resultados[data].enlaceShort;  
        }
            callback(url)
        });
    }
    verificarOriginal(url,callback){
        let enlace = `SELECT * FROM links Where enlaceOriginal = '${url}'`+"" ;
        let shortLink = "";
        db.query(enlace,function(err,resultados){
            for(let data in resultados){
                shortLink = resultados[data].enlaceShort;
            }
            callback(shortLink);  
         });
    } 
}

module.exports = ClsShort;