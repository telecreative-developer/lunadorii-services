require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')

const productsDefinition = [{
	product_id: {column: 'product_id', id: true},
	product: {column: 'product'},
	description: {column: 'description'},
	detail: {column: 'detail'},
	to_use: {column: 'to_use'},
	price: {column: 'price'},
	discount: {column: 'discount'},
	discount_percentage: {column: 'discount_percentage'},
	categories: [{
		product_category_id: {column: 'product_category_id', id: true},
		category: {column: 'category'}
	}],
	brands: [{
		product_brand_id: {column: 'product_brand_id', id: true},
		brand: {column: 'brand'},
		logo_url: {column: 'logo_url'}
	}],
	thumbnails: [{
		product_thumbnail_id: {column: 'product_thumbnail_id', id: true},
		thumbnail_url: {column: 'thumbnail_url'}
	}],
	reviews: [{
		product_review_id: {column: 'product_review_id', id: true},
		review_rate: {column: 'rate'},
		comment: {column: 'comment'}
	}],
	created_at: {column: 'created_at'},
	updated_at: {column: 'updated_at'}
}]

exports.retrieveProducts = () => {
	return knex('products')
		.innerJoin('product_categories', 'products.product_category_id', 'product_categories.product_category_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.innerJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length
		})))
		.then(response => successResponse(response, 'Success Retrieving Products', 200))
		.catch(err => {
			console.log(err)
			errorResponse(err, 500)
		})
}

exports.retrieveSingleProduct = (product_id) => {
	return knex('products')
		.where('products.product_id', product_id)
		.innerJoin('product_categories', 'products.product_category_id', 'product_categories.product_category_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.innerJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length / res.reviews.map(r => r.review_rate).reduce((a, b) => a+b)
		})))
		.then(response => NestHydrationJS.nest(response, productsDefinition))
		.then(response => successResponse(response, 'Success Retrieving Single Product', 200))
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