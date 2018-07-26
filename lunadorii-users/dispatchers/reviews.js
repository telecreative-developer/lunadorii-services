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

exports.addUserReview = data => {
	return knex("product_reviews")
		.insert(data)
		.then(response => successResponse(response, "Success Add User Review", 200))
		.catch(err => errorResponse(err, 500))
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
		.then(res => successResponse(res, "Success Get User Reviews", 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUserReview = (product_review_id, data) => {
	return knex("product_reviews")
		.where("product_review_id", product_review_id)
		.update({
			...data,
			updated_at: moment()
				.tz("Asia/Jakarta")
				.format()
		})
		.then(response =>
			successResponse(response, "Success Update User Review", 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.deleteUserReview = product_review_id => {
	return knex("product_reviews")
		.where("product_review_id", product_review_id)
		.delete()
		.then(response =>
			successResponse(response, "Success Delete User Review", 200)
		)
		.catch(err => errorResponse(err, 500))
}
