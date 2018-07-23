const accessTokenUserJwtObejct = {
	subject: "lunadorii-access-token-user",
	algorithm: "HS256",
	expiresIn: "7d",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

const refreshTokenUserJwtObject = {
	subject: "lunadorii-refresh-token-user",
	algorithm: "HS256",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

const forgotPasswordUserJwtObject = {
	subject: "lunadorii-forgot-password-user",
	algorithm: "HS256",
	expiresIn: "3d",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

module.exports = {
	accessTokenUserJwtObejct,
	refreshTokenUserJwtObject,
	forgotPasswordUserJwtObject
}
