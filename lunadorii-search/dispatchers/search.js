require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')

exports.search = (attributes) => {
	return knex('products')
		.where('product', 'like', `%${attributes.payload}%`)
		.where(builder => attributes.subcategories && builder.whereIn('product_subcategory_id', JSON.parse(attributes.subcategories)))
		.where(builder => attributes.maxPrice && builder.where('price', '>', attributes.maxPrice))
		.where(builder => attributes.minPrice && builder.where('price', '<', attributes.minPrice))
		.where(builder => attributes.productBrand && builder.where('product_brand_id', attributes.productBrand))
		.then(response => successResponse(response, `Success Search: ${attributes.payload}`, 201))
		.catch(err => errorResponse(err, 500))
}