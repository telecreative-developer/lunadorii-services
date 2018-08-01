require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const adminDefinition = require("../definitions/admin")

const checkEmailAfterUpdateAsync = (admin_id, data) => {
	return new Promise((resolve, reject) => {
		if (data.length) {
			data[0].id === id
				? resolve(parseInt(id))
				: reject(errorResponse("Email already exists", 409))
		} else {
			return knex("admin_id")
				.where("admin_id", admin_id)
				.update({
					email: data.email
				})
				.then(() => resolve(parseInt(admin_id)))
				.catch(err => reject(errorResponse("Internal Server Error", 500)))
		}
	})
}

exports.getAdminById = admin_id => {
	return knex("admin")
		.where("admin_id", admin_id)
		.then(res => NestHydrationJS.nest(res, adminDefinition))
		.then(res => successResponse(res, "Success Get Admin", 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateAdmin = (admin_id, data) => {
	return knex("admin")
		.where("admin_id", admin_id)
		.update({
			first_name: data.first_name,
			last_name: data.last_name
		})
		.then(() =>
			successResponse(parseInt(admin_id), "Success Update Admin", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateUsername = (admin_id, data) => {
	return knex("admin")
		.where("admin_id", admin_id)
		.then(response => {
			if (response.length) {
				if (response[0].username === data.username) {
					return successResponse(
						parseInt(admin_id),
						`Success Update Admin Username (admin_id: ${admin_id})`,
						200
					)
				} else {
					return errorResponse("Username is already exists", 409)
				}
			} else {
				return knex("admin")
					.where("admin_id", admin_id)
					.update({ username: data.username })
					.then(response =>
						successResponse(
							parseInt(admin_id),
							`Success Update Admin Username (admin_id: ${admin_id})`,
							200
						)
					)
					.catch(err => errorResponse(err, 500))
			}
		})
}

exports.updateEmail = (admin_id, email) => {
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
		.then(res => knexResponse(email))
		.then(res => checkEmailAfterUpdateAsync(admin_id, res))
		.then(admin_id =>
			successResponse(admin_id, "Success Update User Email", 201)
		)
		.catch(err => err)
}

exports.updatePassword = (admin_id, data) => {
	return knex("admin")
		.where("admin_id", admin_id)
		.then(response => {
			if (response.length) {
				return bcrypt
					.compare(data.old_password, response[0].password)
					.then(res => {
						if (res) {
							return bcrypt.hash(data.new_password, 10).then(hash =>
								knex("admin")
									.where("admin_id", admin_id)
									.update({ password: hash })
									.then(response =>
										successResponse(
											parseInt(admin_id),
											`Success Update Admin Password (admin_id: ${admin_id})`,
											200
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
