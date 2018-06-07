require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const cartDefinition = '../definitions/cart'

exports.getCart = (id) => {
	return knex('cart')
		.where('cart.id', id)
		.innerJoin('products', 'products.product_id', 'cart.product_id')
		.innerJoin('product_thumbnails', 'product_thumbnails.product_id', 'cart.product_id')
		.innerJoin('users', 'users.id', 'cart.id')
		.then(response => NestHydrationJS.nest(response, cartDefinition))
		.then(response => successResponse(response, 'Success Get Cart', 200))
		.catch(err => {
			console.log(err)
			errorResponse(err, 500)
		})
}