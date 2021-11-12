const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

const registerService = async (req, res, next) => {
	let user = await User.findOne({ email: req.body.email });

	if (user) {
		res.status(400).json({ success: false, errors: { email: 'Email already exists' } });
		return;
	}

	user = await User.create(req.body);

	res.status(201).json({
		success: true,
		data: user
	});
};

const loginService = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({
		email
	})
		.select('+password')
		.then((user) => {
			// Check for user
			if (!user) {
				return next(new ErrorResponse('Invalid provided credentials', 404));
			}
			// Check password
			bcrypt.compare(password, user.password).then((isMatched) => {
				if (isMatched) {
					// User matched

					const payload = {
						id: user.id
					}; // Create JWT payload

					// Sign token
					jwt.sign(payload, process.env.SESSION_SECRET, (err, token) => {
						res.json({ success: true, token: `Bearer ${token}`, role: user.role });
					});
				} else {
					return next(new ErrorResponse('Invalid provided credentials', 404));
				}
			});
		});
};

module.exports = { registerService, loginService }