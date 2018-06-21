const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const {
	getBanners
} = require('../../dispatchers')

// Get all banners
router.get('/banners', (req, res) => {
	Promise.try(() => getBanners())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_BANNERS', err))
})

module.exports = router