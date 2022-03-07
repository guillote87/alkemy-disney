const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../database/config/auth')
const { User } = require('../database/models');
const sendEmail = require('../database/config/sendGrid')

module.exports = {

    //Login 
    login(req, res) {
        const { email, password } = req.body
      
      if (email && password){
        
        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ msg: "Email invalido" })
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    })
                    res.json({
                        user: user,
                        token: token
                    })
                } else {
                    res.status(401).json({ msg: "contraseña incorrecta" })
                }
            }
        }).catch(err => {
            res.status(500).json(err)
        })
    }else{
        res.status(400).send ("Debes ingresar usuario y contraseña")
    }

    },
    register(req, res) {
        const { name, email, password } = req.body

        if (name && email && password) {

            // Encriptamos la contraseña
            let passCrypt = bcrypt.hashSync(password, Number.parseInt(authConfig.rounds));

            // Crear un usuario
            User.create({
                name: name,
                email: email,
                password: passCrypt
            })
                .then(user => {

                    // Creamos el token
                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    sendEmail(user.email),
                        res.status(200).json({
                            user: user,
                            token: token
                        });
                }).catch(err => {
                    res.status(500).json(err);
                });
        }
        else {
            return res.status(400).send("Faltan completar los campos obligatorios")
        }
    }

}