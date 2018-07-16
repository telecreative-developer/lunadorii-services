const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const { search, searchLogged } = require("../../dispatchers/search")

// Search
router.get("/search", (req, res) => {
	Promise.try(
		() => (req.query.id ? searchLogged(req.query) : search(req.query))
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on SEARCH", err))
})

module.exports = router
