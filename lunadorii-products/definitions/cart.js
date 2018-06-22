const cartDefinition = [{
	product_id: {column: 'product_id', id: true},
	product: {column: 'product'},
	description: {column: 'description'},
	detail: {column: 'detail'},
	to_use: {column: 'to_use'},
	price: {column: 'price'},
	discount: {column: 'discount'},
	discount_percentage: {column: 'discount_percentage'},
	qty: {column: 'qty'},
	subcategories: [{
		product_subcategory_id: {column: 'product_subcategory_id', id: true},
		subcategory: {column: 'subcategory'}
	}],
	brands: [{
		product_brand_id: {column: 'product_brand_id', id: true},
		brand: {column: 'brand'},
		logo_url: {column: 'logo_url'}
	}],
	thumbnails: [{
		product_thumbnail_id: {column: 'product_thumbnail_id', id: true},
		thumbnail_url: {column: 'thumbnail_url'}
	}],
	reviews: [{
		product_review_id: {column: 'product_review_id', id: true},
		review_rate: {column: 'rate'},
		comment: {column: 'comment'}
	}],
	created_at: {column: 'created_at'},
	updated_at: {column: 'updated_at'}
}]

module.exports = cartDefinition