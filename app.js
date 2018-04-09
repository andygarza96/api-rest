var express = require ('express');//variable express necesita las herramientas de express
var app = express();//var app guarda var express
var bodyparser = require('body-parser');//var bodyparser necesita bodyparse
var api= require('./routes/op-rt');//variable api guarda la ruta de las rutas y el nombre del archivo 

app.use(express.static(__dirname + '/public'));//llama rutas que usa express
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use('/api',api);
app.use(express.static(__dirname + '/'));

module.exports =app;

