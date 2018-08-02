require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const banksDefinition = require("../definitions/banks")

const checkUserLengthAsync = data => {
	return new Promise((resolve, reject) => {
		return data.length
			? resolve(data)
			: reject(errorResponse("User not found", 500))
	})
}

const comparePasswordAsync = (data, response) => {
	return new Promise((resolve, reject) => {
		return bcrypt
			.compare(data.password, response[0].password)
			.then(res => {
				return res
					? resolve(data)
					: reject(errorResponse("Password is incorrect", 400))
			})
			.catch(err => errorResponse("Internal Server Error", 500))
	})
}

exports.addUserBank = data => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return data.account_number &&
				data.account_name &&
				data.bank_id &&
				data.id &&
				data.password
				? resolve(data)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const searchUserBankAsync = item => {
		return knex("user_banks")
			.where("user_banks.id", data.id)
			.then(() => item)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const addUserBankAsync = res => {
		return knex("user_banks")
			.insert({
				account_number: data.account_number,
				account_name: data.account_name,
				account_default: data.account_default,
				bank_id: data.bank_id,
				id: data.id,
				account_default: res.length ? false : true
			})
			.then(() => data)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("users")
			.where("users.id", data.id)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(() => knexResponse())
		.then(res => searchUserBankAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => addUserBankAsync(res))
		.then(res => successResponse(null, "Success Add User Bank", 201))
		.catch(err => err)
}

exports.getUserBanks = id => {
	return knex("user_banks")
		.where("id", id)
		.innerJoin("banks", "user_banks.bank_id", "banks.bank_id")
		.then(res => NestHydrationJS.nest(res, banksDefinition))
		.then(res => successResponse(res, "Success Get User Banks", 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUserBank = (user_bank_id, data) => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return data.password
				? resolve(data)
				: reject(errorResponse("Password cannot be null", 400))
		})
	}

	const updateUserBankAsync = () => {
		return knex("user_banks")
			.where("user_bank_id", user_bank_id)
			.update({
				account_number: data.account_number,
				account_name: data.account_name,
				account_default: data.account_default,
				bank_id: data.bank_id
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("users")
			.where("users.id", data.id)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(res => knexResponse())
		.then(res => checkUserLengthAsync(res))
		.then(res => comparePasswordAsync(data, res))
		.then(res => updateUserBankAsync())
		.then(res => successResponse(res, "Success Update User Bank", 201))
		.catch(err => err)
}

exports.setDefaultUserBank = (user_bank_id, id) => {
	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return id ? resolve(id) : reject(errorResponse("Id cannot be null", 400))
		})
	}

	const setDefaultUserBankAsync = () => {
		return knex("user_banks")
			.where("user_bank_id", user_bank_id)
			.update({ account_default: true })
			.then(() => parseInt(user_bank_id))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("user_banks")
			.where("id", id)
			.update({ account_default: false })
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(() => knexResponse())
		.then(() => setDefaultUserBankAsync())
		.then(res => successResponse(res, "Success Set Default User Bank", 201))
		.catch(err => err)
}

exports.deleteUserBank = user_bank_id => {
	return knex("user_banks")
		.where("user_bank_id", user_bank_id)
		.del()
		.then(() => successResponse(null, "Success Delete User Bank", 200))
		.catch(err => errorResponse(err, 500))
}
