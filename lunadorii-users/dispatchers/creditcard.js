require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const momentTimezone = require("moment-timezone")
const NestHydrationJS = require("nesthydrationjs")()
const {
	successResponseWithData,
	successResponseWithoutData,
	errorResponse
} = require("../responsers")

const checkUserLengthAsync = data => {
	return new Promise((resolve, reject) => {
		return data.length
			? resolve(data)
			: reject(errorResponse("User not found", 500))
	})
}

const comparePasswordAsync = (data, response) => {
	return new Promise((resolve, reject) => {
		return bcrypt
			.compare(data.password, response[0].password)
			.then(res => {
				return res
					? resolve(data)
					: reject(errorResponse("Password is incorrect", 400))
			})
			.catch(err => errorResponse("Internal Server Error", 500))
	})
}

exports.addUserCreditCard = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

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

	const checkUserLengthAsync = item => {
		return knex("users")
			.where("users.id", item.id)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const addUserCreditCardAsync = (res, data) => {
		return knex("user_creditcard")
			.insert({
				card_number: data.card_number,
				mm: data.mm,
				yyyy: data.yyyy,
				country: data.country,
				card_name: data.card_name,
				postal_code: data.postal_code,
				id: data.id,
				card_default: res.length ? false : true,
				created_at: now,
				updated_at: now
			})
			.then(() => data)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(res => checkUserLengthAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => addUserCreditCardAsync(res, data))
		.then(() =>
			successResponseWithoutData("Success Update User Credit Card", 201)
		)
		.catch(err => console.log(err))
}

exports.getUserCreditCard = id => {
	return knex("user_creditcard")
		.where("id", id)
		.then(res =>
			successResponseWithData(res, "Success Get User Credit Card", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateUserCreditCard = (user_creditcard_id, data) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return data.password
				? resolve(data)
				: reject(errorResponse("Password cannot be null", 400))
		})
	}

	const updateUserCreditCardAsync = (data, user_creditcard_id) => {
		return knex("user_creditcard")
			.where("user_creditcard_id", user_creditcard_id)
			.update({
				card_number: data.card_number,
				mm: data.mm,
				yyyy: data.yyyy,
				country: data.country,
				card_name: data.card_name,
				postal_code: data.postal_code,
				updated_at: now
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
		.then(res => checkUserLengthAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => updateUserCreditCardAsync(data, user_creditcard_id))
		.then(() =>
			successResponseWithoutData("Success Update User Credit Card", 201)
		)
		.catch(err => err)
}

exports.setDefaultUserCreditCard = (user_creditcard_id, id) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return id ? resolve(id) : reject(errorResponse("Id cannot be null", 400))
		})
	}

	const setDefaultUserCreditCardAsync = () => {
		return knex("user_creditcard")
			.where("user_creditcard_id", user_creditcard_id)
			.update({ card_default: true, updated_at: now })
			.then(res => parseInt(user_creditcard_id))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("user_creditcard")
			.where("id", id)
			.update({ card_default: false, updated_at: now })
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(() => knexResponse())
		.then(() => setDefaultUserCreditCardAsync())
		.then(() =>
			successResponseWithoutData("Success Set Default User Credit Card", 201)
		)
		.catch(err => err)
}

exports.deleteUserCreditCard = user_creditcard_id => {
	return knex("user_creditcard")
		.where("user_creditcard_id", user_creditcard_id)
		.del()
		.then(() =>
			successResponseWithoutData("Success Delete User Credit Card", 200)
		)
		.catch(err => errorResponse(err, 500))
}
