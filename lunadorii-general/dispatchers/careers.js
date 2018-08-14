require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const {
	successResponseWithoutData,
	successResponseWithData,
	errorResponse
} = require("../responsers")
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
		.then(res =>
			successResponseWithData(res, "Success Get Career Categories", 200)
		)
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
		.then(res =>
			successResponseWithData(res, "Success Get Single Career Category", 200)
		)
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
		.then(res => successResponseWithData(res, "Success Get Single Career", 200))
		.catch(err => errorResponse(err, 500))
}

exports.addCareerCategory = data => {
	const checkFieldAsync = item => {
		return item.title
			? Promise.resolve(item.title)
			: Promise.reject(errorResponse("Fields cannot be null", 400))
	}

	const insertCareerCategory = title => {
		return knex("careers")
			.insert({
				career_category_slug: title.toLowerCase(),
				career_category_title: title
			})
			.then(res => title)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(data)
		.then(title => insertCareerCategory(title))
		.then(() => successResponseWithoutData("Success Add Career Category", 200))
		.catch(err => err)
}

exports.updateCareerCategory = (career_category_id, data) => {
	return knex("careers")
		.where("career_category_id", career_category_id)
		.update({
			career_category_title: data.title
		})
		.then(() =>
			successResponseWithoutData("Success Update Career Category", 200)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.addCareer = data => {
	const checkFieldAsync = item => {
		return item.title && placement && description && career_category_id
			? Promise.resolve(item)
			: Promise.reject(errorResponse("Fields cannot be null", 400))
	}

	const insertCareer = item => {
		return knex("careers")
			.insert({
				career_slug: item.title.toLowerCase(),
				career_title: item.title,
				career_placement: item.placement,
				description: item.description,
				career_category_id: item.career_category_id
			})
			.then(res => res)
			.catch(err => errorResponse("Internal Server Error", 500))
	}

	return checkFieldAsync(data)
		.then(res => insertCareer(res))
		.then(() => successResponseWithoutData("Success Add Career", 200))
		.catch(err => err)
}

exports.updateCareer = (career_id, data) => {
	return knex("careers")
		.where("career_category_id", career_category_id)
		.update({
			career_title: data.title,
			career_placement: data.placement,
			description: data.description,
			career_category_id: data.career_category_id
		})
		.then(() => successResponseWithoutData("Success Update Career", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}
