const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const { authenticationAdmin } = require("../../middleware/authentication")
const { getDashboardInfo } = require("../../dispatchers/dashboard")
const { getBanks } = require("../../dispatchers/banks")
const { getPlaces } = require("../../dispatchers/places")
const { getOngkir } = require("../../dispatchers/ongkir")
const { sendLinkApp } = require("../../dispatchers/link")
const {
	addCareerCategory,
	updateCareerCategory,
	addCareer,
	updateCareer,
	getCareerCategories,
	getSingleCareerCategory,
	getSingleCareer
} = require("../../dispatchers/careers")
const {
	getBlogCategories,
	getSingleBlogCategory,
	getBlogs,
	getSingleBlog
} = require("../../dispatchers/blogs")

// Get all banks
router.get("/general/banks", (req, res) => {
	Promise.try(() => getBanks())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BANKS", err))
})

// Get all places
router.get("/general/places", (req, res) => {
	Promise.try(() => getPlaces())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_PLACES", err))
})

// Get ongkir
router.post("/general/ongkir", (req, res) => {
	Promise.try(() => getOngkir(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ONGKIR", err))
})

// Send App Link
router.post("/general/send-link-app", (req, res) => {
	Promise.try(() => sendLinkApp(req.body.email))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ONGKIR", err))
})

// Get info dashboard admin
router.get("/general/dashboard/admin", authenticationAdmin, (req, res) => {
	Promise.try(() => getDashboardInfo())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_DASHBOARD_INFO", err))
})

// Add career category
router.post("/general/career-category", authenticationAdmin, (req, res) => {
	Promise.try(() => addCareerCategory(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_CAREER_CATEGORY", err))
})

// Update career category
router.put(
	"/general/career-category/:career_category_id",
	authenticationAdmin,
	(req, res) => {
		Promise.try(() =>
			updateCareerCategory(req.params.career_category_id, req.body)
		)
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on UPDATE_CAREER_CATEGORY", err))
	}
)

// Get career categories
router.get("/general/career-categories", (req, res) => {
	Promise.try(() => getCareerCategories())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_CAREER_CATEGORIES", err))
})

// Get single career category
router.get("/general/career-category/:slug", (req, res) => {
	Promise.try(() => getSingleCareerCategory(req.params.slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_CAREER_CATEGORY", err))
})

// Add career
router.post("/general/career", authenticationAdmin, (req, res) => {
	Promise.try(() => addCareer(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_CAREER", err))
})

// Update career
router.put("/general/career/:career_id", authenticationAdmin, (req, res) => {
	Promise.try(() => updateCareer(req.params.career_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UPDATE_CAREER", err))
})

// Get single career
router.get("/general/career/:slug", (req, res) => {
	Promise.try(() => getSingleCareer(req.params.slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_CAREER", err))
})

// Get blog categories
router.get("/general/blog-categories", (req, res) => {
	Promise.try(() => getBlogCategories())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BLOG_CATEGORIES", err))
})

// Get single blog category
router.get("/general/blog-category/:slug", (req, res) => {
	Promise.try(() => getSingleBlogCategory(req.params.slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_BLOG_CATEGORY", err))
})

// Get blogs
router.get("/general/blogs", (req, res) => {
	Promise.try(() => getBlogs())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_BLOGS", err))
})

// Get single blog
router.get("/general/blog/:slug", (req, res) => {
	Promise.try(() => getSingleBlog(req.params.slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_BLOG", err))
})

module.exports = router
