const express = require('express')
const Promise = require('bluebird')
const router = express.Router()
const authentication = require('../../middleware/authentication')
const {
	retrieveProducts,
	retrieveProductByProductId,
	updateProduct,
	deleteProduct
} = require('../../dispatchers/products')

// Get All Products
router.get('/products', authentication, (req, res) => {
	Promise.resolve(() => retrieveProducts())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_ALL_PRODUCTS', err))
})

// Get Single Product
router.get('/product/:product_id', authentication, (req, res) => {
	Promise.resolve(() => retrieveSingleProduct(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_SINGLE_PRODUCT', err))
})

// Update Product
router.put('/product/:product_id', authentication, (req, res) => {
	Promise.resolve(() => updateProduct(req.params.product_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on UPDATE_PRODUCT', err))
})

// Delete Product
router.delete('/product/:product_id', authentication, (req, res) => {
	Promise.resolve(() => deleteProduct(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on DELETE_PRODUCT', err))
})