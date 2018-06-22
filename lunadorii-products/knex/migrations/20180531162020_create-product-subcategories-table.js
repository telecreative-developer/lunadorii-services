exports.up = function(knex, Promise) {
  return knex.schema
		.createTable('product_subcategories', table => {
			table.increments('product_subcategory_id')
			table.string('subcategory')
			table.string('thumbnail_url')
			table.integer('product_category_id')
			table.timestamps(true, true)

			table.foreign('product_category_id')
				.references('product_category_id')
				.inTable('product_categories')
		})
		.then(() => console.log('Product Subcategories table created'))
		.catch(() => console.log('There was an error with the Product Subcategories table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('product_subcategories')
		.then(() => console.log('Product Subcategories table deleted'))
		.catch(() => console.log('There was an error deleting Product Subcategories table'))
}

exports.config = {
	transaction: false
}