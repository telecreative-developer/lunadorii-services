require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const { successResponse, errorResponse } = require("../responsers")

exports.getBanks = () => {
	return knex("banks")
		.then(res => successResponse(res, "Success Get Banks", 200))
		.catch(err => errorResponse(err, 500))
}
