'use strict'

var express = require('express');
var operations = require('../controllers/operations');//Controlador de las funciones
var api = express.Router();
var fs = require('fs');//Preguntar a Romo que es eso

//rutas de las funciones
api.get('/pug/',operations.pug);
api.get('/show/:id',operations.show);
api.get('/mod/:id',operations.mod);
api.get('/del/:id',operations.del);
api.get('/newUser/',operations.newUser);
api.post('/create/',operations.createUser);
api.post('/update/:id',operations.updateUser);

module.exports = api;



