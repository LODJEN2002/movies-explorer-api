const router = require('express').Router();
const { createUserValidation, loginValidation } = require('../errors/validation');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');

const userRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

router.post('/signup', createUserValidation, createUser);

router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/', userRouter);
router.use('/', moviesRouter);
router.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
