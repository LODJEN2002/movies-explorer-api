const router = require('express').Router();
const {
  getMyProfiel, updateUser,
} = require('../controllers/user');
const { updateUserValidation } = require('../errors/validation');

router.get('/users/me', getMyProfiel);

router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
