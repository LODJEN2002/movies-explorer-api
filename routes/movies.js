const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { createMovie, getLikeMovies, deliteMovieById } = require('../controllers/movies');

router.post('/movies', createMovie);

router.get('/movies', getLikeMovies);// пока возвращет все фильмы, а надо
// ( возвращает все сохранённые текущим  пользователем фильмы )
// Ко мне пришла идея! Возможно, созданные фильмы = сохраненые фильмы пользователя...

router.delete('/movies/:movieId', deliteMovieById);

module.exports = router;
