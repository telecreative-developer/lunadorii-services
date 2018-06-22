require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const cartDefinition = require('../definitions/cart')

exports.addCart = (data) => {
	return knex('cart')
		.insert(data)
		.then(response => successResponse(null, 'Success Add Cart', 201))
		.catch(err => errorResponse(err, 500))
}

exports.getCart = (id) => {
	return knex('cart')
		.where('cart.id', id)
		.innerJoin('users', 'cart.id', 'users.id')
		.innerJoin('products', 'cart.product_id', 'products.product_id')
		.innerJoin('product_subcategories', 'products.product_subcategory_id', 'product_subcategories.product_category_id')
		.innerJoin('product_brands', 'products.product_brand_id', 'product_brands.product_brand_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.innerJoin('product_reviews', 'products.product_id', 'product_reviews.product_id')
		.then(response => NestHydrationJS.nest(response, cartDefinition))
		.then(response => response.map(res => ({
			...res,
			subtotal: (res.price * res.qty) - (res.price * res.qty) * (res.discount_percentage / 100),
			product_rate: res.reviews.map(r => r.review_rate).reduce((a, b) => a+b) / res.reviews.length
		})))
		.then(response => successResponse(response, 'Success Get Cart', 200))
}

export.updateCartQty = (cart_id, qty) => {
	return knex('cart')
		.where('cart_id', cart_id)
		.update({
			qty: qty
		})
		.then(response => successResponse(null, 'Success Update Cart Qty', 200))
		.catch(err => errorResponse(err, 500)) 
}

exports.removeCart = (cart_id) => {
	return knex('cart')
		.where('cart_id', cart_id)
		.del()
		.then(response => successResponse(null, 'Success Remove Cart', 200))
		.catch(err => errorResponse(err, 500))
}