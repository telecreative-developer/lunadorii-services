require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")

exports.addUserCreditCard = data => {
	return knex("users")
		.where("users.id", data.id)
		.then(response => {
			return knex("user_creditcard")
				.where("user_creditcard.id", data.id)
				.then(responseUserCreditCard => {
					return bcrypt
						.compare(data.password, response[0].password)
						.then(res => {
							if (res) {
								return knex("user_creditcard")
									.insert({
										card_number: data.card_number,
										mm: data.mm,
										yyyy: data.yyyy,
										country: data.country,
										card_name: data.card_name,
										postal_code: data.postal_code,
										id: data.id,
										card_default: responseUserCreditCard.length ? false : true
									})
									.returning("user_creditcard_id")
									.then(user_creditcard_id =>
										successResponse(
											parseInt(user_creditcard_id),
											"Success Add User Credit Card",
											201
										)
									)
									.catch(err => console.log(err))
							} else {
								return errorResponse("Password is incorrect", 500)
							}
						})
				})
		})
		.catch(err => errorResponse(err, 500))
}

exports.getUserCreditCard = id => {
	return knex("user_creditcard")
		.where("id", id)
		.then(response =>
			successResponse(response, "Success Get User Credit Card", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateUserCreditCard = (user_creditcard_id, data) => {
	return knex("users")
		.where("users.id", data.id)
		.then(response => {
			if (response.length) {
				return bcrypt.compare(data.password, response[0].password).then(res => {
					if (res) {
						return knex("user_creditcard")
							.where("user_creditcard_id", user_creditcard_id)
							.update({
								card_number: data.card_number,
								mm: data.mm,
								yyyy: data.yyyy,
								country: data.country,
								card_name: data.card_name,
								postal_code: data.postal_code,
								id: data.id
							})
							.then(response =>
								successResponse(
									parseInt(user_creditcard_id),
									"Success Update User Credit Card",
									201
								)
							)
							.catch(err => console.log(err))
					} else {
						return errorResponse("Password is incorrect", 500)
					}
				})
			} else {
				return errorResponse("User not found", 500)
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.setDefaultUserCreditCard = (user_creditcard_id, id) => {
	return knex("user_creditcard")
		.where("id", id)
		.update({ card_default: false })
		.then(() => {
			return knex("user_creditcard")
				.where("user_creditcard_id", user_creditcard_id)
				.update({ card_default: true })
				.then(response =>
					successResponse(
						parseInt(user_creditcard_id),
						"Success Set Default User Credit Card",
						201
					)
				)
				.catch(err => errorResponse(err, 500))
		})
		.catch(err => errorResponse(err, 500))
}

exports.deleteUserCreditCard = user_creditcard_id => {
	return knex("user_creditcard")
		.where("user_creditcard_id", user_creditcard_id)
		.del()
		.then(() =>
			successResponse(
				parseInt(user_creditcard_id),
				"Success Delete User Credit Card",
				201
			)
		)
		.catch(err => errorResponse(err, 500))
}
