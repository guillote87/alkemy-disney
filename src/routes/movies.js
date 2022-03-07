var express = require('express');
var router = express.Router();

const moviesController = require('../controllers/moviesController');

router.get ("/movies", moviesController.listMovies)
router.get ("/movies/:id", moviesController.detailMovie)

router.post ("/movies", moviesController.createMovie)

router.put ("/movies/:id", moviesController.editMovie)

router.delete ("/movies/:id",moviesController.deleteMovie)
module.exports = router;
