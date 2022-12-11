const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
      validate: {
        validator(v) {
          return isEmail(v);
        },
      },
    },
    password: {
      type: String,
      require: true,
      select: false,
    },
    name: {
      type: String,
      require: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
