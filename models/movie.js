const mongoose = require('mongoose');

const moviesShema = new mongoose.Schema(
  {
    country: {
      type: String,
      require: true,
    },
    director: {
      type: String,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    year: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
      validate: {
        validator(v) {
          return /https?:\/\/\S+/.test(v);
        },
        message: (props) => `${props.value} Это не url!`,
      },
    },
    trailerLink: {
      type: String,
      require: true,
      validate: {
        validator(v) {
          return /https?:\/\/\S+/.test(v);
        },
        message: (props) => `${props.value} Это не url!`,
      },
    },
    thumbnail: {
      type: String,
      require: true,
      validate: {
        validator(v) {
          return /https?:\/\/\S+/.test(v);
        },
        message: (props) => `${props.value} Это не url!`,
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    movieId: {
      type: Number,
      require: true,
    },
    nameRU: {
      type: String,
      require: true,
    },
    nameEN: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', moviesShema);
