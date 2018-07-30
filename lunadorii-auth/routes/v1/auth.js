require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const jwt = require("jsonwebtoken")
const passport = require("passport")
const { authFacebook, authGoogle } = require("../../dispatchers/auth")
const {
	requestForgotPassword,
	confirmForgotPassword
} = require("../../dispatchers/fpassword")
const {
	accessTokenUserJwtObejct,
	refreshTokenUserJwtObject
} = require("../../objects")

router.post("/auth/user", (req, res) => {
	passport.authenticate(
		"local",
		{ session: false },
		(error, response, info) => {
			if (error || !response) {
				return res.status(400).json({
					name: "error",
					message: info ? info.message : "Login failed",
					status: 400
				})
			}

			req.login(response, { session: false }, err => {
				if (err) {
					return res.status(500).json({
						name: "error",
						message: err,
						status: 500
					})
				}

				const accessToken = jwt.sign(
					{ id: response.id, scope: "access-token-user" },
					process.env.JWT_SECRET_USER_ACCESS_TOKEN,
					accessTokenUserJwtObejct
				)

				const refreshToken = jwt.sign(
					{ id: response.id, scope: "refresh-token-user" },
					process.env.JWT_SECRET_USER_REFRESH_TOKEN,
					refreshTokenUserJwtObject
				)

				return res.status(201).json({
					name: "success",
					message: "Login Success",
					status: 201,
					id: response.id,
					accessToken,
					refreshToken
				})
			})
		}
	)(req, res)
})

router.post("/auth/user/facebook", (req, res) => {
	Promise.try(() => authFacebook(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on AUTH_FACEBOOK", err))
})

router.post("/auth/user/google", (req, res) => {
	Promise.try(() => authGoogle(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on AUTH_GOOGLE", err))
})

router.post("/request/user/forgot-password", (req, res) => {
	Promise.try(() => requestForgotPassword(req.body.email))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Route Error on REQUEST_FORGOT_PASSWORD", err))
})

router.post("/confirm/user/forgot-password", (req, res) => {
	Promise.try(() => confirmForgotPassword(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Route Error on REQUEST_FORGOT_PASSWORD", err))
})

module.exports = router
