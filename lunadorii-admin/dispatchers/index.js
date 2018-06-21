require('dotenv/config')
const express = require('express')
const bcrypt = require('bcrypt')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.getAdmin = () => {
	return knex
		.select()
		.table('admin')
		.then(response => successResponse(response, 'Success Get All Admin', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getAdminById = admin_id => {
	return knex('admin')
		.where('admin_id', admin_id)
		.then(response => successResponse(response, 'Success Get Admin by Id', 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateAdmin = (admin_id, data) => {
	return knex('admin')
		.where('admin_id', admin_id)
		.update({
			first_name: data.first_name,
			last_name: data.last_name
		})
		.then(response => successResponse(response, 'Success Update Admin', 200))
		.catch(err => errorResponse(err, 500))
}

exports.registerAdmin = data => {
	return knex('admin')
		.where('email', data.email)
		.then(response => {
			if (response.length) {
				return errorResponse('Email is already in use', 409)
			} else {
				return bcrypt.hash(data.password, 10)
				.then(hash => knex('admin').insert({...data, password: hash}))
				.then(() => successResponse(null, 'Success Register Admin', 201))
				.catch(err => errorResponse(err, 500))
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.updateUsername = (admin_id, data) => {
	return knex('admin')
		.where('username', data.username)
		.then(response => {
			if(response.length) {
				return errorResponse('Username is already in use', 409)
			}else {
				return knex('admin')
					.update(data)
					.then(response => successResponse(response, 'Success Update Username', 200))
					.catch(err => errorResponse(err, 500))
			}
		})
}

exports.updateEmail = (admin_id, data) => {
	return knex('admin')
		.where('email', data.email)
		.then(response => {
			if(response.length) {
				return errorResponse('Email is already in use', 409)
			}else {
				return knex('admin')
					.update(data)
					.then(response => successResponse(response, 'Success Update Email', 200))
					.catch(err => errorResponse(err, 500))
			}
		})
}

exports.updatePassword = (admin_id, data) => {
	return knex('admin')
		.where('admin_id', admin_id)
		.then(response => {
			if(response.length) {
				return bcrypt.compare(data.old_password, response[0].password)
					.then(res => {
						if(res) {
							return bcrypt.hash(data.new_password, 10)
								.then((hash) => knex('admin').where('admin_id', admin_id).update({password: hash})
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
