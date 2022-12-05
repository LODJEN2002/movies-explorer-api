const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('./BadRequestError');

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.createMovieValidation = celebrate({
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
});

module.exports.deliteMovieByIdValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30),
  }),
});
