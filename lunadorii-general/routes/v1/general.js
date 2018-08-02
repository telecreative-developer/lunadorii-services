const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const { authenticationAdmin } = require("../../middleware/authentication")
const { getDashboardInfo } = require("../../dispatchers/dashboard")
const { getBanks } = require("../../dispatchers/banks")
const { getPlaces } = require("../../dispatchers/places")
const { getOngkir } = require("../../dispatchers/ongkir")
const { sendLinkApp } = require("../../dispatchers/link")

// Get all banks
router.get("/general/banks", (req, res) => {
	Promise.try(() => getBanks())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BANKS", err))
})

// Get all places
router.get("/general/places", (req, res) => {
	Promise.try(() => getPlaces())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_PLACES", err))
})

// Get ongkir
router.post("/general/ongkir", (req, res) => {
	Promise.try(() => getOngkir(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ONGKIR", err))
})

// Send App Link
router.post("/general/send-link-app", (req, res) => {
	Promise.try(() => sendLinkApp(req.body.email))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ONGKIR", err))
})

// Get info dashboard admin
router.get("/general/dashboard/admin", authenticationAdmin, (req, res) => {
	Promise.try(() => getDashboardInfo())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_DASHBOARD_INFO", err))
})

module.exports = router
