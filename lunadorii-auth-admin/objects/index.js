const accessTokenAdminJwtObejct = {
	subject: "lunadorii-access-token-admin",
	algorithm: "HS256",
	expiresIn: "7d",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

const refreshTokenAdminJwtObject = {
	subject: "lunadorii-refresh-token-admin",
	algorithm: "HS256",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

const forgotPasswordAdminJwtObject = {
	subject: "lunadorii-forgot-password-admin",
	algorithm: "HS256",
	expiresIn: "3d",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

module.exports = {
	accessTokenAdminJwtObejct,
	refreshTokenAdminJwtObject,
	forgotPasswordAdminJwtObject
}
