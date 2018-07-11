require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const authentication = require("../../middleware/authentication")
const { checkoutOrder } = require("../../dispatchers/order")

// Checkout order
router.post("/order/checkout", (req, res) => {
	Promise.try(() => checkoutOrder(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on CHECKOUT_ORDER", err))
})

module.exports = router
