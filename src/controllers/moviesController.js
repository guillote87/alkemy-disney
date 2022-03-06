
const { Movie } = require('../database/models')
const { Genre } = require('../database/models')
const { Op } = require('sequelize')

const moviesController = {


    listMovies: (req, res) => {

        const { name, genre, order } = req.query
        const movieFilters = {};
        // si existe name lo pasa, sino pasa string vacio
        if (name) {
            movieFilters.title = name
        } else {
            movieFilters.title = ""
        }
        // pasa por defecto orden ASC

        let orderFilter = ['creada', 'ASC']

        // si existe order lo asigna a orderFilter
        if (order) {
            console.log(orderFilter)
            const casedOrder = order.toUpperCase();
            if (casedOrder === 'ASC' || casedOrder === 'DESC') { orderFilter = ['creada', order] }
            else return res.status(400).send('Use a valid order (ASC/DESC)');
        }
        // declaramos genero vacio 

        const genreFilters = {};
        if (genero) { genreFilters.id = genero }

        Movie.findAll({
            attributes: ["id", "title", "image", "Created"],
            where: {
                title: { [Op.like]: "%" + movieFilters.title + "%" }
            },
            order: [orderFilter],
            include: [
                {
                    model: Genre,
                    where: genreFilters,
                }
            ]
        }).then(movies => {
            return res.status(200).send(movies)
        }).catch(error => res.send(error))


    }

}
module.exports = moviesController;