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
const handlebars = require("handlebars")
const fs = require("fs")
const fsReadFileAsync = Promise.promisify(fs.readFile)
const envForgetPassword = process.env.JWT_SECRET_USER_FORGOT_PASSWORD
const emailTemplateForgotPassword =
	"/./../../lunadorii-email-templates/forgot-password.html"
const authMg = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN
	}
}
const nodemailerMailgun = Promise.promisifyAll(
	nodemailer.createTransport(mg(authMg))
)

const readHTMLFile = path => {
	return fsReadFileAsync(path, { encoding: "utf-8" })
		.then(html => html)
		.catch(err => err)
}

const nodemailerMailgunAsync = (email, template, data) => {
	return nodemailerMailgun
		.sendMail(mailOptions(email, template, data))
		.then(res =>
			successResponse(null, "Success Send Request Forgot Password", 200)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const mailOptions = (email, template, data) => {
	const html = template(data)
	return {
		from: "no-reply@lunadorii.com",
		to: email,
		subject: "Forgot Password",
		html: html
	}
}

const sendEmailForgotPassword = (email, token) => {
	return readHTMLFile(__dirname + emailTemplateForgotPassword)
		.then(html => handlebars.compile(html))
		.then(hbs =>
			nodemailerMailgunAsync(email, hbs, {
				link: `http://54.169.224.248:3000/reset-password?token=` + token
			})
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

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

	return checkFieldAsync(email)
		.then(res => findUserWithEmailAsync())
		.then(res => validationUsersAsync(res))
		.then(id => signingTokenAsync(id))
		.then(token => sendEmailForgotPassword(email, token))
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
					.update({ password: hash })
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
		.then(id => successResponse(parseInt(id), "Success Update Password", 201))
		.catch(err => err)
}
