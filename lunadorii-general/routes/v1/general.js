const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const {
	getBanks
} = require('../../dispatchers/banks')

// Get all banks
router.get('/general/banks', (req, res) => {
	Promise.try(() => getBanks())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_BANKS', err))
})

module.exports = router