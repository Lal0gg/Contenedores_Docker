
//import app from "./app.js";
const app = require("./router/app");


// Direccion port debe ser la docker, cambiar 
app.listen(3000,()=>{
    console.log("Servidor ejecutandose puerto 3000");
});