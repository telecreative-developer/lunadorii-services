require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const bcrypt = require('bcrypt')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const NestHydrationJS = require('nesthydrationjs')()
const { successResponse, errorResponse } = require('../responsers')
const banksDefinition = require('../definitions/banks')

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
									.then(response => successResponse(null, 'Success Add User Banks', 201))
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
								.then(response => successResponse(response, 'Success Update User Banks', 201))
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

exports.setDefaultUserBank = user_bank_id => {
	return knex('user_banks')
		.where('user_bank_id', user_bank_id)
		.update({account_default: true})
		.then(response => successResponse(response, 'Success Set Default Bank', 201))
		.catch(err => errorResponse(err, 500)) 
}