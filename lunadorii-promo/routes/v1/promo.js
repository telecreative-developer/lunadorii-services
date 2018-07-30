require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const {
	sendPromo,
	getPromo,
	getPromoById,
	getPromoBySlug,
	updatePromo,
	deletePromo
} = require("../../dispatchers/promo")
const {
	authenticationUser,
	authenticationAdmin
} = require("../../middleware/authentication")

// Send Report
router.post("/promo", authenticationAdmin, (req, res) => {
	Promise.try(() => sendPromo(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on SEND_PROMO", err))
})

// Get Promo
router.get("/promo", (req, res) => {
	Promise.try(() => getPromo())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_PROMO", err))
})

// Get Single Promo
router.get("/promo/:promo_id", (req, res) => {
	Promise.try(() => getPromoById(req.params.promo_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_PROMO", err))
})

// Get Single Promo by Slug
router.get("/promo/slug/:slug", (req, res) => {
	Promise.try(() => getPromoBySlug(req.params.slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_PROMO_BY_SLUG", err))
})

// Update Promo
router.put("/promo/:promo_id", authenticationAdmin, (req, res) => {
	Promise.try(() => updatePromo(req.params.promo_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UPDATE_PROMO", err))
})

// Delete Promo
router.delete("/promo/:promo_id", authenticationAdmin, (req, res) => {
	Promise.try(() => deletePromo(req.params.promo_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on DELETE_PROMO", err))
})

module.exports = router
