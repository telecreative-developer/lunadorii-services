require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const searchDefinition = require("../definitions/search")
const envDefaultAvatar = process.env.AWS_IMAGE_DEFAULT_URL

const knexSearchEngine = attributes => {
	return knex("products")
		.whereRaw("LOWER(product) LIKE ?", `%${attributes.payload.toLowerCase()}%`)
		.whereRaw("LOWER()")
		.where(builder => {
			return (
				attributes.subcategories &&
				builder.whereIn(
					"products.product_subcategory_id",
					JSON.parse(attributes.subcategories)
				)
			)
		})
		.where(builder => {
			return (
				attributes.productBrand &&
				builder.where("products.product_brand_id", attributes.productBrand)
			)
		})
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
		.leftJoin("users", "product_reviews.id", "users.id")
		.select(
			"*",
			"products.product_id as product_id",
			"users.id as product_reviews_user_id",
			"users.avatar_url as product_reviews_avatar_url",
			"users.first_name as product_reviews_first_name",
			"users.last_name as product_reviews_last_name",
			"product_subcategories.product_subcategory_id as product_subcategory_id",
			"product_brands.product_brand_id as product_brand_id",
			"product_thumbnails.product_thumbnail_id as product_thumbnail_id",
			"product_reviews.product_review_id as product_review_id",
			"product_reviews.created_at as product_reviews_created_at",
			"product_reviews.updated_at as product_reviews_updated_at"
		)
		.then(res => res)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const validationAvatar = data => {
	return data.map(res => ({
		...res,
		product_reviews_avatar_url: res.product_reviews_avatar_url
			? res.product_reviews_avatar_url
			: envDefaultAvatar
	}))
}

const productRateAndDiscount = data => {
	return data.map(res => ({
		...res,
		price_discount: res.price - (res.price * res.discount_percentage) / 100,
		product_rate: res.reviews.length
			? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
			  res.reviews.length
			: 0
	}))
}

const filterPrice = (attributes, data) => {
	if (attributes.maxPrice && attributes.minPrice) {
		return data.filter(
			res =>
				res.price_discount <= attributes.maxPrice &&
				res.price_discount >= attributes.minPrice
		)
	}

	return data
}

const wishlist = (attributes, data) => {
	return knex("wishlist")
		.where("id", attributes.id)
		.then(res => {
			return data.map(rproduct => ({
				...rproduct,
				wishlisted: !!res.filter(
					rwishlist => rwishlist.product_id === rproduct.product_id
				).length
			}))
		})
		.then(res => res)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.search = attributes => {
	return knexSearchEngine(attributes)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, searchDefinition))
		.then(res => productRateAndDiscount(res))
		.then(res => filterPrice(attributes, res))
		.then(res => successResponse(res, `Keyword: ${attributes.payload}`, 200))
		.catch(err => err)
}

exports.searchLogged = attributes => {
	return knexSearchEngine(attributes)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, searchDefinition))
		.then(res => wishlist(attributes, res))
		.then(res => productRateAndDiscount(res))
		.then(res => filterPrice(attributes, res))
		.then(res => successResponse(res, `Keyword: ${attributes.payload}`, 200))
		.catch(err => err)
}
