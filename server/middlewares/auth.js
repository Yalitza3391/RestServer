

const jwt = require('jsonwebtoken')

let verificatoken = (req, res ,next )=>{
let token = req.get('token');

jwt.verify(token,process.env.SEED,(err,decoded)=>{
    if (err){
    return res.status(401).json({
        ok:false,
        err:'token no valido'
    })

    }

    req.usuario=decoded.usuario;
    next()
})

};


let verificaAdmin_Role =(req, res, next)=>{

    let usuario= req.usuario
    let rol =usuario.rol
    
    if (rol=='ADMIN_USER'){
    next()
    }
    else{
        res.json(
            {ok:false,
            err:{
            message:'el usuario es admin'}
        })

    }
   
}

module.exports={verificatoken, verificaAdmin_Role}