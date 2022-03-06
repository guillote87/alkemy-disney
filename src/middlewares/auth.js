const jwt = require("jsonwebtoken")
const authConfig = require('../../database/config/auth')

module.exports =(req,res,next) =>{

console.log(req.headers)
// Comprobar que existe token

if(!req.headers.authorization){
    res.status(401).json({msg: "Acceso no autorizado"})
}else{
    //Comprobar validacion de token
    let token = req.headers.authorization.split(" ")[1]

    jwt.verify(token,authConfig.secret,(err,decoded)=>{
        if(err){
            res.status(500).json({msg: "Ha ocurrido un error con el token",err})
        }else{
            req.user = decoded
            next()
        }
    })
}
    
}