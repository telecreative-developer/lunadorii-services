require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const {
	authenticationUser,
	authenticationAdmin
} = require("../../middleware/authentication")
const {
	checkoutOrder,
	getOrderHistories,
	getOrderHistory,
	getOrderHistorySingle,
	getOrderHistorySingleLogged,
	getOrderRecent,
	getOrderRecentSingle,
	getOrderRecentSingleLogged,
	swicthOrderStatusToPacking,
	swicthOrderStatusToShipping
} = require("../../dispatchers/order")

// Switch order status to Packing
router.put("/order/status/packing/:billing_code", authenticationAdmin, (req, res) => {
	Promise.try(() => swicthOrderStatusToPacking(req.params.billing_code))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on PUT_SWITCH_ORDER_STATUS", err))
})

// Switch order status to Shipping
router.put("/order/status/shipping/:billing_code", authenticationAdmin, (req, res) => {
	Promise.try(() => swicthOrderStatusToShipping(req.params.billing_code, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on PUT_SWITCH_ORDER_STATUS", err))
})

// Get order histories
router.get("/order/histories", authenticationAdmin, (req, res) => {
	Promise.try(() => getOrderHistories(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ORDER_HISTORIES", err))
})

// Checkout order
router.post("/order/checkout", authenticationUser, (req, res) => {
	Promise.try(() => checkoutOrder(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on CHECKOUT_ORDER", err))
})

// Order history
router.get("/order/history/:id", authenticationUser, (req, res) => {
	Promise.try(() => getOrderHistory(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ORDER_HISTORY", err))
})

// Order history single
router.get(
	"/order/history/single/:order_id",
	authenticationUser,
	(req, res) => {
		Promise.try(
			() =>
				req.query.id
					? getOrderHistorySingleLogged(req.params.order_id, req.query.id)
					: getOrderHistorySingle(req.params.order_id)
		)
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on GET_ORDER_HISTORY", err))
	}
)

// Order history single
router.get(
	"/order/history/single/:order_id/admin",
	authenticationAdmin,
	(req, res) => {
		Promise.try(
			() =>
				req.query.id
					? getOrderHistorySingleLogged(req.params.order_id, req.query.id)
					: getOrderHistorySingle(req.params.order_id)
		)
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on GET_ORDER_HISTORY", err))
	}
)

// Order recent
router.get("/order/recent/:id", authenticationUser, (req, res) => {
	Promise.try(() => getOrderRecent(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ORDER_RECENT", err))
})

// Order recent single
router.get("/order/recent/single/:order_id", authenticationUser, (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getOrderRecentSingleLogged(req.params.order_id, req.query.id)
				: getOrderRecentSingle(req.params.order_id)
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ORDER_RECENT", err))
})

module.exports = router
