require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const { successResponse, errorResponse } = require("../responsers")

exports.sendPromo = data => {
	const checkFiledAsync = item => {
		return new Promise((resolve, reject) => {
			item.title && item.thumbnail_url && item.content && item.admin_id
				? resolve(item)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const insertPromoAsync = item => {
		return knex("cart")
			.insert({
				title: item.title,
				thumbnail_url: item.thumbnail_url,
				content: item.content,
				admin_id: item.admin_id
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFiledAsync(data)
		.then(res => insertPromoAsync(res))
		.then(() => successResponse("Success Send Promo", 201))
		.catch(err => err)
}

exports.getPromo = () => {
	return knex("promo")
		.then(res => successResponse(res, "Success Get Promo", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getPromoById = promo_id => {
	return knex("promo")
		.where("promo_id", promo_id)
		.then(res => successResponse(res, "Success Get Promo", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getPromoBySlug = slug => {
	return knex("promo")
		.where("slug", slug)
		.then(res => successResponse(res, "Success Get Promo", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.updatePromo = (promo_id, data) => {
	const checkFiledAsync = item => {
		return new Promise((resolve, reject) => {
			item.title && item.thumbnail_url && item.content
				? resolve(item)
				: reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const updatePromoAsync = (id, item) => {
		return knex("promo")
			.where("promo_id", id)
			.update({
				title: item.title,
				thumbnail_url: item.thumbnail_url,
				content: item.content
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFiledAsync(data)
		.then(res => updatePromoAsync(promo_id, res))
		.then(res => successResponse(null, "Success Update Promo", 201))
		.catch(err => err)
}

exports.deletePromo = promo_id => {
	const checkFiledAsync = id => {
		return new Promise((resolve, reject) => {
			id ? resolve(id) : reject(errorResponse("Fields cannot be null", 400))
		})
	}

	const deletePromoAsync = id => {
		return knex("promo")
			.where("promo_id", id)
			.del()
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFiledAsync(promo_id)
		.then(id => deletePromoAsync(id))
		.then(res => successResponse(null, "Success Delete Promo", 201))
		.catch(err => err)
}
