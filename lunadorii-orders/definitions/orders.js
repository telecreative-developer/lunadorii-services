const historyDefinition = [
	{
		order_id: { column: "order_id", id: true },
		billing_code: { column: "billing_code" },
		order_status: { column: "order_status" },
		total: { column: "total" },
		bank: { column: "bank" },
		paid_method: { column: "paid_method" },
		receipt_time: { column: "receipt_time" },
		receipt_number: { column: "receipt_number" },
		delivery_service: { column: "delivery_service" },
		delivery_price: { column: "delivery_price" },
		delivery_time: { column: "delivery_time" },
		address: { column: "address" },
		created_at: { column: "created_at" },
		updated_at: { column: "updated_at" },
		list: [
			{
				order_product_id: { column: "order_product_id", id: true },
				product_id: { column: "product_id", id: true },
				purchase_number: { column: "purchase_number" },
				product: { column: "product" },
				price: { column: "price" },
				discount_percentage: { column: "discount_percentage" },
				weight_gram: { column: "weight_gram" },
				order_product_status: { column: "order_product_status" },
				note: { column: "note" },
				qty: { column: "qty" },
				subtotal: { column: "subtotal" },
				subcategories: [
					{
						product_subcategory_id: {
							column: "product_subcategory_id",
							id: true
						},
						subcategory: { column: "subcategory" }
					}
				],
				thumbnails: [
					{
						product_thumbnail_id: { column: "product_thumbnail_id", id: true },
						thumbnail_url: { column: "product_thumbnail_url" }
					}
				],
				reviews: [
					{
						product_review_id: { column: "product_review_id", id: true },
						review_rate: { column: "rate" },
						comment: { column: "comment" },
						id: { column: "product_reviews_user_id", id: true },
						created_at: { column: "product_reviews_created_at" },
						updated_at: { column: "product_reviews_updated_at" }
					}
				]
			}
		]
	}
]

const checkoutDefinition = [
	{
		billing_code: { column: "billing_code", id: true },
		paid_method: { column: "paid_method" },
		bank: { column: "bank" },
		products: [
			{
				product_id: { column: "product_id", id: true },
				qty: { column: "qty" },
				price: { column: "price" },
				discount_percentage: { column: "discount_percentage" }
			}
		]
	}
]

module.exports = { historyDefinition, checkoutDefinition }
