require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const environment = process.env.NODE_ENV || "development"
const configuration = require("../knexfile")[environment]
const knex = require("knex")(configuration)
const NestHydrationJS = require("nesthydrationjs")()
const momentTimezone = require("moment-timezone")
const reportsDefinition = require("../definitions/reports")
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
			report_id: data.report_id,
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
		.leftJoin("report_replies", "reports.report_id", "report_replies.report_id")
		.select(
			"*",
			"reports.report_id as report_id",
			"reports.subject as report_subject",
			"reports.content as report_content",
			"reports.created_at as report_created_at",
			"reports.updated_at as report_updated_at",
			"report_replies.report_reply_id as report_reply_id",
			"report_replies.subject as report_reply_subject",
			"report_replies.content as report_reply_content",
			"report_replies.created_at as report_reply_created_at",
			"report_replies.updated_at as report_reply_updated_at"
		)
		.then(res => NestHydrationJS.nest(res, reportsDefinition))
		.then(res => successResponseWithData(res, "Success Get Reports", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

exports.getSingleReport = report_id => {
	return knex("reports")
		.where("report_id", report_id)
		.then(res => successResponseWithData(res, "Success Get Single Report", 200))
		.catch(err => errorResponse(err, 500))
}
