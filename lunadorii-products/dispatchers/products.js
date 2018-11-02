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
const {
	productsDefinition,
	productBrandsDefinition,
	productCategoriesDefinition,
	productSubcategoriesDefinition,
	productsBestSellerDefinition
} = require("../definitions/products")
const momentTimezone = require("moment-timezone")
const createSlug = require("sluger")
const {
	topBrandsDefinition,
	topBrandsWithProductsDefinition
} = require("../definitions/brands")
const envDefaultAvatar = process.env.AWS_IMAGE_DEFAULT_URL

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

const validationAvatar = data => {
	return data.map(res => ({
		...res,
		avatar_url: res.avatar_url ? res.avatar_url : envDefaultAvatar
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

const productRateAsync = data => {
	return data.map(res => ({
		...res,
		product_rate: res.reviews.length
			? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
			  res.reviews.length
			: 0
	}))
}

const checkWishlistAsync = (id, data) => {
	return knex("wishlist")
		.where("id", id)
		.then(res =>
			data.map(rproduct => ({
				...rproduct,
				wishlisted: !!res.filter(
					rwishlist => rwishlist.product_id === rproduct.product_id
				).length
			}))
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const productSoldAndRate = data => {
	return data.map(res => ({
		...res,
		product_sold: data.filter(rf => rf.product_id === res.product_id).length,
		product_rate: res.reviews.length
			? res.reviews.map(r => r.review_rate).reduce((a, b) => a + b) /
			  res.reviews.length
			: 0
	}))
}

const knexProductsAsync = () => {
	return knex("products")
		.where('available', true)
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
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"product_reviews.product_review_id as product_review_id",
			"product_reviews.created_at as product_reviews_created_at",
			"product_reviews.updated_at as product_reviews_updated_at"
		)
		.orderBy("products.created_at", "desc")
		.then(res => res)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const knexProductsDiscAsync = () => {
	return knex("products")
		.where('available', true)
		.where('discount', true)
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
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
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
		.where("available", true)
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
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"product_reviews.product_review_id as product_review_id",
			"product_reviews.created_at as product_reviews_created_at",
			"product_reviews.updated_at as product_reviews_updated_at"
		)
		.where('products.available', true)
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
			"product_thumbnails.thumbnail_url as product_thumbnail_url",
			"product_reviews.product_review_id as product_review_id",
			"product_reviews.created_at as product_reviews_created_at",
			"product_reviews.updated_at as product_reviews_updated_at"
		)
		.where('products.available', true)
		.then(res => res)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getAllProducts = () => {
	return knexProductsAsync()
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res => successResponseWithData(res, "Success Get Products", 200))
		.catch(err => err)
}

exports.getAllProductsDiscount = () => {
	return knexProductsDiscAsync()
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res => successResponseWithData(res, "Success Get Products", 200))
		.catch(err => err)
}

exports.getAllProductsLogged = id => {
	return knexProductsAsync()
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Products Logged", 200)
		)
		.catch(err => err)
}

exports.getAllNewArrivalsProducts = () => {
	return knexProductsAsync()
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Products New Arrivals", 200)
		)
		.catch(err => err)
}

exports.getAllNewArrivalsProductsLogged = id => {
	return knexProductsAsync()
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(
				res,
				"Success Get Products New Arrivals Logged",
				200
			)
		)
		.catch(err => err)
}

exports.getBestSellerProducts = () => {
	return knexProductsBestSellerAsync()
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsBestSellerDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productSoldAndRate(res))
		.then(res => removeDuplicates(res, "product_id"))
		.then(res => res.sort((a, b) => a.product_sold - b.product_sold).reverse())
		.then(res =>
			successResponseWithData(res, "Success Get Products Best Seller", 200)
		)
		.catch(err => err)
}

exports.getBestSellerProductsLogged = id => {
	return knexProductsBestSellerAsync()
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsBestSellerDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productSoldAndRate(res))
		.then(res => removeDuplicates(res, "product_id"))
		.then(res => res.sort((a, b) => a.product_sold - b.product_sold).reverse())
		.then(res =>
			successResponseWithData(res, "Success Get Products Best Seller", 200)
		)
		.catch(err => err)
}

exports.getSingleProduct = product_id => {
	return knexSingleProductAsync(product_id, "products.product_id")
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Single Product", 200)
		)
		.catch(err => err)
}

