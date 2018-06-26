require('dotenv/config')
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.getBanks = () => {
	return knex('banks')
		.then(response => successResponse(response, 'Success Get Banks', 200))
		.catch(err => errorResponse(err, 500))
}