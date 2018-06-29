require('dotenv').config({path: __dirname+'/./../../.env'})
const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const NestHydrationJS = require('nesthydrationjs')()
const authentication = require('../../middleware/authentication')

// Register user
router.post('/user/register', (req, res) => {
	Promise.try(() => registerUser(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_REGISTER_USER', err))
})