exports.getSingleProductLogged = (product_id, id) => {
	return knexSingleProductAsync(product_id, "products.product_id")
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Single Product Logged", 200)
		)
		.catch(err => err)
}

exports.getRelatedProducts = product_id => {
	return knex("products")
		.where({"product_id": product_id, "available": true})
		.then(res =>
			knexSingleProductAsync(
				res[0].product_subcategory_id,
				"products.product_subcategory_id"
			)
		)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Related Products", 200)
		)
		.catch(err => err)
}

exports.getRelatedProductsLogged = (product_id, id) => {
	return knex("products")
		.where({"product_id": product_id, "available": true})
		.then(res =>
			knexSingleProductAsync(
				res[0].product_subcategory_id,
				"products.product_subcategory_id"
			)
		)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Related Products Logged", 200)
		)
		.catch(err => err)
}

exports.getSingleProductWithSlug = product_slug => {
	return knexSingleProductAsync(product_slug, "products.product_slug")
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Single Product", 200)
		)
		.catch(err => err)
}

exports.getSingleProductWithSlugLogged = (product_slug, id) => {
	return knexSingleProductAsync(product_slug, "products.product_slug")
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Single Logged Product", 200)
		)
		.catch(err => err)
}

exports.getProductsWithSubcategory = product_subcategory_id => {
	return knexSingleProductAsync(
		product_subcategory_id,
		"products.product_subcategory_id"
	)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Product With Subcategory", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductsWithSubcategoryLogged = (product_subcategory_id, id) => {
	return knexSingleProductAsync(
		product_subcategory_id,
		"products.product_subcategory_id"
	)
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Product With Subcategory", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductsWithBrand = product_brand_id => {
	return knexSingleProductAsync(product_brand_id, "products.product_brand_id")
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Product With Brand", 200)
		)
		.catch(err => err)
}

exports.getProductsWithBrandLogged = (product_brand_id, id) => {
	return knexSingleProductAsync(product_brand_id, "products.product_brand_id")
		.then(res => validationAvatar(res))
		.then(res => NestHydrationJS.nest(res, productsDefinition))
		.then(res => sortProductThumbnails(res))
		.then(res => checkWishlistAsync(id, res))
		.then(res => productRateAsync(res))
		.then(res =>
			successResponseWithData(res, "Success Get Product With Brand", 200)
		)
		.catch(err => err)
}

