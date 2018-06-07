exports.up = function(knex, Promise) {
  return knex.schema.createTable('product_reviews', table => {
			table.increments('product_review_id')
			table.integer('rate')
			table.text('comment')
			table.integer('product_id')
			table.integer('id')
			table.timestamps(true, true)

			table.foreign('product_id')
				.references('product_id')
				.inTable('products')
			table.foreign('id')
				.references('id')
				.inTable('users')
		})
		.then(() => console.log('Product Reviews table created'))
		.catch(() => console.log('There was an error with the Product Reviews table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('product_reviews')
		.then(() => console.log('Product Reviews table deleted'))
		.catch(() => console.log('There was an error deleting Product Reviews table'))
}

exports.config = {
	transaction: false
}