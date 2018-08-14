require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const moment = require("moment")
const knex = require("knex")(configuration)
const { successResponseWithData, errorResponse } = require("../responsers")

function removeDuplicates(arr, key) {
	if (!(arr instanceof Array) || (key && typeof key !== "string")) {
		return false
	}

	if (key && typeof key === "string") {
		return arr.filter((obj, index, arr) => {
			return arr.map(mapObj => mapObj[key]).indexOf(obj[key]) === index
		})
	} else {
		return arr.filter(function(item, index, arr) {
			return arr.indexOf(item) == index
		})
	}
}

exports.getDashboardInfo = () => {
	const getUsersInfo = () => {
		return knex("users")
			.then(res => ({
				users_length: res.length,
				users_register_today_length: res.filter(
					res =>
						moment(res.created_at).format("YYYY-MM-DD") ===
						moment().format("YYYY-MM-DD")
				).length
			}))
			.catch(err => errorResponse(err, 500))
	}

	const getProducts = () => {
		return knex("products")
			.then(res => getWishlist(res.length))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const getWishlist = products_length => {
		return knex("wishlist")
			.then(res => removeDuplicates(res, "product_id"))
			.then(res => ({
				products_length,
				products_wishlisted_length: res.length
			}))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const getOrders = () => {
		return knex("orders")
			.then(res => ({
				orders_length: res.length,
				orders_checkout_length: res.filter(
					res => res.order_status === "checkout"
				).length
			}))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const getReports = () => {
		return knex("reports")
			.then(res => ({
				reports_length: res.length,
				reports_not_read_length: res.filter(res => res.read === false).length
			}))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const getBanners = () => {
		return knex("banners")
			.then(res => ({
				banners_length: res.length,
				banners_active_length: res.filter(res => res.active === true).length
			}))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return Promise.all([
		getUsersInfo(),
		getProducts(),
		getOrders(),
		getReports(),
		getBanners()
	]).then(res =>
		successResponseWithData(
			{
				users: res[0],
				products: res[1],
				orders: res[2],
				reports: res[3],
				banners: res[4]
			},
			"Success Get Dashboard Info",
			200
		)
	)
}
