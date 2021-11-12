const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
	let error = { ...err };

	error.message = err.message;

	console.log('ERR LOG ' + err);

	// Mongoose bad ObjectId
	if (err.name === 'CastError') {
		const message = `Resource not found with id of ${err.value}`;
		error = new ErrorResponse(message, 404);
	}

	res.status(error.statusCode || 500).json({
		success: false,
		message: error.message || 'Unexpected server error occurred'
	});
};

module.exports = errorHandler;