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
                    through: { attributes: [] }
                }
            ]
        })
            .then(resp => {
                res.status(200).json(resp);
            }).catch(error => res.send(error))
    },
    create: (req, res) => {

        const { name, age, weight, history, image } = req.body
        console.log(req.body)

        if (name && age && weight && history && image) {
            Character.create({
                name: name,
                age: age,
                weight: weight,
                history: history,
                image: image
            })
                .then(user => {
                    res.status(200).json(user)
                }).catch(err => { res.status(500).send(err) })
        }
        else {
            return res.status(400).send("Debes ingresar todos los campos obligatorios")
        }
    },
    edit: (req, res) => {
        const id = req.params.id
        const {name,age,weight,history,image } = req.body
        Character.findByPk(id)
            .then(character => {
                Character.update({
                    name: name || character.name,
                    age: age || character.age,
                    weight: weight || character.weight,
                    history: history || character.history,
                    image: image || character.image
                }, {
                    where: {
                        id: id
                    }
                })
                    .then(() => {
                        res.status(200).json({msg :"Registro Actualizado", character : req.body})    
                            
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

