require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const bcrypt = require('bcrypt')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.addUserAddress = (data) => {
	return knex('user_addresses')
		.where('id', data.id)
		.then(response => {
			return knex('user_addresses')
					.insert({...data, address_default: response.length ? false : true})
					.then(response => successResponse(response, 'Success Add User Address', 200))
					.catch(err => errorResponse(err, 500))
		})
		.catch(err => errorResponse(err, 500))
}

exports.getUserAddresses = (id) => {
	return knex('user_addresses')
		.where('user_addresses.id', id)
		.innerJoin('provinces', 'user_addresses.province_id', 'provinces.province_id')
		.innerJoin('cities', 'user_addresses.city_id', 'cities.city_id')
		.innerJoin('districts', 'user_addresses.district_id', 'districts.district_id')
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

exports.setDefaultUserAddress = (user_address_id, id) => {
	return knex('user_addresses')
		.where('id', id)
		.update({address_default: false})
		.then(() => {
			return knex('user_addresses')
				.where('user_address_id', user_address_id)
				.update({address_default: true})
				.then(response => successResponse(response, 'Success Set Default Address', 200))
				.catch(err => errorResponse(err, 500))
		})
		.catch(err => errorResponse(err, 500))
}

exports.deleteUserAddress = (user_address_id, data) => {
	return knex('user_addresses')
		.where('user_address_id', user_address_id)
		.del()
		.then(response => successResponse(response, 'Success Delete User Address', 200))
		.catch(err => errorResponse(err, 500))
}