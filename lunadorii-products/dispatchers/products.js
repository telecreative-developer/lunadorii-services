require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.retrieveProducts = () => {
	return knex
		.from('products')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.then(response => successResponse(response, 'Success Retrieving Products', 200))
		.catch(err => errorResponse(err, 500))
}

exports.retrieveSingleProduct = (product_id) => {
	return knex('products')
		.where('product_id', product_id)
		.then(response => successResponse(response, 'Success Retrieving Single Product', 200))
		.catch(err => errorResponse(err, 500))
}