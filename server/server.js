
require('./config/config');
const express= require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser= require('body-parser');
const path=require('path');


app.use(express.static(__dirname+'/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


//habilitar public carpeta
app.use(express.static(path.resolve(__dirname,'../public')))
//Rutas 
app.use(require('./rutas/index.js'));



mongoose.connect(process.env.urlDB,{useNewUrlParser:true,useCreateIndex:true ,useUnifiedTopology: true } ,(err, res)=>{

if (err) throw new err;

console.log('BASE DE DATOS ONLINE')

});
    
app.listen(process.env.PORT,()=>{
    console.log(`puerto ${process.env.PORT}`);
});
