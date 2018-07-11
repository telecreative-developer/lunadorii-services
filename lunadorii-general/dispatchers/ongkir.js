require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const fetch = require("node-fetch")
const Promise = require("bluebird")
const { successResponse, errorResponse } = require("../responsers")

const fetchOngkir = (data, courier) => {
	return fetch("https://api.rajaongkir.com/starter/cost", {
		method: "POST",
		body: JSON.stringify({
			origin: 154,
			destination: data.province_id,
			weight: data.weight_gram,
			courier: courier
		}),
		headers: {
			"Content-Type": "application/json",
			key: "991952772172cbf1a1b0b03ef4aee103"
		}
	})
		.then(response => response.json())
		.then(response => response.rajaongkir.results[0])
}

exports.getOngkir = data => {
	return Promise.all([
		fetchOngkir(data, "tiki"),
		fetchOngkir(data, "jne"),
		fetchOngkir(data, "pos")
	]).then(response => successResponse(response, "Success", 200))
}
