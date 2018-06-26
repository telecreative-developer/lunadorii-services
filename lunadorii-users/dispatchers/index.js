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

exports.getUserAddresses = id => {
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

exports.addUserBank = data => {
	return knex('users')
		.where('users.id', data.id)
		.then(response => {
			return knex('user_banks')
				.where('user_banks.id', data.id)
				.then(responseUserBank => {
					return bcrypt.compare(data.password, response[0].password)
						.then(res => {
							if(res) {
								return knex('user_banks')
									.insert({
										account_number: data.account_number,
										account_name: data.account_name,
										account_default: data.account_default,
										bank_id: data.bank_id,
										id: data.id,
										account_default: responseUserBank.length ? false : true})
									.then(response => successResponse(null, 'Success Add User Banks', 200))
									.catch(err => errorResponse(err, 500))
							}else {
								return errorResponse('Password is incorrect', 500)
							}
						})
				})
		})
		.catch(err => errorResponse(err, 500))
}

exports.getUserBanks = id => {
	return knex('user_banks')
		.where('id', id)
		.innerJoin('banks', 'user_banks.bank_id', 'banks.bank_id')
		.then(response => NestHydrationJS.nest(response, banksDefinition))
		.then(response => successResponse(response, 'Success Get User Banks', 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUserBank = (user_bank_id, data) => {
	return knex('users')
		.where('users.id', data.id)
		.then(response => {
			if(response.length) {
				return bcrypt.compare(data.password, response[0].password)
					.then(res => {
						if(res) {
							return knex('user_banks')
								.where('user_bank_id', user_bank_id)
								.update({
									account_number: data.account_number,
									account_name: data.account_name,
									account_default: data.account_default,
									bank_id: data.bank_id
								})
								.then(response => successResponse(response, 'Success Update User Banks', 200))
								.catch(err => errorResponse(err, 500))
						}else {
							return errorResponse('Password is incorrect', 500)
						}
					})
			}else {
				return errorResponse('User not found', 500)
			}
		})
		.catch(err => errorResponse(err, 500))
}

exports.getUserReviews = id => {
	return knex('product_reviews')
		.where('product_reviews.id', id)
		.innerJoin('products', 'product_reviews.product_id', 'products.product_id')
		.innerJoin('product_thumbnails', 'products.product_id', 'product_thumbnails.product_id')
		.then(response => NestHydrationJS.nest(response, reviewsDefinition))
		.then(response => successResponse(response, 'Success Get User Reviews', 200))
		.catch(err => console.log(err))
}

exports.updateUserReviews = (product_review_id, data) => {
	return knex('product_reviews')
		.where('product_review_id', product_review_id)
		.update(data)
		.then(response => successResponse(response, 'Success Update User Reviews', 200))
		.catch(err => errorResponse(err, 500))
}