const reviewsDefinition = [
	{
		product_review_id: { column: "product_review_id", id: true },
		rate: { column: "rate" },
		comment: { column: "comment" },
		product: {
			product_id: { column: "product_id", id: true },
			product_slug: { column: "product_slug" },
			name: { column: "product" },
			price: { column: "price" },
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
			]
		},
		created_at: { column: "product_review_created_at" },
		updated_at: { column: "product_review_updated_at" }
	}
]

module.exports = reviewsDefinition
