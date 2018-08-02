const express = require("express")
const Promise = require("bluebird")
const { authenticationAdmin } = require("../../middleware/authentication")
const router = express.Router()
const {
	getBannersAdmin,
	getBanners,
	getBannersBestSeller,
	getProductBanners,
	getProductBannersLogged
} = require("../../dispatchers/banners")

// Get all banners
router.get("/banners/admin", authenticationAdmin, (req, res) => {
	Promise.try(() => getBannersAdmin())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BANNERS_ADMIN", err))
})

// Get all banners
router.get("/banners", (req, res) => {
	Promise.try(() => getBanners())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BANNERS", err))
})

// Get all banners best seller
router.get("/banners/best-seller", (req, res) => {
	Promise.try(() => getBannersBestSeller())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BANNERS_BEST_SELLER", err))
})

// Get all banners
router.get("/product-banners/:banner_id", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getProductBannersLogged(req.params.banner_id, req.query.id)
				: getProductBanners(req.params.banner_id)
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BANNERS", err))
})

module.exports = router
