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
		.update({
			first_name: data.first_name,
			last_name: data.last_name
		})
		.then(response => successResponse(response, 'Success Update User', 200))
		.catch(err => errorResponse(err, 500))
}

exports.registerUser = data => {
	return knex('users')
		.where('email', data.email)
		.then(response => {
			if (response.length) {
				return errorResponse('Email is already in use', 409)
			} else {
				return bcrypt.hash(data.password, 10)
				.then(hash => knex('users').insert({...data, password: hash}))
				.then(() => successResponse(null, 'Success Register User', 201))
				.catch(err => errorResponse(err, 500))
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.updateEmail = (id, data) => {
	return knex('users')
		.where('email', data.email)
		.then(response => {
			if(response.length) {
				return errorResponse('Email is already in use', 409)
			}else {
				return knex('users')
					.update(data)
					.then(response => successResponse(response, 'Success Update Email', 200))
					.catch(err => errorResponse(err, 500))
			}
		})
}

exports.updatePassword = (id, data) => {
	return knex('users')
		.where('id', id)
		.then(response => {
			if(response.length) {
				return bcrypt.compare(data.old_password, response[0].password)
					.then(res => {
						if(res) {
							return bcrypt.hash(data.new_password, 10)
								.then((hash) => knex('users').where('id', id).update({password: hash})
								.then(response => successResponse(response, 'Success Update Password', 200))
								.catch(err => errorResponse(err, 500)))
						}else {
							return errorResponse('Old password is incorrect', 500)
						}
					}).catch(err => errorResponse(err, 500))
			}else {
				return errorResponse(null, 500)
			}
		})
		.catch(err => errorResponse(err, 500))
}
