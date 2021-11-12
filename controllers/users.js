const { userServices } = require('../services');

// @route   GET api/users/register
// @desc    Register user
// @access  Private
exports.register = async (req, res, next) => {
  return userServices.registerService(req, res, next);
};

// @route   GET api/users/login
// @desc    Login user / Returning JWT
// @access  Public
exports.login = (req, res, next) => {
  return userServices.loginService(req, res, next);
};