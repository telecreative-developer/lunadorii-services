require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const momentTimezone = require("moment-timezone")
const NestHydrationJS = require("nesthydrationjs")()
const moment = require("moment-timezone")
const {
	successResponseWithData,
	successResponseWithoutData,
	errorResponse
} = require("../responsers")
const reviewsDefinition = require("../definitions/reviews")

exports.addUserReview = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const checkFieldAsync = item => {
		return new Promise((resolve, reject) => {
			item.rate &&
			item.comment &&
			item.product_id &&
			item.order_product_id &&
			item.id
				? resolve(item)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const insertUser = item => {
		return knex("product_reviews")
			.insert({
				rate: item.rate,
				comment: item.comment,
				product_id: item.product_id,
				order_product_id: item.order_product_id,
				id: item.id,
				created_at: now,
				updated_at: now
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(data)
		.then(() => insertUser(data))
		.then(() => successResponseWithoutData("Success Add User Review", 201))
		.catch(err => err)
}

exports.getUserReviews = id => {
	return knex("product_reviews")
		.where("product_reviews.id", id)
		.innerJoin("products", "product_reviews.product_id", "products.product_id")
		.innerJoin(
			"product_thumbnails",
			"products.product_id",
			"product_thumbnails.product_id"
		)
		.innerJoin(
			"product_brands",
			"products.product_id",
			"product_brands.product_brand_id"
		)
		.select(
			"*",
			"product_reviews.created_at as product_review_created_at",
			"product_reviews.updated_at as product_review_updated_at"
		)
		.then(res => NestHydrationJS.nest(res, reviewsDefinition))
		.then(res => successResponseWithData(res, "Success Get User Reviews", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.updateUserReview = (product_review_id, data) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()
	return knex("product_reviews")
		.where("product_review_id", product_review_id)
		.update({
			rate: data.rate,
			comment: data.comment,
			updated_at: now
		})
		.then(() => successResponseWithoutData("Success Update User Review", 201))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.deleteUserReview = product_review_id => {
	return knex("product_reviews")
		.where("product_review_id", product_review_id)
		.del()
		.then(() => successResponseWithoutData("Success Delete User Review", 200))
		.catch(err => errorResponse(err, 500))
}
