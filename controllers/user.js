const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const model = require('../models/user');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => model.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      console.log(user);
      res.send({
        email,
        name,
        id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.send({ messange: 'Пользователь с данным email уже создан' });
      }
      return res.send({ err });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return model.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getMyProfiel = (req, res) => {
  model.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.send({ messange: 'Что то не так!' });
      }
      return res.send(user);
    });
};

module.exports.updateUser = (req, res, next) => {
  model.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
