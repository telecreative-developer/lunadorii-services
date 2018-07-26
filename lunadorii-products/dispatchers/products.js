require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const {
	productsDefinition,
	productBrandsDefinition,
	productCategoriesDefinition,
	productSubcategoriesDefinition,
	productsBestSellerDefinition
} = require("../definitions/products")
const {
	topBrandsDefinition,
	topBrandsWithProductsDefinition
} = require("../definitions/brands")

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

const knexProductsAsync = () => {
	return knex("products")
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
		.orderBy("products.created_at", "desc")
		.then(res => res)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const knexSingleProductAsync = (id, where_clause) => {
	return knex("products")
		.where(where_clause, id)
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
			"product_subcategories.thumbnail_url as product_subcategory_thumbnail_url",
			"product_brands.product_brand_id as product_brand_id",
			"product_thumbnails.product_thumbnail_id as product_thumbnail_id",
			"product_reviews.product_review_id as product_review_id",
			"product_reviews.created_at as product_reviews_created_at",
			"product_reviews.updated_at as product_reviews_updated_at"
		)
		.orderBy("products.created_at", "desc")
		.then(res => res)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const knexProductsBestSellerAsync = () => {
	return knex("order_products")
		.innerJoin("products", "order_products.product_id", "products.product_id")
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
			"order_products.order_product_id as order_product_id",
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

exports.getAllProducts = () => {
	return knexProductsAsync()
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res => successResponse(res, "Success Get Products", 200))
		.catch(err => err)
}

exports.getAllProductsLogged = id => {
	return knexProductsAsync()
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res => successResponse(res, "Success Get Products Logged", 200))
		.catch(err => err)
}

exports.getAllNewArrivalsProducts = () => {
	return knexProductsAsync()
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res => successResponse(res, "Success Get Products New Arrivals", 200))
		.catch(err => err)
}

exports.getAllNewArrivalsProductsLogged = id => {
	return knexProductsAsync()
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res =>
			successResponse(res, "Success Get Products New Arrivals Logged", 200)
		)
		.catch(err => err)
}

exports.getBestSellerProducts = () => {
	return knexProductsBestSellerAsync()
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(res => NestHydrationJS.nest(res, productsBestSellerDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_sold: response.filter(rf => rf.product_id === res.product_id)
					.length,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response => removeDuplicates(response, "product_id"))
		.then(response =>
			response.sort((a, b) => a.product_sold - b.product_sold).reverse()
		)
		.then(response =>
			successResponse(response, "Success Get Products Best Seller", 200)
		)
		.catch(err => err)
}

exports.getBestSellerProductsLogged = id => {
	return knexProductsBestSellerAsync()
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(res => NestHydrationJS.nest(res, productsBestSellerDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_sold: response.filter(rf => rf.product_id === res.product_id)
					.length,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response => removeDuplicates(response, "product_id"))
		.then(res => res.sort((a, b) => a.product_sold - b.product_sold).reverse())
		.then(res => successResponse(res, "Success Get Products Best Seller", 200))
		.catch(err => err)
}

exports.getSingleProduct = product_id => {
	return knexSingleProductAsync(product_id, "products.product_id")
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) =>
						parseInt(a.product_thumbnail_id) - parseInt(b.product_thumbnail_id)
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response =>
			successResponse(response, "Success Get Single Product", 200)
		)
		.catch(err => err)
}

exports.getSingleProductLogged = (product_id, id) => {
	return knexSingleProductAsync(product_id, "products.product_id")
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response =>
			successResponse(response, "Success Get Single Product Logged", 200)
		)
		.catch(err => err)
}

exports.getRelatedProducts = product_id => {
	return knex("products")
		.where("products.product_id", product_id)
		.then(res => {
			return knexSingleProductAsync(
				res[0].product_subcategory_id,
				"products.product_subcategory_id"
			)
		})
		.then(response =>
			response.splice(0, 10).map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res => successResponse(res, "Success Get Related Products", 200))
		.catch(err => err)
}

exports.getRelatedProductsLogged = (product_id, id) => {
	return knex("products")
		.where("products.product_id", product_id)
		.then(res => {
			return knexSingleProductAsync(
				res[0].product_subcategory_id,
				"products.product_subcategory_id"
			)
		})
		.then(response =>
			response.splice(0, 10).map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res =>
			successResponse(res, "Success Get Related Products Logged", 200)
		)
		.catch(err => err)
}

exports.getSingleProductWithSlug = product_slug => {
	return knexSingleProductAsync(product_slug, "products.product_slug")
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response =>
			successResponse(response, "Success Get Single Product", 200)
		)
		.catch(err => err)
}

exports.getSingleProductWithSlugLogged = (product_slug, id) => {
	return knexSingleProductAsync(product_slug, "products.product_slug")
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response =>
			successResponse(response, "Success Get Single Logged Product", 200)
		)
		.catch(err => err)
}

