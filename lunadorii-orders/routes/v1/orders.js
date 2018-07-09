require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const authentication = require("../../middleware/authentication")

// Post order
router.post("/order/checkout", (req, res) => {
	Promise.try(() => postOrder(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on SEND_ORDER", err))
})

module.exports = router
