require('dotenv/config')
const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')

router.post('/auth/admin', (req, res) => {
	passport.authenticate('local', {session: false}, (error, response, info) => {
		if (error || !response) {
      return res.status(400).json({
      	name: 'error',
        message: info ? info.message : 'Login failed',
        status: 400
      })
    }

		req.login(response, {session: false}, (err) => {
    	if (err) {
      	return res.status(500).json({
      		name: 'error',
					message: err,
					status: 500
				})
      }

      const accessToken = jwt.sign({admin_id: response.admin_id, role: 'admin'}, process.env.JWT_SECRET_KEY, {
      	subject: 'lunadorii',
		    algorithm: 'HS256',
		    expiresIn: '7d',
		    issuer: 'https://github.com/kevinhermawan',
		    header: {
		      typ: 'JWT'
		    }
      })

      const refreshToken = jwt.sign({admin_id: response.admin_id, role: 'admin'}, process.env.JWT_SECRET_KEY, {
      	subject: 'lunadorii',
		    algorithm: 'HS256',
		    expiresIn: '10d',
		    issuer: 'https://github.com/kevinhermawan',
		    header: {
		      typ: 'JWT'
		    }
      })

     	return res.status(201).json({
     		name: 'success',
				message: 'Login Success',
				status: 201,
				accessToken,
				refreshToken
			})
    })
	})(req, res)
})

module.exports = router