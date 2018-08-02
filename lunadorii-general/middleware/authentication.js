require("dotenv").config({ path: __dirname + "/./../../.env" })
const jwt = require("jsonwebtoken")

function errorResponse(response, error, statusCode) {
	response.status(statusCode).json({
		name: "error",
		message: error,
		status: statusCode
	})
}

function authenticationUser(req, res, next) {
	const token = req.headers.authorization

	const checkTokenAsync = () => {
		return new Promise((resolve, reject) => {
			token
				? resolve(token)
				: reject(errorResponse(res, "Token not provided", 401))
		})
	}

	const checkScopeTokenAsync = token => {
		return new Promise((resolve, reject) => {
			return jwt.verify(
				token,
				process.env.JWT_SECRET_USER_ACCESS_TOKEN,
				(err, decoded) => {
					if (decoded) {
						if (decoded.scope === "access-token-user") {
							resolve(token)
						} else {
							reject(
								errorResponse(
									res,
									"Your token does not have permission to access",
									403
								)
							)
						}
					} else {
						reject(
							errorResponse(
								res,
								"Your token does not have permission to access",
								403
							)
						)
					}
				}
			)
		})
	}

	const authAsync = token => {
		return new Promise((resolve, reject) => {
			return jwt.verify(
				token,
				process.env.JWT_SECRET_USER_ACCESS_TOKEN,
				(err, decoded) => {
					err
						? reject(errorResponse(res, "Authentication failed", 500))
						: resolve(decoded)
				}
			)
		})
	}

	return checkTokenAsync()
		.then(token => checkScopeTokenAsync(token))
		.then(token => authAsync(token))
		.then(decoded => {
			req.decoded = decoded
			return next()
		})
		.catch(err => console.log(err))
}

function authenticationAdmin(req, res, next) {
	const token = req.headers.authorization

	const checkTokenAsync = () => {
		return new Promise((resolve, reject) => {
			token
				? resolve(token)
				: reject(errorResponse(res, "Token not provided", 401))
		})
	}

	const checkScopeTokenAsync = token => {
		return new Promise((resolve, reject) => {
			return jwt.verify(
				token,
				process.env.JWT_SECRET_ADMIN_ACCESS_TOKEN,
				(err, decoded) => {
					if (decoded) {
						if (decoded.scope === "access-token-admin") {
							resolve(token)
						} else {
							reject(
								errorResponse(
									res,
									"Your token does not have permission to access",
									403
								)
							)
						}
					} else {
						reject(
							errorResponse(
								res,
								"Your token does not have permission to access",
								403
							)
						)
					}
				}
			)
		})
	}

	const authAsync = token => {
		return new Promise((resolve, reject) => {
			return jwt.verify(
				token,
				process.env.JWT_SECRET_ADMIN_ACCESS_TOKEN,
				(err, decoded) => {
					err
						? reject(errorResponse(res, "Authentication failed", 500))
						: resolve(decoded)
				}
			)
		})
	}

	return checkTokenAsync()
		.then(token => checkScopeTokenAsync(token))
		.then(token => authAsync(token))
		.then(decoded => {
			req.decoded = decoded
			return next()
		})
		.catch(err => err)
}

module.exports = { authenticationUser, authenticationAdmin }
