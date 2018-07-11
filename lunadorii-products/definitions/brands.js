const topBrandsDefinition = [
	{
		product_brand_id: { column: "product_brand_id", id: true },
		brand: { column: "brand" },
		logo_url: { column: "logo_url" }
	}
]

const topBrandsWithProductsDefinition = [
	{
		product_brand_id: { column: "product_brand_id", id: true },
		brand: { column: "brand" },
		logo_url: { column: "logo_url" },
		products: [
			{
				product_id: { column: "product_id", id: true },
				product: { column: "product" },
				description: { column: "description" },
				detail: { column: "detail" },
				to_use: { column: "to_use" },
				price: { column: "price" },
				discount: { column: "discount" },
				discount_percentage: { column: "discount_percentage" }
			}
		]
	}
]

module.exports = { topBrandsDefinition, topBrandsWithProductsDefinition }
