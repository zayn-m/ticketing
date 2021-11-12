const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../../controllers/users');
const validationErrors = require('../../middleware/validationErrors');

router.post(
	'/register',
	validationErrors('required', [ 'name', 'email', 'password', ]),
  usersController.register
);
router.post('/login', usersController.login);

module.exports = router;