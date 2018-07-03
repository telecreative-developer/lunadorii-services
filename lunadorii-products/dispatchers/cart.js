require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const cartDefinition = require('../definitions/cart')

exports.addCart = (data) => {
	return knex('cart')
		.where('id', data.id)
		.andWhere('product_id', data.product_id)
		.limit(1)
		.then(response => {
			if(response.length) {
				return knex('cart')
					.where('id', data.id)
					.andWhere('product_id', data.product_id)
					.update({qty: response[0].qty + data.qty})
					.then(response => successResponse(null, 'Success Add Cart', 201))
			}else {
				return knex('cart')
					.insert(data)
					.then(response => successResponse(null, 'Success Add Cart', 201))
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.getCart = (id) => {
	return knex('cart')
		.where('cart.id', id)
		.innerJoin('users', 'cart.id', 'users.id')
		.innerJoin('products', 'cart.product_id', 'products.product_id')
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_subcategory_id')
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
		.then(response => NestHydrationJS.nest(response, cartDefinition))
		.then(response => response.map(res => ({
			...res,
			subtotal: (res.price * res.qty) - (res.price * res.qty) * (res.discount_percentage / 100),
			product_rate: res.reviews.length ? res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length : 0
		})))
		.then(response => successResponse(response, 'Success Get Cart', 200))
}

exports.updateCartQty = (data) => {
	if(data.cart_id) {
		return knex('cart')
			.where('cart_id', cart_id)
			.update({
				qty: data.qty
			})
			.then(response => successResponse(null, 'Success Update Qty Cart', 200))
			.catch(err => errorResponse(err, 500))
	} else {
		return knex('cart')
			.where('product_id', data.product_id)
			.andWhere('id', data.id)
			.update({
				qty: data.qty
			})
			.then(response => successResponse(null, 'Success Update Qty Cart', 200))
			.catch(err => errorResponse(err, 500))
	}
}

exports.removeCart = (data) => {
	if(data.cart_id) {
		return knex('cart')
			.where('cart_id', cart_id)
			.del()
			.then(response => successResponse(null, 'Success Remove Cart', 200))
			.catch(err => errorResponse(err, 500))
	} else {
		return knex('cart')
			.where('product_id', data.product_id)
			.andWhere('id', data.id)
			.del()
			.then(response => successResponse(null, 'Success Remove Cart', 200))
			.catch(err => errorResponse(err, 500))
	}
}