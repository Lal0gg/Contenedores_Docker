
//import app from "./app.js";
const app = require("./router/app");


// Direccion port y ip debe ser la docker, cambiar 
app.listen(3000,'192.168.137.1',()=>{
    console.log("Servidor ejecutandose puerto 3000");
});