const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const authentication = require('../../middleware/authentication')
const {
	getAllProducts,
	getAllProductsLogged,
	getSingleProduct,
	getSingleProductLogged,
	getSingleProductWithSlug,
	getSingleProductWithSlugLogged,
	getProductsWithSubcategory,
	getProductsWithSubcategoryLogged,
	getProductBrands,
	getProductBrandsWithProducts,
	getProductCategories,
	getProductCategoriesWithSubcategories,
	getProductSubcategories,
	getProductSubcategoriesWithProducts,
	updateProduct,
	deleteProduct,
	getAllProductsTest
} = require('../../dispatchers/products')
const { addWishlist, getWishlist, removeWishlist } = require('../../dispatchers/wishlist')
const { addCart, getCart, updateCartQty, removeCart } = require('../../dispatchers/cart')

// Get All Products
router.get('/products', (req, res) => {
	Promise.try(() => req.query.id ? getAllProductsLogged(req.query.id) : getAllProducts())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCTS', err))
})

// Get All Products
router.get('/products/test', (req, res) => {
	Promise.try(() => getAllProductsTest())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCTS', err))
})


// Get Single Product
router.get('/product/:product_id', (req, res) => {
	Promise.try(() => req.query.id ? getSingleProductLogged(req.params.product_id, req.query.id) : getSingleProduct(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_SINGLE_PRODUCT', err))
})

// Get Single Product with Slug
router.get('/product/slug/:product_slug', (req, res) => {
	Promise.try(() => req.query.id ? getSingleProductWithSlugLogged(req.params.product_slug, req.query.id) : getSingleProductWithSlug(req.params.product_slug))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_SINGLE_PRODUCT_WITH_SLUG', err))
})

// Get Product with Subcategory
router.get('/product/subcategory/:product_subcategory_id', (req, res) => {
	Promise.try(() => req.query.id ? getProductsWithSubcategoryLogged(req.params.product_subcategory_id, req.query.id) : getProductsWithSubcategory(req.params.product_subcategory_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_PRODUCT_WITH_SUBCATEGORY', err))
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
router.delete('/wishlist', authentication, (req, res) => {
	Promise.try(() => removeWishlist(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on DELETE_WISHLIST', err))
})

// Add Cart
router.post('/cart', authentication, (req, res) => {
	Promise.try(() => addCart(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on ADD_CART', err))
})

// Get Cart
router.get('/cart/:id', authentication, (req, res) => {
	Promise.try(() => getCart(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_CART', err))
})

// Update Cart Qty
router.put('/cart/:cart_id', authentication, (req, res) => {
	Promise.try(() => updateCartQty(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on UPDATE_CART_QTY', err))
})

// Delete Cart
router.delete('/cart', authentication, (req, res) => {
	Promise.try(() => removeCart(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on DELETE_CART', err))
})

module.exports = router