const reviewsDefinition = [{
	product_review_id: {column: 'product_review_id', id: true},
	rate: {column: 'rate'},
	comment: {column: 'comment'},
	product: {
		product_id: {column: 'product_id', id: true},
		name: {column: 'product'},
		thumbnails: [{
			product_thumbnail_id: {column: 'product_thumbnail_id', id: true},
			thumbnail_url: {column: 'thumbnail_url'}
		}]
	}
}]

module.exports = reviewsDefinition