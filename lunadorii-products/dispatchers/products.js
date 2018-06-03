require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const { productsDefinition, productBrandsDefinition, productCategoriesDefinition } = require('../definitions/products')

exports.getAllProducts = () => {
	return knex('products')
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_category_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.innerJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length
		})))
		.then(response => successResponse(response, 'Success Get Products', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleProduct = (product_id) => {
	return knex('products')
		.where('products.product_id', product_id)
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_category_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.innerJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length
		})))
		.then(response => successResponse(response, 'Success Get Single Product', 200))
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