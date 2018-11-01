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
	errorResponse,
	successResponse
} = require("../responsers")

const Promise = require("bluebird")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const handlebars = require("handlebars")
const fs = require("fs")
const fsReadFileAsync = Promise.promisify(fs.readFile)
const emailTemplateForgotPassword =
	"/./../../lunadorii-email-templates/reply-report.html"
const authMg = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN
	}
}
const nodemailerMailgun = Promise.promisifyAll(
	nodemailer.createTransport(mg(authMg))
)

const readHTMLFile = path => {
	return fsReadFileAsync(path, { encoding: "utf-8" })
		.then(html => html)
		.catch(err => err)
}

const nodemailerMailgunAsync = (email, subject, template, data) => {
	console.log(email, subject, template, data)
	return nodemailerMailgun
		.sendMail(mailOptions(email, subject, template, data))
		.then(res =>
			successResponse(null, "Success Send Request Forgot Password", 200)
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}

const mailOptions = (email, subject, template, data) => {
	const html = template(data)
	return {
		from: "no-reply@lunadorii.com",
		to: email,
		subject: `[Lunadorii Support] ${subject}`,
		html: html
	}
}

const sendEmailReplyReport = (email, name, subject, content) => {
	return readHTMLFile(__dirname + emailTemplateForgotPassword)
		.then(html => handlebars.compile(html))
		.then(hbs =>
			nodemailerMailgunAsync(email, subject, hbs, {
				name: name,
				content: content
			})
		)
		.catch(err => errorResponse("Internal Server Error", 500))
}



exports.sendReport = data => {
	const now = momentTimezone()
		.tz("Asia/Jakarta")
		.format()
	return knex("reports")
		.insert({
			name: data.name,
			email: data.email,
			subject: data.subject,
			content: data.content,
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
	const findReportId = (id) => {
		return knex("reports")
			.where("report_id", id)
			.then(result => result)
	}
	return knex("report_replies")
		.insert({
			subject: data.subject,
			content: data.content,
			report_id: data.report_id,
			admin_id: data.admin_id,
			created_at: now,
			updated_at: now
		})
		.then(() => findReportId(data.report_id))
		.then(res => sendEmailReplyReport(res[0].name, res[0].email, data.subject, data.content))
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
