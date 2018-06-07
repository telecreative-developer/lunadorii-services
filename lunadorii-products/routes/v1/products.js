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
	updateProduct,
	deleteProduct
} = require('../../dispatchers/products')
const { getCart } = require('../../dispatchers/cart')

// Get All Products
router.get('/products', authentication, (req, res) => {
	Promise.try(() => getAllProducts())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCTS', err))
})

// Get Single Product
router.get('/product/:product_id', authentication, (req, res) => {
	Promise.try(() => getSingleProduct(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_SINGLE_PRODUCT', err))
})

// Get All Product Brands
router.get('/product-brands', authentication, (req, res) => {
	Promise.try(() => req.query.with_product ? getProductBrandsWithProducts() : getProductBrands())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCT_BRANDS', err))
})

// Get All Product Catgeories
router.get('/product-categories', authentication, (req, res) => {
	Promise.try(() => req.query.with_subcategories ? getProductCategoriesWithSubcategories() : getProductCategories() )
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCT_CATEGORIES', err))
})

// Get All Product Catgeories
router.get('/product-subcategories', authentication, (req, res) => {
	Promise.try(() => getProductSubcategories())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCT_SUBCATEGORIES', err))
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

// Get My Cart
router.get('/cart/:id', authentication, (req, res) => {
	Promise.try(() => getCart(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_MY_CART', err))
})

// Add My Cart
router.post('/cart', authentication, (req, res) => {
	Promise.try(() => getCart())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on ADD_MY_CART', err))
})

module.exports = router