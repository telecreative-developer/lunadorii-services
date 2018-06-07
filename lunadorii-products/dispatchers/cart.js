require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const { cartDefinition } = '../definitions/products'

exports.addCart = (data) => {
	return knex('cart')
		.insert(data)
		.then(response => successResponse(null, 'Success Add Cart', 201))
		.catch(err => errorResponse(err, 500))
}

exports.getCart = (id) => {
	return knex('cart')
		.innerJoin('users', 'cart.id', 'users.id')
		.then(response => NestHydrationJS.nest(response, cartDefinition))
		.then(response => successResponse(response, 'Success Get Cart', 200))
}