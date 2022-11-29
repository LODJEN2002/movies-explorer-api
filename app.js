const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/user');
const moviesRouter = require('./routes/movies');
const auth = require('./middlewares/auth');
// const { NotFoundError } = require('./errors/NotFoundError');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(express.json());

mongoose.connect(MONGO_URL, { autoIndex: true });

app.use(auth);

app.use('/', userRouter);
app.use('/', moviesRouter);

// app.use('/*', () => {
//   throw new NotFoundError('Запрашиваемый ресурс не найден');
// });

app.use(errors());
// центральный обработчик ошибко
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });

  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
