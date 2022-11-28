const router = require('express').Router();
const { createUser, getUsers } = require('../controllers/user');

router.post('/hello', createUser);

router.get('/hello', getUsers);

module.exports = router;
