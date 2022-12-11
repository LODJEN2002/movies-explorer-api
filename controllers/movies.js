const model = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.createMovie = (req, res, next) => {
  model.create({ ...req.body, owner: req.user._id })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getLikeMovies = (req, res, next) => {
  model.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.deliteMovieById = (req, res, next) => {
  model.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Передан несуществующий _id фильма.');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав.');
      }
      return model.findByIdAndDelete(req.params.movieId)
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан невалидный ID для поиска'));
      } else {
        next(err);
      }
    });
};
