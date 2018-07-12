require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const fetch = require("node-fetch")
const jwt = require("jsonwebtoken")
const { successResponse, errorResponse } = require("../responsers")

const accessTokenObject = {
	subject: "lunadorii",
	algorithm: "HS256",
	expiresIn: "7d",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

const refreshTokenObject = {
	subject: "lunadorii",
	algorithm: "HS256",
	expiresIn: "10d",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

exports.authFacebook = data => {
	return knex("users")
		.where("email", data.email)
		.limit(1)
		.then(response => {
			if (response.length) {
				const check = !!response.filter(
					rescheck => rescheck.provider === "facebook"
				).length
				if (check) {
					const accessToken = jwt.sign(
						{ id: response[0].id, role: "user" },
						process.env.JWT_SECRET_KEY,
						accessTokenObject
					)
					const refreshToken = jwt.sign(
						{ id: response[0].id, role: "user" },
						process.env.JWT_SECRET_KEY,
						refreshTokenObject
					)
					return successResponse(
						{ id: response[0].id, accessToken, refreshToken },
						"Success Authenticate with Facebook",
						201
					)
				} else {
					return errorResponse("Email is already exist", 500)
				}
			} else {
				return fetch(
					`https://graph.facebook.com/${
						data.id
					}?fields=id,first_name,last_name,email,picture&access_token=${
						data.accessToken
					}`
				)
					.then(res => res.json())
					.then(res => {
						return knex("users")
							.insert({
								first_name: res.first_name,
								last_name: res.last_name,
								email: res.email,
								avatar_url: res.picture.data.url,
								provider: "facebook"
							})
							.returning("id")
							.then(id => {
								const accessToken = jwt.sign(
									{ id: parseInt(id.toString()), role: "user" },
									process.env.JWT_SECRET_KEY,
									accessTokenObject
								)
								const refreshToken = jwt.sign(
									{ id: parseInt(id.toString()), role: "user" },
									process.env.JWT_SECRET_KEY,
									refreshTokenObject
								)
								return successResponse(
									{ id: parseInt(id.toString()), accessToken, refreshToken },
									"Success Authenticate with Facebook",
									201
								)
							})
							.catch(err => errorResponse(err, 500))
					})
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.authGoogle = data => {
	return knex(users)
		.where("email", data.email)
		.limit(1)
		.then(response => {
			if (response.length) {
				const check = !!response.filter(
					rescheck => rescheck.provider === "google"
				).length

				if (check) {
					const accessToken = jwt.sign(
						{ id: response[0].id, role: "user" },
						process.env.JWT_SECRET_KEY,
						accessTokenObject
					)
					const refreshToken = jwt.sign(
						{ id: response[0].id, role: "user" },
						process.env.JWT_SECRET_KEY,
						refreshTokenObject
					)
					return successResponse(
						{ id: response[0].id, accessToken, refreshToken },
						"Success Authenticate with Google",
						201
					)
				} else {
					return errorResponse("Email is already exist", 500)
				}
			} else {
				return knex("users")
					.insert({
						first_name: res.first_name,
						last_name: res.last_name,
						email: res.email,
						avatar_url: res.picture.data.url,
						provider: "facebook"
					})
					.returning("id")
					.then(id => {
						const accessToken = jwt.sign(
							{ id: parseInt(id.toString()), role: "user" },
							process.env.JWT_SECRET_KEY,
							accessTokenObject
						)
						const refreshToken = jwt.sign(
							{ id: parseInt(id.toString()), role: "user" },
							process.env.JWT_SECRET_KEY,
							refreshTokenObject
						)
						return successResponse(
							{ id: parseInt(id.toString()), accessToken, refreshToken },
							"Success Authenticate with Facebook",
							201
						)
					})
					.catch(err => errorResponse(err, 500))
			}
		})
}
