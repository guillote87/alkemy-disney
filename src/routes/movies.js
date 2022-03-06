var express = require('express');
var router = express.Router();

const moviesController = require('../controllers/moviesController');

router.get ("/movies", moviesController.listMovies)



module.exports = router;
