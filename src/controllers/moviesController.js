
const { Movie } = require('../database/models')
const { Genre } = require('../database/models')
const { Character } = require('../database/models')
const { Op } = require('sequelize')

const moviesController = {


    listMovies: (req, res) => {
        const { name, genre, order } = req.query
        const movieFilters = {};

        // si existe name lo pasa
        if (name) {
            movieFilters.title = { [Op.like]: `${name}%` }
        }
        // pasa por defecto orden ASC

        let orderFilter = ['created', 'ASC']

        // si existe order lo asigna a orderFilter en mayuscula
        if (order) {
            const UpOrder = order.toUpperCase();
            if (UpOrder === 'ASC' || UpOrder === 'DESC') {
                orderFilter = ['created', order]
            }
            else {
                return res.status(400).send('Use a valid order (ASC/DESC)');
            }
        }
        // declaramos genero vacio 

        const genreFilters = {};

        if (genre) { genreFilters.id = genre }

        Movie.findAll(
            {
                attributes: ["title", "image", "created"],
                where: movieFilters,
                order: [orderFilter],
                include: [{
                    model: Genre,
                    where: genreFilters,
                    attributes: [],
                }]
            }).then(movies => {
                return res.status(200).send(movies)
            }).catch(error => res.send(error))
    },
    detailMovie: (req, res) => {
        const movieId = req.params.id

        Movie.findByPk(movieId, ({
            include: [{
                model: Character,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }]
        }))
            .then(resp => {
                res.status(200).json(resp)
            })
            .catch(err => {
                res.status(500).send(err)
            })
    },
    createMovie: (req, res) => {

        const { title, image, created, rating } = req.body
        

        if (title && image && created && rating) {
            Movie.create({
                title: title,
                image: image,
                created: created,
                rating: rating
            })
                .then(movie => {
                    res.status(200).json(movie)
                }).catch(err => { res.status(500).send(err) })
        }
        else {
            return res.status(400).send("Debes ingresar todos los campos obligatorios")
        }
    },
    editMovie: (req, res) => {

        const movieId = req.params.id

        const { title, image, created, rating } = req.body

        Movie.findByPk(movieId)
            .then(movie => {
                Movie.update({
                    title: title || movie.title,
                    image: image || movie.image,
                    created: created || movie.created,
                    rating: rating || movie.rating
                }, {
                    where: {
                        id : movieId
                    }
                })
                    .then(() => {
                        res.status(200).json({
                            msg: "Registro Actualizado", movie: req.body
                        })

                    }).catch(error => res.send(error))
            })
    },
    deleteMovie: function (req, res) {
        let movieId = req.params.id;
        Movie.destroy({
            where: {
                id: movieId
            }
        }) // force: true es para asegurar que se ejecute la acción
            .then(() => {
                return res.json("Elemento Eliminado");
            })
            .catch(error => res.send(error))
    }

}
module.exports = moviesController;