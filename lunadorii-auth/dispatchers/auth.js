require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const fetch = require("node-fetch")
const jwt = require("jsonwebtoken")
const momentTimezone = require("moment-timezone")
const { successResponse, errorResponse } = require("../responsers")
const {
	accessTokenUserJwtObejct,
	refreshTokenUserJwtObject
} = require("../objects")

const generateAccessToken = id => {
	return jwt.sign(
		{ id, scope: "access-token-user" },
		process.env.JWT_SECRET_USER_ACCESS_TOKEN,
		accessTokenUserJwtObejct
	)
}

const generateRefreshToken = id => {
	return jwt.sign(
		{ id, scope: "refresh-token-user" },
		process.env.JWT_SECRET_USER_REFRESH_TOKEN,
		refreshTokenUserJwtObject
	)
}

const checkUserAsync = data => {
	return new Promise(resolve => {
		data.length
			? resolve({ data, status: "login" })
			: resolve({ data, status: "register" })
	})
}

const checkProviderAsync = (data, provider) => {
	return new Promise((resolve, reject) => {
		const check = !!data.filter(res => res.provider === provider).length
		return check ? resolve(data[0].id) : resolve(data[0].id)
	})
}

const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

const registerUserWithFacebookAsync = data => {
	return knex("users")
		.insert({
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			avatar_url: data.avatar_url,
			provider: "facebook",
			verified: true,
			created_at: now,
			updated_at: now
		})
		.returning("id")
		.then(id => parseInt(id))
		.catch(err => errorResponse(err, "Authentication With Facebook failed", 500))
}

const registerUserWithGoogleAsync = data => {
	return knex("users")
		.insert({
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			avatar_url: data.avatar_url,
			provider: "google",
			verified: true,
			created_at: now,
			updated_at: now
		})
		.returning("id")
		.then(id => parseInt(id))
		.catch(err => errorResponse(err, "Authentication With Google failed", 500))
}

const generateTokenAsync = id => {
	return new Promise(resolve => {
		const accessToken = generateAccessToken(id)
		const refreshToken = generateRefreshToken(id)
		return resolve({ id, accessToken, refreshToken })
	})
}

exports.authFacebook = data => {
	const checkFieldAsync = data => {
		return new Promise((resolve, reject) => {
			return data.id && data.first_name && data.last_name && data.avatar_url && data.email && data.accessToken
				? resolve(data)
				: reject(errorResponse("Missing Credentials", 400))
		})
	}

	const findUserWithEmailAsync = data => {
		return knex("users").where("email", data.email)
	}

	return checkFieldAsync(data)
		.then(res => findUserWithEmailAsync(res))
		.then(res => checkUserAsync(res))
		.then(res => {
			return res.status === "login"
				? checkProviderAsync(res.data, "facebook")
				: registerUserWithFacebookAsync(data)
		})
		.then(id => generateTokenAsync(id))
		.then(res => {
			return successResponse(res, "Success Authenticate with Facebook", 201)
		})
		.catch(err => errorResponse(err))
}

exports.authGoogle = data => {
	const checkFieldAsync = data => {
		return new Promise((resolve, reject) => {
			return data.first_name && data.last_name && data.avatar_url && data.email
				? resolve(data)
				: reject(errorResponse("Missing Credentials", 400))
		})
	}

	const findUserWithEmailAsync = data => {
		return knex("users").where("email", data.email)
	}

	return checkFieldAsync(data)
		.then(res => findUserWithEmailAsync(res))
		.then(res => checkUserAsync(res))
		.then(res => {
			return res.status === "login"
			? checkProviderAsync(res.data, "google")
			: registerUserWithGoogleAsync(res.data)
		})
		.then(id => generateTokenAsync(id))
		.then(res => {
			return successResponse(res, "Success Authenticate with Google", 201)
		})
		.catch(err => errorResponse(err))
}
