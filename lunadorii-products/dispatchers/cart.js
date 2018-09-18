require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const {
	successResponseWithData,
	successResponseWithoutData,
	errorResponse
} = require("../responsers")
const momentTimezone = require("moment-timezone")
const cartDefinition = require("../definitions/cart")
const envDefaultAvatar = process.env.AWS_IMAGE_DEFAULT_URL

const updateQtyAsync = (item, res) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("cart")
		.where("id", item.id)
		.andWhere("product_id", item.product_id)
		.update({ qty: res[0].qty + item.qty, updated_at: now })
		.then(() => successResponseWithoutData("Success Add Cart", 201))
		.catch(err => errorResponse("Internal Server Error", 500))
}

const insertCart = item => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("cart")
		.insert({
			product_id: item.product_id,
			id: item.id,
			qty: item.qty,
			created_at: now,
			updated_at: now
		})
		.then(() => successResponseWithoutData("Success Add Cart", 201))
		.catch(err => errorResponse("Internal Server Error", 500))
}

const validationAvatar = data => {
	return data.map(res => ({
		...res,
		avatar_url: res.avatar_url ? res.avatar_url : envDefaultAvatar
	}))
}

const subtotalAndProductRate = data => {
	return data.map(res => ({
		...res,
		subtotal:
			res.price * res.qty -
			res.price * res.qty * (res.discount_percentage / 100),
		product_rate: res.reviews.length
			? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
			  res.reviews.length
			: 0
	}))
}

const sortProductThumbnails = data => {
	return data.map(res => ({
		...res,
		thumbnails: res.thumbnails.sort(
			(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
		)
	}))
}

exports.addCart = data => {
	return knex("cart")
		.where("id", data.id)
		.andWhere("product_id", data.product_id)
		.then(res => (res.length ? updateQtyAsync(data, res) : insertCart(data)))
		.catch(err => errorResponse(err, 500))
}

exports.getCart = id => {
	return knex("cart")
		.where("cart.id", id)
		.innerJoin("users", "cart.id", "users.id")
		.innerJoin("products", "cart.product_id", "products.product_id")
		.innerJoin(
			"product_subcategories",
			"products.product_subcategory_id",
			"product_subcategories.product_subcategory_id"
		)
		.innerJoin(
			"product_brands",
			"products.product_brand_id",
			"product_brands.product_brand_id"
		)
		.innerJoin(
			"product_thumbnails",
			"products.product_id",
			"product_thumbnails.product_id"
		)
		.leftJoin(
			"product_reviews",
			"products.product_id",
			"product_reviews.product_id"
		)
		.leftJoin(
			"users as product_reviews_users",
			"product_reviews.id",
			"product_reviews_users.id"
		)
		.select(
			"*",
			"cart.cart_id as cart_id",
			"products.product_id as product_id",
			"product_reviews_users.id as product_reviews_user_id",
			"product_reviews_users.avatar_url as product_reviews_avatar_url",
			"product_reviews_users.first_name as product_reviews_first_name",
			"product_reviews_users.last_name as product_reviews_last_name",
			"product_reviews.created_at as product_reviews_created_at",
			"product_reviews.updated_at as product_reviews_updated_at"
		)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, cartDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => subtotalAndProductRate(res))
		.then(res => successResponseWithData(res, "Success Get Cart", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.updateCartQty = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	if (data.cart_id) {
		return knex("cart")
			.where("cart_id", data.cart_id)
			.update({
				qty: data.qty,
				updated_at: now
			})
			.then(() => successResponseWithoutData("Success Update Qty Cart", 200))
			.catch(err => errorResponse(err, 500))
	} else {
		return knex("cart")
			.where("product_id", data.product_id)
			.andWhere("id", data.id)
			.update({
				qty: data.qty,
				updated_at: now
			})
			.then(() => successResponseWithoutData("Success Update Qty Cart", 200))
			.catch(err => errorResponse(err, 500))
	}
}

exports.removeCart = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	if (data.cart_id) {
		return knex("cart")
			.where("cart_id", data.cart_id)
			.del()
			.then(() => successResponseWithoutData("Success Remove Cart", 200))
			.catch(err => errorResponse(err, 500))
	} else {
		return knex("cart")
			.where("product_id", data.product_id)
			.andWhere("id", data.id)
			.del()
			.then(() => successResponseWithoutData("Success Remove Cart", 200))
			.catch(err => errorResponse(err, 500))
	}
}
