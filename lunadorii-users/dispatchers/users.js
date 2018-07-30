require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const moment = require("moment-timezone")
const { successResponse, errorResponse } = require("../responsers")
const reviewsDefinition = require("../definitions/reviews")
const banksDefinition = require("../definitions/banks")
const userDefinition = require("../definitions/users")
const envDefaultAvatar = process.env.AWS_IMAGE_DEFAULT_URL

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
	return new Promise((resolve, reject) => {
		if (data.length) {
			data[0].id === id
				? resolve(parseInt(id))
				: reject(errorResponse("Email already exists", 409))
		} else {
			return knex("users")
				.where("id", id)
				.update({
					email: data.email
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
		.then(res => successResponse(res, "Success Get Users", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getUserById = id => {
	return knex("users")
		.where("id", id)
		.then(res => NestHydrationJS.nest(res, userDefinition))
		.then(res => validationAvatar(res))
		.then(res => successResponse(res, "Success Get User", 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUser = (id, data) => {
	return knex("users")
		.where("id", id)
		.update({
			first_name: data.first_name,
			last_name: data.last_name,
			bod: data.bod,
			updated_at: moment()
				.tz("Asia/Jakarta")
				.format()
		})
		.then(() => successResponse(parseInt(id), "Success Update User", 201))
		.catch(err => errorResponse(err, 500))
}

exports.updateAvatar = (id, avatar_url) => {
	return knex("users")
		.where("id", id)
		.update({ avatar_url })
		.then(res => successResponse(res, "Success Update User Avatar", 201))
		.catch(err => errorResponse(err, 500))
}

exports.registerUser = data => {
	const registerUserAsync = (item, hashPassword) => {
		return knex("users")
			.insert({ ...data, password: hashPassword, verified: false })
			.returning("id")
			.then(id => resolve(parseInt(id)))
			.catch(err => reject(errorResponse("Registration failed", 500)))
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
			.catch(err => reject(errorResponse("Internal Server Error", 500)))
	}

	return checkField(data)
		.then(res => findUserByEmail(res))
		.then(res => checkEmailAsync(res))
		.then(() => generatePasswordAsync(data))
		.then(hashPassword => registerUserAsync(data, hashPassword))
		.then(id => successResponse(id, "Register Success", 201))
		.catch(err => err)
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
		.then(res => successResponse(null, "Email available", 200))
		.catch(err => err)
}

exports.updateEmail = (id, email) => {
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

	return checkFieldAsync(item)
		.then(res => knexResponse(res))
		.then(res => checkEmailAfterUpdateAsync(id, res))
		.then(id => successResponse(id, "Success Update User Email", 201))
		.catch(err => err)
}

exports.updatePassword = (id, data) => {
	const checkFieldAsync = item => {
		return new Promise((resolve, reject) => {
			item.new_password && item.old_password
				? resolve(item)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const updatePasswordAsync = hash => {
		return knex("users")
			.where("id", id)
			.update({ password: hash })
			.then(() => id)
			.then(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = item => {
		return knex("users")
			.where("id", item)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(item)
		.then(() => knexResponse(id))
		.then(res => checkUserAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => generatePasswordAsync({ password: data.new_password }))
		.then(hash => updatePasswordAsync(hash))
		.then(res => successResponse(null, "Success Update Password", 201))
		.catch(err => err)
}
