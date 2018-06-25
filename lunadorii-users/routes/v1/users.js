const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const authentication = require('../../middleware/authentication')
const {
	getUsers,
	getUserById,
	registerUser,
	checkEmail,
	updateUser,
	updateEmail,
	updatePassword,
	getUserAdresses,
	getUserBanks
} = require('../../dispatchers')

// Get All Users
router.get('/users', authentication, (req, res) => {
	Promise.try(() => getUsers())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_USERS', err))
})

// Get User with Id
router.get('/user/:id', authentication, (req, res) => {
	Promise.try(() => getUserById(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_USER_BY_ID', err))
})

// Update user
router.put('/user/:id', authentication, (req, res) => {
	Promise.try(() => updateUser(req.params.id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_UPDATE_USER', err))
})

// Register user
router.post('/user/register', (req, res) => {
	Promise.try(() => registerUser(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_REGISTER_USER', err))
})

// Check email
router.post('/user/check-email', function(req, res) {
	Promise.try(() => checkEmail(req.body.email))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on CHECK_EMAIL', err))
})

// Change email
router.put('/user/change-email/:id', authentication, function(req, res) {
	Promise.try(() => updateEmail(req.params.id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on CHANGE_EMAIL', err))
})

// Change password
router.put('/user/change-password/:id', authentication, function(req, res) {
	Promise.try(() => updatePassword(req.params.id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on CHANGE_PASSWORD', err))
})

// Get user addresses
router.get('/user-addresses/:id', authentication, (req, res) => {
	Promise.try(() => getUserAdresses(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_USER_ADDRESSES', err))
})

// Get user banks
router.get('/user-banks/:id', authentication, (req, res) => {
	Promise.try(() => getUserBanks(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_USER_BANKS', err))
})

module.exports = router
