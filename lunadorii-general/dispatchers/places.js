require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const placesDefinition = require("../definitions/places")

exports.getPlaces = () => {
	return knex("cities")
		.innerJoin("provinces", "cities.province_id", "provinces.province_id")
		.then(response => NestHydrationJS.nest(response, placesDefinition))
		.then(response =>
			response.map(res => ({
				...res,
				cities: res.cities.map(resc => ({
					...resc,
					city_with_type: `${resc.type} ${resc.city}`
				}))
			}))
		)
		.then(response => successResponse(response, "Success Get Places", 200))
		.catch(err => errorResponse(err, 500))
}
