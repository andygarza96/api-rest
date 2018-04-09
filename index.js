'use strict'

var app = require('./app'); //Importa el archivo app, dicta la configuración

var port = process.env.port || 8080; //puerto del que va a estar escuchando

//con esto, si no se logra conectar a la base de datos el dervidor no se levanta
const mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost27017/api-rest', (err,res)=> {
    if(err) {
        throw err;

    } else {
        console.log("Successful connection to MongoDB");
        app.listen(port, function(){
            conosole.log('server listening on port' + port + '!');
        });
    }

});
