
require('./config/config');
const express= require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser= require('body-parser');


app.use(express.static(__dirname+'/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Rutas 
app.use(require('./rutas/usuario.js'));

mongoose.connect(process.env.urlDB,{useNewUrlParser:true,useCreateIndex:true ,useUnifiedTopology: true } ,(err, res)=>{

if (err) throw new err;

console.log('BASE DE DATOS ONLINE')

});
    
app.listen(process.env.PORT,()=>{
    console.log(`puerto ${process.env.PORT}`);
});
