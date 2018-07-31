require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")

const checkUserLengthAsync = data => {
	return new Promise((resolve, reject) => {
		return data.length
			? resolve(data)
			: reject(errorResponse("User not found", 500))
	})
}

const comparePasswordAsync = (data, response) => {
	return bcrypt
		.compare(data.password, response[0].password)
		.then(res => {
			return res ? data : errorResponse("Password is incorrect", 400)
		})
		.catch(err => reject(errorResponse("Internal Server Error", 500)))
}

exports.addUserCreditCard = data => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return data.card_number &&
				data.mm &&
				data.yyyy &&
				data.country &&
				data.card_name &&
				data.postal_code &&
				data.id &&
				data.password
				? resolve(data)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const searchUserCreditCardAsync = item => {
		return knex("user_creditcard")
			.where("user_creditcard.id", data.id)
			.then(() => item)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("users")
			.where("users.id", data.id)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const addUserCreditCardAsync = res => {
		return knex("user_creditcard")
			.insert({
				card_number: data.card_number,
				mm: data.mm,
				yyyy: data.yyyy,
				country: data.country,
				card_name: data.card_name,
				postal_code: data.postal_code,
				id: data.id,
				card_default: res.length ? false : true
			})
			.then(() => data)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(res => knexResponse())
		.then(res => checkUserLengthAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => addUserCreditCardAsync(res))
		.then(res => successResponse(res, "Success Update User Credit Card", 201))
		.catch(err => err)
}

exports.getUserCreditCard = id => {
	return knex("user_creditcard")
		.where("id", id)
		.then(res => successResponse(res, "Success Get User Credit Card", 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUserCreditCard = (user_creditcard_id, data) => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return data.password
				? resolve(data)
				: reject(errorResponse("Password cannot be null", 400))
		})
	}

	const updateUserCreditCardAsync = () => {
		return knex("user_creditcard")
			.where("user_creditcard_id", user_creditcard_id)
			.update({
				card_number: data.card_number,
				mm: data.mm,
				yyyy: data.yyyy,
				country: data.country,
				card_name: data.card_name,
				postal_code: data.postal_code
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("users")
			.where("users.id", data.id)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(res => knexResponse())
		.then(res => checkUserLengthAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => updateUserCreditCardAsync())
		.then(res => successResponse(res, "Success Update User Credit Card", 201))
		.catch(err => err)
}

exports.setDefaultUserCreditCard = (user_creditcard_id, id) => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return id ? resolve(id) : reject(errorResponse("Id cannot be null", 400))
		})
	}

	const setDefaultUserCreditCardAsync = () => {
		return knex("user_creditcard")
			.where("user_creditcard_id", user_creditcard_id)
			.update({ card_default: true })
			.then(() => parseInt(user_creditcard_id))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("user_creditcard")
			.where("id", id)
			.update({ card_default: false })
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(() => knexResponse())
		.then(() => setDefaultUserCreditCardAsync())
		.then(res =>
			successResponse(res, "Success Set Default User Credit Card", 201)
		)
		.catch(err => err)
}

exports.deleteUserCreditCard = user_creditcard_id => {
	return knex("user_creditcard")
		.where("user_creditcard_id", user_creditcard_id)
		.del()
		.then(() => successResponse(null, "Success Delete User Credit Card", 200))
		.catch(err => errorResponse(err, 500))
}
