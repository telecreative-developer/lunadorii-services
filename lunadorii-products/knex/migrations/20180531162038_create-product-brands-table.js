exports.up = function(knex, Promise) {
  return knex.schema.createTable('product_brands', table => {
			table.increments('product_brand_id')
			table.string('brand')
			table.text('brand_logo')
			table.timestamps()
		})
		.then(() => console.log('Product Brands table created'))
		.catch(() => console.log('There was an error with the Product Brands table'))
}

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTable('product_brands')
		.then(() => console.log('Product Brands table deleted'))
		.catch(() => console.log('there was an error deleting Product Brands table'))
}

exports.config = {
	transaction: false
}