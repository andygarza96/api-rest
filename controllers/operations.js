// se importa el modelo
var modelo= require('../models/userData');
var m = new modelo();
//Aquí van todas las funciones 

//hace que al picarle al boton de nuevo me mande al archivo de new.pug (para crear un nuevo usuario)
function newUser(req,res){
    res.render('new.pug',{title:"Nuevo Usuario"});
}

//Creamos la funcion C de CRUD (create)
function createUser(req,res){
    var params = req.body;
    m.title = params.title;
    m.description = params.description;
    m.url = params.url;
    //funcion save no salva booleanos hacerlo manual
    if(params.active == undefined){
        m.active = false;
    }else {
        m.active = true;
    }
    //Flecha funcion callback
    m.save ((err,modelStored) => {
        if(err){
            res.status(500).send({message: "Fail!"});
        } else{
            res.status(200).redirect('/api/pug/');
        }
    });
}

//Creamos la funcion R de CRUD (read)
function show (req,res){
    var id = req.params.id;
    modelo.findById(id,(err,users)=> {
        if(err){
            //Error de Servidor
            res.status(500).send({message: "Fail!!"});
        }if(!users) {
            //Error de ID
            res.status(404).send({message:"No hay marcadores"});
        }
        //actualiza y abre la pag deciada
        res.render('show.pug',{ title:"Mostrar usuario", users});
    }); 
}

//hace que al picarle al boton de nuevo me mande al archivo de mod.pug (para modificar al usuario)
function mod(req,res){
    modelo.findById(id,(err,users)=> {
        if(err){
            //Error de Servidor
            res.status(500).send({message: "Fail!!"});
        }if(!users) {
            //Error de ID
            res.status(404).send({message:"No hay marcadores"});
        }
        //actualiza y abre la pag deciada
        res.render('mod.pug',{ title:"Mostrar usuario", users});
    }); 
}

//Creamos la funcion U de CRUD (update)
function updateUser(req,res){
    var id = req.params.id;
    //Parte del booleano se tiene que hacer manual
    var a = req.body.active;
    if(a == undefined){
        a = false;
    }else{
        a = true;
    }
    var update = req.body;
    modelo.findByIdAndUpdate(id, update,{new: true}, function (err,m){
        if(!m){
            //Error de ID
            res.status(404).send("No se encontro el ID");
        }if(err){
            //Error de Servidor
            res.status(500).send({message: "Fail!!"});
        }
        modelo.findById(id,(err,m)=> {
          m.active = a;
          //checando que pasa
          console.log(a);
          console.log(m);  
        });
        //redirige a la pagina del catalogo
        res.status(200).redirect('/api/pug/');
    });
}

//Creamos la funcion D de CRUD (delete)
function del(req,res){
 var id= req.params.id;
 modelo.findOneAndRemove({_id: id}, function (err){
    if(err){
        //Error de Servidor
        res.status(500).send({message: "Fail!!"});
    }
    //redirige a la pagina del catalogo
    res.status(200).redirect('/api/pug/');
 });
}

//Cremaos el metodo que te lleva a la pagina principal (index.pug)
function pug(req,res){
    modelo.find({},(err,users)=>{
    if(err){
        //Error de Servidor
        res.status(500).send({message: "Fail!!"});
    }if(!users) {
        //Error de ID
        res.status(404).send({message:"No hay marcadores"});
    }
    //actualiza y abre la pag deciada
    res.render('index.pug',{ title:"Titulo del tab", json: users});
}); 
}

module.exports = {
del,
createUser,
newUser,
show,
updateUser,
mod,
pug
}