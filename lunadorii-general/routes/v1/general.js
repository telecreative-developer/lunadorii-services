const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const { authenticationAdmin } = require("../../middleware/authentication")
const { getDashboardInfo } = require("../../dispatchers/dashboard")
const { getBanks } = require("../../dispatchers/banks")
const { getPlaces } = require("../../dispatchers/places")
const { getOngkir } = require("../../dispatchers/ongkir")
const { sendLinkApp } = require("../../dispatchers/link")
const {
	getCareerCategories,
	getSingleCareerCategory,
	getSingleCareer
} = require("../../dispatchers/careers")

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

// Get career categories
router.get("/general/career-categories", (req, res) => {
	Promise.try(() => getCareerCategories())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_CAREER_CATEGORIES", err))
})

// Get single career category
router.get("/general/career-category/:slug", (req, res) => {
	Promise.try(() => getSingleCareerCategory(req.params.slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_CAREER_CATEGORY", err))
})

// Get single career
router.get("/general/career/:slug", (req, res) => {
	Promise.try(() => getSingleCareer(req.params.slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_CAREER", err))
})

module.exports = router
