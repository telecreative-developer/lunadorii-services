require("dotenv").config({ path: __dirname + "/./../../.env" })
const Promise = require("bluebird")
const express = require("express")
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const { successResponse, errorResponse } = require("../responsers")
const handlebars = require("handlebars")
const fs = require("fs")
const fsReadFileAsync = Promise.promisify(fs.readFile)
const emailTemplateLinkDownload =
	"/./../../lunadorii-email-templates/send-link-download.html"
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

const nodemailerMailgunAsync = (email, template, data) => {
	return nodemailerMailgun
		.sendMail(mailOptions(email, template, data))
		.then(res => successResponse(null, "Success Send Link", 200))
		.catch(err => errorResponse("Internal Server Error", 500))
}

const mailOptions = (email, template, data) => {
	const html = template(data)
	return {
		from: "no-reply@lunadorii.com",
		to: email,
		subject: "Download Aplikasi Lunadorii",
		html: html
	}
}

exports.sendLinkApp = email => {
	return readHTMLFile(__dirname + emailTemplateLinkDownload)
		.then(html => handlebars.compile(html))
		.then(hbs => {
			return nodemailerMailgunAsync(email, hbs, {
				appstoreLink: "https://facebook.com",
				playstoreLink: "https://twitter.com"
			})
		})
		.catch(err => err)
}
