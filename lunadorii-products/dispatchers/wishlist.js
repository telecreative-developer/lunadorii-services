require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const {
	successResponseWithoutData,
	successResponseWithData,
	errorResponse
} = require("../responsers")
const momentTimezone = require("moment-timezone")
const wishlistDefinition = require("../definitions/wishlist")
const envDefaultAvatar = process.env.AWS_IMAGE_DEFAULT_URL

const validationAvatar = data => {
	return data.map(res => ({
		...res,
		avatar_url: res.avatar_url ? res.avatar_url : envDefaultAvatar
	}))
}

const productRateAsync = data => {
	return data.map(res => ({
		...res,
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

exports.addWishlist = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("wishlist")
		.insert({
			product_id: data.product_id,
			id: data.id,
			created_at: now,
			updated_at: now
		})
		.then(() => successResponseWithoutData("Success Add Wishlist", 201))
		.catch(err => errorResponse(err, 500))
}

exports.getWishlist = id => {
	return knex("wishlist")
		.where("wishlist.id", id)
		.innerJoin("users", "wishlist.id", "users.id")
		.innerJoin("products", "wishlist.product_id", "products.product_id")
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
			"products.product_id as product_id",
			"product_reviews_users.id as product_reviews_user_id",
			"product_reviews_users.avatar_url as product_reviews_avatar_url",
			"product_reviews_users.first_name as product_reviews_first_name",
			"product_reviews_users.last_name as product_reviews_last_name",
			"product_reviews.created_at as product_reviews_created_at",
			"product_reviews.updated_at as product_reviews_updated_at"
		)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, wishlistDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res => successResponseWithData(res, "Success Get Wishlist", 200))
		.catch(err => err)
}

exports.removeWishlist = data => {
	if (data.wishlist_id) {
		return knex("wishlist")
			.where("wishlist_id", data.wishlist_id)
			.del()
			.then(() => successResponseWithoutData("Success Remove Wishlist", 200))
			.catch(err => errorResponse(err, 500))
	} else {
		return knex("wishlist")
			.where("product_id", data.product_id)
			.andWhere("id", data.id)
			.del()
			.then(() => successResponseWithoutData("Success Remove Wishlist", 200))
			.catch(err => errorResponse(err, 500))
	}
}
