exports.errorResponse = (message, status) => ({
	name: 'error',
	message: message,
	status: status
})

exports.successResponse = (response, message, status) => ({
	name: 'success',
	message: message,
	status: status,
	id: response.id,
	accessToken: response.accessToken,
	refreshToken: response.refreshToken
})
