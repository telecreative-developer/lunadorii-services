require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const { successResponse, errorResponse } = require("../responsers")
const {
	careerCategoriesDefinition,
	careersDefinition
} = require("../definitions/careers")

exports.getCareerCategories = () => {
	return knex("career_categories")
		.innerJoin(
			"careers",
			"career_categories.career_category_id",
			"careers.career_category_id"
		)
		.then(res => NestHydrationJS.nest(res, careerCategoriesDefinition))
		.then(res => successResponse(res, "Success Get Careers", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleCareerCategory = slug => {
	return knex("career_categories")
		.where("career_category_slug", slug)
		.innerJoin(
			"careers",
			"career_categories.career_category_id",
			"careers.career_category_id"
		)
		.then(res => NestHydrationJS.nest(res, careerCategoriesDefinition))
		.then(res => successResponse(res, "Success Get Careers", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleCareer = slug => {
	return knex("careers")
		.where("career_slug", slug)
		.innerJoin(
			"career_categories",
			"careers.career_category_id",
			"career_categories.career_category_id"
		)
		.then(res => NestHydrationJS.nest(res, careersDefinition))
		.then(res => successResponse(res, "Success Get Careers", 200))
		.catch(err => errorResponse(err, 500))
}