exports.getProductsWithSubcategory = product_subcategory_id => {
	return knexSingleProductAsync(
		product_subcategory_id,
		"products.product_subcategory_id"
	)
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response =>
			successResponse(response, "Success Get Product With Subcategory", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductsWithSubcategoryLogged = (product_subcategory_id, id) => {
	return knexSingleProductAsync(
		product_subcategory_id,
		"products.product_subcategory_id"
	)
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res =>
			successResponse(res, "Success Get Product With Subcategory", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductsWithBrand = product_brand_id => {
	return knexSingleProductAsync(product_brand_id, "products.product_brand_id")
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(response =>
			successResponse(response, "Success Get Product With Brand", 200)
		)
		.catch(err => err)
}

exports.getProductsWithBrandLogged = (product_brand_id, id) => {
	return knexSingleProductAsync(product_brand_id, "products.product_brand_id")
		.then(response =>
			response.map(res => ({
				...res,
				product_reviews_avatar_url: res.product_reviews_avatar_url
					? res.product_reviews_avatar_url
					: process.env.AWS_IMAGE_DEFAULT_URL
			}))
		)
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				thumbnails: res.thumbnails.sort(
					(a, b) => a.product_thumbnail_id - b.product_thumbnail_id
				)
			}))
		)
		.then(response =>
			knex("wishlist")
				.where("id", id)
				.then(res =>
					response.map(rproduct => ({
						...rproduct,
						wishlisted: !!res.filter(
							rwishlist => rwishlist.product_id === rproduct.product_id
						).length
					}))
				)
		)
		.then(response =>
			response.map(res => ({
				...res,
				product_rate: res.reviews.length
					? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
					  res.reviews.length
					: 0
			}))
		)
		.then(res => successResponse(res, "Success Get Product With Brand", 200))
		.catch(err => err)
}

exports.getProductBrands = () => {
	return knex("product_brands")
		.then(res => successResponse(res, "Success Get Product Brands", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getTopProductBrands = () => {
	return knex("order_products")
		.innerJoin("products", "order_products.product_id", "products.product_id")
		.innerJoin(
			"product_brands",
			"products.product_brand_id",
			"product_brands.product_brand_id"
		)
		.limit(5)
		.then(response => NestHydrationJS.nest(response, topBrandsDefinition))
		.then(response =>
			successResponse(response, "Success Get Top Product Brands", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getTopProductBrandsWithProducts = () => {
	return knex("order_products")
		.innerJoin("products", "order_products.product_id", "products.product_id")
		.innerJoin(
			"product_brands",
			"products.product_brand_id",
			"product_brands.product_brand_id"
		)
		.orderBy("order_products.created_at", "desc")
		.limit(5)
		.then(response =>
			NestHydrationJS.nest(response, topBrandsWithProductsDefinition)
		)
		.then(response =>
			successResponse(response, "Success Get Top Product Brands", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductBrandsWithProducts = () => {
	return knex("product_brands")
		.innerJoin(
			"products",
			"products.product_brand_id",
			"product_brands.product_brand_id"
		)
		.then(response => NestHydrationJS.nest(response, productBrandsDefinition))
		.then(response =>
			successResponse(response, "Success Get Product Brands with Products", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductCategories = () => {
	return knex("product_categories")
		.then(response =>
			successResponse(response, "Success Get Product Categories", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductCategoriesWithSubcategories = () => {
	return knex("product_categories")
		.innerJoin(
			"product_subcategories",
			"product_categories.product_category_id",
			"product_subcategories.product_category_id"
		)
		.then(response =>
			NestHydrationJS.nest(response, productCategoriesDefinition)
		)
		.then(response =>
			successResponse(
				response,
				"Success Get Product Categories with Subcategories",
				200
			)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getBestSellerSubcategories = () => {
	return knex("order_products")
		.innerJoin("products", "order_products.product_id", "products.product_id")
		.innerJoin(
			"product_subcategories",
			"products.product_subcategory_id",
			"product_subcategories.product_subcategory_id"
		)
		.select(
			"*",
			"order_products.order_product_id as order_product_id",
			"product_subcategories.product_subcategory_id as product_subcategory_id",
			"product_subcategories.subcategory as subcategory",
			"product_subcategories.thumbnail_url as subcategory_thumbnail_url"
		)
		.then(response =>
			NestHydrationJS.nest(response, [
				{
					product_subcategory_id: {
						column: "product_subcategory_id",
						id: true
					},
					subcategory: { column: "subcategory" },
					thumbnails_url: { column: "subcategory_thumbnail_url" },
					products: [
						{
							product_id: { column: "product_id", id: true },
							product: { column: "product" },
							description: { column: "description" },
							detail: { column: "detail" },
							to_use: { column: "to_use" },
							price: { column: "price" },
							discount: { column: "discount" },
							discount_percentage: { column: "discount_percentage" }
						}
					]
				}
			])
		)
		.then(res =>
			successResponse(res, "Success Get Subcategories Best Seller", 200)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getProductSubcategories = () => {
	return knex("product_subcategories")
		.then(response =>
			successResponse(response, "Success Get Product Subcategories", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductSubcategoriesWithProducts = () => {
	return knex("product_subcategories")
		.innerJoin(
			"products",
			"product_subcategories.product_subcategory_id",
			"products.product_subcategory_id"
		)
		.then(res => NestHydrationJS.nest(res, productSubcategoriesDefinition))
		.then(res =>
			successResponse(
				res,
				"Success Get Product Subcategories with Products",
				200
			)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateProduct = (product_id, data) => {
	return knex("products")
		.where("product_id", product_id)
		.update(data)
		.then(response => successResponse(response, "Success Update Product", 200))
		.catch(err => errorResponse(err, 500))
}

exports.deleteProduct = product_id => {
	return knex("products")
		.where("product_id", product_id)
		.del()
		.then(response => successResponse(response, "Success Delete Product", 200))
		.catch(err => errorResponse(err, 500))
}
