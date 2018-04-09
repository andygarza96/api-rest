'use strict'
//Mongoose es la libreria de express que nos permite interactuar con Mongo
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//El metodo Schema sera la plantilla para los json creados
const userSchema = Schema ({
    //cambia dependiendo de lo que quieras 
    title: String,
    description: String,
    url: String,
    active: Boolean 
});

//Mongoose creará una coleccion con el nombre del argumento en plural
module.exports = mongoose.model('user', userSchema);
