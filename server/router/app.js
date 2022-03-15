//import  express  from "express";
const express = require("express");
var cors = require('cors');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var mysql = require('mysql');

// host,user,password,database debe de ser mysql en docker, cambiar 
/* 
CREATE TABLE usuario(
	id int auto_increment,
    nombre varchar(50),
    edad int default 18,
    genero varchar(20),
    correo varchar(100) not null unique,
    adicional varchar(100),
    PRIMARY KEY(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'Kevin',
    password: '741236987',
    database: 'pruebas'
});

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));


app.get('/hola',(req,res) => {
    res.send('87');
});


app.post('/insertar',(req,res) =>{
 
    connection.query('INSERT INTO usuario(nombre,edad,correo,genero,adicional) VALUES(? , ?, ?, ?,?);',[req.body.nombre,req.body.edad,req.body.correo,req.body.genero,req.body.adicional],function (error, results, fields){
        if(error){
            console.log(error);
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 500;
            res.contentType('application/json').json({
                sqlmessage: error.sqlMessage,
                result: 'No se pudo insertar',
                codigo: 500
            });
        
        }else{
            console.log(results);
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            res.contentType('application/json').json({
                result: 'Si se inserto',
                codigo: 200
            });
        
        }
       
    }); 
    
});

app.get('/get_ids',(req,res) =>{
    
    connection.query('SELECT  id FROM usuario;',function (error,results,fields){
        if(error){
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 500;
            res.contentType('application/json').json({
                result: 'No se pudo obtener los ids'
            });
        
        }else{
            console.log(results);
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            res.contentType('application/json').json({
                result: results
            });
        }
        
    });

});

app.post('/get_user',(req,res) =>{
 //   connection.connect();
    connection.query('SELECT nombre,edad,genero,correo,adicional FROM usuario where id = ?;',[req.body.id], function(error,results,fields){
        if(error){
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 500;
            res.contentType('application/json').json({
                result: 'error id'
            });
        
        }
        else{
            console.log(results);
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            res.contentType('application/json').json(results
            );
        }
   //     connection.end();
    });
    
});

app.get('/gettodos',(req,res) =>{
    connection.query('SELECT * FROM usuario',function(error,results,fields){
        if(error){

        }else{
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            res.contentType('application/json').json({
                result: results
            });
        }
    });
});
app.post('/update',(req,res)=>{
   // connection.connect();
    connection.query('UPDATE usuario SET nombre = ?, edad = ?, genero= ?, correo = ?, adicional = ?  WHERE id = ?',[req.body.nombre,req.body.edad,req.body.genero,req.body.correo,req.body.adicional,req.body.id], function(error,results,fields){
        if(error){
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 500;
            res.contentType('application/json').json({
                result: 'error id o no se puedo actualizar',
                codigo: 500
            });
        
        }
        else{
            console.log(results);
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            res.contentType('application/json').json({
                result: 'Actualizacion correcta',
                codigo: 200
            });
        }
      //  connection.end();
    });
    
});

app.post('/delete',(req,res) =>{
    connection.query('DELETE FROM usuario WHERE id = ?',[req.body.id], function(error,results,fields){
        if(error){
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 500;
            res.contentType('application/json').json({
                result: 'no se pudo eliminar',
                codigo: 500
            });
        
        }
        else{
            console.log(results);
            res.setHeader('Access-Control-Allow-Headers','Content-Type');
            res.setHeader('Access-Control-Allow-Mathods','GET,PUT,POST,DELETE,OPTIONS');
            res.statusCode = 200;
            
            if(results.affectedRows == 0){
                res.contentType('application/json').json({
                    result: 'id no existe'
                }); 
            }
            else if(results.affectedRows == 1){
                res.contentType('application/json').json({
                    result: 'Eliminacion correcta',
                    codigo: 200
                }); 
            }

            
            
        }
      //  connection.end();
    });
})

module.exports = app;