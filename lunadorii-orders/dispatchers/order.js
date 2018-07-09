require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")

exports.checkoutOrder = data => {
	return knex("orders")
		.insert({
			...data,
			order_code: `LD${toUppercase(
				Math.random()
					.toString(36)
					.substr(2, 15)
					.toUpperCase()
			)}`
		})
		.returning("order_id")
		.then(response => NestHydrationJS.nest(response, adminDefinition))
		.catch(err => errorResponse(err, 500))
}
