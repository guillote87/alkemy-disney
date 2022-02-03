const path = require('path');
const db = require('../../../database/models');
const sequelize = db.sequelize;
const {
    Op
} = require("sequelize");
const moment = require('moment');

const personajesApiController = {
    'list': (req, res) => {
        db.Personaje.findAll({
            attributes: ["nombre", "image","edad"],
            include: [
                { model: db.Pelicula, as: 'Peliculas' }
            ]
        })
            .then(personaje => {
                let respuesta = {                  
                        data: personaje    
                }
                res.json(respuesta);
            });
    },

'detail': (req, res) => {
    db.Personaje.findByPk(req.params.id,{
        attributes: ["nombre", "image","edad"],  include: [
            { model: db.Pelicula, as: 'Peliculas' }
        ]
    })
        .then(personaje => {
        
            let respuesta = {
                data: personaje,
                image: "/images/personajes/"+ personaje.image
            }
            res.json(respuesta);
        });
}

}

module.exports = personajesApiController;