const ErrorResponse = require('../utils/errorResponse');

exports.authorize = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role))
			return next(new ErrorResponse(`User role ${req.user.role} is unauthorized to access`, 403));
		next();
	};
};