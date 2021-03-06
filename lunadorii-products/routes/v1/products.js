const express = require("express")
const Promise = require("bluebird")
const router = express.Router()
const {
	authenticationUser,
	authenticationAdmin
} = require("../../middleware/authentication")
const {
	getAllProducts,
	getAllProductsDiscount,
	getAllProductsLogged,
	getSingleProduct,
	getSingleProductLogged,
	getSingleProductWithSlug,
	getSingleProductWithSlugLogged,
	getProductsWithSubcategory,
	getProductsWithSubcategoryLogged,
	getProductsWithBrand,
	getProductsWithBrandLogged,
	getProductBrands,
	postProductBrands,
	updateProductBrands,
	deleteProductBrands,
	getProductBrandsWithProducts,
	getTopProductBrands,
	getTopProductBrandsWithProducts,
	getProductCategories,
	getProductCategoriesWithSubcategories,
	addProductSubcategories,
	updateProductSubcategories,
	deleteProductSubcategories,
	getProductSubcategories,
	getProductSubcategoriesWithProducts,
	addProduct,
	addProductThumbnails,
	removeProductThumbnail,
	updateProduct,
	deleteProduct,
	getAllNewArrivalsProductsLogged,
	getAllNewArrivalsProducts,
	getAllTopProductsLogged,
	getAllTopProducts,
	getAllTodayOffersProductsLogged,
	getAllTodayOffersProducts,
	getRelatedProducts,
	getRelatedProductsLogged,
	getBestSellerProducts,
	getBestSellerProductsLogged,
	getBestSellerSubcategories,
	getBestSellerSubcategoriesWithProducts
} = require("../../dispatchers/products")
const {
	addWishlist,
	getWishlist,
	removeWishlist
} = require("../../dispatchers/wishlist")
const {
	addCart,
	getCart,
	updateCartQty,
	removeCart
} = require("../../dispatchers/cart")

// Get All Products
router.get("/products", (req, res) => {
	Promise.try(
		() => (req.query.id ? getAllProductsLogged(req.query.id) : getAllProducts())
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCTS", err))
})

router.get("/products_discount", (req, res) => {
	Promise.try(
		() => (req.query.id ? getAllProductsLogged(req.query.id) : getAllProductsDiscount())
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCTS_DISCOUNT", err))
})

// Get New Arrivals Products
router.get("/products/new-arrivals", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getAllNewArrivalsProductsLogged(req.query.id)
				: getAllNewArrivalsProducts()
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCTS_NEW_ARRIVALS", err))
})

// Get Products Best Seller
router.get("/products/best-seller", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getBestSellerProductsLogged(req.query.id)
				: getBestSellerProducts()
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCTS_BEST_SELLER", err))
})

// Get Related Products
router.get("/products/related/:product_id", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getRelatedProductsLogged(req.params.product_id, req.query.id)
				: getRelatedProducts(req.params.product_id)
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_RELATED_PRODUCTS", err))
})

// Get Single Product
router.get("/product/:product_id", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getSingleProductLogged(req.params.product_id, req.query.id)
				: getSingleProduct(req.params.product_id)
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_PRODUCT", err))
})

// Get Single Product with Slug
router.get("/product/slug/:product_slug", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getSingleProductWithSlugLogged(req.params.product_slug, req.query.id)
				: getSingleProductWithSlug(req.params.product_slug)
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_SINGLE_PRODUCT_WITH_SLUG", err))
})

// Get Products with Subcategory
router.get("/products/subcategory/:product_subcategory_id", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getProductsWithSubcategoryLogged(
						req.params.product_subcategory_id,
						req.query.id
				  )
				: getProductsWithSubcategory(req.params.product_subcategory_id)
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_PRODUCTS_WITH_SUBCATEGORY", err))
})

// Get Products with Brands
router.get("/products/brand/:product_brand_id", (req, res) => {
	Promise.try(
		() =>
			req.query.id
				? getProductsWithBrandLogged(req.params.product_brand_id, req.query.id)
				: getProductsWithBrand(req.params.product_brand_id)
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_PRODUCTS_WITH_BRAND", err))
})

// Add product
router.post("/product", authenticationAdmin, (req, res) => {
	Promise.try(() => addProduct(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_PRODUCT", err))
})

// Add product thumbnails
router.post("/product-thumbnails", authenticationAdmin, (req, res) => {
	Promise.try(() => addProductThumbnails(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_PRODUCT_THUMBNAILS", err))
})

// Delete product thumbnails
router.delete(
	"/product-thumbnail/:product_thumbnail_id",
	authenticationAdmin,
	(req, res) => {
		Promise.try(() => removeProductThumbnail(req.params.product_thumbnail_id))
			.then(response => res.status(response.status).json(response))
			.catch(err => console.log("Error on DELETE_PRODUCT_THUMBNAIL", err))
	}
)

// Update Product
router.put("/product/:product_id", authenticationAdmin, (req, res) => {
	Promise.try(() => updateProduct(req.params.product_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UPDATE_PRODUCT", err))
})

// Delete Product
router.delete("/product/:product_id", authenticationAdmin, (req, res) => {
	Promise.try(() => deleteProduct(req.params.product_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on DELETE_PRODUCT", err))
})

// Get All Product Brands
router.get("/product-brands", (req, res) => {
	Promise.try(
		() =>
			req.query.with_product
				? getProductBrandsWithProducts()
				: getProductBrands()
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCT_BRANDS", err))
})

// Post product brands
router.post("/product-brands", (req, res) => {
	Promise.try(() => postProductBrands(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on POST_PRODUCT_BRANDS", err))
})

// Put product brands
router.put("/product-brands/:product_brand_id", (req, res) => {
	Promise.try(() => updateProductBrands(req.body,req.params.product_brand_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on PUT_PRODUCT_BRANDS", err))
})

// delete product brands
router.delete("/product-brands/:product_brand_id", (req, res) => {
	Promise.try(() => deleteProductBrands(req.params.product_brand_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on DELETE_PRODUCT_BRANDS", err))
})

// Get Top Product Brands
router.get("/product-brands/top", (req, res) => {
	Promise.try(
		() =>
			req.query.with_product
				? getTopProductBrandsWithProducts()
				: getTopProductBrands()
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_TOP_PRODUCT_BRANDS", err))
})

// Get All Product Categories
router.get("/product-categories", (req, res) => {
	Promise.try(
		() =>
			req.query.with_subcategories
				? getProductCategoriesWithSubcategories()
				: getProductCategories()
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCT_CATEGORIES", err))
})

// Get All Product sub categories
router.get("/product-subcategories", (req, res) => {
	Promise.try(
		() =>
			req.query.with_products
				? getProductSubcategoriesWithProducts()
				: getProductSubcategories()
	)
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCT_SUBCATEGORIES", err))
})

// Post new product sub category
router.post("/product-subcategories", (req, res) => {
	Promise.try(() => addProductSubcategories(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on POST_PRODUCT_SUBCATEGORIES", err))
})

// Update new product sub category
router.put("/product-subcategories/:product_subcategory_id", (req, res) => {
	Promise.try(() => updateProductSubcategories(req.params.product_subcategory_id, req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on PUT_PRODUCT_SUBCATEGORIES", err))
})

// Delete new product sub category
router.delete("/product-subcategories/:product_subcategory_id", (req, res) => {
	Promise.try(() => deleteProductSubcategories(req.params.product_subcategory_id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on DELETE_PRODUCT_SUBCATEGORIES", err))
})

// Get Best Seller Subcategories
router.get("/product-subcategories/best-seller", (req, res) => {
	Promise.try(() => getBestSellerSubcategories())
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_ALL_PRODUCT_SUBCATEGORIES", err))
})

// Add Wishlist
router.post("/wishlist", authenticationUser, (req, res) => {
	Promise.try(() => addWishlist(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_WISHLIST", err))
})

// Get Wishlist
router.get("/wishlist/:id", authenticationUser, (req, res) => {
	Promise.try(() => getWishlist(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_WISHLIST", err))
})

// Delete Wishlist
router.delete("/wishlist", authenticationUser, (req, res) => {
	Promise.try(() => removeWishlist(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on DELETE_WISHLIST", err))
})

// Add Cart
router.post("/cart", authenticationUser, (req, res) => {
	Promise.try(() => addCart(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on ADD_CART", err))
})

// Get Cart
router.get("/cart/:id", authenticationUser, (req, res) => {
	Promise.try(() => getCart(req.params.id))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on GET_CART", err))
})

// Update Cart Qty
router.put("/cart/:cart_id", authenticationUser, (req, res) => {
	Promise.try(() => updateCartQty(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on UPDATE_CART_QTY", err))
})

// Delete Cart
router.delete("/cart", authenticationUser, (req, res) => {
	Promise.try(() => removeCart(req.body))
		.then(response => res.status(response.status).json(response))
		.catch(err => console.log("Error on DELETE_CART", err))
})

module.exports = router
