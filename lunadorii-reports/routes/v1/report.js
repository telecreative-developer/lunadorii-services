require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const { authenticationAdmin } = require("../../middleware/authentication")
const {
	sendReport,
	readReport,
	replyReport,
	getReports,
	getSingleReport
} = require("../../dispatchers/report")

// Send Report
router.post("/report", (req, res) => {
	Promise.try(() => sendReport(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on SEND_REPORT", err))
})

// Reply Report
router.post("/report/reply", (req, res) => {
	Promise.try(() => replyReport(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on SEND_REPORT", err))
})

// Read Report
router.put("/report/:report_id/read", (req, res) => {
	Promise.try(() => readReport(req.params.report_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on READ_REPORT", err))
})

// Get Reports
router.get("/reports", authenticationAdmin, (req, res) => {
	Promise.try(() => getReports())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_REPORTS", err))
})

// Get Single Report
router.get("/report/:report_id", authenticationAdmin, (req, res) => {
	Promise.try(() => getSingleReport(req.params.report_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_REPORT", err))
})

module.exports = router
