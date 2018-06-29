require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const fetch = require('node-fetch')
const { successResponse, errorResponse } = require('../responsers')
const placesDefinition = require('../definitions/places')

exports.getPlaces = () => {
	return fetch(`https://api.rajaongkir.com/starter/city?key=${process.env.RAJAONGKIR_API_KEY}`)
		.then(response => response.json())
		.then(response => NestHydrationJS.nest(response.rajaongkir.results, placesDefinition))
		.then(response => successResponse(response, 'Success Get Places', 200))
		.catch(err => errorResponse(err, 500))
}