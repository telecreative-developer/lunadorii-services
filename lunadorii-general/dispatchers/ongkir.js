require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const axios = require("axios")
const Promise = require("bluebird")
const { successResponse, errorResponse } = require("../responsers")
const envRajaOngkirApiKey = process.env.RAJA_ONGKIR_API_KEY

const axiosOptions = data => {
	return {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			key: envRajaOngkirApiKey
		},
		data: data,
		url: "https://api.rajaongkir.com/starter/cost"
	}
}

const fetchOngkir = (data, courier) => {
	return axios(
		axiosOptions({
			origin: 154,
			destination: data.province_id,
			weight: data.weight_gram,
			courier: courier
		})
	)
		.then(res => res.data.rajaongkir.results[0])
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getOngkir = data => {
	return Promise.all([
		fetchOngkir(data, "tiki"),
		fetchOngkir(data, "jne"),
		fetchOngkir(data, "pos")
	])
		.then(response => successResponse(response, "Success", 200))
		.catch(err => err)
}
