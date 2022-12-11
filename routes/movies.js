const router = require('express').Router();
const { createMovieValidation, deliteMovieByIdValidation } = require('../errors/validation');
const { createMovie, getLikeMovies, deliteMovieById } = require('../controllers/movies');

router.post('/movies', createMovieValidation, createMovie);

router.get('/movies', getLikeMovies);

router.delete('/movies/:movieId', deliteMovieByIdValidation, deliteMovieById);

module.exports = router;
