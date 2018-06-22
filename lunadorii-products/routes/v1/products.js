const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const authentication = require('../../middleware/authentication')
const {
	getAllProducts,
	getSingleProduct,
	getProductBrands,
	getProductBrandsWithProducts,
	getProductCategories,
	getProductCategoriesWithSubcategories,
	getProductSubcategories,
	getProductSubcategoriesWithProducts,
	updateProduct,
	deleteProduct
} = require('../../dispatchers/products')
const { addWishlist, getWishlist, removeWishlist } = require('../../dispatchers/wishlist')
const { addCart, getCart } = require('../../dispatchers/cart')

// Get All Products
router.get('/products', (req, res) => {
	Promise.try(() => getAllProducts())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCTS', err))
})

// Get Single Product
router.get('/product/:product_id', (req, res) => {
	Promise.try(() => getSingleProduct(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_SINGLE_PRODUCT', err))
})

// Update Product
router.put('/product/:product_id', authentication, (req, res) => {
	Promise.try(() => updateProduct(req.params.product_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on UPDATE_PRODUCT', err))
})

// Delete Product
router.delete('/product/:product_id', authentication, (req, res) => {
	Promise.try(() => deleteProduct(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on DELETE_PRODUCT', err))
})

// Get All Product Brands
router.get('/product-brands', (req, res) => {
	Promise.try(() => req.query.with_product ? getProductBrandsWithProducts() : getProductBrands())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCT_BRANDS', err))
})

// Get All Product Categories
router.get('/product-categories', (req, res) => {
	Promise.try(() => req.query.with_subcategories ? getProductCategoriesWithSubcategories() : getProductCategories() )
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCT_CATEGORIES', err))
})

// Get All Product Categories
router.get('/product-subcategories', (req, res) => {
	Promise.try(() => req.query.with_products ? getProductSubcategoriesWithProducts() : getProductSubcategories())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCT_SUBCATEGORIES', err))
})

// Add Wishlist
router.post('/wishlist', authentication, (req, res) => {
	Promise.try(() => addWishlist(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on ADD_WISHLIST', err))
})

// Get Wishlist
router.get('/wishlist/:id', authentication, (req, res) => {
	Promise.try(() => getWishlist(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_WISHLIST', err))
})

// Delete Wishlist
router.delete('/wishlist/:wishlist_id', authentication, (req, res) => {
	Promise.try(() => removeWishlist(req.params.wishlist_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on DELETE_WISHLIST', err))
})

// Add My Cart
router.post('/cart', authentication, (req, res) => {
	Promise.try(() => addCart(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on ADD_MY_CART', err))
})

// Get My Cart
router.get('/cart/:id', authentication, (req, res) => {
	Promise.try(() => getCart(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_MY_CART', err))
})

module.exports = router