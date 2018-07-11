const historyDefinition = [
	{
		order_id: { column: "order_id", id: true },
		billing_code: { column: "billing_code" },
		order_status: { column: "order_status" },
		total: { column: "total" },
		address: { column: "address" },
		list: [
			{
				order_product_id: { column: "order_product_id", id: true },
				product_id: { column: "product_id", id: true },
				purchase_number: { column: "purchase_number" },
				product: { column: "product" },
				wight_gram: { column: "weight_gram" },
				order_product_status: { column: "order_product_status" },
				delivery_service: { column: "delivery_service" },
				note: { column: "note" },
				payment_time: { column: "payment_time" },
				delivery_time: { column: "delivery_time" },
				receipt_time: { column: "receipt_time" },
				thumbnails: [
					{
						product_thumbnail_id: { column: "product_thumbnail_id", id: true },
						thumbnail_url: { column: "thumbnail_url" }
					}
				]
			}
		]
	}
]

module.exports = { historyDefinition }
