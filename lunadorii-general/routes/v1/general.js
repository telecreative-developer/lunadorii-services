const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const {
	getBanks
} = require('../../dispatchers/banks')
const {
	getPlaces
} = require('../../dispatchers/places')

// Get all banks
router.get('/general/banks', (req, res) => {
	Promise.try(() => getBanks())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_BANKS', err))
})

// Get all places
router.get('/general/places', (req, res) => {
	Promise.try(() => getPlaces())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_PLACES', err))
})

module.exports = router