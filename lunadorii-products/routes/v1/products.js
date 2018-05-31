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

// Get Product with Product Id
router.get('/product/:product_id', authentication, (req, res) => {
	Promise.resolve(() => retrieveProductByProductId(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log('Error on GET_PRODUCT_BY_PRODUCT_ID', err))
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