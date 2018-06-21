const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const authentication = require('../../middleware/authentication')
const {
	getAdmin,
	getAdminById,
	registerAdmin,
	updateAdmin,
	updateUsername,
	updateEmail,
	updatePassword
} = require('../../dispatchers')

// Get all admin
router.get('/admin', authentication, (req, res) => {
	Promise.try(() => getAdmin())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_ADMIN', err))
})

// Get admin with Id
router.get('/admin/:admin_id', authentication, (req, res) => {
	Promise.try(() => getAdminById(req.params.admin_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_ADMIN_WITH_ID', err))
})

// Update admin
router.put('/admin/:admin_id', authentication, (req, res) => {
	Promise.try(() => updateAdmin(req.params.admin_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_UPDATE_ADMIN', err))
})

// Register admin
router.post('/admin/register', (req, res) => {
	Promise.try(() => registerAdmin(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_REGISTER_ADMIN', err))
})

// Change username
router.put('/admin/change-username/:admin_id', authentication, function(req, res) {
	Promise.try(() => updateUsername(req.params.admin_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on CHANGE_USERNAME', err))
})

// Change email
router.put('/admin/change-email/:admin_id', authentication, function(req, res) {
	Promise.try(() => updateEmail(req.params.admin_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on CHANGE_EMAIL', err))
})

// Change password
router.put('/admin/change-password/:admin_id', authentication, function(req, res) {
	Promise.try(() => updatePassword(req.params.admin_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on CHANGE_PASSWORD', err))
})

module.exports = router