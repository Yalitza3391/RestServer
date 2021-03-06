const express= require('express');

const bcrypt= require('bcrypt');
const _ =require('underscore');

const Usuario= require('../modelos/usuario');

const {verificatoken, verificaAdmin_Role}= require('../middlewares/auth.js')

const app = express();

app.get('/usuario' ,verificatoken ,(req,res)=>{

  
    
    
    
    
    let desde= req.query.desde || 0
    let limite=req.query.limite || 5
    desde=Number(desde);
    limite=Number(limite);
    
    Usuario.find({estado:true},'nombre email rol google')
    .skip(desde)
    .limit(limite)
    .exec((err,usuarios)=>{

        if (err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        Usuario.count({estado:true},(err,conteo)=>{

            res.json({
                ok:true,
                usuarios
            })
        });
    })


});

app.post('/usuario',[verificatoken, verificaAdmin_Role ],(req,res)=>{
    
    let body=req.body;
    let usuario=new Usuario({
        nombre:body.nombre,
        email:body.nombre,
        password:bcrypt.hashSync(body.password,10),
        rol:body.rol
    })

    usuario.save((err, usuarioDB)=>{
    if(err){
        return res.status(400).json({
        ok :false,
        err
        });
    }

    //usuarioDB.password=null
    res.json({
        ok:true,
        usuario:usuarioDB
    })

});




});

app.put('/usuario/:id',[verificatoken, verificaAdmin_Role ],(req,res)=>{
let id=req.params.id;
let body=_.pick(req.body,['nombre','email','img','rol','estado']);

Usuario.findByIdAndUpdate(id,body,{new:true, runvalidators:true},(err,usuarioDB)=>

{
    if(err){
        return res.status(400).json({
        ok :false,
        err
        });
    }

    res.json({
        id:true,
        usuario:usuarioDB
    });

});
    
});

app.delete('/usuario/:id',[verificatoken, verificaAdmin_Role ],(req,res)=>{
let estado={
    estado:false
}
let id=req.params.id

Usuario.findByIdAndUpdate(id,estado, {new:true, runvalidators:true},(err,usuario) => {
   
    if(err){
        return res.status(400).json({
        ok :false,
        err
        });
    };


    res.json({
        ok:true,
        usuario
    });

})  
});

/* app.delete('/usuario/:id',(req,res)=>{

let id=req.params.id

Usuario.findByIdAndRemove(id,(err,usuario)=>{
   
    if(err){
        return res.status(400).json({
        ok :false,
        err
        });
    };


    if(!usuario){
        return res.status(400).json({
        ok :false,
        err:{message :'usuario no encontrado'}
        });
    }

    res.json({
        ok:true,
        usuario
    });

})  
}); */


module.exports=app;