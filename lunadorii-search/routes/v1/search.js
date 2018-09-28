const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const { search, searchLogged, searchBaseOnBrands } = require("../../dispatchers/search")

// Search
router.get("/search", (req, res) => {
	Promise.try(
		() => (req.query.id ? searchLogged(req.query) : search(req.query))
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on SEARCH", err))
})

// Search base on brands
router.get("/search/brands", (req, res) => {
	Promise.try(() => searchBaseOnBrands(req.query))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on SEARCH BASE ON BRANDS", err))
})

module.exports = router
