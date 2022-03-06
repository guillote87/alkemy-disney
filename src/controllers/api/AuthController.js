const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../../../database/config/auth')
const { User } = require('../../../database/models');


module.exports = {

    //Login 
    login(req, res) {

        let { email, password } = req.body

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

    },
    register(req, res) {

        // Encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        // Crear un usuario
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {

            // Creamos el token
            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });
    }



}