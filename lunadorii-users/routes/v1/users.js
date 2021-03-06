require("dotenv").config({ path: __dirname + "/./../../.env" })
const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const NestHydrationJS = require("nesthydrationjs")()
const {
	authenticationUser,
	authenticationAdmin
} = require("../../middleware/authentication")
const {
	getUsers,
	getSingleUser,
	registerUser,
	checkEmail,
	updateUser,
	updateEmail,
	updatePassword,
	updateAvatar
} = require("../../dispatchers/users")
const {
	addUserAddress,
	getUserAddresses,
	updateUserAddress,
	setDefaultUserAddress,
	deleteUserAddress
} = require("../../dispatchers/addresses")
const {
	addUserBank,
	getUserBanks,
	updateUserBank,
	setDefaultUserBank,
	deleteUserBank
} = require("../../dispatchers/banks")
const {
	addUserCreditCard,
	getUserCreditCard,
	updateUserCreditCard,
	setDefaultUserCreditCard,
	deleteUserCreditCard
} = require("../../dispatchers/creditcard")
const {
	addUserReview,
	getUserReviews,
	updateUserReview,
	deleteUserReview
} = require("../../dispatchers/reviews")

// Get All Users
router.get("/users", authenticationAdmin, (req, res) => {
	Promise.try(() => getUsers())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_USERS", err))
})

// Get Single User
router.get("/user/:id", authenticationUser, (req, res) => {
	Promise.try(() => getSingleUser(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_USER_BY_ID", err))
})

// Update user
router.put("/user/:id", authenticationUser, (req, res) => {
	Promise.try(() => updateUser(req.params.id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UPDATE_USER", err))
})

// Update avatar user
router.put("/user/update-avatar/:id", authenticationUser, (req, res) => {
	Promise.try(() => updateAvatar(req.params.id, req.body.avatar))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UPDATE_AVATAR_USER", err))
})

// Register user
router.post("/user/register", (req, res) => {
	Promise.try(() => registerUser(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on REGISTER_USER", err))
})

// Check email
router.post("/user/check-email", function(req, res) {
	Promise.try(() => checkEmail(req.body.email))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on CHECK_EMAIL", err))
})

// Change email
router.put("/user/change-email/:id", authenticationUser, function(req, res) {
	Promise.try(() => updateEmail(req.params.id, req.body.email))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on CHANGE_EMAIL", err))
})

// Change password
router.put("/user/change-password/:id", authenticationUser, function(req, res) {
	Promise.try(() => updatePassword(req.params.id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on CHANGE_PASSWORD", err))
})

// Add user address
router.post("/user-address", authenticationUser, (req, res) => {
	Promise.try(() => addUserAddress(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_USER_ADDRESS", err))
})

// Get user addresses
router.get("/user-addresses/:id", authenticationUser, (req, res) => {
	Promise.try(() => getUserAddresses(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_USER_ADDRESSES", err))
})

// Update user address
router.put("/user-address/:user_address_id", authenticationUser, (req, res) => {
	Promise.try(() => updateUserAddress(req.params.user_address_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_USER_ADDRESS", err))
})

// Set default user address
router.put(
	"/user-address/set-default/:user_address_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() =>
			setDefaultUserAddress(req.params.user_address_id, req.body.id)
		)
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on SET_DEFAULT_USER_ADDRESS", err))
	}
)

// Delete user address
router.delete(
	"/user-address/:user_address_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() => deleteUserAddress(req.params.user_address_id))
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on GET_USER_ADDRESS", err))
	}
)

// Add user bank
router.post("/user-bank", authenticationUser, (req, res) => {
	Promise.try(() => addUserBank(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_USER_BANK", err))
})

// Get user banks
router.get("/user-banks/:id", authenticationUser, (req, res) => {
	Promise.try(() => getUserBanks(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_USER_BANKS", err))
})

// Update user banks
router.put("/user-bank/:user_bank_id", authenticationUser, (req, res) => {
	Promise.try(() => updateUserBank(req.params.user_bank_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UPDATE_USER_BANK", err))
})

// Set default user bank
router.put(
	"/user-bank/set-default/:user_bank_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() => setDefaultUserBank(req.params.user_bank_id, req.body.id))
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on SET_DEFAULT_USER_BANK", err))
	}
)

// Delete user bank
router.delete("/user-bank/:user_bank_id", authenticationUser, (req, res) => {
	Promise.try(() => deleteUserBank(req.params.user_bank_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on DELETE_USER_BANK", err))
})

// Add user credit card
router.post("/user-creditcard", authenticationUser, (req, res) => {
	Promise.try(() => addUserCreditCard(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_USER_CREDITCARD", err))
})

// Get user credit card
router.get("/user-creditcard/:id", authenticationUser, (req, res) => {
	Promise.try(() => getUserCreditCard(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_USER__CREDITCARD", err))
})

// Update user credit card
router.put(
	"/user-creditcard/:user_creditcard_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() =>
			updateUserCreditCard(req.params.user_creditcard_id, req.body)
		)
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on UPDATE_USER_CREDITCARD", err))
	}
)

// Set default user credit card
router.put(
	"/user-creditcard/set-default/:user_creditcard_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() =>
			setDefaultUserCreditCard(req.params.user_creditcard_id, req.body.id)
		)
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on SET_DEFAULT_USER_CREDITCARD", err))
	}
)

// Delete user credit card
router.delete(
	"/user-creditcard/:user_creditcard_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() => deleteUserCreditCard(req.params.user_creditcard_id))
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on DELETE_USER_CREDITCARD", err))
	}
)

// Get add review
router.post("/user-review", authenticationUser, (req, res) => {
	Promise.try(() => addUserReview(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_USER_REVIEWS", err))
})

// Get user reviews
router.get("/user-reviews/:id", authenticationUser, (req, res) => {
	Promise.try(() => getUserReviews(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_USER_REVIEWS", err))
})

// Update user review
router.put(
	"/user-review/:product_review_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() => updateUserReview(req.params.product_review_id, req.body))
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on UPDATE_USER_REVIEWS", err))
	}
)

// Delete user reviews
router.delete(
	"/user-review/:product_review_id",
	authenticationUser,
	(req, res) => {
		Promise.try(() => deleteUserReview(req.params.product_review_id))
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on DELETE_USER_REVIEW", err))
	}
)

module.exports = router
