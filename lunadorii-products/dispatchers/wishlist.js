require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const wishlistDefinition = require('../definitions/wishlist')

exports.addWishlist = (data) => {
	return knex('wishlist')
		.insert(data)
		.then(response => successResponse(null, 'Success Add Wishlist', 201))
		.catch(err => errorResponse(err, 500))
}

exports.getWishlist = (id) => {
	return knex('wishlist')
		.where('wishlist.id', id)
		.innerJoin('users', 'wishlist.id', 'users.id')
		.innerJoin('products', 'wishlist.product_id', 'products.product_id')
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_category_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.leftJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.leftJoin('users as product_reviews_users', 'product_reviews.id', 'product_reviews_users.id')
		.select(
			'*',
			'products.product_id as product_id',
			'product_reviews_users.id as product_reviews_user_id',
			'product_reviews_users.avatar_url as product_reviews_avatar_url',
			'product_reviews_users.first_name as product_reviews_first_name',
			'product_reviews_users.last_name as product_reviews_last_name',
			'product_reviews.created_at as product_reviews_created_at',
			'product_reviews.updated_at as product_reviews_updated_at')
		.then(response => response.map(res => ({
			...res,
			product_reviews_avatar_url: res.product_reviews_avatar_url ? process.env.AWS_IMAGE_URL+res.product_reviews_avatar_url : process.env.AWS_IMAGE_DEFAULT_URL
		})))
		.then(response => NestHydrationJS.nest(response, wishlistDefinition))
		.then(response => response.map(res => ({
			...res,
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Wishlist', 200))
		.catch(err => console.log(err))
}

exports.removeWishlist = (data) => {
	if(data.wishlist_id) {
		return knex('wishlist')
			.where('wishlist_id', data.wishlist_id)
			.del()
			.then(response => successResponse(null, 'Success Remove Wishlist', 200))
			.catch(err => errorResponse(err, 500))
	}else {
		return knex('wishlist')
			.where('product_id', data.product_id)
			.andWhere('id', data.id)
			.del()
			.then(response => successResponse(null, 'Success Remove Wishlist', 200))
			.catch(err => errorResponse(err, 500))
	}
}