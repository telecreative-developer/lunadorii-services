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

exports.getUsers = () => {
	return knex("users")
		.then(response => NestHydrationJS.nest(response, userDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				avatar_url: res.avatar_url
					? res.avatar_url.length < 20
						? process.env.AWS_IMAGE_URL + res.avatar_url
						: res.avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => successResponse(response, "Success Get Users", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getUserById = id => {
	return knex("users")
		.where("id", id)
		.then(response => NestHydrationJS.nest(response, userDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				avatar_url: res.avatar_url
					? res.avatar_url.length < 20
						? process.env.AWS_IMAGE_URL + res.avatar_url
						: res.avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response =>
			successResponse(response, `Success Get User (id: ${id})`, 200)
		)
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
		.then(response =>
			successResponse(parseInt(id), `Success Update User (id: ${id})`, 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateAvatar = (id, image) => {
	return knex("users")
		.where("id", id)
		.update({
			avatar_url: image
		})
		.then(response =>
			successResponse(response, `Success Upload User Avatar (id: ${id})`, 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.registerUser = data => {
	return knex("users")
		.where("email", data.email)
		.then(response => {
			if (response.length) {
				return errorResponse("Email is already exists", 409)
			} else {
				return bcrypt
					.hash(data.password, 10)
					.then(hash =>
						knex("users")
							.insert({ ...data, password: hash })
							.returning("id")
					)
					.then(id =>
						successResponse(
							[{ id: parseInt(id.toString()) }],
							`Success Register User (id: ${parseInt(id.toString())})`,
							201
						)
					)
					.catch(err => errorResponse(err, 500))
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.checkEmail = email => {
	return knex("users")
		.where("email", email)
		.then(response => {
			if (response.length) {
				return errorResponse("Email is already exists", 409)
			} else {
				return successResponse(null, "Email available", 200)
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.updateEmail = (id, data) => {
	return knex("users")
		.where("email", data.email)
		.then(response => {
			if (response.length) {
				if (response[0].id === parseInt(id)) {
					return successResponse(
						parseInt(id),
						`Success Update User Email (id: ${id})`,
						201
					)
				} else {
					return errorResponse("Email is already exists", 409)
				}
			} else {
				return knex("users")
					.where("id", id)
					.update({
						email: data.email
					})
					.then(() =>
						successResponse(
							parseInt(id),
							`Success Update User Email (id: ${id})`,
							201
						)
					)
					.catch(err => errorResponse(err, 500))
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.updatePassword = (id, data) => {
	return knex("users")
		.where("id", id)
		.then(response => {
			if (response.length) {
				return bcrypt
					.compare(data.old_password, response[0].password)
					.then(res => {
						if (res) {
							return bcrypt.hash(data.new_password, 10).then(hash =>
								knex("users")
									.where("id", id)
									.update({ password: hash })
									.then(response =>
										successResponse(
											parseInt(id),
											`Success Update User Password (id: ${id})`,
											201
										)
									)
									.catch(err => errorResponse(err, 500))
							)
						} else {
							return errorResponse("Old password is incorrect", 500)
						}
					})
					.catch(err => errorResponse(err, 500))
			} else {
				return errorResponse(null, 500)
			}
		})
		.catch(err => errorResponse(err, 500))
}
