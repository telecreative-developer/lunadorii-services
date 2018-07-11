require("dotenv").config({ path: __dirname + "/./../../.env" })
const jwt = require("jsonwebtoken")

function errorResponse(res, messageEx, err) {
	res.status(401).json({
		name: "error",
		message: messageEx ? messageEx : err.message,
		status: 401
	})
}

function authentication(req, res, next) {
	const token = req.headers.authorization
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				errorResponse(res, err)
			} else {
				req.decoded = decoded
				next()
			}
		})
	} else {
		errorResponse(res, "Token not provided")
	}
}

module.exports = authentication
