require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const { successResponse, errorResponse } = require("../responsers")

exports.getDashboardInfo = () => {
	const getUsersInfo = () => {
		return knex("users")
			.then(res => ({
				users_length: res.length,
				users_register_today_length: res.filter(
					res => moment(res.created_at).format("LL") === moment().format("LL")
				).length
			}))
			.catch(err => errorResponse(err, 500))
	}

	const getProducts = () => {
		return knex("products")
			.then(res => res)
			.catch(err => errorResponse(err, 500))
	}

	return Promise.all([getUsersInfo]).then(res =>
		successResponse({ users: res[0] }, "Success Get Banners", 200)
	)
}
