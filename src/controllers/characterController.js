const path = require('path');
const { Character } = require('../database/models');
const { Movie } = require('../database/models');
const db = require('../database/models')
const {
    Op
} = require("sequelize");
const moment = require('moment');

const CharacterController = {
    //Mostrar todos los personajes

    listCharacters: (req, res) => {
        Character.findAll({
            attributes: ["name", "image"],
        })
            .then(character => {
                let resp = {
                    data: character
                }
                res.status(200).json(resp);
            }).catch(error => res.send(error))
    },

    detail: (req, res) => {
        Character.findByPk(req.params.id, {
            attributes: ["name", "image", "age"], include: [
                { model: Movie }
            ]
        })
            .then(character => {

                let res = {
                    data: character,
                    image: "/image/character/" + character.image
                }
                res.json(res);
            }).catch(error => res.send(error))
    },

    edit: (req, res) => {
        let id = req.params.id
        Character.findByPk(id)
            .then(character => {
                Character.update({
                    name: req.body.name || character.name,
                    age: req.body.edad || character.age,
                    weight: req.body.peso || character.weight,
                    historia: req.body.historia || character.history,
                    image: req.body.image || character.image
                }, {
                    where: {
                        id: id
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
        Character.destroy({
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

module.exports = CharacterController;

