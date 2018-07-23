require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const Promise = require("bluebird")
const knex = require("knex")(configuration)
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const { successResponse, errorResponse } = require("../responsers")
const { forgotPasswordJwtObject } = require("../objects")
const envForgetPassword = process.env.JWT_SECRET_USER_FORGOT_PASSWORD
const authMg = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN
	}
}
const nodemailerMailgun = nodemailer.createTransport(mg(authMg))

const verifyScopeTokenAsync = data => {
	return new Promise((resolve, reject) => {
		return data.scope === "forgot-password-user"
			? resolve(data.id)
			: reject(
					errorResponse("Your token don't have permission to this action", 403)
			  )
	})
}

const signingTokenAsync = id => {
	return new Promise((resolve, reject) => {
		return jwt.sign(
			{ id, scope: "forgot-password-user" },
			envForgetPassword,
			forgotPasswordJwtObject,
			(err, token) => {
				return err
					? reject(errorResponse("Internal Server Error", 500))
					: resolve(token)
			}
		)
	})
}

exports.requestForgotPassword = email => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return email
				? resolve(email)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const validationUsersAsync = data => {
		return new Promise((resolve, reject) => {
			return data.length
				? resolve(data[0].id)
				: reject(errorResponse("User not found", 400))
		})
	}

	const findUserWithEmailAsync = () => {
		return new Promise((resolve, reject) => {
			return knex("users")
				.where("email", email)
				.then(res => resolve(res))
				.catch(err => reject(errorResponse("Internal Server Error", 500)))
		})
	}

	const sendMailForgotPassword = token => {
		return new Promise((resolve, reject) => {
			return nodemailerMailgun.sendMail(
				{
					from: "no-reply@lunadorii.com",
					to: "alfanhib@gmail.com",
					subject: "Forgot password",
					html: `<b>${token}</b>`
				},
				(err, info) => {
					err ? reject(err) : resolve(info)
				}
			)
		})
	}

	return checkFieldAsync(email)
		.then(res => findUserWithEmailAsync())
		.then(res => validationUsersAsync(res))
		.then(id => signingTokenAsync(id))
		.then(token => sendMailForgotPassword(token))
		.then(res => successResponse(res, "Success Request Forgot Password", 200))
		.catch(err => err)
}

exports.confirmForgotPassword = data => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return data.token && data.new_password
				? resolve(data)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const verifyValidTokenAsync = data => {
		return new Promise((resolve, reject) => {
			return jwt.verify(data.token, envForgetPassword, (err, decode) => {
				return err
					? reject(errorResponse("Token is not valid", 400))
					: resolve(decode)
			})
		})
	}

	const generatePasswordAsync = id => {
		return bcrypt
			.hash(data.new_password, 10)
			.then(hash =>
				knex("users")
					.where("id", id)
					.update({ password: passwordHash })
					.returning("id")
					.then(id => id)
					.catch(err => err)
			)
			.catch(err => err)
	}

	return checkFieldAsync(data)
		.then(res => verifyValidTokenAsync(res))
		.then(res => verifyScopeTokenAsync(res))
		.then(id => generatePasswordAsync(id))
		.then(res => successResponse(res, "Success Update Password", 201))
		.catch(err => err)
}
