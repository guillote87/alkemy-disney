const path = require('path');
const { Personaje } = require('../../../database/models');
const {Pelicula} = require('../../../database/models');
const db = require ('../../../database/models')
const {
    Op
} = require("sequelize");
const moment = require('moment');

const personajesApiController = {
    list: (req, res) => {
        Personaje.findAll({
            attributes: ["nombre", "image"],
             include: [
                { model: Pelicula}
            ]
        })
            .then(personaje => {
                let respuesta = {
                    data: personaje
                }
                res.json(respuesta);
            });
    },

    detail: (req, res) => {
        Personaje.findByPk(req.params.id, {
            attributes: ["nombre", "image", "edad"], include: [
                { model: db.Pelicula, as: 'Peliculas' }
            ]
        })
            .then(personaje => {

                let respuesta = {
                    data: personaje,
                    image: "/images/personajes/" + personaje.image
                }
                res.json(respuesta);
            });
    },
   
    edit: (req, res) => {
        let id = req.params.id
        Personaje.findByPk(id)
            .then(personaje => {
                Personaje.update({
                    nombre: req.body.name || personaje.nombre,
                    edad: req.body.edad || personaje.edad,
                    peso: req.body.peso || personaje.peso,
                    historia: req.body.historia || personaje.historia,
                    image: req.body.image || personaje.image
                }, {
                    where: {
                        id : id
                    }
                })
                    .then(() => {
                        return res.json("Elemento actualizado");
                    })
                    .catch(error => res.send(error))
            })
    },
    delete: function (req, res) {
        let id = req.params.id;
        Personaje.destroy({
                where: {
                    id: id
                }
            }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.json("Elemento Eliminado");
            })
            .catch(error => res.send(error))
    }

}

module.exports = personajesApiController;

