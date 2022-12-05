const model = require('../models/movie');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.createMovie = (req, res) => {
  const {
    country, director, duration, year, description, image, trailerLink,
    thumbnail, nameRU, nameEN,
  } = req.body;

  model.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    });
};

module.exports.getLikeMovies = (req, res) => {
  model.find({ owner: req.user._id })
    .then((movies) => res.send(movies));
};

module.exports.deliteMovieById = (req, res, next) => {
  model.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
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
