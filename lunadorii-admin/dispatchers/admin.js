require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const adminDefinition = require("../definitions/admin")

exports.getAdminById = admin_id => {
	return knex("admin")
		.where("admin_id", admin_id)
		.then(response => NestHydrationJS.nest(response, adminDefinition))
		.then(response =>
			successResponse(
				response,
				`Success Get Admin (admin_id: ${admin_id})`,
				200
			)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateAdmin = (admin_id, data) => {
	return knex("admin")
		.where("admin_id", admin_id)
		.update({
			first_name: data.first_name,
			last_name: data.last_name
		})
		.then(response =>
			successResponse(
				parseInt(admin_id),
				`Success Update Admin (admin_id: ${admin_id})`,
				200
			)
		)
		.catch(err => errorResponse(err, 500))
}

exports.registerAdmin = data => {
	return knex("admin")
		.where("email", data.email)
		.then(response => {
			if (response.length) {
				return errorResponse("Email is already exists", 409)
			} else {
				return knex("admin")
					.where("username", data.username)
					.then(response => {
						if (response.length) {
							return errorResponse("Username is already exists", 409)
						} else {
							return bcrypt
								.hash(data.password, 10)
								.then(hash =>
									knex("admin")
										.insert({ ...data, password: hash })
										.returning("admin_id")
								)
								.then(admin_id =>
									successResponse(
										[{ admin_id: parseInt(admin_id.toString()) }],
										"Success Register Admin",
										201
									)
								)
								.catch(err => errorResponse(err, 500))
						}
					})
			}
		})
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

exports.updateEmail = (admin_id, data) => {
	return knex("admin")
		.where("admin_id", admin_id)
		.then(response => {
			if (response.length) {
				if (response[0].email === data.email) {
					return successResponse(
						parseInt(admin_id),
						`Success Update Admin Email (admin_id: ${admin_id})`,
						200
					)
				} else {
					return errorResponse("Email is already exists", 409)
				}
			} else {
				return knex("admin")
					.where("admin_id", admin_id)
					.update({ email: data.email })
					.then(response =>
						successResponse(
							parseInt(admin_id),
							`Success Update Admin Email (admin_id: ${admin_id})`,
							200
						)
					)
					.catch(err => errorResponse(err, 500))
			}
		})
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
