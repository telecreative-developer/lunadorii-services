require('dotenv/config')
const express = require('express')
const bcrypt = require('bcrypt')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.retrieveUsers = () => {
	return knex
		.select()
		.table('users')
		.then(response => successResponse(response, 'Success Retrieving Users', 200))
		.catch(err => errorResponse(err, 500))
}

exports.retrieveUserById = id => {
	return knex('users')
		.where('id', id)
		.then(response => successResponse(response, 'Success Retrieving User', 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUser = (id, data) => {
	return knex('users')
		.where('id', id)
		.update(data)
		.then(response => successResponse(response, 'Success Update User', 200))
		.catch(err => errorResponse(err, 500))
}

exports.registerUser = data => {
	return knex
		.where('email', data.email)
		.then(response => {
			if (response.data.length) {
				return errorResponse('Email is already in use', 409)
			} else {
				return knex('users')
					.insert(data)
					.then(res => successResponse(res, 'Success Register User', 200))
					.catch(err => errorResponse(err, 500))
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.updatePassword = (id, data) => {
	return knex('users')
		.where('id', id)
		.update(data)
		.then(response => successResponse(response, 'Success Update Password', 200))
		.catch(err => errorResponse(err, 500))
}
