const productsDefinition = [
	{
		product_id: { column: "product_id", id: true },
		product: { column: "product" },
		product_slug: { column: "product_slug" },
		description: { column: "description" },
		detail: { column: "detail" },
		to_use: { column: "to_use" },
		wight_gram: { column: "weight_gram" },
		price: { column: "price" },
		discount: { column: "discount" },
		discount_percentage: { column: "discount_percentage" },
		subcategories: [
			{
				product_subcategory_id: { column: "product_subcategory_id", id: true },
				subcategory: { column: "subcategory" }
			}
		],
		brands: [
			{
				product_brand_id: { column: "product_brand_id", id: true },
				brand: { column: "brand" },
				logo_url: { column: "logo_url" }
			}
		],
		thumbnails: [
			{
				product_thumbnail_id: { column: "product_thumbnail_id", id: true },
				thumbnail_url: { column: "thumbnail_url" }
			}
		],
		reviews: [
			{
				product_review_id: { column: "product_review_id", id: true },
				review_rate: { column: "rate" },
				comment: { column: "comment" },
				user: {
					id: { column: "product_reviews_user_id", id: true },
					avatar_url: { column: "product_reviews_avatar_url" },
					first_name: { column: "product_reviews_first_name" },
					last_name: { column: "product_reviews_last_name" }
				},
				created_at: { column: "product_reviews_created_at" },
				updated_at: { column: "product_reviews_updated_at" }
			}
		]
	}
]

const productsBestSellerDefinition = [
	{
		order_product_id: { column: "order_product_id", id: true },
		product_id: { column: "product_id" },
		product: { column: "product" },
		product_slug: { column: "product_slug" },
		description: { column: "description" },
		detail: { column: "detail" },
		to_use: { column: "to_use" },
		wight_gram: { column: "weight_gram" },
		price: { column: "price" },
		discount: { column: "discount" },
		discount_percentage: { column: "discount_percentage" },
		subcategories: [
			{
				product_subcategory_id: { column: "product_subcategory_id", id: true },
				subcategory: { column: "subcategory" }
			}
		],
		brands: [
			{
				product_brand_id: { column: "product_brand_id", id: true },
				brand: { column: "brand" },
				logo_url: { column: "logo_url" }
			}
		],
		thumbnails: [
			{
				product_thumbnail_id: { column: "product_thumbnail_id", id: true },
				thumbnail_url: { column: "thumbnail_url" }
			}
		],
		reviews: [
			{
				product_review_id: { column: "product_review_id", id: true },
				review_rate: { column: "rate" },
				comment: { column: "comment" },
				user: {
					id: { column: "product_reviews_user_id", id: true },
					avatar_url: { column: "product_reviews_avatar_url" },
					first_name: { column: "product_reviews_first_name" },
					last_name: { column: "product_reviews_last_name" }
				},
				created_at: { column: "product_reviews_created_at" },
				updated_at: { column: "product_reviews_updated_at" }
			}
		]
	}
]

const productBrandsDefinition = [
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

const productCategoriesDefinition = [
	{
		product_category_id: { column: "product_category_id", id: true },
		category: { column: "category" },
		subcategories: [
			{
				product_subcategory_id: { column: "product_subcategory_id", id: true },
				thumbnail_url: { column: "thumbnail_url" },
				subcategory: { column: "subcategory" }
			}
		]
	}
]

const productSubcategoriesDefinition = [
	{
		product_subcategory_id: { column: "product_subcategory_id", id: true },
		thumbnail_url: { column: "thumbnail_url" },
		subcategory: { column: "subcategory" },
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

module.exports = {
	productsDefinition,
	productBrandsDefinition,
	productCategoriesDefinition,
	productSubcategoriesDefinition,
	productsBestSellerDefinition
}
