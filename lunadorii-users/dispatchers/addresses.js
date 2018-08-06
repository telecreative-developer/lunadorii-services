require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const bcrypt = require("bcrypt")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const momentTimezone = require("moment-timezone")
const NestHydrationJS = require("nesthydrationjs")()
const addressesDefinition = require("../definitions/addresses")
const {
	successResponseWithData,
	successResponseWithoutData,
	errorResponse
} = require("../responsers")

exports.addUserAddress = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const checkFieldAsync = () => {
		return new Promise((resolve, reject) => {
			data.recepient &&
			data.phone &&
			data.label &&
			data.detail_address &&
			data.province_id &&
			data.city_id &&
			data.id
				? resolve(data)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const knexResponse = () => {
		return knex("user_addresses")
			.where("id", data.id)
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const insertUserAddressAsync = res => {
		return knex("user_addresses")
			.insert({
				...data,
				address_default: res.length ? false : true,
				created_at: now,
				updated_at: now
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync()
		.then(() => knexResponse())
		.then(res => insertUserAddressAsync(res))
		.then(() => successResponseWithoutData("Success Add User Address", 201))
		.catch(err => err)
}

exports.getUserAddresses = id => {
	return knex("user_addresses")
		.where("id", id)
		.innerJoin(
			"provinces",
			"user_addresses.province_id",
			"provinces.province_id"
		)
		.innerJoin("cities", "user_addresses.city_id", "cities.city_id")
		.then(res => NestHydrationJS.nest(res, addressesDefinition))
		.then(res =>
			successResponseWithData(res, "Success Get User Addresses", 200)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.updateUserAddress = (user_address_id, data) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()
	return knex("user_addresses")
		.where("user_address_id", user_address_id)
		.update({
			recepient: data.recepient,
			phone: data.phone,
			label: data.label,
			detail_address: data.detail_address,
			province_id: data.province_id,
			city_id: data.city_id,
			id: data.id,
			updated_at: now
		})
		.then(() => successResponseWithoutData("Success Update User Address", 201))
		.catch(err => errorResponse(err, 500))
}

exports.setDefaultUserAddress = (user_address_id, id) => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()

	const updateUserAddressAsync = () => {
		return knex("user_addresses")
			.where("user_address_id", user_address_id)
			.update({ address_default: true, updated_at: now })
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	const changeAddressToFalseAsync = () => {
		return knex("user_addresses")
			.where("id", id)
			.update({ address_default: false, updated_at: now })
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return changeAddressToFalseAsync()
		.then(() => updateUserAddressAsync())
		.then(() => successResponseWithoutData("Success Set Default Address", 201))
		.catch(err => err)
}

exports.deleteUserAddress = user_address_id => {
	return knex("user_addresses")
		.where("user_address_id", user_address_id)
		.del()
		.then(() => successResponseWithoutData("Success Delete User Address", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}
