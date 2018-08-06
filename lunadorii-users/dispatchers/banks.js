require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const momentTimezone = require("moment-timezone")
const NestHydrationJS = require("nesthydrationjs")()
const {
	successResponseWithData,
	successResponseWithoutData,
	errorResponse
} = require("../responsers")
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
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

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
				account_default: res.length ? false : true,
				created_at: now,
				updated_at: now
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
		.then(() => successResponseWithoutData("Success Add User Bank", 201))
		.catch(err => err)
}

exports.getUserBanks = id => {
	return knex("user_banks")
		.where("id", id)
		.innerJoin("banks", "user_banks.bank_id", "banks.bank_id")
		.then(res => NestHydrationJS.nest(res, banksDefinition))
		.then(res => successResponseWithData(res, "Success Get User Banks", 200))
		.catch(err => errorResponse(err, 500))
}

exports.updateUserBank = (user_bank_id, data) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

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
				bank_id: data.bank_id,
				updated_at: now
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
		.then(() => successResponseWithoutData("Success Update User Bank", 201))
		.catch(err => err)
}

exports.setDefaultUserBank = (user_bank_id, id) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			return id ? resolve(id) : reject(errorResponse("Id cannot be null", 400))
		})
	}

	const setDefaultUserBankAsync = () => {
		return knex("user_banks")
			.where("user_bank_id", user_bank_id)
			.update({
				account_default: true,
				updated_at: now
			})
			.then(() => parseInt(user_bank_id))
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const knexResponse = () => {
		return knex("user_banks")
			.where("id", id)
			.update({
				account_default: false,
				updated_at: now
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(() => knexResponse())
		.then(() => setDefaultUserBankAsync())
		.then(() =>
			successResponseWithoutData("Success Set Default User Bank", 201)
		)
		.catch(err => err)
}

exports.deleteUserBank = user_bank_id => {
	return knex("user_banks")
		.where("user_bank_id", user_bank_id)
		.del()
		.then(() => successResponseWithoutData("Success Delete User Bank", 200))
		.catch(err => errorResponse(err, 500))
}
