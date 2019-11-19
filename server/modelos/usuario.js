// modelo de usuario este va a hacer el encargado de modelar el sistema de datos 
//es un objecto que permite hacer inserciones y crear funciones personalidas a mongoose

const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const uniquevalidator=require('mongoose-unique-validator') ;

let rolesValidos={
values:['ADMIN_ROLE','USER_ROLE'],
message:'{VALUE} no es un rol valido '

}
let usuarioSchema= new Schema({

    nombre:{
        type:String,
        required:[true,'nombre requerido']
    },
    email:{
        type:String,
        unique:true,
        required:[true,'correo requerido']

    },
    password:{
        type:String,
        required:[true,'correo requerido']

    },
    img:{
        type:String,
        required:false
    },
    rol:{
        type:String,
        default:'USER_ROLE',
        enum:rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }

});


usuarioSchema.methods.toJSON= function  (){
    let user=this;
    let userObject=user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniquevalidator,{message:'{email debe ser unico}'})
//definir las reglas y restriiciones campos que tendra 
module.exports= mongoose.model('Usuario',usuarioSchema)