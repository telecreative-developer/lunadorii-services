require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const searchDefinition = require('../definitions/search')

exports.search = (attributes) => {
	return knex('products')
		.where('product', 'like', `%${attributes.payload}%`)
		.where(builder => attributes.subcategories && builder.whereIn('products.product_subcategory_id', JSON.parse(attributes.subcategories)))
		.where(builder => attributes.productBrand && builder.where('products.product_brand_id', attributes.productBrand))
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_category_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.innerJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.innerJoin('users', 'product_reviews.id', 'users.id')
		.then(response => NestHydrationJS.nest(response, searchDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length
		})))
		.then(response => {
			if(attributes.maxPrice && attributes.minPrice) {
				return response.filter(res => res.price <= attributes.maxPrice && res.price >= attributes.minPrice)
			}

			return response
		})
		.then(response => successResponse(response, `Success Search: ${attributes.payload}`, 201))
		.catch(err => errorResponse(err, 500))
}