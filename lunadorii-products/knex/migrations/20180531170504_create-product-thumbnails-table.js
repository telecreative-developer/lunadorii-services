exports.up = function(knex, Promise) {
  return knex.schema.createTable('product_thumbnails', table => {
			table.increments('product_thumbnail_id')
			table.string('thumbnail_url')
			table.integer('product_id')
			table.timestamps(true, true)

			table.foreign('product_id')
				.references('product_id')
				.inTable('products')
		})
		.then(() => console.log('Product Thumbnails table created'))
		.catch(() => console.log('There was an error with the Product Thumbnails table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('product_thumbnails')
		.then(() => console.log('Product Thumbnails table deleted'))
		.catch(() => console.log('There was an error deleting Product Thumbnails table'))
}

exports.config = {
	transaction: false
}