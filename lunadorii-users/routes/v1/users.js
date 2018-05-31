const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const redis = require('redis')
const redisClient = redis.createClient()
const cache = require('../../middleware/redis')
const authentication = require('../../middleware/authentication')
const {
	retrieveUsers,
	retrieveUserById,
	registerUser,
	updatePassword
} = require('../../dispatchers')

// Get All Users
router.get('/users', authentication, (req, res) => {
	Promise.try(() => retrieveUsers())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_USERS', err))
})

// Get User with Id
router.get('/user/:id', cache, authentication, (req, res) => {
	Promise.try(() => retrieveUserById(req.params.id))
		.then(response => {
			redisClient.set(req.params.id, JSON.stringify(response), 'EX', 3600)
			return res.status(response.status).json(response)
		})
		.catch(err => console.log('Error on GET_ALL_USERS', err))
})

// Register user
router.post('user/register', (req, res) => {
	Promise.try(() => registerUser(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_USERS', err))
})

// Update user
router.put('/user/:id', authentication, (req, res) => {
	Promise.try(() => updateUser(req.params.id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_USERS', err))
})

// Change password
router.put('user/change-password/:id', authentication, function(req, res) {
	Promise.try(() => updatePassword(req.params.id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_USERS', err))
})

module.exports = router
