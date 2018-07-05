require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const knex = require('knex')(configuration)
const { successResponse, errorResponse } = require('../responsers')

exports.sendReport = (data) => {
	return knex('reports')
		.insert(data)
		.returning('report_id')
		.then(report_id => successResponse(parseInt(report_id.toString()), 'Success Send Report', 201))
		.catch(err => errorResponse(err, 500))
}

exports.getReports = (data) => {
	return knex('reports')
		.then(response => successResponse(response, 'Success Get Reports', 200))
		.catch(err => errorResponse(err, 500))
}

exports.getReportById = (report_id) => {
	return knex('reports')
		.where('report_id', report_id)
		.then(response => successResponse(response, 'Success Get Report By Id', 200))
		.catch(err => errorResponse(err, 500))
}