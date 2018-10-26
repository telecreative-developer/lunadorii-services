require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const Promise = require("bluebird")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const moment = require("moment-timezone")
const {
	successResponseWithData,
	successResponseWithoutData,
	errorResponse
} = require("../responsers")
const reviewsDefinition = require("../definitions/reviews")
const banksDefinition = require("../definitions/banks")
const userDefinition = require("../definitions/users")
const envDefaultAvatar = process.env.AWS_IMAGE_DEFAULT_URL
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const { forgotPasswordJwtObject } = require("../objects")
const handlebars = require("handlebars")
const momentTimezone = require("moment-timezone")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const fsReadFileAsync = Promise.promisify(fs.readFile)
const { emailVerificationJwtObject } = require("../objects")
const envEmailVerification = process.env.JWT_SECRET_USER_EMAIL_VERIFICATION
const emailTemplateVerification =
	"/./../../lunadorii-email-templates/email-verification.html"
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
		.then(res => successResponse(null, "Success Send Email Verification", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

const mailOptions = (email, template, data) => {
	const html = template(data)
	return {
		from: "no-reply@lunadorii.com",
		to: email,
		subject: "Email Verication",
		html: html
	}
}

const sendEmailVerification = (id, name, email, token) => {
	return readHTMLFile(__dirname + emailTemplateVerification)
		.then(html => handlebars.compile(html))
		.then(hbs =>
			nodemailerMailgunAsync(email, hbs, {
				userName: name,
				userToken: `${process.env.WEB_CLIENT}/email-verification?token=` + token
			})
		)
		.then(res => id)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const signingTokenAsync = id => {
	return new Promise((resolve, reject) => {
		return jwt.sign(
			{ id, scope: "email-verification-user" },
			envEmailVerification,
			emailVerificationJwtObject,
			(err, token) => {
				return err
					? reject(errorResponse("Internal Server Error", 500))
					: resolve({ id, token })
			}
		)
	})
}

const validationAvatar = data => {
	return data.map(res => ({
		...res,
		avatar_url: res.avatar_url ? res.avatar_url : envDefaultAvatar
	}))
}

const checkEmailAsync = data => {
	return new Promise((resolve, reject) => {
		return data.length
			? reject(errorResponse("Email already exists", 409))
			: resolve(data)
	})
}

const checkUserAsync = data => {
	return new Promise((resolve, reject) => {
		return data.length
			? resolve(data)
			: reject(errorResponse("User not found", 400))
	})
}

const checkEmailAfterUpdateAsync = (id, data) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return new Promise((resolve, reject) => {
		if (data.length) {
			data[0].id === id
				? resolve(parseInt(id))
				: reject(errorResponse("Email already exists", 409))
		} else {
			return knex("users")
				.where("id", id)
				.update({
					email: data.email,
					updated_at: now
				})
				.then(() => resolve(parseInt(id)))
				.catch(err => reject(errorResponse("Internal Server Error", 500)))
		}
	})
}

const comparePasswordAsync = (data, response) => {
	return new Promise((resolve, reject) => {
		return bcrypt.compare(data.old_password, response[0].password).then(res => {
			return res
				? resolve(res)
				: reject(errorResponse("Old password is incorrect", 400))
		})
	})
}

const generatePasswordAsync = data => {
	return bcrypt
		.hash(data.password, 10)
		.then(hash => hash)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const checkDataAsync = (res, message) => {
	return new Promise((resolve, reject) => {
		res.length ? resolve(res) : reject(errorResponse(message, 400))
	})
}

exports.getUsers = () => {
	return knex("users")
		.then(res => NestHydrationJS.nest(res, userDefinition))
		.then(res => validationAvatar(res))
		.then(res => successResponseWithData(res, "Success Get Users", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleUser = id => {
	return knex("users")
		.where("id", id)
		.then(res => NestHydrationJS.nest(res, userDefinition))
		.then(res => validationAvatar(res))
		.then(res => successResponseWithData(res, "Success Get User", 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUser = (id, data) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("users")
		.where("id", id)
		.update({
			first_name: data.first_name,
			last_name: data.last_name,
			bod: data.bod,
			updated_at: now
		})
		.then(() => successResponseWithoutData("Success Update User", 201))
		.catch(err => errorResponse(err, 500))
}

exports.updateAvatar = (id, avatar_url) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("users")
		.where("id", id)
		.update({ avatar_url, updated_at: now })
		.then(() => successResponseWithoutData("Success Update User Avatar", 201))
		.catch(err => errorResponse(err, 500))
}

exports.registerUser = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const registerUserAsync = (item, hashPassword) => {
		return knex("users")
			.insert({
				first_name: item.first_name,
				last_name: item.last_name,
				email: item.email,
				password: hashPassword,
				provider: item.provider ? item.provider : "local",
				verified: false,
				created_at: now,
				updated_at: now
			})
			.returning("id")
			.then(id => parseInt(id))
			.catch(err => errorResponse("Registration failed", 500))
	}

	const checkField = item => {
		return new Promise((resolve, reject) => {
			item.first_name && item.last_name && item.email && item.password
				? resolve(item)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const findUserByEmail = item => {
		return knex("users")
			.where("email", item.email)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return (
		checkField(data)
			.then(res => findUserByEmail(res))
			.then(res => checkEmailAsync(res))
			.then(() => generatePasswordAsync(data))
			.then(hashPassword => registerUserAsync(data, hashPassword))
			// .then(id => signingTokenAsync(parseInt(id)))
			// .then(res => {
			// 	return sendEmailVerification(
			// 		res.id,
			// 		data.first_name,
			// 		data.email,
			// 		res.token
			// 	)
			// })
			.then(id => successResponseWithData(id, "Register Success", 201))
			.catch(err => err)
	)
}

exports.checkEmail = email => {
	const checkFieldAsync = item => {
		return new Promise((resolve, reject) => {
			item ? resolve(item) : reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const knexResponse = item => {
		return knex("users")
			.where("email", item)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(email)
		.then(res => knexResponse(res))
		.then(res => checkEmailAsync(res))
		.then(() => successResponseWithoutData("Email available", 200))
		.catch(err => err)
}

exports.updateEmail = (id, email) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const checkEmailAfterUpdateAsync = (id, data) => {
		const now = momentTimezone()
			.tz("Asia/Jakarta")
			.format()
	
		return new Promise((resolve, reject) => {
			if (data.length) {
				data[0].id === id
					? resolve(parseInt(id))
					: reject(errorResponse("Email already exists", 409))
			} else {
				return knex("users")
					.where("id", id)
					.update({
						email: email,
						updated_at: now
					})
					.then(() => resolve(parseInt(id)))
					.catch(err => reject(errorResponse("Internal Server Error", 500)))
			}
		})
	}

	const checkFieldAsync = email => {
		return new Promise((resolve, reject) => {
			email
				? resolve(email)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const knexResponse = email => {
		return knex("users")
			.where("email", email)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(email)
		.then(email => knexResponse(email))
		.then(res => checkEmailAfterUpdateAsync(id, res))
		.then(() => successResponseWithoutData("Success Update User Email", 201))
		.catch(err => err)
}

exports.updatePassword = (id, data) => {
	const checkFieldAsync = data => {
		return new Promise((resolve, reject) => {
			data.new_password && data.old_password
				? resolve(data)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const updatePasswordAsync = hash => {
		const now = momentTimezone()
			.tz("Asia/Jakarta")
			.format()

		return knex("users")
			.where("id", id)
			.update({ password: hash, updated_at: now })
			.then(() => id)
			.then(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = id => {
		return knex("users")
			.where("id", id)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(data)
		.then(() => knexResponse(id))
		.then(res => checkUserAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => generatePasswordAsync({ password: data.new_password }))
		.then(hash => updatePasswordAsync(hash))
		.then(() => successResponseWithoutData("Success Update Password", 201))
		.catch(err => err)
}
