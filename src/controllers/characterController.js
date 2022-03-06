const { Character } = require('../database/models');
const { Movie } = require('../database/models');
const { Op } = require('sequelize')

const CharacterController = {
    //Mostrar todos los personajes

    listCharacters: (req, res) => {
        const { name, age, weight, movies } = req.query

        const filters = {}

        if (name) filters.name = { [Op.like]: `%${name}%` }
        if (age) { filters.age = age }
        if (weight) { filters.weight = weight }

        const movieFilter = {};

        if (movies) movieFilter.title = { [Op.like]: `%${movies}%` }

        Character.findAll({
            attributes: ["name", "image"],
            where: filters,
            include: [{
                model: Movie,
                where: movieFilter,
                attributes: [],
            }]
        })
            .then(resp => {
                res.json(resp)
            })
    },

    detail: (req, res) => {
        Character.findByPk(req.params.id, {
            attributes: ["name", "image", "age"],
            include: [
                {
                    model: Movie,
                    attributes: ["title", "image", "created", "rating"],
                    through: {attributes: []}
                }
            ]
        })
            .then(resp => {
                res.status(200).json(resp);
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

