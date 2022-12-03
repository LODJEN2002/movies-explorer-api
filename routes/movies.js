const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { createMovie, getLikeMovies, deliteMovieById } = require('../controllers/movies');
const BadRequestError = require('../errors/BadRequestError');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((image) => {
      if (!validator.isURL(image)) {
        throw new BadRequestError('Это не URL');
      }
      return image;
    }),
    trailerLink: Joi.string().required().custom((trailerLink) => {
      if (!validator.isURL(trailerLink)) {
        throw new BadRequestError('Это не URL');
      }
      return trailerLink;
    }),
    thumbnail: Joi.string().required().custom((thumbnail) => {
      if (!validator.isURL(thumbnail)) {
        throw new BadRequestError('Это не URL');
      }
      return thumbnail;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.get('/movies', getLikeMovies);// пока возвращет все фильмы, а надо
// ( возвращает все сохранённые текущим  пользователем фильмы )
// Ко мне пришла идея! Возможно, созданные фильмы = сохраненые фильмы пользователя...

router.delete('/movies/:movieId', deliteMovieById);

module.exports = router;
