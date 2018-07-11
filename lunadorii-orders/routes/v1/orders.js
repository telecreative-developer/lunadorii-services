require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const authentication = require("../../middleware/authentication")
const {
	checkoutOrder,
	getOrderHistory,
	getOrderRecent
} = require("../../dispatchers/order")

// Checkout order
router.post("/order/checkout", (req, res) => {
	Promise.try(() => checkoutOrder(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on CHECKOUT_ORDER", err))
})

// Order history
router.get("/order/history/:id", (req, res) => {
	Promise.try(() => getOrderHistory(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ORDER_HISTORY", err))
})

// Order recent
router.get("/order/recent/:id", (req, res) => {
	Promise.try(() => getOrderRecent(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ORDER_RECENT", err))
})

module.exports = router
