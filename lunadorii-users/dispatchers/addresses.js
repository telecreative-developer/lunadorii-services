require('dotenv/config')
const express = require('express')
const bcrypt = require('bcrypt')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.addUserAddress = (data) => {
	return knex('user_addresses')
		.insert(data)
		.then(response => successResponse(response, 'Success Add User Address', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getUserAddresses = (id) => {
	return knex('user_addresses')
		.where('id', id)
		.then(response => successResponse(response, 'Success Get User Addresses', 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUserAddress = (user_address_id, data) => {
	return knex('user_addresses')
		.where('user_address_id', user_address_id)
		.update(data)
		.then(response => successResponse(response, 'Success Update User Address', 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUserAddress = (user_address_id, data) => {
	return knex('user_addresses')
		.where('user_address_id', user_address_id)
		.del()
		.then(response => successResponse(response, 'Success Delete User Address', 200))
		.catch(err => errorResponse(err, 500))
}