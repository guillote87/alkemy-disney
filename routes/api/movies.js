var express = require('express');
var router = express.Router();

const moviesController = require('../../src/controllers/api/moviesController');

router.get ("/movies", moviesController.listMovies)



module.exports = router;
