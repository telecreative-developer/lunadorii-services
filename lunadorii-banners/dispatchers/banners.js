require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const productsDefinition = require("../definitions/products")
const envDefaultAvatar = process.env.AWS_IMAGE_DEFAULT_URL

const validationAvatar = data => {
	return data.map(res => ({
		...res,
		product_reviews_avatar_url: res.product_reviews_avatar_url
			? res.product_reviews_avatar_url
			: envDefaultAvatar
	}))
}

const productRate = data => {
	return data.map(res => ({
		...res,
		product_rate: res.reviews.length
			? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
			  res.reviews.length
			: 0
	}))
}

const productWishlist = (data, id) => {
	return knex("wishlist")
		.where("id", id)
		.then(res => {
			return data.map(rproduct => ({
				...rproduct,
				wishlisted: !!res.filter(
					rwishlist => rwishlist.product_id === rproduct.product_id
				).length
			}))
		})
}

const knexProductBanners = banner_id => {
	return knex("product_banners")
		.where("product_banners.banner_id", banner_id)
		.innerJoin("products", "product_banners.product_id", "products.product_id")
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
			"product_banners.product_banner_id as product_banner_id",
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

exports.addBanner = data => {
	const checkFieldAsync = item => {
		return new Promise((resolve, reject) => {
			item.title && item.thumbnail_url && item.type && item.category
				? resolve(item)
				: reject(errorResponse("Fields cannot be null", 500))
		})
	}

	const insertBanner = item => {
		return knex("banners")
			.insert({
				title: item.title,
				thumbnail_url: item.thumbnail_url,
				type: item.type,
				category: item.category,
				active: true
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(data)
		.then(res => insertBanner(res))
		.then(res => successResponse(null, "Success Add Banners", 201))
		.catch(err => err)
}

exports.getBannersAdmin = () => {
	return knex("banners")
		.then(res => successResponse(res, "Success Get Banners", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getBanners = () => {
	return knex("banners")
		.where("banners.category", "general")
		.andWhere("banners.active", true)
		.then(res => successResponse(res, "Success Get Banners", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.activeBanner = banner_id => {
	return knex("banners")
		.where("banner_id", banner_id)
		.update({ active: true })
		.then(res => successResponse(res, "Success Active Banner", 201))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.updateBanner = (banner_id, data) => {
	return knex("banners")
		.where("banner_id", banner_id)
		.update(data)
		.then(res => successResponse(res, "Success Update Banner", 201))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.removeBanner = banner_id => {
	return knex("banners")
		.where("banner_id", banner_id)
		.del()
		.then(res => successResponse(res, "Success Delete Banner", 201))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.unactiveBanner = banner_id => {
	return knex("banners")
		.where("banner_id", banner_id)
		.update({ active: false })
		.then(res => successResponse(res, "Success Unactive Banner", 201))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getBannersBestSeller = () => {
	return knex("banners")
		.where("banners.category", "best-seller")
		.andWhere("banners.active", true)
		.then(res => successResponse(res, "Success Get Banners Best Seller", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getProductBanners = banner_id => {
	return knexProductBanners(banner_id)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => productRate(res))
		.then(res => successResponse(res, "Success Get Products from Banner", 200))
		.catch(err => err)
}

exports.getProductBannersLogged = (banner_id, id) => {
	return knexProductBanners(banner_id)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => productWishlist(res, id))
		.then(res => productRate(res))
		.then(res =>
			successResponse(res, "Success Get Products from Banner Logged", 200)
		)
		.catch(err => err)
}
