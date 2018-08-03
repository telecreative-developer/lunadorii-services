const express = require("express")
const Promise = require("bluebird")
const { authenticationAdmin } = require("../../middleware/authentication")
const router = express.Router()
const {
	getBannersAdmin,
	getBanners,
	addBanner,
	updateBanner,
	removeBanner,
	activeBanner,
	unactiveBanner,
	getBannersBestSeller,
	getProductBanners,
	getProductBannersLogged
} = require("../../dispatchers/banners")

// Add banners
router.post("/banner", authenticationAdmin, (req, res) => {
	Promise.try(() => addBanner(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_BANNER", err))
})

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

// Active Banner
router.put("/banner/:banner_id/active", authenticationAdmin, (req, res) => {
	Promise.try(() => activeBanner(req.params.banner_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ACTIVE_BANNER", err))
})

// Unactive Banner
router.put("/banner/:banner_id/unactive", authenticationAdmin, (req, res) => {
	Promise.try(() => unactiveBanner(req.params.banner_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UNACTIVE_BANNER", err))
})

// Get all banners best seller
router.get("/banners/best-seller", (req, res) => {
	Promise.try(() => getBannersBestSeller())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BANNERS_BEST_SELLER", err))
})

// Update Banner
router.put("/banner/:banner_id", authenticationAdmin, (req, res) => {
	Promise.try(() => updateBanner(req.params.banner_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on REMOVE_BANNER", err))
})

// Delete Banner
router.delete("/banner/:banner_id", authenticationAdmin, (req, res) => {
	Promise.try(() => removeBanner(req.params.banner_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on REMOVE_BANNER", err))
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
