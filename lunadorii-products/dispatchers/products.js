require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const { productsDefinition, productBrandsDefinition, productCategoriesDefinition, productSubcategoriesDefinition } = require('../definitions/products')

exports.getAllProducts = () => {
	return knex('products')
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Products', 200))
		.catch(err => console.log(err))
}

exports.getAllProductsLogged = (id) => {
	return knex('products')
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.innerJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.innerJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => knex('wishlist')
				.where('id', id)
				.then(res => response.map(rproduct => ({
					...rproduct,
					wishlisted: !!res.filter(rwishlist => rwishlist.product_id === rproduct.product_id).length}))))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Products Logged', 200))
		.catch(err => console.log(err))
}

exports.getSingleProduct = (product_id) => {
	return knex('products')
		.where('products.product_id', product_id)
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Single Product', 200))
		.catch(err => console.log(err))
}

exports.getSingleProductLogged = (product_id, id) => {
	return knex('products')
		.where('products.product_id', product_id)
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => knex('wishlist')
				.where('id', id)
				.then(res => response.map(rproduct => ({
					...rproduct,
					wishlisted: !!res.filter(rwishlist => rwishlist.product_id === rproduct.product_id).length}))))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Single Product Logged', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleProductWithSlug = (product_slug) => {
	return knex('products')
		.where('products.product_slug', product_slug)
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Single Product', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleProductWithSlugLogged = (product_slug, id) => {
	return knex('products')
		.where('products.product_slug', product_slug)
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => knex('wishlist')
				.where('id', id)
				.then(res => response.map(rproduct => ({
					...rproduct,
					wishlisted: !!res.filter(rwishlist => rwishlist.product_id === rproduct.product_id).length}))))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Single Product', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductsWithSubcategory = (product_subcategory_id) => {
	return knex('products')
		.where('products.product_subcategory_id', product_subcategory_id)
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Product With Subcategory', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductsWithSubcategoryLogged = (product_subcategory_id, id) => {
	return knex('products')
		.where('products.product_subcategory_id', product_subcategory_id)
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users', 'product_reviews.id', 'users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'users.id as product_reviews_user_id',
			'users.avatar_url as product_reviews_avatar_url',
			'users.first_name as product_reviews_first_name',
			'users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => knex('wishlist')
				.where('id', id)
				.then(res => response.map(rproduct => ({
					...rproduct,
					wishlisted: !!res.filter(rwishlist => rwishlist.product_id === rproduct.product_id).length}))))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Product With Subcategory', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductBrands = () => {
	return knex('product_brands')
		.then(response => successResponse(response, 'Success Get Product Brands', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductBrandsWithProducts = () => {
	return knex('product_brands')
		.innerJoin('products', 'products.product_brand_id', 'product_brands.product_brand_id')
		.then(response => NestHydrationJS.nest(response, productBrandsDefinition))
		.then(response => successResponse(response, 'Success Get Product Brands with Products', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductCategories = () => {
	return knex('product_categories')
		.then(response => successResponse(response, 'Success Get Product Categories', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductCategoriesWithSubcategories = () => {
	return knex('product_categories')
		.innerJoin('product_subcategories', 'product_categories.product_category_id', 'product_subcategories.product_category_id')
		.then(response => NestHydrationJS.nest(response, productCategoriesDefinition))
		.then(response => successResponse(response, 'Success Get Product Categories with Subcategories', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductSubcategories = () => {
	return knex('product_subcategories')
		.then(response => successResponse(response, 'Success Get Product Subcategories', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getProductSubcategoriesWithProducts = () => {
	return knex('product_subcategories')
		.innerJoin('products', 'product_subcategories.product_subcategory_id', 'products.product_subcategory_id')
		.then(response => NestHydrationJS.nest(response, productSubcategoriesDefinition))
		.then(response => successResponse(response, 'Success Get Product Subcategories with Products', 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateProduct = (product_id, data) => {
	return knex('products')
		.where('product_id', product_id)
		.update(data)
		.then(response => successResponse(response, 'Success Update Product', 200))
		.catch(err => errorResponse(err, 500))
}

exports.deleteProduct = (product_id) => {
	return knex('products')
		.where('product_id', product_id)
		.del()
		.then(response => successResponse(response, 'Success Delete Product', 200))
		.catch(err => errorResponse(err, 500))
} 