const emailVerificationJwtObject = {
	subject: "lunadorii-email-verification-user",
	algorithm: "HS256",
	expiresIn: "3d",
	issuer: "https://github.com/kevinhermawan",
	header: {
		typ: "JWT"
	}
}

module.exports = { emailVerificationJwtObject }
