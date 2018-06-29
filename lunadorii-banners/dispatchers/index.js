require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.getBanners = () => {
	return knex
		.select()
		.table('banners')
		.then(response => successResponse(response, 'Success Retrieving Banners', 200))
		.catch(err => errorResponse(err, 500))
}