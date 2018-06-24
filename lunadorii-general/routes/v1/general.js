const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const {
	getProvinces
} = require('../../dispatchers')

// Get all provinces
router.get('/general/provinces', (req, res) => {
	Promise.try(() => getProvinces())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_PROVINCES', err))
})

module.exports = router