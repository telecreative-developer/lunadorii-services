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
	blogCategoriesDefinition,
	blogsDefinition
} = require("../definitions/blogs")

exports.getBlogCategories = () => {
	return knex("blog_categories")
		.innerJoin(
			"blogs",
			"blog_categories.blog_category_id",
			"blogs.blog_category_id"
		)
		.then(res => NestHydrationJS.nest(res, blogCategoriesDefinition))
		.then(res =>
			successResponseWithData(res, "Success Get Blog Categories", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getSingleBlogCategory = slug => {
	return knex("blog_categories")
		.where("blog_category_slug", slug)
		.innerJoin(
			"blogs",
			"blog_categories.blog_category_id",
			"blogs.blog_category_id"
		)
		.then(res => NestHydrationJS.nest(res, blogCategoriesDefinition))
		.then(res =>
			successResponseWithData(res, "Success Get Single Blog Category", 200)
		)
		.catch(err => errorResponse(err, 500))
}

exports.getBlogs = () => {
	return knex("blogs")
		.innerJoin(
			"blog_categories",
			"blogs.blog_category_id",
			"blog_categories.blog_category_id"
		)
		.then(res => NestHydrationJS.nest(res, blogsDefinition))
		.then(res => successResponseWithData(res, "Success Get Blogs", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleBlog = slug => {
	return knex("blogs")
		.where("blog_category_slug", slug)
		.innerJoin(
			"blog_categories",
			"blogs.blog_category_id",
			"blog_categories.blog_category_id"
		)
		.then(res => NestHydrationJS.nest(res, blogsDefinition))
		.then(res => successResponseWithData(res, "Success Get Single Blog", 200))
		.catch(err => errorResponse(err, 500))
}