exports.getProductBrands = () => {
	return knex("product_brands")
		.then(res =>
			successResponseWithData(res, "Success Get Product Brands", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.postProductBrands = (body) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex('product_brands')
		.insert({
			brand: body.brand,
			logo_url: body.logo_url,
			created_at: now,
			updated_at: now
		})
		.returning("product_brand_id")
		.then(product_brand_id =>
			successResponseWithData({ product_brand_id }, "Success add new brand", 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateProductBrands = (body, product_brand_id) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex('product_brands')
		.where("product_brand_id", product_brand_id)
		.update({
			brand: body.brand,
			logo_url: body.logo_url,
			updated_at: now
		})
		.returning("product_brand_id")
		.then(product_brand_id =>
			successResponseWithData({ product_brand_id }, "Success update brand", 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.deleteProductBrands = (product_brand_id) => {
	return knex('product_brands')
		.where("product_brand_id", product_brand_id)
		.del()
		.returning("product_brand_id")
		.then(product_brand_id =>
			successResponseWithData({ product_brand_id }, "Success delete brand", 200)
		)
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
		.then(res => NestHydrationJS.nest(res, topBrandsDefinition))
		.then(res =>
			successResponseWithData(res, "Success Get Top Product Brands", 200)
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
		.then(res => NestHydrationJS.nest(res, topBrandsWithProductsDefinition))
		.then(res =>
			successResponseWithData(res, "Success Get Top Product Brands", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductBrandsWithProducts = () => {
	return knex("product_brands")
		.innerJoin(
			"products",
			"product_brands.product_brand_id",
			"products.product_brand_id"
		)
		.then(res => NestHydrationJS.nest(res, productBrandsDefinition))
		.then(res =>
			successResponseWithData(
				res,
				"Success Get Product Brands with Products",
				200
			)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductCategories = () => {
	return knex("product_categories")
		.then(res =>
			successResponseWithData(res, "Success Get Product Categories", 200)
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
		.then(res => NestHydrationJS.nest(res, productCategoriesDefinition))
		.then(res =>
			successResponseWithData(
				res,
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
		.where('products.available', true)
		.then(res =>
			NestHydrationJS.nest(res, [
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
			successResponseWithData(res, "Success Get Subcategories Best Seller", 200)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.addProductSubcategories = (body) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex('product_subcategories')
		.insert({
			subcategory: body.subcategory,
			thumbnail_url: body.thumbnail_url,
			product_category_id: body.product_category_id,
			created_at: now,
			updated_at: now
		})
		.returning("product_subcategory_id")
		.then(product_subcategory_id =>
			successResponseWithData({ product_subcategory_id }, "Success add subcategory", 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.deleteProductSubcategories = (product_subcategory_id) => {
	return knex('product_subcategories')
		.where("product_subcategory_id",product_subcategory_id)
		.del()
		.returning("product_subcategory_id")
		.then(product_subcategory_id =>
			successResponseWithData({ product_subcategory_id }, "Success delete subcategory", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.updateProductSubcategories = (product_subcategory_id, body) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex('product_subcategories')
		.where('product_subcategory_id', product_subcategory_id)
		.update({
			subcategory: body.subcategory,
			thumbnail_url: body.thumbnail_url,
			product_category_id: body.product_category_id,
			updated_at: now
		})
		.returning("product_subcategory_id")
		.then(product_subcategory_id =>
			successResponseWithData({ product_subcategory_id }, "Success update subcategory", 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getProductSubcategories = () => {
	return knex("product_subcategories")
		.then(res =>
			successResponseWithData(res, "Success Get Product Subcategories", 200)
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
			successResponseWithData(
				res,
				"Success Get Product Subcategories with Products",
				200
			)
		)
		.catch(err => errorResponse(err, 500))
}

exports.addProduct = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("products")
		.insert({
			product: data.product,
			product_slug: createSlug(data.product),
			description: data.description,
			detail: data.detail,
			to_use: data.to_use,
			price: data.price,
			discount: data.discount,
			discount_percentage: data.discount_percentage,
			weight_gram: data.weight_gram,
			product_subcategory_id: data.product_subcategory_id,
			product_brand_id: data.product_brand_id,
			created_at: now,
			updated_at: now
		})
		.returning("product_id")
		.then(product_id =>
			successResponseWithData({ product_id }, "Success Add Product", 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.addProductThumbnails = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("product_thumbnails")
		.insert({
			thumbnail_url: data.thumbnail_url,
			product_id: data.product_id,
			created_at: now,
			updated_at: now
		})
		.then(() =>
			successResponseWithoutData("Success Add Product Thumbnails", 201)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.removeProductThumbnail = product_thumbnail_id => {
	return knex("product_thumbnails")
		.where("product_thumbnail_id", product_thumbnail_id)
		.del()
		.then(() =>
			successResponseWithoutData("Success Remove Product Thumbnail", 201)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.updateProduct = (product_id, data) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	return knex("products")
		.where("product_id", product_id)
		.update({ ...data, updated_at: now })
		.returning("product_id")
		.then(product_id =>
			successResponseWithData({ product_id }, "Success Update Product", 201)
		)
		.catch(err => errorResponse(err, 500))
}

exports.deleteProduct = product_id => {

	// const deleteOrderProductsAsync = (product_id) => {
	// 	return knex('order_products')
	// 		.where("product_id", product_id)
	// 		.del()
	// }

	// const deleteThumbnailsAsync = product_id => {
	// 	return knex("product_thumbnails")
	// 		.where("product_id", product_id)
	// 		.del()
	// }
	
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const deleteProductAsync = product_id => {
		return knex("products")
			.where({"product_id": product_id, "available": true})
			.update({
				available: false,
				updated_at: now
			})
	}

	const verify = (product_id) => {
		return new Promise((resolve, reject) => {
			typeof product_id == 'string' && product_id != 0
			?
				resolve(product_id)
			:
				reject(errorResponse('Invalid id', 409))
		})
	}

	return(
		verify(product_id)
			// .then(() => deleteOrderProductsAsync(product_id))
			// .then(() => deleteThumbnailsAsync(product_id))
			.then(() => deleteProductAsync(product_id))
			.then(() => successResponseWithoutData("Succesfully delete product", 200))
			.catch(error => error)
	)

}
