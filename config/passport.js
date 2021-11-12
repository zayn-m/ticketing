const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SESSION_SECRET;

module.exports = (passport) => {
	passport.use(
		new jwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then((user) => {
					if (user) {
						return done(null, user);
					} else {
						done(null, false);
					}
				})
				.catch((error) => console.log(error));
		})
	);
};