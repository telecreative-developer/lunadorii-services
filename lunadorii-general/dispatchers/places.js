require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const placesDefinition = require('../definitions/places')

exports.getPlaces = () => {
	return knex('provinces')
		.innerJoin('cities', 'provinces.province_id', 'cities.province_id')
		.innerJoin('districts', 'cities.city_id', 'districts.city_id')
		.then(response => NestHydrationJS.nest(response, placesDefinition))
		.then(response => successResponse(response, 'Success Get Places', 200))
		.catch(err => errorResponse(err, 500))
}