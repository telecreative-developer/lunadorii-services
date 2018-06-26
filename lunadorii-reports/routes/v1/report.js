require('dotenv/config')
const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const { sendReport, getReports, getReportById } = require('../../dispatchers/report')

// Send Report
router.post('/report', (req, res) => {
	Promise.try(() => sendReport(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on SEND_REPORT', err))
})

// Get Reports
router.get('/reports', (req, res) => {
	Promise.try(() => getReports())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_REPORTS', err))
})

// Get Single Report
router.get('/report/:report_id', (req, res) => {
	Promise.try(() => getReportById(req.params.report_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_SINGLE_REPORT', err))
})

module.exports = router