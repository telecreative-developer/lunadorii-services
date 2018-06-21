require('dotenv/config')
const Promise = require('bluebird')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy   = passportJWT.Strategy
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, (username, password, done) => {
	return knex('admin')
		.where('username', username)
		.limit(1)
		.then(response => {
			bcrypt.compare(password, response[0].password).then(res => {
				if(res) {
					return done(null, response[0])
				}else {
					return done(null, false, {message: 'Incorrect username or password'})
				}
			})
		})
		.catch(e => done(e))
}))

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
}, (payload, done) => {
	return knex('admin')
		.where('admin_id', payload.admin_id)
		.then(response => done(null, response))
		.catch(err => done(err))
}))