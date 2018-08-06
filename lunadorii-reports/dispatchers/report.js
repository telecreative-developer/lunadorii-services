require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const momentTimezone = require("moment-timezone")
const {
	successResponseWithData,
	successResponseWithoutData,
	errorResponse
} = require("../responsers")

exports.sendReport = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()
	return knex("reports")
		.insert({
			name: data.name,
			email: data.email,
			subject: data.content,
			read: false,
			created_at: now,
			updated_at: now
		})
		.then(() => successResponseWithoutData("Success Send Report", 201))
		.catch(err => errorResponse(err, 500))
}

exports.replyReport = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()
	return knex("report_replies")
		.insert({
			subject: data.subject,
			content: data.content,
			admin_id: data.admin_id,
			created_at: now,
			updated_at: now
		})
		.then(() => successResponseWithoutData("Success Reply Report", 201))
		.catch(err => errorResponse(err, 500))
}

exports.readReport = report_id => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()
	return knex("reports")
		.where("report_id", report_id)
		.update({ read: true, updated_at: now })
		.then(() => successResponseWithoutData("Success Read Report", 201))
		.catch(err => errorResponse(err, 500))
}

exports.getReports = data => {
	return knex("reports")
		.then(res => successResponseWithData(res, "Success Get Reports", 200))
		.catch(err => errorResponse(err, 500))
}

exports.getSingleReport = report_id => {
	return knex("reports")
		.where("report_id", report_id)
		.then(res => successResponseWithData(res, "Success Get Single Report", 200))
		.catch(err => errorResponse(err, 500))
}
