require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const passport = require("passport")
const passportJWT = require("passport-jwt")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require("passport-facebook").Strategy
const ExtractJWT = passportJWT.ExtractJwt
const JWTStrategy = passportJWT.Strategy
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const bcrypt = require("bcrypt")

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password"
		},
		(email, password, done) => {
			return knex("users")
				.where("email", email)
				.limit(1)
				.then(response => {
					bcrypt.compare(password, response[0].password).then(res => {
						if (res) {
							return done(null, response[0])
						} else {
							return done(null, false, {
								message: "Incorrect email or password"
							})
						}
					})
				})
				.catch(e => done(e))
		}
	)
)

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET_KEY
		},
		(payload, done) => {
			return knex("users")
				.where("id", payload.id)
				.then(response => done(null, response))
				.catch(err => done(err))
		}
	)
)

passport.use(
	new FacebookStrategy(
		{
			clientID: "1055195541294811",
			clientSecret: "5cd61e73d07691afecc9ba0b0aa5412c",
			callbackURL: "/api/v1/auth/user/facebook",
			profileFields: ["id", "displayName", "photos", "email"],
			passReqToCallback: true
		},
		(req, accessToken, refreshToken, profile, done) => {
			return knex("users")
				.where("email", profile._json.email)
				.limit(1)
				.then(response => {
					return done(null, response)
				})
		}
	)
)
