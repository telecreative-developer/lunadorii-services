exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', table => {
			table.increments('product_id')
			table.string('product')
			table.text('description')
			table.text('detail')
			table.text('to_use')
			table.integer('product_category_id')
			table.integer('product_brand_id')
			table.integer('product_review_id')
			table.timestamps()

			table.foreign('product_category_id')
				.references('product_category_id')
				.inTable('product_categories')
			table.foreign('product_brand_id')
				.references('product_brand_id')
				.inTable('product_brands')
			table.foreign('product_review_id')
				.references('product_review_id')
				.inTable('product_reviews')
		})
		.then(() => console.log('Products table created'))
		.catch((e) => console.log('There was an error with the Products table: ', e))
}

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('products')
		.then(() => console.log('Products table deleted'))
		.catch((e) => console.log('there was an error deleting Products table', e))
}

exports.config = {
	transaction: false
}