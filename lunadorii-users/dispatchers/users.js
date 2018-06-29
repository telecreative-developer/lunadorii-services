require('dotenv/config')
const express = require('express')
const bcrypt = require('bcrypt')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const reviewsDefinition = require('../definitions/reviews')
const banksDefinition = require('../definitions/banks')

exports.getUsers = () => {
	return knex
		.select()
		.table('users')
		.then(response => successResponse(response, 'Success Get Users', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getUserById = id => {
	return knex('users')
		.where('id', id)
		.then(response => successResponse(response, 'Success Get User', 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUser = (id, data) => {
	return knex('users')
		.where('id', id)
		.update({
			first_name: data.first_name,
			last_name: data.last_name,
			bod: data.bod
		})
		.then(response => successResponse(response, 'Success Update User', 200))
		.catch(err => errorResponse(err, 500))
}

exports.uploadAvatar = (id, image) => {
	return knex('users')
		.where('id', id)
		.update({
			avatar_url: image
		})
		.then(response => successResponse(response, 'Success Upload Avatar User', 200))
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

exports.checkEmail = email => {
	return knex('users')
		.where('email', email)
		.then(response => {
			if (response.length) {
				return errorResponse('Email is already in use', 409)
			} else {
				return successResponse(null, 'Email Available', 200)
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.updateEmail = (id, data) => {
	return knex('users')
		.where('email', data.email)
		.then(response => {
			if(response.length) {
				if(response[0].email === data.email) {
					return knex('users')
						.where('id', id)
						.update(data)
						.then(response => successResponse(response, 'Success Update Email', 200))
						.catch(err => errorResponse(err, 500))
				}else {
					return errorResponse('Email is already in use', 409)
				}
			}else {
				return knex('users')
					.where('id', id)
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