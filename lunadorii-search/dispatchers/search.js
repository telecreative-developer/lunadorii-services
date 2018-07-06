require('dotenv').config({path: __dirname+'/./../../.env'})
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
			'product_subcategories.product_subcategory_id as product_subcategory_id',
			'product_brands.product_brand_id as product_brand_id',
			'product_thumbnails.product_thumbnail_id as product_thumbnail_id',
			'product_reviews.product_review_id as product_review_id',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
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
		.then(response => successResponse(response, `Success Search (keyword: ${attributes.payload})`, 200))
		.catch(err => errorResponse(err, 500))
}
