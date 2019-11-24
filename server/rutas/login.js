const express= require('express');

const bcrypt= require('bcrypt');

const Usuario= require('../modelos/usuario');

const app = express();

const jwt = require('jsonwebtoken')

app.post('/login', (req,res)=>{
let body=req.body

Usuario.findOne({email:body.email},(err,usuarioDB)=>{

    if(err){
        return res.status(400).json({
        ok :false,
        err
        });
    }

    if(!usuarioDB){

        return res.status(400).json({
            ok:false,
            err:{
                message:'Usuario Incorrectos'
            }
        });
    }

    if (!bcrypt.compareSync(body.password, usuarioDB.password)){
        return res.status(400).json({
            ok:false,
            err:{
                message:'con Incorrectos'
            }
        });


    }

    let token=jwt.sign({
       usuario:usuarioDB 
    }, process.env.SEED,{expiresIn: process.env.CADUTOKEN})

    res.json({
        ok:true,
        usuario:usuarioDB,
        token:token
    });

})


   
})

module.exports=app;