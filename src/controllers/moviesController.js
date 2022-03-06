
const { Movie } = require('../database/models')
const { Genre } = require('../database/models')
const { Op } = require('sequelize')

const moviesController = {


    listMovies: (req, res) => {

        const { name, genre, order } = req.query
        const movieFilters = {};

        // si existe name lo pasa
        if (name) {
            movieFilters.title = {
                [Op.like]: `${name}%`
            }
        }   
        // pasa por defecto orden ASC

        let orderFilter = ['created', 'ASC']

        // si existe order lo asigna a orderFilter en mayuscula
        if (order) {

            const UpOrder = order.toUpperCase();
            if (UpOrder === 'ASC' || UpOrder === 'DESC') {
                orderFilter = ['created', order]
            } else {
                return res.status(400).send('Use a valid order (ASC/DESC)');
            }
            // declaramos genero vacio 
        }
            const genreFilters = {};
            if (genre) { genreFilters.id = genre }

            Movie.findAll({
                attributes: ["title", "image", "created"],
                where: movieFilters,
                order: [orderFilter],
                include: [
                    {
                        model: Genre,
                        where: genreFilters,
                        attributes: [],
                    }
                ]
            }).then(movies => {
                return res.status(200).send(movies)
            }).catch(error => res.send(error))


        }

    }
module.exports = moviesController;