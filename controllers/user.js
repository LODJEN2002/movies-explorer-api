const model = require('../models/user');

module.exports.createUser = (req, res) => {
  const { email, password, name } = req.body;

  model.create({ email, password, name })
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.send({ messange: 'Пользователь с данным email уже создан' });
      }
      return res.send({ messange: 'Ошибка))' });
    });
};

module.exports.getUsers = (req, res) => {
  model.find()
    .then((users) => {
      res.send(users);
    });
};
