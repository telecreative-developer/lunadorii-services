require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const authMg = {
	auth: {
		api_key: process.env.MAILGUN_API_KEY,
		domain: process.env.MAILGUN_DOMAIN
	}
}
const nodemailerMailgun = nodemailer.createTransport(mg(authMg))

exports.sendLinkApp = email => {
	return new Promise((resolve, reject) => {
		return nodemailerMailgun.sendMail(
			{
				from: "no-reply@lunadorii.com",
				to: email,
				subject: "Download Aplikasi Lunadorii",
				html: `<a href='http://54.169.224.248:3000/reset-password?token=${token}'><b>KLIK DISINI!</b></a>`
			},
			(err, info) => {
				err
					? reject(errorResponse("Internal Server Error", 500))
					: resolve(null, "Success Send Link", 200)
			}
		)
	})
}
