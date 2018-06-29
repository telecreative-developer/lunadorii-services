require('dotenv').config({path: __dirname+'/./../../.env'})
const jwt = require('jsonwebtoken')

function errorResponse(res, messageEx, statusCode, err) {
  res.status(statusCode).json({
		name: 'error',
		message: messageEx ? messageEx : err.message,
		status: statusCode
	})
}

function authentication(req, res, next) {
	const token = req.headers.authorization
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				errorResponse(res, err, 401)
			} else {
				if(decoded.role === 'admin') {
					req.decoded = decoded
					next()
				}else {
					errorResponse(res, 'You don\'t have permission to access admin', 403)
				}
			}
		})
	} else {
		errorResponse(res, 'Token not provided', 401)
	}
}

module.exports = authentication